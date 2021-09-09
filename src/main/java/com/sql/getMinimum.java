package com.sql;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.google.gson.Gson;

/**
 * Servlet implementation class getMinimum
 */
@WebServlet("/getMinimum")
public class getMinimum extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public getMinimum() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		doPost(request,response);
		
       
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONObject json = new JSONObject();
		
		String column_name=request.getParameter("column");
		
	      
		

		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();

		
		
		List<Map<String, String>> list;
            list = new ArrayList<Map<String, String>>();
		

		try {
			MyConnection my=new MyConnection();
			Connection con = my.getConnection();
			Statement stmt = con.createStatement();
                        String query;
                        if(column_name.equals("avg")){
                            query = "Select studentName,(subject1+subject2+subject3)/3 from students where (subject1+subject2+subject3)/3 =(Select MIN(((subject1+subject2+subject3)/3)) from students)";
                        }
                        else{
                            query = "Select studentName,"+column_name+" from students where "+column_name+" in(Select MIN("+column_name+") from students)";
                        }
		
			ResultSet rs = stmt.executeQuery(query);

			// Extract data from result set
			while (rs.next()) {
				// Retrieve by column name

				Map<String, String> map = new HashMap<String, String>();
				map.put("Name", rs.getString("studentName"));
				
				map.put("Value", rs.getString(2));
			 
				

				list.add(map);
			}
//			System.out.println(list);
			rs.close();

			String data = new Gson().toJson(list);

			json.put("status", "successful");
			json.put("data", data);

			out.print(json);
			out.flush();

		} catch (Exception e) {
			json.put("status", "failed");
			out.print(json);
			out.flush();
			e.printStackTrace();
		}
	}

}
