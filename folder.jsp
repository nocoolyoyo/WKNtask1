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
	            <div id="sidebar-left" class="sidebar-container sidebar-push folder-siderbar-push active">
	                <div class="sidebar folder-siderbar">
	                    <div class="sidebar-wrap">
	                        <ul id="menu">
	                        
	                        </ul>
	                    </div>
	                </div>
	
	                <!--<div class="sidebar-overlay"></div>-->
	                <div id="content-area"  class="sidebar-dim inner">
	                    <div class="content-area-box inner">
	                        <div id="table-toolbar" class="form-inline">
	                            <button id="sidebar-switch" class="btn btn-default btn-inverted"><i class="fa fa-bars"></i></button>
	                            <button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
	                            <button  id="folderupload" type="button" class="btn btn-success"  data-toggle="modal">上传</button>
	                           
	                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#folder-modal">文件夹管理</button>
	                            
	                        </div>
	                        <table id="table"></table>  
	                   </div>     
	                </div>
	            </div>
	            <div id="folder-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                        
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
	                       
	                    </div>
	                </div>
	            </div>
	            <div id="import-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                       
	                            <div class="modal-header">
	                                <h4 class="modal-title">上传文件</h4>
	                            </div>
	                            <div class="modal-body both-25">
	
	                                    <div class="form-group">
	                                        <input id="file-upload" type="file">
	                                    </div>
	
	                            </div>
	                            <div class="modal-footer">
	                                <!--<button id="backlog-add-button" type="button" class="btn button button-primary button-rounded" disabled="disabled" >导入</button>-->
	                                <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
	                            </div>
	                    
	                    </div>
	                </div>
	            </div>
	            <div id="move-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				          
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
				                    <button id="moveButton" type="button" class="btn button button-primary button-rounded"  data-dismiss="modal">保存</button>
				                    <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
				                </div>
				           
				        </div>
				    </div>
				</div>
				<div id="add-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				    <div class="modal-dialog modal-sm">
				        <div class="modal-content">
				           
				                <div class="modal-header">
				                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                    <h4 class="modal-title">新增文件夹</h4>
				                </div>
				                <div class="modal-body both-25">
				                    <div class="input-group">
				                        <span class="input-group-addon">文件夹名</span>
				                        <input id="ONNAME" type="text" name="ONNAME" class="form-control" placeholder="职务名">
				                    </div>
				                </div>
				                <div class="modal-footer">
				                    <button id="add-sure" type="botton" class="btn button button-primary button-rounded" data-dismiss="modal">保存</button>
				                    <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
				                </div>
				         
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
		<script src="<%=basePath%>js/public/fileinput.min.js"></script>
		<script src="<%=basePath%>js/public/fileinput-zh-CN.js"></script>
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/folder.js"></script>
	
    </body>
</html>