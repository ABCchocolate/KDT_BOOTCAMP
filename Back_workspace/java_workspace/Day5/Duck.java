class Duck
{	
	public int getEgg(int a, int b){
		int c  =  a + b;
		return c;
	}
	
	public static void main(String[] args){
	  Duck duck = new Duck();
	  int a = 5;
	  int b = 5;
	  int c = 0;
	  c= duck.getEgg(a, b);
	  System.out.println(c);
	}
}
