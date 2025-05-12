class Computer{
	int speed=300;
}


class UseComputer {
	public void setting(Computer c , int s){
		c.speed=s;
		s=50; //(다)
	}
	
	public static void main(String[] args) {
		int k=500; //(가)
		
		UseComputer uc = new UseComputer();
		Computer com = new Computer();//(바)

		com.speed=100;
		
		uc.setting(com , k); //(나)
		
		System.out.println(com.speed); //(라)
		System.out.println(k); //(마)
		
	}
}
