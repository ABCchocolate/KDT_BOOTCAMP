package gui.graphic;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.Dimension;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;



public class MoveTest extends JFrame implements ActionListener
{
	JButton bt;
	JPanel p_north;
	MovePanel p_center; //이 패널은 커스텀 해야함!
	
	public MoveTest(){
	bt = new JButton("이동");
	p_north = new JPanel();
	p_center = new MovePanel();
	
	
	p_north.add(bt);
	add(p_north, BorderLayout.NORTH);
	add(p_center);
	
	bt.addActionListener(this);
	
	p_center.setBackground(Color.GREEN);
	setSize(600,650);
	p_north.setLayout(new FlowLayout());
	p_north.setPreferredSize(new Dimension(600,50));
	
	
	setVisible(true);
	
	this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	
	}
	
	
	public void actionPerformed(ActionEvent e){
		//MovePanel의 빨간색 원을 이동시키자.
		//int x = p_center.getX();
		//int y = p_center.getY();
		//x += 3;
		//y += 3;
		//p_center.setX(x);
		//p_center.setY(y);
		
		p_center.Move();
		p_center.repaint();
		//절대 paint(Grphics)호출 금지
		
	}
	
	
	public static void main(String[] args) 
	{
		new MoveTest();
	}
}
