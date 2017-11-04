/**
 * Created by Administrator on 2017/11/4 0004.
 */
$("#impotInfor").on("click",function () {
    debugger;
    var fp = $("#fileSelect");
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
        url: 'http://localhost:3000/api/user/import',
        enctype: "multipart/form-data",
        secureuri: false,                       //是否启用安全提交,默认为false
        fileElementId: 'file',                        //文件选择框的id属性
        dataType: "json",                       //服务器返回的格式,可以是json或xml等
        data: {

        //     size:fileSize
         },
        success: function (data) {
            window.location.reload();
            if (data.status == 1300) {
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
});