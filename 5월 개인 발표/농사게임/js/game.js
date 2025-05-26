

class Game {
    constructor(uiElements) {
        this.farmGrid = uiElements.farmGrid;
        this.inventoryGrid = uiElements.inventoryGrid;
        this.moneyDisplay = uiElements.moneyDisplay;
        this.currentToolDisplay = uiElements.currentToolDisplay;
        this.shopToggleButton = uiElements.shopToggleButton;
        this.shopPanel = uiElements.shopPanel;
        this.seedButtons = uiElements.seedButtons; // { carrot: button, potato: button, strawberry: button }
        this.harvestToolButton = uiElements.harvestToolButton;

        this.CROP_TYPES = {};
        this.currentMoney = 100;
        this.selectedTool = null; // Tool 인스턴스 또는 null
        this.plots = []; // Plot 인스턴스 배열
        this.inventoryItems = [];
        this.gridSize = 5 * 3;
        this.seedInventory = { carrot: 0, potato: 0, strawberry: 0 };
    }

    initialize() {
        return fetch('seed.json') // fetch는 Promise를 반환합니다.
            .then(response => {
                if (!response.ok) {
                    // 에러를 발생시켜 아래 .catch()에서 처리하도록 합니다.
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // response.json()도 Promise를 반환합니다.
            })
            .then(data => {
                this.CROP_TYPES = data;

                // 데이터 로딩 성공 후 나머지 초기화 진행
                this._initializeFarm();
                this._renderInventory();
                this._setupEventListeners();
                this.updateMoneyDisplay();
                this.updateCurrentToolDisplay();
                return true; // 초기화 성공 시 true를 반환하는 Promise가 됩니다.
            })
            .catch(error => {
                console.error('작물 데이터를 불러오는 데 실패했습니다:', error);
                document.body.innerHTML = `<p style="color: red; text-align: center; font-size: 18px;">게임 데이터를 불러오는데 실패했습니다. seed.json 파일이 올바른지 확인해주세요. (${error.message})</p>`;
                return false; // 초기화 실패 시 false를 반환하는 Promise가 됩니다.
            });
    }

    _setupEventListeners() {
        this.seedButtons.carrot.addEventListener('click', () => this._selectSeedTool('carrot'));
        this.seedButtons.potato.addEventListener('click', () => this._selectSeedTool('potato'));
        this.seedButtons.strawberry.addEventListener('click', () => this._selectSeedTool('strawberry'));

        this.harvestToolButton.addEventListener('click', () => {
            this.selectedTool = new HarvestTool(this);
            this.updateCurrentToolDisplay();
            console.log("수확 도구 선택됨");
        });

        if (this.shopToggleButton && this.shopPanel) {
            this.shopToggleButton.addEventListener('click', () => {
                this.shopPanel.classList.toggle('open');
                this.shopToggleButton.classList.toggle('shop-open');
                this.shopToggleButton.textContent = this.shopPanel.classList.contains('open') ? '➡️' : '🛒';
                if (this.shopPanel.classList.contains('open')) this._renderShop();
            });
        } else {
            console.error("상점 토글 버튼 또는 패널 요소를 찾을 수 없습니다.");
        }
    }

    _initializeFarm() {
        this.farmGrid.innerHTML = '';
        this.plots = [];
        for (let i = 0; i < this.gridSize; i++) {
            const plotElement = document.createElement('div');
            plotElement.classList.add('plot', 'empty');
            plotElement.dataset.id = i;
            this.farmGrid.appendChild(plotElement);
            // Plot 인스턴스 생성 시 game 참조(this) 전달
            const plotInstance = new Plot(i, plotElement, this);
            this.plots.push(plotInstance);
        }
        this.updateMoneyDisplay();
    }

    _renderInventory() {
        this.inventoryGrid.innerHTML = '';
        if (this.inventoryItems.length === 0) {
            this.inventoryGrid.innerHTML = '<p style="text-align:center; width:100%;">창고가 비어있습니다.</p>';
            return;
        }
        this.inventoryItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('inventory-cell');
            itemElement.innerHTML = `
                <span style="font-size: 2em;">${item.icon}</span>
                <span>${item.name}</span>
                <span>(판매가: ${item.harvestValue}원)</span>
            `;
            itemElement.addEventListener('click', (event) => {
                event.stopPropagation();
                this._sellItemFromInventory(index);
            });
            this.inventoryGrid.appendChild(itemElement);
        });
    }

    _addItemToInventory(cropType) {
        const cropInfo = this.CROP_TYPES[cropType];
        if (cropInfo) {
            this.inventoryItems.push({
                type: cropType,
                name: cropInfo.name,
                harvestValue: cropInfo.harvestValue,
                icon: cropInfo.stages[cropInfo.stages.length - 1]
            });
            this._renderInventory();
        }
    }

    _sellItemFromInventory(itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.inventoryItems.length) {
            const itemSold = this.inventoryItems.splice(itemIndex, 1)[0];
            this.currentMoney += itemSold.harvestValue;
            this.updateMoneyDisplay();
            this._renderInventory();
            console.log(`${itemSold.name}을(를) 판매하여 ${itemSold.harvestValue}원을 얻었습니다.`);
        }
    }

    updateMoneyDisplay() {
        this.moneyDisplay.textContent = this.currentMoney;
    }

    updateCurrentToolDisplay() {
        this.currentToolDisplay.textContent = this.selectedTool ? this.selectedTool.getDisplayName() : '없음';
    }

    _selectSeedTool(cropKey) {
        if (!this.CROP_TYPES[cropKey]) {
            alert("선택한 씨앗 정보가 올바르지 않습니다.");
            this.selectedTool = null;
        } else if (this.seedInventory[cropKey] > 0) {
            this.selectedTool = new SeedTool(cropKey, this);
            console.log(`${this.CROP_TYPES[cropKey].name} 씨앗 선택됨. (남은 개수: ${this.seedInventory[cropKey]})`);
        } else {
            this.selectedTool = null;
            alert(`${this.CROP_TYPES[cropKey].name} 씨앗이 없습니다. 상점에서 구매해주세요.`);
        }
        this.updateCurrentToolDisplay();
    }

    // plot은 Plot 클래스의 인스턴스
    handlePlotClick(plot) {
        if (this.selectedTool) {
            this.selectedTool.useOnPlot(plot);
        } else {
            alert("도구를 먼저 선택해주세요 (씨앗 또는 수확 도구).");
        }
    }

    _renderShop() {
        this.shopPanel.innerHTML = '<h2>상점</h2>';
        Object.keys(this.CROP_TYPES).forEach(cropKey => {
            const crop = this.CROP_TYPES[cropKey];
            const shopItemElement = document.createElement('div');
            shopItemElement.classList.add('shop-item');
            const icon = crop.stages[crop.stages.length - 1];
            shopItemElement.innerHTML = `
                <span class="shop-item-icon" style="font-size: 1.5em;">${icon}</span>
                <span class="shop-item-name">${crop.name} 씨앗</span>
                <span class="shop-item-price">가격: ${crop.seedCost}원</span>
            `;
            const buyButton = document.createElement('button');
            buyButton.textContent = '구매';
            buyButton.classList.add('buy-button');
            buyButton.addEventListener('click', () => this._buySeed(cropKey));
            shopItemElement.appendChild(buyButton);
            this.shopPanel.appendChild(shopItemElement);
        });
    }

    _buySeed(cropKey) {
        const cropToBuy = this.CROP_TYPES[cropKey];
        if (this.currentMoney >= cropToBuy.seedCost) {
            this.currentMoney -= cropToBuy.seedCost;
            this.seedInventory[cropKey]++;
            this.updateMoneyDisplay();
            alert(`${cropToBuy.name} 씨앗을 구매했습니다!`);
            console.log(`${cropToBuy.name} 씨앗 구매. 현재 ${cropKey} 씨앗: ${this.seedInventory[cropKey]}개. 남은 돈: ${this.currentMoney}원`);
            
            // 현재 선택된 도구가 방금 구매한 씨앗이고, 씨앗 도구라면 displayName 업데이트
            if (this.selectedTool instanceof SeedTool && this.selectedTool.cropKey === cropKey) {
                this.updateCurrentToolDisplay();
            }
            // 상점이 열려있다면 상점 UI 다시 렌더링 => 실행 안됨... 나중에 다시 
            // if (this.shopPanel.classList.contains('open')) {
            //     this._renderShop();
            // }
        } else {
            alert(`${cropToBuy.name} 씨앗을 구매하기에 돈이 부족합니다.`);
        }
    }
}