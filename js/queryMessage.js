(function(){
    $(function() {
        var $table,
            pageNum = 0,
            $container; //默认进入页面下表，即occupation默认进入页面

        $(document).on("click", "#menu > li", function() {
            pageNum = $(this).index();
            $container = $("#main-box");
            switch (pageNum) {
                case 0: $.ajax({
                            url:"./data/queryMessage-GET.html",
                            async: false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        pjaxRefreshFunc(pageNum);   break;
                case 1: $.ajax({
                            url:"./data/queryMessage-SEND.html",
                            async :false,
                            success:function(data)
                            {
                                $container.html(data);
                            }
                        });
                        pjaxRefreshFunc(pageNum);   break;
            }
        });

        $(document).on("click", "#write-queryMessage", function() {
            $container = $("#main-box");
            $.ajax({
                url:"./data/queryMessage-CREATE.html",
                async: false,
                success:function(data)
                {
                    $container.html(data);
                }
            });
            initSidebar();
            $('#newQueryMessage').summernote({
                lang: 'zh-CN',
                disableDragAndDrop: true,
                height: 450,
                minHeight: 450,
                maxHeight: 450
            });

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
        $('#asd').summernote({
            lang: 'zh-CN',
            disableDragAndDrop: true,
            height: 450,
            minHeight: 450,
            maxHeight: 450
        });


        /*
         *  功能：会员页内部导航
         *  Created by nocoolyoyo 2016/9/28.
         */
        function pjaxRefreshFunc(){
            switch(pageNum) {
                case 0: initTable1(); initSidebar();  break;
                case 1: initTable2(); initSidebar();  break;
            }
        }

        /*
         *  功能：会员页表格初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        function initTable1() {
            $table = $('#table');
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
    });
}());


