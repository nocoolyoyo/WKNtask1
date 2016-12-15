(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        var SUPPLYID;

        initTable1();
        initTimepicker();

        $(document).on("click", ".comment", function() {
            initSupplyComment($(this).attr('data-id'));
        });
        $(document).on("click", ".supplyDetail", function() {
            initSupplyDetail($(this).attr('data-id'));
        });
        //上一条
        $(document).on("click", "#info-pre", function() {
            initInfoPreOrNext(SUPPLYID,"FRONT");
        });
        //下一条
        $(document).on("click", "#info-next", function() {
            initInfoPreOrNext(SUPPLYID,"BEHIND");
        });


        function initSupplyComment(id){
            console.log(id)
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/supply-comment.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            //取评论信息
            $.ajax({
                url: basePath+"/admin/supply/supplyComment.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SUPPLYID:id},
                dataType:"json",
                success: function (data) {
                    $(".text-indent-40").html(data.content);
                    var li = "";
                    for(var i=0; i<data.list.length; i++){
                        li = li + "<li class='bottom-10'>"
                            +"<div class='bs-divider'>"+data.list[i].COMMENTTIME+"</div>"
                            +"<span class='label label-success  label-tag'>"+data.list[i].CMEMBERNAME+"</span>"
                            +data.list[i].CONTENT+"<a class='deleteComment' data-id=' "+ data.list[i].SCID + "'><i class='glyphicon glyphicon-trash'></i></a>"
                            +"</li>";
                    }
                    $("#comment-case").html(li);
                }
            });
            $('#back').click(function(){
                initSupplyIndex();
            })
            //删除评论
            $('.deleteComment').click(function(){
            	
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
   	                                 url: basePath+"/admin/supply/deleteSupplyComment.shtml",
   	                                 async: false,
   	                                 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
   	                                 data:{SCID:$(this).attr('data-id')},
   	                                 dataType:"json",
   	                                 success: function (data) {
   	                     
   	                       				toastr.success('删除成功!');

   	                                     initSupplyComment(id);
   	                                 }
   	                             });
   	                			}
             		  }
             	}); 
            	
            
            })
        }
        $('#reset').click(function(){
            $('input').val("");
            initSupplyIndex();
        });
        function initSupplyIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/supply-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
            initTimepicker();
            $('#reset').click(function(){
                $('input').val("");
                initSupplyIndex();
            });
        }

        function initSupplyDetail(id){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/supply-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            //取供需信息
            $.ajax({
                url: basePath+"/admin/supply/getSupplyBySId.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SUPPLYID:id},
                dataType:"json",
                success: function (data) {
                    SUPPLYID = data.map.SUPPLYID;
                    $("#title").html(data.map.TITLE);
                    $("#supply-Author").html(data.map.REALNAME);
                    $("#supply-Time").html(data.map.RELEASETIME);
                    $("#supply-type").html("类型:"+data.map.SUPPLYTYPENAME);
                    $("#supply-endtime").html("结束时间："+data.map.VALIDENDTIME);
                    $("#supply-status").html("状态："+data.map.VALIDSTATUSNAME);

                    var value = data.map.EXAMINESTATUS;
                    var li="";
                    if(value==0){
                        li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                            +"<option value="+0+" selected>待审核</option>"
                            +"<option value="+1+">已审核</option>"
                            +"<option value="+2+">未通过</option>"
                            +"</select>";
                    }else if(value==1){
                        li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                            +"<option value="+0+">待审核</option>"
                            +"<option value="+1+" selected>已审核</option>"
                            +"<option value="+2+">未通过</option>"
                            +"</select>";
                    }else{
                        li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                            +"<option value="+0+">待审核</option>"
                            +"<option value="+1+">已审核</option>"
                            +"<option value="+2+" selected>未通过</option>"
                            +"</select>";
                    }
                    $("#supply-varify").html("审核："+li);

                    var image = ""+data.map.IMAGEURL;
                    var src = "";
                    if(image != ""){
                        var images = image.split(",");
                        for(var i=0; i<images.length; i++){
                            if(images[i] != ""){
                                src = src + "<img alt='图像错误' src='"+images[i]+"'>";
                            }
                        }
                    }
                    $("#supply-content").html(data.map.SUPPLYNOTE);
                    $("#supply-content").append(src);
                }
            });
            $('#back').click(function(){
                initSupplyIndex();
            })
        }
        //上一条，下一条
        function initInfoPreOrNext(id,act){
            console.log(id)
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/supply-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $.ajax({
                url: basePath + "/admin/supply/getSupplyBySId.shtml",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data:{SUPPLYID:id,ACT:act},
                dataType:"json",
                success: function (data) {
                    if(data.status == 0){
                        SUPPLYID = data.map.SUPPLYID;
                        $("#title").html(data.map.TITLE);
                        $("#supply-Author").html(data.map.REALNAME);
                        $("#supply-Time").html(data.map.RELEASETIME);
                        $("#supply-type").html("类型:"+data.map.SUPPLYTYPENAME);
                        $("#supply-endtime").html("结束时间："+data.map.VALIDENDTIME);
                        $("#supply-status").html("状态："+data.map.VALIDSTATUSNAME);

                        var value = data.map.EXAMINESTATUS;
                        var li="";
                        if(value==0){
                            li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                                +"<option value="+0+" selected>待审核</option>"
                                +"<option value="+1+">已审核</option>"
                                +"<option value="+2+">未通过</option>"
                                +"</select>";
                        }else if(value==1){
                            li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                                +"<option value="+0+">待审核</option>"
                                +"<option value="+1+" selected>已审核</option>"
                                +"<option value="+2+">未通过</option>"
                                +"</select>";
                        }else{
                            li = "<select id="+data.map.SUPPLYID+" onchange='groupChat("+data.map.SUPPLYID+");'>"
                                +"<option value="+0+">待审核</option>"
                                +"<option value="+1+">已审核</option>"
                                +"<option value="+2+" selected>未通过</option>"
                                +"</select>";
                        }
                        $("#supply-varify").html("审核："+li);

                        var image = ""+data.map.IMAGEURL;
                        var src = "";
                        if(image != ""){
                            var images = image.split(",");
                            for(var i=0; i<images.length; i++){
                                if(images[i] != ""){
                                    src = src + "<img alt='图像错误' src='"+images[i]+"'>";
                                }
                            }
                        }
                        $("#supply-content").html(data.map.SUPPLYNOTE);
                        $("#supply-content").append(src);
                        $("#supply-mag").html(data.msg);
                    }
                }
            });
            $('#back').click(function(){
                initSupplyIndex();
            })
        }

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
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable1(startTime,endTime) {
            $table = $('#table');
            $export = $("#export");
            var $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/supply/supplyFindByPropertyPage.shtml',
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                height: 601,
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                search: true,//是否搜索
                pagination: true,//是否分页
                pageSize: 12,//单页记录数
                pageList: [12, 25, 50, 100],//分页步进值
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式

                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    params.VALIDSTARTTIME = startTime;
                    params.VALIDENDTIME = endTime;
                    return params;
                },
                searchOnEnterKey: false,//回车搜索
                showRefresh: true,//刷新按钮
                showColumns: true,//列选择按钮
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'EXAMINESTATUSNAME',
                    title: '审核状态',
                    
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    
                    formatter: supplyDetailFormatter,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '姓名',
                    
                    align: 'center'
                }, {
                    field: 'RELEASETIME',
                    title: '发布时间',
                    
                    align: 'center'
                }, {
                    field: 'VALIDENDTIME',
                    title: '结束时间',
                    
                    align: 'center'
                }, {
                    field: 'SUPPLYTYPENAME',
                    title: '供需类型',
                    
                    align: 'center'
                }, {
                    field: 'VALIDSTATUSNAME',
                    title: '期限状态',
                    
                    align: 'center'
                }, {
                    field: 'operate',
                    title: '操作',
                    
                    align: 'center',
                    formatter: operateFormatter
                }]
            });

            //操作框
            function operateFormatter(value, row){
                return '<a href="#" title="评论" class="comment" data-id="' + row.SUPPLYID + '"><i class="glyphicon glyphicon-comment"></i></a>';
            }


            function supplyDetailFormatter(value, row){
                return '<a href="#" class="supplyDetail" data-id="' + row.SUPPLYID + '">'+ value +'</a>';
            }

            //导出
            $export.click(function (){
            	
            	  bootbox.confirm({ 
             		  size: "small",
             		  message: "确认导出?", 
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
   	                				window.location.href = basePath+"/admin/supply/supplyExportExcel.shtml";
   	                             };
   	                			}
             		  
             	}); 
            
            });
            //删除
            $table.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($table.bootstrapTable('getSelections').length) {
                    $delete.show();
                } else {
                    $delete.hide();
                }
                //selections = getIdSelections();
          
            });
            $table.on('page-change.bs.table', function(){	 
            	$delete.hide();
            });
            $table.on('refresh.bs.table', function(){
            	$delete.hide();
            })
            $delete.click(function () {
                var ids = getIdSelections();
                var id = ""+ids;
                
                
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
   	                                 url: basePath + '/admin/supply/deleteSupply.shtml',
   	                                 dataType: 'json',
   	                                 type: 'post',
   	                                 data:{"SUPPLYID":id},
   	                                 traditional: true,
   	                                 success:function(data){
   	                                     if(data.status == "0"){
   	                                         //alert("删除成功!");
   	                             
   	                         				toastr.success('删除成功!');
   	                                         $delete.hide();
   	                                         $table.bootstrapTable('refresh');
   	                                     }else{
   	                          
   	                           				toastr.error('删除失败，请联系管理人员！');
   	                                        // alert("删除失败，请联系管理人员！");
   	                                     }
   	                                 },
   	                                 error: function(msg){
   	                                 	toastr.options = {
   	                   						  "positionClass": "toast-bottom-center",
   	                   						  "timeOut": "2000",
   	                   						}
   	                     				toastr.error('操作失败，请联系管理人员！');
   	                                     //alert("操作失败，请联系管理人员！");
   	                                 }
   	                             });

   	                			}
             		  }
             	}); 
            
            });
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.SUPPLYID
                });
            }
        }
        //查找
        $(document).on("click", "#search", function() {
            var startTime = $("#VALIDSTARTTIME").val();
            var endTime = $("#VALIDENDTIME").val();
            $container = $("#main-box");
            $.ajax({
                url: basePath + "/data/supply-main.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1(startTime,endTime);
            $("#VALIDSTARTTIME").val(startTime);
            $("#VALIDENDTIME").val(endTime);
            initTimepicker();
        });
    });
}());


