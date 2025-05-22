package gui.gallery;

import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.Graphics;

public class GalleryLayout extends JFrame implements ActionListener 
{
	JButton bt_prev; //이전으로 가는 버튼
	JButton bt_next; //다음으로 가는 버튼
	JLabel la_title; //현재 보여주고 있는 사진의 파일명
	JPanel p_north; //위의 모든 요소가 붙고 header처럼 사용할 패널
	Toolkit kit; //시스템의 이미지를 개발자 대신 얻어다 주는 객체
	MyCanvas myCanvas; //그림이 실제로 그려질 부분
	//이미지 객체를 모아놓을....................객체 배열
	//자바 스크립트와는 달리,대부분의 언어는 배열이 고정 배열이므로 반드시 반드시!!
	// 배열 선언 시 그 크기를 명시해야 한다.
	Image[] imgArray = new Image[9];
	int index = 0;
	
	//GalleryImg gl;
	
	//재정의
	public GalleryLayout(){
		bt_prev= new JButton("Previous");
		bt_next = new JButton("Next");
		la_title = new JLabel("현재 보고있는 파일"); //후에 파일 이름을 자동으로 바꿀 수 있게 해야함
		p_north = new JPanel();
		kit = Toolkit.getDefaultToolkit();//toolkit의 인스턴스 얻기 클래스 메서드
		myCanvas = new MyCanvas();
		
		
		p_north.add(bt_prev);
		p_north.add(la_title);
		p_north.add(bt_next);
		
		myCanvas.setBackground(Color.PINK);
		
		
		add(p_north, BorderLayout.NORTH);
		//gl = new GalleryImg();
		
		add(myCanvas);
	
		//add(gl);
		
		//이미지 준비하기
		 createImage();
		 
		//패널에 초기에 이미지 1개를 전달해주자.
		myCanvas.setImage(imgArray[index]); //이미지 전달
		 
		 
		 //이전 버튼과 리스너 연결
		 bt_prev.addActionListener(this);
		 
		 //다음 버튼과 리스너 연결
		 bt_next.addActionListener(this);
		 
		 
		 
		 
		//크기조정
		setSize(600,500);
		p_north.setSize(600,50);
		myCanvas.setSize(450,50);
		
		
		setVisible(true);
		//window창을 닫을 때 프로세스 종료
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
	//멤버변수로 선언된 이미지 배열에, 이미지 인스턴스 9개를 준비해 놓아야
	//프로그램 가동과 동시에 사용자가 사용할 수 있다.
	public void createImage() {
		String[] path = {
        "animal1.jpg",
        "animal2.jpg",
        "animal3.jpg",
        "animal4.jpg",
        "animal5.jpg",
        "animal6.jpg",
        "animal7.jpg",
        "animal8.jpg",
        "animal9.jpg"
		};

		
	
		for (int i = 0; i < path.length; i++) {
			imgArray[i] = kit.getImage("C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/" + path[i]);
		}
	}

	
	//p_center영역에 이미지 출력하기
	//그래픽 프로그래밍에서 컴포넌트의 약간의 변화라도 생기면 그 그림은 지워지고 다시 그려져야하는데,
	//이는 개발자가 처리하는 것이 아니라, 시스템 내부에서 알아서 렌더링을 담당하게 된다.
	//컴포넌트에 변경이 생기면 다음의 과정을 거쳐서 그래픽을 구현시킬 수 있다.
	/*
	[AWT]
	최초의 컴포넌트 등장 시 paint()가 호출된다.
	사용자가 컴포넌트의 그림에 변활르 주게 되면, JVM은 기존 그림을 지워야하므로
	update() 메서드를 호출하여 그림을 깨끗히 지운다.
	그리고 내부적으로 paint메소드를 호출한다.
	*/
	
	/*
	[Swing]
	사용자가 컴포넌트에 변화를 주게 되면 update()메서드가 호출되는 것이 아니라
	paintComponent()를 호출하여 화면을 깨끗히 지운다..
	변경된 그림을 다시 보여주기 위해 스스로 paint를 호출한다.
	*/
	
	 public void showImage(boolean flag) {
		if (flag) { // 다음
			if (index < imgArray.length - 1) {
				index++;
			}
		} else { // 이전
			if (index > 0) {
				index--;
				if (index ==9)
				{
					index=0;
				}
			}
		}
		myCanvas.setImage(imgArray[index]);
		myCanvas.repaint();
		 //변경된 이미지를 보기 위해서는 사용자의 윈도우 조작이 아니라, 
		 //개발자가 프로그래밍적으로 지우고 다시 그릴 것을 요청해보자.
		 //이 때 호출 할 수 있는 메서드가 바로 repaint() 즉 다시 그려줄 것을 부탁하는 메서드이다.
		 //개발자는 절대로 paint를 직접호출하면 안된다.
		 //그림은 시스템이 알아서 그리는 것이기 때문이다.
		 //repaint() --> update(AWT) ----------- > paint()
		//				  --> paintcomponet(Swing) -> paint()
	 }
	
	public void actionPerformed(ActionEvent e){
		//이벤트를 일으킨 컴포넌트를 가리켜 event source라고 한다.
		Object obj = e.getSource();
		
		//버튼 인스턴스의 주소값만 비교하면 되므로, 굳이 형변환 할 필요 없음
		if(obj == bt_prev){
			//이전 버튼이라면
			showImage(true);
		}
		else if(obj == bt_next){
			//다음 버튼이라면
			showImage(false);
		}
	}
	
	
	//공부 목적 상, 프레임의 그림을 뺏어서 그려보자
	//public void paint(Graphics g){
		//System.out.println("나 그려짐");
	///}
	public static void main(String[] args) 
	{
		new GalleryLayout();	
	}
}
