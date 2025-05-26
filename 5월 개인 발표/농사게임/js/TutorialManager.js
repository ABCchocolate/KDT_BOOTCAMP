
class TutorialManager {
    constructor(game, tutorialModalOverlayElement, tutorialCloseButtonElement) {
        this.game = game; // Game 인스턴스 참조 (필요하다면)
        this.tutorialModalOverlay = tutorialModalOverlayElement;
        this.tutorialCloseButton = tutorialCloseButtonElement;

        this._setupEventListeners();
    }

    
    _setupEventListeners() {
        if (this.tutorialCloseButton && this.tutorialModalOverlay) {
            this.tutorialCloseButton.addEventListener('click', () => this.hideTutorial());
        } else {
            console.error("TutorialManager: 튜토리얼 닫기 버튼 또는 모달 오버레이 요소를 찾을 수 없습니다.");
        }
    }

    showTutorial() {
        if (this.tutorialModalOverlay) {
            this.tutorialModalOverlay.classList.add('open');
            document.body.classList.add('modal-open');
        }
    }
    
    hideTutorial() {
        if (this.tutorialModalOverlay) {
            this.tutorialModalOverlay.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    }
}
