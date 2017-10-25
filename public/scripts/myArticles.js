/**
 * Created by wuli等等 on 2017/10/19.
 */
function deleteArticle(id) {
    if(confirm('确定删除这篇文章吗？')){
        $.post("/deleteArticle",{articleId:id},function (data) {
            if(data.result == 'success'){
                location.href = '/myArticles';
            }else{
                alert("删除出错了...请稍后重试！")
            }
        })
    }
}