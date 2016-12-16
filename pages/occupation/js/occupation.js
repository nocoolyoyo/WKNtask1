var occupation = function(){
    console.log('in');
        var $table,
            selections = [],
            onameList = [],
            $container = $("#main-box");
        //默认页面初始化
        
        initHYXX();
 
        /*
         *  功能：occupation页面导航
         *  Created by nocoolyoyo 2016/10/08.
         */
       $(document).on("click", "#side-menu > li", function() {
            switch ($(this).index()) {
                case 0: initHYXX();break;
                case 1: initZWGL();break;
                case 2: initQLGL();break;
                case 3: initWJH() ;break;
                case 4: initQGL() ;break;
            }
        });
   
        /*
         *  功能：侧边栏初始化
         *  Created by nocoolyoyo 2016/9/28.
         */
        function initSidebar(){
            $('#sidebar-switch').on('click touchstart',function() {
                $('#sidebar-left').toggleClass('active');
                $('#content-area').toggleClass('inner');
                $('.content-area-box').toggleClass('inner');
                $table.bootstrapTable('resetView');
            });

            //$('.sidebar-overlay').on('click touchstart',function() {
            //    $('.sidebar,.sidebar-container').removeClass('active');
            // });
        }
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
         * 功能：人员职务列表输出
         *
         */
        function outputOnameList(){
            onameList = [];
            $.ajax({
                url: basePath+'/admin/member/occupationFindByPage.shtml',
                dataType:'json',
                async :false,
                success:function(data)
                {

                    for (var i=0; i<data.rows.length; i++){
                        var onameListTemplate  = {"value":"","text":""};
                        onameListTemplate.value = data.rows[i].OID;
                        onameListTemplate.text = data.rows[i].ONAME;
                        onameList.push(onameListTemplate);
                    }
                    // return onameList;
                }
            });

            return onameList;
        }

        //职务管理
        function initZWGL(){
            $.ajax({
                url: basePath + "/data/occupation-ZWGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            $table = $('#table');
            var $tablePermission = $('#table-permission'),
                $ZWGLDelete = $('#folder-delete');
            initTable2();
            initSidebar();
            function initTable2() {
                var selectItem = [],
                    checklistItem = [];
                $.ajax({
                    url: basePath + "/admin/member/memberRegistration.shtml",
                    dataType: 'json',
                    async : false,
                    success:function(data)
                    {
                        selectItem = data.mapList;
                    }
                });
                $.ajax({
                    url: basePath + "/data/occupation-checklist.json",
                    dataType: 'json',
                    async : false,
                    success:function(data)
                    {
                        checklistItem = data;
                    }
                });
                $table.bootstrapTable({
                    url: basePath+'/admin/member/occupationFindByPage.shtml',
                    method: "post",
                    datatype: 'json',
                    height: 601,
                    toolbar: "#table-toolbar",
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: false,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    pageList: [12, 25, 50, 100],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮
                    showColumns: true,//列选择按钮

                    columns: [{
                        field: 'state',
                        checkbox: true
                    },{
                        field: 'ONAME',
                        title: '职务名称',
                        align: 'center',
                        editable: {
                            type: 'text',
                            title: '职务名称',
                            pk: 1,//主键ID
                            params: function(params) {
                                //originally params contain pk, name and value
                                //params.a = 1;
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');
                                console.log(data[index].OID);
                                console.log($(this).parents('tr').data('name'));
                                params.OID = data[index].OID;
                                return params;
                            },
                            url: basePath+'/admin/member/updateOccupation.shtml',  //修改后发送的地址
                            send: 'auto',  //当PK和URL设置时，值改变会自动发送
                            mode: 'inline',
                            success: function(response, newValue) {
                                $table.bootstrapTable('refresh');
                            },
                            validate: function (value) {
                                value = $.trim(value);
                                if (!value) {
                                    return '职务名不能为空！';
                                }
                            }
                        }
                    }, {
                        field: 'COUNTOCCUPATION',
                        title: '人员数',
                        formatter: function (value, row){
                            return '<a href="#" class="ZWGLmembers">'+value+'</a>'
                        },
                        events: 'ZWGLEvents',
                        align: 'center'
                    },  {
                        field: 'CREATETIME',
                        title: '创建时间',

                        align: 'center'
                    }, {
                        field: 'GRADE',
                        //field: 'STATUS',
                        title: '排序',
                        align: 'center',
                        editable: {
                            type: 'select',
                            title: '排序',
                            emptytext: '-',
                            display: '无',
                            mode: 'inline',
                            send: 'auto',//当PK和URL设置时，值改变会自动发送
                            params: function(params) {
                                //originally params contain pk, name and value
                                //params.a = 1;
                                var data = $table.bootstrapTable('getData');
                                var index = $(this).parents('tr').data('index');

                                params.OID = data[index].OID;
                                return params;
                            },
                            url: basePath+'/admin/member/updateOccupation.shtml',//服务器接收改变值的URL
                            source: selectItem
                        }
                    }, {
                        field: 'PERMISSION',
                        title: '操作',
                        formatter: function (value, row){
                            return '<a href="#" class="permission">通讯录权限设置</a>'//这里记得吧id改成你要传入的keyID
                        },
                        events: 'ZWGLEvents',
                        align: 'center'
                    }]
                });

                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $ZWGLDelete.show();
                    } else {
                        $ZWGLDelete.hide();
                    }

                });
                $table.on('page-change.bs.table', function(){
                    $ZWGLDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $ZWGLDelete.hide();
                })
                $ZWGLDelete.click(function () {
                    var ids = getIdSelections(); //获取当前选择的id删除
                    console.log(ids);
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认删除该职务吗？删除前请及时修改相关会员的职务信息？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/deleteOccupation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OID":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功！");
                                            //alert("删除成功!");
                                            $ZWGLDelete.hide();
                                            $table.bootstrapTable('refresh');

                                        }else{
                                            toastr.error("删除失败！");
                                            //alert("删除失败，请联系管理人员！");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });
                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.OID
                    });
                }

            }
            /*模态框视图修正*/

            //新建职务时保存事件

            $('#folder-add').click(function(){

                $('#add-modal').modal('show');

            });

            $('#add-submit').click(function() {
                console.log($('#ONNAME').val());//保存时的职务名

                if($('#ONNAME').val()==""){
                    toastr.warning("职务名不能为空！");
                    //alert("职务名不能为空！");
                    return false;
                }else{
                    $.ajax({
                        url: basePath + '/admin/member/addOccupation.shtml',
                        dataType: 'json',
                        type: 'post',
                        async :false,
                        data:{"ONAME":$('#ONNAME').val().trim()},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                toastr.success("新增成功！");
                                $('#add-modal').modal('hide');
                                $table.bootstrapTable('refresh');

                            }else{
                                toastr.error("新增失败！");
                                // alert(data.errMsg);
                            }
                        },
                        error: function(msg){
                            toastr.error("操作失败，请联系管理人员！");
                            // alert("操作失败，请联系管理人员！");
                        }
                    });
                }


            });


            var perOID;
            var perData = [];

            /*  $(document).on("click", ".permission", function() {

             perOID = $(this).attr('data-id');//点击跳转时保存ID
             initTablePermission();
             $tablePermission.bootstrapTable('refresh')
             });*/


            //初始化权限管理窗口
            function initTablePermission() {
                $tablePermission.bootstrapTable({
                    url: basePath + '/admin/member/findOccupation.shtml',
                    queryParams: function getParams(params) {
                        //params obj
                        params.OID = perOID;

                        return params;
                    },

                    sidePagination: "server",//服务端分页
                    height: 400,
                    columns: [{
                        field: 'state',
                        checkbox: true

                    },{
                        field: 'ONAME',
                        title: '职务名称',

                        align: 'center'

                    },{
                        field: 'OCCUPATIONID',
                        title: 'OCCUPATIONID',
                        //formatter: permissionData,
                        visible: false
                    }]
                });



                // function permissionData(value, row, index){
                //}
                function getPerSelections() {
                    return $.map($tablePermission.bootstrapTable('getSelections'), function (row) {
                        return row.OID
                    });
                };
                //保存提交PERMISSIN
                $('#permission-submit').unbind("click").click(function(){//$("#sdfsd").unbind("click").click(function(e){ ***** });  在绑定新click方法前对元素所绑定的click方法解绑

                    bootbox.confirm({
                        size: "small",
                        message: "确认修改该职务权限吗？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/updateOccupationRole.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OID":perOID,OCCUPATIONID:""+getPerSelections()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("修改成功！");
                                            // alert("修改成功!");
//  	                                          $("#permission-modal").modal('hide');
//  	                                          $("#table-permission").bootstrapTable('refresh');
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("修改失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });
                $('#permission-modal').modal('show');
                $('#permission-modal').on('shown.bs.modal', function () {
                    $.ajax({
                        url: basePath + '/admin/member/findOccupation.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"OID":perOID},
                        traditional: true,
                        success:function(data){
                            var ob = data.ocptMap.OCCUPATIONID.split(",");
                            console.log(ob);
                            var oc = [];
                            for(var i=0; i<ob.length; i++){
                                oc.push(parseInt(ob[i]));
                            }
                            $tablePermission.bootstrapTable('checkBy', {field:'OID', values: oc});
                        }
                    });
                    $tablePermission.bootstrapTable('resetView');
                });
                $('#permission-modal').on('hidden.bs.modal', function (e) {
                    $( '#permission-modal' ).off().on( 'hidden', 'hidden.bs.modal');
                })


            }
            //查看职务成员
            window.ZWGLEvents = {
                'click .ZWGLmembers': function (e, value, row, index) {
                    initZWGLMembers(row.OID);//换成需要传入的ID

                },'click .permission': function (e, value, row, index) {
                    perOID = row.OID;//点击跳转时保存ID
                    initTablePermission();
                    $tablePermission.bootstrapTable('refresh');
                }
            };

            function initZWGLMembers(id){
                ZWId = id;
                $.ajax({
                    url: basePath + "/data/occupation-ZWGL-members.html",
                    async :false,
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });
                $('#back').click( function(){
                    initZWGL();
                });

                initSidebar();

                $table = $('#tableMembers');
                var $membersDelete = $('#ZWGL-members-delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/serchAllMember.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showRefresh: true,
                    showColumns: true,
                    showToggle: true,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height: 601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        params.OCCUPATIONID = id;
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索

                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'MOBILE',
                        title: '成员账号',

                        align: 'center'
                    }, {
                        field: 'REALNAME',
                        title: '成员姓名',

                        align: 'center'
                    }, {
                        field: 'BIRTHDAY',
                        title: '成员生日',

                        align: 'center'
                    }]
                });
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $membersDelete.show();
                    } else {
                        $membersDelete.hide();
                    }
                    selections = getMembersSelections();
                });
                $table.on('page-change.bs.table', function(){
                    $membersDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $membersDelete.hide();
                });
                function getMembersSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USERNAME;
                    });
                }

                //删除会员
                $membersDelete.click(function(){
                    var ids = getMembersSelections();
                    var memberid = ""+ids;
                    bootbox.confirm({
                        size: "small",
                        message: "确认删除？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/deleteMemberRelation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"OCCUPATIONID":id,"USERNAME":memberid},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功!");
                                            $membersDelete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("删除失败!");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");
                                    }
                                });
                            }
                        }
                    });
                });

                initMembersAdd();
                function initMembersAdd(){
                    //页面初始化
                    //加载所有会员数据
                    var selections = [],//临时选择数组
                        unSelected = [],//未选中人员数组
                        selected = [],//已选中人员数组
                        $tableMembers = $('#table-members'),
                        $tableSelected = $('#members-selected'),
                        $fasterFlier = $('#fast-fliter');
                    enableSubmit();

                    $("#select-sure").click(function () {
                        var mySelect = "";
                        console.log(selected);
                        for(var k=0; k < selected.length; k++){
                            mySelect += selected[k].USERNAME + ',';
                        }
                        mySelect=mySelect.substring(0,mySelect.length-1);
                        console.log(mySelect);

                        bootbox.confirm({
                            size: "small",
                            message: "确认添加？",
                            className: "center",
                            title: "操作",
                            buttons: {
                                cancel: {
                                    label: '取消',
                                    className: 'btn-default left-mg-10 right'
                                },
                                confirm: {
                                    label: '确定',
                                    className: 'btn-primary '
                                }

                            },
                            callback: function(result){
                                $.ajax({
                                    url: basePath + '/admin/member/saveMemberRelation.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {"OCCUPATIONID":id,"CHECKBOXID":mySelect},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("添加成功！");
                                            clear();
                                            $('#select-modal').modal('hide');
                                            $('#tableMembers').bootstrapTable('refresh');
                                        }else{
                                            toastr.error(data.errMsg);
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });

                            }
                        })


                    });
                    function enableSubmit(){
                        var $selectSubmit = $("#select-sure");
                        if(selected.length != 0){
                            $selectSubmit.removeAttr('disabled');
                        }else if(selected.length == 0){
                            $selectSubmit.attr('disabled', 'disabled');
                        }
                    }

                    //获取成员职务列表信息
                    outputOnameList();
                    for(var j=0; j < onameList.length; j++){
                        $fasterFlier.append('<li><a href="#" data-id="'+onameList[j].value+  '">' + onameList[j].text + '</a></li>');
                    }

                    //获取所有成员信息
                    $.ajax({
                        url: basePath + "/admin/member/serchAllMember.shtml",
                        async: false,
                        dataType:"json",
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        success: function (data) {
                            unSelected = data.rows;

                            /*//舍弃前端去重
                             var existMembers = $table.bootstrapTable('getData');

                             for(var l=0; l < existMembers.length; l++){
                             for(var s=0; s < unSelected.length; s++){
                             if(unSelected[s].USID == existMembers[l].USID){
                             //selected = selected.concat(unSelected[s]);
                             unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                             }
                             }
                             }*/
                        }
                    });
                    initTableMembers();
                    initMembersSelected();



                    //清空操作
                    $(document).on("click", ".clear", function() {
                        clear()

                    });

                    function clear(){
                        unSelected = selected.concat(unSelected);
                        $tableMembers.bootstrapTable('load', unSelected);
                        $tableMembers.bootstrapTable( 'uncheckAll');
                        selected = [];
                        $tableSelected.bootstrapTable('load', selected);
                        enableSubmit()
                    }

                    /*模态框表格窗口修正*/
                    $('#select-modal').on('shown.bs.modal', function () {
                        //$tableMembers.bootstrapTable('refresh');
                        //$tableSelected.bootstrapTable('refresh');
                        $tableMembers.bootstrapTable('resetView');
                        $tableSelected.bootstrapTable('resetView');
                    });


                    //移除已选数据对象组里的数据，同时返回原表格数据
                    $(document).on("click", ".selectedRemove", function() {
                        var removeSelect = [];
                        var tempID=  parseInt($(this).attr('data-id'));
                        removeSelect.push(tempID);
                        // selected = selected.concat(getRowSelections());
                        for(var i=0; i < selected.length; i++){
                            if( removeSelect.join() == selected[i].USID) {

                                $tableMembers.bootstrapTable('insertRow', {
                                    index: 0,
                                    row: selected[i]
                                });
                                selected.splice(selected.indexOf(selected[i]),1) ;
                                $tableSelected.bootstrapTable('load', selected);
                                $tableMembers.bootstrapTable( 'uncheckAll');
                                enableSubmit()
                            }
                        }

                    });
                    function initTableMembers(){
                        var $add = $('#members-add');
                        $tableMembers.bootstrapTable({
                            // idField: "id",
                            data: unSelected,
                            pageSize: 50,
                            pageList: [15,25,50,100],
                            sidePagination: 'client',
                            maintainSelected:true,
                            pagination: true,
                            toolbar: "#select-toolbar",
                            search: true,
                            // sidePagination: "server",
                            showColumns: true,
                            height: 490,
                            columns: [{
                                field: 'state',
                                checkbox: true

                            },{
                                field: 'REALNAME',
                                title: '姓名',

                                align: 'center'
                            }, {
                                field: 'MOBILE',
                                title: '手机号',

                                align: 'center'
                            }, {
                                field: 'COMPANY',
                                title: '所在单位',

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
                            enableSubmit()
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
                            height: 475,
                            search: true,
                            showHeader:false,
                            toolbar: "#left-toolbar",

                            columns: [{
                                field: 'SELECTED',
                                title: '已选人员',

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
                    /*快速添加中的人员选择添加*/
                    $(document).on('click', '#fast-fliter > li a', function(){
                        var tempOID = $(this).attr('data-id');
                        for(var n=0; n < unSelected.length; n++){
                            console.log(unSelected[n].OIDS)
                            if(typeof(unSelected[n].OIDS) !== "undefined"){
                                var tempOIDS = unSelected[n].OIDS.split(",");
                                console.log(tempOIDS)
                                if(tempOIDS.contains(tempOID)){
                                    selected = selected.concat(unSelected[n]);
                                }
                            }
                        }

                        for(var l=0; l < selected.length; l++){
                            for(var s=0; s < unSelected.length; s++){
                                if(unSelected[s].USID == selected[l].USID){
                                    unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                                }
                            }
                        }

                        $tableSelected.bootstrapTable('load', selected);
                        $tableMembers.bootstrapTable('load', unSelected);
                        enableSubmit()
                    });
                }

            }

        }
        //群聊管理
        function initQLGL(){
            $.ajax({
                url: basePath + "/data/occupation-QLGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initTable3();
            initSidebar();
            function initTable3() {
                $table = $('#table');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/gourpChat.shtml',
                    method: "post",
                    datatype: 'json',

                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height:601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理


                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮

                    columns: [{
                        field: 'REALNAME',
                        title: '姓名',

                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "男";
                            }else if(value==2){
                                return "女";
                            }else{
                                return "保密";
                            }
                        }
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',

                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',

                        align: 'center'
                    }, {
                        field: 'COMPANY',
                        title: '所在单位',

                        align: 'center'
                    }, {
                        field: 'COMPANYWORK',
                        title: '单位职务',

                        align: 'center'
                    }, {
                        field: 'ACTION',
                        title: '操作',

                        align: 'center',
                        formatter:action
                    }]
                });
                function action(value, row){
                    var li = "";
                    if(value==0){
                        li = "<select id="+row.USERNAME+" onchange='groupChat("+row.USERNAME+");'>"
                            +"<option value="+0+" selected>正常</option>"
                            +"<option value="+1+">禁言</option>"
                            +"</select>";
                    }else{
                        li = "<select id="+row.USERNAME+" onchange='groupChat("+row.USERNAME+");'>"
                            +"<option value="+0+">正常</option>"
                            +"<option value="+1+" selected>禁言</option>"
                            +"</select>";
                    }
                    return li;
                }
            }
        	function groupChat(userName){
           		//if(confirm("确认修改")) {
	                $.ajax({
	            		url: '<%=basePath%>admin/member/gourpChatUpdate.shtml',
	            		dataType: 'json',
	            		type: 'post',
	            		data:{"USERNAME":userName,"ACTION":$("#"+userName).val()},
	            		traditional: true,
	            		success:function(data){
	            			if(data.status == "0"){
	            				alert("修改成功!");
	            			}else{
	            				alert(data.errMsg);
	            			}
	            		},
	            		error: function(msg){
	            			alert("操作失败，请联系管理人员！");
	            		}
	            	});
                //}
            }
            
        }
        //未激活
        function initWJH(){
            $.ajax({
                url: basePath + "/data/occupation-WJH.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initTable4();
            initSidebar();
            function initTable4() {
                $table = $('#table');
                var $send = $('#send');
                var $sendAll = $('#send-all');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/activationUserMember.shtml',
                    method: "post",
                    datatype: 'json',
                    pageSize: 12,//单页记录数
                    height:601,
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页

                    pageList: [5, 10, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理

                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮


                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'REALNAME',
                        title: '姓名',

                        editable: false,
                        align: 'center'
                    }, {
                        field: 'GENDER',
                        title: '性别',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "男";
                            }else if(value==2){
                                return "女";
                            }else{
                                return "保密";
                            }
                        }
                    }, {
                        field: 'MOBILE',
                        title: '手机号码',

                        align: 'center'
                    }, {
                        field: 'ONAME',
                        title: '商会职务',

                        align: 'center'
                    },{
                        field: 'ISACTIVATION',
                        title: '状态',

                        align: 'center',
                        formatter:function(value){
                            if (value==1) {
                                return "激活中";
                            }else if(value==2){
                                return "已激活";
                            }else{
                                return "未激活";
                            }
                        }
                    }, {
                        field: 'operation',
                        title: '操作',
                        align: 'center',
                        events: "editEvents",
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
                $table.on('page-change.bs.table', function(){
                    $send.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $send.hide();
                });
                $send.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认发送？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/updateMembersActivication.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"checkboxId":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功！");

                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("发送失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $send.hide();
                });
                $sendAll.click(function () {
                    var ids = getIdSelections();

                    bootbox.confirm({
                        size: "small",
                        message: "确认发送？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/updateMembersActivication.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"checkboxId":""},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("发送成功！");

                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("发送失败！");

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    $send.hide();
                });


                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.USID
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
//                    alert('You click like action, row: ' + JSON.stringify(row));


                        bootbox.confirm({
                            size: "small",
                            message: "确认发送？",
                            className: "center",
                            title: "操作",
                            buttons: {
                                cancel: {
                                    label: '取消',
                                    className: 'btn-default left-mg-10 right'
                                },
                                confirm: {
                                    label: '确定',
                                    className: 'btn-primary '
                                }

                            },
                            callback: function(result){
                                if(result == true){
                                    $.ajax({
                                        url: basePath + '/admin/member/updateMembersActivication.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data:{"checkboxId":row.USID},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("发送成功!");

                                                $table.bootstrapTable('refresh');
                                            }else{
                                                toastr.error("发送失败!");
                                            }
                                        },
                                        error: function(msg){
                                            toastr.error("操作失败，请联系管理人员！");

                                        }
                                    });
                                }
                            }
                        })

                    },
                    'click .remove': function (e, value, row, index) {
                        $table.bootstrapTable('remove', {
                            field: 'id',
                            values: [row.id]
                        });
                    }
                };
            }
        }
        //群管理
        function initQGL(){
            $.ajax({
                url: basePath + "/data/occupation-QGL.html",
                async :false,
                success:function(data)
                {
                    $container.html(data);
                }
            });

            initTable5();
            initSidebar();
            var groupId;
            function initTable5() {
                $table = $('#table');
                var $QGLDelete = $('#QGL-delete');
                $table.bootstrapTable({
                    url: basePath+'/admin/member/queryGroup.shtml',
                    method: "post",
                    datatype: 'json',
                    idField: "id",
                    toolbar: "#table-toolbar",
                    showColumns: true,
                    showToggle: true,
                    detailView: false,
                    dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                    search: true,//是否搜索
                    pagination: true,//是否分页
                    pageSize: 12,//单页记录数
                    height: 601,
                    pageList: [12, 20, 50],//分页步进值
                    sidePagination: "server",//服务端分页
                    contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                    queryParamsType: "limit",//查询参数组织方式
                    queryParams: function getParams(params) {
                        //params obj
                        //params.other = "otherInfo";
                        return params;
                    },
                    searchOnEnterKey: false,//回车搜索
                    showRefresh: true,//刷新按钮


                    columns: [{
                        field: 'state',
                        checkbox: true
                    }, {
                        field: 'GROUPNAME',
                        title: '群名字',

                        events:'QGLEvents',
                        formatter: groupFormatter,
                        align: 'center'
                    }, {
                        field: 'DETAIL',
                        title: '群简介',

                        align: 'center'
                    }, {
                        field: 'CREATEDATE',
                        title: '创建时间',

                        align: 'center'
                    }, {
                        field: 'COUNT',
                        title: '群成员数',

                        formatter: membersFormatter,
                        events:'QGLEvents',
                        align: 'center'
                    }]
                });


                function groupFormatter(value, row){

                    return '<a href="#" class="groupDetail"  data-toggle="modal"  data-target="#QGL-edit-modal">' + value + '</a>';

                }
                function membersFormatter(value, row){

                    return '<a href="#" class="membersDetail">' + value + '</a>';

                }
                $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                    if ($table.bootstrapTable('getSelections').length) {
                        $QGLDelete.show();
                    } else {
                        $QGLDelete.hide();
                    }
                    selections = getIdSelections();
                });
                $table.on('page-change.bs.table', function(){
                    $QGLDelete.hide();
                });
                $table.on('refresh.bs.table', function(){
                    $QGLDelete.hide();
                });
                //添加群
                $('#QGL-add').click(function (){


                });
                //添加群保存

                $('#QGL-submit').click(function () {
                    bootbox.confirm({
                        size: "small",
                        message: "确认保存？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/createNewGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"GROUPNAME":$("#QGLName").val(),DETAIL:$("#QGLDescription").val()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){

                                            toastr.success("保存成功！");
                                            $('#QGL-add-modal').modal('hide')
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error("保存失败！");
                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })
                });

                //功能：输入框验证
                $('#add-from').bootstrapValidator({
                    message: '所有值不能为空',
                    //excluded: [':disabled'],
                    fields: {
                        QGLName: {
                            validators: {
                                notEmpty: {
                                    message: '请输入群名称！'
                                }
                            }
                        }
                    }
                });


                $('#QGLName').on('keyup', function(){
                    dataBind();
                });

                function dataBind(){
                    var $submit = $("#QGL-submit");
                    $('form :input').bind('input propertychange', function () {
                        var $QGLName = $("#QGLName").val();
                        if($QGLName !== ""){
                            $submit.removeAttr('disabled');
                        }if($QGLName == ""){
                            $submit.attr('disabled', 'disabled');
                        }
                    });
                }

                //修改保存
                $('#editQGL-submit').click(function () {
                    console.log($("#editQGLName").val());
                    console.log($("#editQGLDescription").val());


                    bootbox.confirm({
                        size: "small",
                        message: "确认修改？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/updateGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{GROUPID:groupId,"GROUPNAME":$("#editQGLName").val(),DETAIL:$("#editQGLDescription").val()},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("修改成功!");

                                            $('#QGL-edit-modal').modal('hide')
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })


                });


                $('#editQGLName').on('keyup', function(){
                    yanzhengXG();
                });
                function yanzhengXG(){
                    var $editSubmit = $("#editQGL-submit");

                    var $editQGLName = $("#editQGLName").val();
                    if($editQGLName !== ""){
                        $editSubmit.removeAttr('disabled');
                    }if($editQGLName == ""){
                        $editSubmit.attr('disabled', 'disabled');
                    }
                }

                //群管理删除
                $QGLDelete.click(function () {
                    var ids = getIdSelections();
                    var id = ""+ids;

                    bootbox.confirm({
                        size: "small",
                        message: "确认删除？",
                        className: "center",
                        title: "操作",
                        buttons: {
                            cancel: {
                                label: '取消',
                                className: 'btn-default left-mg-10 right'
                            },
                            confirm: {
                                label: '确定',
                                className: 'btn-primary '
                            }

                        },
                        callback: function(result){
                            if(result == true){
                                $.ajax({
                                    url: basePath + '/admin/member/deleteGroup.shtml',
                                    dataType: 'json',
                                    type: 'post',
                                    data:{"GROUPID":id},
                                    traditional: true,
                                    success:function(data){
                                        if(data.status == "0"){
                                            toastr.success("删除成功!");

                                            $QGLDelete.hide();
                                            $table.bootstrapTable('refresh');
                                        }else{
                                            toastr.error(data.errMsg);

                                        }
                                    },
                                    error: function(msg){
                                        toastr.error("操作失败，请联系管理人员！");

                                    }
                                });
                            }
                        }
                    })

                });

                //修改群
                //$(document).on('click', '.groupDetail',function(){
                //console.log($(this).index())

                // });
                //function initQGLmembers(){
                //var table
                //  }




                function getIdSelections() {
                    return $.map($table.bootstrapTable('getSelections'), function (row) {
                        return row.GROUPID
                    });
                }

            }

            //查看群成员

            window.QGLEvents = {
                'click .membersDetail': function (e, value, row, index) {
                    //alert('You click like action, row: ' + JSON.stringify(row));
                    //alert(row.USERNAME);
                    initQGLMembers(row.GROUPID)
                    //initHYXXDetail(row.USERNAME)
                    // window.location.href = basePath+"/admin/url/occupationProfile.shtml?USERNAME="+row.USERNAME;
                },
                'click .groupDetail': function (e, value, row, index) {
                    $.ajax({
                        url: basePath + '/admin/member/showGroup.shtml',
                        dataType: 'json',
                        type: 'post',
                        data:{"GROUPID":row.GROUPID},
                        traditional: true,
                        success:function(data){
                            if(data.status == "0"){
                                groupId = data.map.GROUPID;
                                $("#editQGLName").val(data.map.GROUPNAME);
                                $("#editQGLDescription").val(data.map.DETAIL);
                                //yanzhengXG();
                            }else{
                                toastr.error(data.errMsg);

                            }
                        },
                        error: function(msg){
                            toastr.error("操作失败，请联系管理人员！");
                        }
                    });
                },
            };
            function initQGLMembers(id){
                groupId = id;
                $.ajax({
                    url: basePath + "/data/occupation-QGL-members.html",
                    async :false,
                    success:function(data)
                    {
                        $container.html(data);
                    }
                });
                $(document).on('click', '#back',function(){
                    initQGL();
                });

                initGroupMembers();
                initSidebar();
                function initGroupMembers() {

                    $table = $('#tableMembers');
                    var $membersDelete = $('#QGL-members-delete');
                    $table.bootstrapTable({
                        url: basePath+'/admin/member/queryGoupMember.shtml',
                        method: "post",
                        datatype: 'json',
                        idField: "id",
                        toolbar: "#table-toolbar",
                        showRefresh: true,
                        showColumns: true,
                        showToggle: true,
                        dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                        search: true,//是否搜索
                        pagination: true,//是否分页
                        pageSize: 12,//单页记录数
                        height: 601,
                        pageList: [12, 20, 50],//分页步进值
                        sidePagination: "server",//服务端分页
                        contentType: "application/x-www-form-urlencoded",//请求数据内容格式 默认是 application/json 自己根据格式自行服务端处理
                        queryParamsType: "limit",//查询参数组织方式
                        queryParams: function getParams(params) {
                            //params obj
                            params.GROUPID = groupId;
                            return params;
                        },
                        searchOnEnterKey: false,//回车搜索

                        columns: [{
                            field: 'state',
                            checkbox: true
                        }, {
                            field: 'MOBILE',
                            title: '成员账号',

                            align: 'center'
                        }, {
                            field: 'REALNAME',
                            title: '成员姓名',

                            align: 'center'
                        }, {
                            field: 'BIRTHDAY',
                            title: '成员生日',

                            align: 'center'
                        }]
                    });
                    $table.on('check.bs.table uncheck.bs.table ' +
                        'check-all.bs.table uncheck-all.bs.table', function () {
                        if ($table.bootstrapTable('getSelections').length) {
                            $membersDelete.show();
                        } else {
                            $membersDelete.hide();
                        }
                        selections = getMembersSelections();
                    });
                    $table.on('page-change.bs.table', function(){
                        $membersDelete.hide();
                    });

                    $table.on('refresh.bs.table', function(){
                        $membersDelete.hide();
                    });
                    function getMembersSelections() {
                        return $.map($table.bootstrapTable('getSelections'), function (row) {
                            return row.USERNAME;
                        });
                    }

                    //删除会员
                    $membersDelete.click(function(){
                        var ids = getMembersSelections();
                        var memberid = ""+ids;
                        bootbox.confirm({
                            size: "small",
                            message: "确认删除？",
                            className: "center",
                            title: "操作",
                            buttons: {
                                cancel: {
                                    label: '取消',
                                    className: 'btn-default left-mg-10 right'
                                },
                                confirm: {
                                    label: '确定',
                                    className: 'btn-primary '
                                }

                            },
                            callback: function(result){
                                if(result == true){
                                    $.ajax({
                                        url: basePath + '/admin/member/deleteGoupMember.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data:{GROUPID:groupId,"MEMBERUSER":memberid,TYPE:2},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("删除成功!");

                                                $membersDelete.hide();
//                                                    $('#select-modal').modal('hide');
                                                $table.bootstrapTable('refresh');

                                            }else{
                                                toastr.error("删除失败!");
                                            }
                                        },
                                        error: function(msg){
                                            toastr.error("操作失败，请联系管理人员！");

                                        }
                                    });
                                }
                            }
                        })

                    });

                    initMembersAdd();

                    function initMembersAdd(){
                        //页面初始化
                        //加载所有会员数据
                        var selections = [],//临时选择数组
                            unSelected = [];//未选中人员数组
                        selected = [],//已选中人员数组
                            $tableMembers = $('#table-members'),
                            $tableSelected = $('#members-selected');
                        $fasterFlier = $('#fast-fliter');
                        enableSubmit();
                        $("#select-sure").click(function () {
                            var mySelect = "";
                            console.log(selected);
                            for(var k=0; k < selected.length; k++){
                                mySelect += selected[k].USID + ';' +  selected[k].USERNAME + ',';
                            }
                            mySelect=mySelect.substring(0,mySelect.length-1);
                            console.log(mySelect);


                            bootbox.confirm({
                                size: "small",
                                message: "确认添加？",
                                className: "center",
                                title: "操作",
                                buttons: {
                                    cancel: {
                                        label: '取消',
                                        className: 'btn-default left-mg-10 right'
                                    },
                                    confirm: {
                                        label: '确定',
                                        className: 'btn-primary '
                                    }

                                },
                                callback: function(result){
                                    $.ajax({
                                        url: basePath + '/admin/member/addMemberOfGroup.shtml',
                                        dataType: 'json',
                                        type: 'post',
                                        data: {GROUPID:groupId,"chkinfo":mySelect},
                                        traditional: true,
                                        success:function(data){
                                            if(data.status == "0"){
                                                toastr.success("添加成功！");

//                                            $delete.hide();
                                                clear();
                                                $('#select-modal').modal('hide');
                                                $('#tableMembers').bootstrapTable('refresh');
                                            }else{
                                                toastr.error(data.errMsg);
                                            }
                                        },
                                        error: function(msg){
                                            toastr.error("操作失败，请联系管理人员！");

                                        }
                                    });

                                }
                            })


                        });
                        function enableSubmit(){
                            var $selectSubmit = $("#select-sure");
                            if(selected.length != 0){
                                $selectSubmit.removeAttr('disabled');
                            }else if(selected.length == 0){
                                $selectSubmit.attr('disabled', 'disabled');
                            }
                        }

                        //获取成员职务列表信息
                        outputOnameList();
                        console.log(outputOnameList())
                        for(var j=0; j < onameList.length; j++){
                            $fasterFlier.append('<li><a href="#" data-id="'+onameList[j].value+  '">' + onameList[j].text + '</a></li>');
                        }

                        //获取所有成员信息
                        $.ajax({
                            url: basePath + "/admin/member/serchAllMember.shtml",
                            async: false,
                            dataType:"json",
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            success: function (data) {
                                unSelected = data.rows;
                                /*//舍弃前端去重
                                 var existMembers = $table.bootstrapTable('getData');
                                 console.log(existMembers)
                                 for(var l=0; l < existMembers.length; l++){
                                 for(var s=0; s < unSelected.length; s++){
                                 if(unSelected[s].USID == existMembers[l].USID){
                                 //selected = selected.concat(unSelected[s]);
                                 unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                                 }
                                 }
                                 }
                                 console.log(unSelected)*/

                            }
                        });
                        initTableMembers();
                        initMembersSelected();


                        //确认操作


                        //清空操作
                        $(document).on("click", ".clear", function() {
                            clear()
                        });

                        function clear(){
                            unSelected = selected.concat(unSelected);
                            $tableMembers.bootstrapTable('load', unSelected);
                            $tableMembers.bootstrapTable( 'uncheckAll');
                            selected = [];
                            $tableSelected.bootstrapTable('load', selected);
                            enableSubmit()
                        }

                        /*模态框表格窗口修正*/
                        $('#select-modal').on('shown.bs.modal', function () {
                            $tableMembers.bootstrapTable('resetView');
                            $tableSelected.bootstrapTable('resetView');
                        });


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

                                    $tableMembers.bootstrapTable( 'uncheckAll');
                                    enableSubmit()
                                }
                            }

                        });
                        function initTableMembers(){
                            var $add = $('#members-add');
                            $tableMembers.bootstrapTable({
                                // idField: "id",
                                data: unSelected,
                                pageSize: 50,
                                pageList: [15,25,50,100],
                                sidePagination: 'client',
                                maintainSelected:true,
                                pagination: true,
                                toolbar: "#select-toolbar",
                                search: true,
                                // sidePagination: "server",
                                showColumns: true,
                                height: 490,
                                columns: [{
                                    field: 'state',
                                    checkbox: true

                                },{
                                    field: 'REALNAME',
                                    title: '姓名',
                                    align: 'center'
                                }, {
                                    field: 'MOBILE',
                                    title: '手机号',
                                    align: 'center'
                                }, {
                                    field: 'COMPANY',
                                    title: '所在单位',
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
                                enableSubmit()
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
                                height: 475,
                                search: true,
                                showHeader:false,
                                toolbar: "#left-toolbar",

                                columns: [{
                                    field: 'SELECTED',
                                    title: '已选人员',

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
                        /*快速添加中的人员选择添加*/
                        $(document).on('click', '#fast-fliter > li a', function(){
                            var tempOID = $(this).attr('data-id');
                            for(var n=0; n < unSelected.length; n++){
                                console.log(unSelected[n].OIDS)
                                if(typeof(unSelected[n].OIDS) !== "undefined"){
                                    var tempOIDS = unSelected[n].OIDS.split(",");
                                    console.log(tempOIDS)
                                    if(tempOIDS.contains(tempOID)){
                                        selected = selected.concat(unSelected[n]);
                                    }
                                }
                            }

                            for(var l=0; l < selected.length; l++){
                                for(var s=0; s < unSelected.length; s++){
                                    if(unSelected[s].USID == selected[l].USID){
                                        unSelected.splice(unSelected.indexOf(unSelected[s]),1)
                                    }
                                }
                            }

                            $tableSelected.bootstrapTable('load', selected);
                            $tableMembers.bootstrapTable('load', unSelected);
                            enableSubmit()
                        });
                    }

                }
            }
        }
}