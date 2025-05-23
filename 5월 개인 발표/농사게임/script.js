document.addEventListener('DOMContentLoaded', () => {
    // 작물 종류와 정보를 정의합니다.
    const CROP_TYPES = {
        carrot: {
            name: '당근',
            seedCost: 10,
            harvestValue: 25,
            stages: ['🌱', '🌿', '🥕'], // [심은 상태, 자라는 중, 수확 가능]
            growthTimers: [3000, 5000] // 예: 3초 후 성장, 추가 5초 후 수확 가능
        },
        potato: {
            name: '감자',
            seedCost: 15,
            harvestValue: 40,
            stages: ['🥔<small>🌱</small>', '🥔<small>🌿</small>', '🥔<big>🌿</big>'], // 감자 성장 단계 예시 (마지막 단계 수정)
            growthTimers: [4000, 6000] // 예: 4초 후 성장, 추가 6초 후 수확 가능
        },
        strawberry: {
            name:'딸기', seedCost :20, harvestValue: 50,
            stages: ['🍓<small>🌱</small>', '🍓<small>🌿</small>', '🍓<big>🌸</big>', '🍓'],
            growthTimers: [2000, 3000, 4000]
        }
    };
    
    const farmGrid = document.getElementById('farm-grid');
    const inventoryGrid = document.getElementById('inventory-grid');
    const moneyDisplay = document.getElementById('money');
    const currentToolDisplay = document.getElementById('current-tool');
    const plantCarrotButton = document.getElementById('seed-carrot');
    const plantPotatoButton = document.getElementById('seed-potato');
    const plantStrawberryButton = document.getElementById('seed-strawberry');
    const harvestToolButton = document.getElementById('tool-harvest');

    // 상점 UI 요소
    const shopToggleButton = document.getElementById('shop-toggle-button');
    const shopPanel = document.getElementById('shop-panel');

    let currentMoney = 100;
    let selectedTool = null;
    
    const plots = []; // 밭의 상태 배열
    let inventoryItems = []; // 수확한 작물 아이템 배열
    const gridSize = 5 * 3; // 밭 크기

    // 씨앗 인벤토리: 각 씨앗의 보유 개수를 저장
    const seedInventory = {
        carrot: 0,
        potato: 0,
        strawberry: 0
    };

    // 밭 초기화
    function initializeFarm() {
        for (let i = 0; i < gridSize; i++) {
            const plotElement = document.createElement('div');
            plotElement.classList.add('plot');
            plotElement.classList.add('empty'); 
            plotElement.dataset.id = i; 
            plotElement.addEventListener('click', () => handlePlotClick(i));
            farmGrid.appendChild(plotElement);
            plots.push({
                id: i,
                cropType: null, 
                stageIndex: 0,
                growthTimer: null
            });
        }
        updateMoneyDisplay();
    }

    // 인벤토리 UI 렌더링 함수
    function renderInventory() {
        inventoryGrid.innerHTML = ''; 

        if (inventoryItems.length === 0) {
            inventoryGrid.innerHTML = '<p style="text-align:center; width:100%;">창고가 비어있습니다.</p>'; 
            return;
        }

        inventoryItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('inventory-cell'); 
            itemElement.innerHTML = `
                <span style="font-size: 2em;">${item.icon}</span>
                <span>${item.name}</span>
                <span>(판매가: ${item.harvestValue}원)</span>
            `;
            
            // 아이템 클릭 시 바로 판매
            itemElement.addEventListener('click', (event) => {
                event.stopPropagation(); 
                sellItemFromInventory(index);
            });
            // 판매 버튼 제거
            inventoryGrid.appendChild(itemElement);
        });
        // console.log('인벤토리 아이템:', inventoryItems); 
    }

    // 인벤토리에 아이템 추가 함수
    function addItemToInventory(cropType) {
        const cropInfo = CROP_TYPES[cropType];
        if (cropInfo) {
            inventoryItems.push({
                type: cropType,
                name: cropInfo.name,
                harvestValue: cropInfo.harvestValue,
                icon: cropInfo.stages[cropInfo.stages.length - 1] 
            });
            renderInventory(); 
            console.log(`${cropInfo.name}을(를) 창고에 추가했습니다.`);
        }
    }

    // 인벤토리에서 아이템 판매 함수
    function sellItemFromInventory(itemIndex) {
        if (itemIndex >= 0 && itemIndex < inventoryItems.length) {
            const itemSold = inventoryItems.splice(itemIndex, 1)[0]; 
            currentMoney += itemSold.harvestValue; 
            updateMoneyDisplay(); 
            renderInventory(); 
            console.log(`${itemSold.name}을(를) 판매하여 ${itemSold.harvestValue}원을 얻었습니다.`);
        } else {
            console.error("잘못된 아이템 인덱스입니다:", itemIndex);
        }
    }

    function updateMoneyDisplay() {
        moneyDisplay.textContent = currentMoney;
    }

    function updateCurrentToolDisplay() {
        if (!selectedTool) {
            currentToolDisplay.textContent = '없음';
        } else if (selectedTool === 'harvest') {
            currentToolDisplay.textContent = '수확하기';
        } else if (CROP_TYPES[selectedTool]) {
            currentToolDisplay.textContent = `${CROP_TYPES[selectedTool].name} 씨앗 선택됨 (보유: ${seedInventory[selectedTool]}개)`;
        } else {
            currentToolDisplay.textContent = '알 수 없는 도구'; 
        }
    }

    // 씨앗 심기 버튼 공통 로직
    function handleSeedButtonClick(cropKey) {
        if (seedInventory[cropKey] > 0) {
            selectedTool = cropKey;
            console.log(`${CROP_TYPES[cropKey].name} 씨앗 선택됨. (남은 개수: ${seedInventory[cropKey]})`);
        } else {
            selectedTool = null; // 씨앗이 없으면 도구 선택 해제
            alert(`${CROP_TYPES[cropKey].name} 씨앗이 없습니다. 상점에서 구매해주세요.`);
            console.log(`${CROP_TYPES[cropKey].name} 씨앗 없음.`);
        }
        updateCurrentToolDisplay();
    }

    plantCarrotButton.addEventListener('click', () => {
        handleSeedButtonClick('carrot');
    });

    plantPotatoButton.addEventListener('click', () => {
        handleSeedButtonClick('potato');
    });

    plantStrawberryButton.addEventListener('click',()=>{
        handleSeedButtonClick('strawberry');
    })

    harvestToolButton.addEventListener('click', () => {
        selectedTool = 'harvest';
        updateCurrentToolDisplay();
        console.log("수확 도구 선택됨");
    });

    function handlePlotClick(plotId) {
        const plot = plots[plotId];
        const plotElement = farmGrid.children[plotId];
        // console.log(`밭 ${plotId} 클릭됨, 현재 도구: ${selectedTool}, 밭 상태: cropType=${plot.cropType}, stageIndex=${plot.stageIndex}`);

        if (selectedTool && selectedTool !== 'harvest' && CROP_TYPES[selectedTool]) {
            const cropToPlant = CROP_TYPES[selectedTool];

            if (plot.cropType === null) {
                // 씨앗 비용은 상점에서 구매 시 지불하므로 여기서는 확인 및 차감 안 함.
                // 대신 씨앗 인벤토리에서 씨앗이 있는지 확인하고 소모.
                if (seedInventory[selectedTool] > 0) {
                    seedInventory[selectedTool]--; // 씨앗 소모
                    plot.cropType = selectedTool;
                    plot.stageIndex = 1;

                    plotElement.innerHTML = cropToPlant.stages[0];
                    plotElement.classList.remove('empty');

                    updateMoneyDisplay();
                    updateCurrentToolDisplay(); // 씨앗 개수 변경 표시
                    console.log(`밭 ${plotId}에 ${cropToPlant.name} 심음. 남은 ${cropToPlant.name} 씨앗: ${seedInventory[selectedTool]}개`);
                    startGrowth(plot, plotElement);
                } else {
                    alert(`${cropToPlant.name} 씨앗이 부족합니다. 해당 씨앗 버튼을 다시 눌러 선택하거나 상점에서 구매해주세요.`);
                    selectedTool = null; // 도구 선택 해제
                    updateCurrentToolDisplay();
                }
            } else {
                alert("이미 작물이 심어져 있습니다!");
            }
        } else if (selectedTool === 'harvest') {
            if (plot.cropType && CROP_TYPES[plot.cropType]) { 
                const harvestedCropInfo = CROP_TYPES[plot.cropType]; 
                if (plot.stageIndex === harvestedCropInfo.stages.length) {
                    addItemToInventory(plot.cropType); 
                    console.log(`밭 ${plotId}에서 ${harvestedCropInfo.name} 수확하여 창고로 이동!`);

                    plot.cropType = null;
                    plot.stageIndex = 0;
                    if (plot.growthTimer) { 
                        clearTimeout(plot.growthTimer);
                        plot.growthTimer = null;
                    }
                    plotElement.innerHTML = ''; 
                    plotElement.classList.add('empty'); 
                } else {
                    alert("아직 다 자라지 않아 수확할 수 없습니다.");
                }
            } else {
                alert("수확할 작물이 없습니다.");
            }
        } else {
            alert("도구를 먼저 선택해주세요 (씨앗 또는 수확 도구).");
        }
    }

    function startGrowth(plot, plotElement) {
        const cropInfo = CROP_TYPES[plot.cropType];

        if (cropInfo && plot.stageIndex > 0 && plot.stageIndex < cropInfo.stages.length) {
            const timeToNextStage = cropInfo.growthTimers[plot.stageIndex - 1];

            if (plot.growthTimer) {
                clearTimeout(plot.growthTimer);
            }

            plot.growthTimer = setTimeout(() => {
                plot.stageIndex++; 
                plotElement.innerHTML = cropInfo.stages[plot.stageIndex - 1]; 
                console.log(`밭 ${plot.id} (${cropInfo.name}) 성장: 단계 ${plot.stageIndex}/${cropInfo.stages.length}`);

                if (plot.stageIndex < cropInfo.stages.length) { 
                    startGrowth(plot, plotElement); 
                } else {
                    console.log(`밭 ${plot.id} (${cropInfo.name}) 수확 준비 완료`);
                    plot.growthTimer = null;
                }
            }, timeToNextStage);
        } else if (cropInfo && plot.stageIndex === cropInfo.stages.length) {
            console.log(`밭 ${plot.id} (${cropInfo.name}) 이미 수확 준비 완료 상태입니다.`);
        }
    }

    // 상점 UI 로직
    console.log('Shop Toggle Button:', shopToggleButton); 
    console.log('Shop Panel:', shopPanel); 

    if (shopToggleButton && shopPanel) {
        console.log('상점 버튼과 패널 요소를 찾았습니다. 이벤트 리스너를 추가합니다.'); 
        shopToggleButton.addEventListener('click', () => {
            console.log('상점 토글 버튼 클릭됨!'); 
            shopPanel.classList.toggle('open'); 
            shopToggleButton.classList.toggle('shop-open'); 

            if (shopPanel.classList.contains('open')) {
                shopToggleButton.textContent = '➡️'; 
                renderShop(); 
                console.log('상점 열림, renderShop() 호출됨.');
            } else {
                shopToggleButton.textContent = '🛒'; 
                console.log('상점 닫힘.');
            }
        });
    } else {
        console.error("상점 토글 버튼 또는 패널 요소를 찾을 수 없습니다.");
    }

    // 상점 아이템 렌더링 함수
    function renderShop() {
        shopPanel.innerHTML = '<h2>상점</h2>'; 

        Object.keys(CROP_TYPES).forEach(cropKey => {
            const crop = CROP_TYPES[cropKey];
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
            buyButton.addEventListener('click', () => buyItem(cropKey));

            shopItemElement.appendChild(buyButton);
            shopPanel.appendChild(shopItemElement);
        });
    }

    // 아이템 구매 함수
    function buyItem(cropKey) {
        const cropToBuy = CROP_TYPES[cropKey];
        if (currentMoney >= cropToBuy.seedCost) {
            currentMoney -= cropToBuy.seedCost;
            seedInventory[cropKey]++; // 구매한 씨앗 개수 증가
            updateMoneyDisplay();
            // selectedTool = cropKey; // 구매 시 바로 도구로 선택하지 않음
            // updateCurrentToolDisplay(); // 도구 표시 업데이트는 씨앗 버튼 클릭 시
            alert(`${cropToBuy.name} 씨앗을 구매했습니다!`);
            console.log(`${cropToBuy.name} 씨앗 구매. 현재 ${cropKey} 씨앗: ${seedInventory[cropKey]}개. 남은 돈: ${currentMoney}원`);
            renderShop(); // 상점 UI를 다시 그려서 씨앗 개수 등 변경사항 반영 (선택적)
        } else {
            alert(`${cropToBuy.name} 씨앗을 구매하기에 돈이 부족합니다. (현재 돈: ${currentMoney}원, 필요: ${cropToBuy.seedCost}원)`);
        }
    }

    // 초기화 함수 호출
    initializeFarm();
    renderInventory(); 
});
