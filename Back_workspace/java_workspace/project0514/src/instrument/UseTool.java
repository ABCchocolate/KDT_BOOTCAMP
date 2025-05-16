package use;
//납품을 앞두고 모든 악기에 대해 테스트

import instrument.Piano;
import instrument.MusicTool;
import instrument.Drum;
import riding.Roller;

public class UseTool
{
	public static void main(String[] args){
		//베이스 볼륨 테스트
		//Violin violin = new Violin();
		//violin.setVolume(-52);
		
		//오케스트라 협주..모든 악기를 한꺼번에 볼륨을 조절
		//각 악기가 보유한 메서드가 무엇인지 알수가 없다.
		//메서드명의 일관성 부재. . .
		//기술적으로 개발자들에게 업무 규칙을 만들어 제재를 가해야한다.
		//따라서 가이드라인을 제시해야한다. 기술적으로 제시하기 위해서는 기준이 되는 클래스를 만들어야하낟.
		
		// 추상클래스는 인스턴스화 할 수 없다.
		//MusicTool musictool = new Music Tool();
		
		//인터페이스도 is a 관계로 인정받는다, 따라서 형변환이 가능하다.
		Piano p = new Piano();
		p.setVolume();
		p.roll();
		
		Roller p2 = new Piano();
		p2.roll();
	}
} 
