public class Hero {
	int hp=10;
	boolean fly=false;
	String name="수퍼마리오";
	Bullet bullet;
	
	public void setHp(int h) {
		this.hp = hp;
	} //멤버변수 hp 값을 변경하고 싶다 -> int 
	public void setFly(boolean fly) {
		this.fly= fly;
	}//멤버변수 fly 값을 변경하고 싶다 -> boolean
	public void setName(String name) {
		this.name = name;
	}//멤버변수 name 값을 변경하고 싶다		->string
	public void fire(Bullet bullet){
		this.bullet = bullet;
	}//멤버변수 bullet 을 다른 무기로 변경하고 싶다 ->객체

	public static void main(String[] args) {
		Hero hero = new Hero();
		hero.setHp(17);
		hero.setFly(true);
		hero.setName("박유신");
		hero.fire(new Bullet());		
	}	
}
