<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
response.setContentType("text/html;charset=utf-8");
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
	                    <ul id="occupation-menu">
	                        <li><a href="#">会员信息</a></li>
	                        <!--<li class="dropdown">-->
	                        <!--<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">会员信息</a>-->
	                        <!--<ul class="dropdown-menu">-->
	                        <!--<li><a href="javascript:;"></a></li>-->
	                        <!--</ul>-->
	                        <!--</li>-->
	                        <li><a href="#">职务管理</a></li>
	                        <li><a href="#">群聊管理</a></li>
	                        <li><a href="#">未激活</a></li>
	                        <li><a href="#">群管理</a></li>
	                    </ul>
	                </div>
	            </div>
	            <div class="sidebar-overlay"></div>
	            <div id="content-area"  class="sidebar-dim">
	                <div class="content-area-box">
	                    <div id="table-toolbar" class="form-inline">
	                        <div class="form-group">
	                            <button id="sidebar-switch" class="btn btn-default btn-inverted"><i class="fa fa-bars"></i></button>
	                            <button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
	                            <button id="add" type="button" class="btn btn-success">新增</button>
	                            <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#import-modal">导入</button>
	                            <button id="export" type="button" class="btn btn-primary">导出</button>
	                        </div>
	                    </div>
	                    <table id="table"></table>
	                </div> 
	            </div>
	             <div id="import-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form id="form" class="form-horizontal" role="form">
                                <div class="modal-header">
                                    <h4 class="modal-title">导入会员</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="row top-10">
                                        <button type="button" id="explain" class="btn button button-primary button-rounded">填写说明下载</button>
                                        <button type="button" id="member" class="btn button button-primary button-rounded">表格模板下载</button>
                                    </div>
                                    <div class="row top-10">
                                    <input id="file-import" type="file">
                                    </div>
                                    <div class="row top-10">
                                    <h5>操作规范：</h5>
                                    <ul>
                                        <li>1、请使用从系统下载的表格，且不要改动表格第一行的内容</li>
                                        <li> 2、从其他文件管理拷贝的数据，请务必检查原表格的格式是否被覆盖</li>
                                    </ul>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <!-- <button id="backlog-add-submit" type="submit" class="btn button button-primary button-rounded" disabled="disabled" >导入</button> -->
                                    <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
                                </div>
                            </form>
                        </div>
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
		<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
        <script src="<%=basePath%>js/main.js"></script>
        <script src="<%=basePath%>js/occupation.js"></script>
		<script type="text/javascript">
			function groupChat(userName){
           		//if(confirm("确认修改")) {
	                $.ajax({
	            		url: '<%=basePath%>admin/member/gourpChatUpdate.shtml',
	            		dataType: 'json',
	            		type: 'post',
	            		data:{"USERNAME":userName,"ACTION":$("#"+userName).val()},
	            		traditional: true,
	            		success:function(data){
	            			if(data.status == "0"){
	            				alert("修改成功!");
	            			}else{
	            				alert(data.errMsg);
	            			}
	            		},
	            		error: function(msg){
	            			alert("操作失败，请联系管理人员！");
	            		}
	            	});
                //}
            }
		</script>
    </body>
</html>