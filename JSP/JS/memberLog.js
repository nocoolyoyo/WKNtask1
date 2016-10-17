(function() {
	
    $(function() {
        var $table = $('#table'),
            $delete = $('#delete');
        selections = [];
        var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        initTable();
        deleteIdSelections();

        /*
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */


        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable() {
            $table.bootstrapTable({
                url: basePath+'/admin/log/findPagerUserLog.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                pageSize: 10,//单页记录数
                height: 600,
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
                    sortable: true,
                    visible: false,
                    align: 'center'
                },{
                    field: 'USERNAME',
                    title: '用户名称',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'UPDATETIME',
                    title: '操作时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'NOTE',
                    title: '操作内容',
                    sortable: true,
                    align: 'center'
                }]
            });
        }

        /*
         *  功能：获取选择框信息
         *  Created by nocoolyoyo 2016/9/28.
         */
        function deleteIdSelections(){
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
        }

        function getIdSelections() {
            return $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.LOGID
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
            		url: basePath+'/admin/log/deleteUserLog.shtml',
            		dataType: 'json',
            		type: 'post',
            		data:{
            			CHECKBOXID:str
            		},
            		success:function(data){
            			if(data.STATUS == "0"){
            				alert("删除成功");
            				$table.bootstrapTable('refresh');
            			}
            		},
            		error: function(msg){
            		}
            	});
    		}
    	});
        
    });
}());


