package day0519;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class ActionButton implements ActionListener
{
	int answer = 0;
	public void actionPerformed(ActionEvent e){
		answer++;
		System.out.println("Button stack"+ answer);
	}
	
}  
