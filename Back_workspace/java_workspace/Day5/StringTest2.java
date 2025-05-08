class StringTest2 
{
	public static void main(String[] args) 
	{
	  //String은 불변의 특징이 있다.
	  //즉 변경될 수 없다 ... immutable 수정불가하다
	  String x = "korea";
	  for(int j  = 100; j >=0 ; j--){
	  for(int i  = 1; i <= 100; i++){
		  x =x +i;
		System.out.println(x);  
		}	  }
	}
}
