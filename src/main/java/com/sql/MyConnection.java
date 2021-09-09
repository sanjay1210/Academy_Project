package com.sql;

import java.sql.Connection;
import java.sql.DriverManager;

public class MyConnection {
    public Connection getConnection(){
        String url = "jdbc:mysql://localhost:3306/academy";
        String user = "root";
        String dbPassword = "admin";
        Connection conn=null ;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
	    conn = DriverManager.getConnection(url, user, dbPassword);
        }
        catch(Exception e){
            System.out.println(e);
        }
        return conn;
    }
    
}
