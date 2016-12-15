(function() {
    $(function(){
        /*
         *  功能：页面入口浏览器验证
         *  页面：login.html
         *  Created by nocoolyoyo 2016/9/24.
         */
        
        if (myBrowser() == "IE55"||
            myBrowser() == "IE6"||
            myBrowser() == "IE7"||
            myBrowser() == "IE8") {
            browserFail();
        }else{
        	//browserFail();
            browserPass();
        }
        
        function myBrowser(){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
            if (isIE) {
                var IE5 = IE55 = IE6 = IE7 = IE8 = false;
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                IE55 = fIEVersion == 5.5;
                IE6 = fIEVersion == 6.0;
                IE7 = fIEVersion == 7.0;
                IE8 = fIEVersion == 8.0;
                if (IE55) {
                    return "IE55";
                }
                if (IE6) {
                    return "IE6";
                }
                if (IE7) {
                    return "IE7";
                }
                if (IE8) {
                    return "IE8";
                }
            }//isIE end
            if (isFF) {
                return "FF";
            }
        }
 
        /*
         *  功能：浏览器验证失败
         *  页面：login.html
         *  Created by nocoolyoyo 2016/11/14.
         */
        function browserFail(){
        	 var local = window.location;
             var contextPath = local.pathname.split("/")[1];
             var basePath = local.protocol+"//"+local.host+"/"+contextPath;
             
             /*
              *  功能：菜单数据
              *  页面：*.html
              *  Created by nocoolyoyo 2016/9/25.
              */
             var BrowserHelpData = {
                 "pages": [    
                     {"page": '<div id="message-box">很抱歉！您正在使用的浏览器版本过低，无法正常使用商会云后台<br/> 请按照以下步骤安装谷歌浏览器并重试！</div><div id="browser-select"><a href="'+basePath+'/download/Chrome/chromeforxp_49.0.2623.112_setup.exe"><img  id="browser-google" src="'+basePath+'/img/browser-google.png"></a></div><div id="browserFail-footer" class="center">Copyright © 2016 福州永杰网络科技股份有限公司</div>'},
                     {"page": '<div id="message-box">第一步：点击<a href="'+basePath+'/download/Chrome/chromeforxp_49.0.2623.112_setup.exe">这里</a>或者首页谷歌浏览器图标下载按键<br/><img src="'+basePath+'/img/browser/browser_help_1.png"></div>'},
                     {"page": '<div id="message-box">第二步：双击已下载的应用，弹出如下弹窗，一路确定完成安装<br/><img src="'+basePath+'/img/browser/browser_help_2.png"></div>'},
                     {"page": '<div id="message-box">第三步：最后打开浏览器，输入www.shanghuiyunadmin.com:8080/SHANGHUI/<br/>出现以下登陆框即可正常使用<br/><img src="'+basePath+'/img/browser/browser_help_3.jpg"></div>'},           
                     ]
             };
             
        	$('#login-box').hide();
        	$('#browserFail').show();
     
            var $container = $("#browserFail-box");
            var currentPage = 0;
            var currentContent = "";
            initPage();
            function initPage(){
            	$container.html(BrowserHelpData.pages[currentPage].page);
            }
            
            $('#help-left-arrow').click(function(){
            	$('#help-right-arrow').show();
            	if(currentPage == 1){
            		$(this).hide();
            	}
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'.png');
            	currentPage--;
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'_active.png');
            	initPage();
            });
            $('#help-left-arrow').hover(function(){
            	$('#help-left-arrow img').attr('src',basePath+'/img/browser/help_lt_arrow_active.png');
            },function(){
            	$('#help-left-arrow img').attr('src',basePath+'/img/browser/help_lt_arrow.png');
            });
            $('#help-right-arrow').hover(function(){
            	$('#help-right-arrow img').attr('src',basePath+'/img/browser/help_rt_arrow_active.png');
            },function(){
            	$('#help-right-arrow img').attr('src',basePath+'/img/browser/help_rt_arrow.png');
            });
            $('#help-right-arrow').click(function(){
            	$('#help-left-arrow').show();
            	if(currentPage == 2){
            		$(this).hide();
            	}
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'.png');
            	currentPage++; 
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'_active.png');	 
            	initPage();
            });
            $('li').click(function(){
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'.png');
            	currentPage = $(this).index();
            	$('#help-nav img').eq(currentPage).attr('src',basePath+'/img/browser/page_nav_'+(currentPage+1)+'_active.png');	
            	if(currentPage == 0){
            		$('#help-left-arrow').hide();
            	}else{
            		$('#help-left-arrow').show();
            	} 
            	if(currentPage == 3){
            		$('#help-right-arrow').hide();
            	}else{
            		$('#help-right-arrow').show();
            	}
            	
            	initPage();
            	
            });
           
        }
        /*
         *  功能：浏览器验证通过
         *  页面：login.html
         *  Created by nocoolyoyo 2016/11/14.
         */
        function browserPass(){
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

                // 创建元素数量
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

            // 绘图
            function Circle() {
                var _this = this;
                // 创建
                (function() {
                    _this.pos = {};
                    init();
                })();

                function init() {
                    _this.pos.x = Math.random()*width;
                    _this.pos.y = height+Math.random()*100;
                    _this.alpha = 0.1+Math.random()*0.3;
                    _this.scale = 0.1+Math.random();
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
        }
    });
}());


