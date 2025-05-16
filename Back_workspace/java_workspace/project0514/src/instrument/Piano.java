package instrument;
import riding.Roller;
public class Piano extends MusicTool implements Roller

{	//추상 클래스를 상속받는 sub 클래스는 반드시 
	//부모의 불완전한 메서드인 추상 메서드를 완전하게 구현할 의무를 가진다.
	// = 구현 강제 

	
	//자바에서는 현실의 개념을 그대로 반영하여, 다중 상속을 허용하지 않는다.
	//하지만, 우리의 현실에서 제품을 개발할 때 다중상속적 특성이 상당히 반영되어 있다.
		public void roll(){
			System.out.println("피아노 타고 다녀요!!!!");
		}
	
	
		//부모의 메서드를 자식이 재정의하는 메서드 정의기법
		//즉 오버라이딩 의무가 생긴다.
		public void setVolume(){
			System.out.println("피아노의 소리를 높일게요");
		}
	
}
