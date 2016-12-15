/*!
 * jquery-loaders v1.0.0
 *
 * Author: nocoolyoyo
 * Copyright: 2016
 *
 * Licensed under the BSD 3-Clause
 */
(function ($) {
    $.fn.extend({
        "loaders": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
                //根据参数来设置 dom的样式
                // $this.css({
                //     backgroundColor: opts.background,
                //     color: opts.foreground
                // });
                if(opts.toggle === true){
                    $(loaderContainer).show();
                }else if(opts.toggle === false){
                	 $(loaderContainer).hide('normal');
                }
            });
        }
    });
    //默认参数
    var defaluts = {
        toggle: 'show',
        loaderContainer: '#preloader-container',
        hideCallback: 
    };
})(window.jQuery);