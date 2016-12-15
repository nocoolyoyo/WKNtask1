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
           '/desktop': desktop,
           '/occupation': occupation,
           '/occupation/HYXX': occupation/HYXX,
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
           '/operationLog': operationLog,
         };

         var router = Router(routes);

         router.init();
                	
    }
})