<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/9/23 0023
  Time: 下午 8:23
  To change this template use File | Settings | File Templates.
--%>
<style>
    .dropdown-menu{
        background-color: #222222;
    }

    .dropdown-menu>li>a{
        color:#fff;
    }
</style>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li id="index"><a href="/index">首页</a></li>
                <li id="post"><a href="/posts">成果展示</a></li>
                <c:if test="${! empty sessionScope.user}">
                <li id="resource"><a href="/resource">资源下载</a></li>
                <li><a href="/markdown">发布</a></li>
                </c:if>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <c:if test="${! empty sessionScope.user}">

                    <li id="userLink" class="dropdown"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">${sessionScope.user.username} <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/myArticles">我的文章</a></li>
                            <li><a href="/setting">账号设置</a></li>
                        </ul>
                    </li>
                    <li><a href="/logout">退出</a></li>
                </c:if>
                <c:if test="${ empty sessionScope.user }">
                    <li><a href="/login">登录</a> </li>
                    <li><a href="/register">注册</a> </li>
                </c:if>

            </ul>

        </div>
        <!--/.nav-collapse -->
    </div>
</nav>

<style>
    .dropdown-menu{
        background-color: #222222;
    }

    .dropdown-menu>li>a{
        color:#fff;
    }
</style>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li id="index"><a href="/index">首页</a></li>
                <li id="post"><a href="/posts">成果展示</a></li>
        
                <li id="resource"><a href="/resource">资源下载</a></li>
                <li><a href="/markdown">发布</a></li>
                            </ul>

            <ul class="nav navbar-nav navbar-right">

                    <li id="userLink" class="dropdown"><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">username <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="/myArticles">我的文章</a></li>
                            <li><a href="/setting">账号设置</a></li>
                        </ul>
                    </li>
                    <li><a href="/logout">退出</a></li>
                    <li><a href="/login">登录</a> </li>
                    <li><a href="/register">注册</a> </li>

            </ul>

        </div>
        <!--/.nav-collapse -->
    </div>
</nav>