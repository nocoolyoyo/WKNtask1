(function(){
    $(function() {
        var $table,
        	$delete,
            selections = [],
            $container; 
        
        var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        $(document).on("click", "#add", function() {
            initMotifactionCreate()
        });

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
            initTimepicker();
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
              
              $('#back').click(function () {
            	  initMotifactionIndex();
              });
              
              
              $("#upLoadImg").on('change',function(){
            	  
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
          			alert("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
          			return false;                  
          		} 
            	  $.ajaxFileUpload({
            		  
                      url: basePath+'/data/ImportfileUp.jsp', 
                      type: 'post',
                      secureuri: false, //一般设置为false
                      fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                      dataType: 'json', //返回值类型，一般设置为json、application/json
                      success: function(data, status){  
                    	  console.log("111")
                          url = data[0].url;
                          original = data[0].original;
                          file_name = data[0].filename_s;
                          $(".reveal-show").attr("src",url);
                      },
                      error: function(data, status, e){ 
                    	  console.log("222")
                          alert(e);
                      }
                  });
              }) 
              
              
              //保存图片获取服务器地址
              $(".reveal-show").attr("src",basePath+"/img/image.png");  
              
              /*$('#upLoadImg').fileinput({
                  'language': 'zh-CN',
                  uploadUrl: basePath +  "/data/ImportfileUp.jsp", //上传的地址
                  allowedFileExtensions:  ['jpg', 'png'],
                  maxFileCount: 1,
                  accept: 'application/html',
                  enctype: 'multipart/form-data',
                  allowedPreviewTypes: ['image'],
                  allowedFileTypes: ['image'],
                  maxFileSize : 2000,

                  msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
                  showUpload: true, //是否显示上传按钮
                  showCaption: false,//是否显示标题
                  success: function(data, status){  
                      url = data[0].url;
                      original = data[0].original;
                      file_name = data[0].filename_s;
                      $(".reveal-show").attr("src",url);
                  },
                  error: function(data, status, e){ 
                      alert(e);
                  }
              });*/
              

              /*
               *  功能：表单验证
               *  Created by nocoolyoyo 2016/9/28.
               */
            
              $('select').on('change', function() {
            	  	if($(this).val() == "4" ){
            			$(".forID").text("链接地址：");
            		}else{
            			$(".forID").text("ID：");
            		}
            	});
              $('#form').bootstrapValidator({
                  message: '所有值不能为空',
                  excluded: [':disabled'],
                  fields: {
                	  title: {
                          validators: {
                              notEmpty: {
                                  message: '请输入收支名称！'
                              },
                              stringLength: {/*长度提示*/
                                  min: 1,
                                  max: 20,
                                  message: '标题长度必须在1到20之间'
                              }/*最后一个没有逗号*/
                          }
                      },
                      type: {
                          validators: {
                              notEmpty: {
                                  message: '选择类型！'
                              }
                         
                          }
                      },
                      ID: {
                          validators: {
                              notEmpty: {
                                  message: '请选择收支时间！'
                              }
                          }
                      }
                  }
              });
              //保存
              $("#information-send").on('click',function(){
            	  var title = $("#title").val();
            	  var type = $("select").val();
            	  var typeContent = $("#ID").val();
            	  var upLoadImg = $("#upLoadImg").val();
            	  var postData = $("#upLoadImg").serializeArray();
            	  console.log("测试"+postData);
            	
            	  var url = "http://localhost:8080/SHANGHUI/admin/url/motifaction.shtml";
            	  console.log(upLoadImg);
            	  $.ajax({
              		url: basePath+'/admin/focus/addFocus.shtml',
              		dataType: 'json',
              		type: 'post',
              		data:{
              			TITLE:title,ORIGINAL:upLoadImg,MTYPE:type,NID:typeContent,URL:url,PURL_S:url
              		},
              		success:function(data){
              			if(data.STATUS == "0"){
              				alert("新增成功");
              				initMotifactionIndex();
              				//$table.bootstrapTable('refresh');
              			}else{
              				alert(data.ERRMSG);
              			}
              		},
              		error: function(msg){
              		}
              	});
              })
              
        }
        
   
        initTable1();
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
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable1() {
            $table = $('#table'),
            $delete = $('#delete');
            $table.bootstrapTable({
            	 url: basePath+'/admin/focus/findPageFocus.shtml',
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
                showColumns: true,
                showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'MID',
                    title: 'ID',
                    sortable: true,
                    align: 'center',
                    visible:false
                }, {
                    field: 'TITLE',
                    title: '标题',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'MTYPE',
                    title: '类型',
                    sortable: true,
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
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '发布人',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'STATUR',
                    title: '状态',
                    sortable: true,
                    align: 'center',
                    formatter:function(value){
                    	if (value==1) {
    						return "激活";
    					}else{
    						return "未激活";
    					}
                    }
                }, {
                    field: 'edit',
                    title: '编辑',
                    align: 'center',
                    events: "editEvents"
                }]
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
                return row.MID
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
            		url: basePath+'/admin/focus/deleteFocus.shtml',
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
        //table
  }
    });
}());


