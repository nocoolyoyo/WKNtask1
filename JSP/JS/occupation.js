(function() {
    $(function() {
        var $table;
        selections = [];
        pageNum = 0;//默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;


        //默认页面初始化
        initSidebar();
        initTable1();

        /*
         *  功能：occupation页面导航
         *  Created by nocoolyoyo 2016/10/08.
         */

        $(document).on("click", "#occupation-menu > li", function() {
            pageNum = $(this).index();
            var $container = $("#main-box");
            switch (pageNum) {
                case 0: $.ajax({
                    url: basePath+"/data/occupation-HYXX.html",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });

                    pjaxRefreshFunc(pageNum);   break;
                case 1: $.ajax({
                    url: basePath+"/data/occupation-ZWGL.html",
                    async: false,

                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",

                    success:function(data)
                    {
                        $container.html(data);
                    }
                });

                    pjaxRefreshFunc(pageNum);   break;
                case 2: $.ajax({
                    url: basePath+"/data/occupation-QLGL.html",
                    async: false,

                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",

                    success:function(data)
                    {
                        $container.html(data);
                    }
                });

                    pjaxRefreshFunc(pageNum);   break;
                case 3: $.ajax({
                    url: basePath+"/data/occupation-WJH.html",
                    async: false,

                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });

                    pjaxRefreshFunc(pageNum);   break;
                case 4: $.ajax({
                    url: basePath+"/data/occupation-QGL.html",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });
                    pjaxRefreshFunc(pageNum);   break;
            }
        });
        //切换页面重新初始化
        function pjaxRefreshFunc(){
            switch(pageNum) {
                case 0: initHYXX(); initSidebar(); break;
                case 1: initZWGL(); initSidebar(); initTimepicker();break;
                case 2: initTable3(); initSidebar(); break;
                case 3: initTable4(); initSidebar(); break;
                case 4: initTable5(); initSidebar(); break;
            }
        }

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
            initTable1();
            function initTable1() {
                $table = $('#table');
                var $delete = $('#delete');
                var $add = $('#add');
                var $export = $('#export');

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
                        //params.other = "otherInfo";
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
//                    $table.bootstrapTable('remove', {
//                        field: 'id',
//                        values: ids
//                    });
                });


                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USERNAME
                    });
                }

                function responseHandler(res) {
                    $.each(res.rows, function (i, row) {
                        row.state = $.inArray(row.id, selections) !== -1;
                    });
                    return res;
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
                    allowedFileExtensions : ['xls'],//接收的文件后缀,
                    maxFileCount: 1,
                    accept: 'application/html',
                    enctype: 'multipart/form-data',
                    showUpload: true, //是否显示上传按钮
                    showCaption: false,//是否显示标题
                    browseClass: "btn btn-primary", //按钮样式
                    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
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

        function initZWGL(){
            initTable2();
            function initTable2() {
                $table = $('#table');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/occupationFindByPage.shtml',
                    method: "post",
                    datatype: 'json',
                    height: 601,
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 10,//单页记录数
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
                        // field: 'GRADE',
                        field: 'operate',
                        title: '操作',
                        editable: {
                            type: 'text',
                            title: '文件夹名',
                            pk: 1,//主键ID
                            url: '/post',
                            mode: 'inline'

                            },
                        formatter: operateFormatter(),
                        align: 'center'
                    }]
                });

                function operateFormatter(){
                    return '<select class="move form-control">'+
                            '</select>'
                }
            }
        }



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
                pageSize: 10,//单页记录数
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


        function initTable4() {
            $table = $('#table');
            var $send = $('#send');
            var $sendAll = $('#send-all');
            $table.bootstrapTable({
                url: basePath+'/admin/member/activationUserMember.shtml',
                method: "post",
                datatype: 'json',

                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: false,
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 10,//单页记录数
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


        function initTable5() {
            $table = $('#table');
            var $delete = $('#delete');
            var $add = $('#add');
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
                pageSize: 10,//单页记录数
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
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'GROUPNAME',
                    title: '群名字',
                    sortable: true,
                    editable: false,
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
                    align: 'center'
                }, {
                    field: 'edit',
                    title: '编辑',
                    align: 'center',
                    // events: editEvents,
                    formatter: editFormatter
                }]
            });
            $table.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($table.bootstrapTable('getSelections').length) {
                    $delete.show();
                } else {
                    $delete.hide();
                }
                selections = getIdSelections();
            });

            $delete.click(function () {
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
                                $delete.hide();
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
//                $table.bootstrapTable('remove', {
//                    field: 'id',
//                    values: ids
//                });
            });


            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.GROUPID
                });
            }
            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */

        }
    });
}());


