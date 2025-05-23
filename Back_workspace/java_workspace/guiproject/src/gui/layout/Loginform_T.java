package gui.layout;

import java.awt.*;

class  Loginform_T
{
	public static void main(String[] args) 
	{
		//이 프로젝트에 사용할 컴포넌트를 미리 선언
		Frame frame = null;
		Panel p_center = null;
		Panel p_south = null;
		Label la_id = null;
		Label la_pwd = null;
		TextField t_id = null;
		TextField t_pwd = null;
		Button bt_login = null;
		Button bt_join = null;
		
	
		//생성
		frame = new Frame("Login Form");
		p_center = new Panel();
		p_south = new Panel();
		la_id = new Label("ID");
		la_pwd = new Label("PASSWORD");
		t_id = new TextField(20); //생성자의 매개변수에 글자 수 사이즈를 넣을 수 있다. (입력 너비)
		t_pwd = new TextField(20);
		bt_login = new Button("login");
		bt_join = new Button("join");
		
		frame.setSize(220,135);
		frame.setVisible(true);
		
		//조립
		p_center.setLayout(new GridLayout(2,2)); //2층2호수 grid 적용
		p_center.add(la_id);
		p_center.add(t_id);
		p_center.add(la_pwd);
		p_center.add(t_pwd);
		//panel을 window의 중앙에 부착해야한다.
		frame.add(p_center);
		
		p_south.add(bt_login);
		p_south.add(bt_join);
		frame.add(p_south, BorderLayout.SOUTH);
	}
}
