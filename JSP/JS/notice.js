(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

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
            initTableDetail();

            //调出已报名
            $('#notice-entered').click( function() {
                $.ajax({
                    url: basePath + "/data/occupation.json",//获取已报名数据
                    async: true,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $tableDetail.bootstrapTable('load', data);
                        $tableDetail.bootstrapTable('hideColumn', 'state');
                    }
                });
            });
            //调出未报名
            $('#notice-unknown').click( function() {
                $.ajax({
                    url: basePath + "/data/notice-detail.html",//获取已报名数据
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $tableDetail.bootstrapTable('load', data);
                        $tableDetail.bootstrapTable('hideColumn', 'state');
                    }
                });
            });

            //调出不报名
            $('#notice-unenter').click( function() {
                $.ajax({
                    url: basePath + "/data/notice-detail.html",//获取已报名数据
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $tableDetail.bootstrapTable('load', data);
                        $tableDetail.bootstrapTable('hideColumn', 'state');
                    }
                });
            });
            //调出未查看
            $('#notice-unnotice').click( function() {
                $.ajax({
                    url: basePath + "/data/notice-detail.html",//获取已报名数据
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $tableDetail.bootstrapTable('load', data);
                        $tableDetail.bootstrapTable('showColumn', 'state');

                    }
                });
            });
            //调出通知人数
            $('#notice-persons').click( function() {
                $.ajax({
                    url: basePath + "/data/notice-detail.html",//获取已报名数据
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $tableDetail.bootstrapTable('load', data);
                        $tableDetail.bootstrapTable('hideColumn', 'state');
                    }
                });
            });
            //人数表格模板
            function initTableDetail(){
                    $tableDetail = $('#notice-table');
                    $send = $('#send');
                    $tableDetail.bootstrapTable({
                        //url: basePath+'/admin/notice/noticeFindPage.shtml',
                        method: "post",
                        datatype: 'json',
                        height: 400,
                        dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                        pagination: true,//是否分页
                        pageSize: 12,//单页记录数
                        pageList: [12, 25, 50, 100],//分页步进值
                        sidePagination: "server",//服务端分页
                        contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                        columns: [{
                            field: 'state',
                            checkbox: true,
                            visiable: false
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
                    showColumns: true,//列选择按钮
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
                    return '<a href="#" class="noticeDetail" data-id="' + row.INID + '">' + value + '</a>';
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
            $('#notice-save').click(function () {
                {
                    var content = $('#newNotice').summernote('code');
                    console.log(content);

                }
            });

            //加载所有会员数据
            var selections = [],//临时选择数组
                unSelected = [],//未选中人员数组
                selected = [],//已选中人员数组
                textCount = 0,//输入文本字数
                personCount = 0,//已选中人员数量
                SMSCount = 0,//短信数量
                $tableMembers = $('#table-members'),
                $tableSelected = $('#members-selected');

            $.ajax({
                url: basePath + "/admin/member/serchAllMember.shtml",
                async: false,
                dataType:"json",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {

                    unSelected = data.rows;

                    //$('.dropdown-menu').append()
                    // initTableMembers();
                    // $tableMembers.bootstrapTable('load', data)
                }
            }).done(function (data) {
                // unSelected = data;
            });

            //console.log(unSelected)
            initClockpicker();
            initTableMembers();
            initMembersSelected();

            //短信信息条填充

            $('#SMS-content').on('keyup', function(){
                textCount = $(this).val().length;
                $('#text-count').text(textCount)
                refreshSMSCount()
            });

            function refreshPersonCount(){
                personCount = selected.length;
                $('#person-count').text(selected.length)
                refreshSMSCount()
            }
            function refreshSMSCount(){
                if (textCount <= 491){
                    SMSCount = personCount
                }else{
                    SMSCount = parseInt(textCount/491)*personCount
                }
                $('#SMS-count').text(SMSCount)

            }
            //定时操作
            $('#timer').click(function () {
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('.date').fadeOut()
                }else {
                    $(this).addClass('active');
                    $('.date').fadeIn()
                    initDate()
                }
            });

            //确认操作

            $('#sure').click(function() {
                console.log(selected)
                console.log(textCount)
                console.log(personCount)
                console.log($('#SMS-content').val())//短信内容
                if($('#timer').hasClass('active')){
                    console.log($('#timer-time').val())
                }

                var MEMBERIDS = "";
                var MEMBERMOBILES = "";
                var count = 0;
                if(selected.length == 0){
                    for(var i=0; unSelected.length > i; i++){
                        MEMBERIDS += unSelected[i].USID + ",";
                        MEMBERMOBILES += unSelected[i].MOBILE + ",";
                        count = i+1;
                    }
                }else{
                    for(var i=0; selected.length > i; i++){
                        MEMBERIDS += selected[i].USID + ",";
                        MEMBERMOBILES += selected[i].MOBILE + ",";
                        count = i+1;
                    }
                }
                MEMBERIDS = MEMBERIDS.substring(0,MEMBERIDS.length-1);
                MEMBERMOBILES = MEMBERMOBILES.substring(0,MEMBERMOBILES.length-1);

                if($('#SMS-content').val() == ""){
                    alert("短信内容不能为空");
                    return;
                }
                var content = $('#SMS-content').val();
                $.ajax({
                    url: basePath + '/admin/sms/sendSMS.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{MEMBERIDS:MEMBERIDS,MEMBERMOBILES:MEMBERMOBILES,COUNT:count,SMSCONTENT:content,INFCOUNT:1,TASTTIME:$('#timer-time').val()},
                    traditional: true,
                    success:function(data){
                        if(data.status == "0"){
                            alert("发送成功！");
                        }else{
                            alert(data.errMsg);
                        }
                    },
                    error: function(msg){
                        alert("操作失败，请联系管理人员！");
                    }
                });
            });
            /*
             *  功能：获取当前时间并对选择器赋值
             *  Created by nocoolyoyo 2016/10/10.
             */
            function initDate(){
                var mydate = new Date();
                var todayDate = "" + mydate.getFullYear() + "-";
                todayDate += (mydate.getMonth()+1) + "-";
                todayDate += mydate.getDate()+ " ";
                todayDate += mydate.getHours()+ ":";
                todayDate += mydate.getMinutes();
                $('#timer-time').val(todayDate);
            }

            //清空操作
            $(document).on("click", ".clear", function() {
                unSelected = selected.concat(unSelected);
                $tableMembers.bootstrapTable('load', unSelected);
                $tableMembers.bootstrapTable( 'uncheckAll');
                selected = [];
                labelCreate();
                $tableSelected.bootstrapTable('load', selected);
                refreshPersonCount()

            });

            /*模态框表格窗口修正*/
            $('#select-modal').on('shown.bs.modal', function () {
                $tableMembers.bootstrapTable('resetView');
                $tableSelected.bootstrapTable('resetView');
            });

            //时间选择初始化
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
                refreshPersonCount();
            }
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
                // $tableSelected.bootstrapTable('remove', {
                //     field: 'USID',
                //     values: removeSelect
                // });
            });
            function initTableMembers(){
                var $add = $('#members-add');
                $tableMembers.bootstrapTable({
                    // idField: "id",
                    data: unSelected,
                    pageSize: 9,
                    pageList: [12, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    toolbar: "#table-toolbar",
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
                        console.log('hahah')
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
                    showColumns: true,//列选择按钮
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


