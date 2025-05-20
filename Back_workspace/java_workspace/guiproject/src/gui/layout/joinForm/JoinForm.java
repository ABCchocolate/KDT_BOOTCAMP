package gui.layout.joinForm;

import java.awt.Frame;
import java.awt.Button;
import java.awt.Panel;
import java.awt.Label;
import java.awt.TextField;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Color;
import gui.layout.MemberListener;

//joinForm은 extends를 선언하는 순간 부터 is a 관계에 의해서 곧 frame이 되어버림...
//joinform을 대상으로 new를 하면 window탄생~
public class  JoinForm extends Frame
{	
	//필요한 재료들을 has a 관계로 보유하자
	Label la_title;
	Panel p_center;
	
	Label la_id;
	TextField t_id; //"아이디입력" 이라는 텍스트 박스
	Label la_pwd;
	TextField t_pwd; //"비밀번호입력" 이라는 텍스트 박스
	Label la_name;
	TextField t_name; //"이름입력" 이라는 텍스트 박스
	Panel p_south;
	Button bt_login;
	Button bt_join;
	
	
	public JoinForm(){
		this.setSize(300,220); //this는 생략이 가능하다.
		this.setVisible(true);
		
		
		la_title = new Label("회원가입");
		p_center = new Panel();
	
		la_id = new Label("ID");
		t_id = new TextField(20); //"아이디입력" 이라는 텍스트 박스
		la_pwd = new Label("PASSWORD");
		t_pwd = new TextField(20); 
		la_name = new Label("NAME");
		t_name = new TextField(20); //"이름입력" 이라는 텍스트 박스
		p_south = new Panel();
		bt_login = new Button("Login");
		bt_join = new Button("join");
	
		//스타일적용하기~
		la_title.setBackground(Color.YELLOW);
		t_id.setBackground(new Color(250,180,120));
		t_pwd.setBackground(Color.YELLOW);
		t_name.setBackground(Color.YELLOW);


		//조립하기~ ^^
		//제목을 북쪽에 부착하기
		add(la_title, BorderLayout.NORTH);
		
		//중앙 판넬에 붙이고 dimenstion 주고 부착하기
		Dimension d = new Dimension(110,25);
		la_id.setPreferredSize(d);
		t_id.setPreferredSize(d);
		la_pwd.setPreferredSize(d);
		t_pwd.setPreferredSize(d);
		la_name.setPreferredSize(d);
		t_name.setPreferredSize(d);
		
		//중앙 판넬에 컴포넌트들 부착
		p_center.add(la_id);
		p_center.add(t_id);
		p_center.add(la_pwd);
		p_center.add(t_pwd);
		p_center.add(la_name);
		p_center.add(t_name);
		
		//중앙 판넬을 프레임
		this.add(p_center);
		
		
		//남쪽 완성하기
		p_south.add(bt_login);
		p_south.add(bt_join);
		
		this.add(p_south, BorderLayout.SOUTH);
		
		// 리스너 생성
		MemberListener memberlistener = new MemberListener(bt_login,bt_join,this);


		// 버튼에 리스너 연결
		bt_login.addActionListener(memberlistener);
		bt_join.addActionListener(memberlistener);

		//회원가입과 관련된 컴포넌트가 모두 회원가입 폼 클래스에 존재하므로
		//폼에 대한 유횽성 체크또한 가입 폼 클래스에서 진행하는 것이
		//더욱 더 효율적이다.
	}
	public void checkForm() {
    if (t_id.getText().length() < 1) {
        System.out.println("아이디를 입력하세요!");
    }

    if (t_pwd.getText().length() < 1) {
        System.out.println("비밀번호를 입력하세요.");
    }

    if (t_name.getText().length() < 1) {
        System.out.println("이름을 입력하세요.");
    }
}

	
	public static void main(String[] args){
		new JoinForm();
	}
}
