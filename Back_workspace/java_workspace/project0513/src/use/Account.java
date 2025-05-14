package use;

/*
	객체 지향 언어의 장점
	1) 캡슐화
	2) 상속
	3) 추상화
	4) 인잭션
*/
//변수를 직접적으로 사용하는 프로그램은 없다.
public class  Account
{
	private String num ="789-456655-89";
	private String bank = "하나은행";
	private String owner = "Adams";
	private int balance = 500000;
//클래스 작성 시 데이터를 보호하고 이 보호된 데이터를 외부에서 사용하게 만들기 위해서는
// 공개된 메서드를 제공해줘야 한다.
//이러한 클래스 정의 기법을 은닉화 = capsulation 이라고 한다.

//데이터에 대해 읽기, 쓰기가 가능하도록 메서드를 정의해야한다.
	public int getBalance(){ //get + 멤버변수조합: getter메서드라고 부른다.
		return balance;
	}
	
	public void setBalance(int Balance){//set+멤버 변수 조합 : setter조합
		this.balance = balance;
	}
	
	
	public String getNum(){
		return num;
	}
	public void setNum(String num){
		this.num = num;
	}
	
	
	
	public String getBank(){
		return bank;
	}
	public void setBank(String bank){
		this.bank = bank;
	}
	
	
	
	public String getOwner(){
		return owner;
	}
	public void setOwner(String owner){
		this.owner = owner;
	}
	
	
}
