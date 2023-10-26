---
group: 学习笔记
title: CSS
order: 100
toc: content
---

## CSS

### all 快速将一个元素的样式清空

```css
button {
  all: unset;
}
```

### CSS 动画的播放状态

"animation-play-state"是一个 CSS 属性，用于控制动画的播放状态。它可以有以下三个值：

1. "running"（运行中）：表示动画正在播放。
2. "paused"（暂停）：表示动画已暂停，将停止播放。
3. "initial"（初始状态）：表示动画将从初始状态开始播放。

通过设置"animation-play-state"属性，可以控制动画的播放和暂停，从而实现对动画的控制。

```
animation-play-state: paused;
```

### 超出文本截断省略号

```css
/*多行 */
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
-webkit-line-clamp: 2;
```

```css
/*单行 */
overflow: hidden;
white-space: nowrap;
-o-text-overflow: ellipsis;
text-overflow: ellipsis;
```

### 常用字体设置

```css
/*苹方字体*/
//_苹方-简 常规体_
font-family: PingFangSC-Regular, sans-serif;
//苹方-简 极细体
font-family: PingFangSC-Ultralight, sans-serif;
//苹方-简 细体
font-family: PingFangSC-Light, sans-serif;
//苹方-简 纤细体
font-family: PingFangSC-Thin, sans-serif;
//苹方-简 中黑体
font-family: PingFangSC-Medium, sans-serif;
//苹方-简 中粗体
font-family: PingFangSC-Semibold, sans-serif;
//苹方-繁 ：
font-family: PingFangTC-Regular, sans-serif;
font-family: PingFangTC-Ultralight, sans-serif;
font-family: PingFangTC-Light, sans-serif;
font-family: PingFangTC-Thin, sans-serif;
font-family: PingFangTC-Medium, sans-serif;
font-family: PingFangTC-Semibold, sans-serif;
//苹方-港 ：
font-family: PingFangHK-Regular, sans-serif;
font-family: PingFangHK-Ultralight, sans-serif;
font-family: PingFangHK-Light, sans-serif;
font-family: PingFangHK-Thin, sans-serif;
font-family: PingFangHK-Medium, sans-serif;
font-family: PingFangHK-Semibold, sans-serif;
```

```css
/*思源*/
@font-face {
  font-family: 'SourceHanSansCN-Light';
  src: url('/content/fonts/SourceHanSansCN-Light.otf');
}
@font-face {
  font-family: 'SourceHanSansCN-Normal';
  src: url('/content/fonts/SourceHanSansCN-Normal.otf');
}
@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('/content/fonts/SourceHanSansCN-Regular.otf');
}
.font-light {
  font-family: 'SourceHanSansCN-Light' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.font-normal {
  font-family: 'SourceHanSansCN-Normal' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.font-regular {
  font-family: 'SourceHanSansCN-Regular' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## LESS

我平时都是使用 less 这里把常的代码收藏起来

### 一般项目常规样式

下面有些是常用的样式，可以作为参考

```less
@color: #333;
@color2: #002c77;
@color3: #999;
@min768: ~'(min-width: 768px)';
@min992: ~'(min-width: 992px)';
@min1200: ~'(min-width: 1200px)';
@min1400: ~'(min-width: 1400px)';
@min1600: ~'(min-width: 1600px)';
@min1900: ~'(min-width: 1900px)';
@min2560: ~'(min-width: 2560px)';

[v-cloak] {
  display: none;
}

a {
  &:hover {
    color: @color2;
  }
}

.after {
  content: '';
  display: block;
  clear: both;
}

.iconfonts {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.transition {
  transition: all ease-in-out 0.3s;
}

.transition(@s) {
  transition: all ease-in-out @s;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.text-overflow(@s) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: @s;
}

a:hover,
button:hover,
button:focus {
  text-decoration: none !important;
  outline: none !important;
  color: @color;
}

.imgobjectfit {
  width: 100%;
  height: 100% !important;
  object-fit: cover;
}

.imgobjectfit2 {
  width: 100%;
  height: 100% !important;
  object-fit: contain;
}

.transition {
  transition: all ease-in-out 0.3s;
}
```
