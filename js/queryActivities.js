(function() {
    $(function() {	
        var $table = $('#table'),
            $delete = $('#delete'),
            $tableWinner = $("#tableWinner"),
            $tablePartic = $("#tablePartic"),
            $tableImportFailed = $("#tableImportFailed");
        var selections = [];
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var tempId="";
        var tempUrl="";
        initTable1();
        initTimepicker();
        initDate();
        //参与名单table
        initParticModule();
        //获奖名单table
        initWinnerModule();

        function initTable1() {
            $table = $('#table');
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/signdraw/queryActivityList.shtml',
                // dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                pageSize: 10,//单页记录数
                height: 601,
                pageList: [10, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                search: true,
                queryParams: function getParams(params) {
                    return params;
                },
                toolbar: "#table-toolbar",
                showRefresh: true,//刷新按钮
                showColumns: true,
                showToggle: true,
                // detailFormatter: detailFormatter,
                columns: [
                    {
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'AID',
                        title: '主键ID',
                        align: 'center',
                        visible: false
                    }, {
                        field: 'AURL',
                        title: '二维码URL',
                        align: 'center',
                        visible: false
                    }, {
                        field: 'ATITLE',
                        title: '标题',
                        event: 'queryActivitiesEvents',
                        formatter: actionDetail,
                        align: 'center'
                    }, {
                        field: 'ACREATETIME',
                        title: '发布时间',
                        align: 'center'
                    },{
                        field: 'operate',
                        title: '操作',
                        align: 'center',
                        events: 'queryActivitiesEvents',
                        formatter: operateFormatter
                    }]
            });
            /*
             *  功能：活动表格点击事件
             *  Created by nocoolyoyo 2016/10/10.
             */
            window.queryActivitiesEvents = {
                //点击参与名单
                'click .QRCode': function (e, value, row, index) {
                    tempUrl = row.AURL;
                    $("#aurl").attr('src',row.AURL);
                },
                'click .queryWinner': function (e, value, row, index) {
                    tempId = row.AID;
                },
                'click .queryPartic': function (e, value, row, index) {
                    tempId = row.AID;

                    //$tablePartic.bootstrapTable('refresh');
                }
            };
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */
            $table.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($table.bootstrapTable('getSelections').length) {
                    $delete.show();
                } else {
                    $delete.hide();
                }
                selections = getIdSelections();
            });
            $table.on('page-change.bs.table', function(){
                $delete.hide();
            });
            $table.on('refresh.bs.table', function(){
                $delete.hide();
            });
            //跳转详情
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.AID
                });
            }
            function actionDetail(value, row){
                return '<a href="#" class="actionDetail"  data-toggle="modal"  data-id="' + row.AID + '">' + value + '</a>';
            }
            $(document).on("click", ".actionDetail", function() {
                window.open(basePath+"/admin/url/actiondetail.shtml?AID="+$(this).attr('data-id'));
            });
            /*
             *删除
             */
            $delete.on('click', function(){
                var ids = getIdSelections();
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                $delete.hide();
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }

                bootbox.confirm({
                    size: "small",
                    message: "确认删除?",
                    className: "center",
                    title: "操作",
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
                                url: basePath+'/admin/signdraw/deleteActivity.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                    CHECKBOXID:str
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                                        toastr.success("删除成功！");
                                        $table.bootstrapTable('refresh');
                                    }
                                },
                                error: function(msg){
                                }
                            });

                        }
                    }
                });

            });
            /*
             *  功能：操作框
             *  Created by nocoolyoyo 2016/9/28.
             */

            function operateFormatter(value, row){
                return [
                    '<a class="QRCode" href="#"  data-toggle="modal" data-target="#queryQRCode-modal">',
                    '二维码',
                    '</a>',
                    '&nbsp',
                    '<a class="queryWinner" href="#" data-toggle="modal" data-target="#queryWinner-modal">',
                    '获奖名单',
                    '</a>',
                    '&nbsp;',
                    '<a class="queryPartic" href="#" data-toggle="modal" data-target="#queryPartic-modal">',
                    '参与名单',
                    '</a>'
                ].join('')
            }
            //二维码显示
            $(document).on("click", "#add", function() {
                $("#activity-title").val("");//
                $("#activity-content").val("");//
                $("#activity-ts").val("");//
                var mydate = new Date();
                var todayDate = "" + mydate.getFullYear() + "-";
                todayDate += (mydate.getMonth()+1) + "-";
                todayDate += mydate.getDate();
                $("#activity-time").val(todayDate);//
//                $(".modal-title").text("新增活动");
            });

            //新增活动保存
            $("#submit").on('click',function(){
                var time = $("#activity-time").val();//时间
                var ts =   $("#activity-ts").val();//提示内容
                var content = $("#activity-content").val();//内容
                var title = $("#activity-title").val();//标题
                if ( time ==""|| title ==""){
                    toastr.warning("活动标题不能为空！");
                }else{
                    $.ajax({
                        url: basePath+'/admin/signdraw/insertActivity.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{
                            ATITLE:title,ACONTENT:content,ASTARTTIME:time,AOPTINTCONTENT:ts
                        },
                        success:function(data){
                            if(data.STATUS == "0"){
                                $('#queryActivities-modal').modal('hide');
                                toastr.success("新增成功！");
                                $table.bootstrapTable('refresh');
                            }else{
                                toastr.error(data.ERRMSG);
                            }
                        },
                        error: function(msg){
                        }
                    });
                }
            })
        }
        /*
         *  功能：获取当前时间并对选择器赋值
         *  Created by nocoolyoyo 2016/10/10.
         */

        function initDate(){
            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "-";
            var f = mydate.getMonth()+1;
            f=f>9?f:"0"+f;
            todayDate += f+"-";
            var d = mydate.getDate();
            d=d>9?d:"0"+d;
            todayDate += d;
            $('#activity-time').val(todayDate);
        }
        /*
         *  功能：日期选择器API
         *  页面：*.html
         *  Created by nocoolyoyo 2016/9/26.
         */
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

        //下载二维码
        $("#ORCodeUpload").click(function(){
            location = basePath + "/admin/signdraw/doGet.shtml?fileUrl="+ tempUrl;
        });
        /*
         *  功能：获奖名单模块
         *  Created by nocoolyoyo 2016/10/10.
         */
        function initWinnerModule() {
            $tableWinner = $("#tableWinner");
            $tableWinner.bootstrapTable({
                url: basePath + '/admin/signdraw/querywinning.shtml',
                idField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 450,
                pageSize: 8,//单页记录数
                pageList: [8, 16, 24],
                toolbar: "#queryWinner-toolbar",
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                search: true,
                queryParams: function getParams(params) {
                    params.AID = tempId;
                    return params;
                },
                showColumns: true,
                showToggle: true,
                columns: [
                    {
                        field: 'USID',
                        title: 'ID',
                        align: 'center',
                        visible:false
                    }, {
                        field: 'REALNAME',
                        title: '姓名',
                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',
                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '单位',

                        align: 'center'
                    }, {
                        field: 'POSITION',
                        title: '职务',
                        align: 'center'
                    }, {
                        field: 'AWNAME',
                        title: '奖项',

                        align: 'center'
                    }]
            });
            //导出获奖名单
            $("#queryWinner-export").click(function(){
//                var name = $('#queryWinner-person').val();
                window.location.href = basePath+"/admin/signdraw/queryWinnerExport.shtml?AID="+tempId;
            });
            //重置查询条件
            $('#queryWinner-reset').click(function(){
                $tableWinner.bootstrapTable('resetSearch');
            });
            // 功能：获奖名单出入展示监听
            $('#queryWinner-modal').on('show.bs.modal', function () {
                $tableWinner.bootstrapTable('refresh');
            }).on('shown.bs.modal', function () {
                $tableWinner.bootstrapTable('resetView');
            }).on('hidden.bs.modal', function () {
                $tableWinner.bootstrapTable('resetSearch');
            });
        }
        /*
         *  功能：参与名单模块
         *  Created by nocoolyoyo 2016/10/10.
         */
        function initParticModule() {
            var $queryParticDelete = $('#queryPartic-delete');
            $tablePartic = $("#tablePartic");
            //参与名单表格初始化
            $tablePartic.bootstrapTable({
                url: basePath + '/admin/signdraw/queryparticipate.shtml',
                pagination: true,//是否分页
                height: 480,
                idField: "rows",
                pageSize: 8,//单页记录数
                pageList: [8, 16, 24],
                toolbar: "#queryPartic-toolbar",
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                search: true,
                queryParams: function getParams(params) {
                    params.AID = tempId;
                    return params;
                },
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true,
                    formatter: function (value, row, index){
                        if(row.TYPE == '扫码签到'){
                            return {
                                disabled: true
                            };
                        }
                    }

                },{
                    field: 'USID',
                    title: 'ID',
                    align: 'center',
                    visible:false
                }, {
                    field: 'REALNAME',
                    title: '姓名',
                    align: 'center'
                }, {
                    field: 'MOBILE',
                    title: '手机号码',
                    align: 'center'
                }, {
                    field: 'COMPANY',
                    title: '单位',
                    align: 'center'
                }, {
                    field: 'POSITION',
                    title: '职务',
                    align: 'center'
                }, {
                    field: 'TYPE',
                    title: '签到方式',
                    align: 'center'
                }]
            });

            //删除按钮的隐藏与显示
            $tablePartic.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($tablePartic.bootstrapTable('getSelections').length) {
                    $queryParticDelete.show();
                } else {
                    $queryParticDelete.hide();
                }
                selections = getIdSelections();
            });
            //获取参与名单选择框信息
            function getIdSelections() {
                return $.map($tablePartic.bootstrapTable('getSelections'), function (row) {
                    return row.USID
                });
            }
            //添加参与人员
            $('#add-member-sure').click(function () {
                var memberName = $.trim($("#memberName").val());
                var memberMobile = $.trim($("#memberMobile").val());
                var memberPosition = $.trim($("#memberPosition").val());
                var memberCompany = $.trim($("#memberCompany").val());
                var reg = /^\d{10,12}$/;
                if (memberName ==""){
                    toastr.warning("参与人员姓名不能为空！");
                }else if(memberMobile == ""){
                    toastr.warning("手机号不能为空！");
                }else if(!reg.test(memberMobile)){
                	toastr.warning("请输入10-12位手机号数字！");
                }else{
                    $.ajax({
                        url: basePath + '/admin/signdraw/insertTempUser.shtml',
                        dataType: 'json',
                        type: 'post',
                        async :false,
                        data:{
                            USERNAME:memberName,AID:tempId,MOBILE:memberMobile,POSITION:memberPosition,COMPANY:memberCompany
                        },
                        success:function(data){
                            if(data.STATUS == "0"){       
                            	toastr.success("添加成功！");
                                $tablePartic.bootstrapTable('refresh');
                                $('#add-member-modal').modal('hide');
                            }else{
                                toastr.error("添加失败，请联系管理员！");
                            }
                        },
                        error: function(msg){
                            toastr.error("添加失败,请检查本地网络！");
                        }
                    });
                }
            });
            //删除参与人员
            $queryParticDelete.click( function() {
                var ids = getIdSelections();
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                $delete.hide();
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                bootbox.confirm({
                    size: "small",
                    message: "确认删除?",
                    className: "center",
                    title: "操作",
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
                                url: basePath+'/admin/signdraw/deleteTempUser.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                    CHECKBOXID:str
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                                        $tablePartic.bootstrapTable('refresh');
                                        toastr.success("删除成功！");
                                        $queryParticDelete.hide();
                                    }
                                },
                                error: function(msg){
                                    toastr.error("添加失败,请检查本地网络！");
                                }
                            });

                        }
                    }
                });

            });
            //批量导入参与名单
            $('#file-import').fileinput(    {
                language: 'zh-CN', //设置语言
                uploadUrl: basePath+'/admin/upload.shtml?savePath=upload/file', //上传的地址
                allowedFileExtensions : ['xls','xlsx'],//接收的文件后缀,
                maxFileCount: 1,
                accept: 'application/html',
                enctype: 'multipart/form-data',
                showUpload: true, //是否显示上传按钮
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                fileActionSettings: {
                    showZoom: false
                }
            }).on("fileuploaded", function(event, data) {
                if(data.response){
                    //console.log(tempId);这个是当前点击活动的AID
                    var myArray = {"URL":data.response.realUrl,"AID":tempId};//这里改成你自己要传的参数
                    $.ajax({
                        type:'POST',
                        url: basePath+"/admin/signdraw/inportTempUserExcel.shtml",
                        data:myArray,
                        dataType:'json',
                        success: function (data){
                            if(data.status == 0){
                                //$('#import-failed-modal').modal('show');//显示导入失败人员名单的代码
                                $tablePartic.bootstrapTable('refresh');
                                $('#import-modal').modal('hide');
                                if(data.list.length !== 0){
                                	$(".modal-title1").html("以下人员为商会成员，不需要导入，请下载商会云通过扫码进行签到");
                                    $tableImportFailed.bootstrapTable('load',data.list);
                                    $('#import-failed-modal').modal('show');
                                }else{
                                	toastr.success("导入成功！");
                                }
                            }else{
                                toastr.error(data.errMsg);
                            }
                        },
                        error: function(msg){
                            toastr.error("请求失败,请联系系统管理员！");
                        }
                    });
                }
            });
            $('#import-modal').on('hidden.bs.modal', function () {
            	//$('#file-import').fileinput('reset');
            	$('#file-import').fileinput('refresh');
            });
            //批量导入模板数据下载
            $("#member").click(function(){
                window.location.href = basePath + "/download/tempUserExcel/TempUser.xls";
            });
            //导出参与名单
            $('#queryPartic-export').click(function (){
                window.location.href = basePath+"/admin/signdraw/queryParticExport.shtml?AID="+tempId;
            });
            //重置添加人员表单
            $('#queryPartic-add').click(function (){
                $('#memberName').val('');
                $('#memberMobile').val('');
                $('#memberPosition').val('');
                $('#memberCompany').val('');
                // $('#addMemberForm').reset();
            });
            //重置查询条件
            $('#queryPartic-reset').click(function(){
                $tablePartic.bootstrapTable('resetSearch');
            });
            //参与名单出入展示监听
            $('#queryPartic-modal').on('show.bs.modal', function () {
                $tablePartic.bootstrapTable('refresh');
            }).on('shown.bs.modal', function () {
                $tablePartic.bootstrapTable('resetView');
            }).on('hidden.bs.modal', function () {
                $queryParticDelete.hide();
                $tablePartic.bootstrapTable('resetSearch');
            });
            //出现点击不删除时候清除选择项目
            /*    $('#queryPartic-modal').on('hidden.bs.modal', function (e) {
             $tablePartic.bootstrapTable( 'uncheckAll');
             });*/
            /*
             *  功能：导入失败名单出入展示监听
             *  Created by nocoolyoyo 2016/12/07.
             */
            $('#importFailed-modal').on('show.bs.modal', function () {
                $tableImportFailed.bootstrapTable('refresh');
            }).on('shown.bs.modal', function () {
                $tableImportFailed.bootstrapTable('resetView');
            }).on('hidden.bs.modal', function () {
                $tableImportFailed.bootstrapTable('resetSearch');
            });
            //导入失败人员初始化
            initTableImportFailed();
            function initTableImportFailed() {
                $tableImportFailed = $("#tableImportFailed");
                //导入失败人员表格初始化
                $tableImportFailed.bootstrapTable({
                    searchAlign: "right",//查询框对齐方式
//                    search: true,
//                    showExport: true,
//                    exportTypes: ['excel'],
                    pagination: true,//是否分页
                    height: 300,
                    pageSize: 8,//单页记录数
                    pageList: [8, 16, 24],
//                    toolbar: "#importFailed-toolbar",
//                    showColumns: true,
//                    showToggle: true,
                    columns: [{
                        field: 'AID',
                        title: 'ID',
                        align: 'center',
                        visible:false
                    }, {
                        field: 'USERNAME',
                        title: '姓名',
                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',
                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '单位',
                        align: 'center'
                    }, {
                        field: 'POSITION',
                        title: '职务',
                        align: 'center'
                    }]
                });
                //导出失败名单
                $('#importFailed-export').click(function (){
                });
                //重置查询条件
                $('#importFailed-reset').click(function(){
                    $tableImportFailed.bootstrapTable('resetSearch');
                });

            }
            //会员签到模块
            initMembersAdd();
            function initMembersAdd(){
                //加载所有会员数据
                var selections = [],//临时选择数组
                    unSelected = [],//未选中人员数组
                    selected = [],//已选中人员数组
                    onameList = [],
                    $tableMembers = $('#table-members'),
                    $tableSelected = $('#members-selected');
                    $fasterFlier = $('#fast-fliter');
                enableSubmit();
                //人员职务列表输出
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

                $("#select-sure").click(function () {
                    var mySelect = "";
                    console.log(selected);
                    for(var k=0; k < selected.length; k++){
                        mySelect += selected[k].USID + ',';
                    }
                    mySelect=mySelect.substring(0,mySelect.length-1);
                    console.log(mySelect);

                    bootbox.confirm({
                        size: "small",
                        message: "确认添加？",
                        className: "center",
                        title: "操作",
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
                            $.ajax({
                                url: basePath + '/admin/signdraw/inportActivityMember.shtml',
                                dataType: 'json',
                                type: 'post',
                                data: {
                                    AID: tempId,
                                    USIDS:mySelect
                                },
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        clear();
                                        $('#select-modal').modal('hide');
                                        $tablePartic.bootstrapTable('refresh');
                                        console.log(data.list.length);
                                        if(data.list.length !== 0){
                                        	$(".modal-title1").html("以下会员已签到过，不能重复签到");
                                            $tableImportFailed.bootstrapTable('load',data.list);
                                            $('#import-failed-modal').modal('show');
                                        }else{
                                        	toastr.success("添加成功！");
                                        }
                                    }else{
                                        toastr.error(data.errMsg);
                                    }
                                },
                                error: function(msg){
                                    toastr.error("操作失败，请联系管理人员！");
                                }
                            });

                        }
                    })


                });
                function enableSubmit(){
                    var $selectSubmit = $("#select-sure");
                    if(selected.length != 0){
                        $selectSubmit.removeAttr('disabled');
                    }else if(selected.length == 0){
                        $selectSubmit.attr('disabled', 'disabled');
                    }
                }

                //获取成员职务列表信息
                outputOnameList();
                for(var j=0; j < onameList.length; j++){
                    $fasterFlier.append('<li><a href="#" data-id="'+onameList[j].value+  '">' + onameList[j].text + '</a></li>');
                }

                //获取所有成员信息
                $.ajax({
                    url: basePath + "/admin/member/serchAllMember.shtml",
                    async: false,
                    dataType:"json",
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        unSelected = data.rows;

                        /*//舍弃前端去重
                         var existMembers = $table.bootstrapTable('getData');
                         console.log(existMembers)
                         for(var l=0; l < existMembers.length; l++){
                         for(var s=0; s < unSelected.length; s++){
                         if(unSelected[s].USID == existMembers[l].USID){
                         //selected = selected.concat(unSelected[s]);
                         unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                         }
                         }
                         }
                         console.log(unSelected)*/

                    }
                });
                initTableMembers();
                initMembersSelected();


                //确认操作


                //清空操作
                $(document).on("click", ".clear", function() {
                    clear()
                });

                function clear(){
                    unSelected = selected.concat(unSelected);
                    $tableMembers.bootstrapTable('load', unSelected);
                    $tableMembers.bootstrapTable( 'uncheckAll');
                    selected = [];
                    $tableSelected.bootstrapTable('load', selected);
                    enableSubmit()
                }

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
                    // selected = selected.concat(getRowSelections());
                    for(var i=0; i < selected.length; i++){
                        if( removeSelect.join() == selected[i].USID) {

                            $tableMembers.bootstrapTable('insertRow', {
                                index: 0,
                                row: selected[i]
                            });
                            selected.splice(selected.indexOf(selected[i]),1) ;
                            $tableSelected.bootstrapTable('load', selected);

                            $tableMembers.bootstrapTable( 'uncheckAll');
                            enableSubmit()
                        }
                    }

                });
                function initTableMembers(){
                    var $add = $('#members-add');
                    $tableMembers.bootstrapTable({
                        // idField: "id",
                        data: unSelected,
                        pageSize: 50,
                        pageList: [15,25,50,100],
                        sidePagination: 'client',
                        maintainSelected:true,
                        pagination: true,
                        toolbar: "#select-toolbar",
                        search: true,
                        // sidePagination: "server",
                        showColumns: true,
                        height: 490,
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
                        enableSubmit()
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
                        console.log(unSelected[n].OIDS)
                        if(typeof(unSelected[n].OIDS) !== "undefined"){
                            var tempOIDS = unSelected[n].OIDS.split(",");
                            console.log(tempOIDS)
                            if(tempOIDS.contains(tempOID)){
                                selected = selected.concat(unSelected[n]);
                            }
                        }
                    }

                    for(var l=0; l < selected.length; l++){
                        for(var s=0; s < unSelected.length; s++){
                            if(unSelected[s].USID == selected[l].USID){
                                unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                            }
                        }
                    }

                    $tableSelected.bootstrapTable('load', selected);
                    $tableMembers.bootstrapTable('load', unSelected);
                    enableSubmit()
                });
            }
        }
    });
}());


