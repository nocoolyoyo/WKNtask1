<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>供需-商会云</title>

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
		            <div id="content-area">
		                <div class="content-area-box">
		                    <div id="table-toolbar" class="form-inline">
		                    	<button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
		                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
		                            <input class="form-control" size="9" type="text" id="VALIDSTARTTIME" value="" placeholder="开始日期" readonly>
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
		                        </div>
		                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
		                            <input class="form-control" size="9" type="text" id="VALIDENDTIME" value="" placeholder="结束日期" readonly>
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
		                        </div>
		                        <button id="search" type="button" class="btn btn-primary">查找</button> 
		                        <button id="export" type="button" class="btn btn-primary">导出</button>
		                          <button id="reset" type="button" class="btn btn-default">重置</button> 
		                    </div>
		                    <table id="table"></table>
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
		<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
		
        <script src="<%=basePath%>js/main.js"></script> 	
        <script src="<%=basePath%>js/supply.js"></script>
		<script type="text/javascript">
			function groupChat(supplyId){
           		//if(confirm("确认修改")) {
	                $.ajax({
	            		url: '<%=basePath%>admin/supply/supplyUpdate.shtml',
	            		dataType: 'json',
	            		type: 'post',
	            		data:{"SUPPLYID":supplyId,"EXAMINESTATUS":$("#"+supplyId).val()},
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