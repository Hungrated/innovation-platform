/**
 * Created by wuli等等 on 2017/10/29.
 */
$("#info_save").hide();
$("#info_cancel").hide();

var student_id = localStorage.school_id;

window.onload = function () {
    ready();

};

$("#cancel_plan").on("click",function () {
    $("#add_plan_contanier").hide();
});
var avatar;
//初始化 获取档案
function ready() {
    $.ajax({
        type:"POST",
        url:"/api/profile/getinfo",
        data:{
            request:student_id
        },
        dataType:"json",
        success:function (data) {
            if(data[0].avatar == ""||data[0].avatar == null){
                avatar = "https://sfault-avatar.b0.upaiyun.com/389/430/3894305104-59fe90aea4ec6_huge256";
            }else{
                var str = data[0].avatar;
                var na = str.split("avatars/");
                var uH = '../upload/avatars/';
              avatar = uH + na[1]
            }
            //获取失败
            if(data.status == 2101){
                alert(data.msg)
            }else{
                var userInfo = {
                    username:data[0].name,
                    user_sex:data[0].sex,
                    std_id:data[0].school_id,
                    std_class:data[0].class_id,
                    std_school:data[0].academy,
                    std_teacher:data[0].supervisor,
                    birth:data[0].birth_date,
                    phone:data[0].phone_num,
                    description:data[0].description,
                    avatar:avatar
                };
                var base_content = template('base_content', userInfo);
                document.getElementById('userInfo').innerHTML = base_content;
            }
        },
        error:function (err) {
            console.log(err);
        }
    });

    $.ajax({
        type:"POST",
        url:"/api/plan/query",
        data:{
            request:student_id
        },
        dataType:"json",
        success:function (data) {
            var isZero;
            if(data.length==0)
            {
                isZero=1;
            }else{
                isZero=0;
            }
                var planListData = {
                    planList:data,
                    isZero:isZero
                };
            var planList = template('planList', planListData);
            $("#planContainer").html(planList);

        },
        error:function (err) {
            console.log(err);
        }
    });
}


/*var userInfo = {
    username:"马晓婷",
    user_sex:'女',
    std_id:'15051304',
    std_school:'计算机学院',
    std_class:'15052313',
    birth:'1997-10-1',
    phone:'18888888888',
    description:'不忘初心，不忘微笑'
};*/


//编辑
$("#info_edit").click(function () {
    getContent();
});

//保存按钮
$("#info_save").click(function () {
    getForm();
});

$("#info_cancel").click(function () {
    window.location.reload();
});




function getContent() {
    $("#info_save").toggle();
    $("#info_cancel").toggle();
    $("#info_edit").toggle();

    var username = $("#user_name").text();
    var user_sex = $("#user_sex").text();
    var std_id = $("#std_id").text();
    var std_class = $("#std_class").text();
    var std_school = $("#std_school").text();
    var std_teacher = $("#std_teacher").text();
    var birth = $("#birth").text();
    var phone = $("#phone").text();
    var description = $("#description").text();
    var avatar = $("#avatar")[0].src;
    var putInfo = {
        f_name:username,
        f_sex:user_sex,
        f_stdId:std_id,
        f_class:std_class,
        f_school:std_school,
        f_teacher:std_teacher,
        f_birth:birth,
        f_phone:phone,
        f_description:description,
        f_avatar:avatar
    };
    var base_form = template('base_form', putInfo);
    document.getElementById('userInfo').innerHTML = base_form;
}

function getForm() {

    var f_name = $("#f_name").val();
    var f_sex = $("#f_sex").val();
    var f_stdId = $("#f_stdId").val();
    var f_school = $("#f_school").val();
    var f_class = $("#f_class").val();
    var f_teacher = $("#f_teacher").val();
    var f_birth = $("#f_birth").val();
    var f_phone = $("#f_phone").val();
    var f_description = $("#f_description").val();

    //先把数据发送到后台
    $.ajax({
        type:'POST',
        url:'/api/profile/modify',
        data:{
            school_id:localStorage.school_id,
            sex:f_sex,
            birth_date:f_birth,
            phone_num:f_phone,
            class_id:f_class,
            supervisor:f_teacher,
            description:f_description
        },
        dataType:'json',
        success:function (data) {
            if(data.status == 2000){
                $("#info_save").toggle();
                $("#info_cancel").toggle();
                $("#info_edit").toggle();
                window.location.reload();
            }else{
                window.location.reload();
                alert(data.msg);
            }
        },
        error:function (err) {
            console.log(err);
        }
    });

   /* userInfo = {
        username:f_name,
        user_sex:f_sex,
        std_id:f_stdId,
        std_class:f_class,
        std_school:f_school,
        std_teacher:f_teacher,
        birth:f_birth,
        phone:f_phone,
        description:f_description
    };

    var base_content = template('base_content', userInfo);
    document.getElementById('userInfo').innerHTML = base_content;*/
}

function editP(obj) {
    $("#add_plan_contanier").css("display","block");
    var Inputs = $("#add_plan_contanier input");
    console.log(Inputs.length);
    var $Tr = $(obj).parents("tr");
    var Tds = $Tr.children("td");
    Inputs[0].value = Tds[0].innerHTML;
    Inputs[1].value = Tds[1].innerHTML;
    var time = Tds[2].innerHTML;
    var timeD = time.split("至");
    Inputs[2].value =timeD[0];
    Inputs[3].value = timeD[1];
    $("#submit_plan").attr("data-mode",$(obj).attr("data-mode"));
};

//添加计划
$("#plan_add").click(function () {
    $("#add_plan_contanier").css("display","block");
    $("#submit_plan").attr("data-mode","");
});


//提交计划
$("#submit_plan").click(function () {

    var year = $("#year").val();
    var term = $("#term").val();
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();
    var plan_details = $("#plan_details").val();
    var pid = $(this).attr("data-mode");
    if(pid!="")
    {
        $.ajax({
            type:'POST',
            url:"/api/plan/modify",
            data:{
                plan_id:pid,
                year:year,
                term:term,
                student_id:student_id,
                content:plan_details,
                start:start_date,
                deadline:end_date
            },
            dataType:'json',
            success:function (data) {
                if(data.status == 5100){
                    window.location.reload();
                }else{
                    alert(data.msg);
                }
            },
            error:function (err) {          //失败，回调函数
                alert('计划提交失败');
                console.log(err);
            }
        })
    }
    else
    {
        $.ajax({
            type:'POST',
            url:"/api/plan/submit",
            data:{
                year:year,
                term:term,
                student_id:student_id,
                content:plan_details,
                start:start_date,
                deadline:end_date
            },
            dataType:'json',
            success:function (data) {
                if(data.status == 5000){
                    window.location.reload();
                }else{
                    alert(data.msg);
                }
            },
            error:function (err) {          //失败，回调函数
                alert('计划提交失败');
                console.log(err);
            }
        })
    }

});


function uploadAvatar() {
    $("#avatarFile").trigger("click");
    $("#avatarFile").change(function () {
        var avatar = $("#avatarFile");
        var avatarFile = avatar[0].files;
        console.log(avatarFile);
        /*$.ajax({
           type:'POST',
            url:'/api/profile/avatar',
            data:{
                school_id:localStorage.school_id,
                file: avatar
            },
            success: function (data) {
                console.log(data);
                if (data.status == 2000) {
                    $("#avatarChange").src(data.avatar_url);
                    //window.location.reload();
                }
                else{
                    console.log(data.msg)
                }
            },
            error: function (err) {
                console.log(err);
            }
        });*/
        $.ajaxFileUpload({
            async: false,
            type: "POST",
            //处理文件上传操作的服务器端地址
            url: '/api/profile/avatar',
            enctype: "multipart/form-data",
            secureuri: false,                       //是否启用安全提交,默认为false
            fileElementId: 'avatarFile',                        //文件选择框的id属性
            dataType: "json",                       //服务器返回的格式,可以是json或xml等
            data: {
                school_id:student_id,
                file: avatarFile
            },
            success: function (data) {
                console.log(data);
                if (data.status == 2000) {
                    //console.log(data.msg)
                    window.location.reload();
                    /*$.ajax({
                        type:'POST',
                        url:'/api/profile/getavatar',
                        data:{
                            school_id:parseInt(student_id)
                        },
                        dataType:"json",
                        success:function (data) {
                            //console.log(data);
                            var src = "data:image/jpeg;base64,"+ data;
                            console.log(src);
                            $("#avatarChange").attr("src",src);
                            //获取失败
                            if(data.status == 2101){
                                alert(data.msg)
                            }else{

                            }
                        },
                        error:function (err) {
                            console.log(err);
                        }
                    })*/
                }
                else{
                    console.log(data.msg)
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    })
}