---
name: model-switcher
description: GrokSearch MCP 模型切换工具 - 支持 8 个主流 AI 模型一键切换
---

# Model Switcher Skill

GrokSearch MCP 模型切换工具，支持一键切换 AI 模型。

## 支持的模型

| 模型 | 说明 |
|------|------|
| qwen3.5-plus ⭐ | 通义千问 3.5 Plus - 平衡性能与速度 |
| qwen3-max-2026-01-23 | 通义千问 3 Max - 最强推理 |
| qwen3-coder-next | 通义千问 Coder Next - 代码优化 |
| qwen3-coder-plus | 通义千问 Coder Plus - 专业编码 |
| glm-5 | 智谱 GLM-5 - 深度思考 |
| glm-4.7 | 智谱 GLM-4.7 - 经典版本 |
| kimi-k2.5 | Kimi K2.5 - 长上下文理解 |
| MiniMax-M2.5 | MiniMax M2.5 - 深度推理 |

## 使用方法

### 通过 MCP 工具

```python
# 查看可用模型
get_available_models()

# 切换模型
switch_model("qwen3.5-plus")
```

### 通过对话

直接告诉助手：
- "切换到 qwen3.5-plus"
- "帮我换成 glm-5"
- "当前用什么模型？"

## MCP 工具

### get_available_models

获取所有可用模型列表。

**返回**:
```json
{
  "status": "✅ 成功",
  "provider": "ModelStudio (阿里云)",
  "models": ["qwen3.5-plus", "glm-5", ...],
  "count": 8,
  "current_model": "glm-5"
}
```

### switch_model

切换到指定模型。

**参数**:
- `model`: 模型 ID

**返回**:
```json
{
  "status": "✅ 成功",
  "previous_model": "glm-5",
  "current_model": "qwen3.5-plus",
  "message": "模型已从 glm-5 切换到 qwen3.5-plus"
}
```

## 配置文件

`~/.config/grok-search/config.json`

## 项目位置

```
/home/node/.openclaw/workspace/GrokSearch/
```

详细文档：`GrokSearch/MODEL_SWITCHING.md`
