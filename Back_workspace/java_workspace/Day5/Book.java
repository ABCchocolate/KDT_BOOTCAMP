public class Book {
	int price; //A
	int page=300; 
	boolean onSale; //B
	
	public static void main(String[] args) {
		
		Book b1 = new Book(); //D
		Book b2 = new Book(); //E
		
		b1.page=200; //
		System.out.println(b2.page);//F
	}
}
