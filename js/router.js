(function(){
    $(function() {
        var desktop = function () { console.log("author"); };
        var occupation = function () { console.log("books"); };
        var information = function () { console.log("books"); };
        var notice = function () { console.log("books"); };
        var supply = function () { console.log("books"); };
        var SMS = function () { console.log("books"); };
        var memberLog = function () { console.log("books"); };
        var questions = function () { console.log("books"); };
        var queryMessage = function () { console.log("books"); };
        var folder = function () { console.log("books"); };
        var incomeExpense = function () { console.log("books"); };
        var queryActivities = function () { console.log("books"); };
        var motifaction = function () { console.log("books"); };
        var operationLog = function () { console.log("books"); };
        var routes = {
            /*路由结构：
             ├── 桌面
             ├
             ├── 会员
             ├     ├── 会员信息
             ├     ├      └── 会员详情
             ├     ├── 职务管理
             ├     ├      └── 人员列表
             ├     ├── 群聊管理
             ├     ├── 未激活
             ├     └── 群管理
             ├             └── 人员列表
             ├
             ├── 资讯
             ├     └── 资讯详情
             ├
             ├── 通知通告
             ├     ├── 新建
             ├     ├── 草稿箱
             ├     ├      └── 编辑
             ├     └── 详情
             ├
             ├── 供需
             ├     ├── 详情
             ├     └── 评论
             ├
             ├── 短信
             ├     ├── 新建
             ├     ├── 回复
             ├     └── 详情
             ├
             ├── 会员日志
             ├
             ├── 问题反馈
             ├
             ├── 工商联
             ├     ├── 接收消息
             ├     ├      └── 详情
             ├     └── 发送消息
             ├             ├── 新建
             ├             └── 详情
             ├
             ├── 画册
             ├     └── 详情
             ├
             ├── 文件管理
             ├     └── 详情
             ├
             ├── 收支
             ├
             ├── 签到抽奖
             ├
             ├── 焦点位
             ├     └── 详情
             ├
             └── 操作日志
             */
            '/desktop': desktop,
            '/occupation': occupation,
            '/occupation/HYXX': occupation_HYXX,
            '/occupation/HYXX/': occupation_HYXX,
            '/occupation/HYXX': occupation/ZWGL,
            '/occupation/HYXX': occupation/QLGL,
            '/occupation/HYXX': occupation/WJH,
            '/occupation/HYXX': occupation/QGL,
            '/information': information,
            '/notice': notice,
            '/supply': supply,
            '/SMS': SMS,
            '/memberLog': memberLog,
            '/questions': questions,
            '/queryMessage': queryMessage,
            '/folder': folder,
            '/incomeExpense': incomeExpense,
            '/queryActivities': queryActivities,
            '/motifaction': motifaction,
            '/operationLog': operationLog
        };

        var router = Router(routes);

        router.init();

    }
})