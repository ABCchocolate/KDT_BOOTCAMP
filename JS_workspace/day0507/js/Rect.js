class Rect {
    constructor(container, x, y, width, bg) {
        this.div = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = width;
        this.bg = bg;
        this.container = container;

        // 스타일 설정
        this.div.style.position = "absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.backgroundColor = this.bg;
        this.div.style.height = "0px"; // 초기 높이는 0으로 설정

        // 화면에 부착
        this.container.appendChild(this.div);
        
        // 애니메이션 시작
        this.move();
    }

    // 막대의 높이를 랜덤으로 변화시키는 함수
    move() {
        // 높이를 랜덤으로 바꿔주는 애니메이션
        setInterval(() => {
            // 목표 높이를 랜덤으로 설정 (이퀄라이저처럼 높이가 바뀐다)
            let randomHeight = Math.random() * 400 + 50; // 최소 50px, 최대 450px로 설정

            // 막대의 높이를 점진적으로 변경
            let currentHeight = parseFloat(this.div.style.height);
            let speed = 0.1; // 변화 속도 (점진적으로 높이를 증가)

            // 목표 높이로 점진적으로 이동
            if (Math.abs(randomHeight - currentHeight) > 1) {
                currentHeight += (randomHeight - currentHeight) * speed;
                this.div.style.height = currentHeight + "px";
            }
        }, 100); // 100ms마다 높이 변화
    }
}