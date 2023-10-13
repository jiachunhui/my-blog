---
title: 在Centos 7部署
toc: content
group: 部署
---

在Centos 7部署

## Asp.net 运行环境
安装前先访问官方文档获取最新版本支持 [在 CentOS Linux 上安装 .NET SDK 或 .NET 运行时🚀](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-centos)

安装 .NET 之前，请运行以下命令，将 Microsoft 包签名密钥添加到受信任密钥列表，并添加 Microsoft 包存储库。 打开终端并运行以下命令：
```bash
sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
```
***安装 SDK 和 安装运行时***
``` bash
sudo yum install dotnet-sdk-7.0
sudo yum install aspnetcore-runtime-7.0
```


## Mysql
CentOS / Linux 安装MySQL（超简单详细）

### 安装
首先，尝试一下直接使用 yum 安装 MySQL
```bash
yum install mysql-community-server
```
如果成功，表示不需要配置MySQL rpm 源信息，直接就安装完成了

但是，如果出现以下错误：
```bash
Loading mirror speeds from cached hostfile
没有可用软件包 mysql-community-server。
错误：无须任何处理
```
表示我们没有添加安装包的源信息，需要安装 MySQL rpm 源信息

### 安装 rpm 源信息
打开[mysql 源信息下载地址](https://dev.mysql.com/downloads/repo/yum/)

![mysql 源信息下载地址](https://blog.aiyy.site/mysql-1.png)

根据你的系统版本，选择对应的安装包，例如我的是CentOS 7.5，这个系统的Linux内核是 Linux 7，所以我选择了红框内的地址，大家依次类推。

拼接下载地址头：http://dev.mysql.com/get/，得到以下地址
```bash
wget http://dev.mysql.com/get/mysql80-community-release-el7-10.noarch.rpm
```
rpm 安装源信息
```bash
rpm -ivh mysql80-community-release-el7-10.noarch.rpm
```
再尝试使用 yum 安装MySQL
```bash
yum install mysql-community-server
```
安装过程中，会提示让我们确认，一律输入 ***`y`*** 按回车即可

安装完成后，yum会自动覆盖自带的mariaDB，所以不需要我们手动卸载它

#### 检查安装是否成功
检查一下刚才的安装是否成功
```bash
rpm -qa | grep mysql
```
输出：
```bash
mysql-community-libs-compat-8.0.33-1.el7.x86_64
mysql-community-icu-data-files-8.0.33-1.el7.x86_64
mysql80-community-release-el7-7.noarch
mysql-community-common-8.0.33-1.el7.x86_64
mysql-community-libs-8.0.33-1.el7.x86_64
mysql-community-server-8.0.33-1.el7.x86_64
mysql-community-client-8.0.33-1.el7.x86_64
mysql-community-client-plugins-8.0.33-1.el7.x86_64
```
输出类似以上内容，表示安装完成

检查mariaDB是否被覆盖
```bash
rpm -qa | grep mariadb
```
输出空，表示 mariaDB 已经被成功覆盖。

### MySQL 常用命令
```bash
# 启动
systemctl start mysqld

# 第一次启动后，可以查看mysql初始化密码
grep 'temporary password' /var/log/mysqld.log

# 重启
systemctl restart mysqld

# 停止
systemctl stop mysqld

#查看状态
systemctl status mysqld

#开机启动
systemctl enable mysqld
systemctl daemon-reload

# 查看进程、版本信息
ps -ef | grep mysql
或
netstat -atp

# 登录
mysql -u root -p'密码内容'

# 查看所有表
show databases;

# 进入数据库
use 表名

# 查看所有表
show tables

# 查看某张表信息
desc 表名

# 查
select * from 表名
# 删
delete from 表名 where field=xx
# 改
update 表名 set field='xxx' where field='xxx';
```


### 登录和修改密码

我们安装的时候，并没有设置初始密码

所以 mysql 在第一次启动的时候，会自动初始化一个密码

通过以下这行代码，我们可以查看 mysql 自动初始化的密码：

```bash
# 第一次启动后，可以查看mysql初始化密码
grep 'temporary password' /var/log/mysqld.log

#输出（root@localhost: 后面的是密码）：
2023-04-21T06:03:27.071550Z 6 [Note] [MY-010454] [Server] A temporary password
is generated for root@localhost: r2to%yZ%a)%s
```

#### 登录
```bash
# 登录mysql，一定要注意：-p和'密码'之间是没有空格的
mysql -u root -p'r2to%yZ%a)%s'
```
#### 修改 root 密码

注意了，默认的密码策略，需要：大写英文 + 特殊字符 + 数字
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root_123@';
```

:::info{title=注意点}
有些同学可能会觉得，老子密码想设置啥就设置啥，轮得到你这 mysql 在这里瞎BB？
那也是可以修改密码校验策略的
:::

#### 首先，安装密码验证插件
> 但是有个前提，你还是需要先按它的要求修改第一次密码，才能安装密码验证策略插件，哈哈
```bash
1、先按照mysql的要求，修改一次密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root_123';

2、退出mysql
exit

3、重新登录mysql
mysql -u root -p'Root_123'

4、安装密码验证插件
install plugin validate_password soname 'validate_password.so';

5、查看是否启用了插件
select plugin_name, plugin_status from information_schema.plugins where plugin_name like 'validate%';
+-------------------+---------------+
| plugin_name       | plugin_status |
+-------------------+---------------+
| validate_password | ACTIVE        |
+-------------------+---------------+
输出这样的内容，表示成功启用
```
查看验证策略的键、值信息
```bash
SHOW VARIABLES LIKE 'validate_password%';

对于高版本的mysql，例如mysql 8，验证策略的key，是 validate_password.xxx
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password.check_user_name    | ON    |
| validate_password.dictionary_file    |       |
| validate_password.length             | 8     |
| validate_password.mixed_case_count   | 1     |
| validate_password.number_count       | 1     |
| validate_password.policy             | MEDIUM|
| validate_password.special_char_count | 1     |
+--------------------------------------+-------+


对于低版本的mysql，例如mysql 5.7，验证策略的key，是 validate_password_xxx
+--------------------------------------+-------+
| Variable_name                        | Value |
+--------------------------------------+-------+
| validate_password.check_user_name    | ON    |
| validate_password.dictionary_file    |       |
| validate_password.length             | 8     |
| validate_password.mixed_case_count   | 1     |
| validate_password.number_count       | 1     |
| validate_password.policy             | MEDIUM|
| validate_password.special_char_count | 1     |
+--------------------------------------+-------+
```
我们修改密码策略和密码长度

我的策略信息的 key ，是 ***`validate_password.xxx`*** 这个格式的，所以按照如下进行设置
```bash
设置密码校验策略为：0（只验证密码长度）
set global validate.password_policy=0;

设置密码最低长度=N，例如设置密码最低长度=6，也就是密码最少要设置6个字符及以上
set global validate.password_length=6;
```
好了，现在密码就可以按照你刚才配置的策略，来进行设置密码了
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

### 开放 root 账户远程登录
:::warning{title=注意点}
**不要在生产环境上开放 root 账户远程登录**
如果你实在需要开放 root 账户远程登录，请先修改密码，然后再开放远程登录
:::
```bash
# 登录
mysql -u root -p'密码'

# 如果你的数据库是 mysql 8 及以上
# 1、进入数据库
use mysql
# 2、修改user表
update user set host='%' where user='root';

# mysql 5.7 及之前，执行这行代码即可
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;

# 重载授权表
FLUSH PRIVILEGES;

# 退出
exit

# 重启
systemctl restart mysqld
```
### 端口开放
> 经过实测，使用阿里云或者腾讯云，在服务器上，无需配置 `iptables` 端口信息 \
> 但必须在阿里云或者腾讯云控制台 - 服务器 - 安全组，***`开放 3306端口`***。

## Redis
这个目前没啥好说的，按照参考教程[Centos7 安装Redis详细教程](https://www.cnblogs.com/jiangcong/p/15449452.html)



## Nginx

常用命令
```bash {4,5}
yum install nginx #安装
systemctl start nginx #启动
systemctl enable nginx #开机启动
vi /etc/nginx/nginx.conf #修改配置
systemctl reload nginx.service #保存后：重启：
systemctl status nginx.service #查看状态
```


## 项目文件部署

网站项目部署，一般需要以下步骤：
1. 发布项目 #这里就不详细说了
2. 发布后的文件上传到服务器 #使用ftp软件sftp，用centos 账号密码就可以登录

常用命令
```bash
dotnet /home/web/Zigong.Web.Entry.dll --urls "http://localhost:5000"
```

### 创建服务文件


```vim
sudo vi /etc/systemd/system/webapp.service

#内容如下：根据实现情况再修改
[Unit]
Description=Example .NET Web API App running on Linux

[Service]
WorkingDirectory=/home/web
ExecStart=/usr/bin/dotnet /home/web/Zigong.Web.Entry.dll --urls=http://localhost:5000
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-example
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

### 启动服务
```bash
systemctl daemon-reload
##开机启动 start
sudo systemctl enable webapp.service
sudo systemctl reload webapp.service
sudo systemctl start webapp.service
sudo systemctl status webapp.service
```

### 配置Nginx规则

```bash
yum install nginx #安装
systemctl start nginx #启动
systemctl enable nginx #开机启动
vi /etc/nginx/nginx.conf #修改配置
systemctl reload nginx.service #保存后：重启：
systemctl status nginx.service #查看状态
```

#### 配置文件
配置也是现查现用，解决了我当下问题就OK，因为平时不用Nginx
:::warning{title=我在这里卡住了}
我的项目是前端和后台接口及后台管理都是在一起的，一开始只配置了 `/` 后 \
前端vue项目刷新后`404` ，需要加 ***` try_files $uri $uri/ /index.html;`*** \
问题又来了，其它资源都指向了`index.html`，导致`404`，需要加 ***`location /api {`*** \
***`location /api {`*** ***`location /assets {`*** ***`location /testapi {`***
:::
```bash
server {
    listen        80;
    server_name   _;
    location / {
        proxy_pass         http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
       try_files $uri $uri/ /index.html;
    }
location /testapi/ {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
location /api/ {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

location /assets/ {
      proxy_pass         http://127.0.0.1:5000;
      proxy_http_version 1.1;
      proxy_set_header   Upgrade $http_upgrade;
      proxy_set_header   Connection keep-alive;
      proxy_set_header   Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
}
```
#### SSL证书配置
只是在给客户部署前，自己先按这个方法实操一下，简单看了没问题后，再给客户部署。\
下面是参考[阿里云的文档](https://help.aliyun.com/zh/ssl-certificate/user-guide/install-ssl-certificates-on-nginx-servers-or-tengine-servers)
```ngnix
server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  test.wzjs100.com;
#        root         /usr/share/nginx/html;
#
        ssl_certificate "/etc/nginx/conf.d/test.wzjs100.com.pem";
        ssl_certificate_key "/etc/nginx/conf.d/test.wzjs100.com.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_prefer_server_ciphers on;
location / {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
    }
```
