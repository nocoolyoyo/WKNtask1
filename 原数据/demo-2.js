(function() {
    $(function(){
        /*
         *  功能：桌面菜单内容填充
         *  页面：index.html
         *  Created by nocoolyoyo 2016/9/25.
         */
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        var $board_daily = $("#board ul:eq(0)");
        var $board_manage = $("#board ul:eq(1)");
        //菜单填充渲染
        function loadRenderBoard(){
            for (var i = 0; i < Menu.daily.length; i++) {
                $board_daily.append('<li class="col-xs-3 col-sm-3"><a href="'+ basePath + "/admin/url/" + Menu.daily[i].url + '.shtml" role="button">' + '<span><i class="fa ' + Menu.daily[i].icon + '"></i>' + Menu.daily[i].name + '</span></a></li>');
            }
            for (var j = 0; j < Menu.manage.length; j++) {
                $board_manage.append('<li class="col-xs-3 col-sm-3"><a href="' + Menu.manage[j].url + '.shtml" role="button">' + '<span><i class="fa ' + Menu.manage[j].icon + '"></i>' + Menu.manage[j].name + '</span></a></li>');
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
        //$birthday_bless.popover({
        //html: true
        //});


        $(document).on("click", "#birthday-bless-sure", function(){
            $birthday_bless.popover('hide');

            /****点击确定发送短信后执行***/
        });
        $(document).on("click", "#birthday-bless-cancel", function(){
            $birthday_bless.popover('hide');
            /****点击取消隐藏***/
        });

        // $birthday_bless_sure.on('click', function () {
        //     console.log('sure');
        // });

        /*
         *  功能：生日页面弹出事件
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function showAllBirthday(birthday) {
            $.ajax({
                url: basePath+'/admin/menu/birthdayMember.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    "BIRTHDAY":birthday
                },
                success:function(data){
                    if(data.status == "0"){
                        var li = "";
                        var length = data.list.length;
                        for(var i=0; i<length; i++){
                            //li +=	"<li>成某某<a href=\"#\" class=\"birthday-bless\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"<p class='center'>确定？</p>\" data-content=\"<button class='birthday-bless-sure btn button button-primary button-rounded'>是的</button><button id='birthday-bless-cancel' class='btn button button-rounded'>取消</button>\"><i class=\"fa fa-birthday-cake\"></i></a></li>";
                            li += "<li class='list-group-item'>"+data.list[i].REALNAME +"<a href='javascript:blessingSMS("+data.list[i].USID+")' class='birthday-bless'><i class='fa fa-birthday-cake'></i></a></li>";
                        }
                        $(".modal-body").html(li);
                        return;
                    }
                },
                error: function(msg){
                    $(".modal-body").html("错误");
                }
            });
        }
        var birthday;
        function todayDate(){
            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "/";
            todayDate += (mydate.getMonth()+1) + "/";
            todayDate += mydate.getDate();
            return todayDate;
        }
        console.log(todayDate());
        birthday = todayDate();
        $(document).on("click", ".mh-on", function(){
            console.log($(this).attr('date'));
            birthday = $(this).attr('date');
            birthdayMember($(this).attr('date'));//首页生日列表
            $('#birthday-modal').on('show.bs.modal', showAllBirthday(birthday));//更多生日列表
        });
        birthdayMember(todayDate());//首页生日列表
        $('#birthday-modal').on('show.bs.modal', showAllBirthday(birthday));//更多生日列表

        /*
         *  功能：备忘录弹出事件
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function showBacklogDetail(memorId,name) {
            alert(1);
            alert(memorId);
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
        $('#backlog-add').on('click', addBacklog);

        /*
         *  功能：备忘录删除
         *  页面：*
         *  Created by nocoolyoyo 2016/9/29.
         */
        function deleteBacklog(memorId,tr) {
            alert(memorId);
            $.ajax({
                url:'<%=basePath%>admin/todo/deleteMemor.shtml?MEMORID='+memorId,
                type:'post',
                dataType:'json',
                success:function(ret){
                    if(ret.STATUS =="0"){
                        alert("删除成功!");
                        $(tr).parent().parent().remove();
                    }
                }
            });
            console.log("删除备忘录");
        }
        $('.backlog-delete').on('click', deleteBacklog);


        function birthdayMember(birthday){
            $.ajax({
                url: basePath+'/admin/menu/birthdayMember.shtml',
                dataType: 'json',
                type: 'post',
                data:{
                    "BIRTHDAY":birthday
                },
                success:function(data){
                    if(data.status == "0"){
                        var li = "";
                        var length = data.list.length;
                        if(length>3){
                            length = 3;
                        }
                        for(var i=0; i<length; i++){
                            li += "<li>"+data.list[i].REALNAME +"<a href='javascript:blessingSMS("+data.list[i].USID+")' class='birthday-bless'><i class='fa fa-birthday-cake'></i></a></li>"
                        }
                        if(data.list.length > 3){
                            li += "<li class='center'><a href='#' class='birthday-more' data-toggle='modal' data-target='#birthday-modal'>查看更多</a></li>"
                        }
                        $("#birthday-list").html(li);
                        return;
                    }
                },
                error: function(msg){
                    $("#birthday-list").html("错误");
                    $("#login-message").css("color","red");
                }
            });
        }
    });
}());
