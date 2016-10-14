(function(){
    $(function() {
        var $table;
        var $delete;





        initTable();
        initTimepicker();
        initDate();
        /*
         *  功能：获取当前时间并对选择器赋值
         *  Created by nocoolyoyo 2016/10/10.
         */
        function initDate(){
            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "-";
            todayDate += (mydate.getMonth()+1) + "-";
            todayDate += mydate.getDate();
            $('#incomeTime').val(todayDate)
        }
        /*
         *  功能：表单验证
         *  Created by nocoolyoyo 2016/9/28.
         */



        $('#form').bootstrapValidator({
            message: '所有值不能为空',
            excluded: [':disabled'],
            fields: {
                incomeName: {
                    validators: {
                        notEmpty: {
                            message: '请输入收支名称！'
                        }
                    }
                },
                incomeMoney: {
                    validators: {
                        notEmpty: {
                            message: '请输入金额！'
                        },
                        regexp: {
                            regexp: /^[0-9]+(.[0-9]{2})?$/,
                            message: '请输入正确的金额！'
                        }
                    }
                },
                incomeTime: {
                    validators: {
                        notEmpty: {
                            message: '请选择收支时间！'
                        }
                    }
                },
                datetimePicker: {
                    validators: {
                        notEmpty: {
                            message: '时间不能为空'
                        }
                    }
                }
            }
        });
        /*
         *  功能：表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initTable() {
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

    });
}());


