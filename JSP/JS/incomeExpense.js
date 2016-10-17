(function(){
    $(function() {
    	var $table = $('#table'),
        $delete = $('#delete');
        $export = $('#export');
        selections = [];
        var id;
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
                url: basePath+"/data/incomeexpense-index.html",
                async: false,
                dataType : 'html',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable();
            initTimepicker();
        }
    	
    	
    	 $(document).on("click", ".incomeExDetail", function() {
    		 $("#incomeName").val("");//收支名称
         	 $("#incomeMoney").val("");//收支金额
         	 $("textarea").val("");//描述
         	 var mydate = new Date();
             var todayDate = "" + mydate.getFullYear() + "-";
             todayDate += (mydate.getMonth()+1) + "-";
             todayDate += mydate.getDate();
         	 $("#incomeTime").val(todayDate);//时间
         	 $("#incomeSelect").val(1);//类型
    		 $(".modal-title").text("修改收支");
             incomeExDetail($(this).attr('data-id'));
             id=$(this).attr('data-id');
         });
    	 
    	 $(document).on("click", "#add", function() {
    		 	id=null;
    		 	$("#incomeName").val("");//收支名称
            	$("#incomeMoney").val("");//收支金额
            	$("textarea").val("");//描述
            	initDate()
            	//var mydate = new Date();
                //var todayDate = "" + mydate.getFullYear() + "-";
                //todayDate += (mydate.getMonth()+1) + "-";
                //todayDate += mydate.getDate();
            	$("#incomeTime").val(todayDate);//时间
            	$("#incomeSelect").val(1);//类型
    			 $(".modal-title").text("添加收支");
         });
    	

        initTable();
        initTimepicker();
        initDate();
        /*
         *  功能：获取当前时间并对选择器赋值
         *  Created by nocoolyoyo 2016/10/10.
         */
        function initDate(){

            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "-";
            todayDate += (mydate.getMonth()+1) + "-";
            todayDate += mydate.getDate();
            $('#incomeTime').val(todayDate);
        }
        /*
         *  功能：表单验证
         *  Created by nocoolyoyo 2016/9/28.
         */
        $('form').bootstrapValidator({
            message: '所有值不能为空',
            excluded: [':disabled'],
            fields: {
                incomeName: {
                    validators: {
                        notEmpty: {
                            message: '请输入收支名称！'
                        }
                    }
                },
                incomeMoney: {
                    validators: {
                        notEmpty: {
                            message: '请输入金额！'
                        },
                        regexp: {
                            regexp: /^[0-9]+(.[0-9]{2})?$/,
                            message: '请输入正确的金额！'
                        }
                    }
                },
                incomeTime: {
                    validators: {
                        notEmpty: {
                            message: '请选择收支时间！'
                        }
                    }
                },
                datetimePicker: {
                    validators: {
                        notEmpty: {
                            message: '时间不能为空'
                        }
                    }
                }
            }
        });
        
        //编辑
        function incomeExDetail(id){
        	$.ajax({
        		url: basePath+'/admin/income/findDetailIE.shtml',
        		dataType: 'json',
        		type: 'post',
        		data:{
        			INCOMEID:id
        		},
        		success:function(data){
        			if(data.STATUS == "0"){
        				console.log(data.INCOMEEXPENSES.INCOMTIME);
        				$("#incomeName").val(data.INCOMEEXPENSES.INCOMENAME);//收支名称
        				$("#incomeMoney").val(data.INCOMEEXPENSES.INCOMEMONEY);//收支金额
        				$("textarea").text(data.INCOMEEXPENSES.INCOMEDESC);//描述
        				$("#incomeTime").val((data.INCOMEEXPENSES.INCOMTIME).substring(0,11));//时间
        				$("#incomeSelect").val(data.INCOMEEXPENSES.INCOMETYPE);//类型
        			}
        		},
        		error: function(msg){
        		}
        	});
        	
        }
        
        /*
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable(title,sendAuthor,starttime,endtime) {
            $table = $('#table');
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/income/findPageIE.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                showColumns: true,
                height: 600,
                pageSize: 10,//单页记录数
                pageList: [10, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "left",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                	//params.other = "otherInfo";
                	params.INCOMENAME = title;
            		params.AUTHOR = sendAuthor;
            		params.STARTTIME = starttime;
            		params.ENDTIME = endtime;
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
                    field: 'INCOMEID',
                    title: 'ID',
                    sortable: true,
                    align: 'center',
                    visible: false
                }, {
                    field: 'INCOMENAME',
                    title: '收支名称',
                    formatter: incomeExDetalFormat,
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'INCOMEMONEY',
                    title: '收支金额',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'INCOMTIME',
                    title: '发生时间',
                    sortable: true,
                    align: 'center',
                    formatter:function(value){
                    	if (value!=null) {
                    		var time = value.substring(0,11);
    						return time;
    					}
                    }
                }, {
                    field: 'INCOMETYPE',
                    title: '收支类型',
                    sortable: true,
                    align: 'center',
                    formatter:function(value){
                    	if (value==1) {
    						return "收入";
    					}else if(value == 2){
    						return "支出";
    					}
                    }
                }, {
                    field: 'REALNAME',
                    title: '处理人',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'DEALTIME',
                    title: '处理时间',
                    sortable: true,
                    align: 'center'
                }]
            });
            
            function incomeExDetalFormat(value, row){
             	return '<a href="#" class="incomeExDetail"  data-toggle="modal" data-target="#incomeExpense-modal" data-id="' + row.INCOMEID + '">' + value + '</a>'; 
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
                    return row.INCOMEID
                });
            }
            
          //导出
            $("#export").click(function (){
            	var title = $('#title').val();
	           	var starttime =  $('#startTime').val();
	           	 var endtime =  $('#endTime').val();
	           	var sendAuthor = $("#author").val();
        		window.location.href = basePath+"/admin/income/export.shtml?STARTTIME="+starttime+"&ENDTIME="+endtime+"&INCOMENAME="+title+"&REALNAME="+sendAuthor;
            });
            
            //查询
            $("#search").click(function() {
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
             		 url: basePath+"/data/incomeexpense-index.html",
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
					initTable(title,sendAuthor,starttime,endtime);
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
                		url: basePath+'/admin/income/deleteAllIE.shtml',
                		dataType: 'json',
                		type: 'post',
                		data:{
                			CHECKBOXID:str
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
        function isMoney(s) {   
            var regu = "^[0-9]+[\.][0-9]{0,3}$";   
            var re = new RegExp(regu);   
            if (re.test(s)) {   
                return true;   
            } else {   
                return false;   
            }   
        }  
       
        

        //新增修改保存
        $("#submit").on('click',function(){
        	var incomeName = $("#incomeName").val();//收支名称
        	var incomeMoney = $("#incomeMoney").val();//收支金额
        	var incomeContent = $("textarea").val();//描述
        	var incomeTime = $("#incomeTime").val();//时间
        	var incomeSelect =$("#incomeSelect").val();//类型
        	
        	if (incomeName=="") {
				alert("*请输入收支名称！");
				return;
			}else
        	if (incomeMoney=="") {
				alert("*请输入收支金额！");
				return;
			}else{
				if (id!=null) {
	        		$.ajax({
		        		url: basePath+'/admin/income/updateIE.shtml',
		        		dataType: 'json',
		        		type: 'post',
		        		data:{
		        			INCOMENAME:incomeName,INCOMEMONEY:incomeMoney,INCOMEDESC:incomeContent,
		        			INCOMETYPE:incomeSelect,INCOMTIME:incomeTime,INCOMEID:id
		        		},
		        		success:function(data){
		        			if(data.STATUS == "0"){
		        				alert("修改成功");
		        				$table.bootstrapTable('refresh');
		        			}else{
		        				alert(data.ERRMSG);
		        			}
		        		},
		        		error: function(msg){
		        		}
		        	});
				}else{
					$.ajax({
		        		url: basePath+'/admin/income/insertIE.shtml',
		        		dataType: 'json',
		        		type: 'post',
		        		data:{
		        			INCOMENAME:incomeName,INCOMEMONEY:incomeMoney,INCOMEDESC:incomeContent,
		        			INCOMETYPE:incomeSelect,INCOMTIME:incomeTime
		        		},
		        		success:function(data){
		        			if(data.STATUS == "0"){
		        				alert("新增成功");
		        				$table.bootstrapTable('refresh');
		        			}else{
		        				alert(data.ERRMSG);
		        			}
		        		},
		        		error: function(msg){
		        		}
		        	});
				}
			}
        })
        
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

    });
}());

