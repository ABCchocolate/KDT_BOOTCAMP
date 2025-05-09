class StaticBlock
{
	static int x;
	
		
	//static 초기화 블럭
	//실행직전에 실행부 보다 먼저 초기화 블럭을 수행한다.
	static{
		x = 8;
		System.out.println("A");
	}
	public static void main(String[] args){
		System.out.println("B");
	}
	
}