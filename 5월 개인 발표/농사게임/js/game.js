class Game {
    constructor(uiElements) {
        this.farmGrid = uiElements.farmGrid;
        this.inventoryGrid = uiElements.inventoryGrid;
        this.moneyDisplay = uiElements.moneyDisplay;
        this.totalMoneyValueDisplay = uiElements.totalMoneyValueDisplay; // 왼쪽 사이드바 금액 표시 요소
        this.currentToolDisplay = uiElements.currentToolDisplay;
        this.achievementListUI = uiElements.achievementListUI; // 업적 목록 UI 요소
        this.seedButtons = uiElements.seedButtons; // { carrot: button, potato: button, strawberry: button }
        this.harvestToolButton = uiElements.harvestToolButton;

        // Manager 인스턴스 생성
        this.shopManager = new ShopManager(this, uiElements.shopPanel, uiElements.shopToggleButton);
        this.cookingManager = new CookingManager(this, uiElements.cookingPanel, uiElements.cookingToggleButton);
        this.tutorialManager = new TutorialManager(this, uiElements.tutorialModalOverlay, uiElements.tutorialCloseButton);


        this.CROP_TYPES = {};
        this.COOKING_TYPES = {};
        this.currentMoney = 100;
        this.totalEarnings = 0; // 지금까지 번 총 수익
        this.harvestedCounts = {}; // 작물별 수확량 { 'carrot': 0, 'potato': 0, ... }
        this.selectedTool = null; // Tool 인스턴스 또는 null
        this.plots = []; // Plot 인스턴스 배열
        this.inventoryItems = [];
        this.gridSize = 5 * 3;
        this.seedInventory = {};

        this.uiElements = uiElements; // 나중에 씨앗 개수 표시를 위해 uiElements 저장
    }

    initialize() {
        return fetch('./json/seed.json')
            .then(seedResponse => {
                if (!seedResponse.ok) {
                    throw new Error(`HTTP error! status: ${seedResponse.status} (seed.json)`);
                }
                return seedResponse.json();
            })
            .then(seedData => {
                this.CROP_TYPES = seedData;
                // CROP_TYPES를 기반으로 seedInventory 초기화
                Object.keys(this.CROP_TYPES).forEach(cropKey => {
                    this.seedInventory[cropKey] = 0; // 초기 씨앗 개수는 0 (또는 원하는 기본값)
                });
                console.log("작물 데이터 로드 성공:", this.CROP_TYPES);


                return fetch('./json/food.json'); // food.json 또는 실제 사용하시는 파일명으로 변경
            })
            .then(foodResponse => {
                if (!foodResponse.ok) {
                    throw new Error(`HTTP error! status: ${foodResponse.status} (food.json)`);
                }
                return foodResponse.json();
            })
            .then(foodData => {
                this.COOKING_TYPES = foodData; // food.json의 데이터를 this.COOKING_TYPES에 저장
                console.log("요리/음식 데이터 로드 성공:", this.COOKING_TYPES);

                // 모든 데이터 로딩 성공 후 나머지 초기화 진행
                this._initializeFarm();
                this._renderInventory();
                this._setupEventListeners();
                this.updateMoneyDisplay();
                this.updateCurrentToolDisplay();
                this._updateSeedCountDisplay(); // 게임 시작 시 씨앗 개수 표시
                this._startTimer(); // 타이머 시작하기

                // AchievementManager 초기화
                this.achievementManager = new AchievementManager(this.achievementListUI, this);

                this.tutorialManager.showTutorial(); // TutorialManager를 통해 호출
                return true; // 모든 초기화 성공
            })
            .catch(error => {
                console.error('데이터를 불러오는 데 실패했습니다:', error);
                let userMessage = `게임 데이터를 불러오는데 실패했습니다. (${error.message})`;
                if (error.message.includes('seed.json')) userMessage = `작물 데이터(seed.json)를 불러오는데 실패했습니다. 파일을 확인해주세요. (${error.message}) (seed.json)`;
                if (error.message.includes('food.json')) userMessage = `음식 데이터(food.json)를 불러오는데 실패했습니다. 파일을 확인해주세요. (${error.message}) (food.json)`;
                document.body.innerHTML = `<p class="error-message">${userMessage}</p>`;
                return false; // 초기화 실패
            });
    }
    //게임시작하고 timer 실행되도록함.
    _startTimer() {
        const timerElement = document.getElementById('timer');
        let timer;
        // 현재 시간을 가져옵니다.
        let startTime = new Date().getTime();

        // setInterval을 사용하여 매 초마다 시간을 업데이트합니다.
        timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;

            // 초, 분, 시간으로 변환합니다.
            const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
            const seconds = Math.floor((elapsedTime / 1000) % 60);

            // 시간 형식을 조정합니다.
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // 타이머를 업데이트합니다.
            timerElement.textContent = formattedTime;
        }, 1000); // 1초마다
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

        // ShopManager에 이벤트 리스너 위임 (ShopManager 생성자에서 처리하거나, 여기서 직접 호출)
        if (this.shopManager.shopToggleButton && this.shopManager.shopPanel) {
            this.shopManager.shopToggleButton.addEventListener('click', () => this.shopManager.togglePanel());
        } else {
            console.error("상점 토글 버튼 또는 패널 요소를 찾을 수 없습니다.");
        }

        // CookingManager에 이벤트 리스너 위임
        if (this.cookingManager.cookingToggleButton && this.cookingManager.cookingPanel) {
            this.cookingManager.cookingToggleButton.addEventListener('click', () => this.cookingManager.togglePanel());
        } else {
            console.error("조리 버튼 또는 패널 요소를 찾을 수 없습니다. (Game.js)");
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
            this.inventoryGrid.innerHTML = '<p class="inventory-empty-message"></p>';
            return;
        }
        this.inventoryItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('inventory-cell');

            const sellPrice = item.sellValue || item.harvestValue;
            let priceHTML = '';
            if (sellPrice) {
                priceHTML = `<span class="item-price">(판매가: ${sellPrice}원)</span>`;
            }

            itemElement.innerHTML = `
                <span class="item-icon">${item.icon || '❓'}</span>
                <span class="item-name">${item.name}</span>
                ${priceHTML}
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
            const harvestedItem = {
                type: cropType,
                name: cropInfo.name, // 아이템 이름
                harvestValue: cropInfo.harvestValue,
                icon: cropInfo.stages[cropInfo.stages.length - 1]
            };
            this.inventoryItems.push(harvestedItem);

            // 작물별 수확량 업데이트
            this.harvestedCounts[cropType] = (this.harvestedCounts[cropType] || 0) + 1;
            console.log(`${cropInfo.name} 수확! 현재 ${cropType} 수확량: ${this.harvestedCounts[cropType]}`);

            this._renderInventory();
            this.achievementManager.checkAchievements(); // 수확 후 업적 확인
        }
    }

    _sellItemFromInventory(itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.inventoryItems.length) {
            const itemSold = this.inventoryItems.splice(itemIndex, 1)[0];
            // 판매 가격 또는 수확 가치를 가져오되, 정의되지 않았다면 0으로 처리
            const value = Number(itemSold.sellValue || itemSold.harvestValue || 0);

            if (!isNaN(value)) { // value가 유효한 숫자인 경우에만 업데이트
                this.totalEarnings += value; // 번 돈을 totalEarnings에 추가
                this.currentMoney += value;
                this.updateMoneyDisplay();
                this._renderInventory();
                this.achievementManager.checkAchievements(); // 판매 후 업적 확인
                console.log(`${itemSold.name}을(를) 판매하여 ${value}원을 얻었습니다. 현재 돈: ${this.currentMoney}`);
            } else {
                console.error(`${itemSold.name}의 판매 가격(value)이 유효하지 않습니다:`, itemSold.sellValue, itemSold.harvestValue);
            }
        }
    }

    updateMoneyDisplay() {
        this.moneyDisplay.textContent = this.currentMoney;
        if (this.totalMoneyValueDisplay) {
            this.totalMoneyValueDisplay.textContent = `${this.totalEarnings}원`;
        }
    }

    updateCurrentToolDisplay() {
        this.currentToolDisplay.textContent = this.selectedTool ? this.selectedTool.getDisplayName() : '없음';
    }

    _updateSeedCountDisplay() {
        // HTML에 정의된 ID를 사용하여 각 씨앗의 개수를 업데이트합니다.
        // CROP_TYPES에 있는 모든 작물에 대해 시도합니다.
        Object.keys(this.CROP_TYPES).forEach(cropKey => {
            const countElement = document.getElementById(`seed-count-${cropKey}`);
            if (countElement) {
                countElement.textContent = this.seedInventory[cropKey] || 0;
            }
        });
        console.log("씨앗 개수 표시 업데이트됨:", this.seedInventory);
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

}
