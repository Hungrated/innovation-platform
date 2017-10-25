/**
 * Created by Administrator on 2017/9/30 0030.
 */

function checkID() {

    var usr = localStorage.getItem("username");
    var psw = localStorage.getItem("password");
    if(usr!==null)
    {
        $('#username').val(usr);
        $('#password').val(psw)
    }
}
$("body").keydown(function(){
    if(event.keyCode ==13){
        var submit = $(".submit");
        if(submit){
            $(".submit").trigger("click");
            submit = null;
        }else{
            // $(".signup-submit").trigger("click");
        }
    }
});

//检查是否有特殊字符
function checkForms(e){
    var iu, iuu, regArray=new Array(" ","◎","■","●","№","↑","→","↓","!","@","#"+
        "$","%","^","&","*","(",")","_","-","+"+
        "=","|","[","]","？","~","`","!","<",">","‰","→","←","↑","↓","¤","§","＃","＆","＆","＼","≡","≠"+
        "≈","∈","∪","∏","∑","∧","∨","⊥","‖","‖","∠","⊙","≌","≌","√","∝","∞","∮"+
        "∫","≯","≮","＞","≥","≤","≠","±","＋","÷","×","/","Ⅱ","Ⅰ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅹ","Ⅻ","一","二"+
        "╄","╅","╇","┻","┻","┇","┭","┷","┦","┣","┝","┤","┷","┷","┹","╉","╇","【","】"+
        "三","四","五","六","七","八","九","十","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","┌","├","┬","┼","┍","┕","┗","┏","┅","—"+
        "〖","〗","←","〓","☆","§","□","‰","◇","＾","＠","△","▲","＃","℃","※",".","≈","￠");
    iuu=regArray.length;
    $(e).parent().parent().find("span").hide();
    for(iu=0;iu<=iuu;iu++){
        // var str = e.value;
        var qq =$(".test1").val();
        // if (document.Gforms.username.value.indexOf(regArray[iu])!=-1)
        var a = regArray[iu];
        if (qq.indexOf(a) >=0)
        {
            $(e).focus();
            var text = "*Can not include "+ regArray[iu]+"";
            $(e).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;" + text + "</span>");
            return false;
        }
    }
    return true;
}
//检验邮箱
function CheckMail(mail) {
    $(mail).parent().parent().find("span").hide();
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) return true;
    else {
        $(mail).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*E-mail format is not correct！</span>");
        // alert('您的电子邮件格式不正确');
        return false;}
}
//检验密码
function checkPassword(point) {
    $(point).parent().parent().find("span").hide();
    var pwd = $(point).val();
    if (pwd.indexOf(" ") >= 0)
    // alert("输入有空格！");
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be the input Spaces！</span>");
    // window.U.prompt("modal-mention","错误提示","密码不能输入空格！");
    if ($(point).val() == "") {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be empty！</span>");
        // window.U.prompt("modal-mention","错误提示","密码不能为空！");
        // alert("密码不能为空！");
        //$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>");
        $(point).focus();
        return false;
    }
    if (pwd.length < 6) {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*The password may not be less than 6 digits！</span>");
        // window.U.prompt("modal-mention","错误提示","密码不能少于6位数！");
        // alert("密码不能少于6位数");
        $(point).focus();
        return false;
    }
    return true;
}