class Cat{
	String name = "Tomcat";
	int age = 5;
	
	public int getAge(){
		return age;
	}
	
	public static void main(String[] args){
<!-- 		//java.exe 호출 시 main() method는 자동호출이 된다.
		//이 때 개발자는 main() method의 매개변수인  String 배열의 값을 넘길 수 있다.
		//cmd > java 문자열 문자열
		
		System.out.println("당신이 넘긴 배열의 수는");
		for(int i = 0 ; i < args.length;  i++){
			System.out.println(args[i]);
		} -->
		
		int x = 7;
		Cat cat1 = new Cat();
		x = cat1.getAge();
		System.out.println("고양이의 나이는 "  + x + "살 입니다");
	}
	
}
