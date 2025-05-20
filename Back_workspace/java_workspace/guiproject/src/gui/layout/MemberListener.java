package gui.layout;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Button;
import gui.layout.joinForm.JoinForm;

public class MemberListener implements ActionListener
{	
	JoinForm joinForm;
	Button bt_login;
	Button bt_join;

	
	public MemberListener(Button bt1, Button bt2, JoinForm joinform){
		bt_login = bt1;
		bt_join =bt2;
		joinForm = joinform;
	}
	
	//오버라이딩!!
	public void actionPerformed(ActionEvent e){
		//이벤트를 일으킨 컴포넌트가 반환 Object형으로 반환
		//ActionEvent는 버튼만 일으킬 수 있는게 아니라 클릭이 가능한 거의 모든
		//컴포넌트가 Action이 적용될 수 있다.. 따라서 Button에 국한되지 않는
		//상위 자료형으로 받아버린다.
		Object obj = e.getSource();
		if(obj == bt_login){
		System.out.println("로그인 버튼 활성화됨");
		joinForm.checkForm();
		
		}
		else if(obj == bt_join){
		System.out.println("가입 버튼 누름");
		joinForm.checkForm();
		}
	}
}
