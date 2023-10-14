---
group:
  title: 工具
  order: -1
title: 图片转Base64
order: 0
---

## 在线转 Base64

`imageToBase64` 是一个图片转 Base64 的工具，支持 PNG、GIF、JPEG 图片转 Base64。

<code src="../demos/imageToBase64.tsx"></code>

## 概述

> Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法。 \
>  Base64 常用于在通常处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。 \
> 图片的 BASE64 编码就是可以将一幅图片数据编码成一串字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。 \
> 图片转 BASE64 编码工具提供了 PNG 转换 Base64，GIF 转换 Base64，JPEG 转换 BASE64 等各种图片的格式转换，你只需拖动图片到指定区域，即可完成操作！

### Base64 格式

```
data:[][;charset=][;base64],
```

### Base64 在 CSS 中的使用

```css
.demoImg {
  background-image: url('data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....');
}
```

### Base64 在 HTML 中的使用

```html
<img
  width="40"
  height="30"
  src="data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL...."
/>
```

### Base64 在 MD 中的使用

```md
![图片描述](data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....)
```
