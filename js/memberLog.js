(function() {
    $(function() {
        var $table = $('#table'),
            $delete = $('#delete');
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
                url: basePath+"/data/memberLog-index.html",
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
        /*
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */

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
        function initTable(name,starttime,endtime) {
        	$table = $('#table'),
            $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/log/findPagerUserLog.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                height: 600,
                pageList: [12, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                showColumns: true,
                showToggle: true,
                searchAlign: "left",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                	//params.other = "otherInfo";
                	params.STARTTIME = starttime;
                	params.ENDTIME = endtime;
                	params.NAME = name;
                    return params;
                },
                // sidePagination: "server",
                toolbar: "#table-toolbar",
//                showRefresh: true,//刷新按钮
                //showColumns: true,

                // detailFormatter: detailFormatter,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'LOGID',
                    title: '主键ID',
                    
                    visible: false,
                    align: 'center'
                },{
                    field: 'USERNAME',
                    title: '用户名称',
                    
                    align: 'center'
                }, {
                    field: 'UPDATETIME',
                    title: '操作时间',
                    
                    align: 'center'
                }, {
                    field: 'NOTE',
                    title: '操作内容',
                    
                    align: 'center'
                }]
            });
            
            //重置
            $('#reset').click(function(){
             	$('input').val("");
             	initInformationIndex();
             });
            //查询
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
             		 url: basePath+"/data/memberLog-index.html",
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
                return row.LOGID
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
	                            		url: basePath+'/admin/log/deleteUserLog.shtml',
	                            		dataType: 'json',
	                            		type: 'post',
	                            		data:{
	                            			CHECKBOXID:str
	                            		},
	                            		success:function(data){
	                            			if(data.STATUS == "0"){
	                            				//alert("删除成功");
	                            				$delete.hide();
	                            				toastr.success('删除成功!');

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
      } 
    });
}());


