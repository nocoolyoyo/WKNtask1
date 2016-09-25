$(function(){
    /*
     *  功能：登入验证函数
     *  页面：login.html
     *  Created by nocoolyoyo 2016/9/24.
     */
    var $submit = $("#login-submit");
    $('form :input').bind('input propertychange', function () {
        var $username = $("#login-username").val();
        var $password = $("#login-password").val();
        if($username !== "" && $password !== ""){
            $submit.removeAttr('disabled');
        }if($username == "" || $password == ""){
            $submit.attr('disabled', 'disabled');
        }
    });
    $('#login-reset').click(function () {
        $submit.attr('disabled', 'disabled');
    });
    // function login(){
    //
    //     if(username !== null && password !== null){
    //         submit.removeAttr("disbale");
    //         reset.removeAttr("disable");
    //
    //         document.loginform.submit();
    //     }
    //
    // }
});


