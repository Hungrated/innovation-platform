/**
 * Created by Administrator on 2017/9/28 0028.
 */


$("#uploadfile").on("click",function () {
    debugger;
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

    $.ajaxFileUpload({
        //处理文件上传操作的服务器端地址
        url: '/resource/uploadFile',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'file',                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        //contentType:"application/json",
        data: {
            fileName: fileName
        },
        success: function (data) {
            debugger;
            if (data.success == 1) {
                console.log(data.message);
                window.location.reload();
            }
            else
                console.log(data.message)
        },
        error: function (msg) {
            console.log(msg.responseText);
        }
    });
});

/*$(".downloadBtn").on("click",function () {
   debugger;
    var url = $(this).attr("data-mode");
    $.ajax({
        //处理文件上传操作的服务器端地址
        url: url,
        method:'GET',
        contentType:"application/x-www-form-urlencoded",
        success: function (json) {
            console.log("ok");
            debugger;

            // window.location.href = '/index';
        },
        error: function (json) {
            console.log( "Error: " + XMLHttpRequest.responseText);
        }
    });
});*/

$("#selectF").on("click",function () {
    debugger;
    $("#uploadfile").css("display","block");

    // this.style.display = "none";
});