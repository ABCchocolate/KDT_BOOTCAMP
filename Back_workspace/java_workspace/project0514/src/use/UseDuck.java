package use;

import animal.Duck;
import animal.Bird;

class UseDuck 
{
	public static void main(String[] args) 
	{
		Duck duck = new Duck();
		Bird bird = new Bird();
		
		bird = duck;
		duck = (Duck)bird;
	}
}
