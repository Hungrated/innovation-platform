;(function($){

  var xSlider = function(el, userConfig) {

    var _this = this
    this.el = el

    // 参数配置
    this.userConfig = userConfig
    this.config = {
      w: this.el.width(),
      current: 0,
      speed: 500,
      intervalTime: 2000
    }
    if(userConfig != null) {
      $.extend(this.config,this.userConfig);
    }

    // 保存查找dom元素
    var slider_img = this.el.children('.slider-img')
    var slider_img_ul = slider_img.children('ul')
    var slider_img_ul_li = slider_img_ul.children('li')

    // 初始化左右按钮
    this.el.append('<a href="javascript:" class="slider-btn slider-btn-left">&lt;</a>')
    this.el.append('<a href="javascript:" class="slider-btn slider-btn-right">&gt;</a>')
    var slider_btn_left = this.el.children('.slider-btn-left')
    var slider_btn_right = this.el.children('.slider-btn-right')

    // 初始化圆点
    this.el.append('<div class="slider-dot"><ul></ul></div>')
    var slider_dot = this.el.children('.slider-dot')
    var slider_dot_ul = slider_dot.children('ul')
    var slider_img_length = slider_img_ul_li.length
    for (var i = 0; i < slider_img_length - 2; i++) {
      if(i === this.config.current){
        slider_dot_ul.append('<li class="active"></li>')
      } else {
        slider_dot_ul.append('<li></li>')
      }
    }
    var slider_dot_ul_li = slider_dot_ul.children('li')

    // 初始化默认显示图片位置
    slider_img_ul.css('left', - this.config.w * this.config.current - this.config.w)

    // 圆点切换点亮
    var active = function(i) {
      slider_dot_ul_li.removeClass('active')
      slider_dot_ul_li.eq(i).addClass('active')
    }

    // 右点击事件
    slider_btn_right.on('click', function(event) {
      event.preventDefault()
      if(_this.config.current < slider_img_length - 2){
        toggleInterval ()
        _this.config.current ++
        if(_this.config.current != slider_img_length - 2) {
          slider_img_ul.stop(true, false).animate({left: - _this.config.w * _this.config.current - _this.config.w}, _this.config.speed, function () {
            active(_this.config.current)
          })
        }
        if (_this.config.current === slider_img_length - 2) {
          slider_img_ul.stop(true, false).animate({left: - _this.config.w * _this.config.current - _this.config.w}, _this.config.speed, function() {
            slider_img_ul.css('left', - _this.config.w)
            _this.config.current = 0
            active(_this.config.current)
          })
        }
      }
    })

    // 左点击事件
    slider_btn_left.on('click', function(event) {
      event.preventDefault()
      if(_this.config.current > -1){
        toggleInterval ()
        _this.config.current --
        if(_this.config.current != -1){
          slider_img_ul.stop(true, false).animate({left: - _this.config.w * _this.config.current - _this.config.w}, _this.config.speed, function() {
            active(_this.config.current)
          })
        }
        if(_this.config.current === -1){
          slider_img_ul.stop(true, false).animate({left: 0}, _this.config.speed, function() {
            slider_img_ul.css('left', - _this.config.w * (slider_img_length - 2))
            _this.config.current = slider_img_length - 3
            active(_this.config.current)
          })
        }
      }
    })

    // dot点击事件
    slider_dot_ul_li.on('click', function(event) {
      event.preventDefault()
      toggleInterval ()
      var index = $(this).index()
      active(index)
      slider_img_ul.stop(true, false).animate({left: - _this.config.w * index - _this.config.w}, _this.config.speed, function() {
        _this.config.current = index
      })
    })

    // 自动切换
    var sliderInt = setInterval(sliderInterval, _this.config.intervalTime)
    // 判断图片切换
    function sliderInterval() {
      if (_this.config.current < slider_img_length - 2) {
        _this.config.current ++
        slider_img_ul.stop(true, false).animate({left: - _this.config.w * _this.config.current - _this.config.w}, _this.config.speed, function() {
          active(_this.config.current)
          if (_this.config.current === slider_img_length - 2) {
            slider_img_ul.css('left', - _this.config.w)
            _this.config.current = 0
            active(_this.config.current)
          }
        })
      }
    }
    // 重置计时器
    function toggleInterval () {
      clearInterval(sliderInt)
      sliderInt = setInterval(sliderInterval, _this.config.intervalTime)
    }

  } // --end-- xSlider

  $.fn.extend({
    xSlider: function() {
      new xSlider($(this))
    }
  })

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

})(jQuery)

var config = {
  current: 0,
  speed: 500,
  intervalTime: 2000
}
$('.slider').xSlider(config)
