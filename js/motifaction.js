(function(){
    $(function() {
        var $table,
            $delete,
            selections = [],
            $container;

        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var url = "";
        var slturl = "";
        var original = "";

        $(document).on("click", "#add", function() {
            initMotifactionCreate()
        });

        initMotifactionIndex()
        function initMotifactionIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/motifaction-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
            
            
            function initTable1(title,sendAuthor,starttime,endtime) {
                $table = $('#table'),
                    $delete = $('#delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/focus/findPageFocus.shtml',
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
                    	params.TITLE = title;
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
                        field: 'MID',
                        title: 'ID',
                        
                        align: 'center',
                        visible:false
                    }, {
                        field: 'TITLE',
                        title: '标题',
                        
                        formatter: function(value,row){
                            return '<a class="moti-edit" data-id="'+row.MID+'" href="#">'+value+'</a>';
                        },
                        align: 'center'
                    }, {
                        field: 'MTYPE',
                        title: '类型',
                        
                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "资讯";
                            }else if(value == 2){
                                return "通知通告";
                            }else if(value == 3){
                                return "";
                            }else if(value == 4){
                                return "外链";
                            }
                        }
                    }, {
                        field: 'STARTTIME',
                        title: '发布时间',
                        
                        align: 'center'
                    }, {
                        field: 'REALNAME',
                        title: '发布人',
                        
                        align: 'center'
                    }, {
                        field: 'MPLCACID',
                        title: '序号',
                        
                        align: 'center'
                        // formatter: function(value,row){
                        //     return 'value';
                        // }
                    },{
                        field: 'STATUR',
                        title: '状态',
                        
                        align: 'center',
                        formatter:function(value,row){
                            if (value==1) {
                                return '<a class="moti-status" style="color:green" data-id="'+row.MID+'" data-toggle="modal"  data-target="#sure-modal" href="#">激活</a>';
                            }else{
                                return '<a class="moti-status" style="color:red"  data-id="'+row.MID+'" data-toggle="modal"  data-target="#sure-modal"  href="#">未激活</a>';
                            }
                        }
                    }]
                });

                //取消select的重复选项

                // $(document).on('change', 'select', function(){
                //         if($('select[value='+$(this).val()+']').length==1){
                //             alert('你当前选择的条件已经存在，请不要重复选择');
                //         }
                // });
                $(document).on('change', 'select', function(){
                	var select = $("select").val();
                	if (select=="4") {
						$("#dreass").html("链接地址:");
					}else{
						$("#dreass").html("ID:");
					}
                });
                
                $table.on('click', '.moti-edit', function(){
                    console.log($(this).attr('data-id'));
                    initMotifactionEdit($(this).attr('data-id'))

                });
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
	             });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.MID
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
       	                                 url: basePath+'/admin/focus/deleteFocus.shtml',
       	                                 dataType: 'json',
       	                                 type: 'post',
       	                                 data:{
       	                                     CHECKBOXID:str
       	                                 },
       	                                 success:function(data){
       	                                     if(data.STATUS == "0"){
       	                                    	$delete.hide()
       	                                         toastr.success("删除成功！");
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
                //table
                $table.on('click', '.moti-status', function(){
                    var $toggleStatus = $(this);
                    console.log($(this).attr('data-id'))
                    var id = $(this).attr('data-id');
                    if($toggleStatus.text() == "未激活"){
                        $('#sure-modal h4').text('确定激活吗？');
                        $('#sure').one("click",function(){
                            $('#order-modal').modal('show');
                            $('#order-sure').one('click',function(){
                            	var select = $("#select").val();
                            	$.ajax({
                                    url: basePath+'/admin/focus/searchpalceFocus.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{
                                    	INDEX:select,MID:id
                                    },
                                    success:function(data){
                                        if(data.STATUS == "0"){
                                        	  toastr.success("激活成功！");
                                        	
//                                        	$toggleStatus.css("color","green").text('激活');
//                                            $('#order-modal').modal('hide');
                                            $table.bootstrapTable('refresh');
                                        }else{
                                        	  toastr.error(data.ERRMSG);
                                       
                                        }
                                    },
                                    error: function(msg){
                                    }
                                });
                            })
                        });
                       
                    }else if($toggleStatus.text() == "激活"){
                        $('#sure-modal h4').text('取消激活吗？');
                        $('#sure').one("click",function(){
                        	$.ajax({
                                url: basePath+'/admin/focus/activateFocus.shtml',
                                dataType: 'json',
                                type: 'post',
                                data:{
                                	MID:id
                                },
                                success:function(data){
                                    if(data.STATUS == "0"){
                               
                                  	  	toastr.success("取消激活成功！");
//                                    	$toggleStatus.css("color","red").text('未激活');
                                        $('#order-modal').modal('hide');
                                        $table.bootstrapTable('refresh');
                                    }else{
                                    	toastr.error(data.ERRMSG);
                                    }
                                },
                                error: function(msg){
                                }
                            });
                        });
                    }
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
                	var title = $("#title").val();
                	var sendAuthor = $("#author").val();
                	$container = $("#main-box");
                 	 $.ajax({
                 		 url: basePath+"/data/motifaction-index.html",
                        async: false,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            $container.html(data);
                        }
                    });
                	if (dateAT>date) {
                		toastr.warning("开始时间不能大于结束时间！");
    				
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
                 	initMotifactionIndex();
                 });
            }
            initTimepicker();
            //查找
            
           
        }
       
        function initMotifactionCreate(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/motifaction-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $(".reveal-show").attr("src",basePath+"/img/image.png");

            $('#back').click(function () {
                initMotifactionIndex();
            });
            //增加上传图片
            function ajaxfileup(){
                var form = document.getElementById("form");
                //检查是否提交了上传文件否弹出提示不需要这一功能的删除即可
                /*if (document.all.loadFile.value == ""){
                 alert("没有选择上传的文件！");
                 form.loadFile.focus();
                 return false;
                 }*/
                //截取提交上传文件的扩展名
                var ext = form.upLoadImg.value.match(/^(.*)(\.)(.{1,8})$/)[3];
                ext = ext.toLowerCase(); //设置允许上传文件的扩展名
                if (ext !=  "jpg" && ext != "gif" && ext!="png") {
                	toastr.warning("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
          
                    return false;
                }
                $.ajaxFileUpload({
                    url: basePath+'/admin/upload.shtml?savePath=motifImage',
                    secureuri: false, //一般设置为false
                    fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                    dataType: 'json', //返回值类型，一般设置为json、application/json
                    type : 'post',
                    contentType: "application/json; charset=utf-8",//此处不能省略
                    success: function(data, status){
                        if (data.status=="0") {
                            url = data.url;
                            original = data.original;
                            slturl = data.slturl;
                            $(".reveal-show").attr("src",url);
                            $(".reveal-show").attr("imgname",original);
                            //$("#upLoadImg").replaceWith('<input id="upLoadImg" name="upLoadImg" type="file" style="position:absolute;clip:rect(0 0 0 0);" value="">').colne(true);
                            //第二次绑定
                            $("#upLoadImg").on("change", function(){
                                ajaxfileup();
                            });
                        }
                    },
                    error: function(data, status, e){
                    	toastr.error(e);
                      
                    }
                });
            }
            $("#upLoadImg").on("change", function(){
                ajaxfileup();
            });


            //保存图片获取服务器地址


            //保存
            $("#motifaction-send").on('click',function(){
                var title = $("#title").val();
                var type = $("select").val();
                var typeContent = $("#ID").val();
                if(title =="" ||typeContent=="" ){
                	toastr.warning("请填写完整信息！");
                }else{
                	$(this).attr('disabled', 'disabled');
               	    $(this).text('提交中...');
                	$.ajax({
                        url: basePath+'/admin/focus/addFocus.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{
                            TITLE:title,ORIGINAL:original,MTYPE:type,NID:typeContent,URL:url,PURL_S:slturl
                        },
                        success:function(data){
                            if(data.STATUS == "0"){
                            	toastr.success("新增成功");
                                initMotifactionIndex();
                                //$table.bootstrapTable('refresh');
                            }else{
                            	toastr.error(data.ERRMSG);
                            	$('#motifaction-send').removeAttr('disabled');
                            	$('#motifaction-send').text('提交');
                            }
                        },
                        error: function(msg){
                        	toastr.error(data.ERRMSG);
                        	$('#motifaction-send').removeAttr('disabled');
                        	$('#motifaction-send').text('提交');
                        }
                    });
                }
                
                
            })

        }

        initTimepicker();

        /*
         *  功能：日期选择器API
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
         *  功能：详情修改
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initMotifactionEdit(id) {
            $container = $("#main-box");

            $.ajax({
                url: basePath+'/admin/focus/showEdit.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    MID:id
                },
                success:function(data){
                    if(data.STATUS == "0"){
                        $("#title").val(data.ACTIVITY.TITLE);
                        $("select").val(data.ACTIVITY.MTYPE);
                        $("#ID").val(data.ACTIVITY.NID);
                        $(".reveal-show").attr("imgname",data.ACTIVITY.PICTURE);
                        $(".reveal-show").attr("imgurl",data.ACTIVITY.PURL);
                        if (data.ACTIVITY.MTYPE=="4") {
							$("#dreass").html("链接地址：");
						}else {
							$("#dreass").html("ID：");
						}
                        if(data.ACTIVITY.PURL_S==null || data.ACTIVITY.PURL_S == ""){
                        	$(".reveal-show").attr("src",data.ACTIVITY.PURL);
                        }else{
                        	$(".reveal-show").attr("src",data.ACTIVITY.PURL_S);
                        }
                    }else{
                    	toastr.error(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
            $.ajax({
                url: basePath+"/data/motifaction-edit.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $(".reveal-show").attr("src",basePath+"/img/image.png");
            $('#back').click(function () {
                initMotifactionIndex();
            });
            //修改提交
            $("#information-update").on('click',function(){
                var title = $("#title").val();
                var type = $("select").val();
                var typeContent = $("#ID").val();
                var imgslturl = $(".reveal-show").attr('src');
                var imgoriginal = $(".reveal-show").attr('imgname');
                var imgurl = $(".reveal-show").attr('imgurl');
                if(title =="" ||typeContent=="" ){
                	toastr.warning("请填写完整信息！");
                }else{
                $.ajax({
                    url: basePath+'/admin/focus/updateFocus.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        TITLE:title,MTYPE:type,NID:typeContent,PURL:imgurl,PURL_S:imgslturl,PICTURE:imgoriginal, MID:id
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                        	toastr.success("修改成功！");
                            initMotifactionIndex();
                            $table.bootstrapTable('refresh');
                        }else{
                        	toastr.error(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
                }
            })
            //修改上传图片
            function ajaxfileup(){
                var form = document.getElementById("form");
                //检查是否提交了上传文件否弹出提示不需要这一功能的删除即可
                /*if (document.all.loadFile.value == ""){
                 alert("没有选择上传的文件！");
                 form.loadFile.focus();
                 return false;
                 }*/
                //截取提交上传文件的扩展名
                var ext = form.upLoadImg.value.match(/^(.*)(\.)(.{1,8})$/)[3];
                ext = ext.toLowerCase(); //设置允许上传文件的扩展名
                if (ext !=  "jpg" && ext != "gif" && ext!="png") {
                	toastr.error("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
             
                    return false;
                }
                $.ajaxFileUpload({
                    url: basePath+'/admin/upload.shtml?savePath=motifImage',
                    secureuri: false, //一般设置为false
                    fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                    dataType: 'json', //返回值类型，一般设置为json、application/json
                    type : 'post',
                    contentType: "application/json; charset=utf-8",//此处不能省略
                    success: function(data, status){
                        if (data.status=="0") {
                            url = data.url;
                            original = data.original;
                            slturl = data.slturl;
                            if(slturl==null || slturl ==""){
                              	$(".reveal-show").attr("src",url);
                            }else{
                            	$(".reveal-show").attr("src",slturl);
                            }
                            $(".reveal-show").attr("imgurl",url);
                            $(".reveal-show").attr("imgname",original);
                            //$("#upLoadImg").replaceWith('<input id="upLoadImg" name="upLoadImg" type="file" style="position:absolute;clip:rect(0 0 0 0);" value="">').colne(true);
                            //第二次绑定
                            $("#upLoadImg").on("change", function(){
                                ajaxfileup();
                            });
                        }
                    },
                    error: function(data, status, e){
                       	toastr.error(e);
                    }
                });
            }
            $("#upLoadImg").on("change", function(){
                ajaxfileup();
            });
        }
    });
}());


