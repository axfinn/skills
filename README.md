# Skills 工具集

个人 AI 助手 Skills 集合，支持视频生成、内容处理、开发工具等多种能力。

## 目录

### 视频生成模块
| Skill | 说明 |
|-------|------|
| [video-generator](./video-generator/) | 视频生成器 v2.0 - 小说/新闻/PPT视频，支持主题配图 |
| [news-video](./news-video/) | 新闻视频生成 - 自动抓取新闻生成视频 |

### 内容创作
| Skill | 说明 |
|-------|------|
| [bilibili-upload](./bilibili-upload/) | B站自动发帖与互动 |
| [blog-sync](./blog-sync/) | 博客自动同步发布 |
| [multi-agent-crew](./multi-agent-crew/) | 多代理协作系统 (CrewAI风格) |

### 开发工具
| Skill | 说明 |
|-------|------|
| [devtools](./devtools/) | DevTools 开发技能 - 开发者工具箱 DDD 架构 |

### 工具箱
| Skill | 说明 |
|-------|------|
| [tools](./tools/) | 本地工具控制台 - Web界面工具集 |
| [lib](./lib/) | 通用库函数 |

### AI & 搜索
| Skill | 说明 |
|-------|------|
| [claude-dev-assistant](./claude-dev-assistant/) | Claude Code 开发助手 |
| [model-switcher](./model-switcher/) | 模型切换器 |

### 自动化
| Skill | 说明 |
|-------|------|
| [auto-research](./auto-research/) | 自动调研系统 |
| [config](./config/) | 配置文件模板 |
| [references](./references/) | 参考文档 |
| [scripts](./scripts/) | 实用脚本 |

## 快速开始

```bash
# 克隆
git clone https://github.com/axfinn/skills.git

# 查看所有 skills
ls -la
```

## 本地开发

```bash
# 视频生成工具箱
cd tools && python3 -m http.server 38080

# 推送更新
./push.sh
```

---
*Last updated: 2026-03-23*
