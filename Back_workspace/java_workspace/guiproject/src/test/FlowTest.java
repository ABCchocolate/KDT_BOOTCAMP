package test;

/*
	FlowLayout :  흐르는 배치 방법이다. 
*/

import java.awt.*;

public class FlowTest 
{
	public static void main(String[] args) 
	{
		Frame f = new Frame("우와! 윈도우 제목 설정했다.. 플로우 배치 방식");
		
		f.setLayout(new FlowLayout());
		
		for(int i = 0; i <20; i++){
			f.add(new Button(i + "번째 버튼!"));
		}
		
		f.setSize(200,250);
		f.setVisible(true);
	}
}
