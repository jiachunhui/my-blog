---
group: 学习笔记
title: Javascript 学习笔记
order: 100
---

### 静态资源设置跨域
:::warning 注意
前端使用 canvas 加载图片时，由于图片跨域问题，报如下错误。\
canvas 生成图片 toDataURL 报错(Uncaught DOMException: Failed to execute ‘toDataURL‘ on ‘HTMLCanvasEl)
:::
```js
var img = new Image();
img.setAttribute('crossOrigin', 'anonymous'); //关键
img.src = url + '?time=' + new Date().valueOf();
img.src = '图片地址';

```
前端调用图片，一定要给加了随机数做参数，因为图片缓存也会使 Canvas 访问不到图片
