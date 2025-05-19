package gui.event;

import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;

public class MyKeyListener implements  KeyListener 
{
	public void keyTyped(KeyEvent e){
		
	};
	public void keyPressed(KeyEvent e){
		System.out.println("눌렀어?!!");
	};
	public void keyReleased(KeyEvent e){
		//키보드를 눌렀다가 떼어내었을 때 호출 된다.
		System.out.println("눌렀다가 떼었다.");
	};
	
}
