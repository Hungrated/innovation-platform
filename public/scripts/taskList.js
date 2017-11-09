/**
 * Created by wuli等等 on 2017/11/1.
 */

function rateBTn(obj) {
    $("#pingjia").css("display","block");
    var p_id = $(obj).attr("data-mode");
    $("#rate").attr("data-mode",p_id);
};

$(function () {
    //get the student id
    var s_id = $.query.get("s_id");
    var s_name =  $.query.get("name");
    $("#stuName").text(s_name);
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/query',
        contentType: "application/json",
        data:JSON.stringify({
            'request':s_id,
        }),
        dataType:'json',
        success:function (data) {
            console.log(data);

            var taskListData = {
                taskLists:data
            };
            //console.log(postListData);
            var post = template('taskList', taskListData);
            $("#taskListContainer").html(post);
        }
    });
});
// submit comment
$("#rate").on("click",function () {
    debugger;
    var text = $("#xlginput").val();
    console.log(text);
    console.log($(this).attr("data-mode"));
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/plan/rate",        //后台url
        data: {                          //数据
            plan_id: $(this).attr("data-mode"),
            rate: 'A',
            remark:text,
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            console.log(data);
            if (data.status == 5300){
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
