/*
* PluginName: rollText || 垂直滚动文本
* Create By： WLHY || 蔚蓝海域
* Create Time：2015-12-06
*/

;(function($,window,document,undefined){
	//定义rollText的构造函数
	var RollText = function(el,opt){
		this.$roll = el,
		this.defaults = {
			'speed': this.$roll.attr("speed") || 30
		},
		//extend会将所有参数合并到一个对象内
		//为extend传一个空对象，防止defaults在重复调用时改变
		this.options = $.extend({},this.defaults,opt);
		if(!this.$roll.attr("status")){
			this.$roll.attr("status","stop");
		}
		this.$roll.attr("speed",this.options.speed);
		this.$header = this.$roll.find(">.roll-header");
		this.$body = this.$roll.find(">.roll-body");
		this.$mainList = this.$body.find(">.main_list");
		if(this.$body.find(".copy_list").length == 0){
			this.$copyList = $('<ul class="roll-list-group copy_list"></ul>');
			this.$body.append(this.$copyList);
		}else{
			this.$copyList = this.$body.find(">.copy_list");
		}
		if(this.$body.find(".space_list").length == 0){
			this.$spaceList = $('<ul class="roll-list-group space_list"></ul>');
			this.$body.append(this.$spaceList);
		}else{
			this.$spaceList = this.$body.find(">.space_list");
		}
	}

	//定义rollText的方法
	RollText.prototype = {
		start: function(){
			var $roll = this.$roll;
			var speed = this.options.speed;
			var rollHeader = this.$header;
			var rollBody = this.$body;
			var rollMainList = this.$mainList;
			var rollCopyList = this.$copyList;
			var rollSpaceList = this.$spaceList;
			if(rollMainList.outerHeight() > rollBody.outerHeight()){
				rollCopyList.html(rollMainList.html());
				rollSpaceList.height(rollBody.height());
				function Rolling() {
					if(rollMainList.outerHeight() > rollBody.outerHeight()){
						if(rollCopyList.outerHeight() - rollBody.scrollTop() <= 0){
							rollBody.scrollTop(rollBody.scrollTop() - rollMainList.outerHeight());
						}else{
							rollBody.scrollTop(rollBody.scrollTop()+1);
						}
						if(rollCopyList.html() != rollMainList.html()){
							rollCopyList.html(rollMainList.html());
						}
					}else{
						clearInterval(RollTextRolling);
					}
				}
				var RollTextRolling;
				if($roll.attr("status") != "rolling"){
					RollTextRolling = setInterval(Rolling, speed);
					rollBody.bind("mouseover",function(){
						clearInterval(RollTextRolling);
					});
					rollBody.bind("mouseout",function(){
						RollTextRolling = setInterval(Rolling, speed);
					});
				}
				$roll.attr("status","rolling");
			}else{
				clearInterval(RollTextRolling);
				rollBody.scrollTop(0);
				rollCopyList.html("");
				rollBody.unbind("mouseover");
				rollBody.unbind("mouseout");
				$roll.attr("status","stop");
			}
		},
		addRow: function(content){
			var rollMainList = this.$mainList;
			rollMainList.append('<li class="roll-list-group-item">'+content+'</li>');
			this.start();
		},
		delRow: function(){
			var rollMainList = this.$mainList;
			rollMainList.find(".roll-list-group-item:last").remove();
			this.start();
		}
	}

	$.fn.rollText = function(options){
		//创建rollText实体
		var rollText = new RollText(this,options);
		//调用其方法
		rollText.start();
		return rollText
	}
})(jQuery,window,document);
