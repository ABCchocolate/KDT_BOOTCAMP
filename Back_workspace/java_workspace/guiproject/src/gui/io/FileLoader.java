//실행중인 자바 프로그램에서 디스크의 파일을 접근하여
//데이터를 읽고, 프로그램으로 불러들여 출력해보자!
package gui.io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;


class  FileLoader
{
	public static void main(String[] args) 
	{
	//실행 중인 프로그램이 파일 등의 자원의 데이터를
	//읽어들이기 위해서는 스트림 객체가 필요하다
	/*
		Stream이란 ? 현실에서의 물줄기, 물의 흐름을 의미한다.
		전산에서는 그 대상이 물이 아닌 데이터이다.
		IO(입출력)
		
		1) 실행중인 프로그램으로 들어오는 흐름을 Input(입력)
		2) 실행중인 프로그램에서 데이터가 나가면 Output(출력)
	*/
	
	//파일을 대상으로 한 입력 객체(파일을 읽어들일 수 있는 객체)
	String name = "C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/memo.txt";
	
	//문법상은 문제 없지만, 프로그램 코드 상의 문제 외의 문제 때문에
	//프로그램이 정상 수행이 될 수 없는 상황이 될 수 있음.
	//이 상황을 방지하기 위해컴파일러 차원에서 컴파일거부중...
	FileInputStream fis = null;
	try{
		fis = new FileInputStream(name);
		int data = 0;
		while(data != -1){
			data = fis.read();
			System.out.print((char)data);
		}
		fis.close();
	}
	catch(FileNotFoundException e){//catch 문의 소괄호 안에 에러의 원인이 되는 객체의 인스턴스를 생성하여 전달해준다.
		//에러의 원인 객체이기 때문에 개발자가 추출해서 사용이 가능하다.
		
		//만약 파일이 없다면, 파일을 복구 할 수 있는 것은 아니다.
		//원인 등을 알려주거나, 로그를 남긴다.
		System.out.println("파일을 찾을 수 없습니다.");
	}	
		catch(IOException e){
			 System.out.println("입출력 도중 오류가 발생했습니다.");
		}
		finally{
			//실행부가 try문을 수행하던, catch문을 수행하던 즉 어느쪽을 수행하던
			//반드시 거쳐 나가는 영역이다.
			//성공해도 실패해도 finally는 무조건 거쳐야하낟.
			if(fis != null){
			try{
				fis.close();
			}
			catch(IOException e){
				//일반 유저가 아닌 개발자를 위한 로그 출력
				e.printStackTrace();
			}
			}
		}
	}
}
