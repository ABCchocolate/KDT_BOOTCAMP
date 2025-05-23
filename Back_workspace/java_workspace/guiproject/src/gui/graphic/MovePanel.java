package gui.graphic;

import javax.swing.JPanel;
import java.awt.Graphics;
import java.awt.Color;

public class MovePanel extends JPanel
{
	private int x;
	private int y;

	public void Move(){
		x++;
		y++;
	}
	
	
	public int getX(){
		return x;
	}
	
	public void setX(int x){
		this.x = x;
	}
	
	public int getY(){
		return y;
	}
	
	public void setY(int y){
		this.y = y;
	}
	
	
	//JPanel의 paint()메서드를 오버라이딩
	public void paint(Graphics g){
		//	fillOval(int x, int y, int width, int height) 채워진 원 그리기
		g.setColor(Color.RED);
		//이동해야한다 . -> 값이 변한다. -> 변수를 사용해야함.
		g.fillOval(x,y,45,45);
	}
}  
