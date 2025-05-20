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
   import java.awt.event.WindowAdapter;
   import java.awt.event.WindowEvent;
   
   import java.awt.TextField;
   import java.awt.Choice;
   import gui.event.MyActionListner;
   import gui.event.MyKeyListener;
   import gui.event.MyItemListener;
   
class ActionTest 
{
	public static void main(String[] args) 
	{
		Frame frame = new Frame();
		Button bt = new Button("Click me!");
		TextField t =  new TextField(20);
		Choice ch = null; //html에서의 select박스이다!
		ch = new Choice();
		
		ch.addItem("choose your mail server");
		ch.addItem("@naver.com");
		ch.addItem("@gmail.com");
		ch.addItem("@daum.net");//html에서 option tag와 같은 것은 item이다
		
		
		bt.addActionListener(new MyActionListner()); //이벤트를 구현한 객체의 인스턴스
		t.addKeyListener(new MyKeyListener());
		ch.addItemListener(new MyItemListener());
	
		frame.setLayout(new FlowLayout());
		frame.setSize(300,400);
		frame.setVisible(true);
	
		
		frame.add(bt);
		frame.add(t);
		frame.add(ch);
		frame.addMouseListener(new MyMouseListener());
		
    }
}
