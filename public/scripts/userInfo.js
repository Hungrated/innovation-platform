/**
 * Created by wuli等等 on 2017/10/29.
 */
$("#info_save").hide();
$("#info_cancel").hide();
//初始化
var userInfo = {
    username:"马晓婷",
    user_sex:'女',
    std_id:'15051304',
    std_school:'计算机学院',
    std_identity:'本科生',
    birth:'1997-10-1',
    phone:'18888888888',
    description:'不忘初心，不忘微笑'
};
var base_content = template('base_content', userInfo);
document.getElementById('userInfo').innerHTML = base_content;

//编辑
$("#info_edit").click(function () {
    getContent();
});

//保存按钮
$("#info_save").click(function () {
    getForm();
});

$("#info_cancel").click(function () {
    $("#info_save").toggle();
    $("#info_cancel").toggle();
    $("#info_edit").toggle();

    //从后台获取数据
});

//获取计划列表
var list = {
    planList:[{
        date:'2017.10.22-2017.12.12',
        content:'学习软件设计模式',
        state:'审核通过'
    },
        {
            date:'2017.9.12-2017.10.20',
            content:'node.js + Express',
            state:'已完成'
        }
    ]
};

var planList = template('planList', list);
$("#planContainer").html(planList);

function getContent() {
    $("#info_save").toggle();
    $("#info_cancel").toggle();
    $("#info_edit").toggle();

    var username = $("#user_name").text();
    var user_sex = $("#user_sex").text();
    var std_id = $("#std_id").text();
    var std_school = $("#std_school").text();
    var std_identity = $("#std_identity").text();
    var birth = $("#birth").text();
    var phone = $("#phone").text();
    var description = $("#description").text();
    var putInfo = {
        f_name:username,
        f_sex:user_sex,
        f_stdId:std_id,
        f_school:std_school,
        f_identity:std_identity,
        f_birth:birth,
        f_phone:phone,
        f_description:description
    };
    var base_form = template('base_form', putInfo);
    document.getElementById('userInfo').innerHTML = base_form;
}

function getForm() {
    $("#info_save").toggle();
    $("#info_cancel").toggle();
    $("#info_edit").toggle();

    var f_name = $("#f_name").val();
    var f_sex = $("#f_sex").val();
    var f_stdId = $("#f_stdId").val();
    var f_school = $("#f_school").val();
    var f_identity = $("#f_identity").val();
    var f_birth = $("#f_birth").val();
    var f_phone = $("#f_phone").val();
    var f_description = $("#f_description").val();

    //先把数据发送到后台


    userInfo = {
        username:f_name,
        user_sex:f_sex,
        std_id:f_stdId,
        std_school:f_school,
        std_identity:f_identity,
        birth:f_birth,
        phone:f_phone,
        description:f_description
    };

    var base_content = template('base_content', userInfo);
    document.getElementById('userInfo').innerHTML = base_content;
}

//添加计划
$("#plan_add").click(function () {
    $("#add_plan_contanier").css("display","block");
});

//提交计划
$("#submit_plan").click(function () {
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();
    var plan_details = $("#plan_details").val();
    var student_id = localStorage.school_id;

    $.ajax({
        type:'POST',
        url:"http://localhost:3000/api/plan/submit",
        data:{
            student_id:student_id,
            content:plan_details,
            start_time:start_date,
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
});