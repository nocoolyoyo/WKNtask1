window.onload = function() {
    window.rili = new RiLi();
}
var BirthdayPageSize = 5; // “今天生日”能显示的最大条数

function RiLi() {
    this.dicBirthday = {};
    InitialNongLi();
    this.monthNames = 'January,February,March,April,May,June,July,August,September,October,November,December'
        .split(',');
    /*this.monthNames = '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月'
     .split(',');*/
    this.theDate = new Date(Today.valueOf());
    this.selectedDate = new Date(this.theDate.valueOf());
    this.bind(this.theDate);
}
RiLi.tdOnDoubleClick = function() {
    var rowIndex = this.parentNode.rowIndex;
    var day = parseInt($.trim(this.innerHTML));
    var isGray = this.className.indexOf('gray') >= 0;
    var d = new Date(rili.theDate.valueOf());
    if (isGray) {
        if (rowIndex == 0) {
            d.setMonth(d.getMonth() - 1);
        } else {
            d.setMonth(d.getMonth() + 1);
        }
    }
    d.setDate(day);
    //alert(d +" .... "+rili.theDate);
    if(d>=window.theDate){
//		addSchedule(this, d, this.guid);
    }
}
RiLi.tdOnclick = function() {
    var rowIndex = this.parentNode.rowIndex;
    var day = parseInt($.trim(this.innerHTML));
    var isGray = this.className.indexOf('gray') >= 0;
    var d = new Date(rili.theDate.valueOf());
    if (isGray) {
        d.setDate(1);
        if (rowIndex == 0) {
            d.setMonth(d.getMonth() - 1);
        } else {
            d.setMonth(d.getMonth() + 1);
        }
    }
    d.setDate(day);
    //
    rili.dateNumber = day;
    rili.selectedDate = new Date(d.valueOf());
    var oldCell = $('.selected-td')[0];
    $(oldCell).removeClass('selected-td');
    $(this).addClass('selected-td');

    var divTodaySolar = $(".today-solar")[0];
    divTodaySolar.innerHTML = d.ToString('yyyy-MM-dd w')
    rili.bindNongLi(d);
    // 生日   会员
    rili.getBirthday();
}
RiLi.prototype.addMonth = function(value) {
    if (value == 0) {
        this.theDate = new Date();
    } else {
        this.theDate.setDate(1);
        this.theDate.setMonth(this.theDate.getMonth() + value);
        var month = this.theDate.getMonth();
        this.theDate.setDate(this.dateNumber);
        if (month != this.theDate.getMonth()) {
            this.theDate.setDate(0)
        }
    }
    this.selectedDate = new Date(this.theDate.valueOf());
    this.bind();
}
RiLi.prototype.bindNongLi = function(d) {
    divMonthLunar = $(".month-lunar")[0];
    divDayLunar = $(".day-lunar")[0];
    var lunar = this.nongLi(d);
    divMonthLunar.innerHTML = "农历 " + lunar.m;
    divDayLunar.innerHTML = lunar.d;
}
RiLi.prototype.forSchedule = function(data) {
    //alert("data2 :" + data);
    if (data == null) {
        return;
    }
    //data = JSON.parse(data);
    data.index = 0;
    RiLi.table = data;
    var table = $(".table-list")[0];
    var rows = table.rows;
    //var rows = table;

    var d = new Date(window.rili.theDate.valueOf());
    d.setDate(1);
    d.setDate(-d.getDay() + 1);
    for ( var i = 0; i < 6; i++) {
        /*if (i == 5 && rows[i].className.indexOf('line-6') == -1) {  如果日历最后一行没显示出来			break;
         }*/
        for ( var j = 0; j < 7; j++) {
            var cell = rows[i].cells[j];
            //alert("cell : "+cell.toString());
            if (window.rili.inPlan(d, cell)) {
                if (cell.className.indexOf('today-td') > -1) {
                    $(cell).addClass('plan2');
                } else {
                    $(cell).addClass('plan');
                }
            }
            d.setDate(d.getDate() + 1);
        }
    }
}
RiLi.prototype.getBirthday = function() {
    var key = this.selectedDate.ToString('yyyy-MM-dd');

    this.forBirthday(key);
    /*if (this.dicBirthday[key] == null) {
     // 生日
     // CN80s.Assn.Admin.Ajax.AjaxMember.GetTodayBirthday(key, function (data) { rili.forBirthday(key, data); });

     $
     .post(
     "getTodayBirthday.html",
     {
     date : key
     },
     function(data) {

     if (typeof JSON == 'undefined') { 如果浏览器不支持 JSON   导入 json2.js 文件
     $('head')
     .append(
     $("<script type='text/javascript' src='${pageContext.request.contextPath}/js/json2.js'>"));
     }
     rili.forBirthday(key, data);
     });

     } else {
     this.forBirthday(key, this.dicBirthday[key]);
     }*/
}
RiLi.prototype.forBirthday = function(key) {
    var temp;
    var divBirthdayList = document.getElementById("birthdayList");
    var arr = [];
    var arr1 = [];
    var arrId = "";
    $.ajax({
        url: 'queryMemberByBirthday.action',
        type: 'POST',
        data: {'key':key},
        dataType: 'json',
        success: function (result) {
            for(var i=0;i<result.length;i++){
                arr1.push(result[i].realname);
                arrId = arrId + result[i].usid + ",";
            }
            for(var i=0;i<result.length;i++){

                if(i==4){ arrId = arrId.substring(0,arrId.length - 1);
                    temp = '<a target="_top" id="'+arr1+'" onclick="window.parent.showMemberMore(this.id, \''+arrId+'\');" >更多会员生日&gt;&gt;</a>'
                    arr.push(temp);
                    break;
                }else{
                    temp = '\
               		<div class="item" id="item{1}">\
               		    <span class="name" style="color:red;">'+result[i].realname+'</span>\
               		    <a href="javascript:;" onclick="ToSmsSend(this,\''+result[i].usid+'\' ,\'{2}\');">祝福</a>\
               		</div>\
               		';
                    arr.push(temp);

                }
            }
            divBirthdayList.innerHTML = arr.join("");
        },
        error:function(){
        }
    });
}

RiLi.prototype.bind = function () {
    this.dateNumber = this.theDate.getDate();
    this.theDate.setHours(0, 0, 0, 0);
    //
    var today = new Date(this.theDate.valueOf());
    var table = $(".table-list")[0];
    var divTodaySolar = $(".today-solar")[0];
    var divMonthSolar = $(".month-solar .content")[0];
    var boxLeft = $(".box-left")[0];
    //
    divTodaySolar.innerHTML = today.ToString('yyyy-MM-dd w')
    divMonthSolar.innerHTML = this.monthNames[today.getMonth()] + " " + today.getFullYear();
    //
    this.bindNongLi();
    //
    var d = new Date(today.valueOf());
    d.setDate(1);
    d.setDate(-d.getDay() + 1);
    //
    var d2 = new Date(d.valueOf());
    d2.setDate(d2.getDate() + 35);
    var is6Rows = d2.getMonth() == today.getMonth();
    var rowsCount = 5;
    if (is6Rows) {
        rowsCount = 6
        $(boxLeft).addClass("line-6");
    } else {
        $(boxLeft).removeClass("line-6");
    }
    //
    var rows = table.rows;
    for (var i = 0; i < rowsCount; i++) {
        for (var j = 0; j < 7; j++) {
            var cell = rows[i].cells[j];
            if (RiLi.firstBind != false) {
                cell.className0 = cell.className;
            }
            cell.ondblclick = RiLi.tdOnDoubleClick;
            cell.onclick = RiLi.tdOnclick;
            cell.className = cell.className0;
            cell.innerHTML = d.getDate();
            if (today.getMonth() == d.getMonth()) {
                if (Today.valueOf() == d.valueOf()) {
                    $(cell).addClass('today-td');
                }
                if (today.valueOf() == d.valueOf()) {
                    $(cell).addClass('selected-td');
                }
            } else {
                $(cell).addClass('gray');
            }
            //
            d.setDate(d.getDate() + 1);
        }
    }
    RiLi.firstBind = false;
    // 取得 当月日历可见天数 日程安排      暂时先注释掉
    // CN80s.Assn.Admin.Ajax.AjaxSchedule.GetSchedule(this.theDate.ToString('yyyy-MM-dd'), this.forSchedule);
    /*  $.post("getSchedules.html",{date : this.theDate.ToString('yyyy-MM-dd')},function(data) {
     data = data.table;
     //alert("data :"+data);
     window.rili.forSchedule(data);
     });*/


    // 生日   会员
    this.getBirthday();
}
RiLi.prototype.inPlan = function (d, cell) {
    var table = RiLi.table;
    if (table == null) {
        return false;
    }
    var arr = table.arr;
    if (arr == null) {
        arr = [];
        for (var i = 0; i < table.length; i++) {
            var date = new Date(table[i].DateStart.time.valueOf());
            // alert(table[i].DateStart.time.valueOf());
            date.setHours(0, 0, 0, 0);
            if (i > 0 && arr[arr.length - 1].valueOf() == date.valueOf()) {
                continue;
            }
            arr.push(date);
        }
        arr.index = 0;
        table.arr = arr;
    }
    // alert(" arr[arr.index].valueOf() : "+ arr[arr.index].valueOf());
    // alert("d.valueOf() : "+d.valueOf());
    if (arr.index < arr.length && arr[arr.index].valueOf() == d.valueOf()) {
        cell.guid = table[arr.index].ScheduleGuid;
        arr.index++;
        return true;
    }
    cell.guid = null;
    return false;
}

function InitialNongLi() {
    if (InitialNongLi.isComplete) {
        return;
    }
    InitialNongLi.isComplete = true;
    //阴历的大小月、闰月，始于1900
    var lunarInfo = new Array(
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0)
    //阳历的大小月
    var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    //天干
    var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    //地支
    var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    //生肖
    var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
    //气节
    var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至")
    //节气时间
    var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758)
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
    var nStr2 = new Array('初', '十', '廿', '卅', '　')
    var monthName = new Array("1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月");
    var lunarName = "正二三四五六七八九十冬腊";

    //国历节日 *表示放假日
    var sFtv = new Array(
        "0101*元旦",
        "0214 情人节",
        "0308 妇女节",
        "0312 植树节",
        "0315 消费者权益日",
        "0401 愚人节",
        "0402 自闭症日",
        "0501 劳动节",
        "0504 青年节",
        "0512 护士节",
        "0601 儿童节",
        "0701 香港回归纪念",
        "0801 建军节",
        "0808 父亲节",
        "0910 教师节",
        "1001*国庆节",
        "1201 艾滋病日",
        "1220 澳门回归纪念",
        "1225 圣诞节"
    )

    //农历节日 *表示放假日
    var lFtv = new Array(
        "0101*春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕情人节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "0100*除夕")

    //某月的第几个星期几
    var wFtv = new Array(
        "0520 母亲节",
        "0630 父亲节"
    )

    /*****************************************************************************
     日期计算
     *****************************************************************************/

    //====================================== 传回农历 y年的总天数
    function lYearDays(y) {
        var i, sum = 348
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0
        return (sum + leapDays(y))
    }

    //====================================== 传回农历 y年闰月的天数
    function leapDays(y) {
        if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
        else return (0)
    }

    //====================================== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
    function leapMonth(y) {
        return (lunarInfo[y - 1900] & 0xf)
    }

    //====================================== 传回农历 y年m月的总天数
    function monthDays(y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
    }

    //====================================== 算出农历, 传入日期物件, 传回农历日期物件
    //                                       该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
    function Lunar(objDate) {

        var i, leap = 0, temp = 0
        var baseDate = new Date(1900, 0, 31)
        var offset = (objDate - baseDate) / 86400000

        this.dayCyl = offset + 40
        this.monCyl = 14

        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i)
            offset -= temp
            this.monCyl += 12
        }

        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12
        }

        this.year = i
        this.yearCyl = i - 1864

        leap = leapMonth(i) //闰哪个月
        this.isLeap = false

        for (i = 1; i < 13 && offset > 0; i++) {
            //闰月
            if (leap > 0 && i == (leap + 1) && this.isLeap == false)
            { --i; this.isLeap = true; temp = leapDays(this.year); }
            else
            { temp = monthDays(this.year, i); }

            //解除闰月
            if (this.isLeap == true && i == (leap + 1)) this.isLeap = false

            offset -= temp
            if (this.isLeap == false) this.monCyl++
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap)
            { this.isLeap = false; }
            else
            { this.isLeap = true; --i; --this.monCyl; }

        if (offset < 0) { offset += temp; --i; --this.monCyl; }

        this.month = i
        this.day = offset + 1
    }

    //==============================传回国历 y年某m+1月的天数
    function solarDays(y, m) {
        if (m == 1)
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28)
        else
            return (solarMonth[m])
    }
    //============================== 传入 offset 传回干支, 0=甲子
    function cyclical(num) {
        return (Gan[num % 10] + Zhi[num % 12])
    }

    //============================== 月历属性
    function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {

        this.isToday = false;
        //国历
        this.sYear = sYear;
        this.sMonth = sMonth;
        this.sDay = sDay;
        this.week = week;
        //农历
        this.lYear = lYear;
        this.lMonth = lMonth;
        this.lDay = lDay;
        this.isLeap = isLeap;
        //干支
        this.cYear = cYear;
        this.cMonth = cMonth;
        this.cDay = cDay;

        this.color = '';

        this.lunarFestival = ''; //农历节日
        this.solarFestival = ''; //国历节日
        this.solarTerms = ''; //节气

    }

    //===== 某年的第n个节气为几日(从0小寒起算)
    function sTerm(y, n) {
        var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
        return (offDate.getUTCDate())
    }
    //====================== 中文日期
    function cDay(d) {
        var s;

        switch (d) {
            case 10:
                s = '初十'; break;
            case 20:
                s = '二十'; break;
                break;
            case 30:
                s = '三十'; break;
                break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    }

    RiLi.prototype.nongLi = function (date) {
        if (date == null) {
            date = this.theDate;
        }
        var lunar = new Lunar(date);
        var m = lunar.isLeap ? "闰" : "";
        m += lunarName.charAt(lunar.month - 1) + "月";
        var d = cDay(lunar.day);
        return { m: m, d: d };
    }
}


//
function addSchedule(td, d, id) {
    var cell = td;
    id = null;
    window.parent.addSchedule(d, id);
    //result: 删除得到的是数字，修改得到的是true, 添加得到是Guid

    window.parent.addSchedule.onComplete = function (result) {
        window.parent.addSchedule.onComplete = null;
        // 如果是当前月，则刷新桌面，以更新待办事项列表
        //      var d = rili.theDate;
        //       var now = new Date();

        cell.guid = result.ScheduleGuid;

//        if (now.getFullYear() == d.getFullYear() && now.getMonth() == d.getMonth()) {
//            window.parent.location.href = window.parent.location.href;
//            return;
//        }

        if (cell.className.indexOf('today-td') > -1) {
            $(cell).addClass('plan2');
        } else {
            $(cell).addClass('plan');
        }

        window.parent.onload2();

//        if (result.length == 36) {
//            cell.guid = result;
//            if (cell.className.indexOf('today-td') > -1) {
//                $(cell).addClass('plan2');
//            } else {
//                $(cell).addClass('plan');
//            }
//        } else if (/^\d+$/.test(result) && parseInt(result) > 0) {
//            delete cell.guid;
//            $(cell).removeClass('plan');
//            $(cell).removeClass('plan2');
//        }

        //  得到当月的日程安排
        // CN80s.Assn.Admin.Ajax.AjaxSchedule.GetSchedule(rili.theDate.ToString('yyyy-MM-dd'), rili.forSchedule);

//         $.post("getSchedules.html",{date : rili.theDate.ToString('yyyy-MM-dd')},function(data) {
//	   						data = data.table;
//        	 				window.rili.forSchedule(data);
//						});
    }
}

function SendBirthdayBlessing(a, id) {
    function onComplete(result) {
        if (result != "") {
            alert(result);
        } else {
            alert("祝福发送成功!");
            var span = document.createElement("span");
            span.innerHTML = a.innerHTML;
            span.className = "a";
            a.parentNode.replaceChild(span, a);
            //
            var key = rili.selectedDate.ToString('yyyy-MM-dd');
            var data = rili.dicBirthday[key]
            var index = -1;
            var row;
            for (var i = 0; i < data.Rows.length; i++) {
                row = data.Rows[i];
                if (row.MemberGuid == id) {
                    row.IsSend = 1;
                    index = i;
                    break;
                }
            }
            // 界面只能显示3个人的生日，已发了祝福的要沉下去，以看到没发祝福的
            if (data.Rows.length > BirthdayPageSize && index > -1) {
                data.Rows.splice(index, 1);
                data.Rows.push(row);
            }
            rili.forBirthday(key, data);
        }
    }
    // CN80s.Assn.Admin.Ajax.AjaxMember.SendBirthdayBlessing(id, onComplete);
    //   AjaxRequest("CN80s.Assn.Admin.Ajax.AjaxMember.SendBirthdayBlessing", id, onComplete);

}

function ToSmsSend(a, id,date) {
    if(confirm("确定给此会员发送祝福短信吗？")){
        $.ajax({
            type:"post",
            url:"blessingSMS.action",
            data:"memberId="+id,
            success:function(date){
                if(date == "success"){
                    alert("短信发送成功！");
                }else{
                    alert("请设置短信内容！");
                }
            },
            error:function(){
                alert("短信发送失败！");
            }
        });
    }
}
