/**
 * Created by wuli等等 on 2017/10/19.
 */
$(function () {
    $("#login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if(username == ""){
            var dialog = art.dialog({
                title: '提示',
                content: '请输入用户名！',
                lock:true,
                ok:true,
                follow: document.getElementById('logoNav')
            });
        }else if(password == ""){
            var dialog = art.dialog({
                title: '提示',
                content: '请输入密码！',
                lock:true,
                ok:true,
                follow: document.getElementById('logoNav')
            });
        }
        if(username != "" && password != "") {
            $.ajax({
                type: "POST",                   //类型，POST或者GET
                url: "http://localhost:3000/api/user/login",        //后台url
                data: {                          //数据
                    username: username,
                    password: password
                },
                dataType: 'json',              //数据返回类型，可以是xml、json等
                success: function (data) {      //成功，回调函数
                    console.log(data);
                    if (data.status == 1100){
                        localStorage.name = data.name;
                        localStorage.username = data.username;
                        localStorage.school_id = data.school_id;
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
        }
    });

    //回车事件
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#login").trigger("click");
        }
    });

    //清空input
    function reset() {
        $("#username").val("");
        $("#password").val("");
    }

});