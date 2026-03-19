# Claude Dev Assistant 故障排查指南

## 常见问题

### 1. Claude CLI 未找到

**错误信息:**
```
❌ Claude CLI 不存在：/usr/local/bin/claude
💡 请安装 Claude Code 或指定正确路径：--claude /path/to/claude
```

**解决方案:**

1. 检查 Claude 是否安装:
```bash
which claude
claude --version
```

2. 常见安装位置:
```bash
# 当前环境
/home/node/.openclaw/workspace/tools/bin/claude

# Linux/macOS brew
/usr/local/bin/claude

# macOS ARM brew
/opt/homebrew/bin/claude

# Linux 系统
/usr/bin/claude

# 用户本地
~/.local/bin/claude
~/bin/claude

# Linuxbrew
/home/linuxbrew/.linuxbrew/bin/claude
```

3. 使用 `--claude` 参数指定路径:
```bash
python3 driver.py develop "需求" --claude /home/node/.openclaw/workspace/tools/bin/claude
```

### 2. API 认证失败 / 未登录

**错误信息:**
```
Not logged in · Please run /login
```

或
```
401 Unauthorized
```

**解决方案:**

1. 检查配置文件 `~/.claude/settings.json`:
```bash
cat ~/.claude/settings.json
```

2. 确保包含有效的 API 配置:
```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-cp-xxx",
    "ANTHROPIC_MODEL": "MiniMax-M2.5"
  }
}
```

3. 验证 Token 是否有效:
```bash
export PATH="/home/node/.openclaw/workspace/tools/bin:$PATH"
claude --print -p "Hello"
```

4. 如果 Token 过期或无效，更新 `ANTHROPIC_AUTH_TOKEN`

### 3. API 超时

**错误信息:**
```
Request timeout
```

**解决方案:**

1. 增加超时配置:
```json
{
  "env": {
    "API_TIMEOUT_MS": "3000000"
  }
}
```

2. 检查网络连接
3. 检查 API 端点是否正确

### 2. 嵌套运行错误

**错误信息:**
```
⚠️ 检测到嵌套运行，Claude CLI 无法在 Claude Code 环境中调用
💡 请直接使用 Claude Code 而非通过 driver.py 调用
```

**原因:** 在 Claude Code 会话中尝试调用 Claude CLI

**解决方案:**
- 不要在 Claude Code 环境中运行 driver.py
- 直接在系统终端运行

### 3. 权限问题

**错误信息:**
```
Permission denied: claude
```

**解决方案:**
```bash
# 添加执行权限
chmod +x /path/to/claude

# 或使用 sudo (谨慎)
sudo chmod +x /path/to/claude
```

### 4. Python 依赖缺失

**错误信息:**
```
ModuleNotFoundError: No module named 'yaml'
```

**解决方案:**
```bash
# 安装依赖
pip install pyyaml

# 或使用项目依赖
cd /home/node/.openclaw/workspace/clawtest/claude_dev_assistant
pip install -e .
```

### 5. 项目路径不存在

**错误信息:**
```
FileNotFoundError: [Errno 2] No such file or directory: '/path/to/project'
```

**解决方案:**
```bash
# 创建目录
mkdir -p /path/to/project

# 或使用现有目录
python3 driver.py develop "需求" --path /existing/path
```

### 6. Git 未初始化

**错误信息:**
```
fatal: not a git repository
```

**解决方案:**
```bash
# 初始化 Git
cd /path/to/project
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

### 7. 代码审查循环过多

**现象:** 代码审查反复失败，超过最大循环次数

**解决方案:**

1. 增加审查循环次数:
```yaml
# .claude/config.yaml
quality:
  review_cycles: 5  # 默认 3，可增加
```

2. 手动检查审查日志:
```bash
cat .claude/logs/review_*.log
```

3. 简化需求，分阶段实现

### 8. 测试失败

**现象:** 生成的测试用例运行失败

**解决方案:**

1. 检查测试依赖:
```bash
# 安装测试框架
pip install pytest

# 或项目特定依赖
cd /path/to/project
pip install -r requirements.txt
```

2. 查看测试输出:
```bash
cd /path/to/project
python3 -m pytest tests/ -v
```

3. 手动修复测试用例

### 9. 内存不足

**现象:** 进程被系统杀死，或响应极慢

**解决方案:**

1. 减少并发任务
2. 增加系统内存
3. 使用更小的模型或简化需求

### 10. 日志文件过大

**现象:** `.claude/logs/` 目录占用大量磁盘空间

**解决方案:**
```bash
# 清理旧日志
find .claude/logs/ -name "*.log" -mtime +7 -delete

# 或压缩归档
tar -czf logs_backup.tar.gz .claude/logs/
rm .claude/logs/*.log
```

## 调试技巧

### 启用详细日志

```bash
# 设置环境变量
export DEBUG=true
python3 driver.py develop "需求"
```

### 单步执行

```python
# 手动执行各个阶段
from core.phases import RequirementsAnalysisPhase

phase = RequirementsAnalysisPhase(...)
result = phase.execute({'requirement': '需求描述'})
print(result.to_dict())
```

### 检查中间结果

```bash
# 查看生成的文档
cat docs/01-REQUIREMENTS.md
cat docs/02-DESIGN.md

# 查看状态文件
cat .claude/state.json
```

## 性能优化

### 减少 Claude 调用次数

1. 使用缓存的结果
2. 批量处理相关请求
3. 使用更精确的提示词

### 优化提示词

```bash
# ❌ 模糊的提示词
"创建一个应用"

# ✅ 具体的提示词
"创建一个 Python Flask API，包含用户注册、登录、JWT 认证三个端点"
```

### 并行处理

对于独立的任务，可以并行执行:
```bash
# 终端 1
python3 driver.py develop "前端部分" --path ./frontend

# 终端 2
python3 driver.py develop "后端部分" --path ./backend
```

## 联系支持

如遇到未列出的问题:

1. 查看完整日志: `.claude/logs/`
2. 检查 GitHub Issues
3. 提交问题报告，包含:
   - 错误信息
   - 复现步骤
   - 环境信息 (Python 版本、Claude 版本等)
