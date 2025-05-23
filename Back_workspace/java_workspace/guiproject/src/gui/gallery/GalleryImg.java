package gui.gallery;

import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.Image;

public class GalleryImg extends JPanel {
    Toolkit kit = Toolkit.getDefaultToolkit();
    Image[] img = new Image[10]; // 멤버 변수로 선언

    public GalleryImg() {
        setBackground(Color.GRAY);
        setPreferredSize(new Dimension(500, 400));

        img[0] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg.jpg");
        img[1] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal1.jpg");
        img[2] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal2.jpg");
        img[3] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal3.jpg");
        img[4] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal4.jpg");
        img[5] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal5.jpg");
        img[6] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal6.jpg");
        img[7] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal7.jpg");
        img[8] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal8.jpg");
        img[9] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/aimal9.jpg");
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g); // 배경 및 기타 구성 요소 정상 처리

        if (img[0] != null) {
            g.drawImage(img[0], 0, 0, this);
        }
    }
}
