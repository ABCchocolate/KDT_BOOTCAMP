class Member { //A
	int age=23;
	static int money=23;
	
	public void talk(){
	}
}

public class UseMember{
	static String k=8;
	public static void main(String[] args){
		Member.age=7; //B
		Member m = new Member();//C
		System.out.println(m.age); //D
	}
}
