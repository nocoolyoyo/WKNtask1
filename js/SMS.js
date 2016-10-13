(function(){
    $(function() {
        var $table,
            selections = [],
            $container; //默认进入页面下表，即occupation默认进入页面


        $(document).on("click", "#add", function() {
            initSMSAdd();
        });

        $(document).on("click", "#reply", function() {
            initSMSReply();
            initTimepicker();
        });

        $(document).on("click", "#back", function() {
            initSMSIndex();
            initTimepicker();
        });

        function initSMSAdd(){
            $container = $("#main-box");
            $.ajax({
                url: "./data/SMS-add.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            initTableMembers();
            function initTableMembers(){
                var $tableMembers = $('#table');
                $add = $('#add');
                $tableMembers.bootstrapTable({
                    url: 'data/occupation.json',
                    idField: "id",
                    pageSize: 4,
                    pageList: 'all',
                    paginationVAlign: top,
                    sidePagination: 'client',
                    pagination: true,
                    toolbar: "#table-toolbar",
                    // sidePagination: "server",
                    showColumns: true,
                    height: 300,
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

                $tableMembers.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($tableMembers.bootstrapTable('getSelections').length) {
                        $add.show();
                    } else {
                        $add.hide();
                    }
                    selections = getIdSelections();
                });
                $add.click(function () {
                    var ids = getIdSelections();
                    $tableMembers.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $add.hide();
                });
                function getIdSelections() {
                    return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                        return row.id
                    });
                }
            }
            initMembersSelected();
            function initMembersSelected(){
                var $tableSelected = $('#members-selected');

                $tableSelected.bootstrapTable({
                    url: 'data/occupation.json',
                    idField: "id",
                    pageNumber: 12,
                    height: 590,
                    search: true,
                    showHeader:false,
                    toolbar: "#left-toolbar",

                    columns: [{
                        field: 'REALNAME',
                        title: '姓名',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号',
                        sortable: true,
                        align: 'center'
                    }]
                });

            }
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
          initTableMembers();
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


