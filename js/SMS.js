(function(){
    $(function() {
        var $table,
            $container;
        /*页面index*/
        initSMSIndex();
        $(document).on("click", "#back", function() {
            initSMSIndex();
        });

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
            initTimepicker();
            $(document).on("click", "#add", function() {
                initSMSAdd();
            });
            $(document).on("click", "#reply", function() {
                initSMSReply();
            });
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
        }

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

        function initSMSAdd(){
            //页面初始化
            var $container = $("#main-box");
            $.ajax({
                url: "./data/SMS-add.html",
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    $container.html(data);
                }
            });
            //加载所有会员数据
            var
                selections = [],
                unSelected = [],
                selected = [],

                $tableMembers = $('#table-members'),
                $tableSelected = $('#members-selected');

                $.ajax({
                    url: "./data/occupation.json",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        unSelected = data;
                        // initTableMembers();
                        // $tableMembers.bootstrapTable('load', data)
                    }
                }).done(function (data) {
                    // unSelected = data;
                });


            console.log(unSelected)
                initClockpicker();
                initTableMembers();
                initMembersSelected();

                //清空操作
                $(document).on("click", "#clear", function() {
                    unSelected = selected.concat(unSelected);
                    $tableMembers.bootstrapTable('load', unSelected)
                    $tableMembers.bootstrapTable( 'uncheckAll');
                    selected = [];
                    labelCreate();
                    $tableSelected.bootstrapTable('load', selected)

                });
            //定时操作
                $('#timer').click(function () {
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        $('.date').fadeOut()
                    }else {
                        $(this).addClass('active');
                        $('.date').fadeIn()
                    }
                });


            /*模态框表格窗口修正*/
            $('#select-modal').on('shown.bs.modal', function () {
                $tableMembers.bootstrapTable('resetView');
                $tableSelected.bootstrapTable('resetView');
            });
            //时间选择初始化
            function initClockpicker(){
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
            function labelCreate(){
                function RndClassName(){
                    var rnd = parseInt(6*Math.random());
                    switch (rnd) {
                        case 0:
                            return 'label-default';
                        case 1:
                            return 'label-primary';
                        case 2:
                            return 'label-success';
                        case 3:
                            return 'label-warning';
                        case 4:
                            return 'label-danger';
                        case 5:
                            return 'label-info';
                    }
                }
                var html='';
                for (var j = 0; j < selected.length; j++) {
                    html += '<span class="label both-2 '+RndClassName()+'">'
                        + selected[j].REALNAME + '<a class="selectedRemove label-icon fa fa-times" data-id="'
                        + selected[j].USID +'"></a></span>';
                }
                $('.select-person').html(html);
            }
            //移除已选数据对象组里的数据，同时返回原表格数据
            $(document).on("click", ".selectedRemove", function() {
                var removeSelect = [];
                var tempID=  parseInt($(this).attr('data-id'));
                removeSelect.push(tempID)
                // selected = selected.concat(getRowSelections());
                for(var i=0; i < selected.length; i++){
                    if( removeSelect.join() == selected[i].USID) {

                        $tableMembers.bootstrapTable('insertRow', {
                            index: 0,
                            row: selected[i]
                        });
                        selected.splice(selected.indexOf(selected[i]),1) ;
                        $tableSelected.bootstrapTable('load', selected);
                        if($(this).hasClass('label-icon')){
                            $(this).closest('span').remove();
                        }else{
                            labelCreate(); // console.log($('.select-person').find('a').attr('data-id',tempID))
                            // $('.label-icon').attr('data-id',$(this).attr('data-id')).closest('span')
                            // $('.select-person').find('a').attr('data-id',$(this).attr('data-id')).closest('span').remove();
                        }

                        $tableMembers.bootstrapTable( 'uncheckAll');
                    }
                }
                // $tableSelected.bootstrapTable('remove', {
                //     field: 'USID',
                //     values: removeSelect
                // });
            });
            function initTableMembers(){
                var $add = $('#members-add');
                $tableMembers.bootstrapTable({
                    // idField: "id",
                    data: unSelected,
                    pageSize: 9,
                    pageList: [12, 25, 50, 100],
                    sidePagination: 'client',
                    pagination: true,
                    toolbar: "#table-toolbar",
                    // sidePagination: "server",
                    showColumns: true,
                    height: 490,
                    columns: [{
                        field: 'state',
                        checkbox: true

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
                });
                /*人员选择*/
                //往已选数据对象组里填充添加的数据，同时移除表格数据
                $add.click(function () {
                    selected = selected.concat(getRowSelections());
                    $tableSelected.bootstrapTable('load', selected);
                    $tableMembers.bootstrapTable('remove', {
                        field: 'USID',
                        values: selections
                    });
                    $add.hide();
                    console.log(selected)
                    console.log(unSelected)

                    labelCreate();
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
                $tableSelected.bootstrapTable({
                    data: selected,
                    // pageNumber: 12,
                    height: 475,
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

                        '<div class="pull-left">',
                        '<span>' + row.REALNAME +'   '+ '</span>',
                        '</div>',
                        '<div class="pull-left">',
                        '<span>' + row.MOBILE + '</span>',
                        '</div>',
                        '<div class="pull-right">',
                        '<a class="selectedRemove close" href="javascript:void(0)"  data-id="' + row.USID +'" title="移除">',
                        '<i class="glyphicon glyphicon-remove"></i>',
                        '</a> ',
                        '</div>'
                    ].join('');
                }

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
            initTable2();
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
        }

    });
}());


