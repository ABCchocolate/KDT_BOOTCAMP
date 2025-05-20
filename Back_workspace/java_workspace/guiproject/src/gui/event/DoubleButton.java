package gui.event;

import java.awt.Frame;
import java.awt.Button;
import java.awt.FlowLayout;
import gui.event.day0520.MyActionListener;

public class DoubleButton 
{
	public static void main(String[] args) 
	{
		Frame f = null;
		Button bt1 = null;
		Button bt2 = null;
		
		//생성자
		f = new Frame();
		bt1 = new Button("A");
		bt2 = new Button("B");		
		
		bt1.setSize(150,150);
		bt2.setSize(150,150);
		
		f.setLayout(new FlowLayout());
		f.setSize(300,400);
		f.setVisible(true);
		
		
		MyActionListener my = new MyActionListener(bt1,bt2);
		
		//버튼1 과 버튼2 구별
		bt1.addActionListener(my);
		bt2.addActionListener(my);
		
		
		
		f.add(bt1);
		f.add(bt2);
	}
}
