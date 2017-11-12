/**
 * Created by wuli等等 on 2017/10/26.
 */
var testEditor;
//取消提交
function cancel() {
    $("#save").css("display", "none");
}
function selectThis(point) {
    //debugger;
    var selectOne;
    selectOne = $(point).html();
    if(selectOne == "文章")
    {
        $("#articleF").show();
        $("#noticeF").hide();
        $("#sub").show();
        $("#submitT").attr("data-mode","0");
    }
    else
    {
        $("#articleF").hide();
        $("#noticeF").show();
        $("#sub").show();
        $("#submitT").attr("data-mode","1");
    }
}

//提交
function mySubmit() {
    var isjudge;
    isjudge = $("#submitT").attr("data-mode");
    var file = testEditor.getMarkdown();
    if(isjudge == "0")
    {
        //var articleName = $("#articleName").val();
        var articleName = document.getElementById("artTitle").value;
        if (articleName == "") {
            alert("文章名不能为空");
            return false;
        }
        if (file != null) {
            var articleId=$("#articleId").val();
            var description= $(".editormd-preview").text();
            description = description.substring(0,200);
            //alert(articleid);
            if(articleId==""){
                $.ajax({
                    type: "POST",
                    url: 'http://localhost:3000/api/blog/publish',
                    data: {
                        type:'project',
                        content: file,
                        title: articleName,
                        description:description,
                        author_id:localStorage.school_id
                        //artLabel: label,
                        //cover:coverAddress
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 3000) {
                            alert("提交成功，跳转到我的文章列表！");
                            location.href = "../index.html";//成功后将页面跳转到我的文章列表
                        }
                        else {
                            alert(data.msg);
                        }
                    },
                    error:function (e) {
                        console.log(e);
                    }
                })
            }else {
                //alert("编辑文章");
                $.ajax({
                    type: "post",
                    url: '../modifyBlog',
                    data: {
                        type:'project',
                        content: file,
                        title: articleName,
                        description:"",
                        authorID:1
                    },
                    dataType: "json",
                    success: function (date) {
                        if (date.result == "success") {
                            alert("提交成功，返回文章预览界面！");
                            location.href = "/postDetail/"+date.artI;//成功后将页面跳转到我的博客
                        }
                        else  alert(date.result);
                    }
                })
            }

        }
    }
    else if(isjudge == "1")
    {
        var problemName = document.getElementById("notTitle").value;
        if (problemName == "") {
            alert("问题标题不能为空");
            return false;
        }

        if (file != null) {
            // var articleId=$("#articleId").val();
            // alert(articleid);

            $.ajax({
                type: "POST",
                url: '/addNotice',
                data: {
                    ncontext: file,
                    ntitle: problemName,
                },
                dataType: "json",
                success: function (date) {
                    if (date.result == "success") {
                        alert("提交成功，返回首页！");
                        location.href = "../index";//成功后将页面跳转到我的博客
                    }
                    else  alert(date.result);
                }
            })


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