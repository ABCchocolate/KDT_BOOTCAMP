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


function gameinit(){

    // UI 요소들을 객체로 묶어 Game 클래스에 전달
    const uiElements = {
        farmGrid,
        inventoryGrid,
        moneyDisplay,
        currentToolDisplay,
        shopToggleButton,
        shopPanel,
        seedButtons: {
            carrot: plantCarrotButton,
            potato: plantPotatoButton,
            strawberry: plantStrawberryButton
        },
        harvestToolButton
    };

    // Game 인스턴스 생성
    const game = new Game(uiElements);

    // 게임 초기화 
    const initializedSuccessfully = game.initialize();

    if (!initializedSuccessfully) {
        console.error("게임 초기화에 실패하여 추가 작업을 중단합니다.");
    } else {
        console.log("게임이 성공적으로 초기화되었습니다.");
    }
}

addEventListener('load', () => {
    gameinit();
});