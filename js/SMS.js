(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面


        $(document).on("click", "#add", function() {
            initSMSCreate();
        });

        $(document).on("click", "#reply", function() {
            initSMSReply();
            initTimepicker();
        });

        $(document).on("click", "#back", function() {
            initSMSIndex();
            initTimepicker();
        });

        function initSMSCreate(){
                    //d等待添加
        }


        function initSMSReply(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/SMS-reply.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable2();
        }

        function initSMSIndex(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/SMS-index.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTable1();
        }





        initTable1();
        initTimepicker();

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
            $delete = $('#delete');
            $table.bootstrapTable({
                url: 'data/occupation.json',
                idField: "id",
                pageNumber: 12,
                height: 601,
                pageList: [12, 25, 50, 100],
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
            $delete = $('#delete');
            $table.bootstrapTable({
                url: 'data/occupation.json',
                idField: "id",
                pageNumber: 12,
                height: 601,
                pageList: [12, 25, 50, 100],
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


