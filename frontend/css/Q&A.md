# 1、利用box-shdow实现单边阴影？

使用内阴影：

上： box-shadow: inset 0px 15px 10px -15px #000;

下： box-shadow:inset 0px -15px 10px -15px #000;

左： box-shadow:inset 15px 0px 10px -15px #000;

右：box-shadow:inset -15px 0px 10px -15px #000;

使用外阴影：

下： box-shadow: 0 10px 10px -10px gray;

# 2 、a 标签四大伪类？

​    a:link，      定义正常链接的样式；

​    a:visited， 定义已访问过链接的样式；

​    a:hover，  定义鼠标悬浮在链接上时的样式；

​    a:active，  定义鼠标点击链接时的样式。