# Video Generator Skill

将文字内容自动转换为带语音解说的视频。

## 功能

- HTML幻灯片 → 高清图片 (1920x1080)
- 文本 → TTS语音 (Edge-TTS，支持男声/女声)
- 音画精确同步视频合成
- FFmpeg视频编码

## 使用场景

- 财经分析视频
- 新闻解读视频
- 教程/科普视频
- 任何需要"图文 + 语音"形式的内容

## 前置要求

```bash
# 安装依赖
brew install ffmpeg
npm install playwright
npx playwright install chromium
pip3 install edge-tts
```

## 目录结构

```
video-generator/
├── SKILL.md                    # 本文件
├── scripts/
│   ├── capture_slides.mjs      # 幻灯片截图
│   ├── gen_tts.py              # TTS 音频生成
│   └── create_video.py         # 视频合成
├── config/
│   └── template.html           # 幻灯片模板
└── projects/                   # 项目目录
    └── my_video/
        ├── presentation.html   # 幻灯片HTML
        ├── slides/             # 截图输出
        ├── audio/              # TTS音频
        └── output.mp4          # 最终视频
```

---

## 快速开始

### 1. 创建项目目录

```bash
mkdir -p projects/my_video/{slides,audio}
```

### 2. 创建 HTML 幻灯片

创建 `presentation.html`，每张幻灯片使用 `.slide` 类，固定尺寸 `1920x1080`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'PingFang SC', sans-serif; background: #0a0a1a; color: #fff; }
        .slide { width: 1920px; height: 1080px; padding: 50px 70px; position: relative; }
    </style>
</head>
<body>
    <div class="slide">封面内容</div>
    <div class="slide">第二页内容</div>
    <div class="slide">第三页内容</div>
</body>
</html>
```

### 3. 截取幻灯片

```javascript
// capture_slides.mjs
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto(`file://${htmlPath}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2000);

const slides = await page.$$('.slide');
for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: `slides/${String(i+1).padStart(2,'0')}.png` });
}
await browser.close();
```

### 4. 生成 TTS 音频

```python
# gen_tts.py
import edge_tts
import asyncio

VOICES = {
    "male": "zh-CN-YunyangNeural",    # 男声 - 沉稳新闻风
    "female": "zh-CN-XiaoxiaoNeural", # 女声 - 自然流畅
}

SEGMENTS = [
    ("01_intro", "female", "开场白文本..."),
    ("02_content", "male", "正文内容..."),
]

async def generate():
    for seg_id, voice_key, text in SEGMENTS:
        communicate = edge_tts.Communicate(text, VOICES[voice_key])
        await communicate.save(f"audio/{seg_id}.mp3")

asyncio.run(generate())
```

### 5. 合成视频

```python
# create_video.py
import subprocess

SEGMENTS = [
    {"audio": "01_intro", "slide": "01", "duration": 20},
    {"audio": "02_content", "slide": "02", "duration": 25},
]

# 创建幻灯片序列
with open('concat.txt', 'w') as f:
    for seg in SEGMENTS:
        f.write(f"file 'slides/{seg['slide']}.png'\n")
        f.write(f"duration {seg['duration']}\n")

# 创建视频
subprocess.run(['ffmpeg', '-y', '-f', 'concat', '-i', 'concat.txt',
                '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p', 'temp.mp4'])

# 添加音频
subprocess.run(['ffmpeg', '-y', '-i', 'temp.mp4', '-i', 'merged.mp3',
                '-c:v', 'copy', '-c:a', 'aac', '-shortest', 'output.mp4'])
```

---

## 最佳实践

### 🎣 开场要有钩子

**❌ 平淡开场:**
```
大家好，欢迎来到本期深度分析。今天我们要探讨的是...
```

**✅ 钩子式开场:**
```
韩国股市单日暴跌12%，A股一日蒸发2万亿。
2026年3月，全球金融市场经历了什么？
这五分钟，带你理解这场完美风暴。
```

### 📊 数字表达要简洁

**❌ 啰嗦:**
```
暴跌百分之四点六
```

**✅ 简洁:**
```
暴跌4.6%
```

### 🎭 情感递进

1. **开场** - 震撼数据抓住注意力
2. **展开** - 事实陈述，男声稳重
3. **高潮** - 风险分析，语调加强
4. **收尾** - 建议与希望，女声温和

### ⏱️ 时长控制

- 每张幻灯片: 15-30秒
- 总时长: 3-5分钟最佳
- 文字密度: 每张不超过50字

---

## Edge-TTS 语音选择

### 男声
| 语音 | 风格 | 适用场景 |
|------|------|----------|
| `zh-CN-YunyangNeural` | 沉稳新闻风 | 财经、新闻 |
| `zh-CN-YunxiNeural` | 年轻自然 | 科普、教程 |

### 女声
| 语音 | 风格 | 适用场景 |
|------|------|----------|
| `zh-CN-XiaoxiaoNeural` | 自然流畅 | 通用 |
| `zh-CN-XiaoyiNeural` | 活泼 | 轻松话题 |

---

## 视频参数

| 参数 | 值 |
|------|------|
| 分辨率 | 1920x1080 |
| 帧率 | 30fps |
| 视频编码 | H.264 |
| 音频编码 | AAC 192kbps |

---

## 常见问题

### Q: 幻灯片显示不全？

A: 确保 `.slide` 元素固定尺寸 `width: 1920px; height: 1080px`，不要依赖内容撑开。

### Q: 音画不同步？

A: 调整 `SEGMENTS` 中的 `duration` 值，匹配音频实际时长。

### Q: 视频太大？

A: 降低音频比特率或使用更高效的 H.265 编码。

---

---

*Last updated: 2026-03-23*
