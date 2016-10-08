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
                $board_daily.append('<li class="col-xs-3 col-sm-3"><a href="' + Menu.daily[i].url + '.html" role="button">' + '<span><i class="fa ' + Menu.daily[i].icon + '"></i>' + Menu.daily[i].name + '</span></a></li>');
            }
            for (var j = 0; j < Menu.manage.length; j++) {
                $board_manage.append('<li class="col-xs-3 col-sm-3"><a href="' + Menu.manage[j].url + '.html" role="button">' + '<span><i class="fa ' + Menu.manage[j].icon + '"></i>' + Menu.manage[j].name + '</span></a></li>');
            }
        }

        loadRenderBoard();

        /*
         *  功能：生日日期获取
         *  页面：*
         *  Created by nocoolyoyo 2016/9/28.
         */

        function todayDate(){
            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "/";
            todayDate += (mydate.getMonth()+1) + "/";
            todayDate += mydate.getDate();
            return todayDate;
        }
        console.log(todayDate());
            $(document).on("click", ".mh-on", function(){
                var clickDate = $(this).attr('date');
                console.log(clickDate);
                return clickDate;
            });

        /**todayDate是当前日期值， clickDate是点击得到的日期值**/



        /*
         *  功能：功能页模态框垂直居中
         *  页面：*
         *  Created by nocoolyoyo 2016/9/28.
         */
        function centerModals() {
            $('.modal').each(function(i) {
                var $clone = $(this).clone().css('display', 'block').appendTo('body'); var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                top = top > 0 ? top : 0;
                $clone.remove();
                $(this).find('.modal-content').css("margin-top", top);
            });
        }
        $('.modal').on('show.bs.modal', centerModals());
        $(window).on('resize', centerModals());

        /*
         *  功能：生日页面点击发送短信确认事件
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        var $birthday_bless = $('.birthday-bless');
        $birthday_bless.popover({
            html: true
        });

            //
            // $birthday_bless.each(function(){
            //     console.log("555")
            // });
        // $('.birthday-bless-sure').on('click',function(){
        //     console.log("555")
        // });
        $(document).on("click", ".birthday-bless-sure", function(){
            $birthday_bless.popover('destroy');
            // $(this).popover('hide');
                // $birthday_bless.popover('hide');
        });
        // $(document).on("click", "#birthday-bless-sure", function(){
        //     $birthday_bless.popover('hide');
        //
        // });
        // $(document).on("click", "#birthday-bless-cancel", function(){
        //     $birthday_bless.popover('hide');
        //
        // });




        // $birthday_bless_sure.on('click', function () {
        //     console.log('sure');
        // });

        /*
         *  功能：生日页面弹出事件
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function showAllBirthday(){
            console.log(todayDate())

        }
        $('#birthday-modal').on('show.bs.modal', showAllBirthday);


        /*
         *  功能：备忘录弹出事件
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function showBacklogDetail() {
            console.log("详细备忘录");
        }
        $('#backlog-modal').on('show.bs.modal', showBacklogDetail);
        /*
         *  功能：备忘录添加
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function addBacklog() {
            console.log("添加备忘录");
        }
        $('#backlog-add-submit').on('click', addBacklog);

        /*
         *  功能：备忘录删除
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function deleteBacklog() {

            console.log("删除备忘录");
        }
        $('.backlog-delete').on('click', deleteBacklog);
    });
}());







