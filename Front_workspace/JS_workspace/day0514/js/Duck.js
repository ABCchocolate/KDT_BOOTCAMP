/* ES6 부터는 클래스뿐 아니라 상속까지도 java언어와 흡사하게 지원한다*/ 

class Duck extends Bird{
    /* JS와 JAVA 둘 다 상속 관계에서 자식의 인스턴스가 초기화 되기 전에 부모의 인스턴스 초기화가 앞서야함은 동일하다.
    하지만 JS의 경우 개발자가 자식의 클래스에서 생성자를 정의만 해도, 무조건 부모의 생성자 호출을 의무 사항으로 명시한다.*/
    
    constructor(color,age){
        super(color, age);
        //super은 부모의 consturcor()을 의미한다.
        this.color = color;
        this.age = age;
    }
    
    fly(){
        console.log("오리 난다!!!!!!!!!!!!!!!");
        console.log(this.color);
        console.log("Duck의 나이는" + this.age);
    }

}