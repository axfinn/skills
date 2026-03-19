#!/bin/bash
# Claude Dev Assistant - 快速启动脚本
# 使用方式：./dev-quick.sh "需求描述" [项目路径]

set -e

DEV_ASSISTANT_DIR="/home/node/.openclaw/workspace/clawtest/claude_dev_assistant"
CLAUDE_BIN="/home/node/.openclaw/workspace/tools/bin/claude"

# ⚠️ 配置直连 API，不走代理
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"

# 添加 Claude CLI 到 PATH
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"

if [ -z "$1" ]; then
    echo "🤖 Claude Dev Assistant"
    echo "========================"
    echo ""
    echo "用法：$0 \"需求描述\" [项目路径]"
    echo ""
    echo "示例:"
    echo "  $0 \"创建一个计算器程序\""
    echo "  $0 \"创建用户管理 API\" /path/to/project"
    echo ""
    echo "环境配置:"
    echo "  export NO_PROXY=\"api.minimaxi.com,*.minimaxi.com\""
    echo "  export PATH=\"/home/node/.openclaw/workspace/tools/bin:\$PATH\""
    exit 1
fi

REQUIREMENT="$1"
PROJECT_PATH="${2:-.}"

echo "🤖 Claude Dev Assistant"
echo "========================"
echo "需求：$REQUIREMENT"
echo "路径：$PROJECT_PATH"
echo "Claude: $CLAUDE_BIN"
echo "网络：直连 (NO_PROXY)"
echo ""

# 检查 Claude CLI 是否存在
if [ ! -f "$CLAUDE_BIN" ]; then
    echo "❌ Claude CLI 不存在：$CLAUDE_BIN"
    echo "💡 请确认路径正确或安装 Claude Code"
    exit 1
fi

cd "$DEV_ASSISTANT_DIR"

if [ "$PROJECT_PATH" = "." ]; then
    python3 driver.py develop "$REQUIREMENT" --claude "$CLAUDE_BIN"
else
    python3 driver.py develop "$REQUIREMENT" --path "$PROJECT_PATH" --claude "$CLAUDE_BIN"
fi

echo ""
echo "✅ 开发完成!"
