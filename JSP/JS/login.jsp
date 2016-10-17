<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <title>商会云移动信息化管理平台</title>
        <%@ include file="meta.jsp"%>
     
        <link href="<%=basePath%>css/login.css" type="text/css" rel="stylesheet">
    </head>
    <body onkeydown="keyLogin();">
        <div id="login-box">
            <div id="login">
                <div id="login-header" class="center">
                    <div><img src="<%=basePath%>img/Logo_100x100.png" alt="商会云"></div>
                    <div class="kaiti">商会云移动信息化管理平台</div>
                </div>

                <div id="login-body" class="center">
                    <div class="form">
                        <form action="<%=basePath%>login/loginBySecretary.shtml" method="post">
                            <div class="col-xs-12 login-input input-group">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-user"></span>
                                </span>
                                <input id="login-username" value="${USERNAME}" type="text"  name="USERNAME" class="form-control" placeholder="请输入用户名">
                            </div>
                            <div class="col-xs-12 login-input input-group">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-lock"></span>
                                </span>
                                <input id="login-password" type="password"  name="PASSWORD" class="form-control" placeholder="请输入密码">
                            </div>
                            <div class="form-actions center">
                                <div class="col-xs-6">
                                    <button id="login-submit" type="button" onclick="login()" class="btn btn-block btn-success" disabled="disabled">登录</button>
                                </div>
                                <div class="col-xs-6">
                                    <button id="login-reset" type="reset" class="btn  btn-block btn-danger">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="login-message">
		    		${errMsg}
		   		</div>
                </div>
                
                <div id="login-footer" class="center">
                    <div></div>
                    <div>Copyright © 2016 福州永杰网络科技股份有限公司</div>
                </div>
            </div>
            <div id="bubble-box">
                <canvas id="bubble-canvas"></canvas>
            </div>
        </div>
         <%@ include file="script.jsp"%>
        <script src="<%=basePath%>js/login.js"></script>
        <script type="text/javascript">
        	function keyLogin(){
			 if (event.keyCode==13)  //回车键的键值为13
			   document.getElementById("login-submit").click(); //调用登录按钮的登录事件
			}
        	   	function login(){
        	   		var username = $("#login-username").val();
        	        var password = $("#login-password").val();
        	   		$.ajax({
        				url: '<%=basePath%>login/loginBySecretary.shtml',
        				dataType: 'json',
        				type: 'post',
        				data:{
        					"USERNAME":username,
        					"PASSWORD":password
        				},
        				success:function(data){
        					if(data.status != "0"){
        						$("#login-message").html(data.errMsg);
        						$("#login-message").css("color","red");
        						return;
        					}
        					location.href = "<%=basePath%>admin/url/index.shtml";
        				},
        				error: function(msg){
        					$("#login-message").html("登录失败");
        					$("#login-message").css("color","red");
        				}
        			});
        	   	}
        	   </script>
   </body>
</html>