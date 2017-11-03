/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#commentPage").addClass("active");

$(".inputSubmit").on("click",function () {
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/comments/submit",        //后台url
        data: {                          //数据
            student_id: localStorage.getItem(username),
            article_id: password
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            console.log(data);
            if (data.status == 1100){
                localStorage.username = data.username;
                location.href = ("../index.html");

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
            alert('未知错误，登录失败！');
            console.log(err);
        }
    });
});