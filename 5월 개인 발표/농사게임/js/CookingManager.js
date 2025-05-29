class CookingManager {
    constructor(game, cookingPanelElement, cookingToggleButtonElement) {
        this.game = game; // Game 인스턴스 참조
        this.cookingPanel = cookingPanelElement;
        this.cookingToggleButton = cookingToggleButtonElement;

        this.cookingContainer = document.getElementById("cooking-list");

    }

  togglePanel() {
        const currentlyOpen = this.isOpen();
        

        // 만약 상점 패널이 열려있다면 먼저 닫는다.
        if (this.game.shopManager && this.game.shopManager.isOpen()) {
            this.game.shopManager.closePanel(); // 상점 패널 명시적으로 닫기
        }

        if (currentlyOpen) {
            // 이미 열려있었다면 닫는다.
            this.closePanel();
        } else {
            // 닫혀있었다면 연다.
            this.cookingPanel.classList.add('open');
            this.cookingToggleButton.classList.add('cooking-open');
            this.cookingToggleButton.textContent = '➡️';
            this.cookingToggleButton.style.zIndex = '1002'; 
            document.body.classList.add('cooking-is-open');
            console.log("CookingManager: 패널 열림");
            this.renderCooking();
        }
    }

    closePanel() {
        if (this.isOpen()) {
            this.cookingPanel.classList.remove('open');
            this.cookingToggleButton.classList.remove('cooking-open');
            this.cookingToggleButton.textContent = '🧑‍🍳';
            this.cookingToggleButton.style.zIndex = ''; // 기본 z-index로 복원 (CSS에 정의된 값)
            document.body.classList.remove('cooking-is-open');
            console.log("CookingManager: 패널 닫힘");
        }
    }

    isOpen() {
        return this.cookingPanel.classList.contains('open');
    }

    renderCooking() {
        this.cookingPanel.innerHTML = '<h2>주방</h2>';

        if (Object.keys(this.game.COOKING_TYPES).length === 0) {
            this.cookingPanel.innerHTML += '<p>만들 수 있는 요리가 아직 없습니다. food.json 파일을 확인해주세요.</p>';
            return;
        }

        Object.keys(this.game.COOKING_TYPES).forEach(recipeKey => {
            const recipe = this.game.COOKING_TYPES[recipeKey];
            const recipeItemElement = document.createElement('div');
            recipeItemElement.classList.add('cooking-item');
            
            let ingredientsText = "재료: ";
            for (const ingredientCropKey in recipe.ingredients) {
                const requiredAmount = recipe.ingredients[ingredientCropKey];
                const cropInfo = this.game.CROP_TYPES[ingredientCropKey];
                ingredientsText += `${cropInfo ? cropInfo.name : ingredientCropKey} ${requiredAmount}개, `;
            }
            ingredientsText = ingredientsText.slice(0, -2);

            recipeItemElement.innerHTML = `
                <span class="cooking-item-icon">${recipe.icon || '🍳'}</span>
                <span class="cooking-item-name">${recipe.name}</span>
                <span class="cooking-item-ingredients">${ingredientsText} | </span>
                <span class="cooking-item-value"> | 판매가: ${recipe.sellValue}원</span>
            `;
            const cookButton = document.createElement('button');
            cookButton.innerText = "요리하기";
            cookButton.classList.add('cook-button');
            cookButton.style.borderRadius = "5px";
            cookButton.addEventListener('click', () => this.cookRecipe(recipeKey));
            cookButton.disabled = !this.canCookRecipe(recipeKey);

            recipeItemElement.appendChild(cookButton);
            this.cookingPanel.appendChild(recipeItemElement);
        });
    }

    canCookRecipe(recipeKey) {
        const recipe = this.game.COOKING_TYPES[recipeKey];
        if (!recipe || !recipe.ingredients) return false;

        const currentInventoryCounts = this.game.inventoryItems.reduce((acc, item) => {
            if (item.type && this.game.CROP_TYPES[item.type]) {
                acc[item.type] = (acc[item.type] || 0) + 1;
            }
            return acc;
        }, {});

        for (const ingredientCropKey in recipe.ingredients) {
            const requiredAmount = recipe.ingredients[ingredientCropKey];
            if ((currentInventoryCounts[ingredientCropKey] || 0) < requiredAmount) {
                return false;
            }
        }
        return true;
    }

    cookRecipe(recipeKey) {
        const recipe = this.game.COOKING_TYPES[recipeKey];
        if (!recipe) {
            alert("선택한 요리 레시피를 찾을 수 없습니다.");
            return;
        }

        if (!this.canCookRecipe(recipeKey)) {
            alert(`${recipe.name}을(를) 요리하기 위한 재료가 부족합니다.`);
            return;
        }

        for (const ingredientCropKey in recipe.ingredients) {
            let amountToRemove = recipe.ingredients[ingredientCropKey];
            for (let i = this.game.inventoryItems.length - 1; i >= 0 && amountToRemove > 0; i--) {
                if (this.game.inventoryItems[i].type === ingredientCropKey) {
                    this.game.inventoryItems.splice(i, 1);
                    amountToRemove--;
                }
            }
        }

        // 재료 소모 후 즉시 인벤토리 및 요리 패널(버튼 상태) 업데이트
        this.game._renderInventory();
        this.renderCooking(); // 요리 패널 자체를 다시 렌더링

        // 2. "요리 중" UI 생성 및 표시
        const cookingProgressDiv = document.createElement("div");
        cookingProgressDiv.classList.add('cooking-progress-item'); // CSS 클래스 사용 권장
        // 인라인 스타일 대신 CSS 클래스로 관리하는 것이 좋습니다. 예시로 몇 가지만 남깁니다.
        cookingProgressDiv.style.width = "100%";
        cookingProgressDiv.style.height = "30px";
        cookingProgressDiv.style.background = "lightyellow"; // "요리 중"을 나타내는 배경색
        cookingProgressDiv.style.boxSizing = "border-box";
        cookingProgressDiv.style.borderRadius = "5px";
        cookingProgressDiv.style.display = "flex";
        cookingProgressDiv.style.justifyContent = "space-between";
        cookingProgressDiv.style.alignItems = "center";
        cookingProgressDiv.style.border = "1px dashed #ccc"; // "요리 중" 테두리
        cookingProgressDiv.style.padding = "0 10px";
        cookingProgressDiv.style.marginBottom = "5px";
        cookingProgressDiv.textContent = `${recipe.name} 요리 중... ⏳`;

        if (this.cookingContainer) {
            this.cookingContainer.appendChild(cookingProgressDiv);
        } else {
            console.error("CookingManager: cookingContainer (cooking-list) 요소를 찾을 수 없습니다.");
            
        }

        // 3. 요리 시간 설정 (레시피에 cookingTime이 정의되어 있으면 사용, 없으면 기본값)
        const cookingTime = recipe.cookingTime || 5000; // 예: 기본 5초, food.json에 "cookingTime": 5000 추가 가능

        // 4. 일정 시간 후 요리 완료 처리
        setTimeout(() => {
            // "요리 중" UI 제거
            if (this.cookingContainer && cookingProgressDiv.parentNode === this.cookingContainer) {
                this.cookingContainer.removeChild(cookingProgressDiv);
            }

            // 완성된 요리 아이템 생성
            const cookedFood = {
                name: recipe.name,
                sellValue: recipe.sellValue,
                icon: recipe.icon || '🍲',
                type: 'cookedFood', // 일반 작물과 구분하기 위한 타입
                originalRecipeKey: recipeKey // 어떤 레시피로 만들어졌는지 추적 가능
            };
            this.game.inventoryItems.push(cookedFood);

            // 인벤토리 UI 업데이트
            this.game._renderInventory();

            
            console.log(`${recipe.name} 요리 완료! 창고에 추가됨.`);
            alert(`${recipe.name} 요리가 완료되어 창고에 추가되었습니다!`);

            // 요리 패널 버튼 상태 
            this.renderCooking();
        }, cookingTime);
    }
}
