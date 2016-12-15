(function() {
    $(function(){
    	//$('#preloader-container').fadeOut('normal');
    	//$('#page-container').fadeIn('normal');	
    	
        /*
         *  功能：功能页菜单内容填充
         *  页面：*
         *  Created by nocoolyoyo 2016/9/25.
         */
    	var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;
    	
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
        toastr.options = {
                "positionClass": "toast-bottom-center",
                "timeOut": "2000"
            }
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
                    $menu.append('<li><a href="'+ basePath + "/admin/url/" + Menu.daily[m].url + '.shtml" role="button">' + '<i class="fa ' + Menu.daily[m].icon + '"></i>' + Menu.daily[m].name + '</a></li>');
                    if (current_url.match(menu_daily_urls[m])) {
                        $("#content-navbar-menu li a").eq(m).addClass('active disabled');
                    }
                }
            }else if(mark == 'manage') {
                for (var m = 0; m < Menu.manage.length; m++) {
                	if(Menu.manage[m].url == '#'){
                		$menu.append('<li><a href="#" class="Dev" role="button">' + '<i class="fa ' + Menu.manage[m].icon + '"></i>' + Menu.manage[m].name + '</a></li>');
    				}else{
    					$menu.append('<li><a href="' + basePath + "/admin/url/" +  Menu.manage[m].url + '.shtml" role="button">' + '<i class="fa ' + Menu.manage[m].icon + '"></i>' + Menu.manage[m].name + '</a></li>');
    				}
                    
                    if (current_url.match(menu_manage_urls[m])) {
                        $("#content-navbar-menu li a").eq(m).addClass('active disabled');
                    }
                    
                }
            }
        }
    	$(document).on('click', '.Dev', function(){
	
			toastr.error('开发中，咱不能使用!');
	})

	
	
		/*全局修改确认框信息*/
		bootbox.setLocale('zh_CN');



        /*
         *  功能：侧边栏初始化
         *  Created by nocoolyoyo 2016/9/28.
         */

        loadMenu();
        renderMenu();
  
        //数组去重
        Array.prototype.duplicate = function(){
            var res = [];
            var json = {};
            for(var i = 0; i < this.length; i++){
                if(!json[this[i]]){
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }
      //差集
        Array.prototype.minus = function(a)
        { 
           var result =[];
           var clone = this;
             for(var i=0; i < clone.length; i++)
             {
                 var flag = true; 
                 for(var j=0; j < a.length; j++)
                 {   
                   if(clone[i] == a[j])   
                   flag = false;   
                 }   
               if(flag)   
               result.push(clone[i]); 
        
             }  
           return result.duplicate();   
        }
        //数组是否包含某元素
        Array.prototype.contains = function ( needle ) {
        	  for (i in this) {
        	    if (this[i] == needle) return true;
        	  }
        	  return false;
        	}
     
    });
}());
