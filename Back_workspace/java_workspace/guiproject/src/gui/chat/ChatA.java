package gui.chat;

import java.awt.Frame;
import java.awt.Button;
import java.awt.TextField;
import java.awt.TextArea;
import java.awt.FlowLayout;
import java.awt.Panel;
import java.awt.BorderLayout;
import java.awt.Color;

public class ChatA extends Frame 
{	
	public TextArea area;
	public Button bt_open;
	public TextField t_input;
	public Panel p_south;

	public ChatA(){
		area = new TextArea();
		bt_open = new Button("입력");
		t_input = new TextField("내용을 입력하세요.", 30);
		p_south = new Panel();

		// 센터에 텍스트 에리어 붙이기
		add(area, BorderLayout.CENTER);
		area.setBackground(Color.YELLOW);

		// 패널에 입력창과 보내기 버튼 붙이기
		p_south.setLayout(new FlowLayout(FlowLayout.LEFT));
		p_south.add(t_input);
		p_south.add(bt_open);
		add(p_south, BorderLayout.SOUTH);

		// SendMessage 클래스와 이벤트 연결
		ChatB chatb = new ChatB();  // 필요 시 초기화만 하고 표시 X
		SendMessage sendmessage = new SendMessage(bt_open, chatb, this);

		// 버튼에 이벤트 연결
		bt_open.addActionListener(sendmessage);

		// 프레임 설정
		setSize(300, 400);
		setVisible(true);
	}

	public static void main(String[] args) {
		new ChatA();
	}
}
