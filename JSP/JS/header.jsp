<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="script.jsp"%>
    <header>
        <nav class="navbar container">
            <span class="left">
                <span class="navbar-img"><img id="logoUrl" src="<%=basePath%>img/Logo_100x100.png" alt="商会云"></span>
                <span class="navbar-brand kaiti" id="shName"></span>
            </span>
            <span class="right">
                <span class="navbar-brand navbar-welcome kaiti" id="userName"></span>
                <button id="user-setting" type="reset" class="navbar-btn btn btn-success"><i class="fa fa-cog" aria-hidden="true"></i></button>
                <a href="<%=basePath%>admin/url/rebacklogin.shtml"><button id="login-out" type="reset" class="navbar-btn btn btn-danger"><i class="fa fa-power-off" aria-hidden="true"></i></button></a>
            </span>
        </nav>
    </header>
    
