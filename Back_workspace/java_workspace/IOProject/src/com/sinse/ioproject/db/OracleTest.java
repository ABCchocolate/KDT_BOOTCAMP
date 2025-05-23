package com.sinse.ioproject.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class OracleTest {
	public static void main(String[] args) {
		//오라클에 연동 하기
		/*
		 * 1) java언어가 데이터 베이스를 핸들링하기 위해서는 db를 제작한 vender사에서 제공하는
		 *  	구현체인 드라이버를 메모리에 로드해야한다. 단, 일반 클래스처럼 new할 수 없고.. method 영역에 
		 *  	개발자가 직접 올려야한다.
		 * 
		 */
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			System.out.println("드라이버 로드 성공");
		 
			//원격지의 오라클에 접속!!
		
			try {
				Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "JAVA","1234");
				if(con != null) {
					System.out.println("접속 성공");
				}
				else {
					System.out.println("접속 실패");
				}
			} catch (SQLException e) {
				System.out.println("접속 실패");
			}
		}catch (ClassNotFoundException e) {
			System.out.println("드라이버 로드 실패");
			e.printStackTrace();
		}
	}
}
