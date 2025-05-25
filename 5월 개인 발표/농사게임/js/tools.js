class Tool {
    constructor(name, game) {
        this.name = name;
        this.game = game;
    }

    getDisplayName() {
        return this.name;
    }

    useOnPlot(plot) { // plot은 Plot 클래스의 인스턴스
        console.log(`도구 ${this.name}는 밭에 대한 특정 작업이 정의되지 않았습니다.`);
        return false;
    }
}

class SeedTool extends Tool {
    constructor(cropKey, game) {
        super(`seed-${cropKey}`, game);
        this.cropKey = cropKey;
        this.cropInfo = this.game.CROP_TYPES[this.cropKey];
        if (!this.cropInfo) {
            console.error(`[SeedTool] ${cropKey}에 대한 작물 정보를 찾을 수 없습니다.`);
        }
    }

    getDisplayName() {
        if (!this.cropInfo) return `알 수 없는 씨앗`;
        return `${this.cropInfo.name} 씨앗 선택됨 (보유: ${this.game.seedInventory[this.cropKey]}개)`;
    }

    useOnPlot(plot) {
        if (!this.cropInfo) {
            alert("작물 정보가 올바르지 않습니다.");
            return false;
        }
        if (plot.cropType === null) {
            if (this.game.seedInventory[this.cropKey] > 0) {
                this.game.seedInventory[this.cropKey]--;
                plot.plant(this.cropKey); // Plot 객체의 plant 메소드 사용
                this.game.updateCurrentToolDisplay(); // 씨앗 개수 변경 표시
                console.log(`밭 ${plot.id}에 ${this.cropInfo.name} 심음. 남은 ${this.cropInfo.name} 씨앗: ${this.game.seedInventory[this.cropKey]}개`);
                return true;
            } else {
                alert(`${this.cropInfo.name} 씨앗이 부족합니다. 해당 씨앗 버튼을 다시 눌러 선택하거나 상점에서 구매해주세요.`);
                this.game.selectedTool = null;
                this.game.updateCurrentToolDisplay();
                return false;
            }
        } else {
            alert("이미 작물이 심어져 있습니다!");
            return false;
        }
    }
}

class HarvestTool extends Tool {
    constructor(game) {
        super('harvest', game);
    }

    getDisplayName() {
        return '수확하기';
    }

    useOnPlot(plot) {
        if (plot.isHarvestable()) {
            return plot.harvest(); // Plot 객체의 harvest 메소드 사용
        } else if (plot.cropType) {
            alert("아직 다 자라지 않아 수확할 수 없습니다.");
            return false;
        } else {
            alert("수확할 작물이 없습니다.");
            return false;
        }
    }
}