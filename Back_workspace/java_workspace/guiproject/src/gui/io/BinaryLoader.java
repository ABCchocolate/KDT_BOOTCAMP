/*
 메모장과 같은 텍스트 파일이 아닌, 이미지, 동영상 등의 바이너리 파일을 읽어보자

*/
package gui.io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.FileOutputStream;

class BinaryLoader 
{
	FileInputStream fis; //파일을 대상으로 한 입력 스트림
	FileOutputStream fos; //파일을 대상으로 한 출력 스트림
	public BinaryLoader(){
	//생성자 Constructor();
	 String name = "C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg.jpg";
	 String target=  "C:/lecture_workspace/Back_workspace/java_workspace/guiproject/res/bg_copy.jpg";
	 try{	 
		 //컴파일 시 예외 처리를 강요하는 예외 방식을 가리켜 강요된 예외라고 함
		fis = new FileInputStream(name);
		fos = new FileOutputStream(target);
		int data = 0;
		while (data != -1){
			data = fis.read(); //1byte 읽어들이고, 자동으로 다음 데이터로 접근한다.
			fos.write(data);
		}
	 }
	 catch(FileNotFoundException e){
		System.out.println("File is not exist");
	 }
	 catch(IOException e){
		 System.out.println("Can't read the file");
	 }
	 finally{
		if(fis !=null){
			try{
			fis.close();
			}
			catch(IOException e){
				e.printStackTrace();
			}
		}
		if(fos !=null){
			try{
			fos.close();
			}
			catch(IOException e){
				e.printStackTrace();
			}
		}
	 }
	}
	
	public static void main(String[] args) 
	{
		//실행 중인 프로그램으로 데이터를 읽어 들여야하므로
		//입력스트림 객체가 필요
		new BinaryLoader();
	}
}
