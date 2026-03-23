---
name: claude-dev-assistant
description: 基于 Claude Code CLI 的全流程自动化开发工具 - 需求分析→架构设计→代码实现→测试→代码审查→Git 提交。使用 claude-dev-assistant 驱动开发新功能和项目。
---

# Claude Dev Assistant Skill

基于 Claude Code CLI 的智能开发助手，实现从需求到代码的全流程自动化。

## 项目位置

```
/home/node/.openclaw/workspace/clawtest/claude_dev_assistant/
```

## 环境配置 ⚠️

### Claude CLI 路径

**Claude CLI 二进制位置**：
```bash
/home/node/.openclaw/workspace/tools/bin/claude
```

### 添加到环境变量

**方法 1：临时添加（当前会话）**
```bash
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"
```

**方法 2：永久添加（推荐）**
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**方法 3：在 openclaw 配置中添加**
```bash
# Gateway 环境变量中添加工具路径
```

### 验证安装

```bash
# 验证 Claude CLI 是否可用
which claude
claude --version
```

---

### Claude API 配置

**配置文件位置**：`~/.claude/settings.json`

**示例配置**（使用 MiniMax 模型）：

```json
{
  "skills": {
    "paths": ["~/.claude/skills"]
  },
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-cp-xxx",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_SMALL_FAST_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.5"
  }
}
```

**⚠️ 重要**：`ANTHROPIC_BASE_URL` 使用 `https://api.minimaxi.com/anthropic`（Anthropic 兼容端点）

### ⚠️ 网络配置 - 直连 API

**重要**：需要配置直连，不走代理！

**方法 1：在 shell 中设置环境变量**
```bash
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"
```

**方法 2：添加到 ~/.bashrc 或 ~/.zshrc**
```bash
echo 'export NO_PROXY="api.minimaxi.com,*.minimaxi.com"' >> ~/.bashrc
echo 'export no_proxy="api.minimaxi.com,*.minimaxi.com"' >> ~/.bashrc
source ~/.bashrc
```

**方法 3：在 driver.py 中设置（推荐）**
修改 `driver.py` 在调用 Claude 前设置：
```python
import os
os.environ['NO_PROXY'] = 'api.minimaxi.com,*.minimaxi.com'
os.environ['no_proxy'] = 'api.minimaxi.com,*.minimaxi.com'
```

### ⚠️ 网络配置 - 直连 API

**重要**：必须配置直连，不走代理！

**方法 1：环境变量（推荐）**

```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"
```

**方法 2：在 claude-dev-assistant 脚本中添加**

```bash
# scripts/dev-quick.sh 中已添加
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"
```

**方法 3：临时设置**

```bash
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"
```

### 验证配置

```bash
# 设置环境变量
export NO_PROXY="api.minimaxi.com,*.minimaxi.com"
export no_proxy="api.minimaxi.com,*.minimaxi.com"
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"

# 测试 API 连接
curl -s -X POST "https://api.minimaxi.com/v1/text/chatcompletion_v2" \
  -H "Authorization: Bearer $ANTHROPIC_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model":"MiniMax-M2.5","messages":[{"role":"user","content":"Hello"}],"max_tokens":50}'

# 测试 Claude CLI
claude --print -p "Hello"
```

### 配置说明

| 环境变量 | 说明 | 示例值 |
|----------|------|--------|
| `ANTHROPIC_BASE_URL` | API 端点地址 | `https://api.minimaxi.com/anthropic` |
| `ANTHROPIC_AUTH_TOKEN` | API 认证 Token | `sk-cp-xxx` |
| `API_TIMEOUT_MS` | API 超时时间（毫秒） | `3000000` (50 分钟) |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 禁用非必要流量 | `1` |
| `ANTHROPIC_MODEL` | 默认模型 | `MiniMax-M2.5` |
| `ANTHROPIC_SMALL_FAST_MODEL` | 快速小模型 | `MiniMax-M2.5` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Sonnet 级别模型 | `MiniMax-M2.5` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Opus 级别模型 | `MiniMax-M2.5` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Haiku 级别模型 | `MiniMax-M2.5` |

### 登录验证

```bash
# 测试配置是否正确
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"
claude --print -p "Hello"

# 成功：返回 Claude 响应
# 失败：Not logged in · Please run /login
```

## 快速开始

### 基本用法

```bash
# 进入项目目录
cd /home/node/.openclaw/workspace/clawtest/claude_dev_assistant

# 开发新功能 (最简单的方式)
python3 driver.py develop "创建一个用户管理系统"

# 指定项目路径
python3 driver.py develop "创建一个计算器程序" --path /path/to/project

# 指定 Claude 路径（如果环境变量未配置）
python3 driver.py develop "需求描述" --claude /home/node/.openclaw/workspace/tools/bin/claude
```

### 使用封装脚本

```bash
# 直接使用 claude-dev 脚本
cd /home/node/.openclaw/workspace/clawtest/claude_dev_assistant
./claude-dev "创建一个 TODO 应用" --path /path/to/project
```

### 使用快速启动脚本

```bash
# 从 skill 目录调用
/home/node/.openclaw/workspace/skills/claude-dev-assistant/scripts/dev-quick.sh "需求描述" [项目路径]
```

## 7 阶段开发流程

系统自动执行以下阶段：

| 阶段 | 说明 | 输出 |
|------|------|------|
| 1. 需求调研 | WebSearch 搜索优秀方案 | 技术栈建议 |
| 2. 需求分析 | 功能点、用户故事、验收标准 | `docs/01-REQUIREMENTS.md` |
| 3. 技术方案 | 架构设计、模块设计 | `docs/02-DESIGN.md` |
| 4. 代码实现 | Claude 生成完整代码 | 源代码文件 |
| 5. 测试用例 | 单元测试 + 集成测试 | `tests/test_*.py` |
| 6. 测试回归 | 运行测试验证 | 测试报告 |
| 7. 代码审查 | 循环改进直到通过 (最多 5 轮) | 审查报告 |

完成后自动 Git 提交。

## 核心模块

### driver.py - 主入口

```python
from pathlib import Path
from driver import ClaudeDriver

# 创建驱动实例
driver = ClaudeDriver(
    project_path=Path("/path/to/project"),
    claude_bin=Path("/usr/local/bin/claude")
)

# 执行开发
result = driver.develop("创建一个计算器程序")
```

### core/clients/claude_client.py - Claude 客户端

统一调用 Claude CLI 的接口：

```python
from core.clients import ClaudeClient
from core.shared import Logger, ProgressReporter

client = ClaudeClient(
    claude_bin=Path("/usr/local/bin/claude"),
    project_path=Path("/path/to/project"),
    logger=Logger(log_dir),
    reporter=ProgressReporter(interval=30)
)

# 调用 Claude
result = client.call("生成一个 Python 计算器代码")

# 解析 JSON 响应
data = client.parse_json(result, default={})

# 生成代码
files = client.generate_code(
    requirement="创建计算器",
    tech_stack=["Python"],
    existing_files=["existing.py"]
)
```

### core/pipeline/development_pipeline.py - 开发流水线

整合所有开发阶段：

```python
from core.pipeline import DevelopmentPipeline

pipeline = DevelopmentPipeline(
    claude_client=client,
    logger=logger,
    reporter=reporter,
    project_path=Path("/path/to/project")
)

# 运行完整流程
result = pipeline.run("创建一个 TODO 应用")
```

### core/phases/ - 开发阶段

| 阶段类 | 说明 |
|--------|------|
| `RequirementsResearchPhase` | 需求调研 |
| `RequirementsAnalysisPhase` | 需求分析 |
| `ArchitectureDesignPhase` | 架构设计 |
| `ImplementationPhase` | 代码实现 |
| `TestingPhase` | 测试生成 |
| `CodeReviewPhase` | 代码审查 |

### core/config/config_manager.py - 配置管理

```python
from core.config import ConfigManager

config = ConfigManager(Path("/path/to/project"))

# 获取配置
review_cycles = config.get('quality.review_cycles')

# 设置配置
config.set('quality.review_cycles', 5)
config.save()
```

### core/memory/memory_manager.py - 记忆管理

管理开发上下文和检查点：

```python
from core.memory import MemoryManager

memory = MemoryManager(Path("/path/to/project"))

# 保存检查点
memory.save_checkpoint('after_implementation')

# 恢复检查点
memory.restore_checkpoint('after_implementation')
```

## 配置说明

### 项目配置 `.claude/config.yaml`

```yaml
version: '1.0'

project:
  name: my-project
  type: default

quality:
  review_cycles: 3  # 最大审查轮次
  gates:
    code_quality: required
    test_coverage: required
    security: required
    performance: optional

skills:
  enabled:
    - codeql
    - super-linter
  auto_run: false

memory:
  auto_save: true
  checkpoint_interval: 5
  max_checkpoints: 10

interrupt:
  graceful_timeout: 30
  auto_save: true
```

## 示例场景

### 开发 Chrome 插件

```bash
python3 driver.py develop "chrome 浏览器插件，支持视频抽帧" \
  --path /home/node/.openclaw/workspace/my-chrome-ext/
```

### 开发 Python API

```bash
python3 driver.py develop "用户管理 API，支持 JWT 认证" \
  --path /home/node/.openclaw/workspace/my-api/
```

### 开发 React 前端

```bash
python3 driver.py develop "待办事项 React 应用，支持本地存储" \
  --path /home/node/.openclaw/workspace/my-app/
```

## 生成的文档结构

每个项目自动生成以下文档：

```
项目目录/
├── docs/
│   ├── 01-REQUIREMENTS.md   # 需求规格文档
│   ├── 02-DESIGN.md         # 技术方案文档
│   └── 03-TEST_PLAN.md      # 测试计划文档
├── .claude/
│   └── logs/                # 执行日志
└── .git/                    # Git 提交记录
```

## 依赖要求

- **Python**: 3.10+
- **Claude Code CLI**: 必须安装
- **pyyaml**: `pip install pyyaml`

### 配置文件

**Claude 配置文件**：`~/.claude/settings.json`

必须包含有效的 API 配置才能运行：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-cp-xxx",
    "ANTHROPIC_MODEL": "MiniMax-M2.5"
  }
}
```

### Claude CLI 路径配置 ⚠️

**当前环境 Claude CLI 位置**：
```
/home/node/.openclaw/workspace/tools/bin/claude
```

**添加到环境变量**（三选一）：

```bash
# 方法 1：临时添加
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"

# 方法 2：永久添加 (~/.bashrc)
echo 'export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 方法 3：使用 --claude 参数指定
python3 driver.py develop "需求" --claude /home/node/.openclaw/workspace/tools/bin/claude
```

### 验证安装

```bash
which claude
# 应输出：/home/node/.openclaw/workspace/tools/bin/claude

claude --version
# 应输出：2.1.x (Claude Code)

# 测试 API 配置
claude --print -p "Hello"
# 成功：返回 Claude 响应
# 失败：Not logged in 或 API 错误
```

## 故障排查

### 嵌套运行错误

```
⚠️ 检测到嵌套运行，Claude CLI 无法在 Claude Code 环境中调用
💡 请直接使用 Claude Code 而非通过 driver.py 调用
```

**解决**: 不要在 Claude Code 会话中运行 driver.py，直接在终端运行。

### Claude CLI 未找到

```
❌ Claude CLI 不存在：/usr/local/bin/claude
💡 请安装 Claude Code 或指定正确路径：--claude /path/to/claude
```

**解决**: 使用 `--claude` 参数指定正确路径。

### 查看详细日志

日志位于项目 `.claude/logs/` 目录下。

## API 参考

### ClaudeDriver 方法

| 方法 | 说明 |
|------|------|
| `develop(requirement)` | 执行完整开发流程 |
| `call_claude(prompt, timeout)` | 调用 Claude CLI |
| `parse_json_response(response, default)` | 解析 JSON 响应 |
| `analyze_requirement(requirement)` | 分析需求 |
| `generate_spec(requirement, analysis)` | 生成需求文档 |

### ClaudeClient 方法

| 方法 | 说明 |
|------|------|
| `call(prompt, timeout)` | 调用 Claude |
| `parse_json(response, default)` | 解析 JSON |
| `generate_code(requirement, tech_stack, existing_files)` | 生成代码 |

## 扩展开发

### 添加新的开发阶段

```python
# core/phases/my_phase.py
from core.phases import DevelopmentPhase, PhaseResult

class MyCustomPhase(DevelopmentPhase):
    def get_name(self) -> str:
        return "my_custom_phase"

    def execute(self, context: dict) -> PhaseResult:
        # 实现阶段逻辑
        return PhaseResult(success=True, data={...})
```

### 注册到流水线

在 `DevelopmentPipeline.__init__` 中添加：

```python
self.phases['my_custom'] = MyCustomPhase(
    claude_client, logger, reporter, project_path
)
```

## 测试

```bash
# 运行所有测试
python3 -m pytest tests/ -v

# 运行特定测试
python3 -m pytest tests/test_driver.py -v

# 测试覆盖率
python3 -m pytest tests/ --cov=core --cov-report=html
```

## 注意事项

1. **环境隔离**: 每次运行使用干净的环境变量，避免会话冲突
2. **重试机制**: Claude 调用失败会自动重试 (最多 3 次)
3. **进度报告**: 每 30 秒报告一次进度，防止长时间无响应
4. **Git 提交**: 完成后自动提交，确保代码可追溯
5. **日志滚动**: 日志文件自动滚动，避免占用过多磁盘空间
