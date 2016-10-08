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

        <link href="<%=basePath%>css/function.css" type="text/css" rel="stylesheet">

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
         <div id="content-area">
             <div class="content-area-box">
             <form class="content-area-actionList form-inline" role="form">
                 <div class="form-group left">
                     <button  type="button" class="btn button button-primary button-rounded">发通知</button>
                     <button  type="button" class="btn button button-primary button-rounded">草稿箱</button>
                 </div>
                 <div class="form-group right">
                     <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                         <input class="form-control" size="9" type="text" value="" placeholder="开始日期" readonly>
                         <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                     </div>
                     <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                         <input class="form-control" size="9" type="text" value="" placeholder="结束日期" readonly>
                         <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                     </div>
                     <input  class="form-control" type="search"  name="search"  placeholder="活动主题">
                     <button type="button" class="btn button button-primary button-rounded"><i class="fa fa-search button-text-icon"></i>查找</button>
                 </div>
             </form>
                 <table class="content-area-tableList table table-bordered table-hover table-condensed">
                 <thead>
                 <tr>
                     <th>ID</th>
                     <th>标题</th>
                     <th>发布时间</th>
                     <th>操作</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 <tr>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                     <th>待办事项1</th>
                 </tr>
                 </tbody>
             </table>
                 </div>
             <ul class="content-area-pagination pagination">
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
 </main>

        <%@ include file="footer.jsp"%>
        <script src="<%=basePath%>js/datetimepicker.min.js"></script>
                <script src="<%=basePath%>js/datetimepicker-init.js"></script>
                <script src="<%=basePath%>js/main.js"></script>

    </body>
</html>