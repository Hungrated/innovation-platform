/**
 * Created by wuli等等 on 2017/10/19.
 */
// 全局变量 待优化
var fileName = new Array();

var i;
$(function () {
     $.ajax({
        type: "POST",                   //类型，POST或者GET
         url: "http://localhost:3000/api/file/query",        //后台url
       data: {                          //数据
            request: 'all'
         },
         dataType: 'json',              //数据返回类型，可以是xml、json等
         success: function (data) {      //成功，回调函数
             var taskListData = {
                 taskLists:data
             };
             //console.log(postListData);
             var post = template('taskList', taskListData);
             $("#taskListContainer").html(post);
         },
       error: function (err) {          //失败，回调函数
             console.log(err);
         }
     });
     i=1;
});
$("#resource").addClass("active");

// 上传多个文件和学号、描述
$("#uploadfile").on("click",function () {
    var des ='';
    var Texts = $(".desinput");
    for(var j=0;j<Texts.length-1;j++)
    {
        des = des +Texts[j].value+ ',';
    }
    des = des +Texts[j].value;
    console.log(des);
    console.log(fileName);
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址
        url: 'http://localhost:3000/api/file/upload',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: fileName,                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        data: {
            school_id:localStorage.school_id,
            descriptions:des
        },
        success: function (data) {
            // window.location.reload();
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


// $("#selectF").on("click",function () {
//     $(this).css("display","");
//
//     // this.style.display = "none";
// });
function addNew(obj) {
    $(obj).parent("a").hide();
    fileName.push('file'+i)
    var dess = '<input type="text" class="form-control input-xl desinput"  placeholder="">';
    $("#textArr").append(dess);
    i++;
    var str = '<a  class="file pull-right">选择文件<input onchange="addNew(this)"  type="file" name="files" id="file'+i+'" ></a>';
    $("#uploadArr").append(str);
}


$("#uploadDiv").on("click",function(){
    var uploadFile = '<input name="files" id="file2" class="weui-uploader__input" type="file" multiple/>';
    $("#fileDiv").append($(uploadFile));
    $("#uploaderInput").bind("change",function(e){
        //可以做一些其他的事，比如图片预览
        $(this).removeAttr("id");
    });
    $("#uploaderInput").click();
});