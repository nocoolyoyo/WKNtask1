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