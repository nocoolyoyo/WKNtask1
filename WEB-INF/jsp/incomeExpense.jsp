<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <title>收支-商会云</title>

    <%@ include file="meta.jsp"%>


    <link href="<%=basePath%>css/main.css" type="text/css" rel="stylesheet">



</head>
<body>

<%@ include file="header.jsp"%>
<div id="page-container">
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
        <div id="main-box">
            <div id="content-area">
                <div class="content-area-box">
                    <div id="table-toolbar" class="form-inline">
                        <button id="delete" type="button" class="btn btn-danger" style="display: none">删除</button>
                        <button id="add" type="button" class="btn btn-success" data-toggle="modal" data-target="#incomeExpense-modal">新增</button>

                        <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                            <input id="startTime" class="form-control" size="10" type="text" value="" placeholder="日期" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                        <div class="input-group date form_date " data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                            <input id="endTime" class="form-control" size="10" type="text" value="" placeholder="日期" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>

                        <input id="title" type="text" class="form-control" name="title" placeholder="标题">
                        <input id="author" type="text" class="form-control" name="author" placeholder="发布人">
                        <button id="search" type="submit" class="btn btn-primary">查询</button>
                        <button id="export" type="button" class="btn btn-primary">导出</button>
                        <button id="reset" type="submit" class="btn btn-default">重置</button>
                    </div>
                    <table id="table"></table>
                </div>
            </div>
        </div>
        <div id="incomeExpense-modal" class="modal fade center" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form class="form-horizontal" role="form">
                        <div class="modal-header">
                            <h4 class="modal-title"></h4>
                        </div>
                        <div class="modal-body">

                            <div class="modal-body">

                                <div class="form-group">
                                    <label for="incomeName" class="col-sm-2  control-label">名称：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="incomeName" name="incomeName" placeholder="请输入名称">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="incomeMoney" class="col-sm-2 control-label">金额：</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="incomeMoney" name="incomeMoney"  placeholder="请输入金额">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">描述：</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="incomeTime" class="col-sm-2 control-label">时间：</label>
                                    <div class="col-sm-9">
                                        <div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd " data-link-format="yyyy-mm-dd">
                                            <input id="incomeTime" class="form-control" size="2" type="text" value="" placeholder="日期" readonly>
                                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="incomeSelect" class="col-sm-2 control-label">类型：</label>
                                    <div class="col-sm-9">
                                        <select class="form-control" id="incomeSelect">
                                            <option value="1">收入</option>
                                            <option value="2">支出</option>
                                        </select>
                                    </div>
                                </div>

                            </div>



                        </div>

                        <div class="modal-footer" >
                            <button id="submit" type="submit" class="btn button button-primary button-rounded" data-dismiss="modal" disabled="disabled">保存</button>
                            <button type="button" class="btn button button-rounded" data-dismiss="modal">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</main>

<%@ include file="footer.jsp"%>
</div>
<script src="<%=basePath%>js/public/bootstrap-table.min.js"></script>
<script src="<%=basePath%>js/public/bootstrap-table-zh-CN.js"></script>
<script src="<%=basePath%>js/public/bootstrap-table-editable.min.js"></script>
<script src="<%=basePath%>js/public/bootstrap-editable.min.js"></script>
<script src="<%=basePath%>js/public/datetimepicker.min.js"></script>
<script src="<%=basePath%>js/public/bootstrapValidator.min.js"></script>

<script src="<%=basePath%>js/main.js"></script>
<script src="<%=basePath%>js/incomeExpense.js"></script>

</body>
</html>