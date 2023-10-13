---
group: 学习笔记
title: Html
order: 100
---

## 视频做为背景代码
```html
<video autoplay="autoplay" loop="loop" muted="muted">
<source src="mp4.mp4" type="video/mp4"/>
</video>

```

```css
.video{
     width: 100%;
     height: 100%;
     video {
					position: fixed; //视频定位方式设为固定
					right: 0;
					bottom: 0; //视频位置
					min-width: 100%;
					min-height: 100%; //不会因视频尺寸造成页面需要滚动
					width: auto;
					height: auto; //尺寸保持原视频大小
				}
}

```

