(function(){
    $(function() {
        var $table;
        var $delete;
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var selections = [];
        /*
         *  功能：入口初始化
         */

        initSidebar();
        initFolderManage();


        //加载左侧文件夹列表
        function initFolderList(){
            $.ajax({
                url:basePath + '/admin/filemanage/folder/find.shtml',
                async : true,
                dataType :"json",
                success:function(data)
                {
                    var $menu = $('#menu');
                    var $folderBelong = $('#folderBelong');
                    var list = "";
                    var option =";"
                    for(var i=0; i < data.FOLDERLIST.length; i++) {
                        list += '<li><a href="#" data-id="'+ data.FOLDERLIST[i].FOLDERID+ '">'+data.FOLDERLIST[i].FOLDERNAME +'</a></li>';
                        if (i==0) {
                            initTable(data.FOLDERLIST[i].FOLDERID);//初始化加载第一个文件夹内容
                        }
                        option += '<option value="'+ data.FOLDERLIST[i].FOLDERID+ '" data-id="'+ data.FOLDERLIST[i].FOLDERID+ '">'+data.FOLDERLIST[i].FOLDERNAME +'</option>';
                    }

                    $menu.append(list);
                    $folderBelong.append(option);


                }
            })
        }
        //点击文件夹刷新列表
        $(document).on("click", "#menu > li > a", function() {
            var id = $(this).attr('data-id');
            console.log($(this).attr('data-id'))
            $.ajax({
                url:basePath+'/admin/filemanage/folder/file/find.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    FOLDERID:id
                },
                success:function(data){
                    if(data.status == "0"){
                        $table.bootstrapTable('load',data);
                    }else{
                        alert(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
            //$table.bootstrapTable('load',rows);
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

        /*
         *  功能：文件夹管理初始化
         *  Created by nocoolyoyo 2016/10/12.
         */


        function initFolderManage() {
            var $tableFolderManage = $('#folder-manage');
            var $folderDelete = $('#folder-delete');
            $tableFolderManage.bootstrapTable({
                url: basePath + '/admin/filemanage/folder/find.shtml',
                dataField: "FOLDERLIST",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                /*  pagination: false,//是否分页
                 pageSize: 6,//单页记录数
                 pageList: [6, 12, 24],*/
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
                toolbar: "#table-toolbar",
                columns: [{
                    field: 'state',
                    checkbox: true

                },{
                    field: 'FOLDERID',
                    title: 'ID',
                    sortable: true,
                    align: 'center',
                    visible:false
                }, {
                    field: 'FOLDERNAME',
                    title: '文件夹名',
                    align: 'center',
                    editable: {
                        type: 'text',
                        title: '文件夹名',
                        pk: 1,//主键ID
                        url: '/post',
                        mode: 'inline',
                        validate: function (value) {
                            value = $.trim(value);
                            if (!value) {
                                return '文件夹名不能为空';
                            }
//                            var data = $tableFolderManage.bootstrapTable('getData'),
//                            index = $(this).parents('tr').data('index');
//                        	console.log(data[index]);
                            $.ajax({
                                url: basePath+'/admin/filemanage/folder/insert.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                    FOLDERNAME:value
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                                        alert("新增成功");
                                        initFolderList();
                                    }else{
                                        alert(data.ERRMSG);
                                    }
                                },
                                error: function(msg){
                                }
                            });
                            return '';
                        }
                    }
                }]
            });
                /*
                 *  功能：获取选择框信息
                 *  Created by nocoolyoyo 2016/9/28.
                 */
                $tableFolderManage.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($tableFolderManage.bootstrapTable('getSelections').length) {
                        $folderDelete.show();
                    } else {
                        $folderDelete.hide();
                    }
                    selections = getFolderIdSelections();

                });
                $folderDelete.click(function () {
                    var ids = getFolderIdSelections();
                    $tableFolderManage.bootstrapTable('remove', {
                        field: 'FOLDERID',
                        values: ids
                    });

                    $folderDelete.hide();
                });
                function getFolderIdSelections() {
                    return $.map($tableFolderManage.bootstrapTable('getSelections'), function (row) {
                        console.log(row.FOLDERID);
                        return row.FOLDERID;
                    });
            }

            /*
             *  功能：添加文件夹
             */
            $('#folder-add').click(function() {
                $tableFolderManage.bootstrapTable('insertRow', {
                    index: 0,
                    row: {
                        FOLDERNAME: "新建文件夹",
                    },
                });

                setTimeout(function() {
                    $('#folder-manage .editable').eq(0).editable('show');
                },200);

            })

            /*
             *删除文件夹
             */
            $("#folder-delete").click(function(){
                var ids = getFolderIdSelections();
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                console.log(str)
                if(confirm('确认删除吗？')){
                    $.ajax({
                        url: basePath+'/admin/filemanage/folder/delete.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{
                            CHECKID:str
                        },
                        success:function(data){
                            if(data.STATUS == "0"){
                                alert("删除成功");
                                $tableFolderManage.bootstrapTable('refresh');
                            }else{
                                alert(data.ERRMSG);
                            }
                        },
                        error: function(msg){
                        }
                    });
                }
            });

        }

        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initTable(id) {

            $table = $('#table');
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath + '/admin/filemanage/folder/file/find.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 601,
                pageSize: 12,//单页记录数
                pageList: [12, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式

                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    params.FOLDERID=id;
                    return params;
                },
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'FILEID',
                    title: '文件ID',
                    sortable: true,
                    align: 'center',
                    visible:false
                }, {
                    field: 'ATTACHMENT',
                    title: '文件URL',
                    sortable: true,
                    align: 'center',
                    visible:false
                }, {
                    field: 'STICK',
                    title: '是否置顶',
                    sortable: true,
                    align: 'center',
                    visible:false
                },{
                    field: 'FILENAME',
                    title: '文件名',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'UPLOADTIME',
                    title: '上传时间',
                    sortable: true,
                    align: 'center',
                    formatter:function(value){
                        if (value!=null) {
                            var time = value.substring(0,11);
                            return time;
                        }
                    }
                }, {
                    field: 'REALNAME',
                    title: '姓名',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    // events: editEvents,
                    formatter: operateFormatter
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
                    return row.FILEID;
                });
            }

            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */
            function operateFormatter(value, row) {
                var html="";
                if(row.STICK == "0"){
                    html += '<a class="setTop" href="javascript:void(0)" title="置顶" data-id="'+ row.FILEID+'">'
                        + '<span class="both-5">置顶'
                        // '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>',
                        + '</span>'
                        + '</a>'
                }else{
                    html +='<a class="cancelTop" href="javascript:void(0)" title="取消置顶" data-id="'+ row.FILEID+'">'
                        +'<span class="both-5">取消置顶'
                        // '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>',
                        +'</span>'
                        +  '</a>'
                }
                html += '<a class="move" href="javascript:void(0)" title="移动"  data-toggle="modal" data-target="#move-modal" data-id="'+ row.FILEID+'" data-name="'+ row.FILENAME+'">'
                    +  '<span class="both-5">移动'
                    // '<i class="fa fa-database" aria-hidden="true"></i>',
                    +'</span>'
                    +'</a>'
                    +'<a class="download" href="javascript:void(0)" title="下载" data-id="'+ row.FILEID+'" data-url="'+ row.ATTACHMENT+'">'
                    + '<span  class="both-5">下载'
                    // '<i class="fa fa-cloud-download" aria-hidden="true"></i>',
                    +'</span>'
                    + '</a>'
                return html;
            }
            //操作框点击时间
            $(document).on("click", ".setTop", function() {
                console.log($(this).attr('data-id'))
                setTop($(this).attr('data-id'));
            });
            $(document).on("click", ".cancelTop", function() {
                console.log($(this).attr('data-id'))
                cancelTop($(this).attr('data-id'));
            });
            $(document).on("click", ".move", function() {
                console.log($(this).attr('data-id'),$(this).attr('data-name'))
                move($(this).attr('data-id'),$(this).attr('data-name'));
            });
            $(document).on("click", ".download", function() {
                console.log($(this).attr('data-id'),$(this).attr('data-url'))
            });
            /*
             *  功能：文件上传
             *  Created by nocoolyoyo 2016/9/28.
             */
            //移动文件
            var tempID;
            function move(fileid,filename){
                console.log(fileid+"  " +filename);
                $("#folderName").val(filename);
                tempID = fileid;
            }
            $("#submit").on('click',function(){
                var fileId = tempID;
                var incomeSelect =$("#folderBelong").val();//类型
                $.ajax({
                    url: basePath+'/admin/filemanage/folder/file/move.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        FILEID:fileId,FOLDERID:incomeSelect
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            alert("移动成功");
                            $table.bootstrapTable('refresh');
                        }else{
                            alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
            })
            //下载文件
            function download(fileid,fileurl){
                console.log(fileid+"   "+fileurl);
                window.location.href = fileurl;
            }
            //文件取消置顶
            function cancelTop(fileid){
                $.ajax({
                    url: basePath+'/admin/filemanage/folder/file/cancelStick.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        FILEID:fileid
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            alert("取消置顶成功");
                            $table.bootstrapTable('refresh');
                        }else{
                            alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
            }
            //文件置顶
            function setTop(fileid){
                $.ajax({
                    url: basePath+'/admin/filemanage/folder/file/stick.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        FILEID:fileid
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            alert("置顶成功");
                            $table.bootstrapTable('refresh');
                        }else{
                            alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
            }
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

            /*
             *删除
             */
            $("#delete").on('click', function deleteLog(){
                var ids = getIdSelections();
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                console.log(str)
                if(confirm('确认删除吗？')){
                    $.ajax({
                        url: basePath+'/admin/filemanage/folder/file/deleteMany.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{
                            CHECKID:str
                        },
                        success:function(data){
                            if(data.STATUS == "0"){
                                alert("删除成功");
                                $table.bootstrapTable('refresh');
                            }else{
                                alert(data.ERRMSG);
                            }
                        },
                        error: function(msg){
                        }
                    });
                }
            });

        }
    });
}());


