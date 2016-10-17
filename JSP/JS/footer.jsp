<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<footer class="container">
   <span>永杰科技 光越传媒 新浪闽商</span>
   <span>客服电话：0591-62751898</span>
   <span>技术支持：福州永杰网络科技股份有限公司</span>
   <div>(c) 2015-2020 商会云 . All Right Reserved . 永杰科技 版权所有</div>
</footer>

<script type="text/javascript">
    	$(function(){
    		$.ajax({
				url: '<%=basePath%>admin/menu/mainMsg.shtml',
				dataType: 'json',
				type: 'post',
				data:{
					
				},
				success:function(data){
					if(data.status == "0"){
						var logoUrl = data.LOGOURL;
						document.getElementById('logoUrl').src = logoUrl;
						$("#shName").html(data.SHNAME);
						$("#userName").html("您好，" + data.USERNAME);
						return;
					}
				},
				error: function(msg){
					alert("您已退出，请重新登录！");
					window.location.href="<%=basePath%>login/gotologin.shtml";
					return;
				}
			});
    	});
    </script>