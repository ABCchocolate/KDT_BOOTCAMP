/*
 최대한 현실을 반영하여 자동차를 정의해보자.
 조건1) 자동차의 핸들이 있어야함
 조건2) 자동차의 바퀴도 있어야함
 조건3) 자동차의 문짝도 있어야한다.
*/
package use;



public class  Car
{
	int price;
	String name;
	//객체가 다른 객체를 멤버변수로 보유한 관계를 has a 관계라고 한다. 
	Handle handle; //has a 관계 because => Car has a Handle
	Wheel wheel; //Car has a wheel
	Door door; //Car has a door
	
	//객체의 경우 비어있으면 모두 null을 할당한다. 
	
	//생성자는 사물을 태어나게 하는 시점에 초기화에 관여하므로,
	//특히 has a 관계에 있는 객체의 인스턴스를 생성할 때 아주 유용하다.
	public Car(){
		price = 5000;
		name = "k9";
		handle = new Handle();
		wheel = new Wheel();
		door = new Door();
	}
}
