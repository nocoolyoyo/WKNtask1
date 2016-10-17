<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>签到抽奖-商会云</title>

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
                        <button id="add" type="button" class="btn btn-success" data-toggle="modal" data-target="#queryActivities-modal">新增活动</button>
                    </div>
                    <table id="table"></table>
                </div>
            </div>
            <div id="queryActivities-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form class="form-horizontal" role="form">
                            <div class="modal-header">
                                <h4 class="modal-title">新增活动</h4>
                            </div>
                            <div class="modal-body both-25">
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">标题</div>
                                        <input id="activity-title" class="form-control" type="text" placeholder="填写标题">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">内容</div>
                                        <input id="activity-content" class="form-control" type="text" placeholder="内容">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">提示内容</div>
                                        <input id="activity-ts" class="form-control" type="text" placeholder="提示内容">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">

                                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                            <span class="input-group-addon">开始时间</span>
                                            <input id="activity-time" class="form-control" size="100" type="text" value="" placeholder="日期" readonly>
                                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="submit" type="submit" class="btn button button-primary button-rounded"  data-dismiss="modal">保存</button>
                                <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="queryQRCode-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <form class="form-horizontal" role="form">
                            <div class="modal-header center">
                                <h4 class="modal-title">二维码</h4>
                            </div>
                            <div class="modal-body">
                                <img id="aurl" src="">
                            </div>
                            <div class="modal-footer">
                                <button id="ORCodeUpload" type="button" class="btn button button-primary button-rounded" data-dismiss="modal">下载</button>
                                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="queryWinner-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <form class="form-horizontal" role="form">
                            <div class="modal-header center">
                                <h4 class="modal-title">获奖名单</h4>
                            </div>
                            <div class="modal-body">
                                <div id="queryWinner-toolbar" class="form-inline">
                                    <button id="queryWinner-export" type="button" class="btn btn-success">导出</button>
                                </div>
                                <table id="tableWinner"></table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="queryPartic-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <form class="form-horizontal" role="form">
                            <div class="modal-header center">
                                <h4 class="modal-title">参与名单</h4>
                            </div>
                            <div class="modal-body both-25">
                                <div id="queryPartic-toolbar" class="form-inline">
                                <button id="queryPartic-delete" type="button" class="btn btn-danger" style="display: none">删除</button>
                                    <button id="queryPartic-add" type="button" class="btn btn-success"  data-toggle="modal" data-target="#add-modal">新增人员</button>
                                	<button id="queryPartic-export" type="button" class="btn btn-success">导出</button>
                                	
                                </div>
                                <table id="tablePartic"></table>
                            </div>
                            <div class="modal-footer">

                                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            
        </div>
        
    
    </div>
</main>

        <%@ include file="footer.jsp"%>
         
        <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
        <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
		<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
		<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
		
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/queryActivities.js"></script>
	
    </body>
</html>