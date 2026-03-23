# Model Switcher Skill

## 功能
在 OpenClaw 对话框中提供模型选择功能，无需离开聊天界面。

## 使用方法

### 触发命令
- "切换模型"
- "更换模型"
- "选择模型"
- "当前用什么模型"
- "列出可用模型"

### 实现方式

1. **调用 MCP 工具获取模型列表**
```
调用：get_available_models
```

2. **显示模型选择菜单**
使用消息工具发送带按钮的消息（如果平台支持）

3. **用户选择后切换**
```
调用：switch_model
参数：{"model": "选择的模型 ID"}
```

## MCP 工具

### get_available_models
获取所有可用模型列表

### switch_model
切换到指定模型

## 支持的模型

- qwen3.5-plus ⭐
- qwen3-max-2026-01-23
- qwen3-coder-next
- qwen3-coder-plus
- glm-5
- glm-4.7
- kimi-k2.5
- MiniMax-M2.5

## 配置文件

`~/.config/grok-search/config.json`
