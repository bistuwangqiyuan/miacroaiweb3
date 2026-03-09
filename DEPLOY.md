# 部署指南

本项目包含两部分：**微算官网**（Next.js，部署到 Netlify）和 **AI自治销售组织**（OpenClaw，部署到 VPS）。

---

## 第一部分：官网部署（Netlify）

### 推荐：通过 Netlify 网站（Git 连接）

1. **推送代码到 Git**
   将本项目推送到 GitHub / GitLab / Bitbucket。

2. **在 Netlify 创建站点**
   - 打开 [Netlify](https://app.netlify.com) → Add new site → Import an existing project
   - 选择你的仓库，分支选 `main`
   - Build command: `npm run build`
   - 点击 Deploy site

3. **环境变量**
   在 Site settings → Environment variables 中添加：

   | 变量名 | 说明 |
   |--------|------|
   | `DATABASE_URL` | Neon 数据库连接串 |
   | `DEEPSEEK_API_KEY` | AI 客服（ChatBot） |
   | `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` | 百度统计 ID |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID |
   | `SENDGRID_API_KEY` | SendGrid 邮件发送 |
   | `WECHAT_WORK_WEBHOOK_URL` | 企业微信 Webhook |

4. **数据库建表**
   在 Neon 控制台执行：
   ```sql
   -- 先执行基础表
   scripts/schema.sql

   -- 再执行AI销售系统表（leads + blog_posts）
   scripts/schema-sales.sql
   ```

5. **Identity（登录/注册）**
   在 Netlify 站点 → Identity → Enable Identity。

---

## 第二部分：AI自治销售组织部署（OpenClaw）

### 系统要求

- Linux VPS（2核4G 起步，约100-200元/月）或 macOS/WSL
- Node.js >= 22
- LLM API 密钥（Anthropic Claude + DeepSeek）

### 快速部署（5分钟）

```bash
# 1. SSH 到你的 VPS
ssh user@your-server

# 2. 克隆项目
git clone https://github.com/bistuwangqiyuan/miacroaiweb3.git
cd miacroaiweb3/openclaw

# 3. 运行自动化安装脚本
chmod +x setup.sh
./setup.sh

# 4. 配置 API 密钥
openclaw models auth setup-token --provider anthropic
# 粘贴你的 Anthropic API Key

# 5. 设置环境变量
export DEEPSEEK_API_KEY=your_deepseek_key
export SENDGRID_API_KEY=your_sendgrid_key
export WECHAT_WORK_WEBHOOK_URL=your_webhook_url
export SITE_URL=https://your-site.netlify.app

# 6. 启动 Gateway
cd /path/to/miacroaiweb3/openclaw
openclaw gateway start
```

### 手动部署（详细步骤）

#### Step 1: 安装 OpenClaw

```bash
# 安装 Node.js 22（如未安装）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22

# 安装 OpenClaw
npm install -g openclaw
openclaw --version
```

#### Step 2: 启用技能

```bash
openclaw skills enable browser search files code
openclaw skills list
```

#### Step 3: 配置模型

```bash
# Anthropic Claude（GM/Content/Sales 使用）
openclaw models auth setup-token --provider anthropic

# 设置默认模型
openclaw config set agents.defaults.model.primary claude-sonnet-4-5
```

对于 DeepSeek（Scout/Ops 使用），设置环境变量：
```bash
export DEEPSEEK_API_KEY=your_key
export DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
```

或者使用 Ollama 运行本地模型（零成本）：
```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3

# 配置 OpenClaw 使用 Ollama
openclaw models auth setup-token --provider ollama
```

#### Step 4: 启动 Gateway

```bash
cd /path/to/miacroaiweb3/openclaw
openclaw gateway start
```

预期输出：
```
[OpenClaw] Loading agents.md...
[OpenClaw] Agents: @gm, @scout, @content, @sales, @ops
[OpenClaw] Loading HEARTBEAT.md...
[OpenClaw] Scheduled tasks: 5 tasks configured
[OpenClaw] Gateway running on port 18789
```

#### Step 5: 后台运行（生产环境）

使用 systemd 保持 Gateway 持续运行：

```bash
sudo tee /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Sales Organization
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/miacroaiweb3/openclaw
ExecStart=/usr/local/bin/openclaw gateway start
Restart=always
RestartSec=10
Environment=DEEPSEEK_API_KEY=your_key
Environment=SENDGRID_API_KEY=your_key
Environment=WECHAT_WORK_WEBHOOK_URL=your_webhook
Environment=SITE_URL=https://your-site.netlify.app

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw

# 查看运行状态
sudo systemctl status openclaw

# 查看日志
journalctl -u openclaw -f
```

---

### 运行机制

系统每 **8小时** 自动执行一次完整周期：

```
时间线（每8小时一轮）:
├── :00  Agent-Ops 执行 → 采集数据，生成经营报表
├── :30  Agent-GM 执行  → 读取报表，思考，决策，下达命令
├── :60  Agent-Scout 执行  → 按GM命令搜索市场情报
├── :60  Agent-Content 执行 → 按GM命令生产内容
└── :60  Agent-Sales 执行  → 处理线索 + 按GM命令跟进客户
```

每天运行 3 轮（00:00、08:00、16:00 开始）。

### Agent 通信机制

```
/orders/{agent}/current.md  ← GM 写入命令
/reports/{agent}/latest.md  ← Agent 写入汇报
/strategy/current-strategy.md ← GM 维护战略
/strategy/gm-log/            ← GM 决策日志
/data/crm/leads/              ← Sales 管理客户
```

### 手动操作命令

```bash
# 手动触发单个 Agent
openclaw agent --name gm --message "执行总经理心跳任务"
openclaw agent --name ops --message "执行运营部心跳任务"
openclaw agent --name scout --message "执行侦察兵心跳任务"
openclaw agent --name content --message "执行内容部心跳任务"
openclaw agent --name sales --message "执行销售部心跳任务"

# 手动执行一个完整周期
openclaw agent --name ops --message "执行运营部心跳任务"
sleep 60
openclaw agent --name gm --message "执行总经理心跳任务"
sleep 60
openclaw agent --name scout --message "执行侦察兵心跳任务" &
openclaw agent --name content --message "执行内容部心跳任务" &
openclaw agent --name sales --message "执行销售部心跳任务" &
wait

# 查看 Agent 状态
openclaw agents list

# 查看 Gateway 状态
openclaw gateway status

# 重启 Gateway
openclaw gateway restart
```

### 监控与维护

**日常检查（每3天）：**
- 查看 GM 决策日志：`cat openclaw/strategy/gm-log/` 下最新文件
- 确认方向合理，必要时调整 `strategy/current-strategy.md`

**查看经营数据：**
```bash
cat openclaw/reports/ops/latest.md
```

**查看 GM 最新决策：**
```bash
ls -lt openclaw/strategy/gm-log/ | head -5
cat openclaw/strategy/gm-log/$(ls -t openclaw/strategy/gm-log/ | head -1)
```

**排查问题：**
```bash
# Gateway 日志
tail -100 ~/.openclaw/logs/gateway.log

# Agent 最近报告
cat openclaw/reports/scout/latest.md
cat openclaw/reports/content/latest.md
cat openclaw/reports/sales/latest.md

# 检查是否有紧急事项
cat openclaw/reports/sales/URGENT.md 2>/dev/null
```

---

### 成本预算

| 项目 | 月成本 | 说明 |
|------|--------|------|
| VPS（2核4G） | 100-200元 | OpenClaw Gateway |
| LLM API | 1,000-2,000元 | GM/Sales/Content用Claude，Scout/Ops用DeepSeek |
| SendGrid | 0-200元 | 免费额度100封/天 |
| **月度总计** | **1,100-2,400元** | 相当于一个实习生月薪的1/3 |

---

### 文件结构速查

```
openclaw/
├── agents.md           # 多Agent团队注册
├── HEARTBEAT.md        # 8小时定时任务调度
├── setup.sh            # 自动化安装脚本
├── config/
│   ├── models.yaml     # 模型配置
│   └── skills.yaml     # 技能配置
├── agents/
│   ├── gm/SOUL.md      # AI总经理身份+决策框架
│   ├── scout/SOUL.md   # 侦察兵身份+搜索任务
│   ├── content/SOUL.md # 内容部身份+生产任务
│   ├── sales/SOUL.md   # 销售部身份+销售任务
│   └── ops/SOUL.md     # 运营部身份+报表任务
├── strategy/           # 战略文件（GM维护）
├── orders/             # 命令队列（GM → 下属）
├── reports/            # 汇报文件（下属 → GM）
├── knowledge/          # 共享知识库
└── data/               # CRM + 内容数据
```
