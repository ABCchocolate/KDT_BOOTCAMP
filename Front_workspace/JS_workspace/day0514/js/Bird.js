/* 모든 새들의 어버이 격인 그냥 새 를 정의한다
*/

class Bird{
    constructor(color, age){
        console.log("Bird의 생성자가 호출됨")
        this.color = color;
        this.age = age;
    }
    eat(){
        console.log("새가 먹이를 먹어요");
        console.log(this.color);
        console.log("Bird의 나이는" + this.age);
    }

    fly(){
        console.log("새가 날아요.")
    }
}