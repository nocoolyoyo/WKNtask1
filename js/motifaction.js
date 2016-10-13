(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面

        $(document).on("click", "#add", function() {
            initMotifactionCreate()
        });

        function initMotifactionIndex(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/motifaction-index.html",
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
                url: "./data/motifaction-12.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

            $('#Motifaction-save').click(function () {
                {

                }
            });
            $('#back').click(function () {
                initMotifactionIndex();
            });

            $('#upLoadImg').fileinput({
                'language': 'zh-CN',
                'showUpload':false,
                'previewFileType':'any',
                allowedPreviewTypes: ['image'],
                allowedFileTypes: ['image'],
                allowedFileExtensions:  ['jpg', 'png'],
                maxFileSize : 2000,
                    // language: 'zh-CN', //设置语言
                    // uploadUrl: uploadUrl, //上传的地址
                    // allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
                    // showUpload: false, //是否显示上传按钮
                    // showCaption: false,//是否显示标题
                    // browseClass: "btn btn-primary", //按钮样式
                    // previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                });
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
            $table = $('#table');
            $table.bootstrapTable({
                url: 'data/occupation.json',
                idField: "id",
                pageNumber: 10,
                pageList: [10, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'id',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '姓名',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'MOBILE',
                    title: '手机号',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'COMPANY',
                    title: '所在单位',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'ONAME',
                    title: '单位职务',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'GRADE',
                    title: '单位职务',
                    sortable: true,
                    align: 'center'
                }]
            });
        }
    });
}());


