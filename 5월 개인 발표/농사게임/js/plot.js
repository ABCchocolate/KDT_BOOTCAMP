class Plot {
    constructor(id, element, game) {
        this.id = id; // 각 밭의 고유한 ID
        this.element = element; // 이 밭에 해당하는 HTML 요소 (화면에 보이는 부분)
        this.game = game; // 게임 전체 로직을 담고 있는 Game 클래스의 인스턴스 (상호작용을 위해)

        this.cropType = null; // 현재 심어진 작물의 종류 (예: 'carrot', 'potato')
        this.stageIndex = 0;  // 현재 작물의 성장 단계 (0은 비어있음, 1부터 시작)
        this.growthTimer = null; // 작물 성장을 위한 타이머 ID

        // 밭(HTML 요소)을 클릭했을 때 Game 클래스의 handlePlotClick 메소드를 호출합니다.
        // this를 전달하여 어떤 밭이 클릭되었는지 Game 클래스가 알 수 있도록 합니다.
        this.element.addEventListener('click', () => this.game.handlePlotClick(this));
    }

    // 작물 심기 메소드
    plant(cropKey) {
        // 1. game 인스턴스를 통해 CROP_TYPES에서 심으려는 작물(cropKey)의 정보를 가져옵니다.
        const cropInfo = this.game.CROP_TYPES[cropKey];
        if (!cropInfo) {
            // 작물 정보가 없으면 오류를 출력하고 실패를 반환합니다.
            console.error(`[Plot.plant] ${cropKey}에 대한 작물 정보를 찾을 수 없습니다.`);
            return false;
        }

        // 2. 밭의 상태를 업데이트합니다.
        this.cropType = cropKey; // 심은 작물 종류 저장
        this.stageIndex = 1;     // 심은 직후는 첫 번째 성장 단계
        this.element.innerHTML = cropInfo.stages[0]; // HTML 요소에 첫 번째 성장 단계의 아이콘 표시
        this.element.classList.remove('empty'); // 'empty' 클래스를 제거하여 빈 밭이 아님을 표시
        this.startGrowth(); // 작물 성장 시작
        return true; // 성공적으로 심었음을 반환
    }

    // 작물 수확하기 메소드
    harvest() {
        // 1. 현재 밭에 작물이 없거나, 아직 수확할 수 없는 상태라면 아무것도 하지 않고 false를 반환합니다.
        if (!this.cropType || !this.isHarvestable()) return false;

        // 2. 수확할 작물의 정보를 가져옵니다.
        const harvestedCropInfo = this.game.CROP_TYPES[this.cropType];
        // 3. Game 클래스의 _addItemToInventory 메소드를 호출하여 수확한 작물을 인벤토리에 추가합니다.
        this.game._addItemToInventory(this.cropType);
        console.log(`밭 ${this.id}에서 ${harvestedCropInfo.name} 수확하여 창고로 이동!`);

        // 4. 밭을 초기 상태로 되돌립니다.
        this.reset();
        return true; // 성공적으로 수확했음을 반환
    }

    // 작물이 수확 가능한 상태인지 판단하는 메소드
    isHarvestable() {
        // 1. 밭에 작물이 심어져 있지 않으면 수확할 수 없으므로 false를 반환합니다.
        if (!this.cropType) return false;

        // 2. 현재 심어진 작물의 정보를 가져옵니다.
        const cropInfo = this.game.CROP_TYPES[this.cropType];

        // 3. 작물 정보가 있고, 현재 작물의 성장 단계(this.stageIndex)가
        //    해당 작물의 총 성장 단계 수(cropInfo.stages.length)와 같다면 수확 가능하다고 판단합니다.
        //    (예: 총 3단계 성장인데 현재 3단계라면 수확 가능)
        return cropInfo && this.stageIndex == cropInfo.stages.length;
    }

    // 작물 성장 시작 및 관리 메소드
    startGrowth() {
        // 1. 만약 이전에 설정된 성장 타이머(this.growthTimer)가 있다면, 이를 초기화(제거)합니다.
        //    이는 중복된 타이머 실행을 방지합니다.
        if (this.growthTimer) clearTimeout(this.growthTimer);

        // 2. 현재 심어진 작물의 정보를 가져옵니다.
        const cropInfo = this.game.CROP_TYPES[this.cropType];
        // 3. 현재 성장 단계에서 다음 단계로 넘어가는 데 필요한 시간을 가져옵니다.
        //    (stageIndex는 1부터 시작하므로, 배열 인덱스를 위해 -1 해줍니다.)
        const timeToNextStage = cropInfo.growthTimers[this.stageIndex - 1];

        // 4. 성장을 계속할 수 없는 조건들을 확인합니다:
        //    - this.cropType이 없거나 (작물이 안 심겨 있음)
        //    - this.stageIndex가 0이거나 (초기 상태, plant 메소드에서 1로 설정됨)
        //    - this.stageIndex가 이미 마지막 성장 단계를 넘었거나 같다면 (다 자랐거나 오류)
        //    이런 경우, 함수를 그냥 종료합니다.
        if (!this.cropType || this.stageIndex == 0 || this.stageIndex >= this.game.CROP_TYPES[this.cropType].stages.length) {
            return;
        }

        // 5. setTimeout을 사용하여 'timeToNextStage' 밀리초 후에 다음 성장 로직을 실행하도록 예약합니다.
        //    이 타이머의 ID를 this.growthTimer에 저장합니다.
        this.growthTimer = setTimeout(() => {
            this.stageIndex++; // 성장 단계를 1 증가시킵니다.
            // HTML 요소의 내용을 새로운 성장 단계의 아이콘으로 업데이트합니다.
            this.element.innerHTML = cropInfo.stages[this.stageIndex - 1];
            console.log(`밭 ${this.id} (${cropInfo.name}) 성장: 단계 ${this.stageIndex}/${cropInfo.stages.length}`);

            // 만약 현재 성장 단계가 마지막 단계보다 작다면 (아직 더 자라야 한다면)
            if (this.stageIndex < cropInfo.stages.length) {
                this.startGrowth(); // startGrowth 메소드를 다시 호출하여 다음 성장을 예약합니다 (재귀적 호출).
            } else {
                // 작물이 마지막 단계까지 다 자랐다면
                console.log(`밭 ${this.id} (${cropInfo.name}) 수확 준비 완료`);
                this.growthTimer = null; // 성장 타이머를 null로 설정하여 더 이상 동작하지 않도록 합니다.
            }
        }, timeToNextStage);
    }

    // 밭을 초기 상태로 되돌리는 메소드
    reset() {
        if (this.growthTimer) clearTimeout(this.growthTimer); // 진행 중인 성장 타이머가 있다면 취소합니다.
        this.cropType = null;    // 심어진 작물 종류를 null로 설정합니다.
        this.stageIndex = 0;     // 성장 단계를 0으로 설정합니다.
        this.growthTimer = null; // 성장 타이머 ID를 null로 설정합니다.
        this.element.innerHTML = ''; // 밭의 HTML 내용을 비웁니다.
        this.element.classList.add('empty'); // 'empty' 클래스를 추가하여 빈 밭임을 시각적으로 표시합니다.
    }
}
