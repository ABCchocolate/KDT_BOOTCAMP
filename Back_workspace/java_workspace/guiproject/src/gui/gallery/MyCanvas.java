/*
패널에 그림을 그리기 위해... 즉 paint()메서드를 정의하려고
JPanel은 Container형 이므로, 내부에 그림이 없다.. 따라서 재정의 하기가 좋다.
*/
package gui.gallery;

import javax.swing.JPanel;
import java.awt.Graphics;
import java.awt.Image;

public class MyCanvas extends JPanel
{
	Image image;
	//1)이미지를 넘겨 받을 Method를 선언하자.
	public void setImage(Image image){
		this.image= image;
	}
	//2)프레임을 보유하면...프레임이 보유한 배열도 쓸 수 있다. 
	
	
	
	public void paint(Graphics g){
		g.drawImage(image, 0,0, 600,450, this);
	}
}
