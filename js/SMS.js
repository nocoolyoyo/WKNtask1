(function(){
    $(function() {
        var $table,
            selections = [],
            $container;
        var selected = [];

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


            $('#timer').click(function () {

                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $('.date').fadeOut()
                }else {
                    $(this).addClass('active');
                    $('.date').fadeIn()
                }
            });


            function initTimepicker(){
                $('.form_date').datetimepicker({
                    pickerPosition: 'top-right',
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 0,
                    forceParse: 0
                });
            }
            initTimepicker();
            initTableMembers();
            initMembersSelected();
            function initTableMembers(){
                var $tableMembers = $('#table-members');
                $add = $('#add');
                $tableMembers.bootstrapTable({
                    url: 'data/occupation.json',
                    // idField: "id",
                    // pageSize: 6,
                    // pageList: 'all',
                    // paginationVAlign: bottom,
                    // sidePagination: 'client',
                    pagination: true,
                    showPaginationSwitch: false,
                    maintainSelected: true,
                    toolbar: "#table-toolbar",
                    // sidePagination: "server",
                    showColumns: true,
                    height: 300,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    },{
                        field: 'USID',
                        title: '姓名',
                        align: 'center',
                        visible: false

                    },{
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
                    selections  = getIdSelections();

                    console.log(selections)
                    console.log(selected)
                });

                //往已选数据对象组里填充添加的数据，同时移除表格数据
                $add.click(function () {
                    // console.log(selections)
                    // var ids = selections;

                    selected = selected.concat(getRowSelections());

                    // Array.prototype.distinct = function(selected){
                    //     console.log('111')
                    //     var self = this;
                    //     var _a = this.concat().sort();
                    //     _a.sort(function(a,b){
                    //         if(a == b){
                    //             var n = self.indexOf(a);
                    //             self.splice(n,1);
                    //         }
                    //     });
                    //     return self;
                    // };
                    $tableMembers.bootstrapTable('remove', {
                        field: 'USID',
                        values: selections
                    });
                    $add.hide();
                });
                function getRowSelections() {
                    return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                        return row
                    });
                }
                function getIdSelections() {
                    return $.map($tableMembers.bootstrapTable('getSelections'), function (row) {
                        return row.USID
                    });
                }
            }

            function initMembersSelected(){
                var $tableSelected = $('#members-selected');

                $tableSelected.bootstrapTable({
                    data: selected,
                    idField: "id",
                    pageNumber: 12,
                    height: 590,
                    // classes: 'no-line-table table-no-bordered',
                    search: true,
                    showHeader:false,
                    toolbar: "#left-toolbar",

                    columns: [{
                        field: 'SELECTED',
                        title: '已选人员',
                        sortable: true,
                        formatter: selectedFormatter,
                        align: 'center'
                    }]
                });
                function selectedFormatter(value, row) {
                    return [

                        // '<div class="alert alert-dismissible alert-dark alert-success">',
                        // '<button type="button" class="close" data-dismiss="alert">×</button>',
                        // ' <strong>'+ row.REALNAME +'</strong>'+ row.MOBILE,
                        // '</div>'


                        '<div class="pull-left">',
                        '<span>' + row.REALNAME +'   '+ '</span>',
                        '</div>',
                        '<div class="pull-left">',
                        '<span>' + row.MOBILE + '</span>',
                        '</div>',
                        '<div class="pull-right">',
                        '<a class="selectedRemove close" href="javascript:void(0)" title="移除">',
                        '<i class="glyphicon glyphicon-remove"></i>',
                        '</a> ',
                        '</div>'
                    ].join('');
                }

            }
        }
        /*
         *  功能：文本框信息校验
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


