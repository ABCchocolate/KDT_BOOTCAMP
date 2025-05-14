/*
 OOP에서는 클래스 정의시 중복되는 코드의 재사용을 위해서 상속이라는 클래스
 정의법을 사용할 수 있다.
*/
/*
	parent : GUI 프로그래밍에서 컨테이너를 의미한다. < --- > Child
	super: JAVA내의  상속 관계에서 부모를 의미한다.  < --- > sub
*/
package human;

public class Human 
{
	String skinColor;
	int leg = 2;
	
	public void intellecThink(){
		System.out.println("지적인 사고력");
}
}
