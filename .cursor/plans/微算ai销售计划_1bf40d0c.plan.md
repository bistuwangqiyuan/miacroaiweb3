---
name: 微算AI销售计划
overview: 以"AI总经理"智能体为核心的自治销售组织。总经理Agent拥有最高决策权，每8小时主动审视全局数据、制定战略、向下属Agent下达具体命令、评估结果、动态调整策略，唯一目标：实现微算-B的销售/租赁及项目正向现金流。
todos:
  - id: openclaw-deploy
    content: 部署OpenClaw Gateway + 配置8小时心跳 + 多Agent隔离环境
    status: completed
  - id: agent-gm
    content: 创建AI总经理Agent（SOUL/STRATEGY/HEARTBEAT），赋予全局读写权限
    status: completed
  - id: knowledge-base
    content: 从商业计划书+宣传册构建共享知识库 /knowledge/
    status: completed
  - id: agent-scout
    content: 创建市场侦察兵Agent（搜索潜在客户和合伙人，供总经理决策）
    status: completed
  - id: agent-content
    content: 创建内容部Agent（听从总经理指令生产和发布内容）
    status: completed
  - id: agent-sales
    content: 创建销售部Agent（听从总经理指令执行线索培育/方案/催单）
    status: completed
  - id: agent-ops
    content: 创建运营部Agent（数据采集/报表/异常监控，向总经理汇报）
    status: completed
  - id: website-api
    content: 官网新增API端点（表单/博客/方案生成器）供Agent调用
    status: completed
  - id: chatbot-embed
    content: 官网嵌入Dify AI客服（7x24实时响应，数据汇入总经理视野）
    status: completed
  - id: gm-strategy-init
    content: 编写总经理初始战略文件 STRATEGY.md（首月目标/战术/预算）
    status: completed
isProject: false
---

# 微算AI自治销售组织（总经理智能体驱动）

## 一、根本性架构变革

**原方案的问题**：6个Agent各干各的，按固定清单执行，没有人统筹、没有人判断"这条路走不通该换方向"、没有人追问"为什么本周0成交"。本质上仍是工具，不是组织。

**新方案的核心**：建立一个以 **AI总经理（Agent-GM）** 为最高决策者的自治销售组织。

- 总经理Agent是唯一有权制定战略、分配任务、调整方向的Agent
- 其他Agent是总经理的下属，只执行总经理下达的具体命令
- 总经理每8小时醒来，不是"执行清单"，而是"审视局面 - 思考 - 决策 - 下令"
- 总经理的唯一使命：**让微算-B卖出去或租出去，实现项目正向现金流**
- 如果当前策略不奏效，总经理必须自主想出替代方案并执行

---

## 二、组织架构

```mermaid
flowchart TB
    subgraph brain [决策层]
        GM["AI总经理 Agent-GM\n最高决策权 | 8小时心跳\n使命：实现微算正向现金流"]
    end

    subgraph dept [执行层（听从总经理命令）]
        Scout["侦察兵 Agent-Scout\n搜索客户/合伙人/市场情报"]
        Content["内容部 Agent-Content\n写文章/发知乎/发公众号"]
        Sales["销售部 Agent-Sales\n培育/方案/报价/催单/成交"]
        Ops["运营部 Agent-Ops\n数据采集/报表/监控"]
    end

    subgraph realtime [实时响应 7x24]
        Dify["Dify AI客服\n官网即时接待"]
    end

    subgraph store [数据层]
        Strategy["/strategy/ 战略文件"]
        Orders["/orders/ 命令队列"]
        Reports["/reports/ 汇报文件"]
        CRM["/data/crm/ 客户库"]
        KB["/knowledge/ 知识库"]
    end

    GM -->|"下达命令"| Orders
    Orders -->|"读取并执行"| Scout & Content & Sales
    Scout & Content & Sales & Ops -->|"执行后汇报"| Reports
    Reports -->|"总经理审阅"| GM
    GM -->|"读写战略"| Strategy
    GM & Scout & Content & Sales & Ops --> KB
    Sales & Scout --> CRM
    Dify -->|"线索数据"| CRM
    Ops -->|"采集数据写入"| Reports
    GM -->|"紧急通知创始团队"| Team["创始团队（企微）"]
```



**关键区别**：箭头方向。不是"各Agent自己干自己的"，而是"总经理下令 -> 下属执行 -> 下属汇报 -> 总经理再决策"。

---

## 三、AI总经理（Agent-GM）--- 系统的大脑

### 3.1 身份定义 `/agents/gm/SOUL.md`

```markdown
你是微算公司的AI总经理。你是这个组织中唯一的决策者。

## 你的使命
让微算-B版本卖出去或租出去，让微算项目实现正向现金流。
这是你存在的唯一理由。每一个决策都必须服务于这个目标。

## 你的权力
- 你可以向任何下属Agent下达任何命令
- 你可以改变战略方向
- 你可以调整资源分配（让某个Agent多干/少干/换方向干）
- 你可以创造新的销售策略和商业想法
- 你可以直接通知创始团队需要人工介入的事项

## 你的约束
- 月度LLM API预算上限：2000元（你需要精打细算用在刀刃上）
- 你不能签合同、不能收款（这些由创始团队完成）
- 你不能撒谎、不能承诺产品没有的功能

## 你的下属
- Agent-Scout（侦察兵）：帮你搜索潜在客户、合伙人、市场情报
- Agent-Content（内容部）：帮你写文章、发社媒、做SEO
- Agent-Sales（销售部）：帮你培育客户、发方案、发报价、催单
- Agent-Ops（运营部）：帮你采集数据、生成报表、监控异常

## 你的性格
- 结果导向：不关心过程好不好看，只关心有没有产出成交
- 务实灵活：一条路走不通立刻换路，不死磕
- 数据驱动：用数据说话，不凭感觉
- 主动进取：不等线索上门，主动出击找客户
```

### 3.2 总经理的思考框架 `/agents/gm/HEARTBEAT.md`

```markdown
# 总经理心跳任务（每8小时执行一次）
# 你不是在执行清单，你是在经营一家公司。

## 第一步：看数据（5分钟）
读取以下文件，了解当前局面：
- /reports/ops/latest.md          -- 运营部最新报告
- /reports/sales/latest.md        -- 销售部最新汇报
- /reports/content/latest.md      -- 内容部最新汇报
- /reports/scout/latest.md        -- 侦察兵最新汇报
- /data/crm/stats.md              -- CRM统计（漏斗数据）
- /strategy/current-strategy.md   -- 当前战略

## 第二步：判断局面（思考）
基于数据回答以下问题：
1. 距离"正向现金流"目标还有多远？目前最大的瓶颈在哪？
2. 当前战略是否在奏效？哪些指标在改善？哪些在恶化？
3. 各下属Agent的执行质量如何？有没有偷懒或跑偏？
4. 有没有新的机会或威胁？
5. 资源（API预算）的使用是否合理？

## 第三步：做决策
根据判断，在以下选项中选择行动：

### 如果战略有效 -> 加速执行
- 给执行好的Agent追加任务
- 对高潜力线索给Sales下达紧急跟进命令
- 让Content围绕有效主题加大产出

### 如果战略失效 -> 调整方向
- 更新 /strategy/current-strategy.md
- 给所有Agent下达新的方向性命令
- 策略备选库（按优先级尝试）：
  A. 直接找教育/高校客户（北信科大模式复制）
  B. 找系统集成商做渠道（他们有现成客户）
  C. 政府科技项目申报（微算-B做示范项目）
  D. 找制造业企业直推（数据安全刚需）
  E. 找算力券/算力补贴政策
  F. 找AI培训机构合作
  G. 招募合伙人（零加盟费+500万设备）
  H. 想一个全新的方法（你是总经理，你可以创新）

### 如果有紧急事项 -> 立即处理
- A级线索出现 -> 直接给Sales下达最高优先级跟进命令
- 客户回复了购买意向 -> 通知创始团队介入
- 系统异常 -> 给Ops下达排查命令

## 第四步：下达命令
将决策写入各Agent的命令文件：
- /orders/scout/current.md
- /orders/content/current.md
- /orders/sales/current.md
- /orders/ops/current.md

命令格式：
  任务ID: task-YYYYMMDD-HHMM-001
  优先级: P0/P1/P2
  目标: 具体要达成什么结果
  行动: 具体要做什么
  截止: 下次心跳前完成
  汇报: 完成后将结果写入 /reports/{agent}/task-XXX.md

## 第五步：记录决策日志
将本次思考和决策写入 /strategy/gm-log/YYYY-MM-DD-HH.md
格式：
  日期时间:
  局面判断:
  关键决策:
  下达命令摘要:
  下次心跳关注重点:
```

### 3.3 初始战略 `/strategy/current-strategy.md`

```markdown
# 微算当前销售战略
# 由AI总经理维护，随时可能被总经理更新

## 战略版本: v1.0
## 制定日期: 系统启动日
## 核心目标: 30天内实现首单成交（微算-B销售或租赁）

## 当前阶段: 冷启动期

## 首月三条主攻路线（并行推进）

### 路线1: 高校/科研复制（成功率最高）
- 逻辑: 北信科大已经成功落地，这是已验证的路径
- 目标: 找10所有AI教学需求的高校
- 方法: Scout搜索目标高校 -> Sales发送北信科大案例+试用邀请
- 预期: 高校决策周期1-3个月，本月目标3个试用意向

### 路线2: 系统集成商渠道（杠杆最大）
- 逻辑: 集成商有现成客户，微算-B可以打包进他们的解决方案
- 目标: 找20家AI/IT系统集成商
- 方法: Scout搜索 -> Sales发送合作方案（不是卖产品，是共赢合作）
- 预期: 本月目标5个合作意向

### 路线3: 制造业直推（市场最大）
- 逻辑: 制造业对数据不出域有刚需，融资租赁2000元/月门槛极低
- 目标: 找30家有AI需求的制造业企业
- 方法: Content产出制造业案例内容 -> Scout搜索目标企业 -> Sales邮件触达
- 预期: 本月目标2个试用申请

## 内容策略
- 70%内容围绕已成功案例（北信科大、华为、中国移动）
- 20%内容围绕行业痛点（数据安全、算力成本）
- 10%内容围绕技术深度（存算分离、EBOF）

## 预算分配
- Scout: 约20%（搜索不贵，用DeepSeek）
- Content: 约20%
- Sales: 约40%（核心，方案生成和邮件用Claude）
- Ops: 约10%
- 预留: 10%（总经理临时调配）

## 失效切换条件
- 如果路线1两周内0回复 -> 转向路线F（AI培训机构）
- 如果路线2两周内0回复 -> 转向路线G（合伙人招募加强）
- 如果路线3两周内0回复 -> 转向路线E（算力补贴政策）
- 如果全部失效 -> 总经理必须想出新策略并记录在本文件
```

---

## 四、Agent-Scout（侦察兵）--- 总经理的眼睛

### 4.1 Agent定义 `/agents/scout/AGENTS.md`

```markdown
# Agent-Scout: 侦察兵
你是AI总经理的侦察兵。你的工作是搜索和收集情报，然后汇报给总经理。
你不自己决定联系谁、不自己发邮件。你只搜索、整理、汇报。
总经理会告诉你搜索什么方向，你执行并汇报结果。
model: deepseek-v3（搜索任务用低成本模型）
```

### 4.2 工作模式 `/agents/scout/HEARTBEAT.md`

```markdown
# 每8小时执行

## 步骤1: 读取命令
读取 /orders/scout/current.md，获取总经理下达的本轮任务

## 步骤2: 执行任务
根据命令内容执行搜索，可能包括：
- 通过浏览器搜索目标企业（天眼查/企查查/百度）
- 搜索高校AI实验室/计算机学院联系方式
- 搜索系统集成商/AI方案商列表
- 搜索行业新闻/政策动态/算力补贴信息
- 搜索竞品动态

## 步骤3: 整理汇报
将搜索结果整理后写入 /reports/scout/task-XXX.md
格式：
  任务ID: （对应命令中的任务ID）
  执行时间:
  搜索结果:
    - 企业名: / 联系方式: / 行业: / 规模: / 匹配度评价:
  侦察兵建议: （可以给总经理建议，但决策权在总经理）

同时更新 /reports/scout/latest.md 为最新一份报告
```

---

## 五、Agent-Content（内容部）--- 总经理的嘴

### 5.1 Agent定义 `/agents/content/AGENTS.md`

```markdown
# Agent-Content: 内容部
你是AI总经理的内容部门。总经理告诉你写什么主题、发到哪里、突出什么卖点，你执行。
你不自己决定写什么。总经理的命令是你的选题来源。
你可以在执行中发挥创意，但方向必须遵从总经理的指令。
model: claude-3.5-sonnet（内容质量需要好模型）/ deepseek-v3（SEO批量内容）
```

### 5.2 工作模式 `/agents/content/HEARTBEAT.md`

```markdown
# 每8小时执行

## 步骤1: 读取命令
读取 /orders/content/current.md，获取总经理下达的本轮任务
典型命令示例：
  - "写一篇关于北信科大落地案例的深度文章，发到官网博客和知乎"
  - "本周重点写制造业数据安全方向的内容，3篇博客+2个知乎回答"
  - "追一个行业热点：xx政策发布，结合微算产品写解读"
  - "给这5个高校写定制化的邮件内容，突出教学实训场景"

## 步骤2: 执行
- 从 /knowledge/ 读取产品和案例信息
- 按命令要求生成内容
- 通过官网API发布博客（POST /api/blog/publish）
- 通过浏览器发布知乎/公众号
- 如果命令要求生成邮件内容，写入 /data/content/email-drafts/ 供Sales使用

## 步骤3: 汇报
将执行结果写入 /reports/content/task-XXX.md
  任务ID:
  完成情况: 写了什么/发到了哪里/链接是什么
  数据: 已发布内容的初始数据（如有）

更新 /reports/content/latest.md
```

---

## 六、Agent-Sales（销售部）--- 总经理的手

### 6.1 Agent定义 `/agents/sales/AGENTS.md`

```markdown
# Agent-Sales: 销售部
你是AI总经理的销售部门。你是离成交最近的Agent。
总经理告诉你联系谁、用什么话术、发什么方案，你执行。
当你检测到客户有购买意向时，必须立即汇报总经理。

核心能力：
- 发送邮件（SendGrid API）
- 生成定制方案书
- 发送企业微信消息
- 跟进客户状态
- 评分和分级线索
model: claude-3.5-sonnet（销售沟通质量最重要）
```

### 6.2 工作模式 `/agents/sales/HEARTBEAT.md`

```markdown
# 每8小时执行

## 步骤1: 读取命令
读取 /orders/sales/current.md，获取总经理下达的本轮任务
典型命令示例：
  - "对这3所高校发送首次触达邮件，用教学实训场景切入，附北信科大案例"
  - "对lead-007跟进，他上次问了价格但没回复，这次突出融资租赁2000元/月"
  - "给这5家集成商发送合作方案，重点说明渠道分成政策"
  - "处理所有新线索：评分分级，A级立即通知创始团队"

## 步骤2: 执行

### 新线索处理（每次心跳必做）
- 调用 GET /api/leads 拉取最近8小时新表单
- 调用 Dify API 拉取最近8小时客服对话
- 检查邮箱新来信
- 对每条新线索AI评分：
    A级（80-100）：明确需求+企业规模200人+ -> 写入CRM + 通知总经理
    B级（60-79）：有需求+企业规模50人+ -> 写入CRM
    C/D级：写入CRM低优先级
- 所有A级线索立即通过企业微信通知创始团队

### 命令任务执行
- 按总经理命令对指定客户执行触达/跟进/方案发送
- 生成定制方案时：读取客户信息 + /knowledge/pricing.md + /knowledge/product.md
- 方案含：推荐配置 + TCO对比 + ROI分析 + 融资租赁说明
- 通过SendGrid发送邮件
- 客户回复中检测购买信号（"怎么买""合同""付款""试用"等）
  -> 购买信号出现：立即写入 /reports/sales/URGENT.md 并标记为紧急

## 步骤3: 汇报
将执行结果写入 /reports/sales/task-XXX.md
  任务ID:
  新线索: 本轮新增X条（A级X/B级X/C级X）
  触达: 联系了谁/发了什么/客户反应
  跟进: 哪些客户有进展/哪些沉默
  购买信号: 有/无（如有则同时写URGENT.md）
  建议: 对总经理的建议（哪些客户值得重点攻、哪些应该放弃）

更新 /reports/sales/latest.md
```

---

## 七、Agent-Ops（运营部）--- 总经理的仪表盘

### 7.1 Agent定义 `/agents/ops/AGENTS.md`

```markdown
# Agent-Ops: 运营部
你是AI总经理的运营部门。你负责采集数据、监控系统、生成报表。
你是总经理的仪表盘，确保总经理每次醒来都能看到准确的全局数据。
你还负责监控其他Agent的健康状态。
model: deepseek-v3（数据处理用低成本模型）
```

### 7.2 工作模式 `/agents/ops/HEARTBEAT.md`

```markdown
# 每8小时执行（在其他Agent之前执行，为总经理准备数据）

## 步骤1: 采集数据
- 百度统计API -> 官网PV/UV/来源/热门页面
- SendGrid API -> 邮件发送量/打开率/点击率
- /data/crm/ -> 线索总量/各级别分布/漏斗转化率
- 各Agent的 /reports/ -> 各部门执行情况

## 步骤2: 生成经营报表
写入 /reports/ops/latest.md，格式：

  【微算经营仪表盘 YYYY-MM-DD HH:00】

  ## 核心指标
  - 累计线索: X条 | 本周新增: X条
  - A级线索: X条 | 热线索（有购买信号）: X条
  - 已发送方案: X份 | 客户回复率: X%
  - 微算-B成交: X单 | 收入: X元

  ## 漏斗数据
  - 官网访问 -> 留资 -> 有效线索 -> 方案阶段 -> 成交
  - X -> X -> X -> X -> X（转化率: X% -> X% -> X% -> X%）

  ## 各部门执行状态
  - Scout: 最后执行时间 / 本周搜索X家企业
  - Content: 最后执行时间 / 本周发布X篇内容
  - Sales: 最后执行时间 / 本周触达X家客户

  ## 异常告警
  - （如有Agent超过16小时未执行 -> 标红）
  - （如有A级线索超过24小时未处理 -> 标红）
  - （如有邮件发送失败率>20% -> 标红）

  ## 距离目标
  - 首单成交目标: 未完成/已完成
  - 月度收入目标: 当前X元 / 目标X元

## 步骤3: 紧急通知
- 如果检测到紧急异常 -> 通过企业微信API通知创始团队
- 如果 /reports/sales/URGENT.md 存在 -> 确认创始团队已收到通知

## 步骤4: 读取并执行总经理额外命令
读取 /orders/ops/current.md，执行总经理可能下达的额外任务
```

---

## 八、总经理的决策循环（核心运行机制）

```mermaid
sequenceDiagram
    participant GM as AI总经理
    participant Ops as 运营部
    participant Scout as 侦察兵
    participant Content as 内容部
    participant Sales as 销售部
    participant Team as 创始团队

    Note over GM: 每8小时心跳触发

    rect rgb(40,40,60)
    Note over Ops: 第1轮：运营部先行（准备数据）
    Ops->>Ops: 采集全局数据
    Ops->>GM: 写入 /reports/ops/latest.md
    end

    rect rgb(40,60,40)
    Note over GM: 第2轮：总经理决策
    GM->>GM: 读取所有报告 -> 判断局面
    GM->>GM: 思考：当前战略是否有效？
    GM->>GM: 决策：加速/调整/换方向
    GM->>Scout: 写入 /orders/scout/current.md
    GM->>Content: 写入 /orders/content/current.md
    GM->>Sales: 写入 /orders/sales/current.md
    GM->>GM: 记录决策日志
    end

    rect rgb(60,40,40)
    Note over Scout,Sales: 第3轮：下属执行
    Scout->>Scout: 执行搜索任务
    Scout->>GM: 汇报 /reports/scout/
    Content->>Content: 执行内容任务
    Content->>GM: 汇报 /reports/content/
    Sales->>Sales: 执行销售任务
    Sales->>GM: 汇报 /reports/sales/
    Sales-->>Team: 购买信号 -> 紧急通知
    end

    Note over GM: 8小时后重复...
```



**执行顺序保障**：通过OpenClaw分时心跳实现：

- Ops心跳偏移: 0分钟（每轮最先执行）
- GM心跳偏移: 30分钟（Ops完成后GM开始思考）
- Scout/Content/Sales心跳偏移: 60分钟（GM下完命令后开始执行）

---

## 九、总经理的策略备选库

总经理不是只能执行预设策略。以下是初始策略库，总经理可以在运行中自主增删：

### 策略A: 高校路径（已验证）

- 北信科大模式复制：72小时部署、百人并发、学生获奖率提升30%
- 目标客户：有AI/大数据专业的本科院校和高职院校
- 切入点：微算-B免费试用 -> 验证效果 -> 采购/租赁扩展

### 策略B: 集成商渠道

- 找AI/IT系统集成商，微算-B打包进他们的解决方案
- 集成商卖方案赚服务费，微算赚设备租赁费，双赢
- 切入点：渠道分成政策 + 免费样机

### 策略C: 制造业直推

- 数据不出域是刚需，融资租赁2000元/月门槛极低
- 目标：有AI质检/预测维护需求的制造企业
- 切入点：TCO对比（微算vs云方案省58-62%）

### 策略D: 政府科技项目

- 申报地方科技创新项目，微算-B作为示范设备
- 项目资金覆盖设备费用，客户零成本
- 切入点：搜索各地科技局算力补贴/AI示范项目公告

### 策略E: 算力补贴借力

- 多地政府有算力补贴政策（如上海、深圳、杭州）
- 帮客户申请补贴，实际上客户零成本或极低成本获得微算-B
- 切入点：整理各地补贴政策，匹配目标客户

### 策略F: AI培训机构

- AI培训机构需要实训设备，微算-B开箱即用
- 批量采购可能性高
- 切入点：教学实训场景 + 批量定价

### 策略G: 合伙人加速

- 零加盟费 + 免费100套设备（价值500万）
- 合伙人带来本地客户资源
- 切入点：在IT/AI行业集中的城市招募

### 策略H: 存量客户深挖

- 华为、中国移动、亚信科技已是客户
- 推动二次采购 / 内部推荐 / 案例授权
- 切入点：客户成功回访 + 转介绍激励

### 策略Z: 总经理自创新策略

- 总经理在运行过程中可能发现新的机会
- 记录在 /strategy/new-ideas.md 中
- 评估可行性后加入执行

---

## 十、数据文件结构

```
/openclaw-workspace/
  HEARTBEAT.md                     # 全局心跳配置（8小时）

  /agents/
    gm/SOUL.md                     # 总经理身份
    gm/HEARTBEAT.md                # 总经理思考框架
    scout/AGENTS.md                # 侦察兵定义
    scout/HEARTBEAT.md
    content/AGENTS.md              # 内容部定义
    content/HEARTBEAT.md
    sales/AGENTS.md                # 销售部定义
    sales/HEARTBEAT.md
    ops/AGENTS.md                  # 运营部定义
    ops/HEARTBEAT.md

  /strategy/
    current-strategy.md            # 当前战略（总经理维护）
    new-ideas.md                   # 新策略构想
    gm-log/                        # 总经理决策日志
      2026-03-10-08.md
      2026-03-10-16.md

  /orders/                         # 总经理下达的命令
    scout/current.md
    content/current.md
    sales/current.md
    ops/current.md

  /reports/                        # 下属的汇报
    scout/latest.md
    scout/task-xxx.md
    content/latest.md
    sales/latest.md
    sales/URGENT.md                # 紧急事项（购买信号等）
    ops/latest.md

  /knowledge/                      # 共享知识库
    product.md                     # 来自微算产品宣传册.md
    business.md                    # 来自共享微算商业计划书.md
    pricing.md                     # 定价表
    cases.md                       # 落地案例
    faq.md                         # 常见问答
    competitors.md                 # 竞品对比
    email-templates/               # 邮件模板
    sales-scripts/                 # 销售话术

  /data/
    crm/
      leads/lead-001.md            # 客户线索
      partners/partner-001.md      # 合伙人线索
      stats.md                     # 统计汇总
```

---

## 十一、实时响应层：Dify AI客服

独立于8小时心跳，7x24小时实时运行：

- 部署：Dify Cloud 或自托管，JS SDK嵌入官网
- 嵌入位置：[app/[locale]/layout.tsx](app/[locale]/layout.tsx)，新建 [components/AIChatbot.tsx](components/AIChatbot.tsx)
- 知识库：[共享微算商业计划书.md](共享微算商业计划书.md)、[微算产品宣传册.md](微算产品宣传册.md)
- 对话结束时 Webhook 自动 POST 到 `/api/leads`
- Agent-Sales 每次心跳自动拉取新线索

Dify客服是总经理体系的"前台接待"，但它不受总经理直接指挥（因为必须实时响应），总经理通过审阅客服产生的线索间接获得价值。

---

## 十二、官网技术改造项


| 改造项    | 涉及文件                            | 说明                        | 优先级 |
| ------ | ------------------------------- | ------------------------- | --- |
| 线索API  | `app/api/leads/route.ts`（新建）    | POST接收表单/Dify，GET供Sales拉取 | P0  |
| 博客API  | `app/api/blog/route.ts`（新建）     | POST供Content发布文章          | P0  |
| 博客页面   | `app/[locale]/blog/`（新建）        | 列表+详情页                    | P0  |
| Dify客服 | `components/AIChatbot.tsx`（新建）  | 嵌入聊天窗                     | P0  |
| 表单升级   | `app/[locale]/contact/page.tsx` | 增加行业/规模/需求字段              | P0  |
| 方案生成器  | `app/api/solution/route.ts`（新建） | Sales调用生成方案               | P1  |
| UTM追踪  | `app/[locale]/layout.tsx`       | 百度统计/GA4                  | P0  |


---

## 十三、执行时间表

### Phase 0: 环境搭建（第1天）

1. 购买VPS，安装OpenClaw Gateway，配置8小时心跳
2. 创建上述全部目录结构
3. 从项目文档构建 /knowledge/ 知识库
4. 编写总经理 SOUL.md 和初始 STRATEGY.md
5. 编写4个下属Agent的 AGENTS.md 和 HEARTBEAT.md

### Phase 1: 总经理+核心Agent上线（第2-5天）

1. Day 2: 部署Agent-Ops + Agent-GM，验证"看数据->思考->下令"循环
2. Day 3: 部署Agent-Sales + 官网线索API + 表单升级 + Dify客服
3. Day 4: 部署Agent-Scout，总经理开始下达搜索命令
4. Day 5: 部署Agent-Content + 博客模块，总经理开始下达内容命令

### Phase 2: 总经理自主运营（第2-4周）

- 总经理每8小时自主决策、下令、调整
- 人工仅需：每3天检查一次总经理的决策日志（/strategy/gm-log/），确认方向合理
- 总经理自主判断哪条路线有效、哪条无效，动态调整

### Phase 3: 总经理迭代优化（第5周+）

- 总经理根据累积数据优化策略
- 如果首月未成交，总经理必须在决策日志中分析原因并提出新方案
- 人工每周审阅总经理周报，决定是否需要给总经理补充信息或调整使命

---

## 十四、成本预算


| 项目         | 月成本              | 说明                                     |
| ---------- | ---------------- | -------------------------------------- |
| VPS（2核4G）  | 100-200元         | OpenClaw Gateway + Dify                |
| LLM API    | 1,000-2,000元     | GM用Claude（决策质量），Scout/Ops用DeepSeek（省钱） |
| Dify Cloud | 0-500元           | 或自托管免费                                 |
| SendGrid   | 0-200元           | 免费额度100封/天                             |
| 域名邮箱       | 0-50元            | 专业邮件发送                                 |
| **月度总计**   | **1,100-3,000元** | 相当于一个实习生月薪的1/3                         |


---

## 十五、与之前方案的根本区别


| 维度   | 之前（平级Agent）       | 现在（总经理驱动）               |
| ---- | ----------------- | ----------------------- |
| 决策权  | 无人决策，各Agent按固定清单跑 | 总经理统一决策，下属听命执行          |
| 战略调整 | 不会调整，写死的心跳任务      | 总经理每8小时评估，随时调整战略        |
| 目标导向 | 执行任务=目标           | 成交=目标，任务只是手段            |
| 失败应对 | 无应对，继续执行无效任务      | 总经理发现无效就换策略换路线          |
| 创新能力 | 无                 | 总经理可以自创新策略              |
| 资源分配 | 固定分配              | 总经理动态调配，哪里有机会就往哪里砸      |
| 协同   | Agent间通过文件松耦合     | 总经理统一协调，确保所有Agent围绕同一目标 |


---

## 十六、风险与应对


| 风险           | 应对                                                                         |
| ------------ | -------------------------------------------------------------------------- |
| 总经理决策质量不够    | 用Claude最强模型；人工每3天审阅决策日志；SOUL.md中注入丰富的商业知识                                  |
| 总经理陷入循环/死胡同  | 设置"连续3次心跳无有效行动"告警；人工介入调整SOUL或STRATEGY                                      |
| 下属Agent执行不到位 | Ops监控各Agent执行状态；总经理在汇报中发现问题会下达纠正命令                                         |
| OpenClaw安全漏洞 | 不暴露端口，TLS，隔离VM，定期更新                                                        |
| LLM成本超支      | 总经理的SOUL中写明预算约束；Scout/Ops用DeepSeek；设硬上限                                    |
| 邮件被标垃圾       | 域名邮箱+SPF/DKIM；总经理控制发送频率（不贪多）                                               |
| 整体0成交        | 这是总经理要解决的问题。如果所有已知策略失效，总经理必须想新办法，包括但不限于：降价、换行业、换目标客户、换合作模式、通知创始团队"我需要更多信息" |


