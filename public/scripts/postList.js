/**
 * Created by wuli等等 on 2017/10/19.
 */
$("#post").addClass("active");
// var searchType = $("#searchType");
//var searchValue = $("#searchValue");
// console.log($("#postCount").val());
$('#pagination').jqPaginator({
    totalCounts:parseInt($("#postCount").val()),
    totalPages: parseInt($("#pageCount").val()),
    pageSize: 5,
    currentPage:parseInt($("#currentPage").val()),
    onPageChange: function (num, type) {
        if(type == "change"){
            location.href = "/articleList/page=" + num;
        }
    }
});