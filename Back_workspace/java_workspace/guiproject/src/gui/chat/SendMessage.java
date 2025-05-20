package gui.chat;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Button;
import gui.chat.ChatB;
import gui.chat.ChatA;

public class SendMessage implements ActionListener {
    Button bt_open;
    ChatB chatb;
    ChatA chata;

    // 생성자
    public SendMessage(Button bt_open, ChatB chatb, ChatA chata) {
        this.bt_open = bt_open;
        this.chatb = chatb;
        this.chata = chata;

        // t_input에 Enter 입력 감지용 ActionListener 추가
        this.chata.t_input.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String input = chata.t_input.getText();
                if (!input.trim().isEmpty()) {
                    chata.area.append(input + "\n");
                    chata.t_input.setText("");
                }
            }
        });
    }

    // 버튼 클릭 시 ChatB 창 오픈
    @Override
    public void actionPerformed(ActionEvent e) {
        Object obj = e.getSource();

        if (obj == bt_open) {
            openChatB();
        }
    }

    public void openChatB() {
        ChatB newChatB = new ChatB();
        newChatB.setVisible(true); 
    }
}
