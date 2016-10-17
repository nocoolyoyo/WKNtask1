<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <title>画册-商会云</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <!--<link href="css/bootstrap-theme.min.css" type="text/css" rel="stylesheet">-->
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/default.css" type="text/css" rel="stylesheet">
    <!--<script src="//cdn.bootcss.com/html5shiv/r29/html5.min.js"></script>-->
    <!–[if IE]>
    <script src="js/html5.min.js"></script>
    <![endif]–>
    <!--<script src="//cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>-->
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/menuData.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
<header>
    <nav class="container">
            <span class="nav left">
                <span><img src="img/Logo_100x100.png"  alt="商会云"></span>
                <span id="logo-name" class="kaiti">商会云体验中心</span>
            </span>
        <span class="nav right">
                <!--<span class="logo-info"></span>-->
            </span>
    </nav>
</header>
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
        <div class="row">
            <div id="content-sidebar" class="col-xs-3">
            </div>
            <div id="content-area" class="col-xs-9">
            </div>
        </div>
    </div>
</main>
<footer class="container">
    <!--<div class="bottom">-->
    <span>永杰科技 光越传媒 新浪闽商</span>
    <span>客服电话：0591-62751898</span>
    <span>技术支持：福州永杰网络科技股份有限公司</span>
    <div>(c) 2015-2020 商会+ . All Right Reserved.   永杰科技 版权所有</div>
    <!--</div>-->
</footer>
</body>
</html>