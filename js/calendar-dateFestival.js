(function(){
    window.OB=window.OB||{};
    window.OB.RiLi=window.OB.RiLi||{};
    //休息日，上班时间，以及放假时间表
    window.OB.RiLi.dateRest=[
        "0101","0102","0103","0218","0219","0220","0221","0222","0223","0224","0404","0405","0406","0501","0502","0503","0620","0621","0622","0903","0904","0905","0926","0927","1001","1002","1003","1004","1005","1006","1007"
    ];
    window.OB.RiLi.dateWork=[
        "0104","0215","0228","0906","1010"
    ];
    window.OB.RiLi.dateFestival=[
        "20160101||元旦",
        "20160219||春节",
        "20160405||清明节",
        "20160501||劳动节",
        "20160620||端午节",
        "20160915||中秋节",
        "20161001||国庆节"
    ];
    window.OB.RiLi.dateAllFestival=[
        "正月初一|v,春节",
        "正月十五|v,元宵节",
        "二月初二|v,龙头节",
        "五月初五|v,端午节",
        "七月初七|v,七夕节",
        "七月十五|v,中元节",
        "八月十五|v,中秋节",
        "九月初九|v,重阳节",
        "十月初一|i,寒衣节",
        "十月十五|i,下元节",
        "腊月初八|i,腊八节",
        "腊月廿三|i,祭灶节",
        "0202|i,世界湿地日,1996",
        "0214|v,西洋情人节",
        "0308|i,国际妇女节,1975",
        "0315|i,国际消费者权益日,1983",
        "0422|i,世界地球日,1990",
        "0501|v,国际劳动节,1889",
        "0512|i,国际护士节,1912",
        "0518|i,国际博物馆日,1977",
        "0605|i,世界环境日,1972",
        "0623|i,国际奥林匹克日,1948",
        "0624|i,世界骨质疏松日,1997",
        "1117|i,世界学生日,1942",
        "1201|i,世界艾滋病日,1988",
        "0101|v,元旦",
        "0312|i,植树节,1979",
        "0504|i,五四青年节,1939",
        "0601|v,儿童节,1950",
        "0701|v,建党节,1941",
        "0801|v,建军节,1933",
        "0903|v,抗战胜利纪念日",
        "0910|v,教师节,1985",
        "1001|v,国庆节,1949",
        "1224|v,平安夜",
        "1225|v,圣诞节",
        "w:0520|v,母亲节,1913",
        "w:0630|v,父亲节",
        "w:1144|v,感恩节(美国)",
        "w:1021|v,感恩节(加拿大)"
    ];
    //本地老黄历库在lhl文件夹，此处是官网调用的
    var e="https://s.ssl.qhimg.com/!97be6a4c/data/";
    // var e="js/lhl/";
    location.protocol=="https:"&&(e="https://s.ssl.qhimg.com/!97be6a4c/data/");
    // location.protocol=="https:"&&(e="js/lhl/");
    window.OB.RiLi.hlUrl={
        2008:e+"hl2008.js",
        2009:e+"hl2009.js",
        2010:e+"hl2010.js",
        2011:e+"hl2011.js",
        2012:e+"hl2012.js",
        2013:e+"hl2013.js",
        2014:e+"hl2014.js",
        2015:e+"hl2015.js",
        2016:e+"hl2016.js",
        2017:e+"hl2017.js",
        2018:e+"hl2018.js"
    };
    window.OB.RiLi.dateHuochepiao=[
        "-20141201||20",
        "20141201||30",
        "20141202||36",
        "20141203||42",
        "20141204||48",
        "20141205||54",
        "+20141205||60",
        "c20141221-20141228||red"
    ];
    window.OB.RiLi.useLunarTicketDay={
        2015:{"0218":"除夕","0219":"初一","0220":"初二","0221":"初三","0222":"初四","0223":"初五","0224":"初六","0225":"初七"}
    }
})();