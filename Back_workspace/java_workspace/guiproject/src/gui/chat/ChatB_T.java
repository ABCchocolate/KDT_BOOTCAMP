package gui.chat;

import java.awt.*;
import java.awt.event.*;

public class ChatB_T extends Frame implements KeyListener {
    TextArea area;
    Panel p_south;
    TextField t_input;
    ChatA_T chata; // has a관계로 보유하고 있음. chatB가 chatA를 제어하기 위해.


	//Call by Reference에 의한... 생성자 호출 시 주소값을 넘겨야하므로, 이 생성자 매서드를 호출하는 자...
	//주소를 받는 쪽에서 주소에 해당하는 곳을 조종할 수 있다!
    public ChatB_T(ChatA_T chata) {
        this.chata = chata; // 새롭게 인스턴스를 생성하지 말고, 기존의 chatA를 넘겨받자.
        System.out.println("저 태어날 때 chatA정보 넘겨 받았어요" + chata);
		area = new TextArea();
        p_south = new Panel();
        t_input = new TextField(40);

        area.setBackground(Color.CYAN);

        add(area);
        p_south.add(t_input);
        add(p_south, BorderLayout.SOUTH);

        t_input.addKeyListener(this);

        setSize(300, 400);
        setVisible(true);
    }

    @Override
    public void keyTyped(KeyEvent e) {}

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_ENTER) {
            String input = t_input.getText();
            area.append("[B] " + input + "\n");
            t_input.setText("");

            chata.area.append("[B] " + input + "\n");
            chata.t_input.setText("");
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {}

  
}
