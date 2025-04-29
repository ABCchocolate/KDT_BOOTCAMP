class  DataType2
{
	public static void main(String[] args) 
	{
		// 비슷한 자료형 간에는 서로 형변환이 가능하다.
		/*
		문자 : char(한문자만 담을 수 있음) , String (문자열을 담을 수 있음)
		숫자 : 정수 = byte < short < int < long 
							1		  2			4		8
				실수 =					 float < double
												4		   8
		논리값: true, false
		*/
		
		byte b = 5;
		short s = 7;
		byte x = 8;
		System.out.println(b);		
		
		//대입 연산 뿐만 아니라, 일반적으로 연산자가 동작하기 위해서는
		//연산 대상이 되는 데이터는 자료형이 일치해야한다.
		b = x;
		System.out.println(b);
		
		
		//연산 대상이 되는 피연산자들이 동일하지 않기 때문에
		//java 컴파일러가 자료형을 동일하게 변환시킨다.
		//즉 개발자가 처리하는 것이 아니라, 컴파일러에 의한 형변환을
		//자동 형변환이라고 한다.
		//1) 같은 숫자라는 가족 (같은 종류의 자료형)
		//2) 작은 것은 큰 자료형에 대입하고 있으므로
		
		
		//이를 반대라면 incompatible types: possible lossy conversion from short to byte
		//강제 형변환을 통해서 오류를 없앨 수 있음 -> 데이터의 손실을 감안해서라도, 원하는 같은 종류로 만들어 낼 수 있음
		//이 때 사용되는 소괄호를 cast 연산자라고 한다.
		//형변환은 언제나 같은 종류끼리만 지원한다.
		b = (byte)s;
		System.out.println(s);
		
		char c = 'b'; //컴파일 타임에, java컴파일러가 귀찮음을 감수하고 유니코드 찾아봄
		char d = '한';//컴파일 타임에, java컴파일러가 귀찮음을 감수하고 유니코드 찾아봄
		char k = 96; //인간이 유니코드를 찾아서 입력한것이기 때문에 컴퓨터가 편하게 계산할 수 있음
		//char m = -30; 
		//char형은 사실상 숫자형은 맞으나, 여기에 담을 수 있는 수는
							//아스키를 포함한 유니코드에만 한정되어있으므로, 음수는 이에 해당하지 않는다.
							//키코드 체계에서는 음수를 지원하지 않기 때문이다.
							
		s = (short)k;
	}
}
