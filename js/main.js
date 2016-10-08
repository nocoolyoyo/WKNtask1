(function() {
    $(function(){
        /*
         *  功能：功能页菜单内容填充
         *  页面：*
         *  Created by nocoolyoyo 2016/9/25.
         */

        var menu_daily_urls = [];
        var menu_manage_urls = [];
        var current_url = window.location.pathname;
        var $menu = $('#content-navbar-menu ul');
        var mark;
        var $switch = $('#content-navbar-switch');
        $switch.click(function () {
            $menu = $('#content-navbar-menu ul');
            if (mark == 'daily') {
                mark = 'manage';
                $menu.children().remove();
                renderMenu();
            }else if(mark == 'manage') {
                mark = 'daily';
                $menu.children().remove();
                renderMenu();
            }
        });
        //菜单数据加载
        function loadMenu() {
            for (var i = 0; i < Menu.daily.length; i++) {
                menu_daily_urls[i] = Menu.daily[i].url;
                if (current_url.match(menu_daily_urls[i])) {
                    mark = 'daily';
                    console.log(menu_daily_urls[i]);
                }
            }
            for (var j = 0; j < Menu.manage.length; j++) {
                menu_manage_urls[j] = Menu.manage[j].url;
                if(current_url.match(menu_manage_urls[j])){
                    mark = 'manage';
                    console.log(menu_manage_urls[j]);
                }
            }

        }
        //菜单节点填充渲染
        function renderMenu() {
            if (mark == 'daily') {
                for (var m = 0; m < Menu.daily.length; m++) {
                    $menu.append('<li><a href="' + Menu.daily[m].url + '.html" role="button">' + '<i class="fa ' + Menu.daily[m].icon + '"></i>' + Menu.daily[m].name + '</a></li>');
                    if (current_url.match(menu_daily_urls[m])) {
                        $("#content-navbar-menu li a").eq(m).addClass('active disabled');
                    }
                }
            }else if(mark == 'manage') {
                for (var m = 0; m < Menu.manage.length; m++) {
                    $menu.append('<li><a href="' + Menu.manage[m].url + '.html" role="button">' + '<i class="fa ' + Menu.manage[m].icon + '"></i>' + Menu.manage[m].name + '</a></li>');
                    if (current_url.match(menu_manage_urls[m])) {
                        $("#content-navbar-menu li a").eq(m).addClass('active disabled');
                    }
                }
            }
        }
        loadMenu();
        renderMenu();





        $('#table-information').bootstrapTable({
            columns: [ {
                field: 'state',
                checkbox: true

            },{
                field: 'id',
                sortable: true,
                title: '姓名'
            },{
                field: 'phone',
                sortable: true,
                title: '手机号'
            }, {
                field: 'company',
                sortable: true,
                title: '所在单位',
                editable: {
                    type: 'text',
                    title: '所在单位',
                    validate: function (value) {
                        value = $.trim(value);
                        if (!value) {
                            return 'This field is required';
                        }
                        if (!/^\$/.test(value)) {
                            return 'This field needs to start width $.'
                        }
                        var data = $table.bootstrapTable('getData'),
                            index = $(this).parents('tr').data('index');
                        console.log(data[index]);
                        return '';
                    }
                }
            },  {
                field: 'position',
                sortable: true,
                title: '单位职务'
            }, {
                field: 'position_shanghui',
                sortable: true,
                title: '商会职务'
            }],
            data: [{
                id: 1,

                phone: 'Item 1wwwwwwwww',
                company: '$1wwwwwwwwwwwwwwwww',
                position: '哈哈wwwwwww',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }, {
                id: 1,
                phone: 'Item 1',
                company: '$1',
                position: '哈哈',
                position_shanghui: '呵呵'
            }],
            pageNumber: 1,
            pageSize: 10,
            pagination: true,
            pageList: [10, 25, 50, 100, "所有"],
            smartDisplay: true,
            detailView: true,
            search: true
        });
    });
}());


