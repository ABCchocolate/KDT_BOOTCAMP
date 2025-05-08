class StringStudy 
{
	public static void main(String[] args) 
	{
		//모든 프로그래밍 언어에서 개발자가 사용할 수 있는 기본 자료형은
		// 문자, 숫자, 논리값
		// 우리의 일상에서 문자열을 표현하려면, 개발자가 배열을 이용하여야한다.
		// 허나 이러면 개발이 불편하므로, 현대적 프로그래밍 언어에서는 
		// 내부적으로는 배열로 처리되지만 개발자를 위해서 문자열에 대해서는
		// 객체 자료형으로 지원해준다.
		
		//==== new를 명시하지 않아도, 내부적으로 문자열 개체를 생성시키는 기법을
		//==== 암시적, 묵시적(implicit) 생성법이라고 한다.
		String s1 ="korea";
		String s2 = "korea";
		
		System.out.println(s1 ==  s2); //주소값을 비교하는 것과 같다.
		
		//==== new 연산자를 이용하여, 객체의 생성법을 그대로 따르는 문자열 생성 기법을
		//==== 명시적(Explicit) 생성법이라고 한다. 
		String x1 = new String("apple");
		String x2 = new String("apple");
		
		//이것도 주소 값 비교이지만!!! , 이미 만들어진 문자열 상수는 중복 으로 만들어내지않는다.
		System.out.println(x1 == x2);
	}
}
