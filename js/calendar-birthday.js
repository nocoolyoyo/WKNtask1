(function() {
    $(function(){
        function todayDate(){
            var mydate = new Date();
            var todayDate = "" + mydate.getFullYear() + "/";
            todayDate += (mydate.getMonth()+1) + "/";
            todayDate += mydate.getDate();
            return todayDate;
        }
        $(document).on("click", ".mh-on", function(){
            console.log($(this).attr('date'));
        });
    });
}());


