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
$("#uploadDiv").on("click",function(){
    var uploadFile = '<input name="files" id="file2" class="weui-uploader__input" type="file" multiple/>';
    $("#fileDiv").append($(uploadFile));
    $("#uploaderInput").bind("change",function(e){
        //可以做一些其他的事，比如图片预览
        $(this).removeAttr("id");
    });
    $("#uploaderInput").click();
});
$("#uploadfile").on("click",function () {
    debugger;
    // var str = new Array();
    //  for(var j=1;j<=i;j++)
    //  {
    //      str.push('file'+j);
    //  }
    var fp = $(".fileA");
    var items = fp[0].files;
    console.log(items);
    var fileName = items[0].name; // get file name
    var fileSize = items[0].size; // get file size
    i++;
     console.log(str);
     console.log(fileName);
     console.log(fileSize);
    // upload file
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址
        url: 'http://localhost:3000/api/file/upload',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: ['file1','file2'],                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        //contentType:"application/json",
        data: {
            name: 'files',
            school_id:localStorage.school_id,
            // size:fileSize,
            // originalname:fileName,
            descriptions:'a,a'
        },
        success: function (data) {
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
            console.log(msg.responseText);
        }
    });
    // supplement data
    var text = $("#desinput").text();

});


$("#selectF").on("click",function () {
    $("#uploadfile").css("display","block");

    // this.style.display = "none";
});