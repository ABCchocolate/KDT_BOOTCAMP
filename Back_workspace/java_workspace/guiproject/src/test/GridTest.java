package test;
import java.awt.*;

class GridTest 
{
	public static void main(String[] args) 
	{
		Frame f = new Frame("이것은 Gird 배치!");
		f.setLayout(new GridLayout(3,4));
		
		for(int i =0; i<3;i++){
			for (int j = 0;j <4; j++ )
			{
				Button bt = new Button((i+1) + "층" + j + "호");
				bt.setBackground(Color.BLUE);//COLOR 클래스가 보유한 상수
				f.add(bt);
			}
		}
		
		f.setSize(500,450);
		f.setVisible(true);
	}
}
