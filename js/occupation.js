(function() {
    $(function(){
        /*
         *  功能：日期悬着器API
         *  页面：*.html
         *  Created by nocoolyoyo 2016/9/26.
         */
        $('.form_date').datetimepicker({
            language:  'zh_cn',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
    });
}());
