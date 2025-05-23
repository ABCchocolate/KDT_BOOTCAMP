/*
버튼 뿐만 아니라, 눈에 보여지는 모든 컴포넌트는 실행 시 스스로를 그린다.
따라서 개발자 원하는 그림으로 커스텀 하려면,그 그림을 뺏어서 그리면 된다... 버튼을 상속받아 오버라이딩 해버리자.
자바에서 대상 클래스가 final 선언되어 있지 않으면 언제나 상속이 가능하다.
*/


package gui.graphic;
import javax.swing.JButton;
import java.awt.Graphics;

class  MyButton extends JButton
{
	//자바에서 생성자는 물려받지 않는다.
	public MyButton(String name){
		super(name);
	}	
	
	//버튼뿐 아니라 컴포넌트들이 보유하고 있는 paint()매서드를 오버라이딩하기
	//Grah[hics 는 그림 그리는 도구이다.
	
	//버튼 그림 뱃기 결론: 컴포넌트 중 본래의 그래픽을 사용해야 할 경우,
	//개발자가 그림을 뺏어야 할 상황이 왔다.
	public void paint(Graphics g){
		g.drawOval(0,0,25,25);
	}
}
