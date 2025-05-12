//다른 클래스를 사용하기 위한 클래스이므로, 실행부를 정의하자
package use; //개발자가 패키지를 선언하면, java -d 옵션 사용 시 선언한 패키지에 해당하는 dir을 자동으로 생성해버린다. 


import  animal.Dog; //classpath 환경변수를 기준으로, 그 밑의 animal밑의 Dog.class를 import 를 한다.

class UseDog 
{
	public static void main(String[] args) 
	{
		Dog d = new Dog();
		d.bark();		
	}
}
\