// 현실의 공을 정의한다.
class Ball {
    // 공 생성자
    constructor(container, x, y, width, height, velX, velY, bg) {
        this.div = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        this.bg = bg;
        this.container = container;

        // 스타일 지정
        this.div.style.position = "absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.backgroundColor = this.bg;
        this.div.style.borderRadius = "50%";

        // 화면에 부착
        this.container.appendChild(this.div);
    }

    
    move() {
            
        this.x += this.velX;
        this.y += this.velY;
    
        
        if (this.x <= 0 || this.x >= (600 - this.width)) {
            this.velX *= -1;
        }
    
        if (this.y <= 0 || this.y >= (600 - this.height)) {
            this.velY *= -1;
        }
    
        
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    }
    
}
