(function(){
    $(function() {
        var $table,
            $delete,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面

        $(document).on("click", "#add", function() {
            initInformationCreate()
        });

        $(document).on("click", "#drafts", function() {

            initInformationDrafts();
        });

        $(document).on("click", ".infoDetail", function() {
            var title = $(this).attr('data-title');
            var content = $(this).attr('data-content');
            initInformationDetail(title, content);
        });

        function initInformationIndex(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/information-index.html",
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
                url: "./data/information-create.html",
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
                url: "./data/information-drafts.html",
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
        function initInformationDetail(infoID){
            console.log(infoID);

            $container = $("#main-box");
            $.ajax({
                url: "./data/information-detail.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });

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
            $delete = $('#delete');
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
                    formatter: infoDetail,
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

            function infoDetail(value, row) {

                // return '<a href="#" class="infoDetail" data-title="' + row.TITLE + '" data-content="' + row.CONTENT + '">' + value + '</a>';

                return '<a href="#" class="infoDetail" data-id="' + row.MOBILE + '">' + value + '</a>';
            }
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */

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
                    return row.id
                });
            }

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
            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */

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
                    return row.id
                });
            }
        }
    });
}());


