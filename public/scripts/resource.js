/**
 * Created by wuli等等 on 2017/10/19.
 */
// 全局变量 待优化
var fileName = new Array();

var i;
$(function () {
  var uH = '../upload/sources/';
  $.ajax({
    type: "POST",                   //类型，POST或者GET
    url: "/api/file/query",        //后台url
    data: {                          //数据
      request: 'all'
    },
    dataType: 'json',              //数据返回类型，可以是xml、json等
    success: function (data) {      //成功，回调函数
      data.forEach(function (e) {
        var str = e.url;
        var na = str.split("sources/");
        e.url = uH + na[1];
        e.file = na[1];
      });
      var isZero;
      if (data.length == 0) {
        isZero = 1;
      } else {
        isZero = 0;
      }
      var taskListData = {
        taskLists: data,
        isZero: isZero
      };
      //console.log(postListData);
      var post = template('taskList', taskListData);
      $("#taskListContainer").html(post);
    },
    error: function (err) {          //失败，回调函数
      console.log(err);
    }
  });
  i = 1;
});
$("#resource").addClass("active");

// 上传多个文件和学号、描述
$("#uploadfile").on("click", function () {
  $("#desinput1").show();
  var des = '';
  var Texts = $(".desinput");
  for (var j = 0; j < Texts.length - 1; j++) {
    des = des + Texts[j].value + ',';
  }
  des = des + Texts[j].value;
  console.log(des);
  console.log(fileName);
  $.ajaxFileUpload({
    //处理文件上传操作的服务器端地址
    url: '/api/file/upload',
    type: 'post',
    enctype: "multipart/form-data",
    secureuri: false,                       //是否启用安全提交,默认为false
    fileElementId: fileName,                        //文件选择框的id属性
    data: {
      school_id: localStorage.school_id,
      descriptions: des
    },
    success: function (rawData) {
      debugger;
      var str = $(rawData).find("body").text();//获取返回的字符串
      var data = $.parseJSON(str);//把字符串转化为json对象
      console.log(rawData, data);
      if (data.status == 4000) {
        debugger;
        alert(data.msg);
        window.location.reload();
      }
      else {
        alert(data.msg);
        debugger;

        window.location.reload();
      }
    },
    error: function (data) {
      debugger;

      alert(data.msg);
      window.location.reload();
    }
  });
  // supplement data
  var text = $("#desinput").text();

});


function addNew(obj) {
  $(obj).parent("a").hide();
  fileName.push('file' + i)
  var dess = '第' + i + '个文件描述:<input type="text" class="form-control input-xl desinput"  placeholder="">';
  $("#textArr").append(dess);
  i++;
  var str = '<a  class="file pull-right">选择文件<input onchange="addNew(this)"  type="file" name="files" id="file' + i + '" ></a>';
  $("#uploadArr").append(str);
}


