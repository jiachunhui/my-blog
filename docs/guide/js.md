---
group: 学习笔记
title: Javascript 学习笔记
order: 100
toc: content
---

### 静态资源设置跨域

:::warning{title=注意}
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

## js 点击下载

```js
//这是部分代码
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
const filename = getFilenameFromResponse(response); // 获取文件名
link.setAttribute('download', filename);
link.click();
ElMessage.success('下载成功！');
```

### 前台 vue 和 后台

```js {5,13-18}
downSslFile: (id) => {
  return request({
    url: '/api/user/ssl/download/' + id,
    method: 'post',
    responseType: 'blob',
  });
},
  useUserApi()
    .downSslFile(row.certId)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const filename = getFilenameFromResponse(response); // 获取文件名
      link.setAttribute('download', filename);
      link.click();
      ElMessage.success('下载成功！');
    })
    .then(() => {
      state.loading = false;
    })
    .catch((error) => {
      console.error('下载文件出错:', error);
    });
```

```cs
public IActionResult DownloadSSLFiles(string certId)
{
	var input = new RCCollectInput();
	input.api_token = _apiToken;
	input.certId = certId;
	var data = _http.PostCollectAsync(input).Result;
	if (data.Code != 1)
	{
		throw Oops.Bah(data.CodeErrors);
	}
	var res = data.Data;
	var domainName = res.dcvList[0].domainName.Replace(".", "_");
	// 创建一个临时目录，用于存放要压缩的文件
	string tempDirectory = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString(), domainName);
	Directory.CreateDirectory(tempDirectory);

	var apache1 = res.caCertificate;
	var apache2 = res.certificate;
	var apache3 = res.privateKey;

	// 创建 Apache 目录并添加文件
	string apacheDirectory = Path.Combine(tempDirectory, "Apache");
	Directory.CreateDirectory(apacheDirectory);
	File.WriteAllText(Path.Combine(apacheDirectory, $"{domainName}.ca-bundle"), apache1);
	File.WriteAllText(Path.Combine(apacheDirectory, $"{domainName}.crt"), apache2);
	File.WriteAllText(Path.Combine(apacheDirectory, $"{domainName}.key"), apache3);

	var iis1 = res.pkcsPass;//jksPass
	var iis2 = res.privateKey;
	var iis3 = res.pkcs12;//jks,pkcs12
	byte[] decodedBytes = Convert.FromBase64String(iis3);

	// 创建 IIS 目录并添加文件
	string iisDirectory = Path.Combine(tempDirectory, "IIS");
	Directory.CreateDirectory(iisDirectory);
	File.WriteAllText(Path.Combine(iisDirectory, $"password.txt"), iis1);
	File.WriteAllText(Path.Combine(iisDirectory, $"{domainName}.key"), iis2);
	File.WriteAllBytes(Path.Combine(iisDirectory, $"{domainName}.pfx"), decodedBytes);

	var nginx2 = res.certificate + "\n" + res.caCertificate;
	// 创建 Nginx 目录并添加文件
	string nginxDirectory = Path.Combine(tempDirectory, "Nginx");
	Directory.CreateDirectory(nginxDirectory);
	File.WriteAllText(Path.Combine(nginxDirectory, $"{domainName}.key"), iis2);
	File.WriteAllText(Path.Combine(nginxDirectory, $"{domainName}_integrated.crt"), nginx2);

	var tomcatPassword = res.jksPass;
	var tomcatJks = res.jks;//jks,pkcs12
	byte[] tomcatDecodedBytes = Convert.FromBase64String(tomcatJks);
	// 创建 Tomcat 目录并添加文件
	string tomcatDirectory = Path.Combine(tempDirectory, "Tomcat");
	Directory.CreateDirectory(tomcatDirectory);
	File.WriteAllText(Path.Combine(tomcatDirectory, $"password.txt"), tomcatPassword);
	File.WriteAllText(Path.Combine(tomcatDirectory, $"{domainName}.key"), iis2);
	File.WriteAllBytes(Path.Combine(tomcatDirectory, $"{domainName}.jks"), tomcatDecodedBytes);


	string shortid = ShortIDGen.NextID();
	// 创建压缩包
	string zipFileName = $"{domainName}_{shortid}.zip";
	string zipFilePath = Path.Combine(Path.GetTempPath(), zipFileName);
	ZipFile.CreateFromDirectory(tempDirectory, zipFilePath);

	// 删除临时目录
	Directory.Delete(tempDirectory, true);
	// 下载压缩包
	var fileStream = new FileStream(zipFilePath, FileMode.Open, FileAccess.Read);
	return new FileStreamResult(fileStream, "application/octet-stream")
	{
		FileDownloadName = zipFileName // 配置文件下载显示名
	};


}
```

## js 无法获取响应 header 的 Content-Disposition 字段

> js 请求下载资源的时候后台也正常设置了文件名，浏览器中也能查看到这个字段
