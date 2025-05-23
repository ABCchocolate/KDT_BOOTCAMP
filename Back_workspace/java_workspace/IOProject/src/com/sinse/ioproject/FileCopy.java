package com.sinse.ioproject;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

public class FileCopy extends JFrame implements ActionListener {
	JLabel la_ori;
	JLabel la_dest;
	
	JTextField t_ori;
	JTextField t_dest;
	
	JButton bt;
	public FileCopy() {
		la_ori = new JLabel("원본");
		la_dest = new JLabel("복사본");
		
		t_ori = new JTextField(20);
		t_dest = new JTextField(20);
		
		bt= new JButton("복사 실행");
		
		setLayout(new FlowLayout());
		
		
		//크기 지정
		Dimension d=  new Dimension(100,25);
		la_ori.setPreferredSize(d);
		la_dest.setPreferredSize(d);
		Dimension dt = new Dimension(350,25);
		t_ori.setPreferredSize(dt);
		t_dest.setPreferredSize(dt);
		
		add(la_ori);
		add(t_ori);
		add(la_dest);
		add(t_dest);
		
		add(bt, BorderLayout.SOUTH);
		bt.addActionListener(this);
		setSize(400,150);
		setVisible(true);
	}
	
	//현재 실행중인 자바프로그램으로 파일을 읽어들여 원하는 경로로 내뱉기
	// = 복사
	public void copy() {
		FileInputStream fis = null; //멤버 변수가 아니므로 무조건 초기화 해야한다.
		FileOutputStream fos = null; //멤버 변수가 아니므로 무조건 초기화 해야한다.
		String name = "C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg.jpg";
		String name_copy = "C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg_copy.jpg";
		
		try {
			fis = new FileInputStream(t_ori.getText()); //원본 스트림
			fos = new FileOutputStream(t_dest.getText()); //복사본 스트림
			
			int data = -1;
			while(true) {
				data = fis.read();
				if(data == -1)
					break;
				fos.write(data);
			}
			
			//시각적으로 완료되었음을 알려주기
			JOptionPane.showInputDialog(this, "복사 완료되었습니다.");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally {
			if(fis !=null){
			try {
				fis.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}
			if(fos !=null) {
				try {
					fos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}				
			}
		}
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		copy();
		
	}
	
	public static void main(String[] args) {
		new FileCopy();
	}

	

}
