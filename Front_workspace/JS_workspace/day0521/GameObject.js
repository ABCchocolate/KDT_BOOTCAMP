class GameObject{
    constructor(container,x,y,width,height,velX,velY,bg,border,borderColor){
        this.container =container;
        this.div = document.createElement("div"); //프로토 타입의 캐릭터.. 처음부터 이미지를 사용하게 되면 이미지는 부모 기능이 없기 때문에 센서의 가시성을 확보하기가 어렵다.
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.velX = velX; //0이면 멈춤
        this.velY = velY;  //0이면 멈춤

        this.bg = bg;
        this.border = border;
        this.borderColor = borderColor;

        //스타일 및 조립하기
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y+"px"
        this.div.style.position = "absolute";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.background = this.bg;
        this.div.style.border = `${this.border}px solid ${this.borderColor}`;

        this.container.appendChild(this.div);
    }
    //오브젝트의 변하게 될 물리량 계산이 주 역할이다. .update(), tick()과 같은 
    tick(){

    }

    //오브젝트가 실제로 데이터 안에 실존하게 한다.render(),paint()
    render(){};
}