package com.sinse.ioproject;

//Uncheck 예외의 경우 개발자가 예외를 커스텀 할 수 있다.
//RuntimeException을 상속받아한다.
public class MyArrayException extends ArrayIndexOutOfBoundsException {
	public	MyArrayException(String msg) {
		super(msg); //부모를 초기화 시켜야함
	}
}
