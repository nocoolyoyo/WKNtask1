(function() {
    $(function() {
        var $table,
            selections = [],
            $container = $("#main-box");
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        //默认页面初始化
        initHYXX();
        initSidebar();
        /*
         *  功能：occupation页面导航
         *  Created by nocoolyoyo 2016/10/08.
         */

        $(document).on("click", "#side-menu > li", function() {
            switch ($(this).index()) {
                case 0: initHYXX();initSidebar(); break;
                case 1: initZWGL();initSidebar(); break;
                case 2: initQLGL();initSidebar(); break;
                case 3: initWJH() ;initSidebar(); break;
                case 4: initQGL() ;initSidebar(); break;
            }
        });

        /*
         *  功能：侧边栏初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initSidebar(){
            $('#sidebar-switch').on('click touchstart',function() {
                $('#sidebar-left').toggleClass('active');
            });

            $('.sidebar-overlay').on('click touchstart',function() {
                $('.sidebar,.sidebar-container').removeClass('active');
            });
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

            //di

            initTable1();
            initTimepicker();

            function initTable1() {
                $table = $('#table');
                var $delete = $('#delete');
                var $add = $('#add');
                var $export = $('#export');
                var $fasterFlier = $('#fast-fliter');
                $.ajax({
                    url: basePath+'/admin/member/occupationFindByPage.shtml',
                    dataType:'json',
                    success:function(data)
                    {
                        $fasterFlier.append('<li><a href="#" data-id="">取消职务查找</a></li>')
                        for (var i=0; i<data.rows.length; i++){
                            $fasterFlier.append('<li id="'+ data.rows[i].OID+'"><a href="#" data-id="' + data.rows[i].OID+ '">' + data.rows[i].ONAME + '</a></li>');
                        }
                    }
                });

                var OCCUPATIONID;
                //点击快速查询赛选
                $(document).on('click', '#fast-fliter > li > a',function () {
                    console.log($(this).attr('data-id'));
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
                    pageSize: 10,//单页记录数
                    pageList: [5, 10, 20, 50],//分页步进值
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
                    showColumns: true,//列选择按钮
                    // detailFormatter: detailFormatter,
                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'REALNAME',
                        title: '姓名',
                        sortable: true,
                        editable: false,
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
                    }, {
                        field: 'COMPANYWORK',
                        title: '单位职务',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'edit',
                        title: '编辑',
                        align: 'center',
                        events: "editEvents",
                        formatter: editFormatter
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
                    console.log(selections)
                });

                //会员新增
                $add.click(function (){
                    window.location.href = basePath+"/admin/url/occupationProfile.shtml";
                });

                //导出会员列表
                $export.click(function (){
                    if(confirm("确认导出")) {
                        window.location.href = basePath+"/admin/member/querySendMemberExcel.shtml";
                    }
                });

                //删除
                $delete.click(function () {
                    var ids = getIdSelections();
                    for (var i=0; i<ids.length; i++){
                        selections[i] = Number(ids[i]);
                    }
                    console.log(selections)
                    var id = ""+ids;
                    if(confirm("确认删除")){
                        $.ajax({
                            url: basePath + '/admin/member/deleteByMember.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"CHECKBOXID":id},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("删除成功!");
                                    $delete.hide();
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert("操作失败，请联系管理人员！");
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
                        return row.USERNAME
                    });
                }

                /*
                 *  功能：编辑框
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                function editFormatter(value, row, index) {
                    return [
                        '<a class="edit" href="javascript:void(0)">',
                        '<i class="glyphicon glyphicon-wrench"></i>',
                        '</a>  '
                    ].join('');
                }
                window.editEvents = {
                    'click .edit': function (e, value, row, index) {
                        //alert('You click like action, row: ' + JSON.stringify(row));
                        //alert(row.USERNAME);
                        window.location.href = basePath+"/admin/url/occupationProfile.shtml?USERNAME="+row.USERNAME;
                    },
                    'click .remove': function (e, value, row, index) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }
                };

                /*
                 *  功能：会员导入
                 *  Created by nocoolyoyo 2016/9/28.
                 */

                $('#file-import').fileinput({
                    language: 'zh-CN', //设置语言
                    uploadUrl: basePath + "/data/MemberImportfileUp.jsp", //上传的地址
                    allowedFileExtensions : ['xls','xlsx'],//接收的文件后缀,
                    maxFileCount: 1,
                    accept: 'application/html',
                    enctype: 'multipart/form-data',
                    showUpload: true, //是否显示上传按钮
                    showCaption: false,//是否显示标题
                    browseClass: "btn btn-primary", //按钮样式
                    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
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
            var $table = $('#table'),
                $tableManage = $('#table-manage'),
                $tablePermission = $('#table-permission'),
                $manageDelete = $('#folder-delete');
            initTable2();
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
                    showColumns: true,
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
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
                    showColumns: true,//列选择按钮

                    columns: [{
                        field: 'ONAME',
                        title: '职务名称',
                        sortable: true,
                        editable: false,
                        align: 'center'
                    }, {
                        field: 'CREATETIME',
                        title: '创建时间',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'GRADE',
                        //field: 'STATUS',
                        title: '排序',
                        align: 'center',
                        editable: {
                            type: 'select',
                            title: '排序',
                            display: '无',
                            //mode: 'inline',
                            send: 'auto',//当PK和URL设置时，值改变会自动发送
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
                            url: basePath+'/admin/member/updateOccupation.shtml',//服务器接收改变值的URL
                            source: selectItem
                        }
                    }, {
                        field: 'PERMISSION',
                        title: '操作',
                        formatter: operateFormatter,
                        align: 'center'
                        // editable: {
                        //     type: 'checklist',
                        //     title: '状态',
                        //     display: '设置权限',
                        //     //mode: 'inline',
                        //     send: 'auto',//当PK和URL设置时，值改变会自动发送
                        //     url: '/post',//服务器接收改变值的URL
                        //     source: checklistItem
                        // }
                    }]
                });

                function operateFormatter(value, row){
                    return '<a href="#" class="permission" data-id="'+row.OID+'">设置权限</a>'//这里记得吧id改成你要传入的keyID
                }
            }
            /*模态框视图修正*/

            //新建职务时保存事件
            $('#add-submit').click( function () {
                console.log($('#ONNAME').val());//保存时的职务名
                if($('#ONNAME').val()==""){
                    alert("职务名不能为空！");
                    return;
                }else{
                    if(confirm("确认新增")){
                        $.ajax({
                            url: basePath + '/admin/member/addOccupation.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"ONAME":$('#ONNAME').val()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("新增成功!");
                                    //$('#manage-modal').modal('hide');
                                    $('#add-modal').modal('hide');
                                    $tableManage.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
                }
            });


            var perOID;
            var perData = [];

            $(document).on("click", ".permission", function() {

                perOID = $(this).attr('data-id');//点击跳转时保存ID
                initTablePermission()
                $tablePermission.bootstrapTable('refresh')



            });


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
                        sortable: true,
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
                }
                $('#permission-modal').modal('show');
                //保存提交PERMISSIN
                $('#permission-submit').click(function(){
                    console.log(getPerSelections());
                    if(confirm("确认修改该职务权限吗？")){
                        $.ajax({
                            url: basePath + '/admin/member/updateOccupationRole.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"OID":perOID,OCCUPATIONID:""+getPerSelections()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("修改成功!");
                                    $('#permission-modal').modal('hide');
                                    $('#permission-modal').on('hidden.bs.modal', function () {
                                        //$tableManage.bootstrapTable('refresh');
                                        //$table.bootstrapTable('refresh');
                                    });
                                    //initZWGL();
//                                    $manageDelete.hide();
//                                    $tableManage.bootstrapTable('refresh');
//                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert("删除失败，请联系管理人员！");
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
                })

                // $('#permission-modal').on('hidden.bs.modal', function (e) {
                //
                //     $( '#permission-modal' ).off().on( 'hidden', 'hidden.bs.modal');
                // })
            }
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
                            //console.log();

                        }

                        //$tablePermission.bootstrapTable('uncheckAll');
                        $tablePermission.bootstrapTable('checkBy', {field:'OID', values: oc});
                        //$tablePermission.bootstrapTable('checkAll');

                    }

                });
                $tablePermission.bootstrapTable('resetView');

                // $tablePermission.bootstrapTable('checkBy', {field:'ONAME', values:['会长']});
                //$tablePermission.bootstrapTable('checkAll');
            });
            //初始化权限管理窗口
            initTableManage();
            function initTableManage(){
                $tableManage.bootstrapTable({
                    url: basePath + '/admin/member/memberRegistration.shtml',
                    height: 400,
                    sidePagination: "server",//服务端分页
                    toolbar: "#manage-toolbar",
                    columns: [{
                        field: 'state',
                        checkbox: true
                    },{
                        field: 'ONAME',
                        title: '职务名称',
                        sortable: true,
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
                            validate: function (value) {
                                value = $.trim(value);
                                if (!value) {
                                    return '职务名不能为空！';
                                }else{
                                    $table.bootstrapTable('refresh');
                                }
                                //以下为参考信息
                                // $.ajax({
                                //     url: basePath+'/admin/filemanage/folder/insert.shtml',
                                //     dataType: 'json',
                                //     type: 'post',
                                //     data:{
                                //         FOLDERNAME:value
                                //     },
                                //     success:function(data){
                                //         if(data.STATUS == "0"){
                                //             alert("新增成功");
                                //             initFolderList();
                                //         }else{
                                //             alert(data.ERRMSG);
                                //         }
                                //     },
                                //     error: function(msg){
                                //     }
                                // });
                                // return '';
                            }
                        }
                    }]
                });
            }
            $('#manage-modal').on('shown.bs.modal', function () {
                $tableManage.bootstrapTable('resetView');
            });
            $tableManage.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($tableManage.bootstrapTable('getSelections').length) {
                    $manageDelete.show();
                } else {
                    $manageDelete.hide();
                }

            });


            $manageDelete.click(function () {
                var ids = getIdSelections(); //获取当前选择的id删除
                console.log(ids);
                var id = ""+ids;
                if(confirm("确认删除该职务吗？删除前请及时修改相关会员的职务信息")){
                    $.ajax({
                        url: basePath + '/admin/member/deleteOccupation.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"OID":id},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                alert("删除成功!");
                                $manageDelete.hide();
                                $tableManage.bootstrapTable('refresh');
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
                return $.map($tableManage.bootstrapTable('getSelections'), function (row) {
                    return row.OID
                });
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
                        sortable: true,
                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',
                        sortable: true,
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
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '所在单位',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'COMPANYWORK',
                        title: '单位职务',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'ACTION',
                        title: '操作',
                        sortable: true,
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
                        sortable: true,
                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',
                        sortable: true,
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
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'ISACTIVATION',
                        title: '状态',
                        sortable: true,
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

                $send.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;
                    if(confirm("确认发送")) {
                        $.ajax({
                            url: basePath + '/admin/member/updateMembersActivication.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"checkboxId":id},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("发送成功!");
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $send.hide();
                });
                $sendAll.click(function () {
                    var ids = getIdSelections();
                    if(confirm("确认发送")) {
                        $.ajax({
                            url: basePath + '/admin/member/updateMembersActivication.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"checkboxId":""},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("发送成功!");
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
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
                        if(confirm("确认发送")) {
                            $.ajax({
                                url: basePath + '/admin/member/updateMembersActivication.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{"checkboxId":row.USID},
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        alert("发送成功!");
                                        $table.bootstrapTable('refresh');
                                    }else{
                                        alert(data.errMsg);
                                    }
                                },
                                error: function(msg){
                                    alert("操作失败，请联系管理人员！");
                                }
                            });
                        }
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
                        sortable: true,
                        formatter: groupFormatter,
                        align: 'center'
                    }, {
                        field: 'DETAIL',
                        title: '群简介',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'CREATEDATE',
                        title: '创建时间',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'COUNT',
                        title: '群成员数',
                        sortable: true,
                        formatter: membersFormatter,
                        align: 'center'
                    }]
                });


                function groupFormatter(value, row){

                    return '<a href="#" class="groupDetail"  data-toggle="modal"  data-target="#QGL-edit-modal"  data-id="' + row.GROUPID + '">' + value + '</a>';

                }
                function membersFormatter(value, row){

                    return '<a href="#" class="membersDetail"  data-id="' + row.GROUPID + '">' + value + '</a>';

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

                //添加群
                $('#QGL-add').click(function (){


                });
                //添加群保存

                $('#QGL-submit').click(function () {
                    console.log($("#QGLName").val());
                    console.log($("#QGLDescription").val());
                    if(confirm("确认新增")) {
                        $.ajax({
                            url: basePath + '/admin/member/createNewGroup.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"GROUPNAME":$("#QGLName").val(),DETAIL:$("#QGLDescription").val()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("保存成功!");
                                    $('#QGL-add-modal').modal('hide')
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
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
                    var $submit = $("#QGL-submit");
                    $('form :input').bind('input propertychange', function () {
                        var $QGLName = $("#QGLName").val();
                        if($QGLName !== ""){
                            $submit.removeAttr('disabled');
                        }if($QGLName == ""){
                            $submit.attr('disabled', 'disabled');
                        }
                    });
                });


                //修改群
                $(document).on('click', '.groupDetail',function(){
                    console.log($(this).attr('data-id'));
                    $.ajax({
                        url: basePath + '/admin/member/showGroup.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"GROUPID":$(this).attr('data-id')},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                groupId = data.map.GROUPID;
                                $("#editQGLName").val(data.map.GROUPNAME);
                                $("#editQGLDescription").val(data.map.DETAIL);
                                yanzhengXG();
                            }else{
                                alert(data.errMsg);
                            }
                        },
                        error: function(msg){
                            alert("操作失败，请联系管理人员！");
                        }
                    });

                });
                //修改保存
                $('#editQGL-submit').click(function () {
                    console.log($("#editQGLName").val());
                    console.log($("#editQGLDescription").val());
                    if(confirm("确认修改")) {
                        $.ajax({
                            url: basePath + '/admin/member/updateGroup.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{GROUPID:groupId,"GROUPNAME":$("#editQGLName").val(),DETAIL:$("#editQGLDescription").val()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("修改成功!");
                                    $('#QGL-edit-modal').modal('hide')
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
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

                    //  功能：输入框验证
//                        $('#edit-from').bootstrapValidator({
//                            message: '所有值不能为空',
//                            fields: {
//                                editQGLName: {
//                                    validators: {
//                                        notEmpty: {
//                                            message: '请输入群名称！'
//                                        }
//                                    }
//                                }
//                            }
//                        });
                }

                //群管理删除
                $QGLDelete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;
                    if(confirm("确认删除")) {
                        $.ajax({
                            url: basePath + '/admin/member/deleteGroup.shtml',
                            dataType: 'json',
                            type: 'post',
                            data:{"GROUPID":id},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    alert("删除成功!");
                                    $QGLDelete.hide();
                                    $table.bootstrapTable('refresh');
                                }else{
                                    alert(data.errMsg);
                                }
                            },
                            error: function(msg){
                                alert("操作失败，请联系管理人员！");
                            }
                        });
                    }
                });

                //修改群
                $(document).on('click', '.groupDetail',function(){
                    //console.log($(this).index())

                });
                function initQGLmembers(){
                    var table
                }




                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.GROUPID
                    });
                }

            }

            //查看群成员
            $(document).on('click', '.membersDetail',function(){
                //console.log($(this).index())
                initQGLMembers($(this).attr('data-id'))
            });



            function initQGLMembers(id){
                console.log(id)
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
                    initSidebar();
                });

                initTableMembers();
                function initTableMembers() {



                    $tableMembers = $('#tableMembers');
                    var $membersDelete = $('#QGL-members-delete');
                    $tableMembers.bootstrapTable({
                        url: basePath+'/admin/member/queryGoupMember.shtml',
                        method: "post",
                        datatype: 'json',
                        idField: "id",
                        toolbar: "#table-toolbar",
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
                        showRefresh: true,//刷新按钮
                        columns: [{
                            field: 'state',
                            checkbox: true
                        }, {
                            field: 'MOBILE',
                            title: '成员账号',
                            sortable: true,
                            align: 'center'
                        }, {
                            field: 'REALNAME',
                            title: '成员姓名',
                            sortable: true,
                            align: 'center'
                        }, {
                            field: 'BIRTHDAY',
                            title: '成员生日',
                            sortable: true,
                            align: 'center'
                        }]
                    });
                    $tableMembers.on('check.bs.table uncheck.bs.table ' +
                        'check-all.bs.table uncheck-all.bs.table', function () {
                        if ($tableMembers.bootstrapTable('getSelections').length) {
                            $membersDelete.show();
                        } else {
                            $membersDelete.hide();
                        }
                        selections = getMembersSelections();
                    });

                    function getMembersSelections() {
                        return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                            return row.USERNAME;
                        });
                    }

                    //删除会员
                    $membersDelete.click(function(){
                        var ids = getMembersSelections();
                        var memberid = ""+ids;
                        console.log(ids)
                        if(confirm("确认删除")){
                            $.ajax({
                                url: basePath + '/admin/member/deleteGoupMember.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{GROUPID:groupId,"MEMBERUSER":memberid,TYPE:2},
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        alert("删除成功!");
                                        $membersDelete.hide();
//                                        $('#select-modal').modal('hide');
                                        $tableMembers.bootstrapTable('refresh');

                                    }else{
                                        alert("操作失败，请联系管理人员！");
                                    }
                                },
                                error: function(msg){
                                    alert("操作失败，请联系管理人员！");
                                }
                            });
                        }
                    })

                    initMembersAdd()

                    function initMembersAdd(){
                        //页面初始化


                        //加载所有会员数据
                        var
                            selections = [],//临时选择数组
                            unSelected = [],//未选中人员数组
                            selected = [],//已选中人员数组
                            $tableMembers = $('#table-members'),
                            $tableSelected = $('#members-selected');
                        enableSubmit();


                        $("#select-sure").click(function () {
                            var mySelect = "";
                            console.log(selected);
                            for(var k=0; k < selected.length; k++){
                                mySelect += selected[k].USID + ';' +  selected[k].USERNAME + ',';
                            }
                            mySelect=mySelect.substring(0,mySelect.length-1);
                            console.log(mySelect);
                            if(confirm("确认添加")){
                                $.ajax({
                                    url: basePath + '/admin/member/addMemberOfGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{GROUPID:groupId,"chkinfo":mySelect},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            alert("添加成功!");
//                                            $delete.hide();
                                            clear();
                                            $('#select-modal').modal('hide');
                                            $('#tableMembers').bootstrapTable('refresh');
                                        }else{
                                            alert(data.errMsg);
                                        }
                                    },
                                    error: function(msg){
                                        alert("操作失败，请联系管理人员！");
                                    }
                                });
                            }
                        });
                        function enableSubmit(){
                            var $selectSubmit = $("#select-sure");
                            if(selected.length != 0){
                                $selectSubmit.removeAttr('disabled');
                            }else if(selected.length == 0){
                                $selectSubmit.attr('disabled', 'disabled');
                            }
                        }
                        $.ajax({
                            url: basePath + "/admin/member/serchAllMember.shtml",
                            async: false,
                            dataType:"json",
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {
                                unSelected = data.rows;
                                $('.dropdown-menu').append()
                            }
                        }).done(function (data) {
                            // unSelected = data;
                        });
                        initTableMembers();
                        initMembersSelected();


                        //确认操作

                        $('#sure').click(function() {
                            console.log(selected)
                        });

                        //清空操作
                        $(document).on("click", ".clear", function() {
                            unSelected = selected.concat(unSelected);
                            $tableMembers.bootstrapTable('load', unSelected);
                            $tableMembers.bootstrapTable( 'uncheckAll');
                            selected = [];
                            $tableSelected.bootstrapTable('load', selected);
                            enableSubmit()

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
                                pageSize: 9,
                                pageList: [12, 25, 50, 100],
                                sidePagination: 'client',
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
            }
        }



    });
}());


