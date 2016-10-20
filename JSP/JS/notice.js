(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        var NID;

        initNoticeIndex()

        $(document).on("click", "#add", function() {
            initNoticeAdd()
        });
        $(document).on("click", "#drafts", function() {
            initNoticeDrafts();
        });
        $(document).on("click", "#back",function () {
            initNoticeIndex();
        });
        $(document).on("click", ".noticeDetail", function() {
            initNoticeDetail($(this).attr('data-id'));
        });
        //上一条
        $(document).on("click", "#info-pre", function() {
            initInfoPreOrNext(NID,"FRONT");
        });
        //下一条
        $(document).on("click", "#info-next", function() {
            initInfoPreOrNext(NID,"BEHIND");
        });

        function initInfoPreOrNext(id,act){
            $('#notice-modal').on('shown.bs.modal', function () {
                $tableDetail.bootstrapTable('resetView');
            });
            console.log(id)
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $.ajax({
                url: basePath + '/admin/notice/findFirstOrNext.shtml',
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{NID:id,ACT:act},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){

                        $("#notice-mag").html(data.msg);
                        NID = data.map.NID;
                        var signUp = data.map.SIGN_UP;//是否报名
                        if(signUp == 0){//否
                            $("#notice-entered").hide();//已查看已报名
                            $("#notice-entered-main").hide();
                            $("#notice-unknown").hide();//已查看未报名
                            $("#notice-unknown-main").hide();
                            $("#notice-unenter").hide();//已查看不报名
                            $("#notice-unenter-main").hide();
                            $("#notice-isvive").show();//已查看
                            $("#notice-isvive-main").show();
                            $("#notice-isvive").html(data.viewpeople);

                            $("#notice-starttime").hide();
                            $("#notice-endtime").hide();
                            $("#notice-place").hide();
                            $("#notice-contactor").hide();
                            $("#notice-contactormobile").hide();
                            $("#notice-activitystatus").hide();
                        }else{
                            $("#notice-entered").show();//已查看已报名
                            $("#notice-entered-main").show();
                            $("#notice-unknown").show();//已查看未报名
                            $("#notice-unknown-main").show();
                            $("#notice-unenter").show();//已查看不报名
                            $("#notice-unenter-main").show();
                            $("#notice-entered").html(data.isSignUpIsView);
                            $("#notice-unknown").html(data.isView);
                            $("#notice-unenter").html(data.isViewnoSignUp);
                            $("#notice-isvive").hide();
                            $("#notice-isvive-main").hide();

                            $("#notice-starttime").show();
                            $("#notice-endtime").show();
                            $("#notice-place").show();
                            $("#notice-contactor").show();
                            $("#notice-contactormobile").show();
                            $("#notice-activitystatus").show();
                            $("#notice-starttime").html("活动开始时间："+data.map.STARTDATE);
                            $("#notice-endtime").html("活动结束时间："+data.map.ENDDATE);
                            $("#notice-place").html("活动地点："+data.map.PLACE);
                            $("#notice-contactor").html("联系人："+data.map.CONTACTOR);
                            $("#notice-contactormobile").html("联系人电话："+data.map.CONTACTORMOBILE);
                            $("#notice-activitystatus").html("活动状态："+data.map.ACTIVITYSTATUSRNAME);
                        }
                        $("#title").html(data.map.TITLE);
                        $("#notice-unnotice").html(data.noIsview);//未查看
                        var isPublic = data.map.ISPUBLIC;//是否公开
                        var allcount = 0;
                        if(isPublic == 1){//公开
                            $("#notice-persons").html(data.allMember);//通知人数
                            allcount = data.allMember;
                        }else{
                            $("#notice-persons").html(data.map.ALLCOUNTS);
                            allcount = data.map.ALLCOUNTS;
                        }
                        $("#notice-send").html("发送人："+data.map.AUTHOR);
                        $("#notice-time").html("发布时间："+data.map.PUBLISHDATE);
                        $("#contents").html(data.map.CONTENT);

                        if (data.map.VOTE == 1) {
                            var votehtml = '<div id="vote-all">'
                                +'<div><span>通知总人数：</span><a>'+allcount+'</a>人</div>'
                                +'<div><span>已投票总人数：</span>'+data.votecount+'人</div>'
                                +'<div><span>投票截止时间：</span>'+data.voteTime+'</div>';
                            for (var i=0; i<data.delvotelist.length; i++) {
                                if (data.delvotelist[i].TYPE == 1) {
                                    var votetype = '单选';
                                } else {
                                    var votetype = '多选';
                                }
                                votehtml += '<div class="vote-one">'
                                    +'<div>投票'+(i+1)+'</div>'
                                    +'<div>'
                                    +'<div>'
                                    +'<span>投票主题：</span>'+data.delvotelist[i].SUBJECT
                                    +'</div>'
                                    +'<div>'
                                    +'<span>投票类型：</span>'+votetype
                                    +'</div>'
                                    +'<div>';
                                for (var j=0; j<data.delvotelist[i].VOTELIST.length; j++) {
                                    votehtml += '<div>'
                                        +'<span>选项'+(j+1)+'：</span>'+data.delvotelist[i].VOTELIST[j].OPTIONNAME
                                        +'</div>'
                                        +'<div>'
                                        +'<span>已投票：</span><a>'+data.delvotelist[i].VOTELIST[j].VOTECOUNT+'</a>人'
                                        +'</div>';
                                }
                                votehtml += '</div>'
                                    +'</div>'
                                    +'</div>';
                            }
                            votehtml += '</div>';
                            $("#notice-modal").before(votehtml);
                        }
                    }
                }
            });

            //调出已报名
            $('#notice-entered').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=1;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出未报名
            $('#notice-unknown').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=0;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });

            //调出不报名
            $('#notice-unenter').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=2;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出已查看
            $('#notice-isvive').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP='';
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出未查看
            $('#notice-unnotice').click( function() {
                ACT = "NOTICEVIEW";
                ISVIEW=0;
                ISSIGNUP="";
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出通知人数
            $('#notice-persons').click( function() {
                ACT = "NOTICEVIEW";
                ISVIEW='';
                ISSIGNUP="";
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            var ACT;var ISVIEW;var ISSIGNUP;

            initTableDetail();
            //人数表格模板
            function initTableDetail(){
                $tableDetail = $('#notice-table');
                $send = $('#send');
                $tableDetail.bootstrapTable({
                    url: basePath+'/admin/notice/memberByMidsByPage.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 10,//单页记录数
                    height: 601,
                    pageList: [5,10, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.NID = NID;
                        params.ACT=ACT;
                        params.ISVIEW=ISVIEW;
                        params.ISSIGNUP=ISSIGNUP;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    columns: [{
                        field: 'REALNAME',
                        title: '姓名',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'MOBILE',
                        title: '手机号',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'COMPANY',
                        title: '所在单位',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'COMPANYWORK',
                        title: '单位职务',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'ONAME',
                        title: '商会职务',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'REASON',
                        title: '不报名理由',
                        align: 'center',
                        visible: false
                    }]
                });

                $tableDetail.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($tableDetail.bootstrapTable('getSelections').length) {
                        $send .show();
                    } else {
                        $send .hide();
                    }
                    selections = getIdSelections();
                    console.log(selections)
                });

                $send.click(function () {

                });

                function getIdSelections() {
                    return $.map($tableDetail.bootstrapTable('getSelections'), function (row) {
                        return row.NID
                    });
                }
            }
        }

        function initNoticeDetail(id){
            $('#notice-modal').on('shown.bs.modal', function () {
                $tableDetail.bootstrapTable('resetView');
            });
            console.log(id)
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $.ajax({
                url: basePath + '/admin/notice/queryNoticeFind.shtml',
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{NID:id},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){

                        NID = data.map.NID;
                        var signUp = data.map.SIGN_UP;//是否报名
                        if(signUp == 0){//否
                            $("#notice-entered").hide();//已查看已报名
                            $("#notice-entered-main").hide();
                            $("#notice-unknown").hide();//已查看未报名
                            $("#notice-unknown-main").hide();
                            $("#notice-unenter").hide();//已查看不报名
                            $("#notice-unenter-main").hide();
                            $("#notice-isvive").show();//已查看
                            $("#notice-isvive-main").show();
                            $("#notice-isvive").html(data.viewpeople);

                            $("#notice-starttime").hide();
                            $("#notice-endtime").hide();
                            $("#notice-place").hide();
                            $("#notice-contactor").hide();
                            $("#notice-contactormobile").hide();
                            $("#notice-activitystatus").hide();
                        }else{
                            $("#notice-entered").show();//已查看已报名
                            $("#notice-entered-main").show();
                            $("#notice-unknown").show();//已查看未报名
                            $("#notice-unknown-main").show();
                            $("#notice-unenter").show();//已查看不报名
                            $("#notice-unenter-main").show();
                            $("#notice-entered").html(data.isSignUpIsView);
                            $("#notice-unknown").html(data.isView);
                            $("#notice-unenter").html(data.isViewnoSignUp);
                            $("#notice-isvive").hide();
                            $("#notice-isvive-main").hide();

                            $("#notice-starttime").show();
                            $("#notice-endtime").show();
                            $("#notice-place").show();
                            $("#notice-contactor").show();
                            $("#notice-contactormobile").show();
                            $("#notice-activitystatus").show();
                            $("#notice-starttime").html("活动开始时间："+data.map.STARTDATE);
                            $("#notice-endtime").html("活动结束时间："+data.map.ENDDATE);
                            $("#notice-place").html("活动地点："+data.map.PLACE);
                            $("#notice-contactor").html("联系人："+data.map.CONTACTOR);
                            $("#notice-contactormobile").html("联系人电话："+data.map.CONTACTORMOBILE);
                            $("#notice-activitystatus").html("活动状态："+data.map.ACTIVITYSTATUSRNAME);
                        }
                        $("#title").html(data.map.TITLE);
                        $("#notice-unnotice").html(data.noIsview);//未查看
                        var isPublic = data.map.ISPUBLIC;//是否公开
                        var allcount = 0;
                        if(isPublic == 1){//公开
                            $("#notice-persons").html(data.allMember);//通知人数
                            allcount = data.allMember;
                        }else{
                            $("#notice-persons").html(data.map.ALLCOUNTS);
                            allcount = data.map.ALLCOUNTS;
                        }
                        $("#notice-send").html("发送人："+data.map.AUTHOR);
                        $("#notice-time").html("发布时间："+data.map.PUBLISHDATE);
                        $("#contents").html(data.map.CONTENT);

                        if (data.map.VOTE == 1) {
                            var votehtml = '<div id="vote-all">'
                                +'<div><span>通知总人数：</span><a>'+allcount+'</a>人</div>'
                                +'<div><span>已投票总人数：</span>'+data.votecount+'人</div>'
                                +'<div><span>投票截止时间：</span>'+data.voteTime+'</div>';
                            for (var i=0; i<data.delvotelist.length; i++) {
                                if (data.delvotelist[i].TYPE == 1) {
                                    var votetype = '单选';
                                } else {
                                    var votetype = '多选';
                                }
                                votehtml += '<div class="vote-one">'
                                    +'<div>投票'+(i+1)+'</div>'
                                    +'<div>'
                                    +'<div>'
                                    +'<span>投票主题：</span>'+data.delvotelist[i].SUBJECT
                                    +'</div>'
                                    +'<div>'
                                    +'<span>投票类型：</span>'+votetype
                                    +'</div>'
                                    +'<div>';
                                for (var j=0; j<data.delvotelist[i].VOTELIST.length; j++) {
                                    votehtml += '<div>'
                                        +'<span>选项'+(j+1)+'：</span>'+data.delvotelist[i].VOTELIST[j].OPTIONNAME
                                        +'</div>'
                                        +'<div>'
                                        +'<span>已投票：</span><a>'+data.delvotelist[i].VOTELIST[j].VOTECOUNT+'</a>人'
                                        +'</div>';
                                }
                                votehtml += '</div>'
                                    +'</div>'
                                    +'</div>';
                            }
                            votehtml += '</div>';
                            $("#notice-modal").before(votehtml);
                        }
                    }
                }
            });

            //调出已报名
            $('#notice-entered').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=1;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出未报名
            $('#notice-unknown').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=0;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });

            //调出不报名
            $('#notice-unenter').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP=2;
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出已查看
            $('#notice-isvive').click( function() {
                ACT = "NOTICEVIEW";ISVIEW=1;ISSIGNUP='';
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出未查看
            $('#notice-unnotice').click( function() {
                ACT = "NOTICEVIEW";
                ISVIEW=0;
                ISSIGNUP="";
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });
            //调出通知人数
            $('#notice-persons').click( function() {
                ACT = "NOTICEVIEW";
                ISVIEW='';
                ISSIGNUP="";
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $("#export").html('<a href="'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'">导出所有</a>');
            });

            var ACT;var ISVIEW;var ISSIGNUP;

            initTableDetail();
            //人数表格模板
            function initTableDetail(){
                $tableDetail = $('#notice-table');
                $send = $('#send');
                $tableDetail.bootstrapTable({
                    url: basePath+'/admin/notice/memberByMidsByPage.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 10,//单页记录数
                    height: 601,
                    pageList: [5,10, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.NID = NID;
                        params.ACT=ACT;
                        params.ISVIEW=ISVIEW;
                        params.ISSIGNUP=ISSIGNUP;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    columns: [{
                        field: 'REALNAME',
                        title: '姓名',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'MOBILE',
                        title: '手机号',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'COMPANY',
                        title: '所在单位',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'COMPANYWORK',
                        title: '单位职务',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'ONAME',
                        title: '商会职务',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'REASON',
                        title: '不报名理由',
                        align: 'center',
                        visible: false
                    }]
                });

                $tableDetail.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($tableDetail.bootstrapTable('getSelections').length) {
                        $send .show();
                    } else {
                        $send .hide();
                    }
                    selections = getIdSelections();
                    console.log(selections)
                });

                $send.click(function () {
                    console.log('1111')

                });

                function getIdSelections() {
                    return $.map($tableDetail.bootstrapTable('getSelections'), function (row) {
                        return row.NID
                    });
                }
            }
        }

        function initNoticeIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
            initTimepicker();
            function initTimepicker(){
                $('.form_date').datetimepicker({
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
            }

            function initTable1(startTime,endTime) {
                $table = $('#table');
                $badge = $('#badge');
                var $delete = $('#delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/notice/noticeFindPage.shtml',
                    method: "post",
                    datatype: 'json',
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    height: 601,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    pageList: [12, 25, 50, 100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.STARTTIME = startTime;
                        params.ENDTIME = endTime;
                        params.NOTICESTATUS = "1";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮
                    columns: [{
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'NID',
                        title: 'ID',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'TITLE',
                        title: '通知主题',
                        formatter: showDetail,
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'PUBLISHTIME',
                        title: '发布时间',
                        sortable: true,
                        align: 'center'
                    }]
                });


                function showDetail(value, row){
                    return '<a href="#" class="noticeDetail" data-id="' + row.NID + '">' + value + '</a>';
                }
                //草稿箱个数
                $.ajax({
                    url: basePath + '/admin/notice/noticeFindPage.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{"NOTICESTATUS":1},
                    traditional: true,
                    success:function(data){
                        if(data.status == "0"){
                            $badge.html(data.draftcounts);
                        }else{
                            alert("操作失败，请联系管理人员！");
                        }
                    },
                    error: function(msg){
                        alert("操作失败，请联系管理人员！");
                    }
                });
                //删除
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $delete.show();
                    } else {
                        $delete.hide();
                    }
                    //selections = getIdSelections();
                    console.log(selections)
                });
                $delete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;
                    if(confirm("确认删除")){
                        $.ajax({
                            url: basePath + '/admin/notice/deleteNotice.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"NIDS":id},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("删除成功!");
                                    $delete.hide();
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert("删除失败，请联系管理人员！");
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }

                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.NID
                    });
                }
                //查找
                $(document).on("click", "#search", function() {
                    var startTime = $("#STARTTIME").val();
                    var endTime = $("#ENDTIME").val();
                    $container = $("#main-box");
                    $.ajax({
                        url: basePath + "/data/notice-index.html",
                        async: false,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            $container.html(data);
                        }
                    });
                    initTable1(startTime,endTime);
                    $("#STARTTIME").val(startTime);
                    $("#ENDTIME").val(endTime);
                    initTimepicker();
                });
            }
        }

        function initNoticeAdd(){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#newNotice').summernote({
                lang: 'zh-CN',
                height: 250,
                minHeight: 250,
                maxHeight: 250,
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'color', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript','fontsize','height','fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['picture', ['picture']],
                    ['undo', ['undo']],
                    ['redo', ['redo']]
                ]

            });


            //定义当前页全局变量
            var voteValue = [];


            //发送操作
            $('#notice-save').click(function () {
                {
                    var content = $('#newNotice').summernote('code');
                }
            });
            //保存草稿
            $('#sure').click(function() {

                if($('#timer').hasClass('active')){

                }
            });

            //投票添加删除操作
            voteOprate();
            function voteOprate(){
                //增加投票
                $('#new-vote').click( function(){
                    var voteNum = $('.vote').length+1;
                    $('#vote-body').append(
                        '<div class="vote panel panel-default">'+
                        '<div class="panel-heading center">'+'投票'+voteNum+'<button type="button" class="vote-delete close" ><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>'+
                        '<div class="panel-body">'+
                        '<div class="form-group">'+
                        '<label for="voteName" class="col-sm-3  control-label">投票主题：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="form-control" name="voteName" placeholder="请输入名称">'+
                        '</div>'+
                        '</div>'+
                        '<div class="form-group">'+
                        '<label for="voteType" class="col-sm-3 control-label">投票类型：</label>'+
                        '<div class="col-sm-8" id="voteType">'+
                        '<label class="radio-inline">'+
                        '<input type="radio" name="radio'+ voteNum + '" value="1" checked="checked"> 单选'+
                        '</label>'+
                        '<label class="radio-inline">'+
                        '<input type="radio" name="radio'+ voteNum + '" value="2"> 多选'+
                        '</label>'+
                        '</div>'+
                        '</div>'+
                        '<ul class="voteSelectionsGroup">'+
                        '<li class="form-group">'+
                        '<label  class="col-sm-3  control-label">选项1：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="voteSelections form-control" name="voteSelections" placeholder="请输入名称">'+
                        '</div>'+
                        '</li>'+
                        '<li class="form-group">'+
                        '<label  class="col-sm-3  control-label">选项2：</label>'+
                        '<div class="col-sm-8">'+
                        '<input type="text" class="voteSelections form-control" name="voteSelections" placeholder="请输入名称">'+
                        '</div>'+
                        '</li>'+
                        '</ul>'+
                        '<button type="button" class="voteSelections-add col-sm-offset-5 btn button-green button-rounded">新增选项</button>'+
                        '</div>'+
                        '</div>'
                    );
                });
                //删除投票
                $(document).on('click', '.vote-delete', function () {
                    $(this).closest('.vote').remove();

                })
            }

            //投票选项添加删除操作
            voteSelectionOprate();
            function voteSelectionOprate(){
                //投票选项增加
                $(document).on('click','.voteSelections-add', function () {
                    var listNum = $(this).siblings('ul').children().length +1;
                    $(this).siblings('ul').append(
                        '<li class="form-group">' +
                        '<label  class="col-sm-3 control-label">选项'+ listNum +'：</label>' +
                        '<div class="col-sm-8">' +
                        '<input type="text" class="voteSelections form-control" name="voteSelections" placeholder="请输入名称">' +
                        '</div>' +
                        '<button type="button" class="li-delete col-sm-1 close" style="margin-top: 5px;"><span aria-hidden="true" style="margin-right: 4px;">&times;</span><span class="sr-only" style="margin-right: 4px;">Close</span></button>'+
                        '</li>');
                });
                $(document).on('click','.li-delete', function () {
                    $(this).closest('li').remove();
                })

            }

            //投票输入验证

            /*
             *  功能：投票输入验证，不为空启用确定
             */
            // $('#login-reset').click(function () {
            //     $submit.attr('disabled', 'disabled');
            // });
            //
            //
            //
            // initVoteValidator();
            //
            // function initVoteValidator(){
            //
            //     $('#vote-body').bootstrapValidator({
            //         message: '选项不能有空值',
            //         excluded: [':disabled'],
            //         fields: {
            //             voteName: {
            //                 validators: {
            //                     notEmpty: {
            //                         message: '投票名不能为空！'
            //                     }
            //                 }
            //             },
            //             voteSelections: {
            //                 validators: {
            //                     notEmpty: {
            //                         message: '选项值不能为空！'
            //                     }
            //                 }
            //             }
            //
            //         }
            //     });
            // }

            function initVoteSwitch(){
                voteValue = [];
                for(var j=0; j < $('.vote').length; j++) {
                    var $vateName = $('.vote:eq(' +j +')').find('input[name="voteName"]');
                    var $voteSelections = $('.vote:eq(' +j +')').find('input[name="voteSelections"]');
                    var $vateType = $('.vote:eq(' +j +')').find('input[name="radio'+(j+1)+'"]:checked');
                    var voteTemplate ={"vote":"","options":[],"type":""}
                    voteTemplate.vote = $vateName.val() ;
                    voteTemplate.type = $vateType.val() ;
                    for(var i=0; i < $voteSelections.length; i++){
                        voteTemplate.options.push($voteSelections[i].value)
                    }
                    voteValue.push(voteTemplate);
                }
            }
            //投票操作

            // $('#vote-modal').on('hidden.bs.modal', function () {
            //     initVoteSwitch();
            //     if(voteValue[0].vote == ""){
            //         $('#vote').text('投票')
            //     }else{
            //         $('#vote').text('投票已添加')
            //     }
            // });
            //确认投票
            $('#vote-sure').click( function(){
                initVoteSwitch();
                $('#vote').removeClass('btn-danger').addClass('btn-success').text('投票已选')
            });
            //取消投票
            $('#vote-cancel').click(function(){
                $('#vote').removeClass('btn-success').addClass('btn-danger').text('投票未选')
            });

            // $('#vote').click( function(){
            //});
            //报名操作
            $('#signed').click( function(){
                //报名
            });
            //通知通告发送操作
            $('#notice-send').click( function(){
                var voteValue = [];
                for(var j=0; j < $('.vote').length; j++) {
                    var $vateName = $('.vote:eq(' +j +')').find('input[name="voteName"]');
                    var $voteSelections = $('.vote:eq(' +j +')').find('input[name="voteSelections"]');
                    var $vateType = $('.vote:eq(' +j +')').find('input[name="radio'+(j+1)+'"]:checked');
                    var voteTemplate ={"vote":"","options":[],"type":""}
                    voteTemplate.vote = $vateName.val() ;
                    voteTemplate.type = $vateType.val() ;
                    for(var i=0; i < $voteSelections.length; i++){
                        voteTemplate.options.push($voteSelections[i].value)
                    }
                    voteValue.push(voteTemplate);
                }
                console.log(voteValue)
            });



            //时间选择初始化
            initClockpicker();
            function initClockpicker(){
                $('.form_date').datetimepicker({
                    pickerPosition: 'top-right',
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 0,
                    forceParse: 0
                });
            }


            //人员选择页
            membersAdd();
            function membersAdd() {
                //加载所有会员数据
                var selections = [],//临时选择数组
                    unSelected = [],//未选中人员数组
                    selected = [],//已选中人员数组
                    //personCount = 0,//已选中人员数量
                    $tableMembers = $('#table-members'),
                    $tableSelected = $('#members-selected');

                $.ajax({
                    url: basePath + "/admin/member/serchAllMember.shtml",
                    async: false,
                    dataType:"json",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        unSelected = data.rows;
                        $('.dropdown-menu').append()
                        // initTableMembers();
                        // $tableMembers.bootstrapTable('load', data)
                    }
                }).done(function (data) {
                    // unSelected = data;
                });
                initTableMembers();
                initMembersSelected();
                //人数统计
                // function refreshPersonCount(){
                //   personCount = selected.length;
                // $('#person-count').text(selected.length)
                //}
                //定时操作
                // $('#timer').click(function () {
                //     if($(this).hasClass('active')){
                //         $(this).removeClass('active');
                //         $('.date').fadeOut()
                //     }else {
                //         $(this).addClass('active');
                //         $('.date').fadeIn()
                //         initDate()
                //     }
                // });

                //确认操作


                /*
                 *  功能：获取当前时间并对选择器赋值
                 *  Created by nocoolyoyo 2016/10/10.
                 */
                // initClockpicker()
                // function initDate(){
                //     var mydate = new Date();
                //     var todayDate = "" + mydate.getFullYear() + "-";
                //     todayDate += (mydate.getMonth()+1) + "-";
                //     todayDate += mydate.getDate()+ " ";
                //     todayDate += mydate.getHours()+ ":";
                //     todayDate += mydate.getMinutes();
                //     $('#timer-time').val(todayDate);
                // }

                //清空操作
                $(document).on("click", ".clear", function() {
                    unSelected = selected.concat(unSelected);
                    $tableMembers.bootstrapTable('load', unSelected);
                    $tableMembers.bootstrapTable( 'uncheckAll');
                    selected = [];
                    labelCreate();
                    $tableSelected.bootstrapTable('load', selected);
                    //refreshPersonCount()
                });

                /*模态框表格窗口修正*/
                $('#select-modal').on('shown.bs.modal', function () {
                    $tableMembers.bootstrapTable('resetView');
                    $tableSelected.bootstrapTable('resetView');
                });

                function labelCreate(){
                    function RndClassName(){
                        var rnd = parseInt(6*Math.random());
                        switch (rnd) {
                            case 0:
                                return 'label-default';
                            case 1:
                                return 'label-primary';
                            case 2:
                                return 'label-success';
                            case 3:
                                return 'label-warning';
                            case 4:
                                return 'label-danger';
                            case 5:
                                return 'label-info';
                        }
                    }
                    var html='';
                    for (var j = 0; j < selected.length; j++) {
                        html += '<span class="label both-2 '+RndClassName()+'">'
                            + selected[j].REALNAME + '<a class="selectedRemove label-icon fa fa-times" data-id="'
                            + selected[j].USID +'"></a></span>';
                    }
                    $('.select-person').html(html);
                    //refreshPersonCount();
                }
                //移除已选数据对象组里的数据，同时返回原表格数据
                $(document).on("click", ".selectedRemove", function() {
                    var removeSelect = [];
                    var tempID=  parseInt($(this).attr('data-id'));
                    removeSelect.push(tempID)
                    for(var i=0; i < selected.length; i++){
                        if( removeSelect.join() == selected[i].USID) {

                            $tableMembers.bootstrapTable('insertRow', {
                                index: 0,
                                row: selected[i]
                            });
                            selected.splice(selected.indexOf(selected[i]),1) ;
                            $tableSelected.bootstrapTable('load', selected);
                            //refreshPersonCount();
                            if($(this).hasClass('label-icon')){
                                $(this).closest('span').remove();
                            }else{
                                labelCreate(); // console.log($('.select-person').find('a').attr('data-id',tempID))
                                // $('.label-icon').attr('data-id',$(this).attr('data-id')).closest('span')
                                // $('.select-person').find('a').attr('data-id',$(this).attr('data-id')).closest('span').remove();
                            }
                            $tableMembers.bootstrapTable( 'uncheckAll');
                        }
                    }
                });
                function initTableMembers(){
                    var $add = $('#members-add');
                    $tableMembers.bootstrapTable({
                        data: unSelected,
                        pageSize: 9,
                        pageList: [12, 25, 50, 100],
                        sidePagination: 'client',
                        pagination: true,
                        toolbar: "#table-toolbar",
                        search: true,
                        showColumns: true,
                        height: 490,
                        columns: [{
                            field: 'state',
                            checkbox: true

                        },{
                            field: 'REALNAME',
                            title: '姓名',
                            sortable: true,
                            align: 'center'
                        }, {
                            field: 'MOBILE',
                            title: '手机号',
                            sortable: true,
                            align: 'center'
                        }, {
                            field: 'COMPANY',
                            title: '所在单位',
                            sortable: true,
                            align: 'center'
                        }]
                    });
                    /*
                     *  功能：获取选择框信息
                     *  Created by nocoolyoyo 2016/9/28.
                     */
                    $tableMembers.on('check.bs.table uncheck.bs.table ' +
                        'check-all.bs.table uncheck-all.bs.table', function () {
                        if ($tableMembers.bootstrapTable('getSelections').length) {
                            $add.show();
                        } else {
                            $add.hide();
                        }
                        selections  = getIdSelections();
                    });
                    /*人员选择*/
                    //往已选数据对象组里填充添加的数据，同时移除表格数据
                    $add.click(function () {
                        selected = selected.concat(getRowSelections());
                        $tableSelected.bootstrapTable('load', selected);
                        $tableMembers.bootstrapTable('remove', {
                            field: 'USID',
                            values: selections
                        });
                        $add.hide();
                        labelCreate();
                    });

                    function getRowSelections() {
                        return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                            return row
                        });
                    }
                    function getIdSelections() {
                        return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                            return row.USID
                        });
                    }
                }

                function initMembersSelected(){
                    $tableSelected.bootstrapTable({
                        data: selected,
                        height: 475,
                        search: true,
                        showHeader:false,
                        toolbar: "#left-toolbar",
                        columns: [{
                            field: 'SELECTED',
                            title: '已选人员',
                            sortable: true,
                            formatter: selectedFormatter,
                            align: 'center'
                        }]
                    });
                    function selectedFormatter(value, row) {
                        return [
                            '<div class="pull-left">',
                            '<span>' + row.REALNAME +'   '+ '</span>',
                            '</div>',
                            '<div class="pull-left">',
                            '<span>' + row.MOBILE + '</span>',
                            '</div>',
                            '<div class="pull-right">',
                            '<a class="selectedRemove close" href="javascript:void(0)"  data-id="' + row.USID +'" title="移除">',
                            '<i class="glyphicon glyphicon-remove"></i>',
                            '</a> ',
                            '</div>'
                        ].join('');
                    }
                }
            }
        }
        function initNoticeDrafts(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/notice-drafts.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
            function initTable2() {
                $table = $('#table');
                $badge = $('#badge');
                var $delete = $('#delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/notice/noticeFindPage.shtml',
                    method: "post",
                    datatype: 'json',
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    height: 600,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    pageList: [12, 25, 50, 100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.NOTICESTATUS = "0";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮
                    columns: [{
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'NID',
                        title: 'ID',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'TITLE',
                        title: '通知主题',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'PUBLISHTIME',
                        title: '发布时间',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'edit',
                        title: '操作',
                        sortable: true,
                        align: 'center'
                    }]
                });
                //草稿箱个数
                $.ajax({
                    url: basePath + '/admin/notice/noticeFindPage.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{"NOTICESTATUS":0},
                    traditional: true,
                    success:function(data){
                        if(data.status == "0"){
                            $badge.html(data.draftcounts);
                        }else{
                            alert("操作失败，请联系管理人员！");
                        }
                    },
                    error: function(msg){
                        alert("操作失败，请联系管理人员！");
                    }
                });
                //删除
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $delete.show();
                    } else {
                        $delete.hide();
                    }
                    //selections = getIdSelections();
                    console.log(selections)
                });
                $delete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;
                    if(confirm("确认删除")){
                        $.ajax({
                            url: basePath + '/admin/notice/deleteNotice.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"NIDS":id},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("删除成功!");
                                    $delete.hide();
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert("删除失败，请联系管理人员！");
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
                    /*$table.bootstrapTable('remove', {
                     field: 'NID',
                     values: ids
                     });*/
                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.NID
                    });
                }
            }
        }
    });
}());


