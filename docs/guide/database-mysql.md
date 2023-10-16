---
title: MYSQL
toc: content
group: 数据库
---

平常使得的少，偶使用遇到问题在这里记录下来，方便下次使用

## 错误：在更新数据时

> `Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column. To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.` \
> 这个错误是由 MySQL 的"safe updates"模式引起的，也被称为"只读模式"。当这个模式被开启时，更新操作必须使用一个键（KEY）列作为 WHERE 子句的条件，这可以防止误操作影响到过多的行。

**解决方案**

要解决这个问题，你有两个选择：

1. 在你的 UPDATE 语句中使用一个键列作为 WHERE 子句的条件。这可能需要你修改你的 UPDATE 语句，或者在你的表中添加一个新的键列。
2. 关闭"safe updates"模式。你可以通过以下的 SQL 语句来临时关闭这个模式：

```sql
SET SQL_SAFE_UPDATES = 0;
```

然后，你就可以执行你的 UPDATE 语句了。执行完之后，你可以通过以下的 SQL 语句来重新开启"safe updates"模式：

```sql
SET SQL_SAFE_UPDATES = 1;
```

:::warning{title=请注意}
关闭"safe updates"模式可能会增加误操作的风险，所以你应该谨慎使用这个选项，并确保你的 UPDATE 语句是正确的。
:::

如果你使用的是`MySQL Workbench`，你也可以在"Preferences" -> "SQL Editor"中关闭"Safe Updates"选项，然后重新连接到数据库。
