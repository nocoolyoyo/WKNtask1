<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>会员-商会云</title>
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
		            <div id="sidebar-left" class="sidebar-container sidebar-push queryMessage-siderbar-push active">
					    <div class="sidebar queryMessage-siderbar">
					        <div class="sidebar-wrap">
					            <ul id="menu">
					                <li><a href="#">接收消息</a></li>
					                <li><a href="#">发送消息</a></li>
					            </ul>
					        </div>
					    </div>
					
					    <!--  <div class="sidebar-overlay"></div>-->
					    <div id="content-area" class="sidebar-dim inner">
					        <div class="content-area-box inner">
		                        <div id="table-toolbar" class="form-inline">
		                            <button id="sidebar-switch" class="btn btn-default btn-inverted"><i class="fa fa-bars"></i></button>   
		                        </div>
		                        <table id="table"></table>
		                    </div>
		
		                </div>
		            </div>
		        </div>
		      
		    </div>
		</main>

        <%@ include file="footer.jsp"%>
     </div>    
        <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
        <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
		<script src="<%=basePath%>js/public/froala_editor.min.js"></script>
		<script src="<%=basePath%>js/public/froala_plugins.min.js"></script>
		<script src="<%=basePath%>js/public/froala_zh_cn.js"></script>
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/queryMessage.js"></script>
	
    </body>
</html>