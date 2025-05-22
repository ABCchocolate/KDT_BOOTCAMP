package com.sinse.ioproject;

public class ExceptionTest {

	public static void main(String[] args) {
//		자바가 개발자에게 예외처리할 것을 강요하는 check예외 vs  uncheck예외가 있다.
//		공통점:둘 다 코드로 해결할 수 있는 에러 
//		체크 예외: 중요한 것들만 강요
//		언체크 예외: 개발자에게 맡김
//		 비정상 종료되지 않기 위해서는 개발자가 적극적인 예외 처리를 해야한다.
//		int[] arr = new int[3];
//		try {
//		arr[0] = 1;
//		arr[1] = 1;
//		arr[2] = 3;
//		arr[3] = 0;		
//		}
//		catch(MyArrayException e) {
//		  System.out.println(e.getMessage());
//		}
//	}
//
//}
		//우리가 만든 예외를 일부러 일으켜보자.
		//에러를 일으킴
		try {
		throw new MyArrayException("배열 관련 에러 발생");
		}
		catch(Exception e) {
			System.out.print("예외 처리!");
		}
		
		
	}
}
