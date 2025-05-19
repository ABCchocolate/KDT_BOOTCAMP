package gui.layout;

import java.awt.Frame;
import java.awt.TextField;
import java.awt.Label;
import java.awt.Button;
import java.awt.Panel;
import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.*;

public class Loginform
{
	public static void main(String[] args) 
	{
			//전체 윈도우 창
			Frame frame = new Frame();
			frame.setSize(220,135);
			frame.setVisible(true);
			
			Panel North_panel = new Panel();
			Panel South_panel = new Panel();
			
			//Label
			Label id_label = new Label("Id_label");
			Label pw_label = new Label("Password");
			North_panel.setLayout(new GridLayout(2, 2));
			
			//TextField
			TextField Id_textfield = new TextField();
			TextField pw_textfield = new TextField();
			North_panel.add(id_label);
			North_panel.add(Id_textfield);
			
			North_panel.add(pw_label);
			North_panel.add(pw_textfield);
			frame.add(North_panel,BorderLayout.NORTH);
			
			//Button
			Button login_btn = new Button("login");
			Button join_btn = new Button("join");
			South_panel.add(login_btn);
			South_panel.add(join_btn);
			frame.add(South_panel, BorderLayout.SOUTH);
			
	}
}
