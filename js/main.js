(function() {
    $(function(){

        /*
         *  功能：功能页菜单内容填充
         *  页面：*.html
         *  Created by nocoolyoyo 2016/9/25.
         */
        var menu_daily_urls = [];
        var menu_manage_urls = [];
        var $menu = $("#content-navbar-menu ul");
        var current_url = window.location.pathname;
        // var current_url = 'occupation';
        console.log(current_url);

        for (var i = 0; i < Menu.daily.length; i++) {
            menu_daily_urls[i] = Menu.daily[i].url;
            $menu.append('<li><a href="' + Menu.daily[i].url + '.html" role="button">' + '<i class="fa ' + Menu.daily[i].icon + '"></i>' + Menu.daily[i].name + '</a></li>');
            if (current_url.match(menu_daily_urls[i])) {
                // $menu_li.eq(i).addClass('active disabled');
                $("#content-navbar-menu li a").eq(i).addClass('active disabled');
            }

        }

        /*
         *  功能：页面菜单内容填充
         *  页面：index.html
         *  Created by nocoolyoyo 2016/9/25.
         */

        // console.log($url);
        // $('#content-navbar-switch').click(function (){
        //     $menu_daily.toggle();
        //     $menu_manage.toggle();
        // })

    });
}());


