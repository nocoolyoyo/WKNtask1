<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="script.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<header>
    <nav class="navbar container">
            <span class="left">
                <span class="navbar-img"><img id="logoUrl" src="<%=basePath%>img/Logo_100x100.png" alt="商会云"></span>
                <span class="navbar-brand kaiti" id="shName"></span>
            </span>
        <span class="right">
                <span class="navbar-brand navbar-welcome kaiti" id="userName"></span>
                <a id="help" type="reset" class="navbar-btn btn btn-warning" data-toggle="modal" data-target="#help-modal"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a>
                <a id="user-setting" class="navbar-btn btn btn-success" data-toggle="modal" data-target="#setting-modal"><i class="fa fa-cog" aria-hidden="true"></i></a>
                <a href="<%=basePath%>admin/url/rebacklogin.shtml" id="login-out" type="reset" class="navbar-btn btn btn-danger"><i class="fa fa-power-off" aria-hidden="true"></i></a>
            </span>
    </nav>
</header>

<!--<div class="loader" style="position: absolute;
margin-left: -55px;
margin-top: -100px;
height: 110px;
width: 110px;
left: 50%;
top: 50%;
z-index:9999">Loading...</div>-->
<div id="preloader-container"  style="display:none">
    <div class="preloader" style="opacity: 1;">
        <svg version="1.1" id="sun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xml:space="preserve" style="opacity: 1; margin-left: 0px; margin-top: 0px;">
	    <g>
	      <path fill="none" d="M6.942,3.876c-0.4-0.692-1.146-1.123-1.946-1.123c-0.392,0-0.779,0.104-1.121,0.301c-1.072,0.619-1.44,1.994-0.821,3.067C3.454,6.815,4.2,7.245,5,7.245c0.392,0,0.779-0.104,1.121-0.301C6.64,6.644,7.013,6.159,7.167,5.581C7.321,5,7.243,4.396,6.942,3.876z M6.88,5.505C6.745,6.007,6.423,6.427,5.973,6.688C5.676,6.858,5.34,6.948,5,6.948c-0.695,0-1.343-0.373-1.69-0.975C2.774,5.043,3.093,3.849,4.024,3.312C4.32,3.14,4.656,3.05,4.996,3.05c0.695,0,1.342,0.374,1.69,0.975C6.946,4.476,7.015,5,6.88,5.505z"></path>
	      <path fill="none" d="M8.759,2.828C8.718,2.757,8.626,2.732,8.556,2.774L7.345,3.473c-0.07,0.041-0.094,0.132-0.053,0.202C7.319,3.723,7.368,3.75,7.419,3.75c0.025,0,0.053-0.007,0.074-0.02l1.211-0.699C8.774,2.989,8.8,2.899,8.759,2.828z"></path>
	      <path fill="none" d="M1.238,7.171c0.027,0.047,0.077,0.074,0.128,0.074c0.025,0,0.051-0.008,0.074-0.02l1.211-0.699c0.071-0.041,0.095-0.133,0.054-0.203S2.574,6.228,2.503,6.269l-1.21,0.699C1.221,7.009,1.197,7.101,1.238,7.171z"></path>
	      <path fill="none" d="M6.396,2.726c0.052,0,0.102-0.026,0.13-0.075l0.349-0.605C6.915,1.976,6.89,1.885,6.819,1.844c-0.07-0.042-0.162-0.017-0.202,0.054L6.269,2.503C6.228,2.574,6.251,2.666,6.322,2.706C6.346,2.719,6.371,2.726,6.396,2.726z"></path>
		  <path fill="none" d="M3.472,7.347L3.123,7.952c-0.041,0.07-0.017,0.162,0.054,0.203C3.2,8.169,3.226,8.175,3.25,8.175c0.052,0,0.102-0.027,0.129-0.074l0.349-0.605c0.041-0.07,0.017-0.16-0.054-0.203C3.603,7.251,3.513,7.276,3.472,7.347z"></path>
		  <path fill="none" d="M3.601,2.726c0.025,0,0.051-0.007,0.074-0.02C3.746,2.666,3.77,2.574,3.729,2.503l-0.35-0.604C3.338,1.828,3.248,1.804,3.177,1.844C3.106,1.886,3.082,1.976,3.123,2.047l0.35,0.604C3.5,2.7,3.549,2.726,3.601,2.726z"></path>
		  <path fill="none" d="M6.321,7.292c-0.07,0.043-0.094,0.133-0.054,0.203l0.351,0.605c0.026,0.047,0.076,0.074,0.127,0.074c0.025,0,0.051-0.006,0.074-0.02c0.072-0.041,0.096-0.133,0.055-0.203l-0.35-0.605C6.483,7.276,6.393,7.253,6.321,7.292z"></path>
		  <path fill="none" d="M2.202,5.146c0.082,0,0.149-0.065,0.149-0.147S2.284,4.851,2.202,4.851H1.503c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147H2.202z"></path>
		  <path fill="none" d="M8.493,4.851H7.794c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147l0,0h0.699c0.082,0,0.148-0.065,0.148-0.147S8.575,4.851,8.493,4.851L8.493,4.851z"></path>
		  <path fill="none" d="M5.146,2.203V0.805c0-0.082-0.066-0.148-0.148-0.148c-0.082,0-0.148,0.066-0.148,0.148v1.398c0,0.082,0.066,0.149,0.148,0.149C5.08,2.352,5.146,2.285,5.146,2.203z"></path>
		  <path fill="none" d="M4.85,7.796v1.396c0,0.082,0.066,0.15,0.148,0.15c0.082,0,0.148-0.068,0.148-0.15V7.796c0-0.082-0.066-0.148-0.148-0.148C4.917,7.647,4.85,7.714,4.85,7.796z"></path>
		  <path fill="none" d="M2.651,3.473L1.44,2.774C1.369,2.732,1.279,2.757,1.238,2.828C1.197,2.899,1.221,2.989,1.292,3.031l1.21,0.699c0.023,0.013,0.049,0.02,0.074,0.02c0.051,0,0.101-0.026,0.129-0.075C2.747,3.604,2.722,3.514,2.651,3.473z"></path>
		  <path fill="none" d="M8.704,6.968L7.493,6.269c-0.07-0.041-0.162-0.016-0.201,0.055c-0.041,0.07-0.018,0.162,0.053,0.203l1.211,0.699c0.023,0.012,0.049,0.02,0.074,0.02c0.051,0,0.102-0.027,0.129-0.074C8.8,7.101,8.776,7.009,8.704,6.968z"></path>
	  </g>
	  </svg>

	  <svg version="1.1" id="cloud" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xml:space="preserve">
	    <path fill="none" d="M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z"></path>
	  </svg>

        <div class="rain">
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
            <span class="drop"></span>
        </div>

        <div class="text">
            	阳光总在风雨后
        </div>
    </div>
</div>

<div id="help-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header center">
                <h4 class="modal-title">常见问题帮助</h4>
            </div>
            <div class="modal-body">
                <ul id="help-list">


                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<div id="setting-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header center">
                <h4 class="modal-title">个人资料设置</h4>
            </div>
            <div class="modal-body">
                <div class="top-10">
                    <ul class="nav nav-tabs tabs-material">
                        <li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">个人设置</a></li>
                        <li class=""><a href="#tab2" data-toggle="tab" aria-expanded="false">商会设置</a></li>
                        <li class=""><a href="#tab3" data-toggle="tab" aria-expanded="false">问题反馈</a></li>
                    </ul>
                    <div id="setting-body" class="tab-content" style="height:450px; overflow: auto">
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
                                </div>
                            </form>
                            <form id="form5" class="form-horizontal both-25" role="form">
                                <div class="bs-divider"><h5 class="center">短信模板</h5></div>

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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn button button-rounded" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>


<script src="<%=basePath%>js/public/ajaxFileUpload.js"></script>
<script src="<%=basePath%>js/setting.js"></script>
<script src="<%=basePath%>js/help.js"></script>
