#!/bin/bash
set -e

echo "========================================="
echo "  微算 AI 自治销售组织 — OpenClaw 部署脚本"
echo "========================================="
echo ""

# 1. Check Node.js version
echo "[1/7] 检查 Node.js 版本..."
NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 22 ]; then
    echo "❌ 需要 Node.js >= 22，当前版本: $(node -v 2>/dev/null || echo '未安装')"
    echo "   安装方法: nvm install 22 && nvm use 22"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# 2. Install OpenClaw
echo ""
echo "[2/7] 安装 OpenClaw..."
if command -v openclaw &> /dev/null; then
    echo "✅ OpenClaw 已安装: $(openclaw --version)"
else
    npm install -g openclaw
    echo "✅ OpenClaw 安装完成: $(openclaw --version)"
fi

# 3. Enable skills
echo ""
echo "[3/7] 启用 OpenClaw 技能..."
openclaw skills enable browser search files code 2>/dev/null || true
echo "✅ 技能已启用: browser, search, files, code"

# 4. Configure model providers
echo ""
echo "[4/7] 配置模型提供商..."
echo ""
echo "需要配置 LLM API 密钥。系统将使用:"
echo "  - Anthropic Claude (GM/Content/Sales — 决策和沟通质量关键)"
echo "  - DeepSeek (Scout/Ops — 低成本数据处理)"
echo ""

if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "请输入 Anthropic API Key (用于 GM/Content/Sales):"
    read -r ANTHROPIC_KEY
    if [ -n "$ANTHROPIC_KEY" ]; then
        openclaw models auth setup-token --provider anthropic <<< "$ANTHROPIC_KEY" 2>/dev/null || \
            echo "⚠️  请手动运行: openclaw models auth setup-token --provider anthropic"
    fi
else
    echo "✅ ANTHROPIC_API_KEY 已设置"
fi

echo ""
echo "DeepSeek 配置 (用于 Scout/Ops):"
echo "  设置环境变量: export DEEPSEEK_API_KEY=your_key"
echo "  或使用 Ollama 本地模型: ollama pull deepseek-v3"

# 5. Set default model
echo ""
echo "[5/7] 设置默认模型..."
openclaw config set agents.defaults.model.primary claude-sonnet-4-5 2>/dev/null || true
echo "✅ 默认模型: claude-sonnet-4-5"

# 6. Register agents
echo ""
echo "[6/7] 注册 Agent..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

for agent in gm scout content sales ops; do
    if [ -f "$SCRIPT_DIR/agents/$agent/SOUL.md" ]; then
        echo "  ✅ @$agent — SOUL.md 已就绪"
    else
        echo "  ❌ @$agent — 缺少 SOUL.md"
    fi
done

# 7. Verify structure
echo ""
echo "[7/7] 验证工作区结构..."
REQUIRED_DIRS="agents strategy orders reports knowledge data config"
ALL_OK=true
for dir in $REQUIRED_DIRS; do
    if [ -d "$SCRIPT_DIR/$dir" ]; then
        echo "  ✅ /$dir/"
    else
        echo "  ❌ /$dir/ 不存在"
        ALL_OK=false
    fi
done

echo ""
echo "========================================="
if [ "$ALL_OK" = true ]; then
    echo "✅ 部署准备完成！"
else
    echo "⚠️  部分目录缺失，请检查。"
fi
echo ""
echo "下一步："
echo "  1. cd $(dirname "$0")"
echo "  2. openclaw gateway start"
echo ""
echo "Gateway 启动后，HEARTBEAT.md 将按计划触发："
echo "  - 每8小时: Ops(数据) -> GM(决策) -> Scout/Content/Sales(执行)"
echo ""
echo "手动触发单个 Agent:"
echo "  openclaw agent --name gm --message '执行总经理心跳任务'"
echo "  openclaw agent --name scout --message '执行侦察兵心跳任务'"
echo ""
echo "监控日志:"
echo "  tail -f ~/.openclaw/logs/gateway.log"
echo "========================================="
