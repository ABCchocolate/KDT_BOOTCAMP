//컴포넌트 중 주로 컨테이너 형은 아무것도 그려지지 않은 투명도화지 같기에
//개발자가 커스터마이징하기에 너무 좋다.
//JPanel,Canvas 등 JFrame 가능은 하다.

package gui.graphic;

import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.Image;
import java.awt.Font;

public class ImgPanel extends JPanel
{
	//이미지를 얻는 것은 개발자의 능력 밖이므로, 시스템 상의 이미지를 대신 구해주는 
	//객체를 통해 추상 클래스인 Image객체의 인스턴스를 얻어와 보자.
	Toolkit kit = Toolkit.getDefaultToolkit(); //이미지를 우리 대신 얻어와줌,,
	Image image; //추상 클래스이므로, toolkit으로부터 얻어오자
	public ImgPanel()
	{
		setBackground(Color.YELLOW);
		
		//그림을 그리기 전에 이미지를 먼저 얻어오자
		image = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg.jpg");
		
		this.setPreferredSize(new Dimension(270,350));
	}
	
	//패널이 보유한 그리기 메서드를 재정의한다.
	//붓에 해당한다.
	public void paint(Graphics g){
		g.drawImage(image, 0,0, this);
		
		//paint통 교체
		g.setColor(Color.RED);
		
		//선그리기
		g.drawLine(100,0,300,200);
		
		g.drawOval(0,0,200,200);
		
		//paint통 교체
		g.setColor(Color.YELLOW);
		g.drawOval(100,100,100,100);
		
		//글씨를 그리자.
		g.setColor(Color.GREEN);
		g.setFont(new Font("Verdana", Font.BOLD,40));
		g.drawString("HI! I'm \n Verdana", 50, 100);
		
		//사각형을 그려보자
		g.drawRect(150,250,100,100);
		
	}
}