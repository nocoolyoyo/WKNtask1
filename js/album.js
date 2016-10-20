(function() {
    $(function() {


        initAlbumIndex();
        $(document).on("click", "#back", function() {
            initAlbumIndex();
        });
        function initAlbumIndex() {
            $container = $("#main-box");
            $.ajax({
                url: "./data/album-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#add').click(function() {

                $('#album-modal').find('.modal-title').text('新增相册');
                //添加相册
            });
            $(document).on("click", ".album-edit", function() {
                $('#album-modal').find('.modal-title').text('修改相册');

                //修改相册
            });
            $(document).on("click", ".album-delete", function() {
                console.log($(this))
                //删除相册
            });
            $(document).on("click", ".album-detail", function() {
                console.log($(this))
                initAlbumDetail()
                //删除相册
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
        }
        function initAlbumDetail() {
            $container = $("#main-box");
            $.ajax({
                url: "./data/album-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $('#album-wall').wookmark({ //这里是要实现瀑布流布局的对象
                autoResize: true, //设置成true表示当window窗口大小改变的时候，重新布局
                container: $('#album-wall'),//这个是容器名称
                offset: 10, //2个相邻元素之间的间距
                // itemWidth: 222, //指定对象的宽度
                resizeDelay: 50 //这是延时效果 默认是50
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
            $(document).ready(function(){
                $("a[rel^='prettyPhoto']").prettyPhoto();
            });

        }

    })
}());


