---
name: claude-dev-assistant
description: 基于 Claude Code CLI 的全流程自动化开发工具 - 需求分析→架构设计→代码实现→测试→代码审查→Git 提交
---

# Claude Dev Assistant Skill

基于 Claude Code CLI 的智能开发助手，实现从需求到代码的全流程自动化。

## 环境配置

### Claude CLI 路径

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"
```

### API 配置

编辑 `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-cp-xxx",
    "ANTHROPIC_MODEL": "MiniMax-M2.5",
    "NO_PROXY": "api.minimaxi.com,*.minimaxi.com"
  }
}
```

## 使用方法

```bash
# 基本用法
python3 driver.py develop "创建一个用户管理系统"

# 指定项目路径
python3 driver.py develop "创建一个计算器程序" --path /path/to/project

# 使用脚本
./claude-dev "创建一个 TODO 应用" --path /path/to/project
```

## 7 阶段开发流程

| 阶段 | 说明 | 输出 |
|------|------|------|
| 1. 需求调研 | WebSearch 搜索优秀方案 | 技术栈建议 |
| 2. 需求分析 | 功能点、用户故事、验收标准 | `docs/01-REQUIREMENTS.md` |
| 3. 技术方案 | 架构设计、模块设计 | `docs/02-DESIGN.md` |
| 4. 代码实现 | Claude 生成完整代码 | 源代码文件 |
| 5. 测试用例 | 单元测试 + 集成测试 | `tests/test_*.py` |
| 6. 测试回归 | 运行测试验证 | 测试报告 |
| 7. 代码审查 | 循环改进直到通过 (最多 5 轮) | 审查报告 |

## 项目位置

```
/home/node/.openclaw/workspace/clawtest/claude_dev_assistant/
```

## 验证安装

```bash
# 验证 Claude CLI
which claude
claude --version

# 测试 API 配置
claude --print -p "Hello"
```

## 详细文档

完整文档和示例请查看：https://github.com/axfinn/claude-dev-assistant
