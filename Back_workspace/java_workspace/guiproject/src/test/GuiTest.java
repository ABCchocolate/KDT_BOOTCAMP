package test;
//그림으로 조작하는 프로그램 GUI

//Java 그래픽 관련 API는 java.awt패키지에 들어있다.
//모든 데스크탑 기반의 GUI 프로그램에서 최상단에 존재하는 그래픽 컴포넌트는 window이다. 
//자바에서 윈도우는 상징적인 존재에 불과하고 그 바로 하위에 frame으로 윈도우를 대신한다.

import java.awt.Frame;
import java.awt.Button;
import java.awt.FlowLayout;
import java.awt.TextField;
import java.awt.Choice;
import java.awt.TextArea;
import java.awt.Checkbox;
import java.awt.Label;
import java.awt.Menu;
import java.awt.MenuBar;

class GuiTest
{
	public static void main(String[] args){
	 //html에서 요소들을  부모 컨테이너에 부착해야 하듯.
	//GUI 적인 요소들을 윈ㄴ도우라는 컨테이너에 부착해야 눈에 보인다.
	
	Frame f = new Frame(); //윈도우 생성
	
	//html등에서 익숙하게 보아왔던 UI 컴포넌트 요소들을 자바버전으로 생성하여 확인해보자.
	TextField t = new TextField(20); //20자 문자 크기를 수용할 수 있다.
	Button bt = new Button("안녕하세요");
	Choice ch1 = new Choice();

	
	//collector에 아이템 추가하기
	ch1.add("@naver.com");
	ch1.add("@gmail.com");
	ch1.add("@daum.net");
	TextArea area =  new TextArea("Hello", 5, 40);
	Checkbox[] chArr = new Checkbox[3];
	chArr[0] = new Checkbox("Java", true);	
	chArr[1] = new Checkbox("JSP", false);
	chArr[2] = new Checkbox("Oracle", true);
	Label la = new Label("제목 등.. 일반 텍스트가 들어간다");
	
	//메뉴들이 얹혀질 막대기 컨테이너
	MenuBar bar = new MenuBar();

	//메뉴바와 메뉴 만들기!!
	Menu[] mArr = new Menu[5];
	mArr[0] = new Menu("파일");
	mArr[1] = new Menu("편집");
	mArr[2] = new Menu("스타일");
	mArr[3] = new Menu("뷰");
	mArr[4] = new Menu("도움말");


	//만들어낸 요소는 frame에 부착시켜야 한다.
	f.add(t);
	f.add(bt);
	f.add(ch1);
	f.add(area);
	f.setMenuBar(bar); //윈도우에 메뉴바를 부착시킨다.

	for(int i = 0; i<chArr.length; i++){	
		f.add(chArr[i]);
	}
	
	for(int i = 0; i<mArr.length; i++){	
		bar.add(mArr[i]);
	}
	f.add(la);
	
	
	//버튼이 너무 크게 나오는 이유는, 아직 배치(레이아웃) 방법을 아직 지정하지 않아서 그런것이다.
	//즉 defalut레이아웃이 적용되어 있기 때문이다. 
	f.setLayout(new FlowLayout());
	
	
	//자바의 윈도우를 사용하기 위해서는 너비, 높이 등을 지정해야한다.
	f.setSize(600,500);
	
	//또한 윈도우의 default 보기 옵션은 비활성화 되어 있다. 따라서 눈에 보이지 않는다. 
	//이를 보기 위해서는 활성화 과정이 필수이다.
	f.setVisible(true);
	
	
	
	
	
	
	}
} 

