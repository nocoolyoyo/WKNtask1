(function() {
    $(function() {
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        var deleteId = "";
        var updateId = "";
        var detailId = "";
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
                var title = $("#addName").val();
                var selete = $("#addBelong").val();
                $.ajax({
                    url:basePath+'/admin/photos/insertPhotos.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        PHOTONAME:title,VIEWRANGE:selete
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            alert("新增成功");
                            $('#album-add-modal').modal('hide');
                            $('#album-add-modal').on('hidden.bs.modal', function () {
                                initAlbumIndex();
                            });
                        }else{
                            alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
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
                            alert("删除成功");
                            $('#album-delete-modal').modal('hide');
                            $('#album-delete-modal').on('hidden.bs.modal', function () {
                                initAlbumIndex();
                            });

                        }else{
                            alert(data.ERRMSG);
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
                            alert("修改成功");
                            $('#album-edit-modal').modal('hide');
                            $('#album-edit-modal').on('hidden.bs.modal', function () {
                                initAlbumIndex();
                            });
                        }else{
                            alert(data.ERRMSG);
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
                        alert(data.ERRMSG);
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

            /*
             *  功能：文件上传
             *  Created by nocoolyoyo 2016/9/28.
             */

            $('#file-upload').fileinput({
                language: 'zh-CN', //设置语言
                uploadUrl: "/FileUpload/Upload", //上传的地址
                allowedFileExtensions : ['jpg','png','gif'],//接收的文件后缀,
                // fileType: "any",
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                maxFileCount: 10,
                enctype: 'multipart/form-data',
                showUpload: true, //是否显示上传按钮
                showCaption: false,//是否显示标题
                fileActionSettings: {
                    showZoom: false
                },
                browseClass: "btn btn-primary", //按钮样式
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
            });
            /*
             图片详细预览
             */





        }

        //瀑布流布局

        function initWaterFall(){
            $('#album-wall').wookmark({ //这里是要实现瀑布流布局的对象
                autoResize: true, //设置成true表示当window窗口大小改变的时候，重新布局
                container: $('#album-wall'),//这个是容器名称
                offset: 10, //2个相邻元素之间的间距
                // itemWidth: 222, //指定对象的宽度
                resizeDelay: 50 //这是延时效果 默认是50
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
                            html += "<li class='hoverable'><a href='"+data.rows[i].IMAGEURL_S+"'  rel='prettyPhoto'><img src='"+data.rows[i].IMAGEURL+"'><p>"+data.rows[i].PHOTONAME+"</p></a></li>";
                        }
                        $("#album-wall").html(html);
                        initWaterFall();

                            $("a[rel^='prettyPhoto']").prettyPhoto();

                    }else{
                        alert(data.ERRMSG);
                    }
                },
                error: function(msg){
                }
            });
        }
    })
}());


