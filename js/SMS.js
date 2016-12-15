(function(){
    $(function() {
        var $table,
            selections = [],
            $container, //默认进入页面下表，即occupation默认进入页面
            onameList = [];
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var $tableSMSDetail = $('#SMS-table');
        var act;
        var SMSID;
//        var SMSNAME;

        $(document).on("click", "#add", function() {
            initSMSAdd();
        });
        $(document).on("click", "#reply", function() {
            initSMSReply();
            initTimepicker();
            sySms();
        });
        $(document).on("click", "#back", function() {
            initSMSIndex();
            initTimepicker();
            sySms();
        });
        $(document).on("click", "#cancel", function() {
            initSMSIndex();
            initTimepicker();
            sySms();
        });
        $(document).on("click", ".SMSDetail", function() {
            initSMSDetail($(this).attr('data-id'));
            initTimepicker();
            sySms();
        });

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
                    console.log(data.rows);
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

        function initSMSAdd(){
            //页面初始化
            var $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-add.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            //加载所有会员数据
            var selections = [],//临时选择数组
                unSelected = [],//未选中人员数组
                selected = [],//已选中人员数组
                fastGroup = [],
                textCount = 0,//输入文本字数
                personCount = 0,//已选中人员数量
                SMSCount = 0,//短信数量
                $tableMembers = $('#table-members'),
                $tableSelected = $('#members-selected');
            $fasterFlier = $('#fast-fliter');

            $.ajax({
                url: basePath + "/admin/member/serchAllMember.shtml",
                async: false,
                dataType:"json",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    unSelected = data.rows;
                }
            })

            //获取成员职务列表信息
            outputOnameList();
            console.log(outputOnameList())
            for(var j=0; j < onameList.length; j++){
                $fasterFlier.append('<li><a href="#" data-id="'+onameList[j].value+  '">' + onameList[j].text + '</a></li>');
            }

            //console.log(unSelected)
            initClockpicker();
            initTableMembers();
            initMembersSelected();

            //短信信息条填充

            $('#SMS-content').on('keyup', function(){
                textCount = $(this).val().length;
                $('#text-count').text(textCount)

                SMSCount = parseInt(textCount/56)+1

                $('#SMS-count').text(SMSCount)
            });

            function refreshPersonCount(){
                personCount = selected.length;
                $('#person-count').text(selected.length)
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
                /*if($('#timer').hasClass('active')){
                 console.log($('#timer-time').val())
                 }*/

                if($('#SMS-content').val() == ""){
                    toastr.warning('短信内容不能为空!');
                }else if($('.select-person').children().length == 0){
                    toastr.warning('人员不能为空!');
                }else{
                    $(this).attr('disabled', 'disabled');
                    $(this).text('发送中...');
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

                    var content = $('#SMS-content').val();
                    $.ajax({
                        url: basePath + '/admin/sms/sendSMS.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{MEMBERIDS:MEMBERIDS,MEMBERMOBILES:MEMBERMOBILES,COUNT:count,SMSCONTENT:content,INFCOUNT:SMSCount,TASTTIME:$('#timer-time').val()},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                toastr.success('发送成功!');
                                initSMSIndex();
                            }else{
                                toastr.error(data.errMsg);
                                $('#sure').removeAttr('disabled');
                                $('#sure').text('确定');
                            }
                        },
                        error: function(msg){
                            toastr.error('操作失败，请联系管理人员！');
                            $('#sure').removeAttr('disabled');
                            $('#sure').text('确定');
                        }
                    });
                }

            });
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
                todayDate += d+" ";
                var h = mydate.getHours();
                h=h>9?h:"0"+h;
                todayDate += h+":";
                var m = mydate.getMinutes();
                m=m>9?m:"0"+m;
                todayDate += m;
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

                        refreshPersonCount();
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
                    pageSize: 50,
                    pageList: [15, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    maintainSelected:true,
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
                        console.log('hahah')
                        $add.show();
                    } else {
                        $add.hide();
                    }
                    selections  = getIdSelections();
                });
                /*精确添加中的人员选择添加*/
                //往已选数据对象组里填充添加的数据，同时移除表格数据
                $add.click(function () {
                    selected = selected.concat(getRowSelections());
                    $tableSelected.bootstrapTable('load', selected);
                    $tableMembers.bootstrapTable('remove', {
                        field: 'USID',
                        values: selections
                    });
                    //console.log(selections)
                    $add.hide();
                    labelCreate();
                });
                /*快速添加中的人员选择添加*/
                $(document).on('click', '#fast-fliter > li a', function(){


                    var tempOID = $(this).attr('data-id');

                    for(var n=0; n < unSelected.length; n++){
                        //console.log(unSelected[n].OIDS)
                        if(typeof(unSelected[n].OIDS) !== "undefined"){
                            var tempOIDS = unSelected[n].OIDS.split(",");
                            //console.log(tempOIDS)
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
        }


        //上一条
        $(document).on("click", "#info-pre", function() {
            initSMSInfoPreOrNext(SMSID,"front");
            SMSTableDetail();
        });
        //下一条
        $(document).on("click", "#info-next", function() {
            initSMSInfoPreOrNext(SMSID,"behind");
            SMSTableDetail();
        });
        function initSMSDetail(id){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $.ajax({
                url: basePath + "/admin/sms/getSmsDetailById.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SMSID:id},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){
                        SMSID = data.map.SMSID;
                        $("#SMS-quantity").html("发送数量："+data.map.SENDSMSCOUNT);
                        $("#SMS-receive").html(data.map.ADDRESSEECOUNT);
                        $("#SMS-send").html("发送人："+data.map.REALNAME);
                        $("#SMS-time").html("发布时间："+data.map.SENDTIME);
                        $("#SMS-success").html(data.map.SUCCESSCOUNT);
                        $("#SMS-fail").html(data.map.FALSECOUNT);
                        $(".text-indent-40").html(data.map.SMSMSG);
                    }
                }
            });
            SMSTableDetail();
            $(document).on("click", "#SMS-receive", function() {
                $('#reSend').hide();
                $('.modal-title').text("已接收名单");
               // SMSTableDetail();
                //findBySmsID(SMSID);
                $tableSMSDetail.bootstrapTable('refresh');
            });
            $(document).on("click", "#SMS-success", function() {
                $('#reSend').hide();
                $('.modal-title').text("成功名单");
                //SMSTableDetail();
               // findBySmsID(SMSID,"DELIVRD");
                act = "DELIVRD";
                $tableSMSDetail.bootstrapTable('refresh');
            });
            $(document).on("click", "#SMS-fail", function() {
                $('#reSend').show();
                $('.modal-title').text("失败名单");
                act = "SUBMIT";
                $tableSMSDetail.bootstrapTable('refresh');
            });
            //重新发送
            $("#reSend").click(function(){
                repeatSend(SMSID,"SUBMIT");
            });

        /*    function findBySmsID (id,act){
                console.log(id);
                console.log(act);
                $.ajax({
                    url: basePath + '/admin/sms/smsFindBySmsid.shtml',
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data:{SMSID:id,ACT:act},
                    dataType:"json",
                    success: function (data) {
                        if(data.status == 0){
                            //  var $tableSMSDetail = $('#SMS-table');
                            //$tableSMSDetail.bootstrapTable('load',data);
                            $tableSMSDetail.bootstrapTable('refresh');
                        }
                    }
                });
            }*/

        }
        function SMSTableDetail(){
            $tableSMSDetail = $('#SMS-table');
            $tableSMSDetail.bootstrapTable({
                url: basePath + '/admin/sms/smsFindBySmsid.shtml',
                idField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 480,
                pageSize: 8,//单页记录数
                pageList: [8, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "left",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    params.SMSID = SMSID;
                    params.ACT = act;
                    return params;
                },
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
                }]
            });

        }
        function repeatSend(id,act){
            $.ajax({
                url: basePath + "/admin/sms/repeatSend.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SMSID:id,ACT:act},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){
                        $("#reSend").attr("disabled",true);
                        toastr.success("发送成功！");

                    }else{
                        toastr.error(data.errMsg);

                    }
                }
            });
        }
        function initSMSInfoPreOrNext(id,act){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $.ajax({
                url: basePath + "/admin/sms/findFrontOrBehindById.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SMSID:id,ACT:act},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){
                        SMSID = data.map.SMSID;
                        $("#SMS-quantity").html("发送数量："+data.map.SENDSMSCOUNT);
                        $("#SMS-receive").html(data.map.ADDRESSEECOUNT);
                        $("#SMS-send").html("发送人："+data.map.REALNAME);
                        $("#SMS-time").html("发布时间："+data.map.SENDTIME);
                        $("#SMS-success").html(data.map.SUCCESSCOUNT);
                        $("#SMS-fail").html(data.map.FALSECOUNT);
                        $(".text-indent-40").html(data.map.SMSMSG);
                        $("#SMS-mag").html(data.mag);
                    }
                }
            });
        }

        function initSMSReply(){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-reply.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
            initTimepicker();
            resetSMSReply();

        }
        function resetSMSReply(){
            $('#reset').click(function(){
                $('input').val("");
                $table.bootstrapTable('refresh')
                //initSMSReply();
            });
        }
        function resetSMSIndex(){
            $('#reset').click(function(){
                $('input').val("");
                $table.bootstrapTable('refresh')
                //initSMSIndex();
            });
        }


        function initSMSIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
            initTimepicker();
            sySms();
            resetSMSIndex();
        }

        //短信剩余条数
        function sySms(){
            $.ajax({
                url: basePath + '/admin/sms/smsFindByPropertyPage.shtml',
                dataType: 'json',
                type: 'post',
                data:{},
                traditional: true,
                success:function(data){
                    if(data.status == "0"){
//	                	SMSNAME = "【"+data.smsConfig.SMSNAME+"】";


                        var SMSstatus = data.smsConfig.SMSUSEDCOUNTS/data.smsConfig.SMSALLCOUNTS*100;
                        var div="";
                        if(SMSstatus > 75){
                            div = "<div class='sms-progress-bar progress-bar progress-bar-danger' role='progressbar' aria-valuenow='"+data.smsConfig.SMSUSEDCOUNTS+"' aria-valuemin='"+0+"' aria-valuemax='"+data.smsConfig.SMSALLCOUNTS+"' style='width: "+SMSstatus+"%;'>"
                                +data.smsConfig.SMSUSEDCOUNTS+"/"+data.smsConfig.SMSALLCOUNTS
                                +"</div>";
                        }else if(SMSstatus > 50){
                            div = "<div class='sms-progress-bar progress-bar progress-bar-warning' role='progressbar' aria-valuenow='"+data.smsConfig.SMSUSEDCOUNTS+"' aria-valuemin='"+0+"' aria-valuemax='"+data.smsConfig.SMSALLCOUNTS+"' style='width: "+SMSstatus+"%;'>"
                                +data.smsConfig.SMSUSEDCOUNTS+"/"+data.smsConfig.SMSALLCOUNTS
                                +"</div>";
                        }else {
                            div = "<div class='sms-progress-bar progress-bar progress-bar-success' role='progressbar' aria-valuenow='"+data.smsConfig.SMSUSEDCOUNTS+"' aria-valuemin='"+0+"' aria-valuemax='"+data.smsConfig.SMSALLCOUNTS+"' style='width: "+SMSstatus+"%;'>"
                                +data.smsConfig.SMSUSEDCOUNTS+"/"+data.smsConfig.SMSALLCOUNTS
                                +"</div>";

                        }

                        $(".sms-progress").html(div);
                    }
                },
                error: function(msg){
                    toastr.error('操作失败!');

                }
            });
        }

        initSMSIndex();

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

        /*
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable1(checkSendStartTime,checkSendEndTime) {
            $table = $('#table');
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/sms/smsFindByPropertyPage.shtml',
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: false,
                height: 601,
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                pageList: [12, 25, 50, 100],//分页步进值
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    params.checkSendStartTime = checkSendStartTime;
                    params.checkSendEndTime = checkSendEndTime;
                    return params;
                },
                searchOnEnterKey: false,//回车搜索
                showRefresh: true,//刷新按钮
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'SMSMSG',
                    title: '短信内容',

                    formatter: SMSFormatter,
                    align: 'center'
                }, {
                    field: 'ADDRESSEECOUNT',
                    title: '发送人数',

                    align: 'center'
                }, {
                    field: 'SENDTIME',
                    title: '开始时间',

                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '发送人',

                    align: 'center'
                }]
            });


            function SMSFormatter(value, row){
                return '<a href="#" class="SMSDetail" data-id="' + row.SMSID + '">' + value + '</a>';
            }

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
            })
            $delete.click(function () {
                var ids = getIdSelections();
                id = ""+ids;


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
                                url: basePath + '/admin/sms/deleteSms.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{"SMSIDS":id},
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        toastr.success('删除成功!');

                                        $delete.hide();
                                        $table.bootstrapTable('refresh');
                                    }else{
                                        toastr.error('删除失败!');

                                    }
                                },
                                error: function(msg){
                                    toastr.error('删除失败!');
                                }
                            });

                        }
                    }
                });

//                $table.bootstrapTable('remove', {
//                    field: 'SMSID',
//                    values: ids
//                });
            });
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.SMSID
                });
            }
        }

        //查找
        $(document).on("click", "#search", function() {
            var checkSendStartTime = $("#checkSendStartTime").val();
            var checkSendEndTime = $("#checkSendEndTime").val();
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1(checkSendStartTime,checkSendEndTime);
            $("#checkSendStartTime").val(checkSendStartTime);
            $("#checkSendEndTime").val(checkSendEndTime);
            initTimepicker();
            sySms();
            resetSMSIndex();
        });

        function initTable2(checkSendStartTime,checkSendEndTime) {
            $table = $('#table');
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/sms/findreplySms.shtml',
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: false,
                height: 601,
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                pageList: [12, 25, 50, 100],//分页步进值
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    params.checkSendStartTime = checkSendStartTime;
                    params.checkSendEndTime = checkSendEndTime;
                    return params;
                },
                searchOnEnterKey: false,//回车搜索
                showRefresh: true,//刷新按钮
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'SRCMOBILENAME',
                    title: '发送人',

                    align: 'center'
                }, {
                    field: 'MSGCONTENT',
                    title: '短信内容',

                    align: 'center'
                }, {
                    field: 'RECVTIOME',
                    title: '发送时间',

                    align: 'center'
                }]
            });

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
            })
            $delete.click(function () {
                var ids = getIdSelections();
                id = ""+ids;
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
                                url: basePath + '/admin/sms/deleteSmsReport.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{"RID":id},
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        toastr.success('删除成功!');

                                        $delete.hide();
                                        $table.bootstrapTable('refresh');
                                    }else{
                                        toastr.error('删除失败!');
                                    }
                                },
                                error: function(msg){
                                    toastr.error('删除失败!');
                                }
                            });

                        }
                    }
                });


//                $table.bootstrapTable('remove', {
//                    field: 'RID',
//                    values: ids
//                });
                $delete.hide();
            });
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.RID
                });
            }
        }
        //短信回复查找
        $(document).on("click", "#searchReply", function() {
            var checkSendStartTime = $("#checkSendStartTime").val();
            var checkSendEndTime = $("#checkSendEndTime").val();
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/SMS-reply.html?a=1",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2(checkSendStartTime,checkSendEndTime);
            $("#checkSendStartTime").val(checkSendStartTime);
            $("#checkSendEndTime").val(checkSendEndTime);
            initTimepicker();
            sySms();
            resetSMSReply();
        });
    });
}());


