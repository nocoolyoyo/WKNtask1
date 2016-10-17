(function(){
    $(function() {
        var $table = $('#table');
        var $delete = $('#delete');
        var $tableFolderManage = $('#folder-manage');
        var $folderDelete = $('#folder-delete');
        /*模态框表格窗口修正*/
        $('#folder-modal').on('shown.bs.modal', function () {
            $tableFolderManage.bootstrapTable('resetView');
        });

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
            }).done(function(data) {
                console.log(data.FOLDERLIST)
                $tableFolderManage.bootstrapTable('load', data.FOLDERLIST);//调用回调函数。
            });
        }

        selections = [];
        initSidebar();
        initTable();
        initFolderManage();
        // initFolderManage();





        /*
         *  功能：文件夹管理初始化
         *  Created by nocoolyoyo 2016/10/12.
         */

        function initFolderManage() {
            $tableFolderManage.bootstrapTable({
                idFiled: 'FOLDERLIST',

                // sidePagination: "server",
                toolbar: "#folder-toolbar",

                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'FOLDERNAME',
                    title: '文件夹名',
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
                    field: 'FOLDERID',
                    values: ids
                });
                $folderDelete.hide();
            });
            function getIdSelections() {
                return $.map($folderDelete.bootstrapTable('getSelections'), function (row) {
                    return row.FOLDERID
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
                }]
            });
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */
            function operateFormatter(value, row){
                    return [
                        '<a class="setTop" href="javascript:void(0)" title="置顶" data-id="'+ row.FILEID+'">',
                        '<span class="both-5">置顶',
                        // '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>',
                        '</span>',
                        '</a>',
                        '<a class="move" href="javascript:void(0)" title="移动" data-id="'+ row.FILEID+'">',
                        '<span class="both-5">移动',
                        // '<i class="fa fa-database" aria-hidden="true"></i>',
                        '</span>',
                        '</a>',
                        '<a class="download" href="javascript:void(0)" title="下载" data-id="'+ row.FILEID+'">',
                        '<span  class="both-5">下载',
                        // '<i class="fa fa-cloud-download" aria-hidden="true"></i>',
                        '</span>',
                        '</a>'
                    ].join('')
            }

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
            //操作框点击时间
            $(document).on("click", ".setTop", function() {
                console.log($(this).attr('data-id'))
            });
            $(document).on("click", ".move", function() {
                console.log($(this).attr('data-id'))
            });
            $(document).on("click", ".download", function() {
                console.log($(this).attr('data-id'))
            });
            /*
             *  功能：文件上传
             *  Created by nocoolyoyo 2016/9/28.
             */

            $('#file-upload').fileinput({
                language: 'zh-CN', //设置语言
                uploadUrl: "/FileUpload/Upload", //上传的地址
                // allowedFileExtensions : [''],//接收的文件后缀,
                fileType: "any",
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                maxFileCount: 1,
                enctype: 'multipart/form-data',
                showUpload: true, //是否显示上传按钮
                showCaption: false,//是否显示标题
                fileActionSettings: {
                    showZoom: false
                },
                browseClass: "btn btn-primary", //按钮样式
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
            });

        }

    });
}());


