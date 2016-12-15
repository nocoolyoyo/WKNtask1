<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <title>设置-商会云</title>

    <%@ include file="meta.jsp"%>


    <link href="<%=basePath%>css/setting.css" type="text/css" rel="stylesheet">


</head>
<body>

<%@ include file="header.jsp"%>

<main class="container">
    <div id="content">
        <!--<ul id="content-navbar" class="row">-->
        <!--<li id="content-navbar-home"><a href="index.html"><i class="fa fa-desktop"></i>桌面</a></li>-->
        <!--<li id="content-navbar-menu">-->
        <!--<ul>-->
        <!--</ul>-->
        <!--</li>-->
        <!--<li id="content-navbar-switch" ><a href="#"><i class="fa fa-columns"></i>切换</a></li>-->
        <!--</ul>-->
        <div id="main-box" class="col-sm-8 col-sm-offset-2">
            <div id="setting-panel" class="panel panel-default top-10" >
                <div class="panel-heading"><h4 class="center">设置</h4></div>
                <div class="panel-body">
                    <div>
                        <ul class="nav nav-tabs tabs-material">
                            <li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">个人设置</a></li>
                            <li class=""><a href="#tab2" data-toggle="tab" aria-expanded="false">商会设置</a></li>
                            <li class=""><a href="#tab3" data-toggle="tab" aria-expanded="false">问题反馈</a></li>
                        </ul>
                        <div id="setting-body" class="tab-content">
                            <div class="tab-pane fade active in" id="tab1">
                                <form id="form1" class="form-horizontal both-25" role="form">
                                    <div class="bs-divider"><h5 class="center">基本信息</h5></div>
                                    <div class="form-group">
                                        <label for="account" class="col-sm-2 control-label">账号：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="account" placeholder="账号" value="${sessionScope.miShuChuList.USERNAME}" readonly="readonly">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">姓名：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="name" id="name" placeholder="姓名" value="${sessionScope.miShuChuList.REALNAME}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="sex" class="col-sm-2 control-label">性别：</label>
                                        <div class="col-sm-10">
                                            <label class="radio-inline">
                                                <input type="radio" id="sexOptions" name="sexOptions" value="1" <c:if test='${sessionScope.miShuChuList.SEX == 1}'>checked="checked"</c:if>> 男
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" id="sexOptions" name="sexOptions" value="2" <c:if test='${sessionScope.miShuChuList.SEX == 2}'>checked="checked"</c:if>> 女
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="col-sm-2 control-label">职务：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="position" id="position" placeholder="职务" value="${sessionScope.miShuChuList.POSITIONNAME}">
                                        </div>
                                    </div>
                                    <div class="form-group center">
                                        <button id="submit-form1" type="button" class="btn btn-primary">确定</button>
                                        <button id="reset" type="reset" class="btn btn-default">返回</button>
                                    </div>
                                </form>
                                <form id="form4" class="form-horizontal both-25" role="form">

                                    <div class="bs-divider"><h5 class="center">修改密码</h5></div>
                                    <div class="form-group">
                                        <label for="orinPassword" class="col-sm-2 control-label">原始密码：</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" name="orinPassword" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="newPassword" class="col-sm-2 control-label">修改密码：</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" name="newPassword" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cnewPassword" class="col-sm-2 control-label">确认密码：</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" name="cnewPassword" placeholder="">
                                        </div>
                                    </div>

                                    <div class="form-group center">
                                        <button id="submit-form4" type="button" class="btn btn-primary">确定</button>
                                        <button id="reset1" type="reset" class="btn btn-default">返回</button>
                                    </div>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="tab2">
                                <form id="form2" class="form-horizontal both-25" role="form">
                                    <div class="bs-divider"><h5 class="center">基本信息</h5></div>
                                    <div class="form-group">
                                        <div id="uploadImg-box" class="reveal-dim center">
                                            <img class="reveal-show" src="${sessionScope.shangHuiList.LOGOURL}" onerror="this.src='<%=basePath%>img/imgHolder1-1.png'">
                                            <div class="reveal-hide reveal-content">
                                              <form method="POST" enctype="multipart/form-data">
                                                <div class="reveal-center">
                                                <span>
                                                    <label id="upLoadImgBtn" class="btn btn-inverted btn-bold btn-success" for="upLoadImg">上传图片</label>
                                                    <input id="upLoadImg" name="upLoadImg" type="file" style="position:absolute;clip:rect(0 0 0 0);" value="">
                                                </span>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group top-9">
                                        <label class="col-sm-2 control-label">商会名称：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="RENAME" id="RENAME" placeholder="商会名称" value="${sessionScope.shangHuiList.SHNAME}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">现任主席：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="chairman" id="chairman" placeholder="现任主席" value="${sessionScope.shangHuiList.CHAIRMANNAME}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">商会网址：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="URL" id="URL" placeholder="商会网址" value="${sessionScope.shangHuiList.WEBSITE}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">商会地址：</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="ADDRESS" id="ADDRESS" placeholder="商会地址" value="${sessionScope.shangHuiList.ADDRESS}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">商会简介：</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" rows="3" id="brief">${sessionScope.shangHuiList.INTRODUCTION}</textarea>
                                            <span class="help-block">字数限制在500字以内</span>
                                        </div>
                                    </div>
                                    <div class="form-group center">
                                        <button id="form2-submit" type="button" class="btn btn-primary">确定</button>
                                        <button id="reset3" type="reset" class="btn btn-default">返回</button>
                                    </div>
                                </form>
                                <form id="form5" class="form-horizontal both-25" role="form">
                                    <div class="bs-divider"><h5 class="center">短信模板</h5></div>
                                    <!--<div class="form-group">-->
                                    <!--<label class="col-sm-2 control-label">生日祝福：</label>-->
                                    <!--<div class="col-sm-10">-->
                                    <!--<textarea class="form-control" rows="3" id="birthday"></textarea>-->
                                    <!--<span class="checkbox"> <label><input type="checkbox"> 自动发送</label>-->
                                    <!--</span>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <div class="form-group margin-center">
                                       <span><label class="control-label">生日祝福：</label><label class="control-label pull-right"><input type="checkbox" id="birthdayBox"> 自动发送</label>
                                           </span>
                                        <textarea class="form-control" rows="3"  id="birthday"></textarea>
                                        <button type="button" class="btn btn-primary top-10 right" id="birthdaySave">保存</button>
                                    </div>
                                    <div class="form-group margin-center">
                                       <span><label class="control-label">未激活会员通知：</label><label class="control-label pull-right"><input type="checkbox" id="downloadBox"> 自动发送</label>
                                           </span>
                                        <textarea class="form-control" rows="3"  id="download"></textarea>
                                        <button type="button" class="btn btn-primary top-10 right" id="downloadSave">保存</button>
                                    </div>
                                    <div class="form-group margin-center">
                                       <span><label class="control-label">未查看通知通告：</label><label class="control-label pull-right"><input type="checkbox" id="notificationBox"> 自动发送</label>
                                           </span>
                                        <textarea class="form-control" rows="3"  id="notification"></textarea>
                                        <button type="button" class="btn btn-primary top-10 right" id="notificationSave">保存</button>
                                    </div>
                                    <div class="form-group margin-center">
                                       <span><label class="control-label">已查看已报名通知通告：</label><label class="control-label pull-right"><input type="checkbox" id="issignupisviewnotifictionBox"> 自动发送</label>
                                           </span>
                                        <textarea class="form-control" rows="3"  id="issignupisviewnotifiction"></textarea>
                                        <button type="button" class="btn btn-primary top-10 right" id="issignupisviewnotifictionSave">保存</button>
                                    </div>
                                    <div class="form-group margin-center">
                                       <span><label class="control-label">已查看未报名通知通告：</label><label class="control-label pull-right"><input type="checkbox" id="nosignupisviewnotifictionBox"> 自动发送</label>
                                           </span>
                                        <textarea class="form-control" rows="3"  id="nosignupisviewnotifiction"></textarea>
                                        <button type="button" class="btn btn-primary top-10 right" id="nosignupisviewnotifictionSave">保存</button>
                                    </div>
                                    
                                </form>
                            </div>
                            <div class="tab-pane fade" id="tab3">

                                <form id="form3" class="form-horizontal both-25" role="form">
                                    <div class="bs-divider"><h5 class="center">基本信息</h5></div>


                                    <div class="form-group margin-center">
                                        <textarea class="form-control" rows="6"  id="backContent"></textarea>
                                        <span class="help-block">客服电话：0591-62751898</span>
                                    </div>

                                    <div class="bs-divider"></div>
                                    <div class="form-group center">
                                        <button id="addFeedback" type="button" class="btn btn-primary">提交问题</button>
                                        <button id="reset2" type="reset" class="btn btn-default">返回</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<%@ include file="footer.jsp"%>

<script src="<%=basePath%>js/public/ajaxFileUpload.js"></script>
<script src="<%=basePath%>js/main.js"></script>
<script src="<%=basePath%>js/setting.js"></script>
</body>
</html>