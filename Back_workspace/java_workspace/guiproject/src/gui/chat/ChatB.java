package gui.chat;

import java.awt.Frame;
import java.awt.Button;
import java.awt.TextField;
import java.awt.TextArea;
import java.awt.FlowLayout;
import java.awt.Panel;
import java.awt.BorderLayout;
import java.awt.Color;

public class ChatB extends Frame
{	
	TextArea area;
	TextField t_input;
	Panel p_south;
	
	public ChatB(){
		area = new TextArea();
		t_input = new TextField("내용을 입력하세요.",30);
		p_south = new Panel();
		
		//센터에 텍스트 에리어 붙이기
		add(area);
		area.setBackground(Color.YELLOW);
		
		//판넬에 입력창이랑 보내기 버튼 붙이기
		p_south.add(t_input);
		
		p_south.setLayout(new FlowLayout(FlowLayout.LEFT));
		this.add(p_south,BorderLayout.SOUTH);
		
		this.setSize(300,400);
		this.setVisible(true);
		
	}
}
