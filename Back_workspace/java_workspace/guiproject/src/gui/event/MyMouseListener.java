package gui.event;

import java.awt.event.MouseListener;
import java.awt.event.MouseEvent;

public class MyMouseListener implements MouseListener 
{
		public void mouseClicked(MouseEvent e){
			System.out.println("mouse click");
		};
		public void mousePressed(MouseEvent e){
			System.out.println("mouse press");
		};
		public void mouseReleased(MouseEvent e){
			System.out.println("mouse released!");
		};
		public void mouseEntered(MouseEvent e){
			System.out.println("mouse entered!");
		};
		public void mouseExited(MouseEvent e){
			System.out.println("mouse exited");
		};
}
