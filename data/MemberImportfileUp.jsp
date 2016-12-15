<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.wkt.system.Uploader" %>
<%@page import="net.sf.json.JSONArray" %>
<%@page import="java.util.HashMap" %>
<%@ page import="java.net.URLDecoder" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/json");
    Uploader up = new Uploader(request);
    up.setSavePath("/upload/file"); //保存路径
    String[] fileType = {".xlsx",".xls"};  //允许的文件类型
    up.setAllowFiles(fileType);
    up.setMaxSize(10000);        //允许的文件最大尺寸，单位KB
    up.upload();
    
    Map<String, Object> values = new HashMap<String, Object>();
    values.put("url", up.getRealUrl());
    values.put("state", up.getState());
    JSONArray jo = JSONArray.fromObject(values);
	response.getWriter().print(jo.toString());
%>
<!DOCTYPE html>
<html lang="zh_cn">
    <head>
    	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    	<script src="<%=basePath%>js/public/jquery-1.12.4.min.js"></script>
	</head>
<body>

<input type="hidden" id="url" value="<%=up.getRealUrl() %>"/>
<input type="hidden" id="state" value="<%=up.getState() %>"/>
<script type="text/javascript">

var url = document.getElementById("url").value;
var state = document.getElementById("state").value;
if("SUCCESS"==state){
   $.ajax({
            type:'POST',
            url: "<%=basePath%>admin/member/importExcel.shtml",
		    data:{"url":url},
		    dataType:'html',
            success: function (data){
		    	//hideShade();
				
				//window.location.href="<%=basePath%>admin/url/occupation.shtml";
				alert("导入成功");
            },
            error: function(msg){
            alert(msg);
            	hideShade();
                alert("请求失败,请联系系统管理员");
            }
        });	
}else{
   alert(state);
   history.back();
};
function hideShade(){
	/*window.parent.document.getElementById('showProgressBar').style.display='none';
	window.parent.document.getElementById('showProgressBar').style.visibility='hidden';
	window.parent.document.getElementById('bgProgressBar').style.display='none';
	window.parent.document.getElementById('submitingData').style.visibility='hidden';*/
}
</script>
</body>
</html>