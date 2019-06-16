---
title: 完美解决打开github速度慢的问题
date: 2019-6-16
word-count: 159
---
因为总所周知的原因，国内访问 github 的速度总是上不去。
从哥们那边得知修改hosts可以提高速度~

<!-- more -->

修改 hosts（ 文件路径：`C:\Windows\System32\drivers\etc\hosts`）

打开 Dns 检测 - [站长工具](http://tool.chinaz.com/dns/)

在检测输入栏中输入`http://github.com`

把检测列表里的 TTL 值最小的 IP 输入到 hosts 里，并对应写上 github官网域名。

例子：
```md
13.250.177.223 github.com

13.250.177.223 www.github.com

192.30.255.120 nodeload.github.com
```
> 参考链接 https://www.cnblogs.com/yangzhou33/p/8407385.html
