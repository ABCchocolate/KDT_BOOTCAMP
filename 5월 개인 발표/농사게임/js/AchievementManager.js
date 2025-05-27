class AchievementManager {
    constructor(uiElement, game) {
        this.uiElement = uiElement; // 업적 목록을 표시할 ul 요소
        this.game = game; // Game 인스턴스 참조
        this.achievements = [
            {
                id: 'novice_farmer',
                name: '초보 농부 🌱',
                description: '총 200원 벌기',
                isCompleted: false,
                condition: () => this.game.totalEarnings >= 200,
                rewardMessage: '초보 농부 업적 달성! 농사의 세계에 오신 것을 환영합니다!'
            },
            {
                id: 'carrot_harvester',
                name: '당근 수확가 🥕',
                description: '당근 5개 수확하기',
                isCompleted: false,
                condition: () => (this.game.harvestedCounts['carrot'] || 0) >= 5,
                rewardMessage: '당근 수확가 업적 달성! 토끼들이 좋아하겠어요!'
            },
            {
                id: 'first_sale',
                name: '첫 판매 완료 💰',
                description: '아이템 처음으로 판매하기',
                isCompleted: false,
                condition: () => this.game.totalEarnings > 0, // 판매를 한 번이라도 하면 totalEarnings가 0보다 커짐
                rewardMessage: '첫 판매 완료! 이제부터 시작입니다!'
            }
        ];
        this.renderAchievements();
    }

    renderAchievements() {
        if (!this.uiElement) return;
        this.uiElement.innerHTML = ''; // 기존 목록 초기화

        this.achievements.forEach(ach => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ach.name}: ${ach.description}`;
            if (ach.isCompleted) {
                listItem.classList.add('completed');
            }
            this.uiElement.appendChild(listItem);
        });
    }

    checkAchievements() {
        let newAchievementCompleted = false;
        this.achievements.forEach(ach => {
            if (!ach.isCompleted && ach.condition()) {
                ach.isCompleted = true;
                newAchievementCompleted = true;
                console.log(`업적 달성: ${ach.name}`);
                if (ach.rewardMessage) {
                    // 간단한 알림 또는 게임 내 메시지 시스템과 연동 가능
                    alert(ach.rewardMessage);
                }
                // 여기에 보상 로직 추가 가능 (예: this.game.addMoney(50);)
            }
        });

        if (newAchievementCompleted) {
            this.renderAchievements(); // 업적 상태가 변경되었으므로 UI 업데이트
        }
    }
}

// 이 클래스를 사용하려면 Game 클래스에서 인스턴스화해야 합니다.
// 예: this.achievementManager = new AchievementManager(document.getElementById('achievement-list'), this);