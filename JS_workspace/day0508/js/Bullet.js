//총알을 정의한다.
class Bullet{
    constructor(container,x,y,width,height,velX,velY){
        this.container = container;
        this.div = document.createElement("div");
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velX = velX;
        this.velY = velY;
        

        //스타일 설정
        this.div.style.backgroundColor = "red";
        this.div.style.height = this.height + "px"; // 
        this.div.style.width = this.width + "px";
        
        this.div.style.borderRadius = "50%";
        
        this.div.style.position = "absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.filter = "blur(2px)";

        this.container.appendChild(this.div);
    }

    //총알이 날아가는 기능 정의 한다,
    move(){
        this.x += this.velX;
        this.div.style.left = this.x + "px";

       
    }
}