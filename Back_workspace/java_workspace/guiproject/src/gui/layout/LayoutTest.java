package gui.layout;

 /* GUI 프로그래밍은 윈동우 프로그래밍이라고도 한다.
	 모든 UI component는 윈도우 안에서 구현되므로, 
	 
	 component란? : 재사용 가능한 UI를 갖는 객체 단위(예..버튼, checkBox)
	 [java 컴포넌트의 유형]
	 - 남을 포함할 수 있는 유형(컨테이너 형)
		예) Frame, Border, Flow
		특징 : 남을 포함하려다 보니, 어떻게 배치할지를 고민함.
				 따라서 컨테이너 형에는 배치관리자(layout manager)가 지원된다.
				 컨테이너 유형은 개발자가 배치관리자를 지정하지 않아도, 시스템에서 기본적으로 
				 배정되는 배치관리자가 있다.
				 예)Frame에서는 BorderLayout이다.
		배치관리자의 종류)
			1) BorderLayout(동,서,남,북,센터의 방향을 갖는 배치)
				각 방향에 들어가는 컴포넌트가 자신의 크기를 잃어버리고 , 확장해버린다.
				따라서 대왕버튼이 만들어진다.
			2) FlowLayout(위치가 동적인 배치)
				단, 방향성이 있어서 수평방향의 흐름 또는 수직방향의 흐름이 있다.
			3) GridLayout(행과 열의 배치방식)
				각 행과 열에 들어가는 ... 즉, cell에 들어가는 컴포넌트가 자신의 크기를 잃어버리고
				확장해버린다.
			4) CardLayout(마치 포커의 카드처럼 오직 하나의 카드만 보여지는 배치방식)
				화면 전환시에 사용된다. 사실.. 직접 만들어 구현해도 되기 때문에 사용하지 않는다.
	 
	 
	 - 남에게 포함 당할 수 있는 유형 (비주얼 컴포넌트형)
		예) 버튼, 체크박스, 초이스, 윈도우 안에 포함되는 모든 것
		특징 : 
	 
	 */
import java.awt.BorderLayout;
import java.awt.Frame;
import java.awt.Button;
import java.awt.Panel;

public class LayoutTest 
{
	public static void main(String[] args){
		Frame frame = new Frame("배치 학습");
		
		//윈도우 안에 소속되는 컨테이너 형 컴포넌트
		//따라서 다른 컴포넌트를  포함할 수 있다.. Panel로 컨테이너형이므로
		//배치관리자가 지원되며, 개발자가 지정하지 않으면 디폴트가 FlowLayout이다.
		Panel panel = new Panel(); //전체 판넬
		Panel center_panel = new Panel(); //center panel
		
		
		
		//가로: 500, 세로: 400의 윈도우 창 생성
		frame.setSize(500,400);
		//윈도우는 보이고, 안보이고 하는 기능이 있기 때문에 디폴트는 눈에 보이지 않는다.
		frame.setVisible(true);
	
		//버튼 하나를 생성해서 부착해보자. (방향을 지정하지 않으면 디포트는 센터에 배치된다.)
		Button bt_center1 = new Button("CENTER");
		Button bt_center2 = new Button("CENTER");
		center_panel.add(bt_center1);
		center_panel.add(bt_center2);
		frame.add(center_panel);
		
		//상수는 public stativ final로 선언되었고, 클래스 소속이므로, 인스턴스 생성없이 
		//사용가능하다. BorderLayout이 보유한 상수명으로 접근 가능..
		Button bt_west = new Button("WEST");
		frame.add(bt_west,BorderLayout.WEST);
		
		//남쪽에 부착하는 버튼
		Button bt_south = new Button("SOUTH");
		panel.add(bt_south); //Panel에 붙이도록 한다.
		frame.add(panel,BorderLayout.SOUTH);
	}
}
