<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>资讯-商会云</title>

        <%@ include file="meta.jsp"%>
		

        <link href="<%=basePath%>css/main.css" type="text/css" rel="stylesheet">
	
       
    </head>
    <body>

        <%@ include file="header.jsp"%>
	<div id="page-container">
		<main class="container">
		    <div id="content">
		        <ul id="content-navbar" class="row">
		            <li id="content-navbar-home"><a href="<%=basePath%>admin/url/index.shtml"><i class="fa fa-desktop"></i>桌面</a></li>
		            <li id="content-navbar-menu">
		                <ul>
		                </ul>
		            </li>
		            <li id="content-navbar-switch" ><a href="#"><i class="fa fa-columns"></i>切换</a></li>
		        </ul>
		      
				<div id="main-box">
		          
		        </div>
		     
		    </div>
		</main>

        <%@ include file="footer.jsp"%>
   </div>
        <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
        <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
		<script src="<%=basePath%>js/public/html5media.js"></script>
		<script src="<%=basePath%>js/public/froala_editor.min.js"></script>
		<script src="<%=basePath%>js/public/froala_plugins.min.js"></script>
		<script src="<%=basePath%>js/public/froala_zh_cn.js"></script>
		<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/informationjs.js"></script>
	
    </body>
</html>