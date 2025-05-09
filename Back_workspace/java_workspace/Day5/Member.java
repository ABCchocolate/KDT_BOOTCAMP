class Member { //A
	int root=1; //A
	static int height=25; //B
	
	public static void main(String[] args) {
		Tree t1 = new Tree();  //C
		Tree t2 = new Tree();  //D
		
		t1.height=30;//E
		
		System.out.println(t2.height); //F
		System.out.println(Member.height); //G
	}
}
