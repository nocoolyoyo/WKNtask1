var album = function(){
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var deleteId = "";
        var updateId = "";
        var detailId = "";
        var myArray=new Array();
        var i =0;
        //加载画册
        initAlbumIndex();

        $(document).on("click", "#back", function() {
            initAlbumIndex();
        });
        function initAlbumIndex() {
            findPhotos(0);
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/album-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            //修改相册
            $(document).on("click", ".album-edit", function() {
                var id = $(this).attr('data-id');
                updateId = id;
                $("#editName").val($(this).attr('data-title'));
                $("#editBelong").val($(this).attr('data-selete'));
            });
            //删除画册弹出框
            $(document).on("click", ".album-delete", function() {
                var id = $(this).attr('data-id');
                deleteId = id;
            });
            //相册详情
            $(document).on("click", ".album-detail", function() {
                var id = $(this).attr('data-id');
                detailId = id;
                initAlbumDetail();
            });

            $('#form').bootstrapValidator({
                message: '所有值不能为空',
                excluded: [':disabled'],
                fields: {
                    albumName: {
                        validators: {
                            notEmpty: {
                                message: '请输入相册名字！'
                            }
                        }
                    }
                }
            });

            //新增画册
            $("#addSubmit").click(function(){
            	var title = $('input[name="addName"]').val();
               
                var selete = $("#addBelong").val();
                console.log(title)
                if(title == ""){
                	
               	 toastr.warning("标题不能为空！");
                }else{
	                $.ajax({
	                    url:basePath+'/admin/photos/insertPhotos.shtml',
	                    dataType: 'json',
	                    type: 'post',
	                    data:{
	                        PHOTONAME:title,VIEWRANGE:selete
	                    },
	                    success:function(data){
	                        if(data.STATUS == "0"){
	                        	toastr.success("新增成功！");         
	                            $('#album-add-modal').modal('hide');
	                            $('#album-add-modal').on('hidden.bs.modal', function () {
	                                initAlbumIndex();
	                            });
	                        }else{
	                         	toastr.error(data.ERRMSG);
	 
	                        }
	                    },
	                    error: function(msg){
	                    }
	                });
               }
            })
            //删除画册
            $("#delete").click(function(){
                $.ajax({
                    url:basePath+'/admin/photos/deletePhotos.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        PHOTOSID:deleteId
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                      
                          	toastr.success("删除成功！");
                            
                            $('#album-delete-modal').modal('hide');
                            $('#album-delete-modal').on('hidden.bs.modal', function () {
                                initAlbumIndex();
                            });

                        }else{
                        	toastr.error(data.ERRMSG);
                          
                        }
                    },
                    error: function(msg){
                    }
                });
            })

            //修改画册
            $("#editSubmit").click(function(){
                var title = $("#editName").val();
                var selete = $("#editBelong").val();
                $.ajax({
                    url:basePath+'/admin/photos/updatePhotos.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        PHOTONAME:title,VIEWRANGE:selete,PHOTOSID:updateId
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                         	toastr.success("修改成功！");
                         
                            $('#album-edit-modal').modal('hide');
                            $('#album-edit-modal').on('hidden.bs.modal', function () {
                                initAlbumIndex();
                            });
                        }else{
                        	toastr.error(data.ERRMSG);
                            
                        }
                    },
                    error: function(msg){
                    }
                });
            })
        }

        //加载画册
        function findPhotos(offset){
            $.ajax({
                url:basePath+'/admin/photos/findPagePhotos.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    offset:offset,limit:8,
                },
                success:function(data){
                    if(data.status == "0"){
                        for (var i = 0; i < data.rows.length; i++) {
                            var	html =  "<div class='col-sm-3'>"+
                                "<div class='album-card card hoverable'>"+
                                "<a href='#'  class='album-detail' data-id='"+data.rows[i].PHOTOSID+"'>"+
                                "<div class='album-card-image card-image'>"+
                                "<img src='"+data.rows[i].IMAGEURL+"'>"+
                                "</div>"+
                                "</a>"+
                                "<div class='card-content'>"+
                                "<div class='album-card-header card-header'>"+data.rows[i].PHOTONAME+"</div>"+
                                "</div>" +
                                "</div>" +
                                "<div class='card-footer'>"+
                                "<span class='both-5 gray'><i class='fa fa-clone'></i>"+data.rows[i].IMAGECOUNT+"</span>"+
                                "<a href='#' data-toggle='modal' data-id='"+data.rows[i].PHOTOSID+"' class='album-delete' data-target='#album-delete-modal'><span class='pull-right both-10'><i class='fa fa-trash'></i></span></a>"+
                                "<a href='#' data-toggle='modal' data-id='"+data.rows[i].PHOTOSID+"' data-title='"+data.rows[i].PHOTONAME+"' data-selete='"+data.rows[i].VIEWRANGE+"' class='album-edit' data-target='#album-edit-modal'><span class='pull-right both-5'><i class='fa fa-pencil'></i></span></a>"+
                                "</div>"+
                                "</div>"
                            $("#album-box").append(html);
                        }
                        var i = parseInt(data.total);
                        if (i/8!=0) {
                            var j = parseInt(data.total/8)+1;
                            var total = "<li><a href='#'>&laquo;</a></li>";
                            for (var int = 1; int <= j; int++) {
                                if(int == 1){
                                    total +="<li class='active'><a href='#' onclick='total("+int+");'>"+int+"</a></li>";
                                }else{
                                    total +="<li><a href='#' onclick='total("+int+");'>"+int+"</a></li>";
                                }
                            }
                            total +="<li><a href='#'>&raquo;</a></li>";
                            $('.pagination').append(total);
                        }
                    }else{
                    	toastr.error(data.ERRMSG);
                        
                    }
                },
                error: function(msg){
                }
            });

        }

        //加载相片
        function initAlbumDetail() {
            $container = $("#main-box");
            albumDetail(0);
            $.ajax({
                url: basePath+"/data/album-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
          //插入照片
            $("#insert").on('click',function(){
            	var aToStr=JSON.stringify(myArray);  
            	$.ajax({
                    url:basePath+'/admin/photos/addPhotos.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        PHOTOID:detailId,ARRAY:aToStr
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                        	toastr.success("插入成功！");
                        	myArray = new Array();
                        	i = 0;
                            albumDetail();//请求相片列表
                        }else{
                        	toastr.error(data.ERRMSG);
                      
                        }
                    },
                    error: function(msg){
                    }
                });
            });
            
            /*
             *  功能：文件上传
             *  Created by nocoolyoyo 2016/9/28.
             */
       
            $('#upload-modal').on('hidden.bs.modal', function (e) {
            	$('#file-upload').fileinput('refresh');       
            
			})
           
            	 $('#file-upload').unbind().fileinput({
                 	language: 'zh-CN', //设置语言
                     uploadUrl: basePath+'/admin/upload.shtml?album', //上传的地址
                     allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀,
                     maxFileCount: 10,
                     enctype: 'multipart/form-data',
                     showUpload: true, //是否显示上传按钮
                     showCaption: false,//是否显示标题
                     fileActionSettings: {
                         showZoom: false,
                         showRemove: false,
                         indicatorSuccess: false,
                         indicatorLoading: false
             
                     },
                   
                     previewTemplates : {
                    
                         image: '<div style="width: 182px" class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}">\n' +
 	                        '   <div class="kv-file-content">' +
 	                        '       <img src="{data}" class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" ' + 'style="width:100%; height:100px"' + '>\n' +
 	                        '   </div>\n' +
 	                        '   {footer}\n' +
 	                        '</div>\n',       
                     	} ,
                    

                     browseClass: "btn btn-primary", //按钮样式             
                     previewFileIcon: "<i class='glyphicon glyphicon-king'></i>", 
                     msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
             
                    

             }) .on("fileuploaded", function(event, data) {
                 if(data.response){
                 	myArray[i] = {"url":data.response.url,"name":data.response.original}
                 	i++;
                 }
                 console.log(myArray);
             });
        
           
            
            
        }


        //删除&设为封面操作
        $(document).on('click','#deleteCurrent', function(){

            var id = $(".pp_description").html();
            console.log($(".pp_description").html());
            $.ajax({
                url:basePath+'/admin/photos/deletePhoto.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    PHOTOID:id
                },
                success:function(data){
                    if(data.STATUS == "0"){
                    	toastr.success("删除成功！");
                    
                        albumDetail();//请求相片列表
                        $.prettyPhoto.close();//删除后关闭
                    }else{
                    	toastr.error(data.ERRMSG);
                      
                    }
                },
                error: function(msg){
                }
            });

        })
        //设置封面
        $(document).on('click','#setCover', function(){
            var id = $(".pp_description").html();
            console.log($(".pp_description").html());
            $.ajax({
                url:basePath+'/admin/photos/upPhotos.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    PHOTOID:id
                },
                success:function(data){
                    if(data.STATUS == "0"){
                     	toastr.success("设置成功！");
                      
                        albumDetail();//请求相片列表
                        $.prettyPhoto.close();//删除后关闭
                    }else{
                     	toastr.error(data.ERRMSG);
                      
                    }
                },
                error: function(msg){
                }
            });
        })

        //瀑布流布局

        function WaterFall(){
            var handler = $('#album-wall')

            var options = {
                autoResize: true, //设置成true表示当window窗口大小改变的时候，重新布局
                container: $('#album-wall'),//这个是容器名称
                offset: 10, //2个相邻元素之间的间距
                // itemWidth: 222, //指定对象的宽度
                resizeDelay: 50 //这是延时效果 默认是50
            };


            $('#album-wall').imagesLoaded(function(){

                handler.wookmark(options);

                handler.click(function(){

                    var newHeight = $('img', this).height() + Math.round(Math.random() * 300 + 30);
                    $(this).css('height', newHeight+'px');

                    handler.wookmark();
                });
                slideShow()
            });

        };
        function slideShow(){
            $("a[rel^='prettyPhoto']").prettyPhoto({
                animation_speed: 'fast', /* fast/slow/normal */
                slideshow: 5000, /* false OR interval time in ms */
                autoplay_slideshow: false, /* true/false */
                opacity: 0.80, /* Value between 0 and 1 */
                show_title: true, /* true/false */
                allow_resize: true, /* Resize the photos bigger than viewport. true/false */
                default_width: 500,
    			default_height: 344,
                counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
                theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
                horizontal_padding: 20, /* The padding on each side of the picture */
                hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
                wmode: 'opaque', /* Set the flash wmode attribute */
                autoplay: true, /* Automatically start videos: True/False */
                modal: false, /* If set to true, only the close button will close the window */
                deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
                overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
                keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
                changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
                callback: function(){}, /* Called when prettyPhoto is closed */
                ie6_fallback: true,
                markup: '<div class="pp_pic_holder"> \
        						<div class="ppt">&nbsp;</div> \
        						<div class="pp_top"> \
        							<div class="pp_left"></div> \
        							<div class="pp_middle"></div> \
        							<div class="pp_right"></div> \
        						</div> \
        						<div class="pp_content_container"> \
        							<div class="pp_left"> \
        							<div class="pp_right"> \
        								<div class="pp_content"> \
        									<div class="pp_loaderIcon"></div> \
        									<div class="pp_fade"> \
                								<div class="pp_hoverContainer"> \
        											<a class="pp_next" href="#">next</a> \
        											<a class="pp_previous" href="#">previous</a> \
        										</div> \
        										<div id="pp_full_res" style="min-width:500px"></div> \
        										<div class="pp_details"> \
        											<div class="pp_nav"> \
        												<a href="#" class="pp_arrow_previous">Previous</a> \
        												<p class="currentTextHolder">0/0</p> \
        												<a href="#" class="pp_arrow_next">Next</a> \
        											</div> \
        											<span class="pp_description" style="dispaly:none;"></span> \
                									<a id="deleteCurrent" class="gray pull-right btn button button-default" style="margin-right: 40px" href="#">删除图片</a> \
        											<a id="setCover" class="gray pull-right btn button button-default" style="margin-right: 10px" href="#">设为封面</a> \
                									<a class="pp_close" href="#">Close</a> \
        										</div> \
        									</div> \
        								</div> \
        							</div> \
        							</div> \
        						</div> \
        						<div class="pp_bottom"> \
        							<div class="pp_left"></div> \
        							<div class="pp_middle"></div> \
        							<div class="pp_right"></div> \
        						</div> \
        					</div> \
        					<div class="pp_overlay"></div>',
                gallery_markup: '<div class="pp_gallery"> \
        								<a href="#" class="pp_arrow_previous">Previous</a> \
        								<div> \
        									<ul> \
        										{gallery} \
        									</ul> \
        								</div> \
        								<a href="#" class="pp_arrow_next">Next</a> \
        							</div>',
                image_markup: '<img id="fullResImage" style="width:100% !important;" src="{path}"/>',
                //flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
                //quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
                //iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
//                inline_markup: '<div class="pp_inline" id="">{title}</div>',
                custom_markup: '',
                social_tools: false /* html or false to disable */

            });
        }



        //请求相片数据
        function albumDetail(offset){
            $.ajax({
                url:basePath+'/admin/photos/propertyPage.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    offset:offset,limit:8,BELONGALBUM:detailId
                },
                success:function(data){
                    if(data.status == "0"){
                        var html="";
                        for (var i = 0; i < data.rows.length; i++) {

                            html += "<li class='hoverable'><a href='"+data.rows[i].IMAGEURL+"' title='"+data.rows[i].PHOTOID+"' data-id='"+data.rows[i].PHOTOID+"'   rel='prettyPhoto[pp_gal]'><img src='"+data.rows[i].IMAGEURL+"'  alt='"+data.rows[i].PHOTONAME+"'><p class='photo-text'>"+data.rows[i].PHOTONAME+"</p></a></li>";
                            
                        }
                        $("#album-wall").html(html);
                        WaterFall();
                      

                    }else{
                    	toastr.error(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
        }
}


