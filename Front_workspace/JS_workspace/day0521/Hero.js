class Hero extends GameObject {
    constructor(container, x, y, width, height,velX,velY, bg, border, borderColor) {
        //js는 자바처럼 super()다동 호출 기능이 없다.
        super(container, x, y, width, height,velX,velY, bg, border, borderColor);
        this.rightSensor = new RightSensor(this.div,this,this.width-3)
    }


    render() {
        //현재 화면에 등장한 벽돌과 나와의 교차 여부 (Collsion check)

        for (let i = 0; i < brickArray.length; i++) {
            for (let j = 0; j < brickArray[i].length; j++) {
                const brick = brickArray[i][j];
                if (brick != 0) {
                    if (collisionCheck(this.div, brick.div)) {
                        brick.div.style.backgroundColor = "pink";
                    }
                }
            }
        }


        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    }

    //물리량의 변화
    tick() {
        this.x += this.velX;
        this.y += this.velY;
    }
}