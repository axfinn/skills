# Video Generator Skill v2.0 - 优化版

将文字内容自动转换为高质量视频，支持小说、新闻、PPT等多种场景。

## 核心能力

- 🎬 **小说视频**: 完整章节 → 有声视频（20张主题背景图轮播）
- 📰 **新闻视频**: 热点新闻 → 自动配音 + 字幕同步
- 📊 **PPT视频**: HTML幻灯片 → 截取 → 配音合成
- 🖼️ **主题配图**: 关键词匹配下载专业图片
- 📋 **数据表格**: 视频优化表格样式

## 目录结构

```
video-generator/
├── SKILL.md                      # 本文件
├── scripts/
│   ├── generate.py               # 核心生成器（统一入口）
│   ├── tts.py                    # TTS语音生成
│   ├── video_builder.py          # 视频合成
│   ├── image_matcher.py          # 主题配图下载
│   └── batch.py                  # 批量处理
├── tools/
│   ├── index.html                # 工具箱主页
│   ├── chart-generator.html       # 图表生成器
│   ├── stats-generator.html       # 统计卡片
│   ├── table-generator.html       # 视频表格生成器 ⭐新
│   ├── ppt-studio.html           # PPT工作室 ⭐增强
│   └── animation-editor.html      # 动画编辑器
├── lib/
│   ├── templates.py              # Python模板引擎
│   ├── animations.py              # 动画效果
│   ├── materials.py              # 素材管理 ⭐增强
│   └── utils.py                  # 工具函数
├── config/
│   └── templates/                # HTML模板
│       ├── dark.html             # 深色主题
│       ├── tech.html             # 科技主题
│       ├── gradient.html         # 渐变主题
│       └── news.html             # 新闻主题
└── projects/                    # 项目目录
```

## 快速开始

### 方式一：命令行生成

```bash
# 小说视频
python3 scripts/generate.py novel "第三章" /path/to/chapter3.md

# 新闻视频
python3 scripts/generate.py news --topic "AI大模型" --count 10

# PPT视频
python3 scripts/generate.py ppt /path/to/presentation.html
```

### 方式二：工具箱可视化

直接打开 `tools/index.html` 使用图形界面。

---

## 核心脚本

### generate.py - 统一入口

```bash
python3 scripts/generate.py <type> [options]

类型:
  novel     小说视频生成
  news      新闻视频生成
  ppt       PPT截取+配音
  batch     批量处理

通用选项:
  --output DIR      输出目录
  --voice VOICE      语音(默认 XiaoxiaoNeural)
  --rate RATE        语速 +0%~+50%
  --quality QUALITY  质量 low/medium/high
```

### image_matcher.py - 主题配图 ⭐

根据关键词从免费图库下载匹配图片：

```python
from image_matcher import ImageMatcher

matcher = ImageMatcher()
matcher.download_by_keywords(
    keywords=["stock market", "finance", "trading"],
    count=20,
    output_dir="./images",
    size=(1920, 1080)
)
```

**内置主题映射:**
| 场景 | 关键词 |
|------|--------|
| 财经 | stock market, finance, money, chart |
| 科技 | technology, AI, robot, circuit |
| 城市 | city, building, architecture |
| 自然 | nature, mountain, ocean |
| 人物 | business, meeting, office |

---

## 配图系统

### 主题配图 vs 随机图

| 方式 | 来源 | 质量 | 速度 |
|------|------|------|------|
| `picsum.photos` | 随机 | ⭐⭐ | 快 |
| `pexels/unsplash` | 主题相关 | ⭐⭐⭐⭐ | 中 |
| `pexels video` | 视频素材 | ⭐⭐⭐⭐⭐ | 慢 |

### 推荐配置

```python
# 财经类视频
images = matcher.download_by_category("financial", count=20)

# 科技类视频
images = matcher.download_by_category("tech", count=20)

# 混合主题
images = matcher.download_mixed(["AI", "robot", "data"], count=20)
```

---

## 配表系统（视频表格）⭐

视频场景下的表格需要特殊处理：

### 设计原则

1. **大字号**: 至少 28px，确保远处可读
2. **高对比**: 深色背景 + 浅色文字
3. **少列数**: 最多 3-4 列，避免拥挤
4. **突出数据**: 关键数字用强调色

### 表格模板

```html
<!-- 视频优化表格 -->
<div class="video-table">
  <table>
    <thead>
      <tr><th>指标</th><th>数值</th><th>变化</th></tr>
    </thead>
    <tbody>
      <tr class="highlight"><td>上证指数</td><td>4000</td><td class="down">-2.5%</td></tr>
      <tr><td>深证成指</td><td>12000</td><td class="down">-1.8%</td></tr>
    </tbody>
  </table>
</div>
```

### CSS样式

```css
.video-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 32px;  /* 视频场景用大字号 */
}
.video-table th {
  background: rgba(255,107,107,0.3);
  color: #feca57;
  padding: 20px;
}
.video-table td {
  padding: 18px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.video-table .highlight {
  background: rgba(255,107,107,0.15);
}
.video-table .up { color: #1dd1a1; }
.video-table .down { color: #ff6b6b; }
```

---

## PPT制作模块 ⭐

### 工具箱功能

1. **PPT工作室** (`ppt-studio.html`)
   - 可视化编辑幻灯片
   - 实时预览
   - 导出HTML/PDF/图片

2. **图表生成器** (`chart-generator.html`)
   - 柱状图/折线图/饼图
   - 自定义颜色
   - 导出Chart.js配置

3. **统计卡片** (`stats-generator.html`)
   - 关键数据展示
   - 4种主题
   - 数字动画

4. **表格生成器** (`table-generator.html`) ⭐新
   - 视频优化表格
   - 导入CSV/JSON
   - 实时预览

5. **动画编辑器** (`animation-editor.html`)
   - 15+动画效果
   - 时间轴控制
   - 导出CSS动画

### 快速生成PPT

```python
from templates import QuickPPTX

# 创建演示文稿
pptx = QuickPPTX(theme="tech")

pptx.add_cover(
    title="2026年Q1市场分析",
    subtitle="深度解读",
    author="jaxiu"
)

pptx.add_content(
    title="核心观点",
    bullets=["AI驱动变革", "市场波动加剧"],
    layout="bullets"
)

pptx.add_chart(
    title="季度数据",
    chart_type="bar",
    data={"Q1": 120, "Q2": 150, "Q3": 180}
)

pptx.add_table(
    title="对比分析",
    headers=["指标", "A公司", "B公司"],
    rows=[["营收", "100亿", "120亿"], ["利润", "20亿", "25亿"]]
)

pptx.add_end(
    text="谢谢观看",
    contact="t.jaxiu.cn"
)

pptx.save("presentation.html")
```

---

## 视频参数

| 参数 | 值 |
|------|------|
| 分辨率 | 1920x1080 |
| 帧率 | 30fps |
| 视频编码 | H.264 (libx264) |
| 音频编码 | AAC 192kbps |
| 图片格式 | JPG/PNG |
| 输出格式 | MP4 |

---

## 依赖安装

```bash
# 核心依赖
pip3 install edge-tts pillow requests

# 可选（高清视频）
pip3 install opencv-python

# 浏览器自动化（PPT截取）
npm install playwright
npx playwright install chromium
```

---

## 最佳实践

### 开场设计
```python
# ❌ 平淡
intro = "大家好，今天给大家介绍一下..."

# ✅ 有钩子
intro = "A股单日蒸发2万亿，发生了什么？"
```

### 语速控制
```python
# 新闻类：稍快
rate = "+20%"

# 财经分析：正常
rate = "+5%"

# 小说朗读：偏慢
rate = "-5%"
```

### 配图选择
```python
# ✅ 主题相关
images = matcher.download_by_keywords(["stock market crash", "trading floor"], 20)

# ❌ 随机图片
images = [f"https://picsum.photos/1920/1080?random={i}" for i in range(20)]
```

---

*Last updated: 2026-03-23 v2.0*
