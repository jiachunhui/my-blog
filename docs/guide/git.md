---
group: 学习笔记
title: Git 学习笔记
order: 100
---

**常用命令**

```bash
git init # 初始化git仓库
git remote add origin <仓库地址> # 添加仓库地址映射
git remote remove origin # 删除地址映射
git add . # 工作目录内容添加进索引区域
git commit -m '' # 生成新的commit，commit对应某个时刻的内容
git commit --amend # 可用来重写commit的message，也可以用来当作commit的压缩手段
git commit --amend --reset-author # 可用来重写commit的作者

git restore <name> # 当改动了工作区的内容时，可以使用该命令来丢弃工作区的改动
git restore --staged <name> # 把已经通过git add添加的内容从缓存区去除
git reset --hard HEAD^ # 回退到上一个commit
git reset head^ # 回退到上一个commit，区别时之前commit修改的内容并不会消失，而是保存在工作目录中
git revert HEAD # 回退当前commit

git branch # 显示所有分支
git branch <name> # 创建分支
git branch -m <nameA> <nameB> # 修改分支名
git branch -D <name> # 删除本地分支
git checkout <name> # 切换分支
git checkout - # 切换到上一个分支
git checkout -b <name> # 创建分支并切换过去

git merge <name> # 合并目标分支
git rebase <name> # 合并目标分支
git fetch # 获取所有分支
git pull origin main # 获取所有分支并进行当前分支的合并（合并有三种策略，merge（默认），rebase，只允许fast-forward的merge）
git push origin main # 推送分支
git push origin test --delete # 删除远程分支

git log # 查看commit记录
git reflog # 查看历史git命令
git status # 看到当前状态
git stash # 暂存工作区的修改
git stash list # 查看已stash的内容
git stash pop 0 # 释放最新stash的内容到工作区
git stash clear # 清空暂存区的内容

git cherry-pick <commit> # cherry-pick 某个提交的代码
git rebase -i origin/main # 可以用来squash commit、删除commit以及其他的操作

git tag # 查看所有tag
git tag v1.0.1 # 给当前commit打tag
git tag v1.0.1 <commit> # 给某个commit打tag
git tag --delete v1.0.1 # 删除tag v1.0.1


# 注意修改成自己的IP和端口号
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 查看代理
git config --global --get http.proxy
git config --global --get https.proxy
```

## 报错：`Failed to connect to github.com port 443 after 21080 ms: Couldn't connect to server`

> Failed to connect to github.com port 443 after 21080 ms: Couldn't connect to server

经网上查找资料显示

**问题分析**

Git 所设端口与系统代理不一致，需重新设置

**解决方案**

打开 设置 --> 网络与 Internet --> 查找代理

> 因为我用 M\*F,不然网站都打打开，所以代理那里有设置看一下端口号\ 我的是地址与端口号为：127.0.0.1:7890

修改 Git 的网络设置

```bash
# 注意修改成自己的IP和端口号
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

重新试一下，就发现 OK 了

当我们访问 GitHub 的时候一般都会使用梯子，所以往上推代码的时候也是需要梯子，没有梯子推送成功概率很低，一般都会报错超时，所以设置梯子提高访问成功率；

取消代理是因为，访问 Gitee 或其它是不需要梯子，所以要取消代理；或者后悔设置代理了，也可以利用此取消

```bash
# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 查看代理
git config --global --get http.proxy
git config --global --get https.proxy
```

## 报错`husky - commit-msg hook exited with code 1 (error)`

```bash
⧗   input: 增加了在线工具
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

**原因**
提交信息不符合规范，提交信息不符合规范，提交信息不符合规范，重要的事情说三遍

**解决**
在这里我第一次执行的时候，这个办法并没有启作用，但我过会再次尝试了一下，居然好了。

```bash
git commit -m "fix: 增加在线工具"
```
