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

        /**数组去重1，赋值对象去重*/
        // Array.prototype.distinct = function(){
        //     var res = [];
        //     var json = {};
        //     for(var i = 0; i < this.length; i++){
        //         if(!json[this[i]]){
        //             res.push(this[i]);
        //             json[this[i]] = 1;
        //         }
        //     }
        //     return res;
        // }
        /**数组去重2，排序去重*/
        // Array.prototype.distinct = function(){
        //     this.sort(); //先排序
        //     var res = [this[0]];
        //     for(var i = 1; i < this.length; i++){
        //         if(this[i] !== res[res.length - 1]){
        //             res.push(this[i]);
        //         }
        //     }
        //     return res;
        // }
        /*
         *  删除数组元素:Array.removeArr(index)
         */
        // Array.prototype.removeArr = function (index) {
        //     if (isNaN(index) || index>= this.length) { return false; }
        //     this.splice(index, 1);
        // }
        /*
         *  插入数组元素:Array.insertArr(dx)
         */
        Array.prototype.insertArr = function (index, item) {
            this.splice(index, 0, item);
        };
        /*
         *  求数组下表
         */
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };



    });
}());
