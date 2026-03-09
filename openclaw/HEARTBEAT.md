# Scheduled Tasks — 微算AI销售组织 8小时心跳

## Cycle 1: Ops Data Collection
- Schedule: Every 8 hours at :00 (00:00, 08:00, 16:00 CST)
- Agent: @ops
- Message: 执行运营部心跳任务。采集所有外部和内部数据，生成经营报表写入 /reports/ops/latest.md，检查异常并告警。然后读取 /orders/ops/current.md 执行总经理的额外命令。

## Cycle 2: GM Decision Making
- Schedule: Every 8 hours at :30 (00:30, 08:30, 16:30 CST)
- Agent: @gm
- Message: 执行总经理心跳任务。读取所有报告（/reports/ops/latest.md, /reports/sales/latest.md, /reports/content/latest.md, /reports/scout/latest.md, /data/crm/stats.md, /strategy/current-strategy.md），判断当前局面，做出决策，将命令写入 /orders/{scout,content,sales,ops}/current.md，记录决策日志到 /strategy/gm-log/。

## Cycle 3a: Scout Execution
- Schedule: Every 8 hours at :00 (01:00, 09:00, 17:00 CST)
- Agent: @scout
- Message: 执行侦察兵心跳任务。读取 /orders/scout/current.md 获取总经理命令，执行搜索任务，将结果写入 /reports/scout/，更新 /reports/scout/latest.md。

## Cycle 3b: Content Execution
- Schedule: Every 8 hours at :00 (01:00, 09:00, 17:00 CST)
- Agent: @content
- Message: 执行内容部心跳任务。读取 /orders/content/current.md 获取总经理命令，执行内容生产任务，将结果写入 /reports/content/，更新 /reports/content/latest.md。

## Cycle 3c: Sales Execution
- Schedule: Every 8 hours at :00 (01:00, 09:00, 17:00 CST)
- Agent: @sales
- Message: 执行销售部心跳任务。先处理新线索（必做），然后读取 /orders/sales/current.md 执行总经理命令，检测购买信号，将结果写入 /reports/sales/，更新 /reports/sales/latest.md。
