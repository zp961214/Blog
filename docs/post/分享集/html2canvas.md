---
title: JS实现页面截屏功能需求
date: 2019-5-19
word-count: 1287
---

"页面截屏"是前端经常遇到的需求，比如页面生成海报，弹窗图片分享等，因为浏览器没有原生的API，所以需要借助canvas来实现导出图片。

<!-- more -->
### 可行性方案

- **方案1**： 将 DOM 改写成 canvas ，调用canvas的toBlob或者toDataURL方法即刻上传到七牛云或服务器

- **方案2**： 使用第三方库`html2canvas.js`实现 canvas ， 在不更改页面已有DOM的情况下优雅生产canvas
### 解决方案的选择
- 方案1：需要手动计算每个DOM元素的Computed Style，然后需要计算好元素在canvas的大小位置等属性。
 
  `方案1难点`  

  1. 需要弃用已有的html页面，改用canvas重写。 
  2. 页面结构层复杂的情况下用canvas写，不易重构。
  3. 有一定canvas基础。
   
- 方案2：该项目在Github上stars已有两万多start，作者仍在积极维护。API非常简单，在已有项目中开箱即用。

#### html2canvas

因为是常见的需求，所以社区会有成熟的解决方案，首先试试社区的解决方案。工作

```html
<div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>
```

```js
html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
});
```

以上是[官网](http://html2canvas.hertzen.com/)的实例用法。在网页上出现了一个新的 canvas DOM。接下来我们只需要把canvas转换成图片就好。这里使用canva原生的toDataURL和toBlob方法上次到七牛云。

使用时需要注意。此处如果生产的画布中有跨域图片，需要配置`allowTaint`为`true`。  
如果是原生canvas实现，canvas需要所有跨域图片请求完成才可绘制。有两种解决方案
- 方案1：在`html`上写好`img`标签，src写好对应的图片url。缺点很明显，会污染页面的布局结构。

- 方案2：使用`js`，使用`new Image()`的方式。设置src到对应的图片url，在onload回调中处理相关操作。优点：可行性最高，不过有回调地狱的问题。我们用`Promise`改写一下
``` js
function asyncImage(url) {
    const img = new Image();
    img.src = url;
    img.setAttribute('crossOrigin', 'anonymous');
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}
```


好的，大功告成~是不是可以交付需求了呢？但是在移动端测试的时候发现生产的图片非常模糊。这样是不行的，明细low了许多。

github有相应的解决方案 [传送门](https://github.com/niklasvh/html2canvas/issues/390#issuecomment-208068027) ，这个回答也是解决很多人的问题
基本原理：将canvas宽高放大两倍。把css把canvas的style设置成1倍大小。

```js
    var shareContent = YourTargetElem; 
    var width = shareContent.offsetWidth; 
    var height = shareContent.offsetHeight; 
    var canvas = document.createElement("canvas"); 
    var scale = 2 || window.devicePixelRatio ; //也可以使用设备像素比

    canvas.width = width * scale; 
    canvas.height = height * scale; 
    canvas.getContext("2d").scale(scale, scale); 

    var opts = {
        scale: scale, 
        canvas: canvas, 
        logging: true, 
        width: width, 
        height: height 
    };
    html2canvas(shareContent, opts).then(function (canvas) {
        var context = canvas.getContext('2d');

        var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height);

        document.body.appendChild(img);
        $(img).css({
            "width": canvas.width / 2 + "px",
            "height": canvas.height / 2 + "px",
        })
    });
```

原理我们已经知道了，实际操作之后图像也确实清晰了很多。但是还是不能解决问题。

缩小虽然提高了清晰度，但是我们需要的图片是原始比例的大小。。

最终多次尝试无果后，选择放弃使用框架。直接用原生写可以提高开发效率。

### canvas绘制
我们知道，在高清屏的设备下，任何绘制canvas中的图像、文字、线条、形状都可能会出现模糊的问题。可通过引入 GitHub 中的 hidpi-canvas 有效地解决。
1. 首先去 GitHub 下载 hidpi-canvas.js 文件：[传送门](https://github.com/jondavidjohn/hidpi-canvas-polyfill)；
2. 在项目中引入 hidpi-canvas.js 文件;
3. 调用 getPixelRatio() 函数，得到 ratio 值；
4. 在 drawImage() 中，将 width 和 height 乘以 ratio；
5. 最终的canvas导出为Blog，转换成文件对象上传七牛云。
6. 核心代码如下
```js
    function asyncImage(url) {
        const img = new Image();
        img.src = url;
        img.setAttribute('crossOrigin', 'anonymous');
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
    async function drawCanvas(){
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');
        var ratio = getPixelRatio(context);  // 关键代码
        canvas.width = 300 * ratio; // 画布宽度
        canvas.height = 300 * ratio; // 画布高度
        var divWidth = 300 * ratio; // 用于内容居中
        var divHeight = 300 * ratio; // 用于内容居中
        const image = await asyncImage('picUrl')
        const imgWidth = 550
        const imgHeight = 300
        context.drawImage(this, 50, 50, imgWidth * ratio, imgHeight * ratio)
        // Some other code
        const Blob = canvas.toBlob((Blob)=>{
            //上传七牛云
        });
    } 
```
最终生成的图片终于清晰了...只需要根据dom的offsetWidth等适配不同屏幕就可以了。

### 总结

如果对图片的清晰度要求不高，或者图片需求是生成缩略图的情况下。采用 `html2canvas` 是非常不错的选择。
否则，还是用canvas绘制出的图片更清晰。

以上就是这次实现页面海报图片截取的实战内容了... 还是踩了不少坑的。下次遇到类似的问题，是不是可以避开这些坑了呢？