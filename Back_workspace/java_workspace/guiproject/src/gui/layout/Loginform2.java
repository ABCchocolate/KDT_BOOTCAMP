package gui.layout;

import java.awt.*;

class  Loginform2
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
		Dimension d = new Dimension(100, 25);
	
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
		
		//윈도우 설정
		frame.setSize(300,135);
		frame.setVisible(true);
		
		/*
			처음 보는 객체에 대한 대처법
			1) 객체명으로 기능을 예측하자, 예측이 안된다면 조사하자!
			2) 사용하기 위해 메모리 올리는 방법을 파악하자.(객체 유형은 3가지
				-일반 클래스 : new 생성자()
				-추상 클래스 : 자식을 구현한 후 자식을 new 생성자()
				-인터페이스  : 자식으로 구현한 후 자식을 new 생성자()
		*/
		
		
		//크기 설정
		la_id.setPreferredSize(d);
		la_pwd.setPreferredSize(d);
		t_id.setPreferredSize(d);
		t_pwd.setPreferredSize(d);
		
		//조립
		p_center.add(la_id);
		p_center.add(t_id);
		p_center.add(la_pwd);
		p_center.add(t_pwd);
		
		//중앙 패널을 윈도우에 부착한다.
		frame.add(p_center);
		
		p_south.add(bt_login);
		p_south.add(bt_join);
		frame.add(p_south, BorderLayout.SOUTH);
	}
}
