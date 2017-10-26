/**
 * Created by Administrator on 2017/10/26 0026.
 */
/**
 * Created by Administrator on 2017/10/23 0023.
 */
var interaction = function () {};
interaction.prototype = {
    fetch:function (type,url,data,cb,funE) {
        $.ajax({
            url: url,
            method: method,
            data: data,
            contentType:"application/json",
            success: function (json) {
                cb(json);
            },
            error: function (json) {
                funE(json);
            }
        });
    }
};
function sumbitS(obj) {
    if(obj.status == 3000)
    {
        alert("提交成功，跳转到我的文章界面");
        location.href = "/myArticles";//成功后将页面跳转到我的文章列表
    }

}
function editS(obj) {
    alert("提交成功，返回文章预览界面！");
    location.href = "/postDetail/"+obj.artI;//成功后将页面跳转到我的博客
}
// 提交按钮
document.getElementById("submitT").onclick = function mySubmit() {
    var Ajax = new interaction();
    var isjudge;
    isjudge = $("#submitT").attr("data-mode");
    var file = testEditor.getMarkdown();
    if(isjudge == "0")
    {
        var articleName = document.getElementById("artTitle").value;
        if (articleName == "") {
            alert("文章名不能为空");
            return false;
        }
        /*
         var is_public = document.getElementById("is_public").value;
         if (is_public == "on")is_public = 1;
         else is_public = 0;
         */
        var label = document.getElementById("label").value;
        var coverAddress = document.getElementById("coverAddress").value;
        console.log(coverAddress);
        if (label == "") {
            alert("标签不能为空！");
            return false;
        }
        if (file != null) {
            var articleId=$("#articleId").val();
            if(articleId==""){
                var data ={
                    content: file,
                    title: articleName,
                    description: label,
                    cover:coverAddress,
                    cover_url:'',
                    photo_url:'',
                    author_id:''
                };
                Ajax.fetch('POST','/publish',data,sumbitS,function(obj){alert(obj.msg);});
            }else {
                var editData = {
                    artContent: file,
                    artTitle: articleName,
                    artLabel: label
                };
                Ajax.fetch('POST','/.',data,editS,function(obj){alert(obj.result);});
            }

        }
    }
    else if(isjudge == "1")
    {
        var noticeName = document.getElementById("notTitle").value;
        if (noticeName == "") {
            alert("公告名不能为空");
            return false;
        }

        if (file != null) {
            // var articleId=$("#articleId").val();
            // alert(articleid);
            var noticeData =  {
                ncontext: file,
                ntitle: noticeName,
            };
            Ajax.fetch('POST','/addNotice',data,sumbitS("首页！","../index"),function(obj){alert(obj.result);});
            //alert("编辑文章");
            /*$.ajax({
             type: "post",
             url: /modifyBlog',
             data: {
             artContent: file,
             artTitle: articleName,
             artLabel: label
             },
             dataType: "json",
             success: function (date) {
             if (date.result == "success") {
             alert("提交成功，返回文章预览界面！");
             location.href = "/blogView";//成功后将页面跳转到我的博客
             }
             else  alert(date.result);
             }
             })*/


        }
    }

    return false;
}


function themeSelect(id, themes, lsKey, callback) {
    var select = $("#" + id);

    for (var i = 0, len = themes.length; i < len; i++) {
        var theme = themes[i];
        var selected = (localStorage[lsKey] == theme) ? " selected=\"selected\"" : "";
        select.append("<option value=\"" + theme + "\"" + selected + ">" + theme + "</option>");
    }

    select.bind("change", function () {
        var theme = $(this).val();

        if (theme === "") {
            alert("theme == \"\"");
            return false;
        }

        console.log("lsKey =>", lsKey, theme);

        localStorage[lsKey] = theme;
        callback(select, theme);
    });

    return select;
}
//渲染编辑器
$(function () {
    $('.tooltipped').tooltip({delay: 5  });
    testEditor = editormd("test-editormd", {
        width: "100%",
        height: 760,
        path: '../editor/lib/',
        theme: "default",
        previewTheme: "default",
        editorTheme: "default",
        /*toolbarIcons : function() {
         // Or return editormd.toolbarModes[name]; // full, simple, mini
         // Using "||" set icons align right.
         return ["undo", "redo", "|", "bold", "hr","h1","h2","h3","h4","h5", "|", "image", "fullscreen","preview", "watch", "code-block","|",  "info",  "watch", "fullscreen", "preview"]
         },*/
        codeFold: true,
        //syncScrolling : false,
        saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
        searchReplace: true,
        //watch : false,                // 关闭实时预览
        //toolbar  : false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji: true,
        taskList: true,
        tocm: true,         // Using [TOCM]
        tex: true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart: true,             // 开启流程图支持，默认关闭
        sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
        //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
        //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
        //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
        //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
        imageUpload: false,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        //imageUploadURL: "/img_upload",
        onload: function () {
            console.log('onload', this);
            //设置工具栏自动固定定位
            testEditor.setToolbarAutoFixed(true);
            //this.fullscreen();
            //this.unwatch();
            //this.watch().fullscreen();

            //this.setMarkdown("#PHP");
            //this.width("100%");
            //this.height(480);
            //this.resize("100%", 640);
            var keyMap1 = {
                "Ctrl-/": function (cm) {
                    $.proxy(testEditor.toolbarHandlers.help, testEditor)();
                }
            };

            this.addKeyMap(keyMap1);

        }
    });
    //打印
    /*
     $("#print-btn").click(function () {
     /*
     var html = testEditor.preview.html();
     document.write('<link rel="stylesheet" href="css/style.css" /><link rel="stylesheet" href="../css/editormd.css" />' + html);
     window.print();
     }); */

    //返回
    $("#back").click(function () {
        history.back()
    });

    //提交
    $("#submit").click(function () {
            $("#save").css("display", "block");
        }

    );

    //主题修改
    themeSelect("editormd-theme-select", editormd.themes, "theme", function ($this, theme) {
        testEditor.setTheme(theme);
    });

    themeSelect("editor-area-theme-select", editormd.editorThemes, "editorTheme", function ($this, theme) {
        testEditor.setCodeMirrorTheme(theme);
        // or testEditor.setEditorTheme(theme);
    });

    themeSelect("preview-area-theme-select", editormd.previewThemes, "previewTheme", function ($this, theme) {
        testEditor.setPreviewTheme(theme);
    });
});
