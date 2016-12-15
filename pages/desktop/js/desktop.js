
function desktop(){
		$('#preloader-container').fadeOut('normal', function(){$('#page-container').fadeIn()});
		
		
		/*
		 *  功能：桌面菜单内容填充
		 *  页面：index.html
		 *  Created by nocoolyoyo 2016/9/25.
		 */
		var local = window.location;
		var contextPath = local.pathname.split("/")[1];
		var basePath = local.protocol+"//"+local.host+"/"+contextPath;

		var $board_daily = $("#board ul:eq(0)");
		var $board_manage = $("#board ul:eq(1)");
		/*
		 *原桌面页面函数
		 **/
		index();
		function index(){
			 	text();
			    bootbox.setLocale('zh_CN');
			    /*
			     *  功能：备忘录弹出事件
			     *  页面：*
			     *  Created by nocoolyoyo 2016/9/29.
			     */
			    function showBacklogDetail(memorId,name) {
			        $("textarea").val("");
			        $("#edit-textarea").val(name);
			        $("#memorid").val(memorId);
			    }
			    function text(){
			        $.ajax({
			            url: basePath + '/admin/todo/findMemor.shtml',
			            type:'post',
			            dataType:'json',
			            success:function(ret){
			                if(ret.STATUS =="0"){
			                    var name="";
			                    for (var int = 0; int < ret.ACTIVITY.length; int++) {
			                        name +="<tr><th  style='display:none;'>"+ret.ACTIVITY[int].MEMORID+"</th>"
			                                +"<th class='backlog-th-content'><a href='#' onclick='javascript:showBacklogDetail( "+ret.ACTIVITY[int].MEMORID+",\""+ret.ACTIVITY[int].CONTENT+"\");' data-toggle='modal' data-target='#backlog-edit-modal'>"+ret.ACTIVITY[int].CONTENT+"</a></th>"
			                                +"<th class='backlog-th-button'><button type='button' class='backlog-delete button button-raised button-caution button-circle button-tiny right'  onclick='deleteBacklog("+ret.ACTIVITY[int].MEMORID+",this)'><i class='fa fa-minus'></i></button></th></tr>";
			                    }
			                    $("#todo").html(name);
			                }
			            }
			        });
			    }

			   
			    /*
			     *保存
			     */
			    $('#backlog-add').click(function(){
			        $("#add-textarea").val('')
			    });
			    $('#note-save').click(function(){
			        if($("#edit-textarea").val() == ""){
			            toastr.warning('备忘录不能为空！')
			        }else{
			            savememor($("#edit-textarea").val(),$("#memorid").val());
			            $('#backlog-modal').modal('hide');
			        }
			    })
			    $('#note-new').click(function(){
			        if($("#add-textarea").val() == ""){
			            toastr.warning('备忘录不能为空！')
			        }else{
			            saveNewNote($("#add-textarea").val());
			            $('#backlog-modal').modal('hide');
			        }
			    })
			    $(document).on('click','.backlog-delete',function(){
			    	console.log(11)
			    })
			    

			    function saveNewNote(name){
			        $.ajax({
			            url: basePath + '/admin/todo/addMemor.shtml?CONTENT='+name,
			            type:'post',
			            dataType:'json',
			            success:function(ret){
			                if(ret.STATUS =="0"){
			                    //alert("新增成功!");
			                    toastr.options = {
			                        "positionClass": "toast-bottom-center",
			                        "timeOut": "2000",
			                    }
			                    toastr.success("新增成功!");
			                    $('#backlog-add-modal').modal('hide');
			                    text();
			                }
			            }
			        });
			    }


			    function savememor(name,id){

			        $.ajax({
			            url: basePath + '/admin/todo/updateMemor.shtml?CONTENT='+name+'&MEMORID='+id,
			            type:'post',
			            dataType:'json',
			            success:function(ret){
			                if(ret.STATUS =="0"){
			                    //alert("修改成功!");
			                    toastr.options = {
			                        "positionClass": "toast-bottom-center",
			                        "timeOut": "2000",
			                    }
			                    toastr.success("修改成功!");
			                    $('#backlog-edit-modal').modal('hide');

			                    text();
			                }
			            }
			        });

			    }


			    /*
			     *  功能：备忘录删除
			     *  页面：*
			     *  Created by nocoolyoyo 2016/9/29.
			     */
			    function deleteBacklog(memorId,tr) {
			        bootbox.confirm({
			            size: "small",
			            title: "操作",
			            className: "center", 
			     		  message: "确认删除?", 
				       	    buttons: {
				       	    	cancel: {
				       	            label: '取消',
				       	            className: 'btn-default left-mg-10 right'
				       	        },
				       	        confirm: {
				       	            label: '确定',
				       	            className: 'btn-primary '
				       	        }
				       	        
				       	    },
			           
			            callback: function(result){
			                if(result == true){
			                    $.ajax({
			                        url: basePath + '/admin/todo/deleteMemor.shtml?MEMORID='+memorId,
			                        type:'post',
			                        dataType:'json',
			                        success:function(ret){
			                            if(ret.STATUS =="0"){
			                                //alert("删除成功!");
			                                toastr.options = {
			                                    "positionClass": "toast-bottom-center",
			                                    "timeOut": "2000",
			                                }
			                                toastr.success("删除成功!");
			                                $(tr).parent().parent().remove();
			                            }
			                        }
			                    });

			                }
			            }
			        })

			    }

			    //祝福
			    function blessingSMS(usid){

			        bootbox.confirm({
			            size: "small",
			            title: "操作",
			            className: "center",
			            message: "确认祝福?",
			            callback: function(result){
			                if(result == true){
			                    $.ajax({
			                        url:  basePath + '/admin/menu/blessingSMS.shtml',
			                        dataType: 'json',
			                        type: 'post',
			                        data:{
			                            "USID":usid
			                        },
			                        success:function(data){
			                            if(data.status != "0"){
			                                toastr.options = {
			                                    "positionClass": "toast-bottom-center",
			                                    "timeOut": "2000",
			                                }
			                                toastr.error(data.errMsg);
			                                //alert("祝福失败");
			                            }else{
			                                toastr.options = {
			                                    "positionClass": "toast-bottom-center",
			                                    "timeOut": "2000",
			                                }
			                                toastr.success("祝福成功!");
			                                //alert("祝福成功");
			                            }
			                            return;
			                        },
			                        error: function(msg){
			                            toastr.options = {
			                                "positionClass": "toast-bottom-center",
			                                "timeOut": "2000",
			                            }
			                            toastr.error("祝福失败!");
			                            //alert("祝福失败");
			                        }
			                    });

			                }
			            }
			        });


			    }
		}
		

		//菜单填充渲染
		function loadRenderBoard(){
			for (var i = 0; i < Menu.daily.length; i++) {
				$board_daily.append('<li class="col-xs-3 col-sm-3"><a href="'+ basePath + "/admin/url/" + Menu.daily[i].url + '.shtml" role="button">' + '<span class="desktop-link"><i class="fa ' + Menu.daily[i].icon + '"></i>' + Menu.daily[i].name + '</span></a></li>');
			}
			for (var j = 0; j < Menu.manage.length; j++) {
				if(Menu.manage[j].url == '#'){
					$board_manage.append('<li class="col-xs-3 col-sm-3"><a href="#" class="Dev" role="button">' + '<span class="desktop-link"><i class="fa ' + Menu.manage[j].icon + '"></i>' + Menu.manage[j].name + '</span></a></li>');
				}else{
					$board_manage.append('<li class="col-xs-3 col-sm-3"><a href="' + basePath+"/admin/url/" + Menu.manage[j].url + '.shtml" role="button">' + '<span class="desktop-link"><i class="fa ' + Menu.manage[j].icon + '"></i>' + Menu.manage[j].name + '</span></a></li>');
				}		
			}
		}
		toastr.options = {
				  "positionClass": "toast-bottom-center",
				  "timeOut": "2000",
				}
		$(document).on('click', '.Dev', function(){
				
				toastr.error('开发中，咱不能使用!');
		})



		//添加桌面图标徽章
		function addBadge(){
			$.ajax({
				url: basePath+'/admin/menu/findSupplyCount.shtml',
				dataType: 'json',
				type: 'post',
				data:{},
				success:function(data){
					if(data.status == "0"){
						var length = data.list.length;
						if(length != 0){
							var badge = '<span class="desktop-badge badge">'+length+'</span>';
							$(document).find('.fa-cubes').append(badge)
						}
					}
				},
				error: function(msg){
				
						toastr.error("请求失败,请联系系统管理员!");
					//alert("请求失败,请联系系统管理员!");
				}
			});
		}
		//加载问题反馈小红点
		function addwtfkcount(){
			$.ajax({
				url: basePath+'/admin/question/questionCount.shtml',
				dataType: 'json',
				type: 'post',
				data:{},
				success:function(data){
					if(data.STATUS == "0"){
						var length = data.COUNT;
						if(length != 0){
							var badge = '<span class="desktop-badge badge">'+length+'</span>';
							$(document).find('.fa-comment').append(badge);
						}
					}
				},
				error: function(msg){
				
						toastr.error("请求失败,请联系系统管理员!");
					//alert("请求失败,请联系系统管理员!");
				}
			});
		}
		loadRenderBoard();
		addBadge();
		addwtfkcount();

		/*
		 *  功能：生日日期获取
		 *  页面：*
		 *  Created by nocoolyoyo 2016/9/28.
		 */

		function todayDate(){
			var mydate = new Date();
			var todayDate = "" + mydate.getFullYear() + "/";
			todayDate += (mydate.getMonth()+1) + "/";
			todayDate += mydate.getDate();
			return todayDate;
		}
		console.log(todayDate());
		$(document).on("click", ".mh-on", function(){
			var clickDate = $(this).attr('date');
			console.log(clickDate);
			return clickDate;
		});

		/**todayDate是当前日期值， clickDate是点击得到的日期值**/



		/*
		 *  功能：生日页面点击发送短信确认事件
		 *  页面：*
		 *  Created by nocoolyoyo 2016/9/29.
		 */
		var $birthday_bless = $('.birthday-bless');
		//$birthday_bless.popover({
		//html: true
		//});


		$(document).on("click", "#birthday-bless-sure", function(){
			$birthday_bless.popover('hide');

			/****点击确定发送短信后执行***/
		});
		$(document).on("click", "#birthday-bless-cancel", function(){
			$birthday_bless.popover('hide');
			/****点击取消隐藏***/
		});

		// $birthday_bless_sure.on('click', function () {
		//     console.log('sure');
		// });

		/*
		 *  功能：生日页面弹出事件
		 *  页面：*
		 *  Created by nocoolyoyo 2016/9/29.
		 */
		function showAllBirthday(birthday) {
			$.ajax({
				url: basePath+'/admin/menu/birthdayMember.shtml',
				dataType: 'json',
				type: 'post',
				data:{
					"BIRTHDAY":birthday
				},
				success:function(data){
					if(data.status == "0"){
						var li = "";
						var length = data.list.length;
						for(var i=0; i<length; i++){
							//li +=	"<li>成某某<a href=\"#\" class=\"birthday-bless\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" title=\"<p class='center'>确定？</p>\" data-content=\"<button class='birthday-bless-sure btn button button-primary button-rounded'>是的</button><button id='birthday-bless-cancel' class='btn button button-rounded'>取消</button>\"><i class=\"fa fa-birthday-cake\"></i></a></li>";
							li += "<li class='list-group-item'>"+data.list[i].REALNAME +"<a href='javascript:blessingSMS("+data.list[i].USID+")' class='birthday-bless'><i class='fa fa-birthday-cake'></i></a></li>";
						}
						$("#birthday-modal-body").html(li);
						return;
					}
				},
				error: function(msg){
					$("#birthday-modal-body").html("错误");
				}
			});
		}
		var birthday;
		function todayDate(){
			var mydate = new Date();
			var todayDate = "" + mydate.getFullYear() + "/";
			todayDate += (mydate.getMonth()+1) + "/";
			todayDate += mydate.getDate();
			return todayDate;
		}
		console.log(todayDate());
		birthday = todayDate();
		$(document).on("click", ".mh-on", function(){
			console.log($(this).attr('date'));
			birthday = $(this).attr('date');
			birthdayMember($(this).attr('date'));//首页生日列表
			$('#birthday-modal').on('show.bs.modal', showAllBirthday(birthday));//更多生日列表
		});
		birthdayMember(todayDate());//首页生日列表
		$('#birthday-modal').on('show.bs.modal', showAllBirthday(birthday));//更多生日列表

		function birthdayMember(birthday){
			$.ajax({
				url: basePath+'/admin/menu/birthdayMember.shtml',
				dataType: 'json',
				type: 'post',
				data:{
					"BIRTHDAY":birthday
				},
				success:function(data){
					if(data.status == "0"){
						var li = "";
						var length = data.list.length;
						if(length>3){
							length = 3;
						}
						for(var i=0; i<length; i++){
							li += "<li>"+data.list[i].REALNAME +"<a href='javascript:blessingSMS("+data.list[i].USID+")' class='birthday-bless'><i class='fa fa-birthday-cake'></i></a></li>"
						}
						if(data.list.length > 3){
							li += "<li class='center'><a href='#' class='birthday-more' data-toggle='modal' data-target='#birthday-modal'>查看更多</a></li>"
						}
						$("#birthday-list").html(li);
						return;
					}
				},
				error: function(msg){
					$("#birthday-list").html("错误");
					$("#login-message").css("color","red");
				}
			});
		}
}
desktop();