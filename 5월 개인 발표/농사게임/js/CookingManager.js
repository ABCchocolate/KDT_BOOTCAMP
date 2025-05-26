class CookingManager {
    constructor(game, cookingPanelElement, cookingToggleButtonElement) {
        this.game = game; // Game 인스턴스 참조
        this.cookingPanel = cookingPanelElement;
        this.cookingToggleButton = cookingToggleButtonElement;
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
            this.cookingToggleButton.style.zIndex = '1002'; // 활성 버튼 z-index 증가
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
                <span class="cooking-item-ingredients">${ingredientsText}</span>
                <span class="cooking-item-value">판매가: ${recipe.sellValue}원</span>
            `;
            const cookButton = document.createElement('button');
            cookButton.textContent = '요리하기';
            cookButton.classList.add('cook-button');
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

        const cookedFood = {
            name: recipe.name,
            sellValue: recipe.sellValue,
            icon: recipe.icon || '🍲',
            type: 'cookedFood',
            originalRecipeKey: recipeKey
        };
        this.game.inventoryItems.push(cookedFood);

        alert(`${recipe.name} 요리 성공! 창고에서 확인할 수 있습니다.`);
        console.log(`${recipe.name} 요리 완료. 재료 소모 후 창고에 추가됨.`);

        this.game._renderInventory();
        this.renderCooking(); // 요리 패널 자체를 다시 렌더링
    }
}
