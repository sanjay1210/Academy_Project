package com.sql;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;


@WebServlet("/CreateNewStudent")
public class CreateStudent extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String query = "INSERT INTO `students` (`studentName`, `subject1`, `subject2`, `subject3`) VALUES (?, ?, ?, ?);";
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		
		try {
			String StudentName = request.getParameter("StudentName");
			String Subject1 = request.getParameter("Subject1");
			String Subject2 = request.getParameter("Subject2");
			String Subject3 = request.getParameter("Subject3");

			MyConnection my=new MyConnection();
			Connection con = my.getConnection();
			PreparedStatement st = con.prepareStatement(query);
			st.setString(1, StudentName);
			st.setString(2, Subject1);
			st.setString(3, Subject2);
			st.setString(4, Subject3);
			
			int rs = st.executeUpdate();
			
			if(rs == 1) {
				json.put("status", "success");
				out.print(json);
				out.flush();
			}
			else {
				json.put("status", "failed");
				out.print(json);
				out.flush();
			}
	
		}
		catch(Exception e) {
			json.put("status", "failed");
			out.print(json);
			out.flush();
			e.printStackTrace();
		}
		
	}

}
