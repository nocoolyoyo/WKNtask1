<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <title>商会云移动信息化管理平台</title>

        <%@ include file="meta.jsp"%>
        <%@ include file="link.jsp"%>
        <%@ include file="script.jsp"%>

        <link href="css/login.css" type="text/css" rel="stylesheet">
    </head>
    <body>
        <div id="login-box">
            <div id="login">
                <div id="login-header" class="center">
                    <div><img src="img/Logo_100x100.png" alt="商会云"></div>
                    <div class="kaiti">商会云移动信息化管理平台</div>
                </div>
                <div id="login-body" class="center">
                    <div class="login-form">
                        <form>
                            <div class="col-xs-12 login-input input-group">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-user"></span>
                                </span>
                                <input id="login-username" type="text"  name="username" class="form-control" placeholder="请输入用户名">
                            </div>
                            <div class="col-xs-12 login-input input-group">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-lock"></span>
                                </span>
                                <input id="login-password" type="password"  name="password" class="form-control" placeholder="请输入密码">
                            </div>
                            <div class="form-actions center">
                                <div class="col-xs-6">
                                    <button id="login-submit" type="submit" class="btn btn-block btn-success" disabled="disabled">登录</button>
                                </div>
                                <div class="col-xs-6">
                                    <button id="login-reset" type="reset" class="btn  btn-block btn-danger">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="login-message">
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
        <script src="js/login.js"></script>
   </body>
</html>