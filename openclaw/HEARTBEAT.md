# OpenClaw Global Heartbeat Configuration
interval: 480
timezone: Asia/Shanghai

# Execution order (staggered to ensure data flows correctly):
# 1. Agent-Ops runs first (offset: 0 min) - collects data, prepares dashboard
# 2. Agent-GM runs second (offset: 30 min) - reads reports, thinks, decides, issues orders
# 3. Agent-Scout/Content/Sales run third (offset: 60 min) - execute GM's orders

# Every heartbeat cycle the Gateway must:
- [ ] Trigger Agent-Ops to collect fresh data
- [ ] Wait for Ops report, then trigger Agent-GM
- [ ] Wait for GM orders, then trigger Scout, Content, Sales in parallel
- [ ] Log cycle completion to /data/logs/cycle-YYYY-MM-DD-HH.md
