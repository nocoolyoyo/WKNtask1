(function(){
    $(function() {
        var local = window.location;
        var contextPath = local.pathname.split("/")[1];
        var basePath = local.protocol+"//"+local.host+"/"+contextPath;

        //个人设置基本信息修改
        $("#submit-form1").click(function(){
            var temp = document.getElementsByName("sexOptions");
            for(var i=0;i<temp.length;i++){
                if(temp[i].checked){
                    var intHot = temp[i].value;
                }
            }

            bootbox.confirm({
                size: "small",
                message: "确认修改个人信息?",
                callback: function(result){
                    if(result == true){
                        $.ajax({
                            url: basePath + '/admin/menu/updateSecretary.shtml',
                            dataType: 'json',
                            type: 'post',
                            data: {REALNAME:$("#name").val(),SEX:intHot,POSITIONNAME:$("#position").val()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    toastr.success("修改成功！");
                                }else{
                                    toastr.error("修改失败，请联系管理人员！");
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                            }
                        });
                    }
                }
            })

        });

        //修改个人信息返回
        $("#reset").click(function(){
            window.location.href = basePath + "/admin/url/index.shtml";
        });
        //修改密码返回
        $("#reset1").click(function(){
            window.location.href = basePath + "/admin/url/index.shtml";
        });
        //提交反馈返回
        $("#reset2").click(function(){
            window.location.href = basePath + "/admin/url/index.shtml";
        });
        //修改商会返回
        $("#reset3").click(function(){
            window.location.href = basePath + "/admin/url/index.shtml";
        });

        //个人设置密码修改
        $("#submit-form4").click(function(){
            var orinPassword = $('input[name="orinPassword"]').val();
            var newPassword = $('input[name="newPassword"]').val();
            var cnewPassword = $('input[name="cnewPassword"]').val();

            if(newPassword !== cnewPassword){
                toastr.warning("两次密码输入不一致！");
            }else if(orinPassword == ""){
                toastr.warning("请输入原密码！");
            }else if(newPassword.length <= 6){
                toastr.warning("新密码长度不得少于6位数！");
            }else{
                bootbox.confirm({
                    size: "small",
                    message: "确认修改?",
                    callback: function(result){
                        if(result == true){
                            $.ajax({
                                url: basePath + '/admin/menu/updateSecretaryPwd.shtml',
                                dataType: 'json',
                                type: 'post',
                                data: {OLDPWD:orinPassword,NEWPWD:newPassword},
                                traditional: true,
                                success:function(data){
                                    if(data.status == "0"){
                                        toastr.success("修改成功！");
                                        location.reload();
                                    }else{
                                        toastr.error(data.errMsg);
                                    }
                                },
                                error: function(msg){
                                    toastr.error("操作失败，请联系管理人员！");
                                }
                            });
                        }
                    }
                })
            }


        });


        //提交问题反馈
        $("#addFeedback").click(function(){


            bootbox.confirm({
                size: "small",
                message: "确认提交?",
                callback: function(result){
                    if(result == true){
                        $.ajax({
                            url: basePath + '/admin/menu/addFeedback.shtml',
                            dataType: 'json',
                            type: 'post',
                            data: {CONTENT:$("#backContent").val()},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    toastr.success("谢谢您的反馈！");
                                    $("#backContent").val("");
                                }else{
                                    toastr.error(data.errMsg);
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                            }
                        });
                    }
                }
            })


        });

        var logUrl = "";
        //修改商会信息
        $("#form2-submit").click(function(){

            bootbox.confirm({
                size: "small",
                message: "确认修改?",
                callback: function(result){
                    if(result == true){
                        $.ajax({
                            url: basePath + '/admin/menu/updateShanghui.shtml',
                            dataType: 'json',
                            type: 'post',
                            data: {SHNAME:$("#RENAME").val(),CHAIRMANNAME:$("#chairman").val(),WEBSITE:$("#URL").val(),ADDRESS:$("#ADDRESS").val(),INTRODUCTION:$("#brief").val(),LOGOURL:logUrl},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    toastr.success("修改成功！");
                                    $("#backContent").val("");
                                }else{
                                    toastr.error(data.errMsg);
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                            }
                        });
                    }
                }
            })


        });

        //查询短信模板
        $.ajax({
            url: basePath + '/admin/menu/findSMSModel.shtml',
            dataType: 'json',
            type: 'post',
            data: {},
            traditional: true,
            success:function(data){
                if(data.status == "0"){
                    for(var i=0; i<data.list.length; i++){
                        if(data.list[i].MODELNAME == 'birthday'){
                            $("#birthday").val(data.list[i].MODELCONTENT);
                            if(data.list[i].SENTSTATUS == '0'){
                                $("#birthdayBox").attr("checked","checked");
                            }else{
                                $("#birthdayBox").removeAttr("checked");
                            }
                        }
                        if(data.list[i].MODELNAME == 'download'){
                            $("#download").val(data.list[i].MODELCONTENT);
                            if(data.list[i].SENTSTATUS == '0'){
                                $("#downloadBox").attr("checked","checked");
                            }else{
                                $("#downloadBox").removeAttr("checked");
                            }
                        }
                        if(data.list[i].MODELNAME == 'notification'){
                            $("#notification").val(data.list[i].MODELCONTENT);
                            if(data.list[i].SENTSTATUS == '0'){
                                $("#notificationBox").attr("checked","checked");
                            }else{
                                $("#notificationBox").removeAttr("checked");
                            }
                        }
                        if(data.list[i].MODELNAME == 'issignupisviewnotifiction'){
                            $("#issignupisviewnotifiction").val(data.list[i].MODELCONTENT);
                            if(data.list[i].SENTSTATUS == '0'){
                                $("#issignupisviewnotifictionBox").attr("checked","checked");
                            }else{
                                $("#issignupisviewnotifictionBox").removeAttr("checked");
                            }
                        }
                        if(data.list[i].MODELNAME == 'nosignupisviewnotifiction'){
                            $("#nosignupisviewnotifiction").val(data.list[i].MODELCONTENT);
                            if(data.list[i].SENTSTATUS == '0'){
                                $("#nosignupisviewnotifictionBox").attr("checked","checked");
                            }else{
                                $("#nosignupisviewnotifictionBox").removeAttr("checked");
                            }
                        }
                    }
                }else{
                    toastr.error(data.errMsg);
                }
            },
            error: function(msg){
                toastr.error("操作失败，请联系管理人员！");
            }
        });

        //修改短信模板信息
        $("#birthdaySave").click(function(){
            var content = $("#birthday").val();
            console.log(content);
            var checkbox = document.getElementById('birthdayBox');
            var status;
            if(checkbox.checked){
                status = 0;
            }else{
                status = 1;
            }
            save("birthday",content,status);
        });
        $("#downloadSave").click(function(){
            var content = $("#download").val();
            var checkbox = document.getElementById('downloadBox');
            var status;
            if(checkbox.checked){
                status = 0;
            }else{
                status = 1;
            }
            save("download",content,status);
        });
        $("#notificationSave").click(function(){
            var content = $("#notification").val();
            var checkbox = document.getElementById('notificationBox');
            var status;
            if(checkbox.checked){
                status = 0;
            }else{
                status = 1;
            }
            save("notification",content,status);
        });
        $("#issignupisviewnotifictionSave").click(function(){
            var content = $("#issignupisviewnotifiction").val();
            var checkbox = document.getElementById('issignupisviewnotifictionBox');
            var status;
            if(checkbox.checked){
                status = 0;
            }else{
                status = 1;
            }
            save("issignupisviewnotifiction",content,status);
        });
        $("#nosignupisviewnotifictionSave").click(function(){
            var content = $("#nosignupisviewnotifiction").val();
            var checkbox = document.getElementById('nosignupisviewnotifictionBox');
            var status;
            if(checkbox.checked){
                status = 0;
            }else{
                status = 1;
            }
            save("nosignupisviewnotifiction",content,status);
        });
        function save(modelName,modelContent,sendStatus){
            console.log(modelContent);console.log(sendStatus);


            bootbox.confirm({
                size: "small",
                message: "确认保存?",
                callback: function(result){
                    if(result == true){
                        $.ajax({
                            url: basePath + '/admin/menu/updateSMSModel.shtml',
                            dataType: 'json',
                            type: 'post',
                            data: {MODELCONTENT:modelContent,SENTSTATUS:sendStatus,MODELNAME:modelName},
                            traditional: true,
                            success:function(data){
                                if(data.status == "0"){
                                    toastr.success("保存成功！");
                                }else{
                                    toastr.error("保存失败，请联系管理人员！");
                                }
                            },
                            error: function(msg){
                                toastr.error("操作失败，请联系管理人员！");
                            }
                        });
                    }
                }
            })


        }

        $("#upLoadImg").on("change", function(){
       
       	
        	var max_size=1024*1024;
      
           if($(this).context.files[0].size > max_size){   
        	   return toastr.warning("请选择小于1M的图片！");;
           }	
            ajaxfileup();
            
        });
        //增加上传图片
        function ajaxfileup(){
            var form = document.getElementById("form2");
            //截取提交上传文件的扩展名
           
            var ext = form.upLoadImg.value.match(/^(.*)(\.)(.{1,8})$/)[3];
            ext = ext.toLowerCase(); //设置允许上传文件的扩展名
            if (ext !=  "jpg" && ext != "gif" && ext!="png") {
                toastr.warning("只允许上传 .jpg或gif 或png文件，请重新选择需要上传的文件！");
                return false;
            }
            
   
     
           /* if (FileUpload1.FileContent.Length > 1024*1024)
            {
                Response.Write("<script>alert('文件大于1M，请重新上传');</script>");
                return ;
            }*/
            console.log(form.upLoadImg)
     
          
            $.ajaxFileUpload({
                url: basePath+'/admin/upload.shtml?savePath=initImage',
                secureuri: false, //一般设置为false
                fileElementId: 'upLoadImg', // 上传文件的id、name属性名
                dataType: 'json', //返回值类型，一般设置为json、application/json
                type : 'post',
                contentType: "application/json; charset=utf-8",//此处不能省略
                success: function(data, status){
                    if (data.status=="0") {
                        logUrl = data.url;
//                        original = data.original;
                        $(".reveal-show").attr("src",logUrl);
                        console.log(form.upLoadImg)
                        $("#upLoadImg").on("change", function(){
                            ajaxfileup();
                        });
                    }
                },
                error: function(data, status, e){
                    toastr.error(e);
                }
            });
        }

    });
}());


