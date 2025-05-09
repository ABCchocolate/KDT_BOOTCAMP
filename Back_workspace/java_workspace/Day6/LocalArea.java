class LocalArea 
{
	int k;
	//자바의 생성자는 클래스명과 완벽하게 일치하여야 한다.
	public LocalArea(){
		 k = 9;
	}
	/*
	{
		//인스턴스 초기화 영역
		//실행되는 영역을 말함. 따라서 new LocalArea() 때 이 영역을 건드리게 된다.
		//개발 시에 거의 보기 힘들다.
		//생성자가 이미 객체의 변수들을 초기화하는 역할을 하기 때문에,
		//거의 다 생성자로 초기화한다. 
		System.out.println("인스턴스 생성했지?");
		k=8;		
	}*/
	public static void main(String[] args) 
	{
		new LocalArea();
		int x= 5;
	}
}
