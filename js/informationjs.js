var information = function(){
        var $table,
            $delete,
            selections = [],
            $container,
            infoID; //默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        /*
         *  功能：入口初始化
         */
        // initTable1();
        // initTimepicker();
        initInformationIndex();


        /*
         *  功能：页内导航
         *  Created by nocoolyoyo 2016/9/28.
         */

        $(document).on("click", "#add", function() {
            initInformationCreate();
        });
        $(document).on("click", "#drafts", function() {
            initInformationDrafts();
        });
       
        window.infoEvents = {
                'click .infoDetail': function (e, value, row, index) {       	 
                	initInformationDetail(row.INID);
                },
                
            };


        /*
         *  功能：时间选择器初始化
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
         *  文本编辑器初始化
         */
        
        function initfroalaEditor(){
        	$('#newInformation').froalaEditor({
            	height: 400,
                theme: 'gray',
                language: 'zh_cn',
                allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
                imageUploadURL: basePath+'/admin/upload.shtml',
                imageUploadParams: {savePath:"information"},
                imageMaxSize: 1024*1024*5,
                imageDefaultWidth : 0,
                fileUploadURL: basePath+'/admin/upload.shtml',
                fileUploadParams: {
                	folderid: '1'
                  },
                videoUploadURL: basePath+'/admin/upload.shtml',
                videoAllowedTypes: ['ogg', 'mp4'],
                videoUploadParams: {
	              	folderid: '1'
	              }
                
            }).on('froalaEditor.image.uploaded', function (e, editor, response) { 
          	  var obj = JSON.parse(response);
        	  slturl = obj.slturl;
        	   $('#newInformation').on('froalaEditor.image.loaded', function (e, editor, $img) {
	              	$img.attr('src',slturl);	
	              	$('#newInformation').off('froalaEditor.image.loaded');
              });
            }).on('froalaEditor.image.error', function (e, editor, error) {
            	  if(error.code == 5){
            		  $('.fr-message').text('图片太大，请控制在5M以内');
            	  }else if(error.code == 1){   
            		  $('.fr-message').text('网络异常');
            	  }
            }).on('froalaEditor.file.uploaded', function (e, editor, response) {
            	 console.log(editor);
            	 console.log(response);// Do something here.
            });
        };
        
        
        /*
         *  功能：页面初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initInformationIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-index.html",
                async: false,
                dataType : 'html',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
            initTimepicker();
            
            
            window.editInfoEvents = {
                    'click .edit': function (e, value, row, index) {
                    	initInformationEdit(row.INID);
                  
                    },
                    'click .setTop': function (e, value, row, index) {
                    	 setTop(row.INID); 
                    	 //initInformationEdit(row.INID);             
                    },
                    'click .cancelTop': function (e, value, row, index) {
                    	cancelTop(row.INID);
                    	//initInformationEdit(row.INID);
                    }
                };
            //文件取消置顶
            function cancelTop(fileid){
                $.ajax({
                    url: basePath+'/admin/information/cancelStick.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                    	INID:fileid
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
                    url: basePath+'/admin/information/stick.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                    	INID:fileid
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
          
        }
        //加载新增
        function initInformationCreate(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-create.html",
                async: false,
                dataType : 'html',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

           /* $('#newInformation').summernote({
                lang: 'zh-CN',
                focus: true,
                disableDragAndDrop: true,
                height: 400,
                minHeight: 400,
                maxHeight: 400,
                toolbar: [

                    ['style', ['bold', 'italic', 'underline', 'color', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript','fontsize','height','fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['picture', ['picture']],
                    ['undo', ['undo']],
                    ['redo', ['redo']]
                ]
            });*/
            
            initfroalaEditor();
            
            //发布
            $('#information-send').click(function () {
                var title = $("#title").val();
                var content = $('#newInformation').froalaEditor('html.get', true);
                console.log(content)
                console.log(typeof(content))
                console.log(content.trim())
              
                if(title == ""){
                	toastr.warning("标题不能为空！");
                }else if(content=="" ){
                	toastr.warning("内容不能为空！");
                }else{
                	$(this).attr('disabled', 'disabled');
                	$(this).text('发布中...');
	                $.ajax({
	                    url: basePath+'/admin/information/release.shtml?SAVETYPE=0',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        TITLE:title,NOTE:content
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                            toastr.success("新增成功！");
	                            //alert("新增成功");
	                            initInformationIndex();
	                        }else{
	                        	$(this).removeAttr('disabled');
	                        	$(this).text('发布');
	                            toastr.error("新增失败！");
	                            //alert(data.ERRMSG);
	                        }
	                    },
	                    error: function(msg){
	                    }
	                });
                }
            });
            //保存草稿
            $('#information-save').click(function () {
                var title = $("#title").val();
                var content = $('#newInformation').froalaEditor('html.get', true);
              
             
               if(title == ""){
              	 toastr.warning("标题不能为空！");
               }else if(content == ""){
               	toastr.warning("内容不能为空！");
               }else{
            	$(this).attr('disabled', 'disabled');
               	$(this).text('保存中...');
                $.ajax({
                    url: basePath+'/admin/information/release.shtml?SAVETYPE=1',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        TITLE:title,NOTE:content
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            toastr.success("保存成功！");
                            //alert("保存成功");
                            initInformationIndex();
                        }else{
                        	$(this).removeAttr('disabled');
                        	$(this).text('保存草稿');
                            toastr.error("保存失败！");
                            //alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
               }
            });
            
            $('#back').click(function () {
                    initInformationIndex();
            })
        }

        function initInformationDrafts(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-drafts.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
            $('#back').click(function () {
                initInformationIndex();
            });
          
            window.editDraftEvent = {
                    'click .edit': function (e, value, row, index) {
                    	
                    	initInformationDraftEdit(row.INID);
                    }
                };
        }

        function initInformationDetail(infoID){
            $.ajax({
                url: basePath+'/admin/information/show.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    INID:infoID
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        console.log(data.ACTIVITY.TITLE);
                        $("#infoAuthor").text("发布人："+data.ACTIVITY.AUTHOR);
                        $("#infoTime").text("发布时间："+data.ACTIVITY.RELEASETIME);
                        $("#infoHits").text("点击数："+data.ACTIVITY.VIEWCOUNT+"次");
                        $("h4").text(data.ACTIVITY.TITLE);
                        $("article").html(data.ACTIVITY.NOTE);
                        $(".badge").text(data.COUNT);
                    }
                },
                error: function(msg){
                }
            });
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $('#back').click(function () {
                initInformationIndex();
            });
            //上一页
            $('#info-pre').click(function () {
              
                $('#info-next').show();
                $.ajax({
                    url: basePath+'/admin/information/findFrontOrBehind.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        INID:infoID,ACT:"front"
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            $("#msg").hide();
                            $("#infoAuthor").text("发布人："+data.ACTIVITY.AUTHOR);
                            $("#infoTime").text("发布时间："+data.ACTIVITY.RELEASETIME);
                            $("#infoHits").text("点击数："+data.ACTIVITY.VIEWCOUNT+"次");
                            $("h4").text(data.ACTIVITY.TITLE);
                            $("article").html(data.ACTIVITY.NOTE);
                            $(".badge").text(data.COUNT);
                            infoID = data.ACTIVITY.INID;
                            if (data.MSG!=null && data.MSG!="") {
                               // $("#msg").show();
                                //$("h2").text(data.MSG);
                                $('#info-pre').hide();
                            }
                        }
                    },
                    error: function(msg){
                    }
                });

            })
            //下一页
            $('#info-next').click(function () {
         
                $('#info-pre').show();
                $.ajax({
                    url: basePath+'/admin/information/findFrontOrBehind.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        INID:infoID,ACT:"behind"
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            $("#msg").hide();
                            console.log(data.ACTIVITY.TITLE);
                            $("#infoAuthor").text("发布人："+data.ACTIVITY.AUTHOR);
                            $("#infoTime").text("发布时间："+data.ACTIVITY.RELEASETIME);
                            $("#infoHits").text("点击数："+data.ACTIVITY.VIEWCOUNT+"次");
                            $("h4").text(data.ACTIVITY.TITLE);
                            $("article").html(data.ACTIVITY.NOTE);
                            $(".badge").text(data.COUNT);
                            infoID = data.ACTIVITY.INID;
                            if (data.MSG!=null && data.MSG!="") {
                               // $("#msg").show();
                               // $("h2").text(data.MSG);
                                $('#info-next').hide();

                            }
                        }
                    },
                    error: function(msg){
                    }
                });
            })

            //评论点击窗口弹出
            $('#info-comment').click(function () {
            	 $("#comment-case").html("");
                $('#comment-modal').modal('show');
                $.ajax({
                    url: basePath+'/admin/information/commentThings.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        INID:infoID
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            for (var i = 0; i < data.ACTIVITYLIST.length; i++) {
                                var html = "<li class='bottom-10'>"+
                                    "<div class='bs-divider'>"+data.ACTIVITYLIST[i].COMMENTTIME+"</div>"+
                                    "<span class='label label-success label-tag'>"+data.ACTIVITYLIST[i].CMEMBERNAME+"</span>"+
                                    ""+data.ACTIVITYLIST[i].CONTENT+""+
                                    "</li>";
                                $("#comment-case").append(html);
                            }
                        }
                    },
                    error: function(msg){
                    }
                });
                console.log(infoID)
            })


        }
        //编辑
        function initInformationEdit(infoID){
            console.log(infoID)
            $.ajax({
                url: basePath+'/admin/information/show.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    INID:infoID
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        console.log(data.ACTIVITY.TITLE);
                        console.log(data.ACTIVITY.NOTE);
                        $("#title").val(data.ACTIVITY.TITLE);
              
                        $('#newInformation').froalaEditor('html.set', data.ACTIVITY.NOTE);
                    }
                },
                error: function(msg){
                }
            });
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            
            
            
            initfroalaEditor();
    
          
            //发布
            $('#information-send').click(function () {
               
                var title = $("#title").val();
                var content = $('#newInformation').froalaEditor('html.get', true);
              
                if(title == ""){
                 	 toastr.warning("标题不能为空！");
                  }else if(content == ""){
                  	toastr.warning("内容不能为空！");
                  }else{
                	  $(this).attr('disabled', 'disabled');
                  	  $(this).text('发布中...');
	                $.ajax({
	                    url: basePath+'/admin/information/change.shtml?SAVETYPE=0',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        TITLE:title,NOTE:content,INID:infoID
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                            toastr.success("发布成功!");
	                            initInformationIndex();
	                        }else{
	                        	$(this).removeAttr('disabled');
	                        	  $(this).text('发布');
	                        	  toastr.error("发布失败!");
	                            //alert(data.ERRMSG);
	                        }
	                    },
	                    error: function(msg){
	                    }
	                });
                  }
            });
            //保存草稿
            $('#information-save').click(function () {
               
                var title = $("#title").val();
                
                var content = $('#newInformation').froalaEditor('html.get', true);
                if(title == ""){
                	 toastr.warning("标题不能为空！");
                 }else if(content == ""){
                 	toastr.warning("内容不能为空！");
                 }else{
               	  	  $(this).attr('disabled', 'disabled');
                 	  $(this).text('保存中...');
	                $.ajax({
	                    url: basePath+'/admin/information/change.shtml?SAVETYPE=1',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        TITLE:title,NOTE:content,INID:infoID
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                            toastr.success("保存成功！");
	
	                            initInformationIndex();
	                        }else{
	                        	$('#information-save').removeAttr('disabled');
	                        	$('#information-save').text('保存草稿');
	                            toastr.error("保存失败！");
	                           // alert(data.ERRMSG);
	                        }
	                    },
	                    error: function(msg){
	                    	$('#information-save').removeAttr('disabled');
                        	$('#information-save').text('保存草稿');
                            toastr.error("保存失败！");
	                    }
	                });
                 }
            });
            $('#back').click(function () {
                initInformationIndex();
            })
        }

        function initInformationDraftEdit(infoID){
            console.log(infoID)
            $.ajax({
                url: basePath+'/admin/information/show.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    INID:infoID
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        console.log(data.ACTIVITY.TITLE);
                        console.log(data.ACTIVITY.NOTE);
                        $("#title").val(data.ACTIVITY.TITLE);
                        $('#newInformation').froalaEditor('html.set', data.ACTIVITY.NOTE);
                    }
                },
                error: function(msg){
                }
            });
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            
            initfroalaEditor();
      
            //发布
            $('#information-send').click(function () {
               
                var title = $("#title").val();

                var content = $('#newInformation').froalaEditor('html.get', true);
                if(title == ""){
                	 toastr.warning("标题不能为空！");
                 }else if(content.length == 13){
                 	toastr.warning("内容不能为空！");
                 }else{
               	  	  $(this).attr('disabled', 'disabled');
                 	  $(this).text('发布中...');
	                $.ajax({
	                    url: basePath+'/admin/information/change.shtml?SAVETYPE=0',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        TITLE:title,NOTE:content,INID:infoID
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                            toastr.success("发布成功！");
	
	                            initInformationIndex();
	                        }else{
	                        	$(this).removeAttr('disabled');
	                       	    $(this).text('发布');
	                            toastr.error("发布失败！");
	                           // alert(data.ERRMSG);
	                        }
	                    },
	                    error: function(msg){
	                    }
	                });
                 }
            });
            //保存草稿
            $('#information-save').click(function () {
                
                var title = $("#title").val();

                var content = $('#newInformation').froalaEditor('html.get', true);

                if(title == ""){
               	 toastr.warning("标题不能为空！");
                }else if(content.length == 13){
                	toastr.warning("内容不能为空！");
                }else{
              	  	  $(this).attr('disabled', 'disabled');
                	  $(this).text('保存中...');
	                $.ajax({
	                    url: basePath+'/admin/information/change.shtml?SAVETYPE=1',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        TITLE:title,NOTE:content,INID:infoID
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                            toastr.success("保存成功！");
	                           // alert("保存成功");
	                            initInformationIndex();
	                        }else{
	                        	$(this).removeAttr('disabled');
	                      	    $(this).text('保存草稿');
	                            toastr.error("保存失败！");
	                            //alert(data.ERRMSG);
	                        }
	                    },
	                    error: function(msg){
	                    }
	                });
                }
            });
            $('#back').click(function () {
                initInformationDrafts();
            })
        }


        /*
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable1(title,sendAuthor,dateAT,date) {
            $table = $('#table'),
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/information/informationPage.shtml',
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                height: 601,
                pageList: [12, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                //showRefresh: true,//刷新按钮
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    params.SAVETYPE = "0";
                    params.TITLE = title;
                    params.AUTHOR = sendAuthor;
                    params.STARTTIME = dateAT;
                    params.ENDTIME = date;
                    return params;
                },
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'INID',
                    title: 'ID',
                    
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    formatter: infoDetail,
                    events: 'infoEvents',
                    
                    align: 'center'
                }, {
                    field: 'RELEASETIME',
                    title: '发布时间',
                    
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '发布人',
                    
                    align: 'center'
                },{
                    field: 'VIEWCOUNT',
                    title: '查看次数',
                    
                    align: 'center'
                },{
                    field: 'edit',
                    title: '操作',
                    events: 'editInfoEvents',
                    formatter: operateFormatter,
                    align: 'center'
                }]
            });

            cgxcount();


            function operateFormatter(value, row){
               // return '<a href="#" class="edit"><i class="glyphicon glyphicon-pencil both-5"></i></a>';
            
                var html="";
                if(row.ISSTICK == "0"){
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
                html += '<a href="javascript:void(0)" class="edit"><span class="both-5">编辑</span></a>';
                return html;
            
            }
            //查询草稿箱数量
            function cgxcount(){
                $.ajax({
                    url: basePath+'/admin/information/cgxcount.shtml?SAVETYPE=1',
                    dataType: 'json',
                    type: 'post',
                    data:{
                    },
                    success:function(data){
                        if(data.status == "0"){
                            if (data.count==0) {
                            }else{
                                $(".badge").text(data.count);
                            }
                        }
                    },
                    error: function(msg){
                        console.log("222");
                    }
                });

            }



            function infoDetail(value, row) {
                return '<a href="#" class="infoDetail">' + value + '</a>';
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
            $('#reset').click(function(){
            	$delete.hide();
            	$('input').val("");  
            	$table.bootstrapTable('refresh')
            })
          
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.INID
                });
            }
            /*
             *删除
             */
            $delete.on('click', function deleteLog(){
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
	                                    url: basePath+'/admin/information/delete.shtml',
	                                    dataType: 'json',
	                                    type: 'post',
	                                    data:{
	                                        CHECKID:str
	                                    },
	                                    success:function(data){
	                                        if(data.STATUS == "0"){
	                                            //alert("删除成功");
	                                        	 $delete.hide();
	                                            toastr.success("删除成功！");
	                                            $table.bootstrapTable('refresh');
	                                        }else{
	                                            toastr.error("删除失败！");
	                                            //alert(data.ERRMSG);
	                                        }
	                                    },
	                                    error: function(msg){
	                                    }
	                                });
	                			}
            		  }
            	}) 	
              
            });

            //查询
            $(document).on("click", "#search", function() {
                var starttime = $("#startTime").val();
                var arrA=starttime.split("-");
                var dateA=new Date(arrA[0],arrA[1],arrA[2]);
                var dateAT=dateA.getTime();
                var endtime = $("#endTime").val();
                var arr=endtime.split("-");
                var date=new Date(arr[0],arr[1],arr[2]);
                var date=date.getTime();
                var title = $("#title").val();
                var sendAuthor = $("#author").val();
                $container = $("#main-box");
                $.ajax({
                    url: basePath+"/data/information-index.html",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $container.html(data);
                    }
                });
                if (dateAT>date) {
                    toastr.warning("开始时间不能大于结束时间！");
                    //alert("开始时间不能大于结束时间！");
                    $('input').val("");
                }else{
                    initTable1(title,sendAuthor,starttime,endtime);
                    $("#startTime").val(starttime);
                    $("#endTime").val(endtime);
                    $("#title").val(title);
                    $("#author").val(sendAuthor);
                    initTimepicker();
                }
            });
           
        }

        //草稿箱

        function initTable2() {
            $table = $('#table');
                $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/information/informationPage.shtml?SAVETYPE=1',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                height: 601,
                pageList: [12, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "left",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    return params;
                },
                showRefresh: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'INID',
                    title: 'ID',
                    
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    
                    align: 'center'
                }, {
                    field: 'INFOTYPE',
                    title: '类型',
                    
                    align: 'center',
                    formatter:function(value){
                        if (value==0) {
                            return "新闻";
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: 'RELEASETIME',
                    title: '编辑时间',
                    
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '编辑人',
                    
                    align: 'center'
                },{
                    field: 'edit',
                    title: '操作',
                    events: 'editDraftEvent',
                    formatter: operateFormatter,
                    align: 'center'
                }]
            });

            	
            function operateFormatter(value, row){
            	return '<a href="javascript:void(0)" class="edit"><span class="both-5">编辑</span></a>';
                //return '<a href="#" class="edit"><i class="glyphicon glyphicon-pencil"></i></a>';
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
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.INID
                });
            }
            /*
             *删除
             */
            $delete.on('click', function deleteLog(){
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
            		  title: "操作",
            		  message: "确认删除?",
            		  className: "center", 
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
  	                                  url: basePath+'/admin/information/delete.shtml',
  	                                  dataType: 'json',
  	                                  type: 'post',
  	                                  data:{
  	                                      CHECKID:str
  	                                  },
  	                                  success:function(data){
  	                                      if(data.STATUS == "0"){
  	                                    	 $delete.hide();
  	                                          toastr.success("删除成功！");
  	                                          //alert("删除成功");
  	                                          $table.bootstrapTable('refresh');
  	                                      }else{
  	                                          toastr.error("删除失败！");
  	                                          //alert(data.ERRMSG);
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
}


