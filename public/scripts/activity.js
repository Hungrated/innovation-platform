/**
 * Created by wuli等等 on 2017/10/19.
 */
    $("#activityPage").addClass("active");

    $(function() {
        $('.gallery-bottom a').Chocolat();

    });
    $("#addBtn").on("click",function () {
        $("#addAct").show();
        $(this).hide();
    });
$("#cancelBtn").on("click",function () {
    $("#addBtn").show();
    $("#addAct").hide();
});

function change(){
    document.getElementById("upload_file_tmp").value=document.getElementById("upload_file").value;
}