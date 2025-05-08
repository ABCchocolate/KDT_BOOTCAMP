
class ObjectType{	
//자바 실행 대상이 되기 위해서는, 반드시 실행부인 main()메서드가 존재해야한다. 
	public static void main(String[] args){
          //기본 자료형 , 객체 자료형도 자료형이다.
		  
		  int x = 5;
		  
		  //자바에서는 개발자가 정의한 클래스를 새로운 자료형으로 인정해준다. 
		  //따라서 아래의 코드에서 변수 d 앞에서 선언해야하는 자료형은 개발자가 정의한 Dog형이라고 사용해야한다. 
		  Dog d = new Dog();
		  d.bark();
		  
		  Car car = new Car();
		  car.car();
		  
		  System.out.println("======================");
		  
		  AirPlane airplane = new AirPlane();
		  airplane.Fly();
		  
		  System.out.println("======================");
		  
		  Programmer programmer = new Programmer();
		  programmer.programmer();
		  
		  System.out.println("======================");
		 
		  SuperMario supermario = new SuperMario();
		  String color = supermario.color;
		  System.out.println(color);
		  supermario.Jumping();
		  supermario.Walking();
		  supermario.Suiting();
		  
		  System.out.println("======================");
		  
		  Tree tree = new Tree();
		  tree.watering();
		  System.out.println("======================");
		  
		  Account account = new Account();
		  account.Banking();
		  
		  
		  
	}
}