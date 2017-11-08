/**
 * Created by wuli等等 on 2017/10/19.
 */
$(function () {
    $("#submitBtn").click(function () {
        var password = $("#password").val();
        var new_password = $("#new_password").val();
        var rpw = $("#rpw").val();
        if(password != ""&&new_password!="" && rpw != "") {
            if (new_password === rpw) {
                $.ajax({
                    type: "POST",                   //类型，POST或者GET
                    url: "http://localhost:3000/api/user/pwdmod",        //后台url
                    data: {                          //数据
                        username: localStorage.username,
                        password: password,
                        new_password:new_password
                    },
                    dataType: 'json',              //数据返回类型，可以是xml、json等
                    success: function (data) {      //成功，回调函数
                        console.log(data);
                        if (data.status == 1400) {
                            var dialog = art.dialog({
                                title: '提示',
                                content: '修改成功，即将跳转到个人资料页面！',
                                lock:true,
                                follow: document.getElementById('logoNav'),
                                time:3
                            });
                            location.href = "userInfo.html";
                        }
                        else {
                            console.log(data.msg);
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