package day0519;

import java.awt.Button;
import java.awt.Frame;

public class Action
{
    public static void main(String[] args)
    {
        // 생성
        Frame f = null;
        Button bt = null;

        // 생성자
        f = new Frame();
        bt = new Button("클릭");

        // 연결
        bt.addActionListener(new ActionButton());
        f.add(bt); // 버튼을 프레임에 추가해야 함

        f.setSize(200, 200);
        f.setVisible(true);
    }
}
