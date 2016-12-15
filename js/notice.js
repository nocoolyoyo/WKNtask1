(function(){
    $(function() {
        var $table,
            selections = [],
            $container, //默认进入页面下表，即occupation默认进入页面
            onameList = [];
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var unSelected = [];//未选中人员数组
        var selected = [];//已选中人员数组
        var $tableMembers;
        var $tableSelected;
        var NID;
        var ACT;
        var ISVIEW;
        var ISSIGNUP;
        var ISVOTE;
        var VOTEID;
        initNoticeIndex();

        $(document).on("click", "#add", function() {
            initNoticeAdd();
        });
        $(document).on("click", "#drafts", function() {
            initNoticeDrafts();
        });

        /*
         * 功能：多文本编辑器初始化
         *
         */
        function initfroalaEditor(){
            var slturl;
            $('#newNotice').froalaEditor({
                height: 290,
                theme: 'gray',
                language: 'zh_cn',
                allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
                imageUploadURL: basePath+'/admin/upload.shtml',
                imageUploadParams: {savePath:"notice"},
                imageMaxSize: 1024*1024*5,
                imageDefaultWidth : 0,
                fileUploadURL: basePath+'/admin/upload.shtml',
                fileUploadParams: {
                    folderid: '1'
                }
            }).on('froalaEditor.image.uploaded', function (e, editor, response) {
                var obj = JSON.parse(response);
                slturl = obj.slturl;
                $('#newNotice').on('froalaEditor.image.loaded', function (e, editor, $img) {
                    $img.attr('src',slturl);
                    $('#newNotice').off('froalaEditor.image.loaded');
                });
            }).on('froalaEditor.image.beforeUpload', function (e, editor, images) {
                console.log(editor.value);// Do something here.
                console.log(images[0].name);// Do something here..
                var imgele = new Image();
                var thesrc = window.URL.createObjectURL(images[0]);
                imgele.src = thesrc;
                imgele.onload = function() {
                    var canvas = document.createElement("canvas");
                    var cxt = canvas.getContext("2d");
                    cxt.drawImage(this, 0, 0, 200, 200);
                    console.log(canvas);
                }
            }).on('froalaEditor.image.error', function (e, editor, error) {
                if(error.code == 5){
                    $('.fr-message').text('图片太大，请控制在5M以内');
                }else if(error.code == 1){
                    $('.fr-message').text('网络异常');
                }// Do something here.
            });
        }


        /*
         * 功能：人员职务列表输出
         *
         */
        function outputOnameList(){
            onameList = [];
            $.ajax({
                url: basePath+'/admin/member/occupationFindByPage.shtml',
                dataType:'json',
                async :false,
                success:function(data)
                {

                    for (var i=0; i<data.rows.length; i++){
                        var onameListTemplate  = {"value":"","text":""};
                        onameListTemplate.value = data.rows[i].OID;
                        onameListTemplate.text = data.rows[i].ONAME;
                        onameList.push(onameListTemplate);
                    }
                    // return onameList;
                }
            });

            return onameList;
        }
        //上一条
        function initInfoPreOrNext(id,act){
            $('#info-pre').unbind('click').click(function(){
                initInfoPreOrNext(NID,"FRONT");
            });
            //下一条
            $('#info-next').unbind('click').click(function(){
                initInfoPreOrNext(NID,"BEHIND");
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
                        if(signUp == 1){
                            var signedhtml = '<div class="panel panel-info top-9">'+
                                '<div class="panel-heading center">报名</div>'+
                                '<div class="panel-body">'+
                                '<table class="table table-bordered">'+
                                '<div class="bs-divider font-14">'+
                                '<span>已报名：<a href="#" id="notice-entered" data-toggle="modal" data-target="#notice-modal">'+data.isSignUpIsView+'人</a></span>'+'  '+
                                '<span>未报名：<a href="#" id="notice-unknown" data-toggle="modal" data-target="#notice-modal">'+data.isView+'人</a></span>'+'  '+
                                '<span>不报名：<a href="#" id="notice-unenter" data-toggle="modal" data-target="#notice-modal">'+data.isViewnoSignUp+'人</a></span>'+'  '+
                                '</div>'+
                                '<thead><tr><th class="center">开始时间</th><th class="center">结束时间</th><th class="center">活动地点</th><th class="center">联系人</th><th class="center">联系人电话</th><th class="center">活动状态</th></tr></thead>'+
                                '<tbody class="center">'+
                                '<tr>'+
                                '<td>'+data.map.STARTDATE+'</td>'+
                                '<td>'+data.map.ENDDATE+'</td>'+
                                '<td>'+data.map.PLACE+'</td>'+
                                '<td>'+data.map.CONTACTOR+'</td>'+
                                '<td>'+data.map.CONTACTORMOBILE+'</td>'+
                                '<td>'+data.map.ACTIVITYSTATUSRNAME+'</td>'+
                                '</tr>'+
                                '</tbody>'+
                                '</table>'+
                                '</div>'+
                                '</div>';
                            $("#signed-container").html(signedhtml);
                        }
                        $("#title").html(data.map.TITLE);
                        $("#notice-unnotice").html(data.noIsview+'人');//未查看
                        $("#notice-isvive").html(data.viewpeople+'人');//已查看
                        var isPublic = data.map.ISPUBLIC;//是否公开
                        var allcount = 0;
                        if(isPublic == 1){//公开
                            $("#notice-persons").html(data.allMember+'人');//通知人数
                            allcount = data.allMember;
                        }else{
                            $("#notice-persons").html(data.map.ALLCOUNTS+'人');
                            allcount = data.map.ALLCOUNTS;
                        }
                        $("#notice-send").html("发送人："+data.map.AUTHOR);
                        $("#notice-time").html("发布时间："+data.map.PUBLISHDATE);
                        $("#contents").html(data.map.CONTENT);

                        if (data.map.VOTE == 1) {
                            var votehtml = '<div id="vote-all" class="panel panel-primary top-9">'
                                +'<div class="panel-heading center">投票</div>';
                            //+'<div><span>通知总人数：</span><a>'+allcount+'</a>人</div>'
                            // +'<div><span>已投票总人数：</span>'+data.votecount+'人</div>'
                            // +'<div><span>投票截止时间：</span>'+data.voteTime+'</div>';
                            for (var i=0; i<data.delvotelist.length; i++) {
                                if (data.delvotelist[i].TYPE == 1) {
                                    var votetype = '单选';
                                } else {
                                    var votetype = '多选';
                                }

                                votehtml += '<div class="panel-body">'
                                    +'<table class="table table-bordered">'
                                    +'<div class="bs-divider font-14"><span>'+data.delvotelist[i].SUBJECT+'</span><span class="label label-danger label-tag">'+votetype+'</span>'+'<span class="label label-info label-tag">截止时间：'+data.voteTime+'</span>'+'</span></div>'

                                    +'<thead><tr><th class="center">选项</th><th class="center">内容</th><th class="center">已投票</th></tr></thead>'
                                    +'<tbody class="center">';
                                for (var j=0; j<data.delvotelist[i].VOTELIST.length; j++) {
                                    console.log(data.delvotelist[i].VOTELIST);
                                    votehtml += '<tr>'
                                        +'<td>选项'+(j+1)+'</td>'
                                        +'<td>'+data.delvotelist[i].VOTELIST[j].OPTIONNAME+'</td>'
                                        +'<td><a href="#" class="vote-enter" data-voteID="'+data.delvotelist[i].VOTELIST[j].OPTIONID+ '" data-toggle="modal" data-target="#notice-modal">'+data.delvotelist[i].VOTELIST[j].VOTECOUNT+'人</a></td>'
                                        +'</tr>';
                                }
                                votehtml += '</tbody>'
                                    +'</table>'
                                    +'</div>';
                            }
                            votehtml += '</div>';
                            $("#vote-container").html(votehtml);
                            //$("#notice-modal").before(votehtml);
                        }
                    }
                }
            });
            //调出已报名
            $('#notice-entered').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=1;
                ISVOTE='';
                VOTEID='';

                $('.modal-title').html('已报名人员');
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"issignupisviewnotifiction","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});

                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出未报名
            $('#notice-unknown').unbind('click').bind('click',function(){
                console.log('上下页未报名');
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=0;
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('未报名人员');
                //发送短信事件
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"nosignupisviewnotifiction","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出不报名
            $('#notice-unenter').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=2;
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('不报名人员');
                console.log('上下页不报名');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出已查看
            $('#notice-isvive').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP='';
                console.log('上下页已查看');
                $('.modal-title').html('已查看人员');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出未查看
            $('#notice-unnotice').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=0;
                ISSIGNUP="";
                ISVOTE='';
                VOTEID='';
                console.log('上下页未查看');
                $('.modal-title').html('未查看人员');
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"notification","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出通知人数
            $('#notice-persons').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW='';
                ISSIGNUP="";
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('已通知人员');
                console.log('上下页通知人数');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出投票名单
            $('.vote-enter').unbind('click').bind('click',function () {
                console.log('上下页投票名单');
                ACT = "VOTE";
                ISVIEW='';
                ISSIGNUP="";
                ISVOTE=1;
                VOTEID= $(this).attr('data-voteID');
                $('.modal-title').html('参与投票人员');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'&ISVOTE='+ISVOTE+'&VOTEID='+VOTEID);

            });

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
                    height: 450,
                    pageList: [10, 50, 75, 100],//分页步进值
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

                        align: 'center'
                    },{
                        field: 'MOBILE',
                        title: '手机号',

                        align: 'center'
                    },{
                        field: 'COMPANY',
                        title: '所在单位',

                        align: 'center'
                    },{
                        field: 'COMPANYWORK',
                        title: '单位职务',

                        align: 'center'
                    },{
                        field: 'ONAME',
                        title: '商会职务',

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
                });

                function getIdSelections() {
                    return $.map($tableDetail.bootstrapTable('getSelections'), function (row) {
                        return row.USID
                    });
                }
            }
        }
        function initNoticeDetail(id){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#info-pre').unbind('click').click(function(){
                initInfoPreOrNext(NID,"FRONT");
            });
            //下一条
            $('#info-next').unbind('click').click(function(){
                initInfoPreOrNext(NID,"BEHIND");
            });
            //返回
            $('#back').click(function() {
                initNoticeIndex();
            });
            $('#notice-modal').on('hidden.bs.modal', function () {
                $('#send').hide();
                //$tableDetail.bootstrapTable('resetView');
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
                        if(signUp == 1){
                            var signedhtml = '<div class="panel panel-info top-9">'+
                                '<div class="panel-heading center">报名</div>'+
                                '<div class="panel-body">'+
                                '<table class="table table-bordered">'+
                                '<div class="bs-divider font-14">'+
                                '<span>已报名：<a href="#" id="notice-entered" data-toggle="modal" data-target="#notice-modal">'+data.isSignUpIsView+'人</a></span>'+'  '+
                                '<span>未报名：<a href="#" id="notice-unknown" data-toggle="modal" data-target="#notice-modal">'+data.isView+'人</a></span>'+'  '+
                                '<span>不报名：<a href="#" id="notice-unenter" data-toggle="modal" data-target="#notice-modal">'+data.isViewnoSignUp+'人</a></span>'+'  '+
                                '</div>'+
                                '<thead><tr><th class="center">开始时间</th><th class="center">结束时间</th><th class="center">活动地点</th><th class="center">联系人</th><th class="center">联系人电话</th><th class="center">活动状态</th></tr></thead>'+
                                '<tbody class="center">'+
                                '<tr>'+
                                '<td>'+data.map.STARTDATE+'</td>'+
                                '<td>'+data.map.ENDDATE+'</td>'+
                                '<td>'+data.map.PLACE+'</td>'+
                                '<td>'+data.map.CONTACTOR+'</td>'+
                                '<td>'+data.map.CONTACTORMOBILE+'</td>'+
                                '<td>'+data.map.ACTIVITYSTATUSRNAME+'</td>'+
                                '</tr>'+
                                '</tbody>'+
                                '</table>'+
                                '</div>'+
                                '</div>';
                            $("#signed-container").html(signedhtml);
                        }
                        $("#title").html(data.map.TITLE);
                        $("#notice-unnotice").html(data.noIsview + '人');//未查看
                        $("#notice-isvive").html(data.viewpeople+'人');//已查看
                        var isPublic = data.map.ISPUBLIC;//是否公开
                        var allcount = 0;
                        if(isPublic == 1){//公开
                            $("#notice-persons").html(data.allMember + '人');//通知人数
                            allcount = data.allMember;
                        }else{
                            $("#notice-persons").html(data.map.ALLCOUNTS +'人');
                            allcount = data.map.ALLCOUNTS;
                        }
                        $("#notice-send").html("发送人："+data.map.AUTHOR);
                        $("#notice-time").html("发布时间："+data.map.PUBLISHDATE);
                        $("#contents").html(data.map.CONTENT);

                        if (data.map.VOTE == 1) {
                            var votehtml = '<div id="vote-all" class="panel panel-primary top-9">'
                                +'<div class="panel-heading center">投票</div>'
                            //+'<div><span>通知总人数：</span><a>'+allcount+'</a>人</div>'
                            // +'<div><span>已投票总人数：</span>'+data.votecount+'人</div>'
                            // +'<div><span>投票截止时间：</span>'+data.voteTime+'</div>';
                            for (var i=0; i<data.delvotelist.length; i++) {
                                if (data.delvotelist[i].TYPE == 1) {
                                    var votetype = '单选';
                                } else {
                                    var votetype = '多选';
                                }
                                votehtml += '<div class="panel-body">'
                                    +'<table class="table table-bordered">'
                                    +'<div class="bs-divider font-14"><span>'+data.delvotelist[i].SUBJECT+'</span><span class="label label-danger label-tag">'+votetype+'</span>'+'<span class="label label-info label-tag">截止时间：'+data.voteTime+'</span>'+'</span></div>'

                                    +'<thead><tr><th class="center">选项</th><th class="center">内容</th><th class="center">已投票</th></tr></thead>'
                                    +'<tbody class="center">';
                                for (var j=0; j<data.delvotelist[i].VOTELIST.length; j++) {
                                    console.log(data.delvotelist[i].VOTELIST);
                                    votehtml += '<tr>'
                                        +'<td>选项'+(j+1)+'</td>'
                                        +'<td>'+data.delvotelist[i].VOTELIST[j].OPTIONNAME+'</td>'
                                        +'<td><a href="#" class="vote-enter" data-voteID="'+data.delvotelist[i].VOTELIST[j].OPTIONID+ '" data-toggle="modal" data-target="#notice-modal">'+data.delvotelist[i].VOTELIST[j].VOTECOUNT+'人</a></td>'
                                        +'</tr>';
                                }
                                votehtml += '</tbody>'
                                    +'</table>'
                                    +'</div>';
                            }
                            votehtml += '</div>';
                            $("#vote-container").html(votehtml);
                            //$("#notice-modal").before(votehtml);
                        }
                    }
                }
            });

            //调出已报名
            $('#notice-entered').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=1;
                ISVOTE='';
                VOTEID='';
                console.log('已报名');
                $('.modal-title').html('已报名人员');
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"issignupisviewnotifiction","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',"'+basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'")
            });
            //调出未报名
            $('#notice-unknown').unbind('click').bind('click',function(){
                console.log('未报名');
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=0;
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('未报名人员');
                //发送短信事件
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"nosignupisviewnotifiction","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出不报名
            $('#notice-unenter').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP=2;
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('不报名人员');
                console.log('不报名');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出已查看
            $('#notice-isvive').unbind('click').click( function() {
                ACT = "NOTICEVIEW";
                ISVIEW=1;
                ISSIGNUP='';
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('已查看人员');
                console.log('已查看');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出未查看
            $('#notice-unnotice').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW=0;
                ISSIGNUP="";
                ISVOTE='';
                VOTEID='';
                $('.modal-title').html('未查看人员');
                console.log('未查看');
                $('#send').unbind('click').bind('click',function(){
                    var usids = ""+selections;
                    if(usids == ""){
                        toastr.error("发送人为空，请选择！");
                        return false;
                    }
                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                //AJAX发送事件
                                $.ajax({
                                    url: basePath + '/admin/menu/sendNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"TYPE":"notification","USID":usids},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功");
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败,请联系系统管理员!");

                                    }
                                });
                            }
                        }
                    });
                });

                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('showColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出通知人数
            $('#notice-persons').unbind('click').bind('click',function(){
                ACT = "NOTICEVIEW";
                ISVIEW='';
                ISSIGNUP="";
                ISVOTE='';
                VOTEID='';
                console.log('通知人数');
                $('.modal-title').html('已通知人员');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP);
            });
            //调出投票名单
            $('.vote-enter').unbind('click').bind('click',function () {
                console.log('投票名单');
                ACT = "VOTE";
                ISVIEW='';
                ISSIGNUP="";
                ISVOTE=1;
                VOTEID= $(this).attr('data-voteID');
                $('.modal-title').html('已投票人员');
                $('#notice-table').bootstrapTable('refresh',{url: basePath + "/admin/notice/memberByMidsByPage.shtml"});
                $('#notice-table').on('load-success.bs.table',function(){
                    $(this).bootstrapTable('hideColumn', 'state');
                });
                $("#export").attr('href',basePath + '/admin/notice/exportVsvExcel.shtml?NID='+NID+'&ACT='+ACT+'&ISVIEW='+ISVIEW+'&ISSIGNUP='+ISSIGNUP+'&ISVOTE='+ISVOTE+'&VOTEID='+VOTEID);

            });

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
                    toolbar: '#table-toolbar',
                    showColumns: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height: 450,
                    pageList: [12,25,50,100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.NID = NID;
                        params.ACT=ACT;
                        params.ISVIEW=ISVIEW;
                        params.ISSIGNUP=ISSIGNUP;
                        params.ISVOTE=ISVOTE;
                        params.VOTEID=VOTEID;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'REALNAME',
                        title: '姓名',

                        align: 'center'
                    },{
                        field: 'MOBILE',
                        title: '手机号',

                        align: 'center'
                    },{
                        field: 'COMPANY',
                        title: '所在单位',

                        align: 'center'
                    },{
                        field: 'COMPANYWORK',
                        title: '单位职务',

                        align: 'center'
                    },{
                        field: 'ONAME',
                        title: '商会职务',

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
                    if ($tableDetail.bootstrapTable('getSelections').length){
                        $send .show();
                    } else {
                        $send .hide();
                    }
                    selections = getIdSelections();
                });
                function getIdSelections() {
                    return $.map($tableDetail.bootstrapTable('getSelections'), function (row) {
                        return row.USID
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
            resetSearch();
            function resetSearch(){
                $('#reset').click(function(){
                    $('input').val("");
                    $table.bootstrapTable('refresh');
                })
            }
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

                        align: 'center'
                    }, {
                        field: 'TITLE',
                        title: '通知主题',
                        formatter: showDetail,
                        events: "noticeEvents",

                        align: 'center'
                    }, {
                        field: 'PUBLISHTIME',
                        title: '发布时间',

                        align: 'center'
                    }]
                });

                window.noticeEvents = {
                    'click .noticeDetail': function (e, value, row, index) {
                        initNoticeDetail(row.NID);
                    }
                };

                function showDetail(value, row){
                    return '<a href="#" class="noticeDetail">' + value + '</a>';
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
                            toastr.error("操作失败,请联系系统管理员!");

                        }
                    },
                    error: function(msg){
                        toastr.error("操作失败,请联系系统管理员!");

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

                });
                $table.on('page-change.bs.table', function(){
                    $delete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $delete.hide();
                })
                $delete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认删除?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/deleteNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"NIDS":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功！");

                                            $delete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("删除失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    });


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
                    resetSearch();
                });
            }



        }
        function initNoticeAdd(){
            selected = [];
            selections = [];
            unSelected = [];
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });


            initfroalaEditor();


            //返回
            $('#back').click(function() {
                initNoticeIndex();
            });

            membersAdd();
            //投票添加删除操作
            voteOprate();
            //投票选项添加删除操作
            voteSelectionOprate();
            //表单验证
            voteValidator();
            signedValidator();


            //投票操作

            //确认投票
            $('#vote-sure').click( function(){
                //initVoteSwitch();
                var valitation = true;

                $('#vote-form').find("input").each(function(){
                    var value = $(this).val(); //这里的value就是每一个input的value值~
                    if($(this).val() == ""){
                        valitation  = false;
                    }
                });
                if(valitation == false) {
                    toastr.warning("请填写完整投票信息！");
                }else{
                    $('#vote').removeClass('btn-danger').addClass('btn-success').text('投票已选');
                    $('#vote-modal').modal('hide');
                }

            });
            //取消投票
            $('#vote-cancel').click(function(){
                $('#vote').removeClass('btn-success').addClass('btn-danger').text('投票未选')
            });


            //确认报名
            $('#signed-sure').click( function(){
                var valitation = true;

                $('#signed-form').find("input").each(function(){
                    var value = $(this).val(); //这里的value就是每一个input的value值~
                    if($(this).val() == ""){
                        valitation  = false;
                    }
                });
                if(valitation == false) {
                    toastr.warning("请填写完整报名信息！");
                }else{
                    $('#signed').removeClass('btn-danger').addClass('btn-success').text('报名已选');
                    $('#signed-modal').modal('hide');
                }
            });
            //取消报名
            $('#signed-cancel').click(function(){
                $('#signed').removeClass('btn-success').addClass('btn-danger').text('报名未选');
            });
            //通知通告发送操作
            $('#notice-send').click( function(){

                //标题数据
                var noticeTitle = $('input[name="noticeTitle"]').val();
                var content = $('#newNotice').froalaEditor('html.get', true);
                if(noticeTitle == ""){
                    toastr.warning("标题不能为空！");
                }else if(content == ""){
                    toastr.warning("内容不能为空！");
                }else{
                    //投票数据更新
                    $(this).text('发送中...').attr('disabled', 'disabled');
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
                    var volist = JSON.stringify(voteValue);
                    var voteEndTime = $("#voteEndTime").val();
                    //报名数据更新

                    //内容框数据

                    var noticeContent = $('#newNotice').froalaEditor('html.get', true);


                    //是否投票
                    var vote;
                    if ($('#vote').text() == '投票已选'){
                        vote = 1;
                    }else{
                        vote = 0;
                    };
                    //是否报名
                    var signUp;
                    if ($('#signed').text() == '报名已选'){
                        signUp = 1;
                    }else{
                        signUp = 0;
                    };

                    var ISPUSH = 1;//是否推送 0不推送 1已推送
                    var NOTICESTATUS = 1;//通知状态 0草稿 1已发布
                    var allCounts = 0;//通知对象总人数
                    var memberInfo = "";//通知对象信息
                    var memberids = "";
                    if(selected.length != 0){
                        allCounts = selected.length;
                        for(var i=0; i<selected.length; i++){
                            memberids += selected[i].USID + ",";
                            memberInfo += selected[i].REALNAME + "," + selected[i].MOBILE +";";
                        }
                    }else{
                        allCounts = unSelected.length;
                        for(var i=0; i<unSelected.length; i++){
                            memberInfo += unSelected[i].REALNAME + "," + unSelected[i].MOBILE +";";
                        }
                    }
                    var place = $("#place").val();//活动地点
                    var contactor = $("#contactor").val();//联系人姓名
                    var contactorMobile = $("#contactorMobile").val();//联系人联系电话
                    var signedStartTime = $("#signedStartTime").val();//活动开始时间
                    var signedEndTime = $("#signedEndTime").val();//活动结束时间

                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/publishNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {TITLE:noticeTitle,CONTENT:noticeContent,MEMBERIDS:memberids,MEMBERINFO:memberInfo,ALLCOUNTS:allCounts,SIGN_UP:signUp,VOTE:vote,ISPUSH:ISPUSH,NOTICESTATUS:NOTICESTATUS,PLACE:place,CONTACTOR:contactor,CONTACTORMOBILE:contactorMobile,STARTTIME:signedStartTime,ENDTIME:signedEndTime,THEVOLIST:voteValue,THEVOLIST:volist,VOTETIME:voteEndTime},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            $('#notice-send').text('发送').removeAttr('disabled');
                                            toastr.success("发送成功！");
                                            initNoticeIndex();
                                            //window.location.href = basePath + "/admin/url/notice.shtml";
                                        }else{
                                            toastr.error("发送失败！");

                                        }
                                    },
                                    error: function(msg){
                                        $('#notice-send').text('发送').removeAttr('disabled');
                                        toastr.error("操作失败，请联系管理人员！");
                                        // alert("操作失败，请联系管理人员！");
                                    }
                                });
                            }
                        }
                    });
                }

            });
            //通知通告存草稿操作
            $('#notice-draft').click( function(){
                //标题数据

                var noticeTitle = $('input[name="noticeTitle"]').val();
                var content = $('#newNotice').froalaEditor('html.get', true);
                if(noticeTitle == ""){
                    toastr.warning("标题不能为空！");
                }else if(content == ""){
                    toastr.warning("内容不能为空！");
                }else{
                    $(this).text('保存中...').attr('disabled', 'disabled');
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
                    var volist = JSON.stringify(voteValue);
                    var voteEndTime = $("#voteEndTime").val();

                    //报名数据更新
                    //var signedValue = ;
                    //signedValue =



                    //内容框数据

                    var noticeContent = $('#newNotice').froalaEditor('html.get', true);
                    //是否投票
                    var vote;
                    if ($('#vote').text() == '投票已选'){
                        vote = 1;
                    }else{
                        vote = 0;
                    };
                    //是否报名
                    var signUp;
                    if ($('#signed').text() == '报名已选'){
                        signUp = 1;
                    }else{
                        signUp = 0;
                    };
                    var ISPUSH = 0;//是否推送 0不推送 1已推送
                    var NOTICESTATUS = 0;//通知状态 0草稿 1已发布
                    var allCounts = 0;//通知对象总人数
                    var memberInfo = "";//通知对象信息
                    var memberids = "";
                    if(selected.length != 0){
                        allCounts = selected.length;
                        for(var i=0; i<selected.length; i++){
                            memberids += selected[i].USID + ",";
                            memberInfo += selected[i].REALNAME + "," + selected[i].MOBILE +";";
                        }
                    }else{
                        allCounts = unSelected.length;
                        for(var i=0; i<unSelected.length; i++){
                            memberInfo += unSelected[i].REALNAME + "," + unSelected[i].MOBILE +";";
                        }
                    }
                    var place = $("#place").val();//活动地点
                    var contactor = $("#contactor").val();//联系人姓名
                    var contactorMobile = $("#contactorMobile").val();//联系人联系电话
                    var signedStartTime = $("#signedStartTime").val();//活动开始时间
                    var signedEndTime = $("#signedEndTime").val();//活动结束时间

                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认存草稿?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/publishNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {TITLE:noticeTitle,CONTENT:noticeContent,MEMBERIDS:memberids,MEMBERINFO:memberInfo,ALLCOUNTS:allCounts,SIGN_UP:signUp,VOTE:vote,ISPUSH:ISPUSH,NOTICESTATUS:NOTICESTATUS,PLACE:place,CONTACTOR:contactor,CONTACTORMOBILE:contactorMobile,STARTTIME:signedStartTime,ENDTIME:signedEndTime,THEVOLIST:voteValue,THEVOLIST:volist,VOTETIME:voteEndTime},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("存储成功！");
                                            $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                            initNoticeIndex();
                                            //window.location.href = basePath + "/admin/url/notice.shtml";
                                        }else{
                                            toastr.success("存储失败！");
                                            $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("存储失败！");
                                        $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                        // alert("操作失败，请联系管理人员！");
                                    }
                                });
                            }
                        }
                    });
                }

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

            /*
             *  功能：获取当前时间并对选择器赋值
             *  Created by nocoolyoyo 2016/10/10.
             */
            initDate();
            function initDate(){
                var mydate = new Date();
                var todayDate = "" + mydate.getFullYear() + "-";
                var f = mydate.getMonth()+1;
                f=f>9?f:"0"+f;
                todayDate += f+"-";
                var d = mydate.getDate();
                d=d>9?d:"0"+d;
                todayDate += d+" ";
                var h = mydate.getHours();
                h=h>9?h:"0"+h;
                todayDate += h+":";
                var m = mydate.getMinutes();
                m=m>9?m:"0"+m;
                todayDate += m;
                $('#voteEndTime').val(todayDate);
                $('#signedStartTime').val(todayDate);
                $('#signedEndTime').val(todayDate);
            }

            //人员选择页

        }
        function initNoticeDrafts(){
            selected = [];
            selections = [];
            unSelected = [];
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/notice-drafts.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#back').click(function() {
                initNoticeIndex();
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

                        align: 'center'
                    }, {
                        field: 'TITLE',
                        title: '通知主题',
                        events: "draftsEvents",
                        formatter: function(value,row){
                            return '<a href="#" class="draftEdit" data-id="' + row.NID + '">' + value + '</a>';
                        },
                        align: 'center'
                    }, {
                        field: 'PUBLISHTIME',
                        title: '发布时间',

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
                            toastr.error("操作失败，请联系管理人员！");
                            //alert("操作失败，请联系管理人员！");
                        }
                    },
                    error: function(msg){
                        toastr.error("操作失败，请联系管理人员！");
                    }
                });

                window.draftsEvents = {
                    'click .draftEdit': function (e, value, row, index) {
                        initNoticeEdit(row.NID);
                    }

                };

                //删除
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $delete.show();
                    } else {
                        $delete.hide();
                    }
                    //selections = getIdSelections();

                });
                $table.on('page-change.bs.table', function(){
                    $delete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $delete.hide();
                })
                $delete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认删除?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/deleteNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"NIDS":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功!");

                                            $delete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("删除失败!");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("删除失败!");
                                    }
                                });
                            }
                        }
                    });

                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.NID
                    });
                }
            }
        }
        function initNoticeEdit(id){
            selected = [];
            selections = [];
            unSelected = [];
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/notice-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $.ajax({
                url: basePath + '/admin/notice/queryNoticeFind.shtml',
                dataType: 'json',
                type: 'post',
                data: {NID:id},
                traditional: true,
                success:function(data){
                    if(data.status == "0"){
                        $('input[name="noticeTitle"]').val(data.map.TITLE);

                        $('#newNotice').froalaEditor('html.set', data.map.CONTENT);
                        if(data.map.SIGN_UP == 1){
                            $('#signed').removeClass('btn-danger').addClass('btn-success').text('报名已选');
                            $("#place").val(data.map.PLACE);
                            $("#signedStartTime").val(data.map.STARTDATE);
                            $("#signedEndTime").val(data.map.ENDDATE);
                            $("#contactor").val(data.map.CONTACTOR);
                            $("#contactorMobile").val(data.map.CONTACTORMOBILE);
                        }else{
                            $('#signed').removeClass('btn-success').addClass('btn-danger').text('报名未选');
                        }
                        if(data.map.VOTE == 1){
                            $('#vote').removeClass('btn-danger').addClass('btn-success').text('投票已选');
                            var voteBody="";
                            var p = 1;
                            function radio1(type){
                                if(type == 1){
                                    return 'checked="checked"'
                                }else {
                                    return ""
                                }
                            }
                            function radio2(type){
                                if(type == 2){
                                    return 'checked="checked"'
                                }else {
                                    return ""
                                }
                            }
                            for (var i=0; i<data.delvotelist.length; i++) {
                                var voteSelectionsAdd = "";
                                var z = 1;
                                for (var j=0; j<data.delvotelist[i].VOTELIST.length; j++) {
                                    voteSelectionsAdd += '<li class="form-group">' +
                                        '<label  class="col-sm-3 control-label">选项'+ z +'：</label>' +
                                        '<div class="col-sm-8">' +
                                        '<input type="text" class="voteSelections form-control" name="voteSelections" placeholder="请输入名称" value="'+data.delvotelist[i].VOTELIST[j].OPTIONNAME+'">' +
                                        '</div>' +
                                        '<button type="button" class="li-delete col-sm-1 close" style="margin-top: 5px;"><span aria-hidden="true" style="margin-right: 4px;">&times;</span><span class="sr-only" style="margin-right: 4px;">Close</span></button>'+
                                        '</li>';
                                    z++;
                                }

                                voteBody += '<div class="vote panel panel-default">'+
                                    '<div class="panel-heading center">'+'投票'+p+'<button type="button" class="vote-delete close" ><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>'+
                                    '<div class="panel-body">'+
                                    '<div class="form-group">'+
                                    '<label for="voteName" class="col-sm-3  control-label">投票主题：</label>'+
                                    '<div class="col-sm-8">'+
                                    '<input type="text" class="form-control" name="voteName" placeholder="请输入名称" value="'+data.delvotelist[i].SUBJECT+'">'+
                                    '</div>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                    '<label for="voteType" class="col-sm-3 control-label">投票类型：</label>'+
                                    '<div class="col-sm-8" id="voteType">'+
                                    '<label class="radio-inline">'+

                                    '<input type="radio" name="radio'+ p + '"' + radio1(data.delvotelist[i].TYPE) + 'value="1" > 单选'+

                                    '</label>'+
                                    '<label class="radio-inline">'+

                                    '<input type="radio" name="radio'+ p + '"' + radio2(data.delvotelist[i].TYPE) + ' value="2"> 多选'+

                                    '</label>'+
                                    '</div>'+
                                    '</div>'+
                                    '<ul class="voteSelectionsGroup">'+
                                    voteSelectionsAdd+
                                    '</ul>'+
                                    '<button type="button" class="voteSelections-add col-sm-offset-5 btn button-green button-rounded">新增选项</button>'+
                                    '</div>'+
                                    '</div>';
                                p++;
                            }
                            $('#vote-body').html(voteBody);
                            $("#voteEndTime").val(data.voteTime);


                        }else{
                            $('#vote').removeClass('btn-success').addClass('btn-danger').text('投票未选');
                        };

                        membersAdd();
                        var mySelect=[];
                        mySelect = data.map.MEMBERIDS;
                        mySelect = mySelect.substring(0,mySelect.length-1);
                        mySelect = mySelect.split(",");

                        for(var l=0; l < mySelect.length; l++){
                            for(var s=0; s < unSelected.length; s++){
                                if(unSelected[s].USID == mySelect[l]){
                                    selected = selected.concat(unSelected[s]);
                                    unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                                }
                            }
                        }

                        $tableSelected.bootstrapTable('load', selected);
                        $tableMembers.bootstrapTable('load', unSelected);
                        labelCreate();

                    }else{
                        toastr.error("查询失败，请联系管理人员！");

                    }
                },
                error: function(msg){
                    toastr.error("操作失败，请联系管理人员！");

                }
            });
            initfroalaEditor();


            //membersAdd();
            //投票添加删除操作
            voteOprate();
            //投票选项添加删除操作
            voteSelectionOprate();
            //表单验证
            voteValidator();
            signedValidator();

            //返回
            $('#back').click(function() {
                initNoticeDrafts()
            });
            //确认投票
            $('#vote-sure').click( function(){
                var valitation = true;

                $('#vote-form').find("input").each(function(){
                    var value = $(this).val(); //这里的value就是每一个input的value值~
                    if($(this).val() == ""){
                        valitation  = false;
                    }
                });
                if(valitation == false) {
                    toastr.warning("请填写完整投票信息！");
                }else{
                    $('#vote').removeClass('btn-danger').addClass('btn-success').text('投票已选');
                    $('#vote-modal').modal('hide');
                }

            });
            //取消投票
            $('#vote-cancel').click(function(){
                $('#vote').removeClass('btn-success').addClass('btn-danger').text('投票未选')
            });

            // $('#vote').click( function(){
            //});
            //确认报名
            $('#signed-sure').click( function(){
                var valitation = true;

                $('#signed-form').find("input").each(function(){
                    var value = $(this).val(); //这里的value就是每一个input的value值~
                    if($(this).val() == ""){
                        valitation  = false;
                    }
                });
                if(valitation == false) {
                    toastr.warning("请填写完整报名信息！");
                }else{
                    $('#signed').removeClass('btn-danger').addClass('btn-success').text('报名已选');
                    $('#signed-modal').modal('hide');
                }

            });
            //取消报名
            $('#signed-cancel').click(function(){
                $('#signed').removeClass('btn-success').addClass('btn-danger').text('报名未选');
            });
            //通知通告发送操作
            $('#notice-send').click( function(){

                var noticeTitle = $('input[name="noticeTitle"]').val();
                var content = $('#newNotice').froalaEditor('html.get', true);
                if(noticeTitle == ""){
                    toastr.warning("标题不能为空！");
                }else if(content == ""){
                    toastr.warning("内容不能为空！");
                }else{
                    $(this).text('发送中...').attr('disabled', 'disabled');
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
                    var volist = JSON.stringify(voteValue);
                    var voteEndTime = $("#voteEndTime").val();

                    //内容框数据
                    var noticeContent = $('#newNotice').froalaEditor('html.get', true);


                    //是否投票
                    var vote;
                    if ($('#vote').text() == '投票已选'){
                        vote = 1;
                    }else{
                        vote = 0;
                    };
                    //是否报名
                    var signUp;
                    if ($('#signed').text() == '报名已选'){
                        signUp = 1;
                    }else{
                        signUp = 0;
                    };

                    var ISPUSH = 1;//是否推送 0不推送 1已推送
                    var NOTICESTATUS = 1;//通知状态 0草稿 1已发布
                    var allCounts = 0;//通知对象总人数
                    var memberInfo = "";//通知对象信息
                    var memberids = "";
                    if(selected.length != 0){
                        allCounts = selected.length;
                        for(var i=0; i<selected.length; i++){
                            memberids += selected[i].USID + ",";
                            memberInfo += selected[i].REALNAME + "," + selected[i].MOBILE +";";
                        }
                    }else{
                        allCounts = unSelected.length;
                        for(var i=0; i<unSelected.length; i++){
                            memberInfo += unSelected[i].REALNAME + "," + unSelected[i].MOBILE +";";
                        }
                    }

                    var place = $("#place").val();//活动地点
                    var contactor = $("#contactor").val();//联系人姓名
                    var contactorMobile = $("#contactorMobile").val();//联系人联系电话
                    var signedStartTime = $("#signedStartTime").val();//活动开始时间
                    var signedEndTime = $("#signedEndTime").val();//活动结束时间


                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认发送?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/updateNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {NID:id,TITLE:noticeTitle,CONTENT:noticeContent,MEMBERIDS:memberids,MEMBERINFO:memberInfo,ALLCOUNTS:allCounts,SIGN_UP:signUp,VOTE:vote,ISPUSH:ISPUSH,NOTICESTATUS:NOTICESTATUS,PLACE:place,CONTACTOR:contactor,CONTACTORMOBILE:contactorMobile,STARTTIME:signedStartTime,ENDTIME:signedEndTime,THEVOLIST:voteValue,THEVOLIST:volist,VOTETIME:voteEndTime},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功!");
                                            $('#notice-send').text('发送').removeAttr('disabled');
                                            initNoticeIndex();
                                            //window.location.href = basePath + "/admin/url/notice.shtml";
                                        }else{
                                            toastr.error("发送失败！");
                                            $('#notice-send').text('发送').removeAttr('disabled');
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    });

                }
            });
            //通知通告存草稿操作
            $('#notice-draft').click( function(){
                //标题数据

                var noticeTitle = $('input[name="noticeTitle"]').val();
                var content = $('#newNotice').froalaEditor('html.get', true);
                if(noticeTitle == ""){
                    toastr.warning("标题不能为空！");
                }else if(content == ""){
                    toastr.warning("内容不能为空！");
                }else{
                    $(this).text('保存中...').attr('disabled', 'disabled');
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
                    var volist = JSON.stringify(voteValue);
                    var voteEndTime = $("#voteEndTime").val();

                    //报名数据更新
                    //var signedValue = ;
                    //signedValue =



                    //内容框数据

                    var noticeContent = $('#newNotice').froalaEditor('html.get', true);


                    //是否投票
                    var vote;
                    if ($('#vote').text() == '投票已选'){
                        vote = 1;
                    }else{
                        vote = 0;
                    };
                    //是否报名
                    var signUp;
                    if ($('#signed').text() == '报名已选'){
                        signUp = 1;
                    }else{
                        signUp = 0;
                    };

                    var ISPUSH = 0;//是否推送 0不推送 1已推送
                    var NOTICESTATUS = 0;//通知状态 0草稿 1已发布
                    var allCounts = 0;//通知对象总人数
                    var memberInfo = "";//通知对象信息
                    var memberids = "";
                    if(selected.length != 0){
                        allCounts = selected.length;
                        for(var i=0; i<selected.length; i++){
                            memberids += selected[i].USID + ",";
                            memberInfo += selected[i].REALNAME + "," + selected[i].MOBILE +";";
                        }
                    }else{
                        allCounts = unSelected.length;
                        for(var i=0; i<unSelected.length; i++){
                            memberInfo += unSelected[i].REALNAME + "," + unSelected[i].MOBILE +";";
                        }
                    }
                    var place = $("#place").val();//活动地点
                    var contactor = $("#contactor").val();//联系人姓名
                    var contactorMobile = $("#contactorMobile").val();//联系人联系电话
                    var signedStartTime = $("#signedStartTime").val();//活动开始时间
                    var signedEndTime = $("#signedEndTime").val();//活动结束时间



                    bootbox.confirm({
                        size: "small",
                        title: "操作",
                        className: "center",
                        message: "确认存草稿?",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/notice/updateNotice.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {NID:id,TITLE:noticeTitle,CONTENT:noticeContent,MEMBERIDS:memberids,MEMBERINFO:memberInfo,ALLCOUNTS:allCounts,SIGN_UP:signUp,VOTE:vote,ISPUSH:ISPUSH,NOTICESTATUS:NOTICESTATUS,PLACE:place,CONTACTOR:contactor,CONTACTORMOBILE:contactorMobile,STARTTIME:signedStartTime,ENDTIME:signedEndTime,THEVOLIST:voteValue,THEVOLIST:volist,VOTETIME:voteEndTime},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("存储成功!");
                                            $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                            initNoticeIndex();
                                            //window.location.href = basePath + "/admin/url/notice.shtml";
                                        }else{
                                            toastr.error("存储失败!");
                                            $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("存储失败!");
                                        $('#notice-draft').text('保存草稿').removeAttr('disabled');
                                    }
                                });
                            }
                        }
                    });

                }

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
            //membersAdd();
        }
        function membersAdd() {
            //加载所有会员数据
            $tableMembers = $('#table-members');
            $tableSelected = $('#members-selected');
            // var selections = [],//临时选择数组
            //personCount = 0,//已选中人员数量

            $fasterFlier = $('#fast-fliter');

            $.ajax({
                url: basePath + "/admin/member/serchAllMember.shtml",
                async: false,
                dataType:"json",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    unSelected = data.rows;

                }
            }).done(function (data) {
                // unSelected = data;
            });

            //获取成员职务列表信息
            outputOnameList();

            for(var j=0; j < onameList.length; j++){
                $fasterFlier.append('<li><a href="#" data-id="'+onameList[j].value+'">' + onameList[j].text + '</a></li>');
            }

            initTableMembers();
            initMembersSelected();

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
                    pageSize: 50,
                    pageList: [	15, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    toolbar: "#table-toolbar",
                    search: true,
                    showColumns: true,
                    height: 490,
                    maintainSelected:true,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    },{
                        field: 'REALNAME',
                        title: '姓名',

                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号',

                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '所在单位',

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
            /*快速添加中的人员选择添加*/
            $(document).on('click', '#fast-fliter > li a', function(){
                var tempOID = $(this).attr('data-id');

                for(var n=0; n < unSelected.length; n++){

                    if(typeof(unSelected[n].OIDS) !== "undefined"){
                        var tempOIDS = unSelected[n].OIDS.split(",");

                        if(tempOIDS.contains(tempOID)){
                            selected = selected.concat(unSelected[n]);
                        }
                    }
                }
                // for(var n=0; n < unSelected.length; n++){
                //   if($.inArray(tempOID.toString(), unSelected[n].OIDS)){
                //    selected = selected.concat(unSelected[n]);
                //  }
                // }
                for(var l=0; l < selected.length; l++){
                    for(var s=0; s < unSelected.length; s++){
                        if(unSelected[s].USID == selected[l].USID){
                            unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                        }
                    }
                }

                $tableSelected.bootstrapTable('load', selected);
                $tableMembers.bootstrapTable('load', unSelected);
                labelCreate();
            });
        }
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
            $('.notice-select-person').html(html);
            //refreshPersonCount();
        }
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
                voteValidator();

            });
            $(document).on('click','.li-delete', function () {
                $(this).closest('li').remove();
            })

        }
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
                voteValidator();
            });
            //删除投票
            $(document).on('click', '.vote-delete', function () {
                $(this).closest('.vote').remove();
            })
        }
        function voteValidator(){
            var $voteForm = $('#vote-form');
            $voteForm.bootstrapValidator({
                message: '选项不能有空值',
                excluded: [':disabled'],
                fields: {
                    voteName: {
                        validators: {
                            notEmpty: {
                                message: '投票名不能为空！'
                            }
                        }
                    },
                    voteSelections: {
                        validators: {
                            notEmpty: {
                                message: '选项值不能为空！'
                            }
                        }
                    },

                }
            });
            $voteForm.bootstrapValidator('addField', 'voteName', {
                validators: {
                    notEmpty: {
                        message: '投票名不能为空！'
                    }
                }
            });
            $voteForm.bootstrapValidator('addField', 'voteSelections', {
                validators: {
                    notEmpty: {
                        message: '选项值不能为空！'
                    }
                }
            });
        }
        function signedValidator(){
            var $signedForm = $('#signed-form');
            $signedForm.bootstrapValidator({
                message: '选项不能有空值',
                excluded: [':disabled'],
                fields: {
                    place: {
                        validators: {
                            notEmpty: {
                                message: '地点不能为空！'
                            }
                        }
                    },
                    contactor: {
                        validators: {
                            notEmpty: {
                                message: '联系人不能为空！'
                            }
                        }
                    },
                    contactorMobile: {
                        validators: {
                            notEmpty: {
                                message: '联系电话不能为空！'
                            },
                            regexp: {
                                regexp: /^[1-9]\d*$/,
                                message: '请输入正确的！'
                            }
                        }
                    }
                }
            });
        }
    });
}());
