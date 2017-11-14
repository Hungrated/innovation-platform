/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#commentPage").addClass("active");

$(".inputSubmit").on("click",function () {
    $.ajax({
        type: "POST",                   //类型，POST或者GET
        url: "/api/comments/submit",        //后台url
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

//原插件代码
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49937515-1', 'auto');
ga('send', 'pageview');

document.body.className = document.body.className.replace(/(^|\s)is-noJs(\s|$)/, "$1is-js$2");

/* <![CDATA[ */
var obvInit = {"api":"https:\/\/fatesinger.com\/__api\/","nonce":"4a8d3d57b4","user":"0","permalink":"https:\/\/fatesinger.com\/78012","id":"78012","single":"1","preview":"","webp":"image\/webp,*\/*;q=0.8"};
/* ]]> */