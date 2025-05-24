class Plot {
    constructor(id, element, game) {
        this.id = id;
        this.element = element; 
        this.game = game; 

        this.cropType = null;
        this.stageIndex = 0;
        this.growthTimer = null;

        this.element.addEventListener('click', () => this.game.handlePlotClick(this));
    }

    plant(cropKey) {
        const cropInfo = this.game.CROP_TYPES[cropKey];
        if (!cropInfo) {
            console.error(`[Plot.plant] ${cropKey}에 대한 작물 정보를 찾을 수 없습니다.`);
            return false;
        }

        this.cropType = cropKey;
        this.stageIndex = 1; // 심은 직후 첫 번째 성장 단계
        this.element.innerHTML = cropInfo.stages[0];
        this.element.classList.remove('empty');
        this.startGrowth();
        return true;
    }

    harvest() {
        if (!this.cropType || !this.isHarvestable()) return false;

        const harvestedCropInfo = this.game.CROP_TYPES[this.cropType];
        this.game._addItemToInventory(this.cropType); // Game 클래스가 인벤토리 관리
        console.log(`밭 ${this.id}에서 ${harvestedCropInfo.name} 수확하여 창고로 이동!`);

        this.reset();
        return true;
    }

    isHarvestable() {
        if (!this.cropType) return false;
        const cropInfo = this.game.CROP_TYPES[this.cropType];
        return cropInfo && this.stageIndex === cropInfo.stages.length;
    }

    startGrowth() {
        if (this.growthTimer) clearTimeout(this.growthTimer);
        if (!this.cropType || this.stageIndex === 0 || this.stageIndex >= this.game.CROP_TYPES[this.cropType].stages.length) {
            return;
        }

        const cropInfo = this.game.CROP_TYPES[this.cropType];
        const timeToNextStage = cropInfo.growthTimers[this.stageIndex - 1];

        this.growthTimer = setTimeout(() => {
            this.stageIndex++;
            this.element.innerHTML = cropInfo.stages[this.stageIndex - 1];
            console.log(`밭 ${this.id} (${cropInfo.name}) 성장: 단계 ${this.stageIndex}/${cropInfo.stages.length}`);
            if (this.stageIndex < cropInfo.stages.length) {
                this.startGrowth();
            } else {
                console.log(`밭 ${this.id} (${cropInfo.name}) 수확 준비 완료`);
                this.growthTimer = null;
            }
        }, timeToNextStage);
    }

    reset() {
        if (this.growthTimer) clearTimeout(this.growthTimer);
        this.cropType = null;
        this.stageIndex = 0;
        this.growthTimer = null;
        this.element.innerHTML = '';
        this.element.classList.add('empty');
    }
}