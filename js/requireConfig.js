console.log(234234);
require.config({
    paths : {
        "jquery" : ["vendor/jQuery/jquery-1.12.4.min"],
        "director" : ["vendor/director/director.min"],
        "bootstrap" : ["vendor/bootstrap/js/bootstrap.min"],
        "bootbox" : ["vendor/bootbox/bootbox.min"],
        "toastr" : ["vendor/toastr/js/toastr.min"],
        "ajaxFileUpload" : ["vendor/ajaxFileUpload/ajaxFileUpload"],
        "bootstrap-datetimepicker" : ["vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker"],
        "bootstrap-table" : ["vendor/bootstrap-table/js/bootstrap-table.min"],
        "bootstrap-editable" : ["vendor/bootstrap-table/js/bootstrap-editable.min"],
        "bootstrap-table-editable" : ["vendor/bootstrap-table/js/bootstrap-table-editable.min"],
        "bootstrap-table-zh-CN" : ["vendor/bootstrap-table/js/bootstrap-table-zh-CN"],
        "bootstrap-table-export" : ["vendor/bootstrap-table/js/bootstrap-table-export.min"],
        "tableExport" : ["vendor/bootstrap-table/js/tableExport.min"],
        "xlsx.core" : ["vendor/bootstrap-table/js/xlsx.core.min"],
        "bootstrapValidator" : ["vendor/bootstrapValidator/bootstrapValidator.min"],
        "fileinput" : ["vendor/fileinput/fileinput.min"],
        "fileinput-zh-CN" : ["vendor/fileinput/fileinput-zh-CN"],
        "froala-editor" : ["vendor/froala-editor/froala_editor.min"],
        "froala-editor-plugins" : ["vendor/froala-editor/froala_plugins.min"],
        "froala-editor-zh-CN" : ["vendor/froala-editor/froala_zh_cn"],
        "prettyPhoto" : ["vendor/prettyPhoto/js/jquery.prettyPhoto"],
        "wookmark" : ["vendor/wookmark/wookmark.min"],
        "imagesloaded" : ["vendor/wookmark/imagesloaded.pkgd.min"],

        //desktop所需模块
        // "calendar-init" : ["pages/desktop/js/calendar-init"],
        // "calendar-dateFestival" : ["pages/desktop/js/calendar-dateFestival"],
        // "calendar-run" : ["pages/desktop/js/calendar-run"]
    },
    shim : {
        "ajaxFileUpload" : ["jquery"],
        "prettyPhoto" : ["jquery"],
        "wookmark": ["jquery"],
        "imagesloaded" : ["jquery"],
        "bootstrap" :["jquery"],
        "bootbox" : {
            deps: ["bootstrap"],
            exports: "bootbox"
        },
        "toastr" : {
            deps: ['bootstrap'],
            exports: "toastr"
        },
        "bootstrapValidator" : ["bootstrap"],
        "bootstrap-datetimepicker" : ["bootstrap"],
        "bootstrap-table" : ["bootstrap"],
        "bootstrap-table-zh-CN" :["bootstrap-table"],
        "bootstrap-editable" : ["bootstrap"],
        "bootstrap-table-editable" : ["bootstrap-editable"],
        "tableExport" : ["xlsx.core"],
        "bootstrap-table-export" : ["tableExport"],
        "fileinput": ["bootstrap"],
        "froala-editor" : ["jquery"],
        "froala-editor-plugins" : ["froala-editor"],
        "froala-editor-zh-CN" : ["froala-editor-plugins"],
        //"calendar-run" : ["calendar-init","calendar-dateFestival" ]
    }
});
