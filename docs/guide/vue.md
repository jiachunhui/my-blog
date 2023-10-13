---
group: 学习笔记
title: Vue 学习笔记
order: 20
---

## Vue2网页基础代码
```js
var data = {};
var methods = {};
var $vue = new Vue({
            el: '#mains',
            data: data,
            methods: methods,
            computed: {
            },
            updated() {
            },
            watch: {
                styleActive: {
                    handler(newV, oldV) {
                       
                    },
                    deep: true,
                    immediate: true, //立即执行
                }
            },
            created: function () {

            },
});
```





## Element ElementPlus

### 上传组件传入额外参数
vue 页面模板
```html
<el-upload
    v-loading="加载状态"
    name="文件参数名"
    :action="上传请求地址"
    :headers="请求头额外参数"
    :before-upload="
       (res) => {
           return beforeUpload(res, '额外参数');
        }
     "
     :on-success="
        (res) => {
            return uploadSuccess(res, '额外参数');
         }
     "
>
     <el-button>上传</el-button>
</el-upload>
```
**JS代码**
```js
methods: {
	    // 图片上传前
    beforeUpload(res, type) {
      console.log(res) // 文件详情
      console.log(type) // 额外参数
    },
    // 图片上传成功
    uploadSuccess(res, type) {
      console.log(res) // 上传接口返回结果
      console.log(type) // 额外参数
    }
}


```



###  cascader选中之后，选中的数据未显示出来 
> 多选时遇到的问题。单选没问题 \ 网上查了一下是因为子集children为空的原因

实现changeNodes 方法
```js
            changeNodes(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i].children || data[i].children.length < 1) {
                            data[i].children = undefined;
                        } else {
                            this.changeNodes(data[i].children);
                        }
                    }
                }
                return data;
            },

```
computed
```js
computed: {
                clsFarther() {
                    var ss = this.changeNodes(this.clsData);
                    return ss;
                }
            },

```
