---
name: multi-agent-crew
description: CrewAI 风格的多代理协作系统 - 研究、写作、审核、编码多代理分工合作
---

# Multi-Agent Crew 系统

CrewAI 风格的多代理协作系统，支持研究、写作、审核、编码等多代理分工合作。

## 预设代理

| 代理 | 模型 | 用途 |
|------|------|------|
| researcher | minimax-m2.1 | 信息调研、搜索整理 |
| writer | minimax-m2.5 | 内容创作、文案撰写 |
| reviewer | minimax-m2.5 | 质量审核、逻辑检查 |
| coder | codex | 代码编写、技术实现 |
| browser | default | 浏览器自动化 |

## 使用方法

### 并发模式

```python
# 同时启动多个代理
subagents(action="spawn", task="搜索 AI 最新进展", model="minimax-m2.1", label="researcher")
subagents(action="spawn", task="撰写技术文章", model="minimax-m2.5", label="writer")
```

### 顺序模式

```python
# 1. 先调研
research = subagents(action="spawn", task="调研主题 X", model="minimax-m2.1")

# 2. 基于调研结果写作
article = subagents(action="spawn", task=f"基于以下内容写作：{research}", model="minimax-m2.5")

# 3. 审核
review = subagents(action="spawn", task="审核以下内容：{article}", model="minimax-m2.5")
```

## 协作模式

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| 并发 | 多个代理同时工作 | 独立子任务 |
| 顺序 | A→B→C 流水线 | 有依赖的任务 |
| 混合 | 并发 + 顺序结合 | 复杂任务 |

## 示例场景

### 技术文章写作

1. **researcher** 搜索最新技术资料
2. **writer** 基于资料撰写文章
3. **reviewer** 审核文章质量和准确性

### 功能开发

1. **researcher** 调研技术方案
2. **coder** 实现代码
3. **reviewer** 代码审查

## 项目位置

```
/home/node/.openclaw/workspace/multi-agent/
```

详细文档：`multi-agent/README.md`
