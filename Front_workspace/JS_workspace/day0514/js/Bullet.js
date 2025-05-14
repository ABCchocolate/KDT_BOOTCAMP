class Bullet extends GameObject {
    constructor(container, src, x, y, width, height, velX, velY) {
        super(container, src, x, y, width, height, velX, velY);
    }

    tick() {
        this.x += this.velX;
    }

    render() {
        this.img.style.left = this.x + "px";

         // 화면 밖으로 나가면 삭제
        if (this.x > 1500) {
            this.removeObject(bulletArr);
            return;
        }

        // 충돌 검사
        for (let i = enemyArr.length - 1; i >= 0; i--) {
            let enemy = enemyArr[i];

            if (collisionCheck(this.img, enemy.img)) {
                this.removeObject(bulletArr);
                enemy.removeObject(enemyArr);
                setScore(10);
                break;
            }
        }
    }
    removeObject(array) {
        this.container.removeChild(this.img);
        array.splice(array.indexOf(this), 1);
    }
}
