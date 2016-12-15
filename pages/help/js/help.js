(function() {
	$(function(){
		/*
		 *  功能：导入问答数据
		 *  页面：header.jsp
		 *  Created by nocoolyoyo 2016/11/13.
		 */
		var local = window.location;
    	var contextPath = local.pathname.split("/")[1];
    	var basePath = local.protocol+"//"+local.host+"/"+contextPath;
    	
    	var $list = $('#help-list');
		var listContent = "";
		for (var i=0; i<helpData.list.length; i++){	
			listContent +='<li style="display:block; margin:10px auto">'+
						  '<span class="label label-danger label-tag" style="font-size:14px">问</span><span style="margin-left:10px">'+(i+1)+'.' + helpData.list[i].question +'?'+ '</span>'+
						  '</li>'+
						  '<li style="display:block; margin:10px auto">'+
						  '<span class="label label-success label-tag" style="font-size:14px">答</span><span style="margin-left:10px">' + helpData.list[i].answer +  '</span>'+
						  '</li>';	
			}
		$list.html(listContent);
	});
}());
