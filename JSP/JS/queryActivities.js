(function() {
    $(function() {
        var $table = $('#table'),
            $delete = $('#delete');
        $tableWinner = $("#tableWinner");
        $tablePartic = $("#tablePartic");
        selections = [];
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;
        /*模态框表格窗口修正*/
//        $('#queryWinner-modal').on('shown.bs.modal', function () {
//            $tableWinner.bootstrapTable('resetView');
//        });
//        $('#queryPartic-modal').on('shown.bs.modal', function () {
//            $tablePartic.bootstrapTable('resetView');
//        });
        initTable1();
        initTimepicker();
        initDate();


        $(document).on("click",".QRCode",function(){
            console.log($(this).attr('data-url'));
            tempUrl = $(this).attr('data-url');
            $("#aurl").attr('src',$(this).attr('data-url'));
        })
        //下载二维码
        $("#ORCodeUpload").click(function(){
            var src = tempUrl;
            location = "http://www.shanghuiadmin.com:8080/SHANGHUI/DownImageServlet?fileUrl=" + src;
        });
        //点击获取获奖名单
        $(document).on("click",".queryWinner",function(){
            tempId = $(this).attr('data-id');
            initTableWinner(tempId);
        });
        $('#queryWinner-modal').on('shown.bs.modal', function () {
            $tableWinner.bootstrapTable('resetView');

        });

        //点击获取参与名单
        $(document).on("click",".queryPartic",function(){
            tempId = $(this).attr('data-id');
            initTablePartic(tempId);
        })
        $('#queryPartic-modal').on('shown.bs.modal', function () {
            $tablePartic.bootstrapTable('resetView');
        });




        /*
         *  功能：获取当前时间并对选择器赋值
         *  Created by nocoolyoyo 2016/10/10.
         */
        function initDate(){

            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "-";
            todayDate += (mydate.getMonth()+1) + "-";
            todayDate += mydate.getDate();
            $('#activity-time').val(todayDate);
        }
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
            $table = $('#table'),
                $delete = $('#delete');
            $table.bootstrapTable({
                url: basePath+'/admin/signdraw/queryActivityList.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                pageSize: 10,//单页记录数
                pageList: [10, 25, 50, 100],
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                search: true,
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    return params;
                },
                // sidePagination: "server",
                toolbar: "#table-toolbar",
                //showRefresh: true,//刷新按钮
                //showColumns: true,

                // detailFormatter: detailFormatter,
                columns: [
                    {
                        field: 'state',
                        checkbox: true

                    }, {
                        field: 'AID',
                        title: '主键ID',
                        sortable: true,
                        align: 'center',
                        visible: false
                    }, {
                        field: 'AURL',
                        title: '二维码URL',
                        sortable: true,
                        align: 'center',
                        visible: false
                    }, {
                        field: 'ATITLE',
                        title: '标题',
                        sortable: true,
                        formatter: actionDetail,
                        align: 'center'
                    }, {
                        field: 'ACREATETIME',
                        title: '发布时间',
                        sortable: true,
                        align: 'center'
                    },{
                        field: 'operate',
                        title: '操作',
                        align: 'center',
                        formatter: operateFormatter
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

            // $delete.click(function () {
            //     var ids = getIdSelections();
            //     $table.bootstrapTable('remove', {
            //         field: 'id',
            //         values: ids
            //     });
            //     $delete.hide();
            // });
            //跳转详情
            function getIdSelections() {
                return $.map($table.bootstrapTable('getSelections'), function (row) {
                    return row.AID
                });
            }


            function actionDetail(value, row){
                return '<a href="#" class="actionDetail"  data-toggle="modal"  data-id="' + row.AID + '">' + value + '</a>';
            }
            $(document).on("click", ".actionDetail", function() {
                window.open(basePath+"/admin/signdraw/gotoactiondetail.shtml?AID="+$(this).attr('data-id'));
            });
            /*
             *删除
             */
            $delete.on('click', function(){
                var ids = getIdSelections();
                var str="";
                for (var i = 0; i < ids.length; i++) {
                    str += ids[i] + ",";
                }
                $delete.hide();
                //去掉最后一个逗号(如果不需要去掉，就不用写)
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                console.log(str)
                if(confirm('确认删除吗？')){
                    $.ajax({
                        url: basePath+'/admin/signdraw/deleteActivity.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{
                            CHECKBOXID:str
                        },
                        success:function(data){
                            if(data.STATUS == "0"){
                                alert("删除成功");
                                $table.bootstrapTable('refresh');
                            }
                        },
                        error: function(msg){
                        }
                    });
                }
            });
            /*
             *  功能：操作框
             *  Created by nocoolyoyo 2016/9/28.
             */

            function operateFormatter(value, row){
                return [
                    '<a class="QRCode" href="#"  data-url="'+ row.AURL +'" data-toggle="modal" data-target="#queryQRCode-modal">',
                    '二维码',
                    '</a>',
                    '&nbsp',
                    '<a class="queryWinner" href="#" data-id="'+ row.AID +'"  data-toggle="modal" data-target="#queryWinner-modal">',
                    '获奖名单',
                    '</a>',
                    '&nbsp;',
                    '<a class="queryPartic" href="#"  data-id="'+ row.AID +'" data-toggle="modal" data-target="#queryPartic-modal">',
                    '参与名单',
                    '</a>'
                ].join('')
            }
            //二维码显示
            var tempUrl="";
            var tempId="";


            //新增活动保存
            $("#submit").on('click',function(){
                var time = $("#activity-time").val();//时间
                var ts =   $("#activity-ts").val();//提示内容
                var content = $("#activity-content").val();//内容
                var title = $("#activity-title").val();//标题
                $.ajax({
                    url: basePath+'/admin/signdraw/insertActivity.shtml',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        ATITLE:title,ACONTENT:content,ASTARTTIME:time,AOPTINTCONTENT:-ts
                    },
                    success:function(data){
                        if(data.STATUS == "0"){
                            alert("新增成功");
                            $table.bootstrapTable('refresh');
                        }else{
                            alert(data.ERRMSG);
                        }
                    },
                    error: function(msg){
                    }
                });
            })
        }

        //获奖名单
        function initTableWinner(id) {
            $tableWinner = $("#tableWinner");
            $tableWinner.bootstrapTable({
                url: basePath + '/admin/signdraw/querywinning.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 450,
                pageSize: 8,//单页记录数
                pageList: [8, 16, 24],
                toolbar: "#queryWinner-toolbar",
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                search: true,
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    params.AID = id;
                    return params;
                },

//                showColumns: true,
//                showToggle: true,
                // showToggle: true,
                columns: [
                    {
                        field: 'state',
                        checkbox: true

                    },
                    {
                        field: 'USID',
                        title: 'ID',
                        sortable: true,
                        align: 'center',
                        visible:false
                    }, {
                        field: 'REALNAME',
                        title: '名称',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'POSITION',
                        title: '职业',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '公司',
                        sortable: true,
                        align: 'center'
                    }, {
                        field: 'AWNAME',
                        title: '奖项',
                        sortable: true,
                        align: 'center'
                    }]
            });
        }


        //参与名单
        function initTablePartic(id) {
            $tablePartic = $("#tablePartic");
            $tablePartic.bootstrapTable({
                url: basePath + '/admin/signdraw/queryparticipate.shtml',
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: true,//是否分页
                height: 450,
                pageSize: 8,//单页记录数
                pageList: [8, 16, 24],
                toolbar: "#queryPartic-toolbar",
                sidePagination: "server",//服务端分页
                contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                dataType: "json",//期待返回数据类型
                method: "post",//请求方式
                search: true,
                searchAlign: "right",//查询框对齐方式
                queryParamsType: "limit",//查询参数组织方式
                queryParams: function getParams(params) {
                    //params obj
                    //params.other = "otherInfo";
                    params.AID = id;
                    return params;
                },
//                showColumns: true,
//                showToggle: true,
                // showToggle: true,
                columns: [{
                    field: 'state',
                    checkbox: true

                },{
                    field: 'USID',
                    title: 'ID',
                    sortable: true,
                    align: 'center',
                    visible:false
                }, {
                    field: 'REALNAME',
                    title: '名称',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'MOBILE',
                    title: '手机号码',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'POSITION',
                    title: '职业',
                    sortable: true,
                    align: 'center'
                }, {
                    field: 'COMPANY',
                    title: '公司',
                    sortable: true,
                    align: 'center'
                }]
            });
        }

    });
}());
