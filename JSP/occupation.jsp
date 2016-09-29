<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta charset="UTF-8">
        <title>会员-商会云</title>

        <%@ include file="meta.jsp"%>
        <%@ include file="link.jsp"%>
        <%@ include file="script.jsp"%>

        <link href="css/function.css" type="text/css" rel="stylesheet">
        <script src="js/main.js"></script>
    </head>
    <body>

        <%@ include file="header.jsp"%>

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
                <div id="content-area-left">
                    <div id="content-siderbar-menuList" class="list-group">
                        <a href="#" class="list-group-item active">会员信息</a>
                        <div class="content-siderbar-innerList list-group"><a href="#" class="list-group-item">名会</a>
                            <a href="#" class="list-group-item">会长</a>
                            <a href="#" class="list-group-item">副会长</a>
                            <a href="#" class="list-group-item">秘书长</a>
                            <a href="#" class="list-group-item">理事长</a>
                            <a href="#" class="list-group-item">会员</a>
                            <a href="#" class="list-group-item">秘书</a>
                            <a href="#" class="list-group-item">工商联</a>
                            <a href="#" class="list-group-item">荣誉会员</a>
                            <a href="#" class="list-group-item">商会云客服</a>
                        </div>
                        <a href="#" class="list-group-item">职务管理</a>
                        <a href="#" class="list-group-item">群聊管理</a>
                        <a href="#" class="list-group-item">未激活</a>
                        <a href="#" class="list-group-item">群管理</a>
                    </div>
                </div>
                <div id="content-area-right">
                    <div class="content-area-right-box">
                        <form class="content-area-actionList form-inline action-bar" role="form">
                                <div class="form-group left">
                                    <button type="button" class="btn button button-primary button-rounded">录入会员</button>
                                    <button type="button" class="btn button button-primary button-rounded">导入会员</button>
                                    <button type="button" class="btn button button-primary button-rounded">导出会员</button>
                                </div>
                                <div class="form-group right">
                                    <input  class="form-control" type="search"  name="search"  placeholder="名字/单位">
                                    <select class="form-control">
                                        <option>筛选</option>
                                    </select>
                                    <button type="button" class="btn button button-primary button-rounded"><i class="fa fa-search button-text-icon"></i>查找</button>
                                </div>
                            </form>
                        <table class="content-area-tableList table table-bordered table-hover table-condensed">
                            <thead>
                                <tr class="active">
                                    <th><input type="checkbox"></th>
                                    <th>姓名</th>
                                    <th>手机号</th>
                                    <th>所在单位</th>
                                    <th>单位职务</th>
                                    <th>商会职务</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                    <tr>
                                        <th><input type="checkbox"></th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                        <th>待办事项1</th>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    <div class="content-area-pagination ">
                        <ul class="pagination content-area-pagination">
                            <li><a href="#">首页</a></li>
                            <li><a href="#">上一页</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">下一页</a></li>
                            <li><a href="#">尾页</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

        <%@ include file="footer.jsp"%>

    </body>
</html>