<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <title>会员-商会云</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="<%=basePath%>img/Logo_25x25.png" rel="shortcut icon">

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

        <div id="sidebar-left" class="sidebar-container sidebar-push">
            <div class="sidebar">
                <div class="sidebar-wrap">
                    <ul>
                        <li><a href="#">会员信息</a></li>
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
                    <div id="occupation-profile" class="panel panel-default">
                        <div class="panel-heading">个人资料</div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form" action="<%=basePath%>admin/member/addMember.shtml" method="post" name="addform" id="addform">
                                <div class="col-sm-3">
                                    <div class="reveal-dim">
                                        <img class="reveal-show" src="<%=basePath%>img/image.png" id="image">
                                        <div class="reveal-hide reveal-content">
                                            <div class="reveal-center">
                                                <span>
                                                  <a class="btn btn-inverted btn-bold btn-success">上传头像</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-9">
                                    <div class="form-group">
                                        <label for="MOBILE" class="col-sm-2 control-label">账号：</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="MOBILE" name="MOBILE" placeholder="手机号码" onchange="ajaxLoadTelephone();">
                                        </div>
                                        <label for="REALNAME" class="col-sm-2 control-label">姓名：</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="REALNAME" name="REALNAME" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="sex" class="col-sm-2 control-label">性别：</label>
                                        <div class="col-sm-4">
                                            <label class="checkbox-inline">
                                                <input type="radio" name="GENDER" id="GENDER" value="1" checked="checked"/>男
                                            </label>
                                                <label class="checkbox-inline">
                                                <input type="radio" name="GENDER" id="GENDER" value="2"/>女
                                            </label>
                                        </div>
                                        <label for="sex" class="col-sm-2 control-label">政治面貌：</label>
                                        <div class="col-sm-4">
                                            <label class="checkbox-inline">
                                                <input type="radio" name="POLITICAL" id="POLITICAL" value="0" checked>群众
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="radio" name="POLITICAL" id="POLITICAL" value="1">党员
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">生日：</label>
                                        <div class="col-sm-4">
                                            <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                                <input class="form-control" size="2" id="BIRTHDAY" name="BIRTHDAY" type="text" value="" placeholder="生日日期" readonly>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                        <label for="name" class="col-sm-2 control-label">身份证号：</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="IDCARD" name="IDCARD" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">入会时间：</label>
                                        <div class="col-sm-4">
                                            <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                                <input class="form-control" size="2" id="JOINDATE" name="JOINDATE" type="text" value="" placeholder="入会时间" readonly>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                        <label for="name" class="col-sm-2 control-label">会费数额：</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" id="FEEAMOUNT" name="FEEAMOUNT" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">缴费时间：</label>
                                        <div class="col-sm-4">
                                            <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                                <input class="form-control" size="2" id="FEEDATE" name="FEEDATE" type="text" value="" placeholder="缴费时间" readonly>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                        <label for="name" class="col-sm-2 control-label">到期时间：</label>
                                        <div class="col-sm-4">
                                            <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                                <input class="form-control" size="2" id="FEEDATEEND" name="FEEDATEEND" type="text" value="" placeholder="到期时间" readonly>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">联系方式</div>
                                <div class="form-group">
                                    <label for="account" class="col-sm-1 control-label">所在地：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="RESIDE" name="RESIDE" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-1 control-label">籍贯：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="NATIVEINFO" name="NATIVEINFO" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-1 control-label">手机：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="PHONE" name="PHONE" placeholder="" onchange="ajaxLoadTelephone();">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="account" class="col-sm-1 control-label">传真：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="FAX" name="FAX" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-1 control-label">座机：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="FIXEDTELEPHONE" name="FIXEDTELEPHONE" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-1 control-label">邮箱：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="EMAIL" name="EMAIL" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="account" class="col-sm-1 control-label">QQ：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="QQ" name="QQ" placeholder="">
                                    </div>
                                </div>
                                <div class="col-sm-12">单位信息</div>
                                <div class="form-group">
                                    <label for="account" class="col-sm-2 control-label">单位名称：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="COMPANY" name="COMPANY" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-2 control-label">单位职称：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="COMPANYWORK" name="COMPANYWORK" placeholder="">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="account" class="col-sm-2 control-label">单位资产：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="COMPANYMONEY" name="COMPANYMONEY" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-2 control-label">成立时间：</label>
                                    <div class="col-sm-3">
                                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                            <input class="form-control" size="2" id="SETUPDATE" name="SETUPDATE" type="text" value="" placeholder="成立时间" readonly>
                                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="account" class="col-sm-2 control-label">单位网址：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="COMPANYWEB" name="COMPANYWEB" placeholder="">
                                    </div>
                                    <label for="name" class="col-sm-2 control-label">所属行业：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="POSITION" name="POSITION" placeholder="">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">单位地址：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="COMPANYADDRESS" name="COMPANYADDRESS" placeholder="">
                                    </div>
                                </div>

                                <div class="col-sm-12">其他</div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">爱好：</label>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" id="HOBBIES" name="HOBBIES" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">教育背景：</label>
                                    <div class="col-sm-8">
                                        <textarea class="form-control" id="EDUCATION" name="EDUCATION">

                                        </textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">工作经历：</label>
                                    <div class="col-sm-8">
                                        <textarea class="form-control" id="EXPERIENCE" name="EXPERIENCE">

                                        </textarea>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-sm-4 col-sm-offset-4">
                                        <button type="button" id="sa" onclick="save()" class="btn button-green button-rounded col-sm-6">保存</button>
                                        <button type="button" onclick="javascript:history.go(-1)" class="btn button button-rounded col-sm-6">返回</button>
                                    </div>
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
    <%@ include file="script.jsp"%>

<script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
<script src="<%=basePath%>js/public/datetimepicker-init.js"></script>
<script src="<%=basePath%>js/public/fileinput.min.js"></script>
<script src="<%=basePath%>js/public/fileinput-zh-CN.js"></script>
<script src="<%=basePath%>js/main.js"></script>
<script src="<%=basePath%>js/occupation.js"></script>
</body>
	<script type="text/javascript">
		$(function(){
			var userName = ${USERNAME};
			if(userName!=0){
				$.ajax({
               		url: '<%=basePath%>admin/member/showMessage.shtml',
               		dataType: 'json',
               		type: 'post',
               		data:{"USERNAME":userName},
               		traditional: true,
               		success:function(data){
               			if(data.status == "0"){
               				//document.getElementById('MOBILE').disabled = true;
               				$("#image").attr("src",data.list[0].IMAGE);
               				document.getElementById("MOBILE").readOnly=true;
               				$("#MOBILE").val(data.list[0].MOBILE);
               				$("#REALNAME").val(data.list[0].REALNAME);
               				var gender = data.list[0].GENDER;
               				if(gender == 2){
	               				$("input[name='GENDER']").eq(1).attr("checked","checked");
					            $("input[name='GENDER']").eq(2).removeAttr("checked");
					            $("input[name='GENDER']").eq(1).click();
				            }else{
				            	 $("input[name='GENDER']").eq(1).removeAttr("checked");
					             $("input[name='GENDER']").eq(2).attr("checked","checked");
					             $("input[name='GENDER']").eq(2).click();
				            }
				            var political = data.list[0].POLITICAL;
               				if(political == 1){
	               				 $("input[name='POLITICAL']").eq(0).removeAttr("checked");
					             $("input[name='POLITICAL']").eq(1).attr("checked","checked");
					             $("input[name='POLITICAL']").eq(1).click();
				            }else{
					            $("input[name='POLITICAL']").eq(0).attr("checked","checked");
					            $("input[name='POLITICAL']").eq(1).removeAttr("checked");
					            $("input[name='POLITICAL']").eq(0).click();
				            }
               				$("#BIRTHDAY").val(data.list[0].BIRTHDAY);
               				$("#IDCARD").val(data.list[0].IDCARD);
               				$("#JOINDATE").val(data.list[0].JOINDATE);
               				$("#FEEAMOUNT").val(data.list[0].FEEAMOUNT);
               				$("#FEEDATE").val(data.list[0].FEEDATE);
               				$("#FEEDATEEND").val(data.list[0].FEEDATEEND);
               				$("#RESIDE").val(data.list[0].RESIDE);
               				$("#NATIVEINFO").val(data.list[0].NATIVEINFO);
               				$("#PHONE").val(data.list[0].MOBILE);
               				$("#FAX").val(data.list[0].FAX);
               				$("#FIXEDTELEPHONE").val(data.list[0].FIXEDTELEPHONE);
               				$("#EMAIL").val(data.list[0].EMAIL);
               				$("#QQ").val(data.list[0].QQ);
               				$("#COMPANY").val(data.list[0].COMPANY);
               				$("#COMPANYWORK").val(data.list[0].COMPANYWORK);
               				$("#COMPANYMONEY").val(data.list[0].COMPANYMONEY);
               				$("#SETUPDATE").val(data.list[0].SETUPDATE);
               				$("#COMPANYWEB").val(data.list[0].COMPANYWEB);
               				$("#POSITION").val(data.list[0].POSITION);
               				$("#COMPANYADDRESS").val(data.list[0].COMPANYADDRESS);
               				$("#HOBBIES").val(data.list[0].HOBBIES);
               				$("#EDUCATION").val(data.list[0].EDUCATION);
               				$("#EXPERIENCE").val(data.list[0].EXPERIENCE);
               			}else{
               				alert("操作失败，请联系管理人员！");
               			}
               		},
               		error: function(msg){
               			alert("操作失败，请联系管理人员！");
               		}
               	});
			}
		});
		function ajaxLoadTelephone(){
        	 var phone = $.trim($("#PHONE").val());
        	 var name = $.trim($("#MOBILE").val());
        	 if(name == ""){
        		alert("请输入 账号");
        	}else if(name.length!=11&&name.length!=12){
	    	  alert("账号必须是正确的手机号");
	    	}else {
	    		var p=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
	    		if (!p.test(name)&&name.length==11) {
			        alert("账号必须是正确的手机号");
			    }else{
			    	$("#PHONE").val(name);
			    }
	    	}       	
        }; 
		function save(){
			document.getElementById("sa").disabled=true;
			var MOBILE = $("#MOBILE").val();
			if(MOBILE == ""){
				alert("账号不能为空!");
				return;
			}
			var REALNAME = $("#REALNAME").val();
			if(REALNAME == ""){
				alert("姓名不能为空!");
				return;
			}
			var PHONE = $("#PHONE").val();
			if(PHONE == ""){
				alert("手机不能为空!");
				return;
			}
			var PHONE = $("#PHONE").val();
			if (PHONE != "") {
		    	var p3 = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
		        if (p3.test(PHONE) == false) {
		            alert("请输入正确手机号");
		            return;
		        }
		        if(PHONE.length!=11&&MOBILE.length!=12){
			    	 alert("请输入正确手机号");
			    	 return;
			    }
		    }
			//缴费时间,
			var payTime=$.trim($("#FEEDATE").val().toString().replace(/\//g,"-"));
			//到期时间
			var endTime=$.trim($("#FEEDATEEND").val().toString().replace(/\//g,"-"));
		    //缴费数额
			var payAmount=$.trim($("#FEEAMOUNT").val());
			if((payAmount=="" || payTime=="" || endTime=="") &&　(payAmount!="" || payTime!="" || endTime!="")){
		    	alert("缴费时间，缴费数额以及到期时间为捆绑项，全部填写或全不填写，且缴费时间必须小于到期时间");
		    	return ;
		    }
		    if((payAmount!="" && payTime!="" && endTime!="") && (endTime<=payTime)){
		    	alert("缴费时间必须小于到期时间");
		    	return ;
		    }
		    if ($.trim(payAmount) != "" && payAmount.length > 0) {
				if (isNaN(payAmount)) {
					alert("*缴费数额只能是数字！");
					return;
				}
				if (payAmount.length > 6) {
					alert("*缴费数额超出范围！");
					return;
				}
				if(payAmount==0){
					alert("*缴费数额不能为零！");
					return;
				}
				if(payAmount<0){
					alert("*缴费数额不能是负数！");
					return;
				}
			}
		    //单位资产
			var companyAssets=$.trim($("#COMPANYMONEY").val());
		    if ($.trim(companyAssets) != "" && companyAssets.length > 0) {
				if (isNaN(companyAssets)) {
					alert("*资产只能是数字！");
					return;
				}
				if (companyAssets.length > 8) {
					alert("*资产超出范围！");
					return;
				}
				if(companyAssets<0){
					alert("*资产不能是负数！");
					return;
				}
			}
			if(${USERNAME} == 0){
				$.ajax({
	        		url: '<%=basePath%>admin/member/addMember.shtml',
	        		dataType: 'json',
	        		type: 'post',
	        		data:$('#addform').serialize(),
	        		success:function(data){
	        			if(data.status == "2"){
	        				alert("会员已存在!");
	        				document.getElementById("sa").disabled=false;
	        				return;
	        			}else if(data.status == "0"){
	        				alert("保存成功!");
	        				window.location.href="<%=basePath%>admin/url/occupation.shtml";
	        			}else{
	        				alert("操作失败，请联系管理人员！");
	        				document.getElementById("sa").disabled=false;
	        			}
	        		},
	        		error: function(msg){
	        			alert("操作失败，请联系管理人员！");
	        			document.getElementById("sa").disabled=false;
	        		}
	        	});
			}else{
				$.ajax({
	        		url: '<%=basePath%>admin/member/updateUserMember.shtml',
	        		dataType: 'json',
	        		type: 'post',
	        		data:$('#addform').serialize(),
	        		success:function(data){
	        			if(data.status == "0"){
	        				alert("修改成功!");
	        				window.location.href="<%=basePath%>admin/url/occupation.shtml";
	        			}else{
	        				alert("操作失败，请联系管理人员！");
	        				document.getElementById("sa").disabled=false;
	        			}
	        		},
	        		error: function(msg){
	        			alert("操作失败，请联系管理人员！");
	        			document.getElementById("sa").disabled=false;
	        		}
	        	});
			}
		}
	</script>
</html>