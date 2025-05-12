//9.아래의 클래스를 생산 시점부터 검정색으로 만들 수 있는 기능 뿐 아니라 생산된 이후에도 색상을 빨간색으로 변경 할 수 있도록
//클래스를 완성해보세요

class  SportsCar{
   String color="None Color";    
	public SportsCar(){
		this.color = "black";
	}
	
	public void setColor()
	{
		this.color = "red";
	}
}


class UseSportsCar {
    public static void main(String[] args) {
        SportsCar car = new SportsCar();             
        System.out.println(car.color);
		car.setColor()
        System.out.println(car.color));               
    }
}
