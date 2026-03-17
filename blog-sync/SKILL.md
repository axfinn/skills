---
name: blog-sync
description: 同步开发信息到 Hugo 博客。当用户请求发布博客、同步开发记录、创建技术文章或发布到 GitHub Pages 时使用此技能。
repo: git@github.com:axfinn/skills.git
---

# 博客同步技能

将开发信息同步到 Hugo 博客 (blog.jaxiu.cn)。

## 博客目录

博客根目录通过以下方式确定（按优先级）：

1. **环境变量 `BLOG_ROOT`**：优先使用
   ```bash
   export BLOG_ROOT=/path/to/your/blog
   ```

2. **当前目录检测**：如果当前目录是 Hugo 项目（存在 `config.toml` 或 `hugo.toml` 或 `config.yaml`）

3. **默认路径**：本机默认路径
   ```
   /Volumes/M20/code/docs/axfinn_blogs/
   ```

目录结构：
```
{BLOG_ROOT}/
├── content/
│   ├── blog/          # 技术博客文章
│   ├── moment/        # 动态/短更新
│   └── about/         # 关于页面
├── publish.sh         # 发布脚本
└── config.toml        # Hugo 配置
```

## GitHub 仓库信息

- **Skills 仓库**: git@github.com:axfinn/skills.git
- **博客源文件仓库**: git@github.com:axfinn/axfinn_blogs.git
- **博客发布仓库**: git@github.com:axfinn/axfinn.github.io.git
- **博客地址**: https://axfinn.github.io/
- **博客源站**: https://blog.jaxiu.cn

## 文章格式

### 博客文章 (content/blog/)

```markdown
---
title: "文章标题"
date: 2025-01-17T10:00:00+08:00
draft: false
slug: "english-slug-name"
tags: ["标签1", "标签2"]
categories: ["技术", "项目分析"]
series: ["系列名称"]  # 可选
---

文章正文内容...
```

### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 文章标题（中文或英文） |
| date | 是 | 发布时间，格式 `2025-01-17T10:00:00+08:00` |
| draft | 是 | `false` 表示发布，`true` 表示草稿 |
| slug | 是 | URL 友好标识（**必须用英文**，避免中文编码问题） |
| tags | 是 | 标签数组，用于分类 |
| categories | 是 | 分类数组，通常 1-2 个 |
| series | 否 | 系列名称，用于关联多篇文章 |

### 常用标签

- **技术栈**: Go语言, Vue, Python, Rust, TypeScript
- **项目**: NPS, DeepChat, Qwen Code, TodoIng
- **领域**: AI, 源码分析, 架构设计, DevOps
- **生活**: 安全, 健康, 生活常识, 环保

### 常用分类

- 技术 + 项目分析
- 技术 + 架构设计
- 技术 + AI工具
- 技术 + 教程
- 技术 + 源码解析
- 生活 + 安全知识
- 生活 + 健康
- 生活 + 环保

## 动态更新 (Moments)

动态内容在 `content/moment/_index.md` 中追加，格式：

```markdown
## 2025-01

### 2025-01-17

简短的动态内容，支持 emoji 和链接。
```

## 支持的 Markdown 功能

### Mermaid 图表

```markdown
{{< mermaid >}}
graph TD
    A[开始] --> B[处理] --> C[结束]
{{< /mermaid >}}
```

### 代码高亮

````markdown
```go
func main() {
    fmt.Println("Hello")
}
```
````

### 数学公式 (KaTeX)

```markdown
行内公式: $E = mc^2$

块级公式:
$$
\sum_{i=1}^{n} x_i
$$
```

## 发布流程

### 1. 创建/编辑文章

```bash
# 创建新文章
# 文件命名: {slug}.md，如 my-new-post.md

# 文章路径
{BLOG_ROOT}/content/blog/{slug}.md
```

### 2. 本地预览

```bash
cd {BLOG_ROOT}
hugo server -D
# 访问 http://localhost:1313
```

### 3. 发布到 GitHub Pages

```bash
cd {BLOG_ROOT}
bash publish.sh
```

发布脚本会自动：
1. 构建站点 (`hugo -D`)
2. 复制到 `axfinn.github.io` 仓库
3. 提交并推送到 GitHub

### 常见问题处理

#### 远程冲突
如果发布时遇到 "failed to push ... Updates were rejected because the remote contains work that you do not have locally" 错误：

```bash
# 方法1：先 pull 再 push
cd {BLOG_ROOT}
git stash
git pull --rebase origin main
git stash pop
bash publish.sh

# 如果仍有问题，使用 force push
cd {BLOG_ROOT}/../axfinn.github.io
git push origin main --force
```

## 工作流程

### 同步开发记录到博客

1. **收集信息**: 从对话/项目中提取关键开发内容
2. **确定类型**:
   - 完整技术文章 → `content/blog/`
   - 简短动态 → `content/moment/_index.md`
3. **生成内容**:
   - 使用正确的 frontmatter
   - slug 必须是英文
   - 包含适当的标签和分类
4. **写入文件**: 创建或更新 markdown 文件
5. **发布**: 运行 `publish.sh`

### 项目系列文章

对于项目源码分析等系列文章：

1. 使用 `series` 字段关联文章
2. 保持一致的命名规范：`{project}-{topic}.md`
3. 文章编号或主题清晰

示例系列结构：
```
nps-overview.md        # NPS项目概览
nps-server-core.md     # 服务端核心分析
nps-client.md          # 客户端分析
nps-proxy-tcp.md       # TCP代理实现
```

## 检查清单

发布前确认：

- [ ] slug 使用英文，无中文字符
- [ ] date 格式正确，包含时区 `+08:00`
- [ ] draft 设置为 `false`
- [ ] tags 和 categories 已填写
- [ ] 代码块语言标识正确
- [ ] Mermaid 图表使用 shortcode 语法
- [ ] 本地预览无误

## 跨主机使用

在其他主机上使用此技能时：

1. **克隆博客仓库**：
   ```bash
   git clone git@github.com:axfinn/axfinn.github.io.git blog
   # 或者克隆源博客仓库（如果有）
   ```

2. **设置环境变量**：
   ```bash
   export BLOG_ROOT=/path/to/your/blog
   ```

3. **或者使用相对路径**：
   直接在博客根目录下操作，脚本会自动检测当前目录。
