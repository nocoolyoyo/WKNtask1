var occupation = function(){
        var $table,
            selections = [],
            onameList = [],
            $container = $("#main-box");
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        //默认页面初始化
        
        initHYXX();
 
        /*
         *  功能：occupation页面导航
         *  Created by nocoolyoyo 2016/10/08.
         */
       $(document).on("click", "#side-menu > li", function() {
            switch ($(this).index()) {
                case 0: initHYXX();break;
                case 1: initZWGL();break;
                case 2: initQLGL();break;
                case 3: initWJH() ;break;
                case 4: initQGL() ;break;
            }
        });
   
        /*
         *  功能：侧边栏初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initSidebar(){
            $('#sidebar-switch').on('click touchstart',function() {
                $('#sidebar-left').toggleClass('active');
                $('#content-area').toggleClass('inner');
                $('.content-area-box').toggleClass('inner');
                $table.bootstrapTable('resetView');
            });

            //$('.sidebar-overlay').on('click touchstart',function() {
            //    $('.sidebar,.sidebar-container').removeClass('active');
            // });
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
        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initHYXX(){
            $.ajax({
                url: basePath + "/data/occupation-HYXX.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);                
                }
            });
         
            initTable1();
            initSidebar();
            initTimepicker();

            function initTable1() {
                $table = $('#table');
                var $delete = $('#delete');
                var $add = $('#add');
                var $export = $('#export');
                var $fasterFlier = $('#fast-fliter');
                //initOnameList();
                onameList = [];
                outputOnameList();
                function initOnameList(){
                    $fasterFlier.append('<li><a href="#" data-id="">取消职务查找</a></li>');
                    for (var i=0; i<onameList.length; i++){
                        $fasterFlier.append('<li id="'+ onameList[i].value+'"><a href="#" data-id="' + onameList[i].value+ '">' + onameList[i].text + '</a></li>');
                    }
                    return onameList;
                }

                var OCCUPATIONID;
                //点击快速查询赛选
                $(document).on('click', '#fast-fliter > li > a',function () {
                    $("#"+$(this).attr('data-id')).attr("check","true");
                    OCCUPATIONID = $(this).attr('data-id');
                    $table.bootstrapTable('refresh',{url:basePath+'/admin/member/serchAllMember.shtml?OCCUPATIONID='+$(this).attr('data-id')});
                })
                $table.bootstrapTable({
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    url: basePath+'/admin/member/serchAllMember.shtml',
                    height: 601,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    pageList: [12,25,50,100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    dataType: "json",//期待返回数据类型
                    method: "post",//请求方式

                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.OCCUPATIONID = OCCUPATIONID;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    // detailFormatter: detailFormatter,
                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'REALNAME',
                        title: '姓名',
                        events: "editEvents",
                        formatter: editFormatter,
                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号',
                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '所在单位',
                        align: 'center'
                    }, {
                        field: 'COMPANYWORK',
                        title: '单位职务',
                        align: 'center'
                    },{
                        field: 'OIDS',
                        title: '商会职务',
                        align: 'center',
                        editable: {
                            type: 'checklist',
                            title: '商会职务',
                            emptytext: '-',
                            //placement: 'bottom',
                            mode: 'inline',
                            display: function(value, sourceData) {
                                var html = [],
                                    checked = $.fn.editableutils.itemsByValue(value, sourceData);
                                if(checked.length) {
                                    $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
                                    $(this).html(html.join(', '));
                                } else {
                                    $(this).empty();
                                }
                            },//横向逗号分开显示，不然就是纵向行显示
                            send: 'auto',//当PK和URL设置时，值改变会自动发送
                            params: function(params) {
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');
                                params.USERNAME = data[index].USERNAME;

                                params.OIDS = params.value+"";
                                return params;
                            },
                            url: basePath+'/admin/member/saveOMemberRelation.shtml',//服务器接收改变值的URL
                            source: initOnameList(),
                            error:function(response,newValue){
                                if(response.status === 5000){
                                    return '服务暂时无法使用';
                                }else{
                                    return response.responseText;
                                }
                            }
                        }

                    }, {
                        field: 'BOOKSORT',
                        title: '通讯录排序',
                        align: 'center',
                        editable: {
                            type: 'text',
                            title: '通讯录排序',
                            emptytext: '-',
                            //pk: 1,//主键ID
                            params: function(params) {
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');
                                params.USERNAME = data[index].USERNAME;
                                params.BOOKSORT = params.value+"";
                                return params;
                            },
                            url: basePath+'/admin/member/updateBookSort.shtml',  //修改后发送的地址
                            send: 'auto',  //当PK和URL设置时，值改变会自动发送
                            mode: 'inline',
                            inputclass: 'input-booksort',
                            success: function(response, newValue) {
                                $table.bootstrapTable('refresh');
                            },
                            validate: function (value) {
                                value = $.trim(value);
                                console.log(!value);
                                var re = /^[1-9]*[1-9][0-9]*$/;
                                if(value && !re.test(value)){
                                    return '请输入数字！';
                                }
                            }
                        }
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
                    //selections = getIdSelections();

                });
                $table.on('page-change.bs.table', function(){
                    $delete.hide();
                })
                $table.on('refresh.bs.table', function(){
                    $delete.hide();
                })
                //会员新增
                $add.click(function (){

                    initHYXXAdd();
                    //window.location.href = basePath+"/admin/url/occupationProfile.shtml";
                });

                //导出会员列表
                $export.click(function (){
                    bootbox.confirm({
                        size: "small",
                        message: "确认导出?",
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
                                window.location.href = basePath+"/admin/member/querySendMemberExcel.shtml";

                            }
                        }
                    })
                });

                //删除
                $delete.click(function () {
                    var ids = getIdSelections();
                    for (var i=0; i<ids.length; i++){
                        selections[i] = Number(ids[i]);
                    }
                    console.log(selections)
                    var id = ""+ids;

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
                                    url: basePath + '/admin/member/deleteByMember.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"CHECKBOXID":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            //alert("删除成功!");

                                            toastr.success("删除成功!");
                                            $delete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("删除失败!");
                                            //alert("操作失败，请联系管理人员！");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");
                                        //alert("操作失败，请联系管理人员！");
                                    }
                                });
                            }
                        }
                    })

                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USERNAME
                    });
                }

                /*
                 *  功能：编辑框
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                function editFormatter(value, row, index) {
                    return'<a class="edit" href="javascript:void(0)">'+ value + '</a>  ';
                }
                window.editEvents = {
                    'click .edit': function (e, value, row, index) {
                        //alert('You click like action, row: ' + JSON.stringify(row));
                        //alert(row.USERNAME);
                        initHYXXDetail(row.USERNAME)
                        // window.location.href = basePath+"/admin/url/occupationProfile.shtml?USERNAME="+row.USERNAME;
                    },
                    'click .remove': function (e, value, row, index) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }
                };
                var POSITIONList = [];
                var POSITIONSelected = [];
                //var tempPOSITIONSelect = [];
                function initHYXXDetail(id){
                    var $container = $("#main-box");
                    $.ajax({
                        url: basePath + "/data/occupation-HYXX-detail.html",
                        async: false,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            $container.html(data);
                        }
                    });
                    $(".reveal-show").attr("src",basePath+"/img/image.png");
                    initTimepicker();
                    $.ajax({
                        url: basePath+'/admin/member/showMessage.shtml',
                        dataType: 'json',
                        type: 'post',
                        async: false,
                        data:{"USERNAME":id},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                //document.getElementById('MOBILE').disabled = true;
                                $("#image").attr("src",data.list[0].IMAGE);
                                document.getElementById("MOBILE").readOnly=true;
                                $("#MOBILE").val(data.list[0].MOBILE);
                                $("#REALNAME").val(data.list[0].REALNAME);
                                var gender = data.list[0].GENDER;
                                if(gender == 2){
                                    $("input[name='GENDER']").eq(1).attr("checked","checked");
                                    $("input[name='GENDER']").eq(2).removeAttr("checked");
                                    $("input[name='GENDER']").eq(1).click();
                                }else{
                                    $("input[name='GENDER']").eq(1).removeAttr("checked");
                                    $("input[name='GENDER']").eq(2).attr("checked","checked");
                                    $("input[name='GENDER']").eq(2).click();
                                }
                                var political = data.list[0].POLITICAL;
                                if(political == 1){
                                    $("input[name='POLITICAL']").eq(0).removeAttr("checked");
                                    $("input[name='POLITICAL']").eq(1).attr("checked","checked");
                                    $("input[name='POLITICAL']").eq(1).click();
                                }else{
                                    $("input[name='POLITICAL']").eq(0).attr("checked","checked");
                                    $("input[name='POLITICAL']").eq(1).removeAttr("checked");
                                    $("input[name='POLITICAL']").eq(0).click();
                                }
                                $("#BIRTHDAY").val(data.list[0].BIRTHDAY);
                                $("#IDCARD").val(data.list[0].IDCARD);
                                $("#JOINDATE").val(data.list[0].JOINDATE);
                                $("#FEEAMOUNT").val(data.list[0].FEEAMOUNT);
                                $("#FEEDATE").val(data.list[0].FEEDATE);
                                $("#FEEDATEEND").val(data.list[0].FEEDATEEND);
                                $("#RESIDE").val(data.list[0].RESIDE);
                                $("#NATIVEINFO").val(data.list[0].NATIVEINFO);
                                $("#PHONE").val(data.list[0].MOBILE);
                                $("#FAX").val(data.list[0].FAX);
                                $("#FIXEDTELEPHONE").val(data.list[0].FIXEDTELEPHONE);
                                $("#EMAIL").val(data.list[0].EMAIL);
                                $("#QQ").val(data.list[0].QQ);
                                $("#COMPANY").val(data.list[0].COMPANY);
                                $("#COMPANYWORK").val(data.list[0].COMPANYWORK);
                                $("#COMPANYMONEY").val(data.list[0].COMPANYMONEY);
                                $("#SETUPDATE").val(data.list[0].SETUPDATE);
                                $("#COMPANYWEB").val(data.list[0].COMPANYWEB);

                                //console.log(data.list[0].POSITION =="");
                                //console.log(data.list[0].POSITION);
                                if(data.list[0].POSITION !== ""){
                                    POSITIONSelected = data.list[0].POSITION.split(",");
                                    $("#POSITION").val(data.list[0].POSITION);
                                }
                                $("#COMPANYADDRESS").val(data.list[0].COMPANYADDRESS);
                                $("#HOBBIES").val(data.list[0].HOBBIES);
                                $("#EDUCATION").val(data.list[0].EDUCATION);
                                $("#EXPERIENCE").val(data.list[0].EXPERIENCE);
                                $("#COMPANYINTRODUCTION").val(data.list[0].COMPANYINTRODUCTION);
                            }else{
                                alert("操作失败，请联系管理人员！");
                            }
                        },
                        error: function(msg){
                            alert("操作失败，请联系管理人员！");
                        }
                    });
                    initSidebar();
                    $('#sa').click(function(){
                        save();
                    });
                    $('#back').click(function(){
                        initHYXX();
                    });
                    //账号手机数据绑定
                    $('#MOBILE').bind('input propertychange', function () {
                        $('#PHONE').val($(this).val());
                    });
                    $('#PHONE').bind('input propertychange', function(){
                        $('#MOBILE').val($(this).val());
                    });

                    function save(){
                        var MOBILE = $("#MOBILE").val();
                        if(MOBILE == ""){
                            toastr.warning("账号不能为空!");
                            return;
                        }
                        var REALNAME = $("#REALNAME").val();
                        if(REALNAME == ""){
                            toastr.warning("姓名不能为空!");
                            return;
                        }
                        var PHONE = $("#PHONE").val();
                        if(PHONE == ""){
                            toastr.warning("手机不能为空!");
                            return;
                        }
                        var PHONE = $("#PHONE").val();
                        if (PHONE != "") {
//                            var p3 = /^1[3|4|5|7|8][0-9]\d{4,9}$/;
                            var p3 = /^[0-9]*$/;
                            if (p3.test(PHONE) == false) {
                                toastr.warning("请输入正确手机号");
                                return;
                            }
                            if(PHONE.length!=11&&MOBILE.length!=12){
                                toastr.warning("请输入正确手机号");
                                return;
                            }
                        }
                        //缴费时间,
                        var payTime=$.trim($("#FEEDATE").val().toString().replace(/\//g,"-"));
                        //到期时间
                        var endTime=$.trim($("#FEEDATEEND").val().toString().replace(/\//g,"-"));
                        //缴费数额
                        var payAmount=$.trim($("#FEEAMOUNT").val());
                        if((payAmount=="" || payTime=="" || endTime=="") &&　(payAmount!="" || payTime!="" || endTime!="")){
                            toastr.warning("缴费时间，缴费数额以及到期时间为捆绑项，全部填写或全不填写，且缴费时间必须小于到期时间");
                            return ;
                        }
                        if((payAmount!="" && payTime!="" && endTime!="") && (endTime<=payTime)){
                            toastr.warning("缴费时间必须小于到期时间");
                            return ;
                        }
                        if ($.trim(payAmount) != "" && payAmount.length > 0) {
                            if (isNaN(payAmount)) {
                                toastr.warning("*缴费数额只能是数字！");
                                return;
                            }
                            if (payAmount.length > 6) {
                                toastr.warning("*缴费数额超出范围！");
                                return;
                            }
                            if(payAmount==0){
                                toastr.warning("*缴费数额不能为零！");
                                return;
                            }
                            if(payAmount<0){
                                toastr.warning("*缴费数额不能是负数！");
                                return;
                            }
                        }
                        //单位资产
                        var companyAssets=$.trim($("#COMPANYMONEY").val());
                        if ($.trim(companyAssets) != "" && companyAssets.length > 0) {
                            if (isNaN(companyAssets)) {
                                toastr.warning("*资产只能是数字！");
                                return;
                            }
                            if (companyAssets.length > 8) {
                                toastr.warning("*资产超出范围！");
                                return;
                            }
                            if(companyAssets<0){
                                toastr.warning("*资产不能是负数！");
                                return;
                            }
                        }
                        document.getElementById("sa").disabled=true;

                        $.ajax({
                            url: basePath+'/admin/member/updateUserMember.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:$('#addform').serialize(),
                            success:function(data){
                                if(data.status == "0"){
                                    toastr.success("修改成功!");
                                    initHYXX();
                                    //window.location.href="<%=basePath%>admin/url/occupation.shtml";
                                }else{
                                    toastr.error("操作失败，请联系管理人员！");
                                    document.getElementById("sa").disabled=false;
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                                document.getElementById("sa").disabled=false;
                            }
                        });

                    }
                    var logUrl = "";
                    $("#upLoadImg").on("change", function(){
                        ajaxfileup();
                    });
                    //增加上传图片
                    function ajaxfileup(){
                        var form = document.getElementById("addform");
                        //截取提交上传文件的扩展名
                        var ext = form.upLoadImg.value.match(/^(.*)(\.)(.{1,8})$/)[3];
                        ext = ext.toLowerCase(); //设置允许上传文件的扩展名
                        if (ext !=  "jpg" && ext != "gif" && ext!="png") {
                            toastr.error("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
                            return false;
                        }
                        $.ajaxFileUpload({
                            url: basePath+'/admin/upload.shtml?savePath=memberImage',
                            secureuri: false, //一般设置为false
                            fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                            dataType: 'json', //返回值类型，一般设置为json、application/json
                            type : 'post',
                            contentType: "application/json; charset=utf-8",//此处不能省略
                            success: function(data, status){
                                if (data.status=="0") {
                                    logUrl = data.slturl;
//        	                        original = data.original;
                                    $(".reveal-show").attr("src",logUrl);
                                    $("#IMAGE").val(logUrl);
                                    $("#upLoadImg").on("change", function(){
                                        ajaxfileup();
                                    });
                                }
                            },
                            error: function(data, status, e){alert(12);
                                toastr.error(e);
                            }
                        });
                    }
                    initPOSITIONSelect();
                }
                function initHYXXAdd(){
                    var $container = $("#main-box");
                    $.ajax({
                        url: basePath + "/data/occupation-HYXX-detail.html",
                        async: false,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            $container.html(data);
                        }
                    });
                    initSidebar();
                    initTimepicker();
                    $(".reveal-show").attr("src",basePath+"/img/image.png");
                    $('#sa').click(function(){
                        save();

                    });
                    $('#back').click(function(){
                        initHYXX();
                    });
                    var logUrl = "";
                    $("#upLoadImg").on("change", function(){
                        ajaxfileup();
                    });
                    //增加上传图片
                    function ajaxfileup(){
                        var form = document.getElementById("addform");
                        //截取提交上传文件的扩展名
                        var ext = form.upLoadImg.value.match(/^(.*)(\.)(.{1,8})$/)[3];
                        ext = ext.toLowerCase(); //设置允许上传文件的扩展名
                        if (ext !=  "jpg" && ext != "gif" && ext!="png") {
                            toastr.error("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
                            return false;
                        }
                        $.ajaxFileUpload({
                            url: basePath+'/admin/upload.shtml?savePath=memberImage',
                            secureuri: false, //一般设置为false
                            fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                            dataType: 'json', //返回值类型，一般设置为json、application/json
                            type : 'post',
                            contentType: "application/json; charset=utf-8",//此处不能省略
                            success: function(data, status){
                                if (data.status=="0") {
                                    logUrl = data.slturl;
//        	                        original = data.original;
                                    $(".reveal-show").attr("src",logUrl);
                                    $("#IMAGE").val(logUrl);
                                    $("#upLoadImg").on("change", function(){
                                        ajaxfileup();
                                    });
                                }
                            },
                            error: function(data, status, e){alert(12);
                                toastr.error(e);
                            }
                        });
                    }

                    //账号手机数据绑定

                    $('#MOBILE').bind('input propertychange', function () {
                        $('#PHONE').val($(this).val());
                    });
                    $('#PHONE').bind('input propertychange', function(){

                        $('#MOBILE').val($(this).val());
                    });
                    /* $('#MOBILE').on('keyup', function(){

                     $('#PHONE').val($(this).val());

                     });
                     $('#PHONE').on('keyup', function(){

                     $('#MOBILE').val($(this).val());

                     });*/

                    function save(){
                        var MOBILE = $("#MOBILE").val();
                        if(MOBILE == ""){
                            toastr.warning("账号不能为空!");
                            return;
                        }
                        var REALNAME = $("#REALNAME").val();
                        if(REALNAME == ""){
                            toastr.warning("姓名不能为空!");
                            return;
                        }
                        var PHONE = $("#PHONE").val();
                        if(PHONE == ""){
                            toastr.warning("手机不能为空!");
                            return;
                        }
                        var PHONE = $("#PHONE").val();
                        if (PHONE != "") {
                            var p3 = /^[0-9]*$/;
                            if (p3.test(PHONE) == false) {
                                toastr.warning("请输入正确手机号");
                                return;
                            }
                            if(PHONE.length!=11&&MOBILE.length!=12){
                                toastr.warning("请输入正确手机号");
                                return;
                            }
                        }
                        //缴费时间,
                        var payTime=$.trim($("#FEEDATE").val().toString().replace(/\//g,"-"));
                        //到期时间
                        var endTime=$.trim($("#FEEDATEEND").val().toString().replace(/\//g,"-"));
                        //缴费数额
                        var payAmount=$.trim($("#FEEAMOUNT").val());
                        if((payAmount=="" || payTime=="" || endTime=="") &&　(payAmount!="" || payTime!="" || endTime!="")){
                            toastr.warning("缴费时间，缴费数额以及到期时间为捆绑项，全部填写或全不填写，且缴费时间必须小于到期时间");
                            return ;
                        }
                        if((payAmount!="" && payTime!="" && endTime!="") && (endTime<=payTime)){
                            toastr.warning("缴费时间必须小于到期时间");
                            return ;
                        }
                        if ($.trim(payAmount) != "" && payAmount.length > 0) {
                            if (isNaN(payAmount)) {
                                toastr.warning("*缴费数额只能是数字！");
                                return;
                            }
                            if (payAmount.length > 6) {
                                toastr.warning("*缴费数额超出范围！");
                                return;
                            }
                            if(payAmount==0){
                                toastr.warning("*缴费数额不能为零！");
                                return;
                            }
                            if(payAmount<0){
                                toastr.warning("*缴费数额不能是负数！");
                                return;
                            }
                        }
                        //单位资产
                        var companyAssets=$.trim($("#COMPANYMONEY").val());
                        if ($.trim(companyAssets) != "" && companyAssets.length > 0) {
                            if (isNaN(companyAssets)) {
                                toastr.warning("*资产只能是数字！");
                                return;
                            }
                            if (companyAssets.length > 8) {
                                toastr.warning("*资产超出范围！");
                                return;
                            }
                            if(companyAssets<0){
                                toastr.warning("*资产不能是负数！");
                                return;
                            }
                        }
                        document.getElementById("sa").disabled=true;

                        $.ajax({
                            url: basePath+'/admin/member/addMember.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:$('#addform').serialize(),
                            success:function(data){
                                if(data.status == "2"){
                                    toastr.warning("会员已存在!");
                                    document.getElementById("sa").disabled=false;
                                    return;
                                }else if(data.status == "0"){
                                    toastr.success("保存成功!");
                                    initHYXX();
//        	        				window.location.href="<%=basePath%>admin/url/occupation.shtml";
                                }else{
                                    toastr.error("操作失败，请联系管理人员！");
                                    document.getElementById("sa").disabled=false;
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                                document.getElementById("sa").disabled=false;
                            }
                        });

                    }
                    initPOSITIONSelect();
                }
                function initPOSITIONSelect(){
                    $.ajax({
                        url: basePath + "/admin/member/findIndustry.shtml",
                        async: false,
                        dataType:"json",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            console.log(data.list);
                            for(var j=0; j < data.list.length; j++){
                                POSITIONList.push(data.list[j].NAME)
                            }
                        }
                    });
                    var positionContent = '';
                    for(var i=0; i < POSITIONList.length; i++){
                        var state = new Boolean(true);
                        for(var j=0; j < POSITIONSelected.length; j++){
                            if(POSITIONSelected[j] == POSITIONList[i]){
                                positionContent += '<div class="col-sm-4 top-9">'+
                                    '<a class="position-selection btn btn-primary form-control" >'+ POSITIONList[i]+'</a></div>';
                                state = false;
                            }
                        }
                        if(state == true){
                            positionContent += '<div class="col-sm-4 top-9">'+
                                '<a class="position-selection btn btn-default btn-inverted form-control" >'+ POSITIONList[i]+'</a></div>';
                        }
                    };

                    $('.position-modal-body').html(positionContent);

                    $('.position-selection').bind('click', function () {
                        //$(this).toggleClass('active');

                        //tempPOSITIONSelect = POSITIONSelected;

                        //console.log(POSITIONSelected);
                        if($(this).hasClass('btn-primary')){
                            $(this).removeClass('btn-primary').addClass('btn-default btn-inverted');
                            POSITIONSelected.splice(POSITIONSelected.indexOf($(this).text()),1) ;
                            //tempPOSITIONSelect.splice(tempPOSITIONSelect.indexOf($(this).text()),1) ;

                        }else{
                            $(this).removeClass('btn-default btn-inverted').addClass('btn-primary');
                            POSITIONSelected.push($(this).text());
                            // tempPOSITIONSelect.push($(this).text());
                        }
                        var tempHtml = '';
                        for(var i=0; i< POSITIONSelected.length; i++){
                            tempHtml +=POSITIONSelected[i]+',';
                        }
                        console.log(tempHtml)
                        $("#POSITION").val(tempHtml.substring(0,tempHtml.length-1));
                    });
                    /*$('#POSITION-sure').click(function(){
                     POSITIONSelected = tempPOSITIONSelect;
                     var tempHtml = '';
                     for(var i=0; i< POSITIONSelected.length; i++){
                     tempHtml +='<span>'+POSITIONSelected[i]+'  '+'</span>';
                     }
                     $("#POSITION").html(tempHtml);
                     })*/
                }
                /*
                 *  功能：会员导入
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                $('#file-import').fileinput({
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
                        var myArray = {"url":data.response.realUrl,"name":data.response.state};
                        console.log(myArray);
                        $.ajax({
                            type:'POST',
                            url: basePath+"/admin/member/importExcel.shtml",
                            data:myArray,
                            dataType:'json',
                            success: function (data){
                                //alert("导入成功");
                                if(data.status == 0){
                                    toastr.success("导入成功！");
                                    setTimeout(function (){window.location.href = basePath+"/admin/url/occupation.shtml";},1000);
                                }else{
                                    toastr.success(data.msg);
                                }
                            },
                            error: function(msg){
                                toastr.error("请求失败,请联系系统管理员！");
                                //alert(msg);
                                //alert("请求失败,请联系系统管理员");
                            }
                        });
                    }
                });
                //填写说明下载
                $("#explain").click(function(){
                    window.location.href = basePath + "/download/associationMemberExcel/Explain.doc";
                });
                //填写说明下载
                $("#member").click(function(){
                    window.location.href = basePath + "/download/associationMemberExcel/Member.xls";
                });
            }

        }
        //职务管理
        function initZWGL(){
            $.ajax({
                url: basePath + "/data/occupation-ZWGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            $table = $('#table');
            var $tablePermission = $('#table-permission'),
                $ZWGLDelete = $('#folder-delete');
            initTable2();
            initSidebar();
            function initTable2() {
                var selectItem = [],
                    checklistItem = [];
                $.ajax({
                    url: basePath + "/admin/member/memberRegistration.shtml",
                    dataType: 'json',
                    async : false,
                    success:function(data)
                    {
                        selectItem = data.mapList;
                    }
                });
                $.ajax({
                    url: basePath + "/data/occupation-checklist.json",
                    dataType: 'json',
                    async : false,
                    success:function(data)
                    {
                        checklistItem = data;
                    }
                });
                $table.bootstrapTable({
                    url: basePath+'/admin/member/occupationFindByPage.shtml',
                    method: "post",
                    datatype: 'json',
                    height: 601,
                    toolbar: "#table-toolbar",
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    pageList: [12, 25, 50, 100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮
                    showColumns: true,//列选择按钮

                    columns: [{
                        field: 'state',
                        checkbox: true
                    },{
                        field: 'ONAME',
                        title: '职务名称',
                        align: 'center',
                        editable: {
                            type: 'text',
                            title: '职务名称',
                            pk: 1,//主键ID
                            params: function(params) {
                                //originally params contain pk, name and value
                                //params.a = 1;
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');
                                console.log(data[index].OID);
                                console.log($(this).parents('tr').data('name'));
                                params.OID = data[index].OID;
                                return params;
                            },
                            url: basePath+'/admin/member/updateOccupation.shtml',  //修改后发送的地址
                            send: 'auto',  //当PK和URL设置时，值改变会自动发送
                            mode: 'inline',
                            success: function(response, newValue) {
                                $table.bootstrapTable('refresh');
                            },
                            validate: function (value) {
                                value = $.trim(value);
                                if (!value) {
                                    return '职务名不能为空！';
                                }
                            }
                        }
                    }, {
                        field: 'COUNTOCCUPATION',
                        title: '人员数',
                        formatter: function (value, row){
                            return '<a href="#" class="ZWGLmembers">'+value+'</a>'
                        },
                        events: 'ZWGLEvents',
                        align: 'center'
                    },  {
                        field: 'CREATETIME',
                        title: '创建时间',

                        align: 'center'
                    }, {
                        field: 'GRADE',
                        //field: 'STATUS',
                        title: '排序',
                        align: 'center',
                        editable: {
                            type: 'select',
                            title: '排序',
                            emptytext: '-',
                            display: '无',
                            mode: 'inline',
                            send: 'auto',//当PK和URL设置时，值改变会自动发送
                            params: function(params) {
                                //originally params contain pk, name and value
                                //params.a = 1;
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');

                                params.OID = data[index].OID;
                                return params;
                            },
                            url: basePath+'/admin/member/updateOccupation.shtml',//服务器接收改变值的URL
                            source: selectItem
                        }
                    }, {
                        field: 'PERMISSION',
                        title: '操作',
                        formatter: function (value, row){
                            return '<a href="#" class="permission">通讯录权限设置</a>'//这里记得吧id改成你要传入的keyID
                        },
                        events: 'ZWGLEvents',
                        align: 'center'
                    }]
                });

                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $ZWGLDelete.show();
                    } else {
                        $ZWGLDelete.hide();
                    }

                });
                $table.on('page-change.bs.table', function(){
                    $ZWGLDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $ZWGLDelete.hide();
                })
                $ZWGLDelete.click(function () {
                    var ids = getIdSelections(); //获取当前选择的id删除
                    console.log(ids);
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认删除该职务吗？删除前请及时修改相关会员的职务信息？",
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
                                    url: basePath + '/admin/member/deleteOccupation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OID":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功！");
                                            //alert("删除成功!");
                                            $ZWGLDelete.hide();
                                            $table.bootstrapTable('refresh');

                                        }else{
                                            toastr.error("删除失败！");
                                            //alert("删除失败，请联系管理人员！");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.OID
                    });
                }

            }
            /*模态框视图修正*/

            //新建职务时保存事件

            $('#folder-add').click(function(){

                $('#add-modal').modal('show');

            });

            $('#add-submit').click(function() {
                console.log($('#ONNAME').val());//保存时的职务名

                if($('#ONNAME').val()==""){
                    toastr.warning("职务名不能为空！");
                    //alert("职务名不能为空！");
                    return false;
                }else{
                    $.ajax({
                        url: basePath + '/admin/member/addOccupation.shtml',
                        dataType: 'json',
                        type: 'post',
                        async :false,
                        data:{"ONAME":$('#ONNAME').val().trim()},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                toastr.success("新增成功！");
                                $('#add-modal').modal('hide');
                                $table.bootstrapTable('refresh');

                            }else{
                                toastr.error("新增失败！");
                                // alert(data.errMsg);
                            }
                        },
                        error: function(msg){
                            toastr.error("操作失败，请联系管理人员！");
                            // alert("操作失败，请联系管理人员！");
                        }
                    });
                }


            });


            var perOID;
            var perData = [];

            /*  $(document).on("click", ".permission", function() {

             perOID = $(this).attr('data-id');//点击跳转时保存ID
             initTablePermission();
             $tablePermission.bootstrapTable('refresh')
             });*/


            //初始化权限管理窗口
            function initTablePermission() {
                $tablePermission.bootstrapTable({
                    url: basePath + '/admin/member/findOccupation.shtml',
                    queryParams: function getParams(params) {
                        //params obj
                        params.OID = perOID;

                        return params;
                    },

                    sidePagination: "server",//服务端分页
                    height: 400,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    },{
                        field: 'ONAME',
                        title: '职务名称',

                        align: 'center'

                    },{
                        field: 'OCCUPATIONID',
                        title: 'OCCUPATIONID',
                        //formatter: permissionData,
                        visible: false
                    }]
                });



                // function permissionData(value, row, index){
                //}
                function getPerSelections() {
                    return $.map($tablePermission.bootstrapTable('getSelections'), function (row) {
                        return row.OID
                    });
                };
                //保存提交PERMISSIN
                $('#permission-submit').unbind("click").click(function(){//$("#sdfsd").unbind("click").click(function(e){ ***** });  在绑定新click方法前对元素所绑定的click方法解绑

                    bootbox.confirm({
                        size: "small",
                        message: "确认修改该职务权限吗？",
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
                                    url: basePath + '/admin/member/updateOccupationRole.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OID":perOID,OCCUPATIONID:""+getPerSelections()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("修改成功！");
                                            // alert("修改成功!");
//  	                                          $("#permission-modal").modal('hide');
//  	                                          $("#table-permission").bootstrapTable('refresh');
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("修改失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });
                $('#permission-modal').modal('show');
                $('#permission-modal').on('shown.bs.modal', function () {
                    $.ajax({
                        url: basePath + '/admin/member/findOccupation.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"OID":perOID},
                        traditional: true,
                        success:function(data){
                            var ob = data.ocptMap.OCCUPATIONID.split(",");
                            console.log(ob);
                            var oc = [];
                            for(var i=0; i<ob.length; i++){
                                oc.push(parseInt(ob[i]));
                            }
                            $tablePermission.bootstrapTable('checkBy', {field:'OID', values: oc});
                        }
                    });
                    $tablePermission.bootstrapTable('resetView');
                });
                $('#permission-modal').on('hidden.bs.modal', function (e) {
                    $( '#permission-modal' ).off().on( 'hidden', 'hidden.bs.modal');
                })


            }
            //查看职务成员
            window.ZWGLEvents = {
                'click .ZWGLmembers': function (e, value, row, index) {
                    initZWGLMembers(row.OID);//换成需要传入的ID

                },'click .permission': function (e, value, row, index) {
                    perOID = row.OID;//点击跳转时保存ID
                    initTablePermission();
                    $tablePermission.bootstrapTable('refresh');
                }
            };

            function initZWGLMembers(id){
                ZWId = id;
                $.ajax({
                    url: basePath + "/data/occupation-ZWGL-members.html",
                    async :false,
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });
                $('#back').click( function(){
                    initZWGL();
                });

                initSidebar();

                $table = $('#tableMembers');
                var $membersDelete = $('#ZWGL-members-delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/serchAllMember.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showRefresh: true,
                    showColumns: true,
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height: 601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.OCCUPATIONID = id;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索

                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'MOBILE',
                        title: '成员账号',

                        align: 'center'
                    }, {
                        field: 'REALNAME',
                        title: '成员姓名',

                        align: 'center'
                    }, {
                        field: 'BIRTHDAY',
                        title: '成员生日',

                        align: 'center'
                    }]
                });
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $membersDelete.show();
                    } else {
                        $membersDelete.hide();
                    }
                    selections = getMembersSelections();
                });
                $table.on('page-change.bs.table', function(){
                    $membersDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $membersDelete.hide();
                });
                function getMembersSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USERNAME;
                    });
                }

                //删除会员
                $membersDelete.click(function(){
                    var ids = getMembersSelections();
                    var memberid = ""+ids;
                    bootbox.confirm({
                        size: "small",
                        message: "确认删除？",
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
                                    url: basePath + '/admin/member/deleteMemberRelation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OCCUPATIONID":id,"USERNAME":memberid},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功!");
                                            $membersDelete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("删除失败!");
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

                initMembersAdd();
                function initMembersAdd(){
                    //页面初始化
                    //加载所有会员数据
                    var selections = [],//临时选择数组
                        unSelected = [],//未选中人员数组
                        selected = [],//已选中人员数组
                        $tableMembers = $('#table-members'),
                        $tableSelected = $('#members-selected'),
                        $fasterFlier = $('#fast-fliter');
                    enableSubmit();

                    $("#select-sure").click(function () {
                        var mySelect = "";
                        console.log(selected);
                        for(var k=0; k < selected.length; k++){
                            mySelect += selected[k].USERNAME + ',';
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
                                    url: basePath + '/admin/member/saveMemberRelation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {"OCCUPATIONID":id,"CHECKBOXID":mySelect},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("添加成功！");
                                            clear();
                                            $('#select-modal').modal('hide');
                                            $('#tableMembers').bootstrapTable('refresh');
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

                             for(var l=0; l < existMembers.length; l++){
                             for(var s=0; s < unSelected.length; s++){
                             if(unSelected[s].USID == existMembers[l].USID){
                             //selected = selected.concat(unSelected[s]);
                             unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                             }
                             }
                             }*/
                        }
                    });
                    initTableMembers();
                    initMembersSelected();



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
                        //$tableMembers.bootstrapTable('refresh');
                        //$tableSelected.bootstrapTable('refresh');
                        $tableMembers.bootstrapTable('resetView');
                        $tableSelected.bootstrapTable('resetView');
                    });


                    //移除已选数据对象组里的数据，同时返回原表格数据
                    $(document).on("click", ".selectedRemove", function() {
                        var removeSelect = [];
                        var tempID=  parseInt($(this).attr('data-id'));
                        removeSelect.push(tempID);
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

        }
        //群聊管理
        function initQLGL(){
            $.ajax({
                url: basePath + "/data/occupation-QLGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initTable3();
            initSidebar();
            function initTable3() {
                $table = $('#table');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/gourpChat.shtml',
                    method: "post",
                    datatype: 'json',

                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height:601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理


                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    columns: [{
                        field: 'REALNAME',
                        title: '姓名',

                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "男";
                            }else if(value==2){
                                return "女";
                            }else{
                                return "保密";
                            }
                        }
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',

                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',

                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '所在单位',

                        align: 'center'
                    }, {
                        field: 'COMPANYWORK',
                        title: '单位职务',

                        align: 'center'
                    }, {
                        field: 'ACTION',
                        title: '操作',

                        align: 'center',
                        formatter:action
                    }]
                });
                function action(value, row){
                    var li = "";
                    if(value==0){
                        li = "<select id="+row.USERNAME+" onchange='groupChat("+row.USERNAME+");'>"
                            +"<option value="+0+" selected>正常</option>"
                            +"<option value="+1+">禁言</option>"
                            +"</select>";
                    }else{
                        li = "<select id="+row.USERNAME+" onchange='groupChat("+row.USERNAME+");'>"
                            +"<option value="+0+">正常</option>"
                            +"<option value="+1+" selected>禁言</option>"
                            +"</select>";
                    }
                    return li;
                }
            }
        	function groupChat(userName){
           		//if(confirm("确认修改")) {
	                $.ajax({
	            		url: '<%=basePath%>admin/member/gourpChatUpdate.shtml',
	            		dataType: 'json',
	            		type: 'post',
	            		data:{"USERNAME":userName,"ACTION":$("#"+userName).val()},
	            		traditional: true,
	            		success:function(data){
	            			if(data.status == "0"){
	            				alert("修改成功!");
	            			}else{
	            				alert(data.errMsg);
	            			}
	            		},
	            		error: function(msg){
	            			alert("操作失败，请联系管理人员！");
	            		}
	            	});
                //}
            }
            
        }
        //未激活
        function initWJH(){
            $.ajax({
                url: basePath + "/data/occupation-WJH.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initTable4();
            initSidebar();
            function initTable4() {
                $table = $('#table');
                var $send = $('#send');
                var $sendAll = $('#send-all');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/activationUserMember.shtml',
                    method: "post",
                    datatype: 'json',
                    pageSize: 12,//单页记录数
                    height:601,
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页

                    pageList: [5, 10, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理

                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
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

                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "男";
                            }else if(value==2){
                                return "女";
                            }else{
                                return "保密";
                            }
                        }
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',

                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',

                        align: 'center'
                    },{
                        field: 'ISACTIVATION',
                        title: '状态',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "激活中";
                            }else if(value==2){
                                return "已激活";
                            }else{
                                return "未激活";
                            }
                        }
                    }, {
                        field: 'operation',
                        title: '操作',
                        align: 'center',
                        events: "editEvents",
                        formatter: operateFormatter
                    }]
                });
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $send.show();
                    } else {
                        $send.hide();
                    }

                    selections = getIdSelections();
                });
                $table.on('page-change.bs.table', function(){
                    $send.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $send.hide();
                });
                $send.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认发送？",
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
                                    url: basePath + '/admin/member/updateMembersActivication.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"checkboxId":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功！");

                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("发送失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $send.hide();
                });
                $sendAll.click(function () {
                    var ids = getIdSelections();

                    bootbox.confirm({
                        size: "small",
                        message: "确认发送？",
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
                                    url: basePath + '/admin/member/updateMembersActivication.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"checkboxId":""},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功！");

                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("发送失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $send.hide();
                });


                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USID
                    });
                }
                /*
                 *  功能：操作框
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                function operateFormatter(value, row, index) {
                    return [
                        '<a class="like" href="javascript:void(0)" title="Like">',
                        '<i class="glyphicon glyphicon-send"></i>',
                        '</a>  '
                    ].join('');
                }
                window.editEvents = {
                    'click .like': function (e, value, row, index) {
//                    alert('You click like action, row: ' + JSON.stringify(row));


                        bootbox.confirm({
                            size: "small",
                            message: "确认发送？",
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
                                        url: basePath + '/admin/member/updateMembersActivication.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data:{"checkboxId":row.USID},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("发送成功!");

                                                $table.bootstrapTable('refresh');
                                            }else{
                                                toastr.error("发送失败!");
                                            }
                                        },
                                        error: function(msg){
                                            toastr.error("操作失败，请联系管理人员！");

                                        }
                                    });
                                }
                            }
                        })

                    },
                    'click .remove': function (e, value, row, index) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }
                };
            }
        }
        //群管理
        function initQGL(){
            $.ajax({
                url: basePath + "/data/occupation-QGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });

            initTable5();
            initSidebar();
            var groupId;
            function initTable5() {
                $table = $('#table');
                var $QGLDelete = $('#QGL-delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/queryGroup.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height: 601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮


                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'GROUPNAME',
                        title: '群名字',

                        events:'QGLEvents',
                        formatter: groupFormatter,
                        align: 'center'
                    }, {
                        field: 'DETAIL',
                        title: '群简介',

                        align: 'center'
                    }, {
                        field: 'CREATEDATE',
                        title: '创建时间',

                        align: 'center'
                    }, {
                        field: 'COUNT',
                        title: '群成员数',

                        formatter: membersFormatter,
                        events:'QGLEvents',
                        align: 'center'
                    }]
                });


                function groupFormatter(value, row){

                    return '<a href="#" class="groupDetail"  data-toggle="modal"  data-target="#QGL-edit-modal">' + value + '</a>';

                }
                function membersFormatter(value, row){

                    return '<a href="#" class="membersDetail">' + value + '</a>';

                }
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $QGLDelete.show();
                    } else {
                        $QGLDelete.hide();
                    }
                    selections = getIdSelections();
                });
                $table.on('page-change.bs.table', function(){
                    $QGLDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $QGLDelete.hide();
                });
                //添加群
                $('#QGL-add').click(function (){


                });
                //添加群保存

                $('#QGL-submit').click(function () {
                    bootbox.confirm({
                        size: "small",
                        message: "确认保存？",
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
                                    url: basePath + '/admin/member/createNewGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"GROUPNAME":$("#QGLName").val(),DETAIL:$("#QGLDescription").val()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){

                                            toastr.success("保存成功！");
                                            $('#QGL-add-modal').modal('hide')
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("保存失败！");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })
                });

                //功能：输入框验证
                $('#add-from').bootstrapValidator({
                    message: '所有值不能为空',
                    //excluded: [':disabled'],
                    fields: {
                        QGLName: {
                            validators: {
                                notEmpty: {
                                    message: '请输入群名称！'
                                }
                            }
                        }
                    }
                });


                $('#QGLName').on('keyup', function(){
                    dataBind();
                });

                function dataBind(){
                    var $submit = $("#QGL-submit");
                    $('form :input').bind('input propertychange', function () {
                        var $QGLName = $("#QGLName").val();
                        if($QGLName !== ""){
                            $submit.removeAttr('disabled');
                        }if($QGLName == ""){
                            $submit.attr('disabled', 'disabled');
                        }
                    });
                }

                //修改保存
                $('#editQGL-submit').click(function () {
                    console.log($("#editQGLName").val());
                    console.log($("#editQGLDescription").val());


                    bootbox.confirm({
                        size: "small",
                        message: "确认修改？",
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
                                    url: basePath + '/admin/member/updateGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{GROUPID:groupId,"GROUPNAME":$("#editQGLName").val(),DETAIL:$("#editQGLDescription").val()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("修改成功!");

                                            $('#QGL-edit-modal').modal('hide')
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                });


                $('#editQGLName').on('keyup', function(){
                    yanzhengXG();
                });
                function yanzhengXG(){
                    var $editSubmit = $("#editQGL-submit");

                    var $editQGLName = $("#editQGLName").val();
                    if($editQGLName !== ""){
                        $editSubmit.removeAttr('disabled');
                    }if($editQGLName == ""){
                        $editSubmit.attr('disabled', 'disabled');
                    }
                }

                //群管理删除
                $QGLDelete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认删除？",
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
                                    url: basePath + '/admin/member/deleteGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"GROUPID":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功!");

                                            $QGLDelete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });

                //修改群
                //$(document).on('click', '.groupDetail',function(){
                //console.log($(this).index())

                // });
                //function initQGLmembers(){
                //var table
                //  }




                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.GROUPID
                    });
                }

            }

            //查看群成员

            window.QGLEvents = {
                'click .membersDetail': function (e, value, row, index) {
                    //alert('You click like action, row: ' + JSON.stringify(row));
                    //alert(row.USERNAME);
                    initQGLMembers(row.GROUPID)
                    //initHYXXDetail(row.USERNAME)
                    // window.location.href = basePath+"/admin/url/occupationProfile.shtml?USERNAME="+row.USERNAME;
                },
                'click .groupDetail': function (e, value, row, index) {
                    $.ajax({
                        url: basePath + '/admin/member/showGroup.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"GROUPID":row.GROUPID},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                groupId = data.map.GROUPID;
                                $("#editQGLName").val(data.map.GROUPNAME);
                                $("#editQGLDescription").val(data.map.DETAIL);
                                //yanzhengXG();
                            }else{
                                toastr.error(data.errMsg);

                            }
                        },
                        error: function(msg){
                            toastr.error("操作失败，请联系管理人员！");
                        }
                    });
                },
            };
            function initQGLMembers(id){
                groupId = id;
                $.ajax({
                    url: basePath + "/data/occupation-QGL-members.html",
                    async :false,
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });
                $(document).on('click', '#back',function(){
                    initQGL();
                });

                initGroupMembers();
                initSidebar();
                function initGroupMembers() {

                    $table = $('#tableMembers');
                    var $membersDelete = $('#QGL-members-delete');
                    $table.bootstrapTable({
                        url: basePath+'/admin/member/queryGoupMember.shtml',
                        method: "post",
                        datatype: 'json',
                        idField: "id",
                        toolbar: "#table-toolbar",
                        showRefresh: true,
                        showColumns: true,
                        showToggle: true,
                        dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                        search: true,//是否搜索
                        pagination: true,//是否分页
                        pageSize: 12,//单页记录数
                        height: 601,
                        pageList: [12, 20, 50],//分页步进值
                        sidePagination: "server",//服务端分页
                        contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                        queryParamsType: "limit",//查询参数组织方式
                        queryParams: function getParams(params) {
                            //params obj
                            params.GROUPID = groupId;
                            return params;
                        },
                        searchOnEnterKey: false,//回车搜索

                        columns: [{
                            field: 'state',
                            checkbox: true
                        }, {
                            field: 'MOBILE',
                            title: '成员账号',

                            align: 'center'
                        }, {
                            field: 'REALNAME',
                            title: '成员姓名',

                            align: 'center'
                        }, {
                            field: 'BIRTHDAY',
                            title: '成员生日',

                            align: 'center'
                        }]
                    });
                    $table.on('check.bs.table uncheck.bs.table ' +
                        'check-all.bs.table uncheck-all.bs.table', function () {
                        if ($table.bootstrapTable('getSelections').length) {
                            $membersDelete.show();
                        } else {
                            $membersDelete.hide();
                        }
                        selections = getMembersSelections();
                    });
                    $table.on('page-change.bs.table', function(){
                        $membersDelete.hide();
                    });

                    $table.on('refresh.bs.table', function(){
                        $membersDelete.hide();
                    });
                    function getMembersSelections() {
                        return $.map($table.bootstrapTable('getSelections'), function (row) {
                            return row.USERNAME;
                        });
                    }

                    //删除会员
                    $membersDelete.click(function(){
                        var ids = getMembersSelections();
                        var memberid = ""+ids;
                        bootbox.confirm({
                            size: "small",
                            message: "确认删除？",
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
                                        url: basePath + '/admin/member/deleteGoupMember.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data:{GROUPID:groupId,"MEMBERUSER":memberid,TYPE:2},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("删除成功!");

                                                $membersDelete.hide();
//                                                    $('#select-modal').modal('hide');
                                                $table.bootstrapTable('refresh');

                                            }else{
                                                toastr.error("删除失败!");
                                            }
                                        },
                                        error: function(msg){
                                            toastr.error("操作失败，请联系管理人员！");

                                        }
                                    });
                                }
                            }
                        })

                    });

                    initMembersAdd();

                    function initMembersAdd(){
                        //页面初始化
                        //加载所有会员数据
                        var selections = [],//临时选择数组
                            unSelected = [];//未选中人员数组
                        selected = [],//已选中人员数组
                            $tableMembers = $('#table-members'),
                            $tableSelected = $('#members-selected');
                        $fasterFlier = $('#fast-fliter');
                        enableSubmit();
                        $("#select-sure").click(function () {
                            var mySelect = "";
                            console.log(selected);
                            for(var k=0; k < selected.length; k++){
                                mySelect += selected[k].USID + ';' +  selected[k].USERNAME + ',';
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
                                        url: basePath + '/admin/member/addMemberOfGroup.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data: {GROUPID:groupId,"chkinfo":mySelect},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("添加成功！");

//                                            $delete.hide();
                                                clear();
                                                $('#select-modal').modal('hide');
                                                $('#tableMembers').bootstrapTable('refresh');
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
                        console.log(outputOnameList())
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
            }
        }
}