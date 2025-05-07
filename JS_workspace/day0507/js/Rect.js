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

    
        this.move();
    }

    move() {
        setInterval(() => {
            let randomHeight = Math.random() * 400 + 50; 

            let currentHeight = parseFloat(this.div.style.height);
            let speed = 1.0;

            if (Math.abs(randomHeight - currentHeight) > 1) {
                currentHeight += (randomHeight - currentHeight) * speed;
                this.div.style.height = currentHeight + "px";
            }
        }, 100);
    }
}
