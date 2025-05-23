package com.sinse.ioproject;

import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

public class GUICopy extends JFrame implements ActionListener {
	JLabel la_ori;
	JLabel la_dest;
	JTextField t_ori;
	JTextField t_dest;
	JButton bt_ori, bt_dest, bt_copy;
	JFileChooser fileChooser;

	public GUICopy() {
		la_ori = new JLabel("원래 이미지");
		la_dest = new JLabel("복사된 이미지");
		t_ori = new JTextField(20);
		t_dest = new JTextField(20);
		bt_ori = new JButton("열기");
		bt_dest = new JButton("저장");
		bt_copy = new JButton("복사");

		fileChooser = new JFileChooser();

		Dimension dl = new Dimension(100, 24); // 라벨 크기
		Dimension d = new Dimension(300, 24); // 텍스트 필드, 버튼 크기

		setLayout(new FlowLayout());
		la_ori.setPreferredSize(dl);
		la_dest.setPreferredSize(dl);
		t_ori.setPreferredSize(d);
		t_dest.setPreferredSize(d);
		bt_ori.setPreferredSize(d);
		bt_dest.setPreferredSize(d);
		bt_copy.setPreferredSize(d);

		add(la_ori);
		add(t_ori);
		add(bt_ori);
		add(la_dest);
		add(t_dest);
		add(bt_dest);
		add(bt_copy);

		bt_ori.addActionListener(this);
		bt_dest.addActionListener(this);
		bt_copy.addActionListener(this);

		setSize(700, 220);
		setVisible(true);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
	}

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
	    if (e.getSource() == bt_ori) {
	        int result = fileChooser.showOpenDialog(this);
	        if (result == JFileChooser.APPROVE_OPTION) {
	            File file = fileChooser.getSelectedFile();
	            t_ori.setText(file.getAbsolutePath());
	        }

	    } else if (e.getSource() == bt_dest) {
	        int result = fileChooser.showSaveDialog(this);
	        if (result == JFileChooser.APPROVE_OPTION) {
	            File file = fileChooser.getSelectedFile();
	            t_dest.setText(file.getAbsolutePath());
	        }

	    } else if (e.getSource() == bt_copy) {
	        copy();
	    }
	}


	public static void main(String[] args) {
		new GUICopy();
	}
}
