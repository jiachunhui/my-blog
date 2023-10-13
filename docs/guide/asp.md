---
group: 学习笔记
title: NetCore 学习笔记
order: 10
toc: content
---

目前`asp.net core`项目就使用[Furion框架🚀](http://furion.baiqian.ltd/) 这个文档已经很牛了，但是还是想自己写一份，方便以后查阅。

## NetCore

### NET Framework 版本
#### 打印服务器信息 <Badge>.net 4</Badge>
```cshtml
@ServerInfo.GetHtml()
```
#### 查看对应版本 
打开[获取机器安装.NET版本的几种方式](https://www.cnblogs.com/gaochundong/p/how_to_determine_which_net_framework_versions_are_installed.html) 查看详细
* 4.0.30319.1 = .NET 4.0 RTM
* 4.0.30319.269 = most common .NET 4.0 version
* 4.0.30319.544 = another .NET 4.0 version that a small portion
* 4.0.30319.17626 = .NET 4.5 RC
* 4.0.30319.17929 = .NET 4.5 RTM
* 4.0.30319.18010 = current version on my Windows 8 machine
* 4.0.30319.18052 = .NET 4.5 on Windows 7 SP1 64-bit
* 4.0.30319.18408 = .NET 4.5.1 on Windows 7 SP1 64-bit
* 4.0.30319.34209 = .NET 4.5.2 on Windows 7 PS1 64-bit
* 4.0.30319.34014 = .NET 4.5.1 on Windows 8.1 64-bit
* 4.0.30319.34209 = .NET 4.5.2 on Windows 8.1 64-bit

### 动态页面转静态页面 （Dynamic page to static page）
1. 一个文件搞定动态页面转静态页面，支持.NET CORE 3.1 ，支持MVC和PageModel。[GitHub StaticPage](https://github.com/toolgood/StaticPage)
2. RazorToHtmlClassLibrary 生成sitemap合集静态页面 
这是自己写的，通过远程请求的方式生成静态页面，读取sitemap里的链接地址生成,这种适合各种情况 \
代码已经提交到 [Nuget](https://www.nuget.org/packages/RazorToHtmlClassLibrary/)
```nuget
Install-Package RazorToHtmlClassLibrary -Version 1.0.2
```


### 后台服务项目
创建、启动、停止、删除后台服务程序的命令
```bash
sc.exe create AiyyDemoWorkerServices binPath= D:\Demo\bin\publish\Demo.exe
sc.exe query AiyyDemoWorkerServices
sc.exe start AiyyDemoWorkerServices
sc.exe stop AiyyDemoWorkerServices
sc.exe delete AiyyDemoWorkerServices

```

### 给静态资源文件配置 Headers 
```csharp
app.UseStaticFiles(new StaticFileOptions
{
			OnPrepareResponse = (c) =>
			{
				c.Context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
			}
});

```




## 微信
微信相关开发中遇到的问题，记录一下

### 验证微信签名


:::warning{title=注意:容易验证失败}
返回结果注意是不是双引号包着（默认webapi 返回结果有双引号，这样验证失败） \
回复信息不用加密码（原先以为也要加密）
:::

验证微信签名`CheckSignature` 方法代码<Badge>net 4.5</Badge>
```csharp
  /// <summary>
	/// 验证微信签名
	/// </summary>
	/// * 将token、timestamp、nonce三个参数进行字典序排序
	/// * 将三个参数字符串拼接成一个字符串进行sha1加密
	/// * 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信。
	/// <returns></returns>
	private bool CheckSignature(string signature,string timestamp,string nonce,string token)
	{
		string[] value = new string[3] { token, timestamp, nonce }.OrderBy((string z) => z).ToArray();
		string s = string.Join("", value);
		byte[] array = SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(s));
		StringBuilder stringBuilder = new StringBuilder();
		byte[] array2 = array;
		foreach (byte b in array2)
		{
			stringBuilder.AppendFormat("{0:x2}", b);
		}
		
		return signature== stringBuilder.ToString();
	}

```
```csharp
 //api接口对结果返回
 public HttpResponseMessage Get([FromUri]WxVerifyRequest request)
{	
		var token = "ed035348482ebe17d1160cc9bbc21909";
		var check = CheckSignature(request.Signature, request.Timestamp, request.Nonce, token);
		if (check==true)
		{
			HttpResponseMessage responseMessage = new HttpResponseMessage { Content = new StringContent(request.Echostr, Encoding.GetEncoding("UTF-8"), "text/plain") };
			return responseMessage;
		}
		
	}

```
使用Net Core 实现就很简单了，后面会介绍如何使用Net Core 实现微信公众号的接入。
