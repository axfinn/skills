# Claude Code Skills

可复用的 Claude Code 技能集合。

## 可用技能

| 技能 | 描述 |
|------|------|
| [devtools](./devtools/) | DevTools 项目开发技能，遵循 DDD 领域驱动设计 |

## 安装方式

### 方式一：通过 Claude Code 命令安装（推荐）

```bash
claude mcp add-skill https://github.com/axfinn/skills/tree/main/devtools
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
```

### 方式三：作为 Git 子模块

```bash
git submodule add https://github.com/axfinn/skills.git .claude/skills-repo
ln -s skills-repo/devtools .claude/skills/devtools
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

## 贡献

欢迎提交 PR 添加新技能或改进现有技能。

## 许可

MIT License
