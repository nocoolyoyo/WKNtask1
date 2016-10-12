(function(){
    $(function() {
        var $table = $('#table');
        var $delete = $('#delete');
        var menu = [];
        function initFolderList(){
            $.ajax({
                url:"./data/folder.json",
                async : true,
                success:function(data)
                {
                    var $menu = $('#menu');
                    var list = "";
                    for(var i=0; i < data.FOLDERLIST.length; i++) {
                        list += '<li><a href="#" data-id="'+ data.FOLDERLIST[i].FOLDERID+ '">'+data.FOLDERLIST[i].FOLDERNAME +'</a></li>';
                    }
                    $menu.prepend(list);
                }
            })
        }
        $(document).on("click", "#menu > li > a", function() {
            var id = $(this).attr('data-id');
            console.log($(this).attr('data-id'))
            $.ajax({
                url:'./data/folder'+ id +'.json',
                async :false,
                success:function(data)
                {
                    $table.bootstrapTable('load', data);
                }
            });
        });
        /*
         *  功能：文件夹管理
         *  Created by nocoolyoyo 2016/9/28.
         */

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
            initFolderList();
        }

        selections = [];
        initSidebar();
        initTable();
        initFolderManage();





        /*
         *  功能：文件夹管理初始化
         *  Created by nocoolyoyo 2016/10/12.
         */

        function initFolderManage() {
            var $tableFolderManage = $('#folder-manage');
            var $folderDelete = $('#folder-delete');
            $tableFolderManage.bootstrapTable({
                url: './data/folder.json',
                idField: "FOLDERLIST",
                pageNumber: 6,
                pageList: [6, 12, 24],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#folder-toolbar",
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'FOLDERNAME',
                    title: '文件夹名',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'UPLOADTIME',
                    title: '创建时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'FOLDERID',
                    title: '创建人',
                    sortable: true,
                    align: 'center'
                }]
            });
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */
            $tableFolderManage.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($tableFolderManage.bootstrapTable('getSelections').length) {
                    $folderDelete.show();
                } else {
                    $folderDelete.hide();
                }
                selections = getIdSelections();
            });
            $folderDelete.click(function () {
                var ids = getIdSelections();
                $tableFolderManage.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $folderDelete.hide();
            });
            function getIdSelections() {
                return $.map($folderDelete.bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
            }
        }



        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initTable() {
            $table.bootstrapTable({
                url: 'data/folder1100.json',
                idField: "id",
                pageNumber: 12,
                pageList: [12, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                height: 601,
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'FILENAME',
                    title: '文件名',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'UPLOADTIME',
                    title: '上传时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '姓名',
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
             *  功能：文件上传
             *  Created by nocoolyoyo 2016/9/28.
             */
            //
            // $('#file-import').fileinput({
            //     language: 'zh-CN', //设置语言
            //     uploadUrl: "/FileUpload/Upload", //上传的地址
            //     allowedFileExtensions : ['xls'],//接收的文件后缀,
            //     maxFileCount: 1,
            //     enctype: 'multipart/form-data',
            //     showUpload: true, //是否显示上传按钮
            //     showCaption: false,//是否显示标题
            //     browseClass: "btn btn-primary", //按钮样式
            //     msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
            // });
        }
    });
}());


