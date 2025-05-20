package gui.event.day0520;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class MyActionListener implements  ActionListener
{
	//사용자가 action 이벤트를 일으키면 os로 부터 이벤트 정보를 받은 JVM은 
	//해당 이벤트 정보를 알맞는 이벤트 객체로 인스턴스화 시킨다.
	//그리고 생성된 이벤트 인스터늣는, 재정의 메서드인 actionPerformed()
	// 메서드로 전달해준다! 개발자는 자신이 알고 싶은 이벤트 정보를 ActionEvent
	//로 부터 모든 것을 알아낼 수 있다.
	public void actionPerformed(ActionEvent e){
	
	}
	
}
