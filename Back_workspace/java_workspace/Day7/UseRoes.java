class  Rose{
    int leaf=0;
    String color="red";
    
    public void fall(){
       leaf=0;
    }
}

class  UseRose{
	public static void main(){
	      Rose  r1=new Rose();   // (가)
	      r1.fall();   //(나) 
	      r1.bloom(); //(다)
	}
} 
