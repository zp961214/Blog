---
title: 使用electron将web页面打包为桌面应用
date: 2019-3-24
word-count: 689
---

Dash是一个非常棒的软件，在里面查询API很方面，但是他没有windows版本...，在mac上也是要收费的...，

好在有[DevDocs](<https://devdocs.io/>)，功能与Dash一样，界面排版也都差不多，就是没有桌面版本

好，那我们用electron把它做成一个桌面软件~

<!-- more -->

### 从官网上clone一个例子

`git clone https://github.com/electron/electron-quick-start`

`cd electron-quick-start`

`yarn install`

`yarn start`

如果安装失败，可以使用`cnpm`安装

项目跑起来之后，就会出现electron的桌面页面，提供了本地开发环境，大概看一下入口文件`main.js` 和`package.json`

修改main.js，注释掉loadFile方法，改用loadURL打包我们的网页

```js
// and load the index.html of the app.
// mainWindow.loadFile('index.html')
// and load a webpage URL of the app
   mainWindow.loadURL('https://devdocs.io')
```

```json
// pageage.json
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^4.1.1"
  }
```

当前目录中的index.html就是入口文件。

### 安装依赖，对当前项目进行打包

`yarn add electron-packager --save-dev`

`electron-packager`是打成 exe 文件的插件。`执行命令需要额外的目录（比如 dist ），且目录下有 package.json 和入口文件 (如 electron.js )，否则打包会报错`

1.在当前文件中新建 `dist` 目录，复制`main.js`到`dist`目录下，命名为`electron.js`

```js
  // main.js
  // and load the index.html of the app.
  mainWindow.loadFile('../index.html') //修改对应的index.html路径
```

2.复制`package.json`到`dist `文件目录下

修改该文件入口

```json
// package.json
"main": "electron.js",
```

3.在项目的`package.json`中（注意不是 dist 下的`package.json`）为之前下载好的`electron-packager`，增加一条启动命令

```json
 "scripts": {
    "start": "electron .",
    "electron_build": "electron-packager ./dist Devdocs --platform=win32 --arch=x64 -icon=./icon/icon.ico --overwrite"   
  }
```

`electron-packager <sourcedir> <appname> –platform=<platform> –arch=<arch> [optional flags…]`

- `sourcedir`: 资源(dist/package.json)路径，在本例中既是`./dist/`
- `appname`:打包出的exe名称,这里取名为`Devdocs`
- `platform` :平台名称（ windows 是 win32 ）
- `arch`: 版本，本例为x64
- `optional `: 额外的配置（选填）

本例中选填参数用到了`icon`自定义图标与`overwrite`覆盖，其中`icon`仅支持ico格式图标，且分辨率最好为`256X256` ，否则会模糊。（PS：这里推荐一个[在线图片格式转换网站](https://image.online-convert.com/convert-to-ico)，实用方便~）

4.生成exe
执行`npm run electron_build`，可以看到项目目录中多了一个`Devdocs-win32-x64`文件，找到里面的Devdocs.exe运行即可。

<!-- ![1553427234902](https://github.com/zp961214/Blog/blob/master/design/1553427234902.png) -->

5.修改.exe图标

也可以通过下载安装[Resource Hacker](https://link.jianshu.com/?t=http%3A%2F%2Fwww.angusj.com%2Fresourcehacker%2F)。在.exe文件上鼠标右键，更换图标后保存即可。

