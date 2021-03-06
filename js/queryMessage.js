(function(){
    $(function() {
        var $table;
        pageNum = 0;//默认进入页面下表，即occupation默认进入页面
        var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;
    	var $container;
        $(document).on("click", "#menu > li", function() {
            pageNum = $(this).index();
            switch (pageNum) {
                case 0: initQueryMessageGet(); break;
                case 1: initQueryMessageSend();  break;
            }
        });
        
        
        $(document).on('click', ".queryMessage-getDetail", function(){
        	console.log($(this).attr('data-id'))
        	 initQueryMessageGetDetail($(this).attr('data-id'));
            
        })
         $(document).on('click', ".queryMessage-sendDetail", function(){
        	console.log($(this).attr('data-id'))
        	 initQueryMessageSendDetail($(this).attr('data-id'));
            
        })
        
        
        /*
         * 功能：多文本编辑器初始化
         * 
         */  
        function initfroalaEditor(){
        	$('#newQueryMessage').froalaEditor({
        		height: 400,
                theme: 'gray',
                language: 'zh_cn',
                allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
                imageUploadURL: basePath+'/admin/upload.shtml',
                imageUploadParams: {savePath:"gongshanglian"},
                imageMaxSize: 1024*1024*5,
                imageDefaultWidth : 0,
                fileUploadURL: basePath+'/admin/upload.shtml',
                fileUploadParams: {
                	folderid: '1'
                  }
            }).on('froalaEditor.image.uploaded', function (e, editor, response) { 
          	  var obj = JSON.parse(response);
        	  slturl = obj.slturl;
        	   $('#newQueryMessage').on('froalaEditor.image.loaded', function (e, editor, $img) {
	              	$img.attr('src',slturl);	
	              	$('#newQueryMessage').off('froalaEditor.image.loaded');
              });
            }).on('froalaEditor.image.beforeUpload', function (e, editor, images) {
            	  console.log(editor);// Do something here.
            	  console.log(images[0].name);// Do something here.
            }).on('froalaEditor.image.error', function (e, editor, error) {
            	  if(error.code == 5){
            		  $('.fr-message').text('图片太大，请控制在5M以内');
            	  }else if(error.code == 1){   
            		  $('.fr-message').text('网络异常');
            	  }// Do something here.
            });
        }
        
        
        $(document).on("click", "#write-queryMessage", function() {
        	initQueryMessageCreate();
          //发送消息保存
            $("#queryMessage-save").click(function(){
            	var queryMTitle = $("#queryMTitle").val();
            	var content = $('#newQueryMessage').froalaEditor('html.get', true);
            
                if(queryMTitle == ""){
                	 toastr.warning("标题不能为空！");
                }else if(content ==""){
                	toastr.warning("内容不能为空！");
                }else{
                	
                	$.ajax({
                		url: basePath+'/admin/commercial/sendMsg.shtml',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			TITLE:queryMTitle,CONTENT:content
                		},
                		success:function(data){
                			if(data.STATUS == "0"){
                					toastr.success("新增成功！");
                					initQueryMessageGet();
                			}else{
                				toastr.error(data.ERRMSG);
                				$("#queryMessage-save").removeAttr('disabled');
                				$("#queryMessage-save").text('保存');
                			}
                		},
                		error: function(msg){
                			toastr.error(data.ERRMSG);
                			$("#queryMessage-save").removeAttr('disabled');
            				$("#queryMessage-save").text('保存');
                		}
                	});
                	$(this).attr('disabled', 'disabled');
               	    $(this).text('保存中...');
                }
            	
            })
        });
        
        /*
         *  功能：工商联新建
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initQueryMessageCreate(){
        	$container = $("#main-box");
            $.ajax({
                url:basePath+"/data/queryMessage-CREATE.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initSidebar();
            
            initfroalaEditor();
            
     
            $('#back').click(function () {
            	initQueryMessageSend();
            })
        }
        
        /*
         *  功能：工商联详细页
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initQueryMessageGetDetail(id){
        	 $container = $("#main-box");
             $.ajax({
                 url:basePath+"/data/queryMessage-getDetail.html",
                 async: false,
                 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                 success:function(data)
                 {
                     $container.html(data);
                 }
             });
             $.ajax({
         		url: basePath+'/admin/commercial/msgdatil.shtml',
         		dataType: 'json',
         		type: 'post',
         		data:{
         			INSID:id,TYPE:"1"
         		},
         		success:function(data){
         			if(data.STATUS == "0"){
         					$("h4").text(data.RECIVEDATIL.TITLE+"");
         					$("#queryMessage-Time").text(data.RECIVEDATIL.SENDTIME+"");
         					$("#queryMessageAuthor").text("发布人："+data.RECIVEDATIL.SENDNAME+"");
         					$("#queryMessage-recevier").text("发布方："+data.RECIVEDATIL.CANAME+"");
         					$("article").text(data.RECIVEDATIL.CONTENT+"");
         					if (data.SH[1]==null && data.SH[0]==null ) {
         						$("#queryMessage-sender").text("接收方：无");
							}else{
								$this = $('<span>接收方：</span><a role="button" data-toggle="collapse" href="#SendUsers" aria-expanded="false" aria-controls="collapseExample">查看详情</a>'
										+'<div class="collapse" id="SendUsers">'
											+'<div class="well" style="margin-bottom: 0;">'
											+'</div>'
										+'</div>');
										if(data.SH[0] !=null && data.SH[0].CANAME != null){
											$this.find('.well').append('<div>工商联：'+data.SH[0].CANAME+'</div>');
										}
										if(data.SH[1] !=null && data.SH[1].CANAME != null){
											$this.find('.well').append('<div>商会：'+data.SH[1].CANAME+'</div>');
										}
								$("#queryMessage-sender").append($this);
							}
         			}else{
         				toastr.error(data.ERRMSG);
         			
         			}
         		},
         		error: function(msg){
         		}
         	});
             initSidebar();
             $('#back').click(function () {
            	 initQueryMessageGet();
             })
        }
        //发送消息详情
        function initQueryMessageSendDetail(id){
       	 $container = $("#main-box");
            $.ajax({
                url:basePath+"/data/queryMessage-sendDetail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(data)
                {
                    $container.html(data);
                }
            });
            $.ajax({
         		url: basePath+'/admin/commercial/msgdatil.shtml',
         		dataType: 'json',
         		type: 'post',
         		data:{
         			INSID:id,TYPE:"2"
         		},
         		success:function(data){
         			if(data.STATUS == "0"){
         				$("h4").text(data.SENDDATIL.TITLE+"");
     					$("#queryMessage-Time").text(data.SENDDATIL.SENDTIME+"");
     					$("#queryMessageAuthor").text("发布人："+data.SENDDATIL.SHNAME+"");
     					$("#queryMessage-recevier").text("发布方："+data.SENDDATIL.SENDNAME+"");
     					$("article").text(data.SENDDATIL.CONTENT+"");
     					if (data.SENDDATIL.RECIVENAME=="") {
     						$("#queryMessage-sender").text("接收方：无");
						}else{
							$this = $('<span>接收方：</span><a role="button" data-toggle="collapse" href="#SendUsers" aria-expanded="false" aria-controls="collapseExample">查看详情</a>'
									+'<div class="collapse" id="SendUsers">'
										+'<div class="well" style="margin-bottom: 0;">'
											+'<div>工商联：'+data.SENDDATIL.RECIVENAME+'</div>'
										+'</div>'
									+'</div>');
							$("#queryMessage-sender").append($this);
						}
         			}else{
         				toastr.error(data.ERRMSG);
         			
         			}
         		},
         		error: function(msg){
         		}
         	});
            initSidebar();
            $('#back').click(function () {
           	 initQueryMessageGet();
            })
       }
        
        /*
         *  功能：主页面初始化
         *  Created by nocoolyoyo 2016/10/13.
         */
        function initQueryMessageGet(){
        	 $container = $("#main-box");
        	$.ajax({
                url: basePath+"/data/queryMessage-GET.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(data)
                {
                    $container.html(data);
                }
            });
        	initTable1();
        	initSidebar();
        }
        function initQueryMessageSend(){
        	$container = $("#main-box");
        	$.ajax({
                url: basePath+"/data/queryMessage-SEND.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(data)
                {
                    $container.html(data);
                }
            });
        	initTable2();
        	initSidebar();
        }
        
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
            //});
        }

        selections = [];
        initSidebar();
        initTable1();



        /*
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */
  
       
        /*
         *  功能：接收消息列表
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initTable1() {
            $table = $('#table');
            $table.bootstrapTable({
                url:  basePath+'/admin/commercial/receiveOrSendMsg.shtml?TYPE=1',
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
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
//                detailView: true,
                showRefresh: true,
                search: true,
                searchAlign: "right",//查询框对齐方式
                columns: [
//                {
//                    field: 'state',
//                    checkbox: true
//
//                },
                {
                    field: 'INSID',
                    title: 'ID',
                    
                    align: 'center',
                    visible: false
                },{
                    field: 'ISRED',
                    title: '状态',
                    
                    align: 'center',
                    formatter:function(value){
                    	if (value==1) {
    						return "已读";
    					}else{
    						return "<h style='color:red'>未读</h>";
    					}
                    }
                }, {
                    field: 'TITLE',
                    title: '标题',
                    
                    formatter: queryMessageGetDetail,
                    align: 'center'
                },{
                    field: 'CANAME',
                    title: '发布方',
                    
                    align: 'center'
                },{
                    field: 'SENDTIME',
                    title: '发布时间',
                    
                    align: 'center'
                }]
            });

        }
        
        
        //消息详情页面
        function queryMessageGetDetail(value, row){
           	return '<a href="#" class="queryMessage-getDetail" data-id="' + row.INSID + '">' + value + '</a>';      
        }
        
        
        //发送消息列表
        function initTable2() {
        	$table = $('#table');
            $table.bootstrapTable({
                url:  basePath+'/admin/commercial/receiveOrSendMsg.shtml?TYPE=2',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 600,
                pageSize: 12,//单页记录数
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
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                showRefresh: true,
//                detailView: true,
                search: true,
                searchAlign: "right",//查询框对齐方式
                columns: [
//                {
//                    field: 'state',
//                    checkbox: true
//
//                },
                {
                    field: 'INSID',
                    title: 'ID',
                    
                    align: 'center',
                    visible: false
                },{
                    field: 'TITLE',
                    title: '标题',
                    
                    formatter: queryMessageSendDetail,
                    align: 'center'
                },{
                    field: 'CANAME',
                    title: '发布人',
                    
                    align: 'center'
                },{
                    field: 'SENDTIME',
                    title: '发布时间',
                    
                    align: 'center'
                }]
            });
            
            
            //消息详情页面
            function queryMessageSendDetail(value, row){
               	return '<a href="#" class="queryMessage-sendDetail" data-id="' + row.INSID + '">' + value + '</a>';      
            }
            
        }
    });
}());


