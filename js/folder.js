(function(){
    $(function() {
        var $table;
        var $delete;
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var selections = [];
        var currentFolderID;
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
                    $menu.html("");
                    var $folderBelong = $('#folderBelong');
                    $folderBelong.html("");
                    var list = "";
                    var option =";"
                    if(data.FOLDERLIST.length ==0){
                        initTable("0");
                    }else{
                        for(var i=0; i < data.FOLDERLIST.length; i++) {
                            list += '<li><a href="#" data-id="'+ data.FOLDERLIST[i].FOLDERID+ '">'+data.FOLDERLIST[i].FOLDERNAME +'</a></li>';
                            if (i==0) {
                                currentFolderID = data.FOLDERLIST[i].FOLDERID;
                                initTable(data.FOLDERLIST[i].FOLDERID);//初始化加载第一个文件夹内容
                            }
                            option += '<option value="'+ data.FOLDERLIST[i].FOLDERID+ '" data-id="'+ data.FOLDERLIST[i].FOLDERID+ '">'+data.FOLDERLIST[i].FOLDERNAME +'</option>';
                        }

                        $menu.html(list);
                        $folderBelong.html(option);
                    }
                }
            })
        }
        //点击文件夹刷新列表
        $(document).on("click", "#menu > li > a", function() {
            currentFolderID = $(this).attr('data-id');
            var id = $(this).attr('data-id');
            $('#delete').hide();
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
                        toastr.error(data.ERRMSG);
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
                $('#content-area').toggleClass('inner');
                $('.content-area-box').toggleClass('inner');
                $table.bootstrapTable('resetView');
            });
            //$('.sidebar-overlay').on('click touchstart',function() {
               // $('.sidebar,.sidebar-container').removeClass('active');
          //  });
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
                        url: basePath+'/admin/filemanage/folder/update.shtml',
                        success: function(response, newValue) {
                        	console.log(response)
                        	console.log(newValue)
                        	if(response.status == "0"){
                        		toastr.success("修改成功！");
                        		$tableFolderManage.bootstrapTable('refresh');
                        		initFolderList();
                            }
                           /* if(!response.success) return response.msg;*/
                        },
                        params: function(params) {
                            var data = $tableFolderManage.bootstrapTable('getData');
                            var index = $(this).parents('tr').data('index');

//                            params.FOLDERNAME = data[index].FOLDERNAME;
                            params.FOLDERNAME = params.value;
                            params.FOLDERID = data[index].FOLDERID;
                            return params;
                        },
                        mode: 'inline',
                        validate: function (value) {
                            value = $.trim(value);
                            if (!value) {
                                return '文件夹名不能为空';
                            }
                          }
                    }
                }]
            });
            $('#folder-modal').on('hidden.bs.modal',function(e){
            	initFolderList();
            })
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */
            $tableFolderManage.on('check.bs.table uncheck.bs.table '
                + 'check-all.bs.table uncheck-all.bs.table', function () {
                if ($tableFolderManage.bootstrapTable('getSelections').length) {
                    $folderDelete.show();
                } else {
                    $folderDelete.hide();
                }
                selections = getFolderIdSelections();

            });
            /*$tableFolderManage.on('page-change.bs.table', function(){
            	$folderDelete.hide();
	          });
            $tableFolderManage.on('refresh.bs.table', function(){
	        	$folderDelete.hide();
	         });*/
            $folderDelete.click(function () {
                var ids = getFolderIdSelections();
                $tableFolderManage.bootstrapTable('remove', {
                    field: 'id',
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
            
            
            $('#folder-add').click(function(){
            	$("#ONNAME").val("");
            	$('#add-modal').modal('show')
            	
            })
            $('#add-sure').click(function() {
            	var ONNAME = $("#ONNAME").val();
            	 $.ajax({
                     url: basePath+'/admin/filemanage/folder/insert.shtml',
                     dataType: 'json',
                     type: 'post',
                     data:{
                    	 FOLDERNAME:ONNAME
                     },
                     success:function(data){
                         if(data.STATUS == "0"){
                             toastr.success('新增成功!');
                             $table.bootstrapTable('refresh');
                             $tableFolderManage.bootstrapTable('refresh');
                             initFolderList();
                         }else{
                             toastr.error(data.ERRMSG);

                         }
                     },
                     error: function(msg){
                     }
                 });
            	/*新建文件夹事件*/
                // $tableFolderManage.bootstrapTable('insertRow', {
                //     index: 0,
                //     row: {
                //         FOLDERNAME: "新建文件夹",
                //     },
                // });
                //
                // setTimeout(function() {
                //     $('#folder-manage .editable').eq(0).editable('show');
                // },200);
            		
            })

            /*
             *删除文件夹
             */
            $("#folder-delete").click(function(){
                var ids = getFolderIdSelections();
                console.log(ids);
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                console.log(str)

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
                                url: basePath+'/admin/filemanage/folder/delete.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                    CHECKID:str
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                                        toastr.success('删除成功!');
                                        $table.bootstrapTable('refresh');
                                        $tableFolderManage.bootstrapTable('refresh');
                                        initFolderList();
                                    }else{
                                        toastr.error(data.ERRMSG);

                                    }
                                },
                                error: function(msg){
                                }
                            });

                        }
                    }
                });


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
                    
                    align: 'center',
                    visible:false
                }, {
                    field: 'ATTACHMENT',
                    title: '文件URL',
                    
                    align: 'center',
                    visible:false
                }, {
                    field: 'STICK',
                    title: '是否置顶',
                    
                    align: 'center',
                    visible:false
                },{
                    field: 'FILENAME',
                    title: '文件名',
                    
                    align: 'center'
                }, {
                    field: 'UPLOADTIME',
                    title: '上传时间',
                    
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
                    
                    align: 'center'
                }, {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    events: 'folderEvents',
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
            $table.on('page-change.bs.table', function(){
          	  	  $delete.hide();
	          });
	       /* $table.on('refresh.bs.table', function(){
	          	  $delete.hide();
	         });*/
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
                                url: basePath+'/admin/filemanage/folder/file/deleteMany.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                    CHECKID:str
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                                        toastr.success('删除成功!');
                                        $table.bootstrapTable('refresh');
                                    }else{
                                        toastr.error(data.ERRMSG);
                                    }
                                },
                                error: function(msg){
                                }
                            });

                        }
                    }
                });

            });

        }
        /*
         *  功能：编辑框
         *  Created by nocoolyoyo 2016/9/28.
         */
        function operateFormatter(value, row) {
            var html="";
            if(row.STICK == "0"){
                html += '<a class="setTop" href="javascript:void(0)" title="置顶">'
                    + '<span class="both-5">置顶'
                    // '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>',
                    + '</span>'
                    + '</a>'
            }else{
                html +='<a class="cancelTop" href="javascript:void(0)" title="取消置顶">'
                    +'<span class="both-5">取消置顶'
                    // '<i class="fa fa-arrow-circle-up" aria-hidden="true"></i>',
                    +'</span>'
                    +  '</a>'
            }
            html += '<a class="move" href="javascript:void(0)" title="移动"  data-toggle="modal" data-target="#move-modal">'
                +  '<span class="both-5">移动'
                // '<i class="fa fa-database" aria-hidden="true"></i>',
                +'</span>'
                +'</a>'
                +'<a class="download" href="javascript:void(0)" title="下载">'
                + '<span  class="both-5">下载'
                // '<i class="fa fa-cloud-download" aria-hidden="true"></i>',
                +'</span>'
                + '</a>'
            return html;
        }
        //操作框点击时间
        
        
        window.folderEvents = {
                'click .setTop': function (e, value, row, index) {
                	   setTop(row.FILEID); 
                },
                'click .cancelTop': function (e, value, row, index) {
                	cancelTop(row.FILEID);
                },	
                'click .move': function (e, value, row, index) {
                	 move(row.FILEID,row.FILENAME);
                },
                'click .download': function (e, value, row, index) {
                	download(row.FILEID,row.ATTACHMENT)
               },	
            };
        
        
       
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
        $("#moveButton").on('click',function(){
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

                        toastr.success("移动成功！");
                        $table.bootstrapTable('refresh');
                    }else{
                        toastr.error(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
        })
        //下载文件
        function download(fileid,fileurl){
            console.log(fileid+"   "+fileurl);
            $.ajax({
                url: basePath+'/admin/filemanage/folder/file/download.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    FILEID:fileid
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        toastr.success("下载成功！");
                        window.location.href = fileurl;
                        $table.bootstrapTable('refresh');
                    }else{
                        toastr.error(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
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
                        toastr.success("取消置顶成功！");
                        $table.bootstrapTable('refresh');
                    }else{
                        toastr.error(data.ERRMSG);
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
                        toastr.success("置顶成功！");
                        $table.bootstrapTable('refresh');
                    }else{
                        toastr.error(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
        }
        //上传功能
        $("#folderupload").click(function(){
            console.log(currentFolderID);
            $.ajax({
                url: basePath+'/admin/filemanage/folder/findIsfolder.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        $("#import-modal").modal('show');
                        $('#file-upload').fileinput({  //需要传入folderid
                            language: 'zh-CN', //设置语言
                            uploadUrl: basePath + "/admin/upload.shtml?folderid="+currentFolderID, //上传的地址
                            allowedFileExtensions : ['rar' , 'doc' , 'docx' , 'zip' , 'pdf' , 'swf', 'wmv', 'xls','xlsx','ppt','pptx'],//接收的文件后缀,
                            maxFileCount: 1,
                            accept: 'application/html',
                            enctype: 'multipart/form-data',
                            showUpload: true, //是否显示上传按钮
                            showCaption: false,//是否显示标题
                            browseClass: "btn btn-primary", //按钮样式
                            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                        }).on("fileuploaded", function(event, data) {
                            if(data.response){
                                var url = data.response.url;
                                var name = data.response.original;
                                var state = data.response.state;
                                var filesize = data.response.size;
                                $.ajax({
                                    url: basePath+'/admin/filemanage/folder/file/insert.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{
                                        ATTACHMENT:url,state:state,FILENAME:name,FOLDERID:currentFolderID,FILESIZE:filesize
                                    },
                                    success:function(data){
                                        if(data.STATUS == "0"){
                                            toastr.success("上传成功！");
                                            window.location.href=basePath+"/admin/url/folder.shtml";
                                        }else{
                                            toastr.error("上传失败！");
                                        }
                                    },
                                    error: function(msg){
                                    }
                                });
                            }
                        });
                    }else{
                        toastr.error("请先添加文件夹！");
                    }
                },
                error: function(msg){
                }
            });
        })


    });
}());


