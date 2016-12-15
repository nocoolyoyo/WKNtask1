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
	        <div id="pjax-container">
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
	                        <form id="addQueryActivitiesForm" class="form-horizontal" role="form">
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
	                                <button id="submit" type="button" class="btn button button-primary button-rounded">保存</button>
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
	                        <div class="modal-header center">
	                            <h4 class="modal-title">获奖名单</h4>
	                        </div>
	                        <div class="modal-body table-modal-body both-25">
	                            <div id="queryWinner-toolbar" class="form-inline">
	                                <button id="queryWinner-export" type="button" class="btn btn-primary">导出EXCEL</button>
	                              <!--   <input id="queryWinner-person" type="text" class="form-control" name="person" placeholder="人员姓名">
	                                <button id="queryWinner-search" type="button" class="btn btn-primary">查询</button>--> 
	                                <button id="queryWinner-reset" type="button" class="btn btn-default">重置</button>
	                            </div>
	                            <table id="tableWinner"></table>
	                        </div>
	                        <div class="modal-footer">
	                            <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div id="queryPartic-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog modal-lg">
	                    <div class="modal-content"> 
	                        <div class="modal-header center">
	                            <h4 class="modal-title">参与名单</h4>
	                        </div>
	                        <div class="modal-body table-modal-body both-25">
	                            <div id="queryPartic-toolbar" class="form-inline">
	                                <button id="queryPartic-delete" type="button" class="btn btn-danger" style="display: none">删除人员</button>
	                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#import-modal">导入嘉宾</button>
	                                <button id="queryPartic-add" type="button" class="btn btn-success"  data-toggle="modal" data-target="#add-member-modal">录入嘉宾</button>
	                                <button id="queryParticMember-add" type="button" class="btn btn-success"  data-toggle="modal" data-target="#select-modal">会员签到</button>
	                                
	                              <!--  <input id="queryPartic-person" type="text" class="form-control" name="person" placeholder="人员姓名">
	                                <button id="queryPartic-search" type="button" class="btn btn-primary">查询</button>--> 
	                                
	                                <button id="queryPartic-export" type="button" class="btn btn-primary">导出名单</button>
	                                <button id="queryPartic-reset" type="button" class="btn btn-default">重置</button>
	                            </div>
	                            <table id="tablePartic"></table>
	                        </div>
	                        <div class="modal-footer">
	
	                            <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
	                        </div>  
	                    </div>
	                </div>
	            </div>
	            
	            <div id="import-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				        
				                <div class="modal-header">
				                    <h4 class="modal-title">导入人员</h4>
				                </div>
				                <div class="modal-body both-25">
				                    <div class="row top-10">
				                        <button type="button" id="member" class="btn button button-primary button-rounded">表格模板下载</button>
				                    </div>
				                    <div class="row top-10">
				                        <input id="file-import" type="file">
				                    </div>
				                    <div class="row top-10">
				                        <h5>操作规范：</h5>
				                        <ul>
				                            <li>1、请使用从系统下载的表格，且不要改动表格第一行的内容</li>
				                            <li>2、从其他文件管理拷贝的数据，请务必检查原表格的格式是否被覆盖</li>
				                        </ul>
				                    </div>
				                </div>
				                <div class="modal-footer">
				                    <!-- <button id="backlog-add-submit" type="submit" class="btn button button-primary button-rounded" disabled="disabled" >导入</button> -->
				                    <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
				                </div>
				           
				        </div>
				    </div>
				</div>
	            
	
	            <div id="add-member-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                        <form id="addMemberForm" class="form-horizontal" role="form">
	                            <div class="modal-header center">
	                                <h4 class="modal-title">添加人员</h4>
	                            </div>
	                            <div class="modal-body both-25">
	                          		<div class="form-group">
			                        	<div class="input-group">
			                        		<span class="input-group-addon">名称</span>
			                      			<input id="memberName" name="memberName" type="text" class="form-control" placeholder="人员名称">
			                            </div>
			                        </div>  
		                            <div class="form-group">
		                                <div class="input-group">
		                                    <div class="input-group-addon">手机号码</div>
		                                    <input id="memberMobile" name="memberMobile" class="form-control" type="text" placeholder="手机号码">
		                                </div>
		                            </div>  
		                            <div class="form-group">
		                            	<div class="input-group">
		                                    <div class="input-group-addon">单位</div>
		                                    <input id="memberCompany" name="memberCompany" class="form-control" type="text" placeholder="单位">
		                                </div>
		                            </div>  
		                            <div class="form-group">
		                                <div class="input-group">
		                                    <div class="input-group-addon">职务</div>
		                                    <input id="memberPosition" name="memberPosition" class="form-control" type="text" placeholder="职务">
		                                </div>
		                            </div>    
	                            </div>
	                            <div class="modal-footer">
	                                <button id="add-member-sure" type="button" class="btn button-primary button-rounded">确定</button>
	                                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	             <div id="import-failed-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	                <div class="modal-dialog">
	                    <div class="modal-content">
	                        <div class="modal-header center">
	                            <h4 class="modal-title1" style="color:red">以下人员为商会成员，不需要导入，请下载商会云通过扫码进行签到</h4>
	                        </div>
	                        <div class="modal-body both-25">
	                            <!-- <div id="importFailed-toolbar" class="form-inline">
	                                <button id="importFailed-reset" type="button" class="btn btn-default">重置</button>
	                            </div> -->
	                            <table id="tableImportFailed"></table>
	                        </div>
	                        <div class="modal-footer">
	                            <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div id="select-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
				    <div class="modal-dialog modal-lg">
				        <div class="modal-content">
				            <div class="modal-header center">
				                <h4 class="modal-title">人员选择</h4>
				            </div>
				            <div class="modal-body table-modal-body">
				                <div class="select-content">
				                    <div class="select-left">
				                        <div id="left-toolbar" class="form-inline">
				                            <button type="button" class="clear btn btn-default">清空</button>
				                        </div>
				                        <table id="members-selected"></table>
				                    </div>
				                    <div class="select-right">
				                        <div id="select-toolbar" class="form-inline">
				                            <button id="members-add" type="button" class="btn btn-success" style="display: none">添加</button>
				                            <div class="dropdown" style="display: inline-block">
				                                <button id="group-add" type="button" class="btn btn-default dropdown-toggle"  data-toggle="dropdown" aria-expanded="true">快速添加<span class="caret"></span></button>
				                                <ul id="fast-fliter" class="dropdown-menu">
				                                </ul>
				                            </div>
				                        </div>
				                        <table id="table-members"></table>
				                    </div>
				                </div>
				            </div>
				            <div class="modal-footer">
				                <button id="select-sure" type="button" class="btn button-primary button-rounded" disabled="disabled">确定</button>
				                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
				            </div>
				        </div>
				    </div>
				</div>
	            
	        </div>
	            <script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
	            <script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
	            <script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
	            <script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
	            <script src="<%=basePath%>js/public/xlsx.core.min.js"></script>
	            <script src="<%=basePath%>js/public/tableExport.min.js"></script>
	            <script src="<%=basePath%>js/public/bootstrap-table-export.min.js"></script>
	       		<script src="<%=basePath%>js/public/fileinput.min.js"></script>
				<script src="<%=basePath%>js/public/fileinput-zh-CN.js"></script>
	            <script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
	
	            <script src="<%=basePath%>js/main.js"></script>
	            <script src="<%=basePath%>js/queryActivities.js"></script>
	        </div>
	    </div>
	</main>

<%@ include file="footer.jsp"%>
</div>


</body>
</html>