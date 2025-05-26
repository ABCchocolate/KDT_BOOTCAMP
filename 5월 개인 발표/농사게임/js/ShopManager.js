class ShopManager {
    constructor(game, shopPanelElement, shopToggleButtonElement) {
        this.game = game; // Game 인스턴스 참조
        this.shopPanel = shopPanelElement;
        this.shopToggleButton = shopToggleButtonElement;
    }

    togglePanel() {
        const currentlyOpen = this.isOpen();

        // 만약 요리 패널이 열려있다면 먼저 닫는다.
        if (this.game.cookingManager && this.game.cookingManager.isOpen()) {
            this.game.cookingManager.closePanel(); // 요리 패널 명시적으로 닫기
        }   

        if (currentlyOpen) {
            // 이미 열려있었다면 닫는다.
            this.closePanel();
        } else {
            // 닫혀있었다면 연다.
            this.shopPanel.classList.add('open');
            this.shopToggleButton.classList.add('shop-open');
            this.shopToggleButton.textContent = '➡️';
            this.shopToggleButton.style.zIndex = '1002'; // 활성 버튼 z-index 증가
            document.body.classList.add('shop-is-open');
            console.log("ShopManager: 패널 열림");
            this.renderShop();
        }
    }


    closePanel() {
        if (this.isOpen()) {
            this.shopPanel.classList.remove('open');
            this.shopToggleButton.classList.remove('shop-open');
            this.shopToggleButton.textContent = '🛒';
            this.shopToggleButton.style.zIndex = ''; // 기본 z-index로 복원 (CSS에 정의된 값)
            document.body.classList.remove('shop-is-open');
            console.log("ShopManager: 패널 닫힘");
        }
    }

    isOpen() {
        return this.shopPanel.classList.contains('open');
    }

    renderShop() {
        this.shopPanel.innerHTML = '<h2>상점</h2>';
        Object.keys(this.game.CROP_TYPES).forEach(cropKey => {
            const crop = this.game.CROP_TYPES[cropKey];
            const shopItemElement = document.createElement('div');
            shopItemElement.classList.add('shop-item');
            const icon = crop.stages[crop.stages.length - 1];
            shopItemElement.innerHTML = `
                <span class="shop-item-icon">${icon}</span>
                <span class="shop-item-name">${crop.name} 씨앗</span>
                <span class="shop-item-price">가격: ${crop.seedCost}원</span> 
            `;
            const buyButton = document.createElement('button');
            buyButton.textContent = '구매';
            buyButton.classList.add('buy-button');
            buyButton.addEventListener('click', () => this.buySeed(cropKey));
            shopItemElement.appendChild(buyButton);
            this.shopPanel.appendChild(shopItemElement);
        });
    }

    buySeed(cropKey) {
        const cropToBuy = this.game.CROP_TYPES[cropKey];
        if (this.game.currentMoney >= cropToBuy.seedCost) {
            this.game.currentMoney -= cropToBuy.seedCost;
            this.game.seedInventory[cropKey]++;
            this.game.updateMoneyDisplay();
            alert(`${cropToBuy.name} 씨앗을 구매했습니다!`);
            console.log(`${cropToBuy.name} 씨앗 구매. 현재 ${cropKey} 씨앗: ${this.game.seedInventory[cropKey]}개. 남은 돈: ${this.game.currentMoney}원`);
            
            if (this.game.selectedTool instanceof SeedTool && this.game.selectedTool.cropKey === cropKey) {
                this.game.updateCurrentToolDisplay();
            }
        } else {
            alert(`${cropToBuy.name} 씨앗을 구매하기에 돈이 부족합니다.`);
        }
    }
}
