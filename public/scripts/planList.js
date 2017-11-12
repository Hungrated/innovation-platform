/**
 * Created by Administrator on 2017/11/9 0009.
 */
$(function () {
    //get the student id
    var s_id = $.query.get("s_id");
    var s_name =  $.query.get("name");
    $("#stuName").text(s_name);
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/query',
        contentType: "application/json",
        data:JSON.stringify({
            'request':s_id,
        }),
        dataType:'json',
        success:function (data) {
            debugger;
            var isZero;
            if(data.length==0)
            {
                isZero=1;
                $("#exportW").hide();
            }else{
                isZero=0;
                exportD();
            }
            console.log(isZero);
            var taskListData = {
                taskLists:data,
                isZero:isZero
            };
            //console.log(postListData);
            var post = template('taskList', taskListData);
            $("#taskListContainer").html(post);
        }
    });

   function exportD()
   {
       $.ajax({
           type: "POST",                   //类型，POST或者GET
           url: "http://localhost:3000/api/plan/export",        //后台url
           // processData: false,  // tell jQuery not to process the data
           // contentType: false,   // tell jQuery not to set contentType
           data:{student_id: s_id},
           dataType: "json",
           /*xhr: function(){        //这是关键  获取原生的xhr对象  做以前做的所有事情
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onload = function (){
            alert('finish downloading')
            };
            xhr.upload.onprogress = function (ev) {
            if(ev.lengthComputable) {
            var percent = 100 * ev.loaded/ev.total;
            console.log(percent,ev)
            }
            };
            return xhr;
            },*/
           success:function(data){
               console.log(data);
               if(data.status == 5500)
               {
                   var ul = "../output/plans/"+data.path;
                   $("#exportW").attr("href",ul);
                   $("#exportW").attr("download",data.path);
               }
           },

           error: function (xml) {
               //     var result = xml.responseText;
               //     var jsonObject=eval("("+result+")");
               //     console.log(jsonObject.telephone);
               //
               console.log(xml);
               var str = xml.responseText;
               $(".container").append(str);
           }
       });
   }

});

function cBTn(obj) {
    var  p_id = $(obj).attr("data-mode").toString();
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/op',
        contentType: "application/json",
        data:JSON.stringify({
            'plan_id':p_id,
            'op':1
        }),
        dataType:'json',
        success:function (data) {
            if(data.status == 5200)
            {
                console.log(data);
                $(obj).parents("td").html("已通过");
        }
            else{
                console.log(data);
            }
        }
    });
}

function fBTn(obj) {
    var  p_id = $(obj).attr("data-mode").toString();
    $.ajax({
        type:'POST',
        url:'http://localhost:3000/api/plan/op',
        contentType: "application/json",
        data:JSON.stringify({
            'plan_id':p_id,
            'op':0
        }),
        dataType:'json',
        success:function (data) {
            if(data.status == 5200)
            {
                console.log(data);
                $(obj).parents("td").html("未通过");
            }
            else
            {
                console.log(data)
            }
        }
    });
}
function rBtn(obj) {
    $("#rateA").show();
    var $Tr = $(obj).parents("tr");
    var Tds = $Tr.children("td");
    var p_id = $(obj).attr("data-mode");
    $("#renwuD").text(Tds[4].innerHTML);
    $("#pingjiaD").text(Tds[5].innerHTML);
    $("#subRate").on("click",function () {
        var text = $("#pingjiaD").text();

        $.ajax({
            type: "POST",                   //类型，POST或者GET
            url: "http://localhost:3000/api/plan/rate",        //后台url
            data: {                          //数据
                plan_id:p_id,
                rate: str,
                remark:text,
            },
            dataType: 'json',              //数据返回类型，可以是xml、json等
            success: function (data) {      //成功，回调函数
                console.log(data);

                if (data.status == 5300){
                    window.location.reload();
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
                console.log(err);
            }
        });
    });

}