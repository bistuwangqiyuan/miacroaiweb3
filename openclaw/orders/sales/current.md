# 总经理给销售部的首轮命令
下达时间: 系统启动

## 常规任务（每次心跳必做）
- 拉取官网新线索（GET /api/leads）
- 检查邮箱新来信
- 对新线索评分分级
- A级线索立即通知创始团队

## 任务1
任务ID: task-init-sales-001
优先级: P1
目标: 准备高校触达邮件模板
行动: 基于 /knowledge/email-templates/welcome.md 和 /knowledge/cases.md 中的北信科大案例，准备一封专门面向高校的触达邮件。强调：AI教学实训、开箱即用、百人并发、2000元/月、数据不出校园网。写入 /data/content/email-drafts/university-outreach.md
截止: 下次心跳前
汇报: /reports/sales/task-init-sales-001.md

## 任务2
任务ID: task-init-sales-002
优先级: P1
目标: 准备集成商合作方案邮件
行动: 准备一封面向系统集成商的合作邀请邮件。强调：不是让你买产品，是帮你的方案加上"数据不出域"的本地算力模块。渠道分成、免费样机、华为认证背书。写入 /data/content/email-drafts/integrator-partnership.md
截止: 下次心跳前
汇报: /reports/sales/task-init-sales-002.md

注意: Scout的搜索结果出来后，下一轮总经理会给你具体的触达名单。本轮先准备好邮件弹药。
