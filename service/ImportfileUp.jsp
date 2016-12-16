<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.wkt.system.Uploader" %>
<%@ page import="com.wkt.system.thumbnail" %>
<%@page import="java.util.Map" %>
<%@page import="net.sf.json.JSONArray" %>
<%@page import="java.util.HashMap" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String isCoverExistAccount = request.getParameter("isCoverExistAccount");
	System.out.println(isCoverExistAccount);
    request.setCharacterEncoding("utf-8");
    response.setCharacterEncoding("utf-8");
    //response.setContentType("text/html");
	//response.getWriter().write(json.toJSONString());
    Uploader up = new Uploader(request);
    up.setSavePath("/motifImage"); //保存路径
    String[] fileType = {".gif", ".png", ".jpg", ".jpeg", ".bmp"};  //允许的文件类型
    up.setAllowFiles(fileType);
    up.setMaxSize(10000);        //允许的文件最大尺寸，单位KB
    up.upload();
    String filename_s = "";
    if(!("gif").equals(up.getType())){
    	 thumbnail test = new thumbnail();
    	 filename_s = test.compressPic(up.getRealUrl(),up.getSavePath(), up.getNewname());
    }
    Map<String, Object> values = new HashMap<String, Object>();
    if(filename_s == ""){
    	values.put("url", up.getUrl());
    	values.put("filename_s", up.getUrl());
    	values.put("original", up.getOriginalName());
    }else{
    	values.put("url", filename_s);
   	 	values.put("filename_s", up.getUrl());
    	values.put("original", up.getOriginalName());
    }
    JSONArray jo = JSONArray.fromObject(values);
	response.getWriter().print(jo.toString());
%>