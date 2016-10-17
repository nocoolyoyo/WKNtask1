(function(){
    $(function() {
        var $table,
            pageNum = 0,
            selections = [],
            $container = $("#main-box");
        $(document).on("click", "#menu > li", function() {
            pageNum = $(this).index();
            switch ($(this).index()) {
                case 0: initHYXX();initSidebar(); break;
                case 1: initZWGL();initSidebar(); break;
                case 2: $.ajax({
                            url:"./data/occupation-QLGL.html",
                            async:false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        $container.html($.ajax({url: "./data/occupation-QLGL.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
                case 3: $container.html("");
                        $container.html($.ajax({url: "./data/occupation-WJH.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
                case 4: $container.html("");
                        $container.html($.ajax({url: "./data/occupation-QGL.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
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



        initHYXX();
        initSidebar();

        // var $menu = $('#occupation-menu');
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
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initHYXX(){
            $.ajax({
                url:"./data/occupation-HYXX.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initTable1();
            function initTable1() {
                $table = $('#table');
                var $delete = $('#delete');
                $table.bootstrapTable({
                    url: './data/occupation.json',
                    idField: "id",
                    pageNumber: 10,
                    pageList: [10, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    height: 601,
                    // sidePagination: "server",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'id',
                        title: 'ID',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'REALNAME',
                        title: '姓名',
                        sortable: true,
                        editable: true,
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
                        field: 'ONAME',
                        title: '单位职务',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'GRADE',
                        title: '单位职务',
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
                $delete.click(function () {
                    var ids = getIdSelections();
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $delete.hide();
                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.id
                    });
                }

                /*
                 *  功能：编辑框
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                function editFormatter(value, row, index) {
                    return [
                        '<a class="" href="javascript:void(0)">',
                        '<i class="glyphicon glyphicon-wrench"></i>',
                        '</a>  '
                    ].join('');
                }
                /*
                 *  功能：会员导入
                 *  Created by nocoolyoyo 2016/9/28.
                 */

                $('#file-import').fileinput({
                    language: 'zh-CN', //设置语言
                    uploadUrl: "/FileUpload/Upload", //上传的地址
                    allowedFileExtensions : ['xls','xlsx'],//接收的文件后缀,
                    maxFileCount: 1,
                    enctype: 'multipart/form-data',
                    showUpload: true, //是否显示上传按钮
                    showCaption: false,//是否显示标题
                    browseClass: "btn btn-primary", //按钮样式
                    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
                });

            }
        }
        function initZWGL(){

            $.ajax({
                url:"./data/occupation-ZWGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            var $table = $('#table'),
                $tableManage = $('#table-manage'),
                $tablePermission = $('#table-permission');
            initTable2();
            function initTable2() {
                var selectItem = [],
                    checklistItem = [];

               $.ajax({
                     url:"./data/occupation-select.json",
                     dataType: 'json',
                     async : false,
                     success:function(data)
                     {
                         selectItem = data;
                     }
               });
                $.ajax({
                    url:"./data/occupation-checklist.json",
                    dataType: 'json',
                    async : false,
                    success:function(data)
                    {
                        checklistItem = data;
                    }
                });

                $table.bootstrapTable({
                    url: './data/occupation-zwgl.json',
                    pageNumber: 12,
                    pageList: [12, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    height: 601,
                    // sidePagination: "server",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮
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
                        field: 'STATUS',
                        title: '状态',
                        align: 'center',
                        editable: {
                            type: 'select',
                            title: '状态',
                            display: '无',
                            //mode: 'inline',
                            send: 'auto',//当PK和URL设置时，值改变会自动发送
                            url: '/post',//服务器接收改变值的URL
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
                    return '<a href="#" class="permission"  data-toggle="modal" data-target="#permission-modal" data-id="'+row.id+'">设置权限</a>'//这里记得吧id改成你要传入的keyID
                }
                /*模态框视图修正*/
                $('#permission-modal').on('shown.bs.modal', function () {
                    $tablePermission.bootstrapTable('resetView');
                });
                $('#manage-modal').on('shown.bs.modal', function () {
                    $tableManage.bootstrapTable('resetView');
                });
                $(document).on("click", ".permission", function() {
                    initTablePermission($(this).attr('data-id'))//点击跳转到设置权限页面时传入ID
                });

                //新建职务时保存事件
                $('#add-submit').click( function () {
                    console.log($('#ONNAME').val());//保存时的职务名
                });


                //初始化权限管理窗口
                function initTablePermission(id) {

                    $tablePermission.bootstrapTable({
                        url: './data/occupation-zwgl.json',
                        height: 400,
                        columns: [{
                            field: 'state',
                            checkbox: true

                        },{
                            field: 'ONAME',
                            title: '职务名称',
                            sortable: true,
                            align: 'center'

                        }]
                    });
                }
                    //初始化权限管理窗口
                initTableManage();
                    function initTableManage(){

                        $tableManage.bootstrapTable({
                            url: './data/occupation-zwgl.json',
                            height: 400,
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
                                    url: '/post',  //修改后发送的地址
                                    send: 'auto',  //当PK和URL设置时，值改变会自动发送
                                    mode: 'inline',
                                    validate: function (value) {
                                        value = $.trim(value);
                                        if (!value) {
                                            return '职务名不能为空！';
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
            }


                    //select初始

        }

        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */



        function initTable3() {
            $table = $('#table');
            $table.bootstrapTable({
                url: 'data/occupation-QLGL.json',
                idField: "id",
                pageNumber: 10,
                pageList: [10, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: true,
                columns: [{
                    field: 'id',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A1',
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A5',
                    title: '所在单位',
                    sortable: true,
                    align: 'center'
                }]
            });

        }
        function initTable4() {
            $table = $('#table');
            var $send = $('#send');
            $table.bootstrapTable({
                url: 'data/occupation-QLGL.json',
                idField: "id",
                pageNumber: 10,
                pageList: [10, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: true,
                columns: [{
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'id',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A1',
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    // events: editEvents,
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
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $send.hide();
            });


            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.id
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
                    alert('You click like action, row: ' + JSON.stringify(row));
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
                url: 'data/occupation-QLGL.json',
                idField: "id",
                pageNumber: 10,
                pageList: [10, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: true,
                columns: [{
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'id',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A1',
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
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
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $delete.hide();
            });


            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
            }
            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */
            function editFormatter(value, row, index) {
                return [
                    '<a class="" href="javascript:void(0)">',
                    '<i class="glyphicon glyphicon-wrench"></i>',
                    '</a>  '
                ].join('');
            }
            window.editEvents = {
                'click .like': function (e, value, row, index) {
                    alert('You click like action, row: ' + JSON.stringify(row));
                },
                'click .remove': function (e, value, row, index) {
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                }
            };
        }
    });
}());


