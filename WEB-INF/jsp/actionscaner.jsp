<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	String AID = request.getParameter("AID");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<base href="<%=basePath%>">
	<title>活动-扫描签到</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/public/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/actionscaner.css"/>
</head>
<body style="background: url('<%=basePath%>admin/image/action_index_bg.jpg') no-repeat;">
	<div class="col-xs-12 scaner_body">
		<img src="<%=basePath%>admin/image/action_scaner.png" style="width: 76%;display:block;margin:2% auto 0;" />
		<div class="erweima" style="top:32.5%;width:21.5%">
			<img id="AURL" alt="" src="" style="width: 100%;" onerror="this.src=''" />
		</div>
	</div>
	<div class="col-xs-12">
		<%@ include file="footer.jsp"%>
	</div>
	<script type="text/javascript" src="<%=basePath%>js/public/jquery-1.12.4.min.js"></script>
	<script type="text/javascript">
		var AID = "<%=AID%>";
		$(function(){
			ajaxDeatil();
		});
		function ajaxDeatil(){
			$.ajax({
				url: '<%=basePath%>admin/signdraw/gotoactionscaner.shtml',
				type: 'post',
				dataType: 'json',
				data:{
					AID: AID
				},
				success: function(ret){
					if(ret.STATUS=="0"){
						$("#AURL").attr("src",ret.ACTIVITY.AURL);
					}
				},
				error: function(err){
					console.log(err);
				}
			})
		}
	</script>
</body>
</html>
