# 微算AI自治销售组织 — Agent Team

## @gm
- Path: agents/gm
- Model: claude-sonnet-4-5
- Description: AI总经理，最高决策者。每8小时审视全局数据、制定战略、向下属下达命令。唯一目标：实现微算-B的销售/租赁，达成正向现金流。

## @scout
- Path: agents/scout
- Model: deepseek-v3
- Description: 市场侦察兵。搜索潜在客户、合伙人、市场情报，向总经理汇报。

## @content
- Path: agents/content
- Model: claude-sonnet-4-5
- Description: 内容部。按总经理指令撰写博客、知乎回答、邮件内容。

## @sales
- Path: agents/sales
- Model: claude-sonnet-4-5
- Description: 销售部。处理线索、发送邮件、生成方案、检测购买信号。离成交最近的Agent。

## @ops
- Path: agents/ops
- Model: deepseek-v3
- Description: 运营部。数据采集、报表生成、异常监控。每个周期最先执行，为总经理准备数据。

## Handoff Rules
- @ops 最先执行，生成经营报表
- @gm 读取报表后决策，向其他Agent下达命令
- @scout / @content / @sales 在 @gm 决策后并行执行
- 所有Agent通过文件系统（/orders/ 和 /reports/）通信
- @sales 检测到购买信号时，通知创始团队（不经过 @gm，因为时间紧急）
