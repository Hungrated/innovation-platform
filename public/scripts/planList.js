/**
 * Created by Administrator on 2017/11/9 0009.
 */
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
            $("#stuName").html(data[0].name);
            var taskListData = {
                taskLists:data
            };
            //console.log(postListData);
            var post = template('taskList', taskListData);
            $("#taskListContainer").html(post);
        }
    });

});

function cBTn(obj) {
    var  p_id = $(obj).attr("data-mode").toString();
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/op',
        contentType: "application/json",
        data:JSON.stringify({
            'plan_id':p_id,
            'op':1
        }),
        dataType:'json',
        success:function (data) {
            if(data.status == 5200)
            {
                console.log(data);
                $(obj).parents("td").html("已通过");
        }
            else{
                console.log(data);
            }
        }
    });
}

function fBTn(obj) {
    debugger;
    var  p_id = $(obj).attr("data-mode").toString();
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/op',
        contentType: "application/json",
        data:JSON.stringify({
            'plan_id':p_id,
            'op':0
        }),
        dataType:'json',
        success:function (data) {
            if(data.status == 5200)
            {
                console.log(data);
                $(obj).parents("td").html("未通过");
            }
            else
            {
                console.log(data)
            }
        }
    });
}

$("#exportW").on("click",function () {
    debugger;
    var s_id = $.query.get("s_id");
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/plan/export",        //后台url
        data: {                          //数据
            student_id: s_id,
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            debugger;
            console.log(data.msg);

        },
        error: function (err) {          //失败，回调函数
            debugger;
            console.log(err);
        }
    });
});
function exprotT() {

}