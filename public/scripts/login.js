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
                url: "/login",        //后台url
                data: {                          //数据
                    username: username,
                    password: password
                },
                dataType: 'json',              //数据返回类型，可以是xml、json等
                success: function (data) {      //成功，回调函数
                    console.log(data);
                    if (data.result == '0') {
                        var dialog = art.dialog({
                            title: '提示',
                            content: '该用户不存在，请重新输入！',
                            lock:true,
                            ok:true,
                            follow: document.getElementById('logoNav')
                        });
                        reset();
                    } else if (data.result == '1') {
                        var dialog = art.dialog({
                            title: '提示',
                            content: '密码错误，请重新输入！',
                            lock:true,
                            ok:true,
                            follow: document.getElementById('logoNav')
                        });
                        $("#password").val("");
                    } else if(data.result == '2'){
                        location.href = ("/index");
                    }else {
                        alert('未知错误，登录失败！');
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


})