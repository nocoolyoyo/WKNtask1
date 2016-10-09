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

        <script src="<%=basePath%>js/main.js"></script>
    </head>
    <body>

        <%@ include file="header.jsp"%>

<main class="container">
    <div id="content">
        <ul id="content-navbar" class="row">
            <li id="content-navbar-home"><a href="index.html"><i class="fa fa-desktop"></i>桌面</a></li>
            <li id="content-navbar-menu">
                <ul>
                </ul>
            </li>
            <li id="content-navbar-switch" ><a href="#"><i class="fa fa-columns"></i>切换</a></li>
        </ul>

        <div id="sidebar-left" class="sidebar-container sidebar-push">
            <div class="sidebar">
                <div class="sidebar-wrap">
                    <ul>
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
                            <button type="button" class="btn btn-primary">导入</button>
                            <button type="button" class="btn btn-primary">导出</button>
                        </div>
                        <div class="form-group">
                            <input name="search" class="form-control" type="text" placeholder="搜索">

                            <button  type="submit" class="btn btn-default">搜索</button>
                        </div>
                    </div>

                    <table id="table-occupation"></table>
                </div>
                <div class="content-area-pagination ">
                    <ul class="pagination content-area-pagination">
                        <li><a href="#">首页</a></li>
                        <li><a href="#">上一页</a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">下一页</a></li>
                        <li><a href="#">尾页</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</main>

        <%@ include file="footer.jsp"%>
        <%@ include file="script.jsp"%>
	<script type="text/javascript">
		$(function(){
			var search = $("#search").val();
			var type = $("#TYPE").val();
			registration();//职务列表
			allMember();//会员列表
		});
		//职务列表
		function registration(){
			$.ajax({
        		url: '<%=basePath%>admin/member/memberRegistration.shtml',
        		dataType: 'json',
        		type: 'post',
        		data:{

        		},
        		success:function(data){
        			if(data.status == "0"){
        				var li = "";
        				var length = data.olist.length;
        				for(var i=0; i<length; i++){
        					li += "<a href='#' class='list-group-item'>"+data.olist[i].ONAME+"</a>";
        				}
        				if(length == 0){
        					li += "无职务";
        				}
        				$(".content-siderbar-innerList").html(li);
        				return;
        			}
        		},
        		error: function(msg){
        			$(".content-siderbar-innerList").html("错误");
        		}
        	});
		}
		//会员列表
		function allMember(search,type){
			$.ajax({
        		url: '<%=basePath%>admin/member/serchAllMember.shtml',
        		dataType: 'json',
        		type: 'post',
        		data:{
        			VALUE:search,TYPE:type
        		},
        		success:function(data){
        			if(data.status == "0"){
        				var li = "";
        				var length = data.list.length;
        				for(var i=0; i<length; i++){
        					li += "<tr><th><input type='checkbox'></th>"
        						+"<th>"+data.list[i].REALNAME+"</th>"
                                +"<th>"+data.list[i].MOBILE+"</th>"
                                +"<th>"+data.list[i].COMPANY+"</th>"
                                +"<th>"+data.list[i].ONAME+"</th>"
                                +"<th>"+data.list[i].GRADE+"</th></tr>";
        				}
        				if(length == 0){
        					li += "<tr>无会员信息</tr>";
        				}
        				$("#memberList").html(li);
        				return;
        			}
        		},
        		error: function(msg){
        			$("#memberList").html("<tr>错误列表</tr>");
        		}
        	});
		}
		//导出会员列表
		function querySendMemberExcel(){
			window.location.href = "<%=basePath%>admin/member/querySendMemberExcel.shtml";
		}
		function searchMember(){
			search = $("#search").val();
			type = $("#TYPE").val();
			allMember(search,type);
		}
	</script>
    </body>
</html>




<script type="text/javascript">
		/*$(function(){
			var search = $("#search").val();
			var type = $("#TYPE").val();
			registration();//职务列表
			allMember();//会员列表
		});
		//职务列表
		function registration(){
			$.ajax({
        		url: '<%=basePath%>admin/member/memberRegistration.shtml',
        		dataType: 'json',
        		type: 'post',
        		data:{

        		},
        		success:function(data){
        			if(data.status == "0"){
        				var li = "";
        				var length = data.olist.length;
        				for(var i=0; i<length; i++){
        					li += "<a href='#' class='list-group-item'>"+data.olist[i].ONAME+"</a>";
        				}
        				if(length == 0){
        					li += "无职务";
        				}
        				$(".content-siderbar-innerList").html(li);
        				return;
        			}
        		},
        		error: function(msg){
        			$(".content-siderbar-innerList").html("错误");
        		}
        	});
		}
		//会员列表
		function allMember(search,type){
			$.ajax({
        		url: '<%=basePath%>admin/member/serchAllMember.shtml',
        		dataType: 'json',
        		type: 'post',
        		data:{
        			VALUE:search,TYPE:type
        		},
        		success:function(data){
        			if(data.status == "0"){
        				var li = "";
        				var length = data.list.length;
        				for(var i=0; i<length; i++){
        					li += "<tr><th><input type='checkbox'></th>"
        						+"<th>"+data.list[i].REALNAME+"</th>"
                                +"<th>"+data.list[i].MOBILE+"</th>"
                                +"<th>"+data.list[i].COMPANY+"</th>"
                                +"<th>"+data.list[i].ONAME+"</th>"
                                +"<th>"+data.list[i].GRADE+"</th></tr>";
        				}
        				if(length == 0){
        					li += "<tr>无会员信息</tr>";
        				}
        				$("#memberList").html(li);
        				return;
        			}
        		},
        		error: function(msg){
        			$("#memberList").html("<tr>错误列表</tr>");
        		}
        	});
		}*/
		//会员新增
		function occupationProfile(){
			window.location.href = "<%=basePath%>admin/url/occupationProfile.shtml";
		}
		//导出会员列表
		function querySendMemberExcel(){
			window.location.href = "<%=basePath%>admin/member/querySendMemberExcel.shtml";
		}
		function searchMember(){
			search = $("#search").val();
			type = $("#TYPE").val();
			allMember(search,type);
		}
	</script>