/*
그래픽 프로그램을 개발할 시, 알고 있다면 도움이 되는 비유 

[현실]						[프로그래밍]
1) 화가						 컴포넌트 
2) 붓(행위)					 Component가 보유한 그리는 Mehtod(paint())
3) 팔레트(기타 도구)		 paint()메서드가 보유하고 있는 매개변수
4) 그려질 대상(캔버스)    Component 자신

모든 컴포넌트는 스스로 그ㅜ림을 그린다.
버튼이 스스로그림을 그릴 때 뺏어버린다.
*/
package gui.graphic;

import javax.swing.JFrame;
import javax.swing.JButton;
import java.awt.FlowLayout;
class TestFrame extends JFrame
{
	MyButton btn; //같은 자료형이므로 당연히 가능하다!
	ImgPanel ip; //내가 재정의한 패널
		
	public TestFrame(){
		ip = new ImgPanel();
		btn = new MyButton("하이용");
		
		
		setLayout(new FlowLayout());
		add(btn);
		add(ip);
		
		setVisible(true);
		setSize(300,400);
		
		//window창을 닫을 때 프로세스 종료
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
	public static void main(String[] args) 
	{
		new TestFrame();
	}
}
