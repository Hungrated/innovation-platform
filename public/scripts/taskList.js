/**
 * Created by wuli等等 on 2017/11/1.
 */

function rateBTn(obj) {
    $("#pingjia").css("display","block");
    var p_id = $(obj).attr("data-mode");
    $("#rate").attr("data-mode",p_id);
    var $Tr = $(obj).parents("tr");
    var Tds = $Tr.children("td");
    $("#xlginput").val(Tds[6].innerHTML+';\n');
};

$(function () {
    //get the student id
    var s_id = $.query.get("s_id");
    var s_name =  $.query.get("name");
    $("#stuName").text(s_name);
    $.ajax({
        type:'POST',
        url:'/api/plan/query',
        contentType: "application/json",
        data:JSON.stringify({
            'request':s_id,
        }),
        dataType:'json',
        success:function (data) {
            console.log(data);
            var isZero;
            if(data.length==0)
            {
                isZero=1;
            }else{
                isZero=0;
            }
            var taskListData = {
                taskLists:data,
                isZero:isZero
            };
            //console.log(postListData);
            var post = template('taskList', taskListData);
            $("#taskListContainer").html(post);
        }
    });
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#rate").trigger("click");
        }
    });
});
// submit comment
$("#rate").on("click",function () {
    var text = $("#xlginput").val();
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "/api/plan/rate",        //后台url
        data: {                          //数据
            plan_id: $(this).attr("data-mode"),
            rate: '',
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
$("#dele").on("click",function () {
    $("#xlginput").val("");
    $("#pingjia").css("display","none");
});