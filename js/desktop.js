(function() {
    $(function(){
        /*
         *  功能：桌面菜单内容填充
         *  页面：index.html
         *  Created by nocoolyoyo 2016/9/25.
         */
        var $board_daily = $("#board ul:eq(0)");
        var $board_manage = $("#board ul:eq(1)");
        //菜单填充渲染
        function loadRenderBoard(){
            for (var i = 0; i < Menu.daily.length; i++) {
                $board_daily.append('<li class="col-xs-3 col-sm-3"><a href="' + Menu.daily[i].url + '.html" role="button">' + '<i class="fa ' + Menu.daily[i].icon + '"></i>' + Menu.daily[i].name + '</a></li>');
            }
            for (var j = 0; j < Menu.manage.length; j++) {
                $board_manage.append('<li class="col-xs-3 col-sm-3"><a href="' + Menu.manage[j].url + '.html" role="button">' + '<i class="fa ' + Menu.manage[j].icon + '"></i>' + Menu.manage[j].name + '</a></li>');
            }
        }
        loadRenderBoard();
    });
}());

