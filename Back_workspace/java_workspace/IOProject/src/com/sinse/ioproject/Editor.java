package com.sinse.ioproject;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.swing.*;

public class Editor extends JFrame implements ActionListener {

    JMenuBar bar;
    JMenu[] menu = new JMenu[5];
    String[] menu_title = { "파일", "편집", "서식", "보기", "도움말" };
    JMenuItem[] item = new JMenuItem[9];
    String[] item_title = { "새로만들기", "새 창", "열기", "저장", "다른 이름으로 저장", "페이지", "설정", "인쇄", "끝내기" };
    JTextArea area = new JTextArea();
    JFileChooser fs;

    public static final int FILE = 0;
    public static final int EDIT = 1;
    public static final int STYLE = 2;
    public static final int VIEW = 3;
    public static final int HELP = 4;

    public Editor() {
        bar = new JMenuBar();

        for (int i = 0; i < menu.length; i++) {
            menu[i] = new JMenu(menu_title[i]);
        }

        for (int i = 0; i < item.length; i++) {
            item[i] = new JMenuItem(item_title[i]);
            item[i].addActionListener(this); // 이벤트 연결
        }

        bar.setBackground(Color.LIGHT_GRAY);

        fs = new JFileChooser("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/");

        // '파일' 메뉴에 아이템 추가
        for (int i = 0; i < item.length; i++) {
            menu[FILE].add(item[i]);
            if (i == 4 || i == 6) {
                menu[FILE].addSeparator();
            }
        }

        for (int i = 0; i < menu.length; i++) {
            bar.add(menu[i]);
        }

        this.setJMenuBar(bar);

        add(new JScrollPane(area)); // JTextArea를 프레임에 추가 (스크롤 가능하게)

        setBounds(1000, 100, 800, 600);
        setVisible(true);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    public void openFile() {
        int result = fs.showOpenDialog(this);

        File file = null;
        if (result == JFileChooser.APPROVE_OPTION) {
            file = fs.getSelectedFile();
        }

        try (FileInputStream fis = new FileInputStream(file)) {
            area.setText(""); // 새로 열 때 초기화
            int data = -1;
            
            while (true) {
               data = fis.read();
               char c = ((char)data);
               if(data == -1) break;
               area.append(Character.toString((char)data));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, "파일을 읽는 도중 오류가 발생했습니다."); e.printStackTrace();
        }
        
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        Object src = e.getSource();
        if (src == item[8]) { // 끝내기
            if (JOptionPane.showConfirmDialog(this, "정말로 종료하시겠습니까?") == JOptionPane.OK_OPTION) {
                System.exit(0);
            }
        } else if (src == item[2]) { // 열기
            openFile();
        }
    }

    public static void main(String[] args) {
        new Editor();
    }
}
