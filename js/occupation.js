(function(){
    $(function() {
        var $table;
            pageNum = 0;//默认进入页面下表，即occupation默认进入页面
        $(document).on("click", "#menu > li", function() {
            pageNum = $(this).index();
            var $container = $("#main-box");
            switch (pageNum) {
                case 0: $.ajax({
                            url:"./data/occupation-HYXX.html",
                            async: false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        pjaxRefreshFunc(pageNum);   break;
                case 1: $.ajax({
                            url:"./data/occupation-ZWGL.html",
                            async :false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        pjaxRefreshFunc(pageNum);   break;
                case 2: $.ajax({
                            url:"./data/occupation-QLGL.html",
                            async:false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        $container.html($.ajax({url: "./data/occupation-QLGL.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
                case 3: $container.html("");
                        $container.html($.ajax({url: "./data/occupation-WJH.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
                case 4: $container.html("");
                        $container.html($.ajax({url: "./data/occupation-QGL.html", async: false}).responseText);
                        pjaxRefreshFunc(pageNum);   break;
            }
        });

        /*
         *  功能：侧边栏初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initSidebar(){
            $('#sidebar-switch').on('click touchstart',function() {
                $('#sidebar-left').toggleClass('active');
            });

            $('.sidebar-overlay').on('click touchstart',function() {
                $('.sidebar,.sidebar-container').removeClass('active');
            });
        }

        selections = [];
        initSidebar();
        initTable1();

        // var $menu = $('#occupation-menu');
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
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */
        function pjaxRefreshFunc(){
            switch(pageNum) {
                case 0: initTable1(); initSidebar();  break;
                case 1: initTable2(); initSidebar(); initTimepicker();break;
                case 2: initTable3(); initSidebar(); break;
                case 3: initTable4(); initSidebar(); break;
                case 4: initTable5(); initSidebar(); break;
            }
        }

        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initTable1() {
            $table = $('#table');
            var $delete = $('#delete');
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
                    editable: true,
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
                }, {
                    field: 'edit',
                    title: '编辑',
                    align: 'center',
                    // events: editEvents,
                    formatter: editFormatter
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

            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */
            function editFormatter(value, row, index) {
                return [
                    '<a class="" href="javascript:void(0)">',
                    '<i class="glyphicon glyphicon-wrench"></i>',
                    '</a>  '
                ].join('');
            }
            window.editEvents = {
                'click .like': function (e, value, row, index) {
                    alert('You click like action, row: ' + JSON.stringify(row));
                },
                'click .remove': function (e, value, row, index) {
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                }
            };
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
                    editable: true,
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
        function initTable3() {
            $table = $('#table');
            $table.bootstrapTable({
                url: 'data/occupation-QLGL.json',
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
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A5',
                    title: '所在单位',
                    sortable: true,
                    align: 'center'
                }]
            });

        }
        function initTable4() {
            $table = $('#table');
            var $send = $('#send');
            $table.bootstrapTable({
                url: 'data/occupation-QLGL.json',
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
                    field: 'A1',
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    // events: editEvents,
                    formatter: operateFormatter
                }]
            });
            $table.on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                if ($table.bootstrapTable('getSelections').length) {
                    $send.show();
                } else {
                    $send.hide();
                }
                selections = getIdSelections();
            });

            $send.click(function () {
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $send.hide();
            });


            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.id
                });
            }
            /*
             *  功能：操作框
             *  Created by nocoolyoyo 2016/9/28.
             */
            function operateFormatter(value, row, index) {
                return [
                    '<a class="like" href="javascript:void(0)" title="Like">',
                    '<i class="glyphicon glyphicon-send"></i>',
                    '</a>  '
                ].join('');
            }
            window.editEvents = {
                'click .like': function (e, value, row, index) {
                    alert('You click like action, row: ' + JSON.stringify(row));
                },
                'click .remove': function (e, value, row, index) {
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                }
            };
        }
        function initTable5() {
            $table = $('#table');
            var $delete = $('#delete');
            var $add = $('#add');
            $table.bootstrapTable({
                url: 'data/occupation-QLGL.json',
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
                    field: 'A1',
                    title: '姓名',
                    sortable: true,
                    editable: true,
                    align: 'center'
                }, {
                    field: 'A2',
                    title: '性别',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A3',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'A4',
                    title: '商会植物',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'edit',
                    title: '编辑',
                    align: 'center',
                    // events: editEvents,
                    formatter: editFormatter
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
                    return row.id
                });
            }
            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */
            function editFormatter(value, row, index) {
                return [
                    '<a class="" href="javascript:void(0)">',
                    '<i class="glyphicon glyphicon-wrench"></i>',
                    '</a>  '
                ].join('');
            }
            window.editEvents = {
                'click .like': function (e, value, row, index) {
                    alert('You click like action, row: ' + JSON.stringify(row));
                },
                'click .remove': function (e, value, row, index) {
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                }
            };
        }
    });
}());


