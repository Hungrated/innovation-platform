/**
 * Created by wuli等等 on 2017/10/19.
 */
$(function () {
    $("#submitBtn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var rpw = $("#rpw").val();
        if(username != "" && password != "" && rpw != "") {
            if (password === rpw) {
                console.log(username);
                $.ajax({
                    type: "POST",                   //类型，POST或者GET
                    url: "/register",        //后台url
                    data: {                          //数据
                        username: username,
                        password: password
                    },
                    dataType: 'json',              //数据返回类型，可以是xml、json等
                    success: function (data) {      //成功，回调函数
                        console.log(data);
                        if (data.result == '1') {
                            var dialog = art.dialog({
                                title: '提示',
                                content: '注册成功，即将跳转到登录页面！',
                                lock:true,
                                follow: document.getElementById('logoNav'),
                                time:3
                            });
                            location.href = "/login";
                        } else if (data.result == '2') {
                            alert("该账号已存在！");
                            reset();
                        }
                        else {
                            alert('未知错误，注册失败！');
                            reset();
                        }
                    },
                    error: function (err) {          //失败，回调函数
                        console.log(err);
                    }
                });
            }else {
                alert("两次输入的密码不一致，请再次确认密码！");
                $("#rpw").val("");
            }
        }
    });

    //回车事件
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#submitBtn").trigger("click");
        }
    });

    //重置按钮实现
    $("#reset").click(function () {
        reset();
    });

    //清空input
    var reset = function () {
        $("#username").val("");
        $("#password").val("");
        $("#rpw").val("");
    }

})