package human;

//Asian 클래스가 Human 클래스를 상속받음.
//Extends선언에 의해 부모가 보유한 멤버변수와 메서드를 자식이 물려받는다.

public class Asian extends Human 
{
	//아시아 사람만이 가질 수 있는 특징을 적었음.
	public void studyWell(){
		System.out.println("공부를 잘해요!");
	}
}  

