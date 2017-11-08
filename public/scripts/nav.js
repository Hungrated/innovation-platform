/**
 * Created by wuli等等 on 2017/10/28.
 */
//判断登录状态改变nav
var username = localStorage.name;
if(username!=""&&username!=undefined){
    document.getElementById("userLink").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("username").innerHTML= username + "<b class='caret'></b>";
    document.getElementById("logout").style.display = "block";
}else{
    document.getElementById("userLink").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("publish").style.display = "none";
}

document.getElementById("logout").onclick = function () {
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "http://localhost:3000/api/user/logout",        //后台url
        data: {                          //数据
            username: username,
        },
        dataType: 'json',              //数据返回类型，可以是xml、json等
        success: function (data) {      //成功，回调函数
            console.log(data);
            if (data.status == 1200) {
                localStorage.username = "";
            }else{
                var dialog = art.dialog({
                    title: '提示',
                    content: data.msg,
                    lock:true,
                    ok:true,
                });
            }
        },
        error: function (err) {          //失败，回调函数
            alert('未知错误，退出失败！');
            console.log(err);
        }
    });
};