window.onload = function() {
    setTitle();
    $.ajax({
        url: 'getSchedule.action',
        type: 'POST',
        dataType: 'json',
        success: function (result) {
            var Schedules = result;
            window.Schedules = Schedules;
            apendChild(Schedules);
        }
    });


}

// 鍟嗕細瀛椾綋鑷姩缂╂斁
function setTitle(){
    var title_num=$(".assn-name").text().length;
    if(title_num<25){
        //$(".assn-name").css("font-size","24px");
        return;
    }else if(title_num<=27){
        $(".assn-name").css("font-size","22px");
    }else if(title_num<=30){
        $(".assn-name").css("font-size","20px");
    }else if(title_num<=33){
        $(".assn-name").css("font-size","18px");
    }else {
        $(".assn-name").css("font-size","16px");
    }
}

function onload2(){

    $.post("getSchedules2.html", null, function(data) {
        var Schedules = data.table;
        window.Schedules = Schedules;
        //alert(Schedules);
        apendChild(Schedules);
    });
}

function updateShedule(){

    window.Schedules[window.selectScheduleId] = window.selectSchedule;
    apendChild(window.Schedules);

}

function deleteSchedule(obj,belongid){
    //alert(belongid);
    //alert(obj.id);
    //location ="deleteSchedule.action?tablename="+obj.id+"&belongid="+belongid;
    var tn = obj.id;
    var belongid = belongid;
    $.ajax({
        url: "deleteSchedule.action",
        type: 'POST',
        data: {
            "tablename":tn,
            "belongid":belongid
        },
        dataType: 'html',
        success: function (result) {
            if(result == "success"){
                alert("鍒犻櫎鎴愬姛!");
            }

        },
        error:function(){
        }
    });
    $(obj).parent().parent().remove();
}

function apendChild(Schedules) {
    $("#tableSchedule").empty();
    for ( var i = 0; i < Schedules.length; i++) {
        if(i==6){
            break;
        }

        var date = new Date(Schedules[i].datestart);

        // var dateStr = date.format('MM-dd HH:mm');
        var dateStr = Schedules[i].datestart.stringToDate();
//		alert(dateStr);
//		var[] datearr = dateStr.spilt(" ");
//		alert(datearr[0]);
        var child = "<tr id='"
            + i
            + "' name='table_child'>"
            //	+ "<td class='schedule-title'><a href='javascript:void(0);' onclick='schedule_click(this);' >"
            + "<td class='schedule-title'><a href='"+Schedules[i].method+Schedules[i].belongid+"' >"
            + Schedules[i].title
            + "</a>"
            + "</td><td >"
            + dateStr
            + "</td><td><div style='color: #2EADE2;cursor:pointer;' id='"+Schedules[i].tablename+"' onclick='deleteSchedule(this,"+Schedules[i].belongid+");' >鍒犻櫎</div></td></tr>"

        $("#tableSchedule").append(child);

    }

}

//Date 瑙ｆ瀽鎴� 瀛楃涓�
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "H+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
        "S" : this.getMilliseconds()
        //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
//
String.prototype.stringToDate = function(){

    var fullDate = this.split(" ")[0].split("-");

    var fullTime = this.split(" ")[1].split(":");

    var retstr = fullDate[1]+"-"+fullDate[2]+" "+fullTime[1]+":"+fullTime[2];
    return retstr;
    // return new Date(null,fullDate[1]-1, fullDate[2], (fullTime[0] != null ? fullTime[0] : 0), (fullTime[1] != null ? fullTime[1] : 0), (fullTime[2] != null ? fullTime[2] : 0));

}
