class Account 
{
	String bank = "하나은행";
	String name = "Adams";
	int total = 1000;
	String input = "입금";
	String output = "출금";
	
	public void Banking(){
	 System.out.println("은행은 "+ bank + "이고 계좌주는 " + name + "입니다.");
	 System.out.println("현재 잔고는 " + total + "이며, 이 계좌는 " + input +", " +output + "을 지원합니다.");
	}
	
}
