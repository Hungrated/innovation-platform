/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#resource").addClass("active");
$("#uploadfile").on("click",function () {
    var fp = $("#file");
    var lg = fp[0].files.length; // get length
    var items = fp[0].files;

    if (lg > 0) {
        for (var i = 0; i < lg; i++) {
            var fileName = items[i].name; // get file name
            var fileSize = items[i].size; // get file size
            var fileType = items[i].type; // get file type
        }

        console.log(fileName);
        console.log(fileSize);
        console.log(fileType);
    }
    // upload file
    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址
        url: 'http://localhost:3000/api/file/upload',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'file',                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        //contentType:"application/json",
        data: {
            filename: fileName,
            size:fileSize
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
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/file/fillinfo",        //后台url
        data: {                          //数据
            uploader_id: localStorage.schoolId,
            descriptions: text,
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            console.log(data);
            // 待定
            if (data.status == 1){
                window.location.reload();
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
});


$("#selectF").on("click",function () {
    $("#uploadfile").css("display","block");

    // this.style.display = "none";
});