package gui.event;

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

public class MyItemListener implements ItemListener {
    @Override
    public void itemStateChanged(ItemEvent e) {
        System.out.println("이메일 선택했습니다!");
    }
}
