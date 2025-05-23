package gui.chat;

import java.awt.Frame;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.Button;
import java.awt.Panel;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;

public class ChatA_T extends Frame implements ActionListener,KeyListener{
								//is a                 //is a
	TextArea area;
	Panel p_south;
	TextField t_input;
	Button bt_open;
	ChatB_T chatb;
	
	public ChatA_T(){
		area= new TextArea();
		p_south = new Panel();
		t_input = new TextField(30);
		bt_open = new Button("열기");
		
		//스타일
		area.setBackground(Color.YELLOW);
		
		add(area);
		p_south.add(t_input);
		p_south.add(bt_open);
		add(p_south, BorderLayout.SOUTH);
		
		
		//버튼과 리스너인 者와의 연결
		bt_open.addActionListener(this);
		
		//텍스트 필드와 리스너인 者와의 연결
		t_input.addKeyListener(this);
		setSize(300,400);
		setVisible(true);
	}
	
	//ActionListener를 구현하겠다고 선언하였으므로, 현재 클래스에서 인터페이스의
	//메서드를 오버라이딩 하자!
	public void actionPerformed(ActionEvent e) {
    chatb = new ChatB_T(this);
    // 현재 창의 위치 기준으로 옆에 위치시키기
    int x = getX();
    int y = getY();
    chatb.setLocation(x + getWidth() + 10, y); // 오른쪽 10px 여유
}

	
	//KeyListener의 메서드를 재정의한다.
	public void keyTyped(KeyEvent e){
	};
	public void keyPressed(KeyEvent e){
		if (e.getKeyCode() == KeyEvent.VK_ENTER)
		{
			//나의 텍스트 필드값을 얻어서 전달한다.
			String input = t_input.getText();
			area.append("[A]" + input+"\n");
			//setText는 기존에 있던 text를 대체시킬 뿐!!
			t_input.setText("");
			
			chatb.area.append("[A]" +input+"\n");
			chatb.t_input.setText("");
		}
	}
	public void keyReleased(KeyEvent e){};
	
	
	
	public static void main(String[] args) {
		new ChatA_T();
	}
}