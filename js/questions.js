(function() {
    $(function() {
        var $table = $('#table'),
            $delete = $('#delete');
        	$export = $('#export');
        selections = [];
        var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;
    	
    	/*
         *  功能：入口初始化
         */
    
    	initInformationIndex();
	 
    	 /*
          *  功能：页面初始化
          *  Created by nocoolyoyo 2016/9/28.
          */
         
         function initInformationIndex(){
             $container = $("#main-box");
             $.ajax({
                 url: basePath+"/data/questions-index.html",
                 async: false,
                 dataType : 'html',
                 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                 success: function (data) {
                     $container.html(data);
                 }
             });
             initTable();
             initTimepicker();
             $(document).unbind('click').on("click", ".questionDetail", function() {
        		 initQuestionDialog($(this).attr('data-id'));  
             });
         }
         
	     function initQuestionDialog(id) {
	    	 console.log(id);
	         $container = $("#main-box");
	         $.ajax({
	             url: basePath+'/data/questions-dialog.html',
	             async: false,
	             dataType : 'html',
	             contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	             success: function (data) {
	                 $container.html(data);
	             }
	         });
	         $('#back').click(function () {
	                initInformationIndex();
	            })
	           
	         $("#questions-send").on('click',function(){
	        	 var plcontent = $("#questions-plcontent").val();
	        	 $.ajax({
	            		url: basePath+'/admin/question/reply.shtml',
	            		dataType: 'json',
	            		type: 'post',
	            		data:{
	            			REPLYCONTENT:plcontent,QUESTIONID:id
	            		},
	            		success:function(data){
	            			if(data.STATUS == "0"){
	            			
	            				toastr.success("回复成功！");
	            				initQuestionDialog(id);
	            			}else{
	            				toastr.error(data.ERRMSG);
	            			
	            			}
	            		},
	            		error: function(msg){
	            		}
	            	});
	        	 
	         });
	         
	         detail(id);
	     }
    	function detail(id){
    		 $.ajax({
	         		url: basePath+'/admin/question/finddatil.shtml',
	         		dataType: 'json',
	         		type: 'post',
	         		data:{
	         			QUESTIONID:id
	         		},
	         		success:function(data){
	         			if(data.STATUS == "0"){
	         				$("h4").text(data.QUESTION.TITLE);
	         				$("#questions-Author").text(data.QUESTION.REALNAME);
	         				$("#questions-Time").text(data.QUESTION.SUBMITTIME);
	         				$("p").text(data.QUESTION.DETAIL);
	         				var html="";
	         				for (var int = 0; int < data.QUESTION.REPLYLIST.length; int++) {
	         					if (data.QUESTION.REPLYLIST[int].REPLYROLE==1) {
	             					html = "<li class='bottom-10'> <div class='bs-divider'>"+data.QUESTION.REPLYLIST[int].REPLYTIME+"</div> <span class='label label-danger label-tag'>"+data.QUESTION.REPLYLIST[int].REPLYNAME+"</span>"+data.QUESTION.REPLYLIST[int].REPLYCONTENT+"</li>"
	             					$("#dialog-case").append(html);
									}else{
	             					html = "<li class='bottom-10'> <div class='bs-divider'>"+data.QUESTION.REPLYLIST[int].REPLYTIME+"</div> <span class='label label-success label-tag'>"+data.QUESTION.REPLYLIST[int].REPLYNAME+"</span>"+data.QUESTION.REPLYLIST[int].REPLYCONTENT+"</li>"
	             					$("#dialog-case").append(html);
									}
								}
	         			}
	         		},
	         		error: function(msg){
	         		}
	         	});
    	}
    	

        
        
    	
       
        /*
         *  功能：日期选择器初始化
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
        function initTable(title,starttime,endtime) {
        	 $table = $('#table'),
             $delete = $('#delete');
            $table.bootstrapTable({
            	 url: basePath+'/admin/question/pageQuestion.shtml',
                 dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                 pagination: true,//是否分页
                 pageSize: 10,//单页记录数
                 pageList: [10, 25, 50, 100],
                 sidePagination: "server",//服务端分页
                 contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                 dataType: "json",//期待返回数据类型
                 method: "post",//请求方式
                 height: 601,
                 showColumns: true,
                 showToggle: true,
                 queryParamsType: "limit",//查询参数组织方式
       
                 queryParams: function getParams(params) {
                     //params obj
                 	//params.other = "otherInfo";
                	 params.TITLE = title;
                	 params.STARTTIME = starttime;
                	 params.ENDTIME = endtime;
                	 
                     return params;
                 },
                 // sidePagination: "server",
                 toolbar: "#table-toolbar",
                 //showRefresh: true,//刷新按钮
                 //showColumns: true,
                 
                // detailFormatter: detailFormatter,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'QUESTIONID',
                    title: '主键ID',
                    
                    align: 'center',
                    visible: false
                }, {
                    field: 'ISREAD',
                    title: '状态',
                    
                    //editable: true,
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
                    title: '问题反馈标题',
                    
                    formatter: questionDetail,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '反馈者',
                    
                    align: 'center'
                }, {
                    field: 'SUBMITTIME',
                    title: '反馈时间',
                    
                    align: 'center'
                }]
            });
            
            
            function questionDetail(value, row){
            	   return '<a href="#" class="questionDetail" data-id="' + row.QUESTIONID + '">' + value + '</a>';
            	
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
                    return row.QUESTIONID
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
 	                           		url: basePath+'/admin/question/batchdelete.shtml',
 	                           		dataType: 'json',
 	                           		type: 'post',
 	                           		data:{
 	                           			CHECKBOXID:str
 	                           		},
 	                           		success:function(data){
 	                           			if(data.STATUS == "0"){
 	                           				toastr.success("删除成功");
 	                           		
 	                           				$table.bootstrapTable('refresh');
 	                           			}
 	                           		},
 	                           		error: function(msg){
 	                           		}
 	                           	});

 	                			}
	           		  }
	           	}); 
                
                
           
        	});

          //导出会员列表
            $('#export').click(function (){
            	var title = $('#title').val();
	           	var starttime =  $('#startTime').val();
	           	 var endtime =  $('#endTime').val();
        		window.location.href = basePath+"/admin/question/export.shtml?STARTTIME="+starttime+"&ENDTIME="+endtime+"&TITLE="+title;
            });
            $('#reset').click(function(){
             	$('input').val("");
             	initInformationIndex();
             });
              $('#search').click(function(){
            	    var starttime = $("#startTime").val();
	              	var arrA=starttime.split("-");
	              	var dateA=new Date(arrA[0],arrA[1],arrA[2]);
	              	var dateAT=dateA.getTime();
	              	var endtime = $("#endTime").val();
	              	var arr=endtime.split("-");
	              	var date=new Date(arr[0],arr[1],arr[2]);
	              	var date=date.getTime();
	              	var title = $('#title').val();
	              	$container = $("#main-box");
	              	 $.ajax({
	              		 url: basePath+"/data/questions-index.html",
	                     async: false,
	                     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	                     success: function (data) {
	                         $container.html(data);
	                     }
	                 });
	              	if (dateAT>date) {
	              		toastr.warning("开始时间不能大于结束时间！");
					
				        $('input').val("");
				        initInformationIndex();
					}else{
						initTable(title,starttime,endtime);
						$("#startTime").val(starttime);
						$("#endTime").val(endtime);
						$("#title").val(title);
						 initTimepicker();
					}
             })
             
            //条件查询
           /* $("#search").click(function (){
            	var starttime = $("#starttime").val();
            	var endtime = $("#endtime").val();
            	var title = $("#title").val();
            	$.ajax({
            		url: basePath+'/admin/question/pageQuestion.shtml',
            		dataType: 'json',
            		type: 'post',
            		data:{
            			STARTTIME:starttime,ENDTIME:endtime,TITLE:title
            		},
            		success:function(data){
            			if(data.status == "0"){
            				$table.bootstrapTable('refresh');
            			}
            		},
            		error: function(msg){
            		}
            	});
            });*/
            
        }


        
    });
}());


