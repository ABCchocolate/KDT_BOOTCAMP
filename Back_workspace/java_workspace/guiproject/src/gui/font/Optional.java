package gui.font;

import java.awt.*;
import java.awt.event.*;

public class Optional extends Frame implements ActionListener {
	Label l_fontSize;
	Label l_fontColor;
	TextField t_fontSize;
	TextField t_fontColor;
	Button bt_apply;
	Panel p_center;
	Panel p_south;
	LayoutForm layoutform;

	public Optional(LayoutForm layoutform) {
		this.layoutform = layoutform;

		l_fontSize = new Label("FONT SIZE");
		l_fontColor = new Label("FONT COLOR");
		t_fontSize = new TextField(20);
		t_fontColor = new TextField(20);
		bt_apply = new Button("APPLY");

		p_center = new Panel();
		p_south = new Panel();

		// 배치
		p_center.add(l_fontSize);
		p_center.add(t_fontSize);
		p_center.add(l_fontColor);
		p_center.add(t_fontColor);

		Dimension d = new Dimension(110, 150);
		l_fontSize.setPreferredSize(d);
		t_fontSize.setPreferredSize(d);
		l_fontColor.setPreferredSize(d);
		t_fontColor.setPreferredSize(d);

		add(p_center);
		p_south.add(bt_apply);
		add(p_south, BorderLayout.SOUTH);

		bt_apply.addActionListener(this); // 중요!

		this.setSize(300, 400);
		this.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		try {
			int size = Integer.parseInt(t_fontSize.getText().trim());
			String colorText = t_fontColor.getText().trim().toLowerCase();

			Color color = Color.black; // 기본값
			switch (colorText) {
				case "red": color = Color.red; break;
				case "blue": color = Color.blue; break;
				case "green": color = Color.green; break;
				case "black": color = Color.black; break;
				case "white": color = Color.white; break;
				default:
					System.out.println("알 수 없는 색상. black으로 설정됩니다.");
			}

			// 글꼴과 색상 적용
			layoutform.text.setFont(new Font("Arial", Font.PLAIN, size));
			layoutform.text.setForeground(color);

		} catch (NumberFormatException ex) {
			System.out.println("숫자 형식이 잘못되었습니다.");
		}
	}
}
