package gui.font;

import java.awt.Frame;
import java.awt.Button;
import java.awt.TextArea;
import java.awt.BorderLayout;
import java.awt.Panel;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;


public class LayoutForm extends Frame implements ActionListener
{
	Button bt_layout;
	TextArea text;
	Panel p_south;
	
	public LayoutForm(){
		text = new TextArea();
		bt_layout = new Button("서식");
		p_south = new Panel();
		
		add(text);
		p_south.add(bt_layout);		
		add(p_south,BorderLayout.SOUTH);
		
		bt_layout.addActionListener(this);
		
		
		
		this.setSize(300,400);
		this.setVisible(true);
	}
	public void actionPerformed(ActionEvent e){
		Optional op = new Optional(this);
	}
	
	public static void main(String[] args) 
	{
		new LayoutForm();
	}
}
