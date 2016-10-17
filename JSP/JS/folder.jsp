<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>文件管理-商会云</title>

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
	            <div id="sidebar-left" class="sidebar-container sidebar-push">
	                <div class="sidebar">
	                    <div class="sidebar-wrap">
	                        <ul id="menu">
	                        
	                        </ul>
	                    </div>
	                </div>
	
	                <div class="sidebar-overlay"></div>
	                <div id="content-area"  class="sidebar-dim">
	                    <div class="content-area-box">
	                        <div id="table-toolbar" class="form-inline">
	                            <button id="sidebar-switch" class="btn btn-default btn-inverted"><i class="fa fa-bars"></i></button>
	                            <button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
	                            <button type="button" class="btn btn-success"  data-toggle="modal" data-target="#import-modal">上传</button>
	                           
	                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#folder-modal">文件夹管理</button>
	                            
	                        </div>
	                        <table id="table"></table>  
	                   </div>     
	                </div>
	            </div>
	            <div id="folder-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                        <form class="form-horizontal" role="form">
	                            <div class="modal-header">
	                                <h4 class="modal-title">文件夹管理</h4>
	                            </div>
	                             <div class="modal-body">
	                                <table id="folder-manage"></table>
	                            </div>
	                            <div class="modal-footer">
	                                <button id="folder-delete" type="button" class="btn btn-danger" style="display: none">删除</button>
	                                <button id="folder-add" type="button" class="btn btn-success">新建</button>
	                                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	            <div id="import-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                        <form id="form" class="form-horizontal" role="form">
	                            <div class="modal-header">
	                                <h4 class="modal-title">上传文件</h4>
	                            </div>
	                            <div class="modal-body both-25">
	
	                                    <div class="form-group">
	                                        <input id="file-upload" type="file">
	                                    </div>
	
	                            </div>
	                            <div class="modal-footer">
	                                <!--<button id="backlog-add-submit" type="submit" class="btn button button-primary button-rounded" disabled="disabled" >导入</button>-->
	                                <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	            <div id="move-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				            <form id="form" role="form">
				                <div class="modal-header center">
				                    <h4 class="modal-title"></h4>
				                </div>
				                <div class="modal-body both-25">
				
				                    <div class="form-group">
				                        <div class="input-group">
				                            <span class="input-group-addon">文件名</span>
				                            <input id="folderName" readonly="readonly" name="folderName" type="text" class="form-control" placeholder="文件名">
				                        </div>
				                    </div>
				                    <div class="form-group">
				                        <div class="input-group">
				                            <span class="input-group-addon">文件夹</span>
				                            <select id="folderBelong" name="folderBelong" class="form-control">
				                              
				                            </select>
				                        </div>
				                    </div>
				
				                </div>
				                <div class="modal-footer">
				                    <button id="submit" type="submit" class="btn button button-primary button-rounded"  data-dismiss="modal">保存</button>
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
		<script src="<%=basePath%>js/public/fileinput.min.js"></script>
		<script src="<%=basePath%>js/public/fileinput-zh-CN.js"></script>
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/folder.js"></script>
	
    </body>
</html>