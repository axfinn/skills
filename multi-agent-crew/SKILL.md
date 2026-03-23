---
name: multi-agent-crew
description: CrewAI 风格的多代理协作系统 - 研究、写作、审核、编码多代理分工合作
---

# Multi-Agent Crew 系统

## 启动多代理协作

当用户请求需要多个代理协作时，使用 `subagents` 工具 spawn 子代理。

### 预设代理配置

| 代理 | 模型 | 用途 |
|------|------|------|
| researcher | minimax-m2.1 | 信息调研、搜索整理 |
| writer | minimax-m2.5 | 内容创作、文案撰写 |
| reviewer | minimax-m2.5 | 质量审核、逻辑检查 |
| coder | codex | 代码编写、技术实现 |
| browser | default | 浏览器自动化 |

### 调用示例

```python
# 方式 1: 并发执行多个子代理
subagents(action="spawn", task="搜索 {topic} 最新信息", model="minimax-m2.1", label="researcher-1")

# 方式 2: 顺序协作
# 先 spawn researcher 调研
# 拿到结果后再 spawn writer 写作
# 最后 reviewer 审核
```

## 协作模式

### 并发模式
- 多个代理同时工作
- 适合独立子任务

### 顺序模式
- A → B → C 流水线
- 适合有依赖的任务

### 混合模式
- 并发 + 顺序结合
- 复杂任务用
