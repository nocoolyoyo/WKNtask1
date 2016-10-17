<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>会员日志-商会云</title>

        <%@ include file="meta.jsp"%>
		

        <link href="<%=basePath%>css/main.css" type="text/css" rel="stylesheet">

       
    </head>
    <body>

        <%@ include file="header.jsp"%>
		
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

            <div id="content-area">
                <div class="content-area-box">
                
                	<div id="table-toolbar" class="form-inline">
                        <div class="form-group">
                     
                            <button id="delete" type="button" class="btn btn-danger" style="display: none" >删除</button>
                 
                        </div>
                    </div>
                    <table id="table"></table>
                </div>
            </div>
        </div>
</main>

        <%@ include file="footer.jsp"%>
        
        
        <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
        <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
        <script src="<%=basePath%>js/main.js"></script>
        <script src="<%=basePath%>js/memberLog.js"></script>
    </body>
</html>