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
	<title>活动详情</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/public/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/rollText/rollText.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/actiondetail.css"/>
</head>
<body style="background: url('<%=basePath%>admin/image/action_index_bg.jpg') no-repeat;">
	<div class="erweima" onclick="javascript:actionsacner();">
		<img id="AURL" src="" style="width: 100%;"/>
		<div>扫描二维码</div>
		<div>进行抽奖</div>
	</div>
	<div class="fullscreen" onclick="javascript:launchFullscreen(this);"></div>
	<div class="col-xs-8 content_panel">
		<div class="roll_panel_box">
			<h2 class="htitle"><span id="title"></span></h2>
			<div id="rollText" class="roll-panel roll-panel-default">
				<div class="roll-body" style="height: 100%;">
					<ul class="roll-list-group main_list">
						<li class="roll-list-group-item">
							<c:forEach items="${winningList}" var="item">
								<span class="col-xs-2 rol" usid="${item[0]}">
									<img src="${item[2]}" onerror="this.src='<%=basePath%>admin/image/default_face.jpg'" />
									<div>${item[1]}</div>
								</span>
							</c:forEach>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xs-4 content_panel">
		<div class="sign_ma">
			<img alt="" src="<%=basePath%>admin/image/action_index_sign.png" onclick="javascript:lottery();">
		</div>
	</div>
	<div class="col-xs-12">
		<%@ include file="footer.jsp"%>
	</div>
	<script type="text/javascript" src="<%=basePath%>js/public/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>css/rollText/rollText.js"></script>
	<script>
	var AID = "<%=AID%>";
	//var AID = "${AID}";
	var delay = 15*1000;
	$(function(){
		var width = $(".col-xs-2.rol:first>img").css("width");
		$(".col-xs-2.rol>img").css("height",width);
		$("#rollText").rollText();
		setTimeout(function(){
			reloadlist();
		},delay);
		ajaxDeatil();
		
	});
	function ajaxDeatil(){
		$.ajax({
			url: '<%=basePath%>admin/signdraw/gotoactiondetail.shtml',
			type: 'post',
			dataType: 'json',
			async :false,
			data:{
				AID: AID
			},
			success: function(ret){
				if(ret.STATUS=="0"){
					$("#AURL").attr("src",ret.ACTIVITY.AURL);
					$("#title").text(ret.ACTIVITY.ATITLE);
					var winnerList = ret.winningList;
					var oldList = new Array();
					$(".roll-list-group-item>span.rol").each(function(){
						oldList.push($(this).attr("usid"));
					});
					for(var i=0; i<winnerList.length; i++){
						var isexist = false;
						for(var j=0; j<oldList.length; j++){
							if(winnerList[i][0] == oldList[j]){
								isexist = true;
								break;
							}
						}
						if(!isexist){
							$(".roll-list-group-item").append('<span class="col-xs-2 rol" usid="'+winnerList[i].USID+'">'
								+'<img src="'+winnerList[i].YUANTU_IMAGE+'" onerror="this.src=\'<%=basePath%>admin/image/default_face.jpg\'" />'
								+'<div>'+winnerList[i].REALNAME+'</div>'
							+'</span>');
						}
					}
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	}
	function reloadlist(){
		$.ajax({
			url: '<%=basePath%>admin/signdraw/gotoactiondetail.shtml',
			type: 'post',
			dataType: 'json',
			data:{
				AID: AID
			},
			success: function(ret){
				var winnerList = ret.winningList;
				var oldList = new Array();
				$(".roll-list-group-item>span.rol").each(function(){
					oldList.push($(this).attr('usid'));
				});
				for(var i=0; i<winnerList.length; i++){
					var isexist = false;
					for(var j=0; j<oldList.length; j++){
						if(winnerList[i].USID == oldList[j]){
							isexist = true;
							break;
						}
					}
					if(!isexist){
						$(".roll-list-group-item").append('<span class="col-xs-2 rol" usid="'+winnerList[i].USID+'">'
							+'<img src="'+winnerList[i].YUANTU_IMAGE+'" onerror="this.src=\'<%=basePath%>admin/image/default_face.jpg\'" />'
							+'<div>'+winnerList[i].REALNAME+'</div>'
						+'</span>');
					}
				}
				$("#rollText").rollText();
				setTimeout("reloadlist()",delay);
			},
			error: function(err){
				console.log(err);
			}
		})
	}
	function lottery(){
		window.open("<%=basePath%>admin/url/lottery.shtml?AID="+AID);
	}
	
	function actionsacner(){
		window.open("<%=basePath%>admin/url/actionscaner.shtml?AID="+AID);
	}
	
	// 判断各种浏览器，找到正确的方法
	function launchFullscreen(dom){
		var element = document.documentElement;
		if(element.requestFullscreen){
			element.requestFullscreen();
		}else if(element.mozRequestFullScreen){
			element.mozRequestFullScreen();
		}else if(element.webkitRequestFullscreen){
			element.webkitRequestFullscreen();
		}else if(element.msRequestFullscreen){
			element.msRequestFullscreen();
		}
		$(dom).addClass("cancelfull");
		$(dom).attr("onclick","javascript:exitFullscreen(this);");
	}
	
	// 判断浏览器种类
	function exitFullscreen(dom){
		if(document.exitFullscreen){
			document.exitFullscreen();
		}else if(document.mozCancelFullScreen){
			document.mozCancelFullScreen();
		}else if(document.webkitExitFullscreen){
			document.webkitExitFullscreen();
		}
		$(dom).removeClass("cancelfull");
		$(dom).attr("onclick","javascript:launchFullscreen(this);");
	}
	</script>
</body>
</html>
