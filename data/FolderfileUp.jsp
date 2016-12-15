<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.wkt.system.Uploader" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	request.setCharacterEncoding("utf-8");
    response.setCharacterEncoding("utf-8");
	String isCoverExistAccount = request.getParameter("isCoverExistAccount");
    response.setContentType("text/html");
	String folderid = request.getParameter("folderid");
	Uploader up = new Uploader(request);
    up.setSavePath("/upload/file/" + folderid); //保存路径
    String[] fileType = {".rar" , ".doc" , ".docx" , ".zip" , ".pdf" , ".swf", ".wmv", ".xls",".xlsx",".ppt",".pptx"};  //允许的文件类型
    up.setAllowFiles(fileType);
    up.setMaxSize(10000);        //允许的文件最大尺寸，单位KB
    up.upload();
%>
<!DOCTYPE html>
<html lang="zh_cn">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
    	<script src="<%=basePath%>js/public/jquery-1.12.4.min.js"></script>
	</head>
<body>
<input type="hidden" id="url" value="<%=up.getUrl() %>"/>
<input type="hidden" id="fileType" value="<%=up.getType() %>"/>
<input type="hidden" id="state" value="<%=up.getState() %>"/>
<input type="hidden" id="original" value="<%=up.getOriginalName() %>"/>
<input type="hidden" id="folderid" value="<%=folderid %>"/>
<input type="hidden" id="filesize" value="<%=up.getSize() %>"/>
<script type="text/javascript">
var url = document.getElementById("url").value;
var state = document.getElementById("state").value;
var original = document.getElementById("original").value;
var folderid = document.getElementById("folderid").value;
var filesize = document.getElementById("filesize").value;
if("SUCCESS"==state){
   $.ajax({
            type:'POST',
            url: "<%=basePath%>admin/filemanage/folder/file/insert.shtml",
		    data:{"ATTACHMENT":url,"state":state,"FILENAME":original,"FOLDERID":folderid,"FILESIZE":filesize},
		    dataType:'json',
            success: function (data){
            	if(data.STATUS =="0"){
            		alert("上传成功");
    				window.location.href="<%=basePath%>admin/url/folder.shtml";
            	}else{
            		alert("上传失败");
            	}
            },
            error: function(msg){
                alert("请求失败,请联系系统管理员");
            }
        });	
}else{
   alert(state);
   history.back();
}
function hideShade(){
	/*window.parent.document.getElementById('showProgressBar').style.display='none';
	window.parent.document.getElementById('showProgressBar').style.visibility='hidden';
	window.parent.document.getElementById('bgProgressBar').style.display='none';
	window.parent.document.getElementById('submitingData').style.visibility='hidden';*/
}
</script>
</body>
</html>