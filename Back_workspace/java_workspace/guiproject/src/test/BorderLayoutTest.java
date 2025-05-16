package test;

//배치 방법에 대해 알아보자
/*
	모든 GUI프로그램은 컴포넌트들을 조합하여 화면을 구성하기 때문에,
	각자의 배치(layout) 방법을 지원한다.
	awt에서 배치 방법은 다음과 같다.
	1) BorderLayout
		동,서,남,북,중의 방위를 갖는 배치 방법이다. 
		Frame은 개발자가 아무것도 지정하지 않으면 
		, 기본값으로 BorderLayout이 적용된다.
		
	2) FlowLayout

	3) GridLayout
*/

import java.awt.*;

class BorderLayoutTest{
	public static void main(String[] args){
		/*
		UI컴포넌트는 다른 컴포넌트를 포함할 수 있는 능력을 기준으로 2가지 유형으로 나뉘어진다.
		1) cotainer : 다른 컴포넌트를 포함할 수있다 ex)html,div,p..비슷하다!
							배치 능력이 있으므로, 여러 유형의 배치 관리자를 적용할 수 있다. 
		
		2) Visual component: 컴포넌트 안에 소속되는 대상 ex) Button, CheckBox, choic 등등 
		*/
		
		Frame frame =  new Frame(); //윈도우 생성
		BorderLayout border = new BorderLayout();
		
		//프레임에 보더 배치 적용
		frame.setLayout(border);
			
		
		Button bt_east = new Button("동쪽");
		Button bt_west = new Button("서쪽");
		Button bt_south = new Button("남쪽");
		Button bt_north = new Button("북쪽");
		Button bt_center= new Button("중앙");
		
		//북쪽에 버튼 북참
		frame.add(bt_north,BorderLayout.NORTH); 
		frame.add(bt_south,BorderLayout.SOUTH); 
		frame.add(bt_east,BorderLayout.EAST); 
		frame.add(bt_west,BorderLayout.WEST); 
		frame.add(bt_center); //개발자가 방위를 설정하지 않으면, 센터 즉 중앙에 배치된다.
		
		frame.setSize(500,450);
		frame.setVisible(true);
	}	
}