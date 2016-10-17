(function(){
    $(function() {
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
        $(document).on("click", ".infoDetail", function() {
            initInformationDetail($(this).attr('data-id'));
        });
        $(document).on("click", ".edit", function() {
        	initInformationEdit($(this).attr('data-id'));
        });
        
     

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
            
            $('#newInformation').summernote({
                lang: 'zh-CN',
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
            });
            //发布
            $('#information-send').click(function () {
                	var title = $("#title").val();
                    var content = $('#newInformation').summernote('code');
                    console.log(title);
                    console.log(content);
                    $.ajax({
                		url: basePath+'/admin/information/release.shtml?SAVETYPE=0',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			TITLE:title,NOTE:content
                		},
                		success:function(data){
                			if(data.STATUS == "0"){
                					alert("新增成功");
                					initInformationIndex();
                			}else{
                				alert(data.ERRMSG);
                			}
                		},
                		error: function(msg){
                		}
                	});
            });
            //保存草稿
            $('#information-save').click(function () {
                	var title = $("#title").val();
                    var content = $('#newInformation').summernote('code');
                    console.log(title);
                    console.log(content);
                    $.ajax({
                		url: basePath+'/admin/information/release.shtml?SAVETYPE=1',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			TITLE:title,NOTE:content
                		},
                		success:function(data){
                			if(data.STATUS == "0"){
                					alert("保存成功");
                			        initInformationIndex();
                			}else{
                				alert(data.ERRMSG);
                			}
                		},
                		error: function(msg){
                		}
                	});
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
            })
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
            })
            //上一页
            $('#info-pre').click(function () {
            	console.log(infoID);
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
            				infoID = data.ACTIVITY.INID; 
            				if (data.MSG!=null && data.MSG!="") {
            					$("#msg").show();
            					$("h2").text(data.MSG);
            				}
            			}
            		},
            		error: function(msg){
            		}
            	});
            })
            //下一页
            $('#info-next').click(function () {
            	console.log(infoID);
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
            				infoID = data.ACTIVITY.INID; 
            				if (data.MSG!=null && data.MSG!="") {
            					$("#msg").show();
            					$("h2").text(data.MSG);
            				}
            			}
            		},
            		error: function(msg){
            		}
            	});
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
        				$('#newInformation').summernote('code', data.ACTIVITY.NOTE);
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
            
            $('#newInformation').summernote({
                lang: 'zh-CN',
                disableDragAndDrop: true,
                height: 400,
                minHeight: 400,
                maxHeight: 400,
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'color', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript','fontsize','height','fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['picture', ['picture']],
                    ['undo', ['undo']],
                    ['redo', ['redo']]
                ]
            });
            //发布
            $('#information-send').click(function () {
            		console.log(infoID);
                	var title = $("#title").val();
                    var content = $('#newInformation').summernote('code');
                    console.log(title);
                    console.log(content);
                    $.ajax({
                		url: basePath+'/admin/information/change.shtml?SAVETYPE=0',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			TITLE:title,NOTE:content,INID:infoID
                		},
                		success:function(data){
                			if(data.STATUS == "0"){
                					alert("发布成功");
                					initInformationIndex();
                			}else{
                				alert(data.ERRMSG);
                			}
                		},
                		error: function(msg){
                		}
                	});
            });
            //保存草稿
            $('#information-save').click(function () {
            		console.log(infoID);
                	var title = $("#title").val();
                    var content = $('#newInformation').summernote('code');
                    console.log(title);
                    console.log(content);
                    $.ajax({
                		url: basePath+'/admin/information/change.shtml?SAVETYPE=1',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			TITLE:title,NOTE:content,INID:infoID
                		},
                		success:function(data){
                			if(data.STATUS == "0"){
                					alert("保存成功");
                			        initInformationIndex();
                			}else{
                				alert(data.ERRMSG);
                			}
                		},
                		error: function(msg){
                		}
                	});
            });
            $('#back').click(function () {
                initInformationIndex();
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
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    formatter: infoDetail,
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'RELEASETIME',
                    title: '发布时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '发布人',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'VIEWCOUNT',
                    title: '查看次数',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'edit',
                    title: '操作',
                    formatter: operateFormatter,
                    align: 'center'
                }]
            });
            
            cgxcount();
            
            
            function operateFormatter(value, row){
          
            	return '<a href="#" class="edit" data-id="' + row.INID + '"><i class="glyphicon glyphicon-pencil"></i></a>'; 
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
 
                return '<a href="#" class="infoDetail" data-id="' + row.INID + '">' + value + '</a>';
                
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
                    return row.INID
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
            	console.log(str)
        		if(confirm('确认删除吗？')){
        			$.ajax({
                		url: basePath+'/admin/information/delete.shtml',
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
					alert("开始时间不能大于结束时间！");
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
            $('#reset').click(function(){
            	$('input').val("");
            	initInformationIndex();
            });
        }
        
        //草稿箱
        
        function initTable2() {
        	 $table = $('#table'),
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
                     sortable: true,
                     align: 'center'
                 }, {
                     field: 'TITLE',
                     title: '标题',
                     sortable: true,
                     align: 'center'
                 }, {
                     field: 'INFOTYPE',
                     title: '类型',
                     sortable: true,
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
                     sortable: true,
                     align: 'center'
                 }, {
                     field: 'REALNAME',
                     title: '编辑人',
                     sortable: true,
                     align: 'center'
                 },{
                	 field: 'edit',
                     title: '操作',
                     formatter: operateFormatter,
                     align: 'center'
                 }]
             });
        	 
        	 
        	  function operateFormatter(value, row){
                  
              	return '<a href="#" class="edit" data-id="' + row.INID + '"><i class="glyphicon glyphicon-pencil"></i></a>'; 
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
                     return row.INID
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
             	console.log(str)
         		if(confirm('确认删除吗？')){
         			$.ajax({
                 		url: basePath+'/admin/information/delete.shtml',
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


