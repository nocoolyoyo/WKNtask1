(function() {
    $(function() {
        var $table = $('#table');
        var $tableWinner = $('#tableWinner');
        var $tablePartic = $('#tablePartic');
        /*模态框表格窗口修正*/
        $('#queryWinner-modal').on('shown.bs.modal', function () {
            $tableWinner.bootstrapTable('resetView');
        });
        $('#queryPartic-modal').on('shown.bs.modal', function () {
            $tablePartic.bootstrapTable('resetView');
        });


        selections = [];

        initTable1();
        initTableWinner();
        initTablePartic();
        initTimepicker();
        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
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
        function initTable1() {
            var  $delete = $('#delete');
            $table.bootstrapTable({
                url: 'data/memberLog.json',
                idField: "id",
                height: 601,
                pageList: [10, 25, 50, 100],
                sidePagination: 'client',
                pagination: true,
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                showColumns: true,
                showToggle: true,
                detailView: true,

                // detailFormatter: detailFormatter,
                columns: [{
                    field: 'state',
                    checkbox: true

                }, {
                    field: 'USID',
                    title: 'ID',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'account',
                    title: '用户账户',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'name',
                    title: '用户名称',
                    sortable: true,
                    align: 'center'
                },{
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    formatter: operateFormatter
                }]
            });

            function operateFormatter(value, row){
                return [
                    '<a class="QRCode both-5" href="#"  data-toggle="modal" data-target="#queryQRCode-modal">',
                    '二维码',
                    '</a>',
                    '<a class="queryWinner both-5" href="#"  data-toggle="modal" data-target="#queryWinner-modal">',
                    '获奖名单',
                    '</a>',
                    '<a class="queryPartic both-5" href="#"  data-toggle="modal" data-target="#queryPartic-modal">',
                    '参与名单',
                    '</a>'
                ].join('')
            }




            /*
             *  功能：获取选择框信息
             *  Created by nocoolyoyo 2016/9/28.
             */
            function deleteIdSelections(){
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    console.log($table.bootstrapTable('getSelections'))
                    console.log(getIdSelections())
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
                        field: 'USID',
                        values: ids
                    });
                    $delete.hide();
                });
            }

            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.USID
                });
            }

            /*
             *  功能：编辑框
             *  Created by nocoolyoyo 2016/9/28.
             */

            function editFormatter(value, row, index) {
                return [
                    '<a class="" href="javascript:void(0)">',
                    '<i class="glyphicon glyphicon-trash"></i>',
                    '</a>  '
                ].join('');
            }
        }


        function initTableWinner() {

                $tableWinner.bootstrapTable({
                    url: 'data/memberLog.json',
                    // pageSize: 6,
                    // pageList: [6, 12, 50],
                    // sidePagination: 'client',
                    // pagination: true,
                    height: 450,
                    // sidePagination: "server",
                    //toolbar: "#tableWinner-toolbar",
                    showColumns: true,
                    // showToggle: true,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'USID',
                        title: 'ID',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'account',
                        title: '用户账户',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'name',
                        title: '用户名称',
                        sortable: true,
                        align: 'center'
                    }]
                });
        }
        function initTablePartic() {

                $tablePartic.bootstrapTable({
                    url: 'data/memberLog.json',

                    // pageList: [10, 25, 50, 100],
                    // sidePagination: 'client',
                    // pagination: true,
                    height: 450,
                    // sidePagination: "server",
                    toolbar: "#queryPartic-toolbar",
                    showColumns: true,
                    // showToggle: true,

                    columns: [{
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'USID',
                        title: 'ID',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'account',
                        title: '用户账户',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'name',
                        title: '用户名称',
                        sortable: true,
                        align: 'center'
                    }]
                });
        }

    });
}());


