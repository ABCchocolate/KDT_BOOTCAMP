class Tree 
{
	int height = 10;
	int leaves = 30;
	int water = 1;
	
	public void watering(){
		System.out.println("현재 높이는 " + height + "입니다." + leaves + "개의 잎을 가지고 있으며 물을 주는중입니다..");
		height += water;
		System.out.println("현재 높이는 " +height + "입니다.");
	}
}
