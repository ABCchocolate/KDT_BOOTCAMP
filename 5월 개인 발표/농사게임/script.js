document.addEventListener('DOMContentLoaded', () => {
    // 작물 종류와 정보를 정의합니다.
    const CROP_TYPES = {
        carrot: {
            name: '당근',
            seedCost: 10,
            harvestValue: 25,
            stages: ['🌱', '🌿', '🥕'], // [심은 상태, 자라는 중, 수확 가능]
            // growthTimers[0]은 stages[0] -> stages[1]로 가는 시간
            // growthTimers[1]은 stages[1] -> stages[2]로 가는 시간
            growthTimers: [3000, 5000] // 예: 3초 후 성장, 추가 5초 후 수확 가능
        },
        potato: {
            name: '감자',
            seedCost: 15,
            harvestValue: 40,
            stages: ['🥔<small>🌱</small>', '🥔<small>🌿</small>', '🥔<big>🌿</big>'], // 감자 성장 단계 예시
            growthTimers: [4000, 6000] // 예: 4초 후 성장, 추가 6초 후 수확 가능
        }
        ,
        strawberry: {
            name:'딸기', seedCost :20, harvestValue: 50,
            stages: ['🍓<small>🌱</small>', '🍓<small>🌿</small>', '🍓<big>🌸</big>', '🍓'],
            growthTimers: [2000, 3000, 4000]
        }

    };

    const farmGrid = document.getElementById('farm-grid');
    const moneyDisplay = document.getElementById('money');
    const currentToolDisplay = document.getElementById('current-tool');
    const plantCarrotButton = document.getElementById('seed-carrot');
    const plantPotatoButton = document.getElementById('seed-potato'); // 감자 씨앗 버튼 가져오기
    const plantStrawberryButton = document.getElementById('seed-strawberry'); //딸기 씨앗 버튼 가져오기
    const harvestToolButton = document.getElementById('tool-harvest');

    let currentMoney = 100;
    // selectedTool은 이제 작물 ID('carrot', 'potato') 또는 'harvest' 값을 가집니다.
    let selectedTool = null;
    const plots = []; // 밭의 상태를 저장할 배열
    //나중에 밭 확장?
    const gridSize = 5 * 3; // 5x3 밭

    // 밭 초기화
    function initializeFarm() {
        for (let i = 0; i < gridSize; i++) {
            const plotElement = document.createElement('div');
            plotElement.classList.add('plot');
            plotElement.classList.add('empty'); // 초기 상태는 비어있음
            plotElement.dataset.id = i; // 각 밭에 ID 부여
            plotElement.addEventListener('click', () => handlePlotClick(i));
            farmGrid.appendChild(plotElement);
            plots.push({
                id: i,
                cropType: null, // 어떤 종류의 작물이 심겼는지 (예: 'carrot', 'potato')
                // stageIndex: 0은 비어있음, 1은 CROP_TYPES.stages[0], 2는 CROP_TYPES.stages[1] ...
                stageIndex: 0,
                growthTimer: null
            });
        }
        updateMoneyDisplay();
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
            // CROP_TYPES 객체에서 작물 이름을 가져와 표시합니다.
            currentToolDisplay.textContent = `${CROP_TYPES[selectedTool].name} 씨앗 선택됨`;
        } else {
            currentToolDisplay.textContent = '알 수 없는 도구'; // 예외 처리
        }
    }

    plantCarrotButton.addEventListener('click', () => {
        selectedTool = 'carrot'; // 작물 ID로 변경
        updateCurrentToolDisplay();
        console.log("당근 씨앗 선택됨");
    });

    plantPotatoButton.addEventListener('click', () => {
        selectedTool = 'potato'; // 감자 씨앗 선택 시 'potato'로 설정
        updateCurrentToolDisplay();
        console.log("감자 씨앗 선택됨");
    });

    plantStrawberryButton.addEventListener('click',()=>{
        selectedTool = 'strawberry';
        updateCurrentToolDisplay();
        console.log("딸기 씨앗 선택됨");
    })

    harvestToolButton.addEventListener('click', () => {
        selectedTool = 'harvest';
        updateCurrentToolDisplay();
        console.log("수확 도구 선택됨");
    });

    function handlePlotClick(plotId) {
        const plot = plots[plotId];
        const plotElement = farmGrid.children[plotId];
        console.log(`밭 ${plotId} 클릭됨, 현재 도구: ${selectedTool}, 밭 상태: cropType=${plot.cropType}, stageIndex=${plot.stageIndex}`);

        // 씨앗 심기 로직 (이전 단계에서 수정 완료)
        if (selectedTool && selectedTool !== 'harvest' && CROP_TYPES[selectedTool]) {
            const cropToPlant = CROP_TYPES[selectedTool];

            if (plot.cropType === null) {
                if (currentMoney >= cropToPlant.seedCost) {
                    currentMoney -= cropToPlant.seedCost;
                    plot.cropType = selectedTool;
                    plot.stageIndex = 1;

                    plotElement.innerHTML = cropToPlant.stages[0];
                    plotElement.classList.remove('empty');

                    updateMoneyDisplay();
                    console.log(`밭 ${plotId}에 ${cropToPlant.name} 심음`);
                    startGrowth(plot, plotElement);
                } else {
                    alert(`${cropToPlant.name} 씨앗을 사기에 돈이 부족합니다! (필요: ${cropToPlant.seedCost}원)`);
                }
            } else {
                alert("이미 작물이 심어져 있습니다!");
            }
        } else if (selectedTool === 'harvest') {
            // 수확 로직
            if (plot.cropType && CROP_TYPES[plot.cropType]) { // 밭에 작물이 심어져 있고 유효한 작물인지 확인
                const harvestedCropInfo = CROP_TYPES[plot.cropType]; // 심어진 작물의 정보 가져오기

                // 현재 성장 단계(stageIndex)가 작물의 총 성장 단계 수(stages.length)와 같으면 수확 가능
                if (plot.stageIndex === harvestedCropInfo.stages.length) {
                    currentMoney += harvestedCropInfo.harvestValue; // 작물 정보에서 수확 가치 가져와 돈 증가
                    console.log(`밭 ${plotId}에서 ${harvestedCropInfo.name} 수확! ${harvestedCropInfo.harvestValue}원 획득.`);

                    // 밭 상태 초기화
                    plot.cropType = null;
                    plot.stageIndex = 0;
                    if (plot.growthTimer) { // 혹시 모를 성장 타이머 제거
                        clearTimeout(plot.growthTimer);
                        plot.growthTimer = null;
                    }
                    plotElement.innerHTML = ''; // 밭의 시각적 표현 비우기
                    // plotElement.classList.remove(...Object.values(CROP_TYPES).map(c => c.cssClass).filter(Boolean)); // CSS 클래스 사용 시
                    plotElement.classList.add('empty'); // 'empty' 클래스 다시 추가
                    updateMoneyDisplay();
                } else {
                    // 작물이 심어져 있지만 아직 다 자라지 않은 경우
                    alert("아직 다 자라지 않아 수확할 수 없습니다.");
                }
            } else {
                // 밭에 작물이 심어져 있지 않은 경우
                alert("수확할 작물이 없습니다.");
            }
        } else {
            // 도구가 선택되지 않았거나 알 수 없는 도구인 경우
            alert("도구를 먼저 선택해주세요 (씨앗 또는 수확 도구).");
        }
    }


    function startGrowth(plot, plotElement) {
        const cropInfo = CROP_TYPES[plot.cropType];

        // 유효한 작물 정보가 있고, 현재 성장 단계가 마지막 단계 이전인 경우에만 성장 진행
        if (cropInfo && plot.stageIndex > 0 && plot.stageIndex < cropInfo.stages.length) {
            // plot.stageIndex는 1부터 시작 (stages 배열의 0번째 인덱스에 해당)
            // 다음 단계로 넘어가는 시간은 growthTimers[현재 stageIndex - 1]
            // 예를 들어, stageIndex가 1 (stages[0] 상태)이면, growthTimers[0] 후에 stageIndex가 2 (stages[1] 상태)가 됨
            const timeToNextStage = cropInfo.growthTimers[plot.stageIndex - 1];

            // 이전 타이머가 있다면 취소 (안전장치, 현재 로직에서는 중복 호출 가능성 낮음)
            if (plot.growthTimer) {
                clearTimeout(plot.growthTimer);
            }

            plot.growthTimer = setTimeout(() => {
                plot.stageIndex++; // 다음 성장 단계로 업데이트
                plotElement.innerHTML = cropInfo.stages[plot.stageIndex - 1]; // 다음 단계 모습으로 변경
                console.log(`밭 ${plot.id} (${cropInfo.name}) 성장: 단계 ${plot.stageIndex}/${cropInfo.stages.length}`);

                if (plot.stageIndex < cropInfo.stages.length) { // 아직 더 성장할 단계가 남았다면
                    startGrowth(plot, plotElement); // 재귀적으로 다음 성장 단계 설정
                } else {
                    console.log(`밭 ${plot.id} (${cropInfo.name}) 수확 준비 완료`);
                    // 성장이 완료되면 타이머를 null로 설정 (이미 마지막 단계이므로 추가 성장은 없음)
                    plot.growthTimer = null;
                }
            }, timeToNextStage);
        } else if (cropInfo && plot.stageIndex === cropInfo.stages.length) {
            // 이미 최종 성장 단계에 도달한 경우
            console.log(`밭 ${plot.id} (${cropInfo.name}) 이미 수확 준비 완료 상태입니다.`);
        }
    }

    initializeFarm();
});
