(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;


        /*
         *  功能：页内导航
         *  Created by nocoolyoyo 2016/9/28.
         */

        $(document).on("click", "#add", function() {
            initInformationCreate()
        });
        $(document).on("click", "#drafts", function() {
            initInformationDrafts();
        });


        /*
         *  功能：页面初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initInformationIndex(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
        }

        function initInformationCreate(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#newInformation').summernote({
                lang: 'zh-CN',
                height: 400,
                minHeight: 400,
                maxHeight: 400,
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'color', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript','fontsize','height','fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['picture', ['picture']],
                    ['undo', ['undo']],
                    ['redo', ['redo']]
                ]

            });
            $('#information-save').click(function () {
                {
                    var content = $('#newinformation').summernote('code');
                    console.log(content);
                }
            });
            $('#back').click(function () {
                initInformationIndex();
            })
        }

        function initInformationDrafts(){
            $container = $("#main-box");
            $.ajax({
                url: basePath+"/data/information-drafts.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
            $('#back').click(function () {
                initInformationIndex();
            })
        }


        initTable1();


        /*
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable1() {
            $table = $('#table');
            $table.bootstrapTable({
                url: basePath+'/admin/information/informationPage.shtml?SAVETYPE=0',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
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
                    field: 'INID',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'RELEASETIME',
                    title: '发布时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '发布人',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'VIEWCOUNT',
                    title: '查看次数',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'edit',
                    title: '操作',
                    align: 'center',
                }]
            });

            cgxcount()
            //查询草稿箱数量
            function cgxcount(){
                $.ajax({
                    url: basePath+'/admin/information/cgxcount.shtml?SAVETYPE=1',
                    dataType: 'json',
                    type: 'post',
                    data:{
                    },
                    success:function(data){
                        if(data.status == "0"){
                            console.log(data);
                            $(".badge").text(data.count);
                        }
                    },
                    error: function(msg){
                        console.log("222");
                    }
                });
            }

        }



        function initTable2() {
            $table = $('#table');
            $table.bootstrapTable({
                url: basePath+'/admin/information/informationPage.shtml?SAVETYPE=1',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
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
                    field: 'INID',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '标题',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'TITLE',
                    title: '类型',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'RELEASETIME',
                    title: '编辑时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'REALNAME',
                    title: '编辑人',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'edit',
                    title: '操作',
                    align: 'center',
                }]
            });
        }

    });
}());


