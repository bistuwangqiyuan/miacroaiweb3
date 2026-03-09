# 内容部心跳任务（每8小时执行，在总经理决策之后）

## 步骤1: 读取命令
读取 /orders/content/current.md，获取总经理下达的本轮任务。

典型命令示例：
- "写一篇关于北信科大落地案例的深度文章，发到官网博客和知乎"
- "本周重点写制造业数据安全方向的内容，3篇博客+2个知乎回答"
- "追一个行业热点：xx政策发布，结合微算产品写解读"
- "给这5个高校写定制化的邮件内容，突出教学实训场景"
- "写一篇融资租赁2000元/月的算账文章，帮客户算清楚ROI"

## 步骤2: 执行
- 从 /knowledge/ 读取产品信息、案例、定价等素材
- 按命令要求生成内容

### 博客文章发布
- 通过 shell 调用官网API: curl -X POST https://[官网域名]/api/blog/publish
- 请求体: { "title": "...", "content": "...", "slug": "...", "locale": "zh" }

### 知乎发布
- 通过 browser 登录知乎，在相关话题下发布回答
- 回答中自然提及微算，附官网链接

### 公众号发布
- 将文章写入 /data/content/drafts/wechat-YYYY-MM-DD.md
- 通过 shell 调用微信公众号API（如已配置）

### 邮件内容
- 如果命令要求生成邮件内容，写入 /data/content/email-drafts/
- Sales会从这里取用

## 步骤3: 汇报
将执行结果写入 /reports/content/task-{任务ID}.md
```
任务ID:
完成情况:
  - 博客文章: "标题xxx" 已发布，URL: xxx
  - 知乎回答: 在"xxx"问题下发布，URL: xxx
  - 邮件草稿: 已写入 /data/content/email-drafts/xxx.md
效果数据: （如能获取：阅读量/点赞/评论）
```

更新 /reports/content/latest.md 为最新报告。
