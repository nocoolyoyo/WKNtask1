/*
 *  功能：会员页表格初始化
 *  Created by nocoolyoyo 2016/9/28.
 */
function initHYXX(){
    replacePage($('#main-box'),"/data/occupation-HYXX.html");

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