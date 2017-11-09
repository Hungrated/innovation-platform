/**
 * Created by wuli等等 on 2017/10/19.
 */
// 全局变量 待优化
var fileName = new Array();
var fileSize = new Array();
var i=0;
$(function () {
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/file/query",        //后台url
        data: {                          //数据
            request: localStorage.schoolId
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            console.log(data);
            // 待定
            if (data){
                //window.location.reload();
            } else {
                var dialog = art.dialog({
                    title: '提示',
                    content: data.msg,
                    lock:true,
                    ok:true,
                    follow: document.getElementById('logoNav')
                });
                reset();
            }
        },
        error: function (err) {          //失败，回调函数
            console.log(err);
        }
    });
    $('body').on('change',$('#ImportPicInput'),function(){
        $( "#importPicName").val($( "#ImportPicInput").val());
    });
});
$("#resource").addClass("active");

// 上传多个文件和学号、描述
$("#uploadfile").on("click",function () {
    debugger;
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址
        url: 'http://localhost:3000/api/file/upload',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: ['file1','file2'],                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        data: {
            school_id:localStorage.school_id,
            descriptions:'a,a'
        },
        success: function (data) {
            debugger;
            window.location.reload();
            if (data.status == 4000) {
                var dialog = art.dialog({
                    title: '提示',
                    content: data.msg,
                    lock:true,
                    ok:true,
                    follow: document.getElementById('logoNav')
                });
            }
            else{
                debugger;
                alert(data.msg)
            }
        },
        error: function (msg) {
            debugger;
            console.log(msg.responseText);
        }
    });
    // supplement data
    var text = $("#desinput").text();

});


$("#selectF").on("click",function () {
    $(this).css("display","");

    // this.style.display = "none";
});



$("#uploadDiv").on("click",function(){
    var uploadFile = '<input name="files" id="file2" class="weui-uploader__input" type="file" multiple/>';
    $("#fileDiv").append($(uploadFile));
    $("#uploaderInput").bind("change",function(e){
        //可以做一些其他的事，比如图片预览
        $(this).removeAttr("id");
    });
    $("#uploaderInput").click();
});