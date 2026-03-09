# 销售部心跳任务（每8小时执行，在总经理决策之后）

## 步骤1: 处理新线索（每次心跳必做，不论有无总经理命令）

### 1a. 拉取新线索
- 调用 GET https://[官网域名]/api/leads?since=8h 拉取最近8小时新表单提交
- 检查指定邮箱的新来信（IMAP协议，通过shell执行）
- 读取 /data/crm/leads/ 目录检查是否有其他Agent写入的新线索

### 1b. AI评分
对每条新线索执行评分（参考AGENTS.md中的评分规则）

### 1c. 写入CRM
为每条新线索创建 /data/crm/leads/lead-{序号}.md
```
# 线索 lead-{序号}
公司名: xxx
联系人: xxx
邮箱: xxx
电话: xxx
行业: xxx
规模: xxx
需求: xxx
来源: 官网表单 / AI客服 / 邮箱 / 其他
评分: A/B/C/D（分数）
状态: new / contacted / nurturing / qualified / hot / won / lost
创建时间: YYYY-MM-DD HH:MM
最后联系: YYYY-MM-DD HH:MM
跟进记录:
  - [日期] 行动描述
```

### 1d. 紧急通知
- A级线索：通过企业微信API通知创始团队 + 写入 /reports/sales/URGENT.md

## 步骤2: 读取并执行总经理命令
读取 /orders/sales/current.md，执行总经理下达的任务。

### 触达任务
- 按命令向指定客户发送首次触达邮件
- 邮件内容优先从 /data/content/email-drafts/ 获取（Content部已准备）
- 如无现成内容，基于 /knowledge/ 自行生成
- 通过 SendGrid API 发送

### 跟进任务
- 按命令对指定客户进行跟进
- 读取客户的 lead-xxx.md 了解历史
- 根据客户阶段和总经理指示选择跟进策略

### 方案生成任务
- 按命令为指定客户生成定制方案
- 读取: 客户信息 + /knowledge/pricing.md + /knowledge/product.md
- 方案内容: 推荐产品配置 + TCO对比 + ROI分析 + 融资租赁说明
- 方案写入 /data/crm/proposals/proposal-{客户}.md
- 通过邮件发送给客户

## 步骤3: 检测购买信号
- 检查邮箱中客户回复
- 扫描回复内容中的购买信号关键词
- 如检测到购买信号：
  1. 立即写入 /reports/sales/URGENT.md
  2. 通过企业微信API通知创始团队
  3. 更新线索状态为 hot

## 步骤4: 汇报
将执行结果写入 /reports/sales/task-{任务ID}.md
```
任务ID:
新线索: 本轮新增X条（A级X/B级X/C级X/D级X）
触达: 联系了谁 / 发了什么 / 客户反应
跟进: 哪些客户有进展 / 哪些沉默
方案: 生成了X份方案 / 发送给了谁
购买信号: 有/无（如有标注客户名和信号内容）
建议: 给总经理的建议（哪些客户值得重点攻、哪些应该放弃）
```

更新 /reports/sales/latest.md
