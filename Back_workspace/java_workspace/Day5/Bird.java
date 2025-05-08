class Bird 
{
	String name = "독수리";
	
	public String setName(){
		return name;
	}
	
	public static void main(String[] args){
		int x = 5;
		Bird b= new Bird(); 
		String A = b.setName();
		System.out.println(A);
		
		Bird b2 = new Bird();
		String B = b2.setName();
		System.out.println(B); 
	}
}
