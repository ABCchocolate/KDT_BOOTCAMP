package gui.event;

/*java gui 에서도 사용자의 반응에 대한 이벤트 처리가 가능하다.
   하지만 js에서의 처리보다 훨씬 복잡하다.
   html 에서 클릭이벤트는 click
   java 에서 클릭이벤트라는 말은 따로 존재하지 않는다..
   action에 소속된다.*/
   

   import java.awt.Frame;
   import java.awt.Button;
   import java.awt.FlowLayout;
   import java.awt.Panel;
   
class ActionTest 
{
	public static void main(String[] args) 
	{
		Frame frame = new Frame();
		Button bt = new Button("Click me!");
		
		
		frame.setLayout(new FlowLayout());
		frame.setSize(300,400);
		frame.setVisible(true);
		frame.add(bt);
		
	}
}
