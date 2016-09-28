<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <title>菜单-商会云</title>

    <%@ include file="meta.jsp"%>
    <%@ include file="link.jsp"%>
    <%@ include file="script.jsp"%>

    <link href="css/desktop.css" type="text/css" rel="stylesheet">
    <script src="js/calendar-init.js"></script>
    <script src="js/calendar-birthday.js"></script>
    <script src="js/desktop.js"></script>
</head>
<body>

    <%@ include file="header.jsp"%>

    <main class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6 left">
                <div id="board-box">
                    <div id="board">
                        <div class="col-xs-12 board-title">
                           <b></b><h2>日常</h2><b></b>
                        </div>
                        <ul id="darly" class="flip">
                        </ul>
                        <div class="col-xs-12 board-title">
                            <b></b><h2>管理</h2><b></b>
                        </div>
                        <ul id="manage" class="flip">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-6 right">
                <div id="calendar-box">
                    <div id="calendar">
                        <!--<div id="so_top">-->
                        <!--</div>-->
                        <ul id="m-result" class="result">
                            <li id="first" class="res-list">
                            <div id="mohe-rili" class="g-mohe"  data-mohe-type="rili">
                                <div class="mh-rili-wap mh-rili-only " data-mgd='{"b":"rili-body"}'>
                                    <div class="mh-tips">
                                        <div class="mh-loading">
                                            <i class="mh-ico-loading"></i>加载中...
                                        </div>
                                        <div class="mh-err-tips">出了点问题~ 您可<a href="#reload" class="mh-js-reload">重试</a></div>
                                    </div>
                                    <div class="mh-rili-widget">
                                        <div class="mh-doc-bd mh-calendar">
                                            <div class="mh-hint-bar gclearfix">
                                                <div class="mh-control-bar">
                                                    <div class="mh-control-module mh-year-control mh-year-bar">
                                                        <a href="#prev-year" action="prev" class="mh-prev" data-md='{"p":"prev-year"}'></a>
                                                        <div class="mh-control">
                                                            <i class="mh-trigger"></i>
                                                            <div class="mh-field mh-year" val=""></div>
                                                        </div>
                                                        <a href="#next-year" action="next" class="mh-next" data-md='{"p":"next-year"}'></a>
                                                        <ul class="mh-list year-list" style="display:none;" data-md='{"p":"select-year"}'></ul>
                                                    </div>
                                                    <div class="mh-control-module mh-month-control mh-mouth-bar">
                                                        <a href="#prev-month" action="prev" class="mh-prev" data-md='{"p":"prev-month"}'></a>
                                                        <div class="mh-control">
                                                            <i class="mh-trigger"></i>
                                                            <div class="mh-field mh-month" val=""></div>
                                                        </div>
                                                        <a href="#next-month" action="next" class="mh-next" data-md='{"p":"next-month"}'></a>
                                                        <ul class="mh-list month-list" style="display:none;" data-md='{"p":"select-month"}'></ul>
                                                    </div>
                                                    <div class="mh-control-module mh-holiday-control mh-holiday-bar">
                                                        <div class="mh-control">
                                                            <i class="mh-trigger"></i>
                                                            <div class="mh-field mh-holiday"></div>
                                                        </div>
                                                        <ul class="mh-list" style="display:none;" data-md='{"p":"select-holiday"}'></ul>
                                                    </div>
                                                    <div class="mh-btn-today" data-md='{"p":"btn-today"}'>今天日期</div>
                                                </div>
                                            </div>
                                            <div class="mh-cal-main">
                                                <div class="mh-col-1 mh-dates">
                                                    <ul class="mh-dates-hd gclearfix">
                                                        <li class="mh-days-title">一</li>
                                                        <li class="mh-days-title">二</li>
                                                        <li class="mh-days-title">三</li>
                                                        <li class="mh-days-title">四</li>
                                                        <li class="mh-days-title">五</li>
                                                        <li class="mh-days-title mh-weekend">六</li>
                                                        <li class="mh-days-title mh-last mh-weekend">日</li>
                                                    </ul>
                                                    <ol class="mh-dates-bd"></ol>
                                                </div>

                                                <div class="mh-col-2 mh-almanac">
                                                    <div class="mh-time-panel">
                                                        <dl class="gclearfix">
                                                            <!--时间-->
                                                            <dd class="mh-time-monitor"></dd>
                                                        </dl>
                                                    </div>
                                                    <div class="mh-almanac-base mh-almanac-main"></div>
                                                    <div class="mh-almanac-birthday">生日</div>
                                                    <div class="birthday-list"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <span id="mh-date-y" style="display:none;">2016</span>
                                        <script src="js/calendar-dateFestival.js">/*2016节假日清单，一年一改*/</script>
                                    </div>
                                </div>
                                <div class="mh-rili-foot" style="display:none;">
                                </div>
                            </div>
                            <script src="js/calendar-run.js"></script>
                        </li>
                        </ul>
                    </div>
                </div>
                <div id="backlog-box">
                    <a id="backlog-plus" href="#"><i class="fa fa-plus fa-2x"></i></a>
                    <div id="backlog">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th>待办事项1</th>
                                    <th><a href="#"><i class="fa fa-minus-circle"></i></a></th>
                                </tr>
                                <tr>
                                    <th>待办事项2</th>
                                    <th><a href="#"><i class="fa fa-minus-circle"></i></a></th>
                                </tr>
                                <tr>
                                    <th>待办事项3</th>
                                    <th><a href="#"><i class="fa fa-minus-circle"></i></a></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <%@ include file="footer.jsp"%>

    </body>
</html>