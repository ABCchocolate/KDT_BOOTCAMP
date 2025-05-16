package instrument;

public class Drum extends MusicTool{
	//상속받은 클래스가 추상 클래스이므로, 재정의가 필요하다.
	//따라서 컴파일이 성공되려면, 부모의 불완전한 메서드를 재정의해야한다.
	public void setVolume(){
		System.out.println("드럼의 소리를 높인다.");
	}
	
}