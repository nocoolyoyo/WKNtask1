<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>短信-商会云</title>

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
		<div id="main-box">
            <div id="content-area">
                <div class="content-area-box">
                    <div id="table-toolbar" class="form-inline">
                        <button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
                        <button id="add" type="button" class="btn btn-success">发短信</button>
                        <button id="reply" type="button" class="btn btn-primary">查看回复</button>
                        <!--<div class="input-group">-->
                        <div class="sms-progress progress input-group">
                            <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                                60/100
                            </div>
                        </div>
                        <!--</div>-->
                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                            <input class="form-control" size="9" type="text" id="checkSendStartTime" value="" placeholder="开始日期" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                            <input class="form-control" size="9" type="text" id="checkSendEndTime" value="" placeholder="结束日期" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <button id="search" type="button" class="btn btn-primary">查找</button>
                    </div>
                    <table id="table"></table>
                </div>
            </div>
        </div>
     
    </div>
</main>

        <%@ include file="footer.jsp"%>
         
        <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
        <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
		<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
		
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/SMS.js"></script>
	
    </body>
</html>