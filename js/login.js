(function() {
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
    /*
     *  功能：泡泡动画
     *  页面：login.html
     *  Created by nocoolyoyo 2016/9/24.
     */
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('bubble-box');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('bubble-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < 50; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    function addListeners() {
        window.addEventListener('resize', resize);
    }


    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fill();
        };
    }
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

}());


