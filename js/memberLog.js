(function() {
    $(function() {
        var $table = $('#table'),
            $delete = $('#delete');
        selections = [];

        initTable();
        deleteIdSelections();

        /*
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */


        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable() {
            $table.bootstrapTable({
                url: 'data/memberLog.json',
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
                    editable: true,
                    align: 'center'
                }, {
                    field: 'name',
                    title: '用户名称',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'time',
                    title: '修改时间',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'content',
                    title: '修改内容',
                    sortable: true,
                    align: 'center'
                }]
            });
        }

        // function detailFormatter(index, row) {
        //     var html = [];
        //     $.each(row, function (key, value) {
        //         html.push('<p><b>' + key + ':</b> ' + value + '</p>');
        //     });
        //     return html.join(' ');
        // }
        /*
         *  功能：获取选择框信息
         *  Created by nocoolyoyo 2016/9/28.
         */
        function deleteIdSelections(){
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
        }

        function getIdSelections() {
            return $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id
            });
        }

        function responseHandler(res) {
            $.each(res.rows, function (i, row) {
                row.state = $.inArray(row.id, selections) !== -1;
            });
            return res;
        }

        /*
         *  功能：编辑框
         *  Created by nocoolyoyo 2016/9/28.
         */

        function editFormatter(value, row, index) {
            return [
                '<a class="like" href="javascript:void(0)" title="Like">',
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




        //拉取数据

        // $button.click(function () {
        //     $table.bootstrapTable('load', randomData());
        // });
        //
        // function randomData() {
        //     var startId = ~~(Math.random() * 100),
        //         rows = [];
        //
        //     for (var i = 0; i < 10; i++) {
        //         rows.push({
        //             id: startId + i,
        //             name: 'test' + (startId + i),
        //             price: '$' + (startId + i)
        //         });
        //     }
        //     return rows;
        // }

    });
}());

