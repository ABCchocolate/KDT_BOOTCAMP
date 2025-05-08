// 현실의 총알을 정의한다.
// java, C#, python 모든 클래스안에는 단 2가지만 작성이 가능하다. 
// property,method 만 들어올 수 있다.
// 변수(상태)와 함수(동작, 상태변화코드)

class Bullet{
    constructor(y){
        //총알이 보유할 변수들(property)를 선언한다.
        this.div = document.createElement("div");
        this.x = 0; //총알의 x축 초기의 위치
        this.y = y; //총알의 y춗 초기의 위치
        this.velX = 1; // 총알의 속도
        this.bg = parseInt(Math.random() * (7));; //매개변수로 넘어온 데이터를 클래스 변수로 보관해놓기
        this.color = ["red","yellow","orange","green","blue","navy","purple"];

        //총알이 어떤 모습으로 보여질 지 개성을 결정해야한다.(style)
        this.div.style.width = 20 + "px";
        this.div.style.height = 20 + "px";
        this.div.style.borderRadius = 20+ "px";
        this.div.style.background = this.color[this.bg];
        this.div.style.position = "absolute";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        document.body.appendChild(this.div);

        console.log("저 태어났어요!!!")
    }    
    //총알의 상태를 변경시키기 위한, 즉 움직임을 표현하기 위한 메서드 정의
    move(){
        this.div.style.left  = this.x + "pX"
        this.x += this.velX;//10 씩 이동이 고정되어있다. 

    }
}