# 推送到 GitHub 指南

## 已完成的工作

✅ 已添加 5 个新技能：
1. **claude-dev-assistant** - 基于 Claude Code CLI 的全流程自动化开发工具
2. **multi-agent-crew** - CrewAI 风格的多代理协作系统
3. **bilibili-upload** - B 站视频上传与投稿自动化
4. **news-video** - 每日新闻视频自动生成
5. **model-switcher** - GrokSearch MCP 模型切换工具

✅ 已更新 README.md

✅ 已提交到本地 Git 仓库

## 推送方法

### 方法 1: 使用 Personal Access Token (推荐)

1. **创建 Token**:
   - 访问 https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 选择 scopes: `repo` (完全控制)
   - 生成并复制 token

2. **推送代码**:
```bash
cd /tmp/skills-repo

# 设置远程 URL (替换 YOUR_TOKEN)
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/axfinn/skills.git

# 推送
git push origin main
```

### 方法 2: 使用 SSH Key

1. **生成 SSH Key** (如果没有):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. **添加 SSH Key 到 GitHub**:
   - 复制公钥：`cat ~/.ssh/id_ed25519.pub`
   - 访问 https://github.com/settings/keys
   - 点击 "New SSH key" 并粘贴

3. **推送代码**:
```bash
cd /tmp/skills-repo
git remote set-url origin git@github.com:axfinn/skills.git
git push origin main
```

### 方法 3: 使用 GitHub CLI

1. **安装 gh**:
```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh
```

2. **登录**:
```bash
gh auth login
```

3. **推送**:
```bash
cd /tmp/skills-repo
git push origin main
```

## 验证推送

推送成功后访问：
https://github.com/axfinn/skills

应该能看到新增的 5 个技能目录。

## 安装使用

推送成功后，可以通过以下命令安装：

```bash
# 安装单个技能
claude mcp add-skill https://github.com/axfinn/skills/tree/main/claude-dev-assistant
claude mcp add-skill https://github.com/axfinn/skills/tree/main/multi-agent-crew

# 或者克隆整个仓库
git clone https://github.com/axfinn/skills.git ~/.claude-skills
```

## 本地测试位置

技能已准备在：`/tmp/skills-repo/`

可以手动复制到：
```
cp -r /tmp/skills-repo/claude-dev-assistant ~/.claude/skills/
cp -r /tmp/skills-repo/multi-agent-crew ~/.claude/skills/
```
