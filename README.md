# Claude Code Skills

可复用的 Claude Code 技能集合。

## 可用技能

| 技能 | 描述 |
|------|------|
| [devtools](./devtools/) | DevTools 项目开发技能，遵循 DDD 领域驱动设计 |
| [blog-sync](./blog-sync/) | 同步开发信息到 Hugo 博客 (blog.jaxiu.cn) |
| [claude-dev-assistant](./claude-dev-assistant/) | 基于 Claude Code CLI 的全流程自动化开发工具 |
| [multi-agent-crew](./multi-agent-crew/) | CrewAI 风格的多代理协作系统 |
| [bilibili-upload](./bilibili-upload/) | B 站视频上传与投稿自动化 |
| [news-video](./news-video/) | 每日新闻视频自动生成 |
| [model-switcher](./model-switcher/) | GrokSearch MCP 模型切换工具 |

## 安装方式

### 方式一：通过 Claude Code 命令安装（推荐）

```bash
claude mcp add-skill https://github.com/axfinn/skills/tree/main/devtools
claude mcp add-skill https://github.com/axfinn/skills/tree/main/claude-dev-assistant
claude mcp add-skill https://github.com/axfinn/skills/tree/main/multi-agent-crew
```

### 方式二：手动安装

1. 克隆此仓库到本地：
```bash
git clone https://github.com/axfinn/skills.git ~/.claude-skills
```

2. 在你的项目中创建 `.claude/skills` 目录：
```bash
mkdir -p .claude/skills
```

3. 复制需要的技能：
```bash
cp -r ~/.claude-skills/devtools .claude/skills/
cp -r ~/.claude-skills/claude-dev-assistant .claude/skills/
cp -r ~/.claude-skills/multi-agent-crew .claude/skills/
```

### 方式三：作为 Git 子模块

```bash
git submodule add https://github.com/axfinn/skills.git .claude/skills-repo
ln -s skills-repo/devtools .claude/skills/devtools
ln -s skills-repo/claude-dev-assistant .claude/skills/claude-dev-assistant
```

## 使用方法

安装后在 Claude Code 中使用：

```
/dev 添加一个新的工具页面
```

或者 Claude 会根据上下文自动调用相关技能。

## 技能结构

每个技能目录包含一个 `SKILL.md` 文件，格式如下：

```markdown
---
name: skill-name
description: 技能描述
---

# 技能标题

技能内容...
```

## 新增技能

### claude-dev-assistant

基于 Claude Code CLI 的智能开发助手，实现从需求到代码的全流程自动化：
- 需求调研 → 需求分析 → 技术方案 → 代码实现 → 测试 → 代码审查 → Git 提交

### multi-agent-crew

CrewAI 风格的多代理协作系统：
- researcher (调研) → writer (写作) → reviewer (审核) → coder (编码)
- 支持并发、顺序、混合三种协作模式

### bilibili-upload

B 站视频上传与投稿自动化：
- 新视频上传
- 已发布视频替换
- 自动生成小说视频

### news-video

每日新闻视频自动生成：
- 自动抓取新闻
- Edge TTS 中文语音
- 20 张随机背景图轮播
- 自动上传到 t.jaxiu.cn

### model-switcher

GrokSearch MCP 模型切换工具：
- 支持 8 个主流 AI 模型
- 一键切换，立即生效
- 配置持久化

## 贡献

欢迎提交 PR 添加新技能或改进现有技能。

## 许可

MIT License
