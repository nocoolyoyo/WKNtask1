(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面

        $(document).on("click", "#add", function() {
            initNoticeCreate()
        });

        $(document).on("click", "#drafts", function() {
            initNoticeDrafts();
        });


        function initNoticeIndex(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/notice-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
        }
        function initNoticeCreate(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/notice-create.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            $('#newNotice').summernote({
                lang: 'zh-CN',
                height: 330,
                minHeight: 330,
                maxHeight: 330,
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
            $('#notice-save').click(function () {
                {
                    var content = $('#newNotice').summernote('code');
                    console.log(content);
                }
            });
            $('#back').click(function () {
                initNoticeIndex();
            })
        }
        function initNoticeDrafts(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/notice-drafts.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
            $('#back').click(function () {
                initNoticeIndex();
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
        function initTable2() {
            $table = $('#table');
            $table.bootstrapTable({
                url: 'data/occupation-zhiwuguanli.json',
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
                    field: 'id',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A1',
                    title: '职务名称',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '创建时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '操作',
                    sortable: true,
                    align: 'center'
                }]
            });
        }
    });
}());


