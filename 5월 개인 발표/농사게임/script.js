// DOM 요소 가져오기
    const farmGrid = document.getElementById('farm-grid');
    const inventoryGrid = document.getElementById('inventory-grid');
    const moneyDisplay = document.getElementById('money');
    const currentToolDisplay = document.getElementById('current-tool');
    const plantCarrotButton = document.getElementById('seed-carrot');
    const plantPotatoButton = document.getElementById('seed-potato');
    const plantStrawberryButton = document.getElementById('seed-strawberry');
    const harvestToolButton = document.getElementById('tool-harvest');
    const shopToggleButton = document.getElementById('shop-toggle-button');
    const shopPanel = document.getElementById('shop-panel');
    const cookingToggleButton = document.getElementById('cooking-toggle-button');
    const cookingPanel = document.getElementById('cooking-panel');
    const totalMoneyValueDisplay = document.getElementById('total-money-value'); // 왼쪽 사이드바 금액 표시
    const achievementListUI = document.getElementById('achievement-list'); // 업적 목록 UI


function gameinit(){

    // UI 요소들을 객체로 묶어 Game 클래스에 전달
    const uiElements = {
        farmGrid,
        inventoryGrid,
        moneyDisplay,
        currentToolDisplay,
        shopToggleButton,
        shopPanel,
        cookingToggleButton,
        cookingPanel,
        achievementListUI, // Game 클래스로 전달할 UI 요소에 추가
        totalMoneyValueDisplay, // Game 클래스로 전달할 UI 요소에 추가
        seedButtons: {
            carrot: plantCarrotButton,
            potato: plantPotatoButton,
            strawberry: plantStrawberryButton
        },
        harvestToolButton,
        
        tutorialModalOverlay: document.getElementById('tutorial-modal-overlay'),
        tutorialCloseButton: document.getElementById('tutorial-close-button')
    
    };

    // Game 인스턴스 생성
    const game = new Game(uiElements);

    // 게임 초기화 (initialize는 Promise를 반환)
    game.initialize()
        .then(success => {
            if (success) {
                console.log("게임이 성공적으로 초기화되었습니다.");
            } else {
                console.error("게임 초기화에 실패하여 추가 작업을 중단합니다.");
                // 여기서 추가적인 오류 처리 UI를 표시할 수도 있습니다.
            }
        });
}

addEventListener('load', () => {
    gameinit();
});
