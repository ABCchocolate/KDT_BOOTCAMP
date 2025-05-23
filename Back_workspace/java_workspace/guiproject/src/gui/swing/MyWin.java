/*
 AWT는 자바의 초창기 GUI 패키기지임은 맞지만, os마다 
 다른 디자인으로 실행되었다.. mac ->mac에 맞게, win - 윈도우 os
 swing은 os..즉 플랫폼에 상관없이 중립적인 Look & Feel을 보여준다.
 요즘은 swing처럼 os에 어울리지 않는 java에 최적화 디자인을 지양한다.
 따라서 javaFX가 지원됨..
 swing은 기존의 awt를 계승했기 때문에 우리가 사용해왔던 awt 컴포넌트 명에 j접두어만 붙는다.
*/

package gui.swing;
import javax.swing.JFrame;
import javax.swing.JTextArea;
import javax.swing.JPanel;
import javax.swing.JButton;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


public class MyWin extends JFrame  implements ActionListener
{
	JTextArea area;
	JPanel p_south;
	JButton bt;
	
	
	public MyWin(){
		area = new JTextArea(4,15);//행과 열을 지원해줌.
		p_south = new JPanel();
		bt = new JButton("환경 설정");
		
		//area에 배경 추가
		area.setBackground(Color.YELLOW);
		
		
		add(area);//borderlayout의 중앙에 위치하도록 붙임
		p_south.add(bt);//남쪽 패널에 버튼 부착
		add(p_south,BorderLayout.SOUTH);
		
		bt.addActionListener(this);
		
		//setSize(300,400);
		setBounds(700,200,300,400);
		
		setVisible(true);
	}
	
	//부모의 메서드 오버라이딩
	public void actionPerformed(ActionEvent e){
		System.out.println("안녕하세요!");
		
		//this : 인스턴스가 자기 자신을 가르키는 레퍼런스 변수명이다.
		Config config = new Config(this);
	}
	
	public static void main(String[] args) 
	{
		new MyWin();
	}
}
