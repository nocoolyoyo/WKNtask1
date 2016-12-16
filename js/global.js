/*全局参数位置*/
var local = window.location;
var contextPath = local.pathname.split("/")[1];
var basePath = local.protocol+"//"+local.host+"/"+contextPath;
console.log(basePath);

/*全局方法位置*/
//ajax请求页面
var replacePage = function($container,requestPath){
    $.ajax({
        url: basePath + requestPath,
        async :false,
        success:function(data)
        {
            $container.html(data);
        }
    });
};

/*全局初始化*/