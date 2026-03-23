# 🎬 素材工具完全指南

> 免费可商用素材资源 + 下载管理工具

---

## 📦 已创建的工具

### 1. 素材管理库 (`materials.js`) ✨

**功能：**
- ✅ 免费素材网站大全
- ✅ 素材下载工具
- ✅ 素材分类管理
- ✅ 视频处理工具
- ✅ 使用建议

**引入方式：**
```html
<script src="./lib/materials.js"></script>
```

---

## 🌐 免费可商用素材网站

### 📹 视频素材

| 网站 | 说明 | 商用 | 署名 |
|------|------|------|------|
| **[Pexels Videos](https://www.pexels.com/videos/)** | 高质量股票视频 | ✅ | ❌ |
| **[Pixabay Videos](https://pixabay.com/videos/)** | 免费视频和动画 | ✅ | ❌ |
| **[Mixkit](https://mixkit.co/free-stock-video/)** | 股票视频 + 转场 | ✅ | ❌ |
| **[Coverr](https://coverr.co/)** | 背景视频 | ✅ | ❌ |
| **[Videezy](https://www.videezy.com/)** | 免费/付费混合 | ⚠️ | ✅ |

### 🖼️ 图片素材

| 网站 | 说明 | 商用 | 署名 |
|------|------|------|------|
| **[Unsplash](https://unsplash.com/)** | 高质量照片 | ✅ | ❌ |
| **[Pexels](https://www.pexels.com/)** | 股票照片 | ✅ | ❌ |
| **[Pixabay](https://pixabay.com/)** | 图片 + 插画 | ✅ | ❌ |
| **[Burst](https://burst.shopify.com/)** | Shopify 图片库 | ✅ | ❌ |

### 🎵 音乐/音效

| 网站 | 说明 | 商用 | 署名 |
|------|------|------|------|
| **[YouTube Audio Library](https://www.youtube.com/audiolibrary/)** | YouTube 音乐库 | ✅ | ❌ |
| **[Bensound](https://www.bensound.com/)** | 背景音乐 | ⚠️ | ✅ |
| **[Freesound](https://freesound.org/)** | 音效库 | ⚠️ | 视情况 |
| **[Mixkit Music](https://mixkit.co/free-stock-music/)** | 背景音乐 | ✅ | ❌ |

### 🎨 图标/插画

| 网站 | 说明 | 商用 | 署名 |
|------|------|------|------|
| **[unDraw](https://undraw.co/)** | SVG 插画 | ✅ | ❌ |
| **[Flaticon](https://www.flaticon.com/)** | 图标库 | ⚠️ | ✅ |
| **[IconFont](https://www.iconfont.cn/)** | 阿里巴巴图标 | ✅ | ❌ |

---

## 🛠️ 素材工具 API

### 下载工具

```javascript
// 下载视频（使用 yt-dlp）
await Materials.downloadVideo(url, {
  outputDir: './downloads',
  format: 'mp4',
  quality: 'best',
  filename: 'my-video'
});

// 从 Pexels 下载（需要 API key）
await Materials.downloadFromPexels('stock market', {
  limit: 5,
  quality: 'hd',
  orientation: 'landscape'
});

// 从 Unsplash 下载（需要 API key）
await Materials.downloadFromUnsplash('technology', {
  limit: 10,
  width: 1920,
  height: 1080
});
```

### 视频处理工具

```javascript
// 裁剪视频
await Materials.cropVideo('input.mp4', 'output.mp4', {
  startTime: '00:00:00',
  duration: '00:00:10',
  width: 1920,
  height: 1080
});

// 调整大小
await Materials.resizeVideo('input.mp4', 'output.mp4', 1920, 1080);

// 视频转 GIF
await Materials.videoToGif('input.mp4', 'output.gif', {
  startTime: '00:00:00',
  duration: '00:00:05',
  width: 480,
  fps: 10
});

// 提取帧
await Materials.extractFrames('video.mp4', './frames', {
  interval: 1,  // 每秒 1 帧
  format: 'png'
});

// 生成缩略图
await Materials.generateThumbnail('video.mp4', 'thumb.jpg', '00:00:01');
```

### 素材分类

```javascript
// 财经类关键词
Materials.categories.financial
// ['stock market', '股市', 'k line', 'money', ...]

// 科技类关键词
Materials.categories.tech
// ['technology', 'computer', 'ai', 'data', ...]

// 自然类关键词
Materials.categories.nature
// ['nature', 'landscape', 'mountain', 'ocean', ...]

// 城巿类关键词
Materials.categories.city
// ['city', 'building', 'street', 'architecture', ...]

// 人物类关键词
Materials.categories.people
// ['people', 'business', 'team', 'meeting', ...]

// 转场特效关键词
Materials.categories.transitions
// ['abstract', 'particle', 'light', 'gradient', ...]
```

### 场景推荐

```javascript
// 根据场景获取关键词
Materials.getKeywordsForScene('market_overview');
// ['stock market', 'trading floor', 'financial chart', 'bull bear']

Materials.getKeywordsForScene('economic_data');
// ['data visualization', 'chart', 'graph', 'statistics']

Materials.getKeywordsForScene('company_report');
// ['office building', 'corporate', 'business meeting', 'logo']
```

### 内容类型推荐

```javascript
// 根据内容类型推荐素材
Materials.recommendMaterials('财经新闻');
// {
//   video: ['stock market', 'trading', 'financial district'],
//   image: ['chart', 'graph', 'money'],
//   music: ['corporate', 'upbeat', 'professional']
// }

Materials.recommendMaterials('科技评测');
// {
//   video: ['technology', 'computer', 'gadget'],
//   image: ['circuit', 'chip', 'digital'],
//   music: ['electronic', 'modern', 'tech']
// }
```

---

## 💡 使用示例

### 示例 1: 财经视频素材搜索

```javascript
// 搜索财经相关素材关键词
const keywords = [
  ...Materials.categories.financial,
  ...Materials.getKeywordsForScene('market_overview')
];

console.log('搜索关键词:', keywords);
// ['stock market', '股市', 'k line', 'trading floor', ...]

// 去 Pexels 搜索
const searchUrl = `https://www.pexels.com/search/videos/${encodeURIComponent('stock market')}/`;
```

### 示例 2: 批量下载素材

```javascript
// 安装 yt-dlp: brew install yt-dlp
const videos = [
  'https://www.pexels.com/video/12345/',
  'https://www.pexels.com/video/67890/'
];

for (const url of videos) {
  await Materials.downloadVideo(url, {
    outputDir: './素材/财经视频',
    quality: 'hd'
  });
}
```

### 示例 3: 视频预处理

```javascript
// 裁剪视频为 10 秒片段
await Materials.cropVideo(
  'raw-video.mp4',
  'clips/clip-01.mp4',
  {
    startTime: '00:00:05',
    duration: '00:00:10',
    width: 1920,
    height: 1080
  }
);

// 生成缩略图
await Materials.generateThumbnail(
  'clips/clip-01.mp4',
  'thumbnails/clip-01.jpg',
  '00:00:02'
);
```

### 示例 4: 提取视频帧做幻灯片

```javascript
// 从视频提取帧（每 2 秒 1 帧）
await Materials.extractFrames(
  'presentation-video.mp4',
  './slides-frames',
  {
    interval: 2,
    format: 'png',
    quality: 1
  }
);

// 然后用这些帧作为幻灯片背景
```

---

## 🎯 最佳实践

### 视频素材使用

```javascript
Materials.bestPractices.video
// [
//   '使用 1080p 或更高分辨率',
//   '保持视频片段简短（5-15 秒）',
//   '选择与内容情绪匹配的素材',
//   '避免过度使用转场特效',
//   '注意版权和授权'
// ]
```

### 图片素材使用

```javascript
Materials.bestPractices.image
// [
//   '使用高质量图片（至少 1920x1080）',
//   '保持风格一致性',
//   '适当压缩以减小文件大小',
//   '添加文字时确保对比度',
//   '优先选择免版税图片'
// ]
```

### 音乐使用

```javascript
Materials.bestPractices.music
// [
//   '音量不要盖过旁白',
//   '选择与内容情绪匹配的音乐',
//   '注意音乐的节奏变化',
//   '使用淡入淡出效果',
//   '确保有商业使用授权'
// ]
```

---

## 📊 素材搜索技巧

### 财经类视频关键词

```javascript
const financialKeywords = [
  // 市场相关
  'stock market', 'stock exchange', 'trading floor',
  'bull market', 'bear market', 'wall street',
  
  // 数据图表
  'financial chart', 'stock chart', 'candlestick',
  'k line', 'graph', 'data visualization',
  
  // 货币金融
  'money', 'currency', 'cash', 'bitcoin',
  'cryptocurrency', 'bank', 'finance',
  
  // 商业场景
  'business meeting', 'office', 'corporate',
  'trader', 'analyst', 'presentation'
];
```

### 科技类视频关键词

```javascript
const techKeywords = [
  // 技术相关
  'technology', 'computer', 'programming', 'code',
  'software', 'algorithm', 'database',
  
  // 前沿科技
  'artificial intelligence', 'ai', 'machine learning',
  'robot', 'automation', 'blockchain',
  
  // 硬件设备
  'server', 'data center', 'cloud computing',
  'network', 'smartphone', 'device',
  
  // 视觉效果
  'digital', 'cyber', 'hologram', 'futuristic',
  'matrix', 'circuit', 'chip'
];
```

---

## 🔧 环境配置

### 安装依赖

```bash
# 视频下载工具
brew install yt-dlp

# 视频处理工具
brew install ffmpeg

# Node.js 依赖（可选）
cd video-generator
npm install
```

### API Key 配置

```bash
# Pexels API（可选）
export PEXELS_API_KEY="your-pexels-api-key"

# Unsplash API（可选）
export UNSPLASH_API_KEY="your-unsplash-api-key"
```

**获取 API Key：**
- Pexels: https://www.pexels.com/api/
- Unsplash: https://unsplash.com/developers

---

## 📝 版权注意事项

### ✅ 可以免费商用的

- Pexels（视频、图片）
- Pixabay（视频、图片、音乐）
- Mixkit（视频、音乐）
- Coverr（视频）
- Unsplash（图片）
- YouTube Audio Library（音乐）

### ⚠️ 需要注意的

- **署名要求**: 有些网站要求标注作者
- **使用限制**: 有些禁止用于敏感内容
- **二次分发**: 有些禁止直接转售素材
- **商标/肖像**: 注意素材中的商标和人物肖像权

### ❌ 避免使用的

- 未明确授权的影视片段
- 有版权保护的音乐
- 新闻机构的视频素材
- 社交媒体上的用户内容

---

## 🎨 素材库推荐清单

### 财经视频必备素材

1. **市场全景**: 股票交易所、交易大厅
2. **K 线图**: 动态股票图表
3. **货币**: 现金、硬币、数字货币
4. **商业场景**: 办公室、会议、握手
5. **数据可视化**: 图表、图形、统计
6. **转场特效**: 粒子、光效、渐变

### 科技视频必备素材

1. **设备特写**: 电脑、手机、服务器
2. **代码滚动**: 编程界面、终端
3. **数据流动**: 网络、云、光纤
4. **AI 元素**: 机器人、神经网络
5. **未来感**: 全息、赛博朋克风格
6. **转场特效**: 数字、科技风格

---

## 🔗 快速链接

| 类别 | 链接 |
|------|------|
| Pexels 视频 | https://www.pexels.com/videos/ |
| Pixabay 视频 | https://pixabay.com/videos/ |
| Mixkit | https://mixkit.co/ |
| Unsplash | https://unsplash.com/ |
| YouTube 音乐库 | https://www.youtube.com/audiolibrary/ |

---

*Happy Creating! 🎬*
