class Brick extends GameObject{
    constructor(container,x,y,width,height,velX,velY,bg,border,borderColor){
        //js는 자바처럼 super()다동 호출 기능이 없다.
        super(container,x,y,width,height,0,0,bg,border,borderColor);
    }
}