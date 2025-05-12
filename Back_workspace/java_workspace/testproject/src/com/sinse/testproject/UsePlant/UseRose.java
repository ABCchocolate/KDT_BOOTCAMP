package com.sinse.testproject.UsePlant;
import java.util.Timer;
import com.sinse.testproject.plant.Rose;

class UseRose 
{
	public static void main(String[] args) {
        Timer timer = new Timer(); // Timer는 여기선 사용되지 않음
        Rose rose = new Rose();
        rose.seed();

        System.out.println("꽃이 피어나고 있습니다...");
        for (int i = 1; i < 4; i++) {
            System.out.println(i + "초..");
			try {
                Thread.sleep(1000); // 1초 대기
				} catch (InterruptedException e) {
					e.printStackTrace();
				}		
        }
		
		rose.bloom();
    }
}
