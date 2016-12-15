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
	<title>抽奖</title>	
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/public/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/lottery.css"/>
	<script type="text/javascript" src="<%=basePath%>js/public/jquery-1.12.4.min.js"></script>
	<script type="text/javascript">
		var width = $(window).width()*0.008;
		$("html").css("font-size",width+"px");
	</script>
</head>
<body style="background-image: url('<%=basePath%>admin/image/action_index_bg.jpg'); background-repeat: no-repeat; min-width: 850px;">
	<div class="fullscreen" onclick="javascript:launchFullscreen(this);"></div>
	<div class="col-xs-12">
		<h2 class="htitle" id="title">${ACTIVITY.ATITLE}</h2>
	</div>
	<div class="col-xs-12" style="padding: 0;">
		<img src="<%=basePath%>admin/image/action_lottery_box.png" style="width: 50%; margin: 1.5% 0 0 22%;"/>
		<div class="lottery_setting_box">
			<img src="<%=basePath%>admin/image/lottery_setting_box.png" style="width: 100%;"/>
			<div class="lottery_lv">
				<input type="text" id="lottery_lv" class="special_input"/>
			</div>
			<div class="lottery_count">
				<input type="text" id="lottery_count" class="special_input" oninput="javascript:validNumber(this)"/>
			</div>
			<span class="unity" style="bottom:42.5%;">名</span>
			<div class="lottery_timeout">
				<input type="text" id="lottery_timeout" class="special_input" oninput="javascript:validNumber(this)"/>
			</div>
			<span class="unity" style="bottom:13%;">秒</span>
		</div>
		<div class="lottery_title"></div>
		<div class="lottery_members" style="height: 50%;">
			<div class="roll-body">
				<ul class="lottery-list main_list">
					<c:forEach items="${winningList}" var="item">
						<li class="lottery-list-item" userid="${item[3]}" username="${item[2]}" usertype="${item[0]}"><img src="${item[1]}" onerror="this.src='image/default_face.jpg'" /></li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="lottery_btn" onclick="javascript:lotteryStart(this);">开<br />始<br />抽<br />奖</div>
		<div class="lottery_member_box">
			<div class="winner_menu_title">中奖人员名单 共<span id="psonnum">0</span>人</div>
			<ul  class="winner_menu_body" >
				<c:forEach items="${lostList}" var="item">
					<li class="winner">
						<img src="${item[1]}" onerror="this.src='<%=basePath%>admin/image/default_face.jpg'" />
						<span>${item[3]}</span><span>${item[2]}</span>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
	<script>
	var i=0;
	var slowroll,lineheight,totalHeight,lottery_members_lineheight;
	var $thiswinner,remain;
	var AID = "${AID}";
	$(function(){
		ajaxDeatil();
		lottery_members_lineheight = $(".lottery_members").css("height");
		$(".lottery-list-item").css("height",lottery_members_lineheight);
		$("#lottery_lv").val('特等奖');
		$("#lottery_count").val('1');
		$("#lottery_timeout").val('1');
		var winner_count = $(".winner_menu_body>.winner").length;
		$(".winner_menu_title>span").text(winner_count);
		$(window).resize(function(){
			var width = $(window).width()*0.008;
			$("html").css("font-size",width+"px");
			lottery_members_lineheight = $(".lottery_members").css("height");
			$(".lottery-list-item").css("height",lottery_members_lineheight);
		});
		roll(500,1000);
	});
	function ajaxDeatil(){
		$.ajax({
			url: '<%=basePath%>admin/signdraw/gotolottery.shtml',
			type: 'post',
			dataType: 'json',
			async :false,
			data:{
				AID: AID
			},
			success: function(ret){
				if(ret.STATUS=="0"){
					$("#title").text(ret.ACTIVITY.ATITLE);
					var lost = ret.LOST;
					$("#psonnum").text(lost.length);
					var winnerList = ret.WINNING;
					for (var i = 0; i < winnerList.length; i++) {
						var html = '<li class="lottery-list-item" userid="'+winnerList[i].usid+'" username="'+winnerList[i].realname+'" usertype="'+winnerList[i].ISTEMP+'"><img src="'+winnerList[i].YUANTU_IMAGE+'" onerror="this.src=\'<%=basePath%>admin/image/default_face.jpg\'" /></li>'
						$(".lottery-list.main_list").append(html);
					}
					for (var j = 0; j < lost.length; j++) {
						var html = '<li class="winner"><img src="'+lost[j].YUANTU_IMAGE+'" onerror="this.src=\'<%=basePath%>admin/image/default_face.jpg\'" /><span>'+lost[j].AWNAME+'</span><span>'+lost[j].realname+'</span></li>'
						$(".winner_menu_body").append(html);
					}
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	}
	function lotteryStart(dom){
		var lottery_lv = $("#lottery_lv").val();
		var lottery_count = $("#lottery_count").val();
		var lottery_timeout = $("#lottery_timeout").val();
		remain = lottery_count;
		if(lottery_lv == ""){
			$("#lottery_lv").focus();
			alert("请设置抽奖等级");
			return null;
		}
		if(lottery_count == "" || Number(lottery_count) <= 0 || lottery_count.indexOf("e") >= 0 || lottery_count.indexOf(".") >= 0){
			$("#lottery_count").focus();
			alert("请设置中奖名额");
			return null;
		}
		if(lottery_timeout == "" || Number(lottery_timeout) < 1 || lottery_timeout.indexOf("e") >= 0){
			$("#lottery_timeout").focus();
			alert("请设置时间间隔,至少1秒");
			return null;
		}
		if($thiswinner && $thiswinner.length > 0){
			if($thiswinner.attr("class").indexOf("copy") >= 0){
				$(".main_list>.lottery-list-item:first").remove();
			}
			$thiswinner.remove();
		}
		if(lottery_count >　$('.roll-body>ul>li').length){
			$("#lottery_count").focus();
			alert("最大名额不可超过未中奖人员总数");
			return null;
		}
		lottery_timeout = lottery_timeout*1000;
		$(dom).attr("onclick","javascript:;");
		$.ajax({
            type:'POST',
            url: '<%=basePath%>admin/signdraw/insertAward.shtml',
		    data : {
				"AWNAME" : lottery_lv,
				"AWNUMBER" : lottery_count,
				"AID" : AID
			},
		    dataType:'json',
            success: function (data){
				if(data.stauts == "1"){
					console.log(data.errMsg);
					$(dom).attr("onclick","javascript:lotteryStart(this);");
					return null;
				}
            	var random1 = 10+Math.round(Math.random()*50);
				var random2 = 60+Math.round(Math.random()*50);
				roll(random1,random2);
				setTimeout(function(){
					lotteryStop(dom,lottery_timeout,lottery_lv,data.AWID);
				},lottery_timeout);
            },
            error: function(err){
                console.log(err);
            }
        });	
	}

	function lotteryStop(dom,lottery_timeout,lottery_lv,AWID){
		clearInterval(slowroll);
		setTimeout(function(){
			var currentIndex = Math.ceil($(".roll-body").scrollTop()/lineheight);
			var selectNode = $(".roll-body .lottery-list-item")[currentIndex];
			$thiswinner = $(selectNode);
			$(".winner_menu_body").prepend('<li class="winner">'
				+'<img src="'+$(selectNode).find('>img').attr('src')+'"/><span>'+$(selectNode).attr("username")+'</span><span>'+lottery_lv+'</span>'
			+'</li>');
			$(".lottery_title").html('恭喜<span class="lottert_title_name">'+$thiswinner.attr("username")+'</span>中<span class="lottert_title_lv">'+lottery_lv+'</span>');
			var winner_count = $(".winner_menu_body>.winner").length;
			$(".winner_menu_title>span").text(winner_count);
			var USID = $(selectNode).attr("userid");
			var userType = $(selectNode).attr("usertype");
			$.ajax({
				type:'POST',
				url: '<%=basePath%>admin/signdraw/insertWinningUser.shtml',
				data : {
					"USID" : USID,
					"AWID" : AWID,
					"AID" : AID,
					"ISTEMP": userType
				},
				dataType:'json',
				success: function (data){
	            	//console.log(data);
				},
				error: function(err){
					console.log(err);
	            }
	        });	
			remain --;
			if(remain > 0){
				setTimeout(function(){
					//打乱顺序
					if($thiswinner && $thiswinner.length > 0){
						if($thiswinner.attr("class").indexOf("copy") >= 0){
							var thisid = $thiswinner.attr("userid");
							$('.main_list>.lottery-list-item[userid="'+thisid+'"]').remove();
						}
						$thiswinner.remove();
					}
					var list = new Array();
					$(".lottery-list-item:not(.copy)").each(function(){
						var _this = new Object();
						_this.usid = $(this).attr("userid");
						_this.username = $(this).attr("username");
						_this.usertype = $(this).attr("usertype");
						_this.imgsrc = $(this).find("img").attr("src");
						list.push(_this);
					});
					list.sort(function(){ return 0.5 - Math.random() });
					$(".lottery-list.main_list").html("");
					for(var i=0; i<list.length; i++){
						var html = '<li class="lottery-list-item" userid="'+list[i].usid+'" username="'+list[i].username+'" usertype="'+list[i].usertype+'"><img src="'+list[i].imgsrc+'" onerror="this.src=\'image/default_face.jpg\'" /></li>';
						$(".lottery-list.main_list").append(html);
					}
					lotteryRestart(dom,lottery_timeout,lottery_lv,AWID);
				},lottery_timeout);
			}else{
				if($thiswinner && $thiswinner.length > 0){
					if($thiswinner.attr("class").indexOf("copy") >= 0){
						var thisid = $thiswinner.attr("userid");
						$('.main_list>.lottery-list-item[userid="'+thisid+'"]').remove();
					}
					$thiswinner.remove();
				}
				$(dom).attr("onclick","javascript:lotteryStart(this);");
			}
		},250);
	}

	function lotteryRestart(dom,lottery_timeout,lottery_lv,AWID){
		if($thiswinner && $thiswinner.length > 0){
			if($thiswinner.attr("class").indexOf("copy") >= 0){
				var thisid = $thiswinner.attr("userid");
				$('.main_list>.lottery-list-item[userid="'+thisid+'"]').remove();
			}
			$thiswinner.remove();
		}
		var random1 = 10+Math.round(Math.random()*50);
		var random2 = 60+Math.round(Math.random()*50);
		roll(random1,random2);
		var random_distance = Math.round(Math.random()*2000)+500;
		setTimeout(function(){
			lotteryStop(dom,lottery_timeout,lottery_lv,AWID);
		},random_distance);
	}
	
	function roll(speed,rate){
		clearInterval(slowroll);
		$(".main_list>.lottery-list-item.copy").remove();
<%--		clearMulitUser();--%>
		if($(".main_list>.lottery-list-item:first").length == 0){
			return null;
		}
		//$(".main_list").append($(".main_list>.lottery-list-item:first")[0].outerHTML);
		//$(".main_list>.lottery-list-item:last").addClass("copy");
		lineheight = $(".lottery-list-item:first").outerHeight();
		totalHeight = $(".main_list").height();
		i=0;
		slowroll = setInterval(function(){
			i+=lineheight;
			if(i== totalHeight){
				$(".roll-body").animate({scrollTop: "0px"},0);
				i = lineheight;
				$(".roll-body").animate({scrollTop: i+"px"},speed);
			}else{
				$(".roll-body").animate({scrollTop: i+"px"},speed);
			}
		},rate);
	}
	
	function clearMulitUser(){
		var $lastUser = $(".main_list>.lottery-list-item:last");
		lastUserId = $lastUser.attr("userid");
		var length = $(".main_list>.lottery-list-item").length;
		$(".main_list>.lottery-list-item").each(function(index){
			var thisUserId = $(this).attr("userid");
			if(length != (index+1) && thisUserId == lastUserId){
				$lastUser.remove();
			}
		});
	}
	
	//判断输入数据是不是数字
	function validNumber(dom){
		var str = $(dom).val();
		var regex = /^[1-9]{1,}[0-9]{0,}$/;
		if(!regex.test(str)){
			str = str.substring(0,str.length-1);
			$(dom).val(str);
		}
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
