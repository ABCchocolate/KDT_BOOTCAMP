package use;

class AccountHack 
{
	public static void main(String[] args) 
	{
		Account acc = new Account();
		
		int balance = acc.getBalance(); 
		String owner = acc.getOwner();
		//실질적인 제한이 가능해진다
		balance = 3000;
		System.out.println(balance);
		System.out.println(owner);
			
	}
}
