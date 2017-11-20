/**
 * Created by Administrator on 2017/11/4 0004.
 */

function change() {
  document.getElementById("upload_file_tmp").value = document.getElementById("file").value;
}

$(function () {
  $.ajax({
    type: "POST",
    url: "/api/profile/getinfo",
    data: {
      request: 'all'
    },
    dataType: "json",
    success: function (data) {
      if (data.status == 2101) {
        alert(data.msg)
      } else {
        var isZero;
        if (data.length == 0) {
          isZero = 1;
        } else {
          isZero = 0;
        }
        var stuListData = {
          stuList: data,
          isZero: isZero
        };
        var stuList = template('stuList', stuListData);
        $("#stuContainer").html(stuList);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$("#impotInfor").on("click", function () {
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
    url: '/api/user/import',
    type: 'post',
    enctype: 'multipart/form-data',
    secureuri: false,                       //是否启用安全提交,默认为false
    fileElementId: 'file',                        //文件选择框的id属性
    dataType: 'json',                       //服务器返回的格式,可以是json或xml等
    success: function (data) {
      if (data.status == 1300) {
        alert(data.msg);
        window.location.reload();
      }
      else {
        alert(data.msg);
      }
    },
    error: function (msg) {
      alert(msg.msg);
    }
  });
});

