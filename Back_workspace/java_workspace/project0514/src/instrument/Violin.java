package instrument;

public class Violin 
{
	private int volume;
	private String name;
	
	public void setVolume(int volume) {
		if (volume < 0) volume = 0;
		if (volume > 100) volume = 100;
		this.volume = volume;
		System.out.println("현재 볼륨 : " + volume);
	}
	
	public void setName(String name){
		this.name = name;
		System.out.println("현재 재생 중인 음악" + name);
	}
}	
