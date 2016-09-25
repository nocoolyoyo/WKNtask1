function openme(){
    document.getElementById('job').style.display='block';
    document.getElementById('job').style.visibility='visible';
    document.getElementById('backgroung').style.display='block';
    document.getElementById('pop').style.display='block';

}
function closeme(){
    document.getElementById('backgroung').style.display='none';
    document.getElementById('pop').style.display='none';
}

//鎵撳紑鏂板缓鑱屽姟瀵硅瘽妗�
function addjob(){
    document.getElementById('getjob').style.display='block';
    document.getElementById('getjob').style.visibility='visible';
    document.getElementById('background4').style.display='block';
    document.getElementById('addjob').style.display='block';

    $("#positionName").val("");
    $("#descPosition").val("");
}
//鍏抽棴鏂板缓鑱屽姟瀵硅瘽妗�
function closeaddjob(){
    document.getElementById('getjob').style.display='none';
    document.getElementById('getjob').style.visibility='hidden';
    document.getElementById('background4').style.display='none';
    document.getElementById('addjobauth').style.display='none';
}
////鎵撳紑缂栬緫鑱屽姟瀵硅瘽妗�
//function modifyjob(){
//document.getElementById('setjob').style.display='block';
//document.getElementById('setjob').style.visibility='visible';
//document.getElementById('background5').style.display='block';
//document.getElementById('modifyjob').style.display='block';
//}

//鍏抽棴缂栬緫鑱屽姟瀵硅瘽妗�
function closemodifyjob(){
    document.getElementById('setjob').style.display='none';
    document.getElementById('setjob').style.visibility='hidden';
    document.getElementById('background5').style.display='none';
    document.getElementById('modifyjob').style.display='none';
}

function logo_in(){
//楠岃瘉
//杞悜...
//myform.html=""
//myform.submit()
    closeme();
}
///////////////////////////////////////////
//鐐瑰嚮鍒囨崲鍟嗕細
var i = 1;
function openassociation(){
    if(i%2==1){
        document.getElementById('association').style.display='block';
        document.getElementById('association').style.visibility='visible';
        i++;
    }else{
        document.getElementById('association').style.display='none';
        document.getElementById('association').style.visibility='hidden';
        i++;
    }

}
//娣诲姞寰呭姙浜嬮」
function addbacklog(){
    document.getElementById('addbacklog').style.display='block';
    document.getElementById('addbacklog').style.visibility='visible';
    document.getElementById('background').style.display='block';
    document.getElementById('dialogue').style.display='block';
}
//鍏抽棴寰呭姙浜嬮」瀵硅瘽妗�
function closedialogue(){
    document.getElementById('background').style.display='none';
    document.getElementById('dialogue').style.display='none';
}

//鍏抽棴娣诲姞甯愬彿瀵硅瘽妗�
function closeaccount(){
    document.getElementById('background1').style.display='none';
    document.getElementById('addaccount').style.display='none';
}
//鎵撳紑鏂板缓鑱屽姟瀵硅瘽妗�
function addjobauth(){
    document.getElementById('getjobauth').style.display='block';
    document.getElementById('getjobauth').style.visibility='visible';
    document.getElementById('background2').style.display='block';
    document.getElementById('addjobauth').style.display='block';
    document.getElementById('editjobauth').style.display='none';
}
//鍏抽棴鏂板缓鑱屽姟瀵硅瘽妗�
function closeaddjobauth(){
    document.getElementById('getjobauth').style.display='none';
    document.getElementById('getjobauth').style.visibility='hidden';
    document.getElementById('background2').style.display='none';
    document.getElementById('addjobauth').style.display='none';
    document.getElementById('editjobauth').style.display='none';

}
//鎵撳紑缂栬緫鑱屽姟瀵硅瘽妗�
function editjobauth(){
    document.getElementById('getjobauth').style.display='block';
    document.getElementById('getjobauth').style.visibility='visible';
    document.getElementById('background2').style.display='block';
    document.getElementById('editjobauth').style.display='block';
    document.getElementById('addjobauth').style.display='none';
}
//鍏抽棴缂栬緫鑱屽姟瀵硅瘽妗�
function closeeditjobauth(){
    document.getElementById('getjobauth').style.display='none';
    document.getElementById('getjobauth').style.visibility='hidden';
    document.getElementById('background2').style.display='none';
    document.getElementById('editjobauth').style.display='none';
    document.getElementById('addjobauth').style.display='none';
}

//閲嶇疆瀵嗙爜
function resetpassword(){
    var con = confirm('浣犵‘璁ら噸缃瘑鐮佷负锛�123456锛�');
    if(con==true){
        alert('淇敼瀵嗙爜鎴愬姛!');
    }else{
        alert('淇敼瀵嗙爜鏈垚鍔燂紒');
    }
}
//璐拱寮瑰嚭妗�
function buy(){
    alert('鏈紑鏀撅紒锛�')	;
    /*
     var buy = confirm('浣犵‘璁よ喘涔颁箞?');
     if(buy==true){
     alert('鏈紑鏀撅紒锛�')	;
     }else{
     alert('璐拱澶辫触');}*/
}

//鏄剧ず浼氬憳鐨勫晢浼氫俊鎭紪杈戠姸鎬�
function assinfoedit(){
    document.getElementById('assinfo1').style.display='none';
    document.getElementById('assinfo1').style.visibility='hidden';
    document.getElementById('assinfo2').style.display='block';
    document.getElementById('assinfo2').style.visibility='visible';

    document.getElementById('assinfoedit').style.display='none';
    document.getElementById('assinfoedit').style.visibility='hidden';
    document.getElementById('assinfosave').style.display='block';
    document.getElementById('assinfosave').style.visibility='visible';
}
//鏄剧ず浼氬憳鐨勫晢浼氫俊鎭繚瀛樼姸鎬�
function assinfosave(){
    document.getElementById('assinfo1').style.display='block';
    document.getElementById('assinfo1').style.visibility='visible';
    document.getElementById('assinfo2').style.display='none';
    document.getElementById('assinfo2').style.visibility='hidden';

    document.getElementById('assinfoedit').style.display='block';
    document.getElementById('assinfoedit').style.visibility='visible';
    document.getElementById('assinfosave').style.display='none';
    document.getElementById('assinfosave').style.visibility='hidden';
}

//鏄剧ず浼氬憳鐨勫叾浠栦俊鎭紪杈戠姸鎬�
function otherinfoedit(){
    document.getElementById('otherinfo1').style.display='none';
    document.getElementById('otherinfo1').style.visibility='hidden';
    document.getElementById('otherinfo2').style.display='block';
    document.getElementById('otherinfo2').style.visibility='visible';

    document.getElementById('otherinfoedit').style.display='none';
    document.getElementById('otherinfoedit').style.visibility='hidden';
    document.getElementById('otherinfosave').style.display='block';
    document.getElementById('otherinfosave').style.visibility='visible';
}
//鏄剧ず浼氬憳鐨勫叾浠栦俊鎭繚瀛樼姸鎬�
function otherinfosave(){
//document.getElementById('otherinfo1').style.display='block';
//document.getElementById('otherinfo1').style.visibility='visible';
//document.getElementById('otherinfo2').style.display='none';
//document.getElementById('otherinfo2').style.visibility='hidden';
//
//document.getElementById('otherinfoedit').style.display='block';
//document.getElementById('otherinfoedit').style.visibility='visible';
//document.getElementById('otherinfosave').style.display='none';
//document.getElementById('otherinfosave').style.visibility='hidden';
}

//鎵撳紑鍙備笌浜哄脊鍑烘
//function joinmem(){
//document.getElementById('issueactivity').style.display='none';
//document.getElementById('issueactivity').style.visibility='hidden';
//document.getElementById('joinmember').style.display='block';
//document.getElementById('joinmember').style.visibility='visible';
//document.getElementById('background3').style.display='block';
//document.getElementById('joinmem').style.display='block';
//}
//鍏抽棴鍙備笌浜哄脊鍑烘
function closejoinmem(){
    var flag = window.flag;

    document.getElementById('joinmember').style.display='none';
    document.getElementById('joinmember').style.visibility='hidden';
    document.getElementById('background3').style.display='none';
    document.getElementById('joinmem').style.display='none';
    if(flag=='modify'){
        document.getElementById("fixactivity").style.display='block';
    }else if(flag=="add"){
        var issueactivity = document.getElementById('issueactivity');
        issueactivity.style.display='block';
        issueactivity.style.visibility='visible';
    }


}

//鏂板缓鐩稿唽寮瑰嚭妗�
function addalbum(){
    var uploadphoto = document.getElementById('uploadphoto');
    uploadphoto.style.display='none';
    uploadphoto.style.visibility='hidden';
    var addAlbum = document.getElementById('addalbum');
    addAlbum.style.display='block';
    addAlbum.style.visibility='visible';
    document.getElementById('back2').style.display='block';
    document.getElementById('album').style.display='block';
}
//淇敼鐩稿唽寮瑰嚭妗�
function updatealbum(categoryGuid){
    $.ajax({
        type:'POST',
        url: "showPhotos.action",
        data:{"categoryGuid":categoryGuid},
        dataType:'json',
        success: function (data){
            var photosname = document.getElementById("photosname");
            photosname.value = data[0].photoname;
            if(data[0].viewrange==1){
                $("#viewrange1").attr("selected","selected");
            }else{
                $("#viewrange2").attr("selected","selected");
            }
        },
        error: function(msg){
            alert("璇锋眰澶辫触,璇疯仈绯荤郴缁熺鐞嗗憳");
        }
    });
    var uploadphoto = document.getElementById('uploadphoto');
    uploadphoto.style.display='none';
    uploadphoto.style.visibility='hidden';
    var updateAlbum = document.getElementById('updatealbum');
    updateAlbum.style.display='block';
    updateAlbum.style.visibility='visible';
    document.getElementById('back2update').style.display='block';
    document.getElementById('albumupdate').style.display='block';
}
//鍏抽棴鏂板缓鐩稿唽寮瑰嚭妗�
function closealbum(){
    document.getElementById('addalbum').style.display='none';
    document.getElementById('addalbum').style.visibility='hidden';
    document.getElementById('back2').style.display='none';
    document.getElementById('album').style.display='none';
}

function closeupdatealbum(){
    document.getElementById('updatealbum').style.display='none';
    document.getElementById('updatealbum').style.visibility='hidden';
    document.getElementById('back2update').style.display='none';
    document.getElementById('back2update').style.display='none';
}

//鏂板缓鐩稿唽寮瑰嚭妗�2
function addalbum2(){
    var uploadphoto = document.getElementById('uploadphoto');
    uploadphoto.style.display='none';
    uploadphoto.style.visibility='hidden';
    var addAlbum = document.getElementById('addalbum2');
    addAlbum.style.display='block';
    addAlbum.style.visibility='visible';
    document.getElementById('back3').style.display='block';
    document.getElementById('album2').style.display='block';
}

//鍏抽棴鏂板缓鐩稿唽寮瑰嚭妗�2
function closealbum2(){
    var addAlbum = document.getElementById('addalbum2');
    addAlbum.style.display='none';
    addAlbum.style.visibility='hidden';
    var uploadphoto = document.getElementById('uploadphoto');
    uploadphoto.style.display='block';
    uploadphoto.style.visibility='visible';
    document.getElementById('back3').style.display='none';
    document.getElementById('album2').style.display='none';
}

//鐩稿唽璇︽儏鐣岄潰鏂板缓鐩稿唽寮瑰嚭妗�
function detailaddalbum(){
    document.getElementById('addalbum').style.display='block';
    document.getElementById('addalbum').style.visibility='visible';
    document.getElementById('background2').style.display='block';
    document.getElementById('album').style.display='block';
    document.getElementById('uploadphoto').style.display='none';
    document.getElementById('uploadphoto').style.visibility='hidden';
}
//鐩稿唽璇︽儏鐣岄潰鍏抽棴鏂板缓鐩稿唽寮瑰嚭妗�
function detailclosealbum(){
    document.getElementById('addalbum').style.display='none';
    document.getElementById('addalbum').style.visibility='hidden';
    document.getElementById('background2').style.display='none';
    document.getElementById('album').style.display='none';
    document.getElementById('uploadphoto').style.display='block';
    document.getElementById('uploadphoto').style.visibility='visible';
}
//涓婁紶鐓х墖寮瑰嚭妗�
function uploadphoto(){
    document.getElementById('uploadphoto').style.display='block';
    document.getElementById('uploadphoto').style.visibility='visible';
    document.getElementById('back1').style.display='block';
    document.getElementById('photo').style.display='block';
}
//鍏抽棴涓婁紶鐓х墖寮瑰嚭妗�
function closephoto(){
    document.getElementById('uploadphoto').style.display='none';
    document.getElementById('uploadphoto').style.visibility='hidden';
    document.getElementById('back1').style.display='none';
    document.getElementById('photo').style.display='none';
}
//鎵撳紑棰勮鐩稿唽鐓х墖寮瑰嚭妗�
function previewPhoto(){
    document.getElementById('previewalbum').style.display='block';
    document.getElementById('previewalbum').style.visibility='visible';
    document.getElementById('back3').style.display='block';
    document.getElementById('preview').style.display='block';
}
//鍏抽棴棰勮鐩稿唽鐓х墖寮瑰嚭妗�
function closepreview(){
    document.getElementById('previewalbum').style.display='none';
    document.getElementById('previewalbum').style.visibility='hidden';
    document.getElementById('back3').style.display='none';
    document.getElementById('preview').style.display='none';
}
////鍙戝竷娲诲姩寮瑰嚭妗�
//function issueactivity(){
//document.getElementById('issueactivity').style.display='block';
//document.getElementById('issueactivity').style.visibility='visible';
//document.getElementById('background1').style.display='block';
//document.getElementById('activity').style.display='block';
//$("#activitytheme").val("");
//$("#d11").val("");
//$("#startHour").val("");
//$("#startMinute").val("");
//$("#d12").val("");
//$("#toHour").val("");
//$("#toMinute").val("");
//$("#Leader").val("");
//$("#Leader").val("");
//$("#contact").val("");
//$("#phoneNoString").html("");
//editor.ready(function(){
//    //闇€瑕乺eady鍚庢墽琛岋紝鍚﹀垯鍙兘鎶ラ敊
//    editor.setContent("");
//})
//}
//鍏抽棴鍙戝竷娲诲姩寮瑰嚭妗�
//function closeactivity(){
//document.getElementById('issueactivity').style.display='none';
//document.getElementById('issueactivity').style.visibility='hidden';
//document.getElementById('background1').style.display='none';
//document.getElementById('activity').style.display='none';
//
//		$("#addNoticeTitle").val("");
//		$("#phoneNoString").html("");
//		myEditor1.setContent("");
//
//}
//淇敼娲诲姩寮瑰嚭妗�
//function fixactivity(){
//document.getElementById('fixactivity').style.display='block';
//document.getElementById('fixactivity').style.visibility='visible';
//document.getElementById('background2').style.display='block';
//document.getElementById('actv').style.display='block';
//}
////鍏抽棴淇敼娲诲姩寮瑰嚭妗�
//function closeactv(){
//document.getElementById('fixactivity').style.display='none';
//document.getElementById('fixactivity').style.visibility='hidden';
//document.getElementById('background2').style.display='none';
//document.getElementById('actv').style.display='none';
//}
//鎵撳紑楂樼骇鎼滅储瀵硅瘽妗�
//function seniorsearch(){
//document.getElementById('seniorsearch').style.display='block';
//document.getElementById('seniorsearch').style.visibility='visible';
//document.getElementById('background1').style.display='block';
//document.getElementById('search').style.display='block';
//
//document.getElementById('sendmessage').style.display='none';
//document.getElementById('sendmessage').style.visibility='hidden';
//document.getElementById('background2').style.display='none';
//document.getElementById('smessage').style.display='none';
//
//}
//鍏抽棴楂樼骇鎼滅储瀵硅瘽妗�
function closesearch(){
    document.getElementById('seniorsearch').style.display='none';
    document.getElementById('seniorsearch').style.visibility='hidden';
    /*document.getElementById('background1').style.display='none';*/
    document.getElementById('search').style.display='none';

    document.getElementById('sendmessage').style.display='block';
    document.getElementById('sendmessage').style.visibility='visible';
    document.getElementById('background2').style.display='block';
    document.getElementById('smessage').style.display='block';
}
//鎵撳紑鏂板鍗曚綅瀵硅瘽妗�
function addcompany(){
    document.getElementById('addcompany').style.display='block';
    document.getElementById('addcompany').style.visibility='visible';
    document.getElementById('background2').style.display='block';
    document.getElementById('company').style.display='block';
}
//鍏抽棴鏂板鍗曚綅瀵硅瘽妗�
function closecompany(){
    document.getElementById('addcompany').style.display='none';
    document.getElementById('addcompany').style.visibility='hidden';
    document.getElementById('background2').style.display='none';
    document.getElementById('company').style.display='none';
}
//鎵撳紑淇敼鍗曚綅瀵硅瘽妗�
function fixcompany(){
    document.getElementById('fixcompany').style.display='block';
    document.getElementById('fixcompany').style.visibility='visible';
    document.getElementById('background3').style.display='block';
    document.getElementById('fix').style.display='block';
}
//鍏抽棴淇敼鍗曚綅瀵硅瘽妗�
function closefixcompany(){
    document.getElementById('fixcompany').style.display='none';
    document.getElementById('fixcompany').style.visibility='hidden';
    document.getElementById('background3').style.display='none';
    /*document.getElementById('fix').style.display='none';*/
}
////鎵撳紑浼氬憳瀵煎叆瀵硅瘽妗�
//function importmember(){
//document.getElementById('importmember').style.display='block';
//document.getElementById('importmember').style.visibility='visible';
//document.getElementById('background2').style.display='block';
//document.getElementById('importmem').style.display='block';
//}
//鍏抽棴浼氬憳瀵煎叆瀵硅瘽妗�
function closeimport(){
    document.getElementById('importmember').style.display='none';
    document.getElementById('importmember').style.visibility='hidden';
    document.getElementById('background2').style.display='none';
    document.getElementById('importmem').style.display='none';
}

//鍏抽棴浼氬憳褰曞叆瀵硅瘽妗�
function closerecord(){
    document.getElementById('insertmem').style.display='none';
    document.getElementById('insertmem').style.visibility='hidden';
    document.getElementById('background3').style.display='none';
    document.getElementById('insert').style.display='none';
}
//鎵撳紑缁垂瀵硅瘽妗�
function morefees(){
    document.getElementById('morefee').style.display='block';
    document.getElementById('morefee').style.visibility='visible';
    document.getElementById('background').style.display='block';
    document.getElementById('more').style.display='block';
}
//鍏抽棴缁垂瀵硅瘽妗�
function closemore(){
    document.getElementById('morefee').style.display='none';
    document.getElementById('morefee').style.visibility='hidden';
    document.getElementById('background').style.display='none';
    document.getElementById('more').style.display='none';
}
//鎵撳紑涓婁紶鏂囦欢绠＄悊瀵硅瘽妗�
function uploadfile(){
    var categoryGuid = $("li[class=current]").attr("id");
    if(typeof categoryGuid=="string"){
        var categoryGuid2 =document.getElementById("categoryGuid2");
        categoryGuid2.value = categoryGuid;
    }
    document.getElementById('uploadfile').style.display='block';
    document.getElementById('uploadfile').style.visibility='visible';
    document.getElementById('background').style.display='block';
    document.getElementById('file').style.display='block';

}
//鍏抽棴涓婁紶鏂囦欢绠＄悊瀵硅瘽妗�
function closefile(){
    document.getElementById('uploadfile').style.display='none';
    document.getElementById('uploadfile').style.visibility='hidden';
    document.getElementById('background').style.display='none';
    document.getElementById('file').style.display='none';
}
//鎵撳紑浼氳垂鍜屽叾浠栨敹鏀璇濇(褰撳墠涓轰細璐�)
function openmemfee(){
    document.getElementById('fee').style.display='block';
    document.getElementById('fee').style.visibility='visible';
    document.getElementById('background').style.display='block';
    document.getElementById('memberfee').style.display='block';
    document.getElementById('memberfee').style.visibility='visible';
    document.getElementById('otherfee').style.display='none';
    document.getElementById('otherfee').style.visibility='hidden';
}
//鍒囨崲鍒板叾浠栨敹鏀�
function openotherfee(){
//楠岃瘉session鏄惁杩囨湡
    SessionLost();
    closefeeUpdate();
    document.getElementById('fee').style.display='block';
    document.getElementById('fee').style.visibility='visible';
    document.getElementById('background').style.display='block';
    /*
     * document.getElementById('memberfee').style.display='none';
     *document.getElementById('memberfee').style.visibility='hidden';
     */
    document.getElementById('otherfee').style.display='block';
    document.getElementById('otherfee').style.visibility='visible';
}

//鍏抽棴浼氳垂鍜屽叾浠栨敹鏀璇濇
function closefee(){
    document.getElementById('fee').style.display='none';
    document.getElementById('fee').style.visibility='hidden';
    document.getElementById('background').style.display='none';
    document.getElementById('memberfee').style.display='none';
    document.getElementById('memberfee').style.visibility='hidden';
    document.getElementById('otherfee').style.display='none';
    document.getElementById('otherfee').style.visibility='hidden';
}
//鎵撳紑鐢宠琛ㄨ缃璇濇
function applytable(){
    document.getElementById('applytable').style.display='block';
    document.getElementById('applytable').style.visibility='visible';
    document.getElementById('background').style.display='block';
    document.getElementById('apply').style.display='block';
}
//鍏抽棴鐢宠琛ㄨ缃璇濇
function closeapply(){
    document.getElementById('applytable').style.display='none';
    document.getElementById('applytable').style.visibility='hidden';
    document.getElementById('background').style.display='none';
    document.getElementById('apply').style.display='none';
}

//鍏抽棴淇敼鍙戦€佽祫璁璇濇
function closefnews(){
    document.getElementById('bgProgressBar').style.display='none';
    document.getElementById('fixnews').style.display='none';
    document.getElementById('fixnews').style.visibility='hidden';
    document.getElementById('background3').style.display='none';
    document.getElementById('fnews').style.display='none';
}
//鎵撳紑淇敼鍙戦€侀€氱煡瀵硅瘽妗�
function fixnotification(){
    document.getElementById('fixnotification').style.display='block';
    document.getElementById('fixnotification').style.visibility='visible';
    document.getElementById('background4').style.display='block';
    document.getElementById('fnotification').style.display='block';
}
////鍏抽棴淇敼鍙戦€侀€氱煡瀵硅瘽妗�
//function closefnotification(){
//document.getElementById('fixnotification').style.display='none';
//document.getElementById('fixnotification').style.visibility='hidden';
//document.getElementById('background4').style.display='none';
//document.getElementById('fnotification').style.display='none';
//}
//鎵撳紑鍙戦€佹秷鎭璇濇

//鍏抽棴鍙戦€佹秷鎭璇濇
//function closesmessage(){
//document.getElementById('sendmessage').style.display='none';
//document.getElementById('sendmessage').style.visibility='hidden';
//document.getElementById('background2').style.display='none';
//document.getElementById('smessage').style.display='none';
//}

