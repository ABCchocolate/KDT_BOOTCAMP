package gui.swing;

import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Font;


public class Config extends JFrame implements ActionListener
{
	JTextField t_size;
	JButton bt;
	MyWin mywin;
	
	//외부에서 MyWin을 전달 받는다, 이 생성자 함수를 호출하는 자는 주소값에 의한 생성자 호출을  진쟁해야한다.
	//call by reference
	public Config(MyWin mywin){
		t_size = new JTextField(10);
		bt = new JButton("설정 적용");
		this.mywin = mywin;
		
		
		this.setLayout(new FlowLayout()); //Component들이 자신 본연의 크기를 유지하기 위해 플로우로..
		
		
		add(t_size);
		add(bt);
		
		bt.addActionListener(this);
		
		setBounds(1000,200,200,150);
		setVisible(true);
	}
	
	public void actionPerformed(ActionEvent e){
	
		/*
		자바의 기본 자료형은 3가지가 있다.
		기본 자료형과 객체 자료형간 변환이 가능하도록 지원되는 객체들이 있는데,
		이러한 객체들을 가르켜 refer클래스라고 한다.
		지원 되는 이유: 기본자료형으로는 해결할 수 없었던 더욱 많은 일을 하기 위해서 이다. 
		"45" => Integer.parseInt("45")
		1) 숫자
		    byte(Byte) < short(Short) < int(Integer) < long(Long)
			float(Float) < double(Double)
		*/
		mywin.area.setFont(new Font(null, 0,  Integer.parseInt(t_size.getText()))); 
	}
	
}  
