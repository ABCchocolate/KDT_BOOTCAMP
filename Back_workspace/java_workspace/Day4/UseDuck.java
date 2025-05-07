class UseDuck 
{
	public static void main(String[] args) 
	{	
		
		//class는 객체가 아니기때문에 인스턴스 생성 후에 사용이 가능하다.
		//따라서 사용하려면 반드시 인스턴스를 생성한 후
		//해당 인스턴스를 접근해야 한다....
		
		
		Duck duck = new Duck();
		//age 변수 값을 출력하시오.
		System.out.println(duck.age);
	}
}
