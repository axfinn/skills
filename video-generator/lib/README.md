# Video PPT Tool Library

视频 PPT 制作工具库 - 让幻灯片更炫酷！

## 📦 目录结构

```
lib/
├── animations.js          # 动画效果库 (15+ 种动画)
├── templates.js           # 幻灯片模板库 (10+ 种模板)
├── utils.js               # 基础工具函数库 (30+ 个函数)
├── utils-advanced.js      # 高级工具函数库 (50+ 个函数) ✨
├── quick-slides.js        # 快捷模板库 (财经类专用) ✨
├── config.js              # 配置管理
├── README.md              # 本文档
├── QUICKSTART.md          # 快速入门指南 ✨
└── EXAMPLES.md            # 详细使用示例
```

## 🚀 快速开始

### 1. 引入库文件

```html
<!-- 基础库 -->
<script src="./lib/animations.js"></script>
<script src="./lib/templates.js"></script>
<script src="./lib/utils.js"></script>
<script src="./lib/config.js"></script>

<!-- 高级工具 (可选) -->
<script src="./lib/utils-advanced.js"></script>
<script src="./lib/quick-slides.js"></script>

<!-- 图表库 (可选) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 2. 使用快捷模板 (推荐)

```javascript
// 财经类幻灯片 - 一行搞定！
const marketSlide = QuickSlides.financial.marketOverview({
  title: '市场概览',
  data: {
    index: '上证指数',
    value: 3250.68,
    change: -25.30,
    changePercent: -0.77
  },
  theme: 'tech'
});

// 完整演示文稿 - 定义结构即可
const structure = [
  { type: 'cover', options: { title: '我的演示' } },
  { type: 'content', options: { title: '要点', points: ['要点 1', '要点 2'] } },
  { type: 'stats', options: { title: '数据', stats: [...] } },
  { type: 'end', options: { text: '谢谢观看' } }
];

const presentation = QuickSlides.generatePresentation(structure);
```

### 3. 使用基础模板

```javascript
// 封面页
Templates.titleSlide({
  title: '我的演示',
  subtitle: '副标题',
  theme: 'dark'  // dark, gradient, minimal, tech, nature
});

// 内容页
Templates.contentSlide({
  title: '章节标题',
  items: ['要点 1', '要点 2', '要点 3'],
  theme: 'tech'
});

// 统计数据页
Templates.statsSlide({
  title: '关键指标',
  stats: [
    { value: '-15.6%', label: '股市跌幅' },
    { value: '4.2%', label: '通胀率' }
  ],
  theme: 'dark'
});
```

### 4. 添加动画效果

```javascript
// 淡入效果
Animations.fadeIn(element, { duration: 1, delay: 0.5 });

// 滑动入场
Animations.slideIn(element, { direction: 'up' });

// 缩放入场
Animations.scaleIn(element, { from: 0.8 });

// 列表依次入场
Animations.staggerList(listElement, { delayBetween: 0.2 });

// 数字滚动
Animations.animateNumber(element, 1000000, { 
  duration: 2, 
  suffix: '万' 
});

// 粒子背景
Animations.createParticles(container, { count: 50 });
```

### 5. 使用工具函数

```javascript
// 计算朗读时长
const duration = Utils.calculateDuration('文本内容', 220);

// 格式化数字
Utils.formatLargeNumber(123456789);  // "1.23 亿"
Utils.formatPercentage(0.1567, 2);   // "15.67%"

// 文本处理
Utils.smartTruncate(longText, 100);
Utils.highlightKeywords(text, ['关键词'], 'highlight');

// 数据提取
Utils.extractNumbers('增长了 15.6%');  // [15.6]
Utils.extractDates('2026 年 3 月 21 日');  // ['2026 年 3 月 21 日']
```

## 📚 文档索引

| 文档 | 说明 |
|------|------|
| [`QUICKSTART.md`](./QUICKSTART.md) | ⭐ 快速入门，5 分钟上手 |
| [`EXAMPLES.md`](./EXAMPLES.md) | 详细 API 使用示例 |
| `animations.js` | 动画效果库完整文档 |
| `templates.js` | 幻灯片模板库完整文档 |
| `utils.js` | 基础工具函数文档 |
| `utils-advanced.js` | 高级工具函数文档 |
| `quick-slides.js` | 快捷模板库文档 |
| `config.js` | 配置管理文档 |

## 🎨 主题

| 主题 | 说明 | 适用场景 |
|------|------|----------|
| `dark` | 深色商务风 | 财经报告、正式演示 |
| `gradient` | 渐变活力风 | 创意展示、产品介绍 |
| `minimal` | 极简风格 | 学术报告、简约风格 |
| `tech` | 科技感 | 科技产品、互联网 |
| `nature` | 自然风格 | 环保、健康主题 |

## 🛠️ 工具分类

### 动画效果 (animations.js)
- 基础动画：fadeIn, fadeOut, slideIn, scaleIn, rotateIn
- 特殊效果：bounceIn, typewriter, pulse, float, highlight
- 列表动画：staggerList
- 图表动画：animateBarChart, animateNumber
- 背景效果：createParticles, animateGradient

### 幻灯片模板 (templates.js)
- 封面：titleSlide
- 章节：sectionSlide
- 内容：contentSlide
- 数据：statsSlide, chartSlide
- 时间轴：timelineSlide
- 引用：quoteSlide
- 对比：comparisonSlide
- 总结：conclusionSlide
- 结束：endSlide

### 快捷模板 (quick-slides.js) ⭐
- 财经类：marketOverview, financialReport, economicIndicators, klineExplanation
- 图表类：barChart, lineChart, pieChart
- 特殊场景：quote, section, summary, end, qa
- 一键生成：generatePresentation

### 工具函数 (utils.js + utils-advanced.js)
- 文本处理：calculateDuration, smartTruncate, highlightKeywords, summarize
- 数字格式化：formatNumber, formatLargeNumber, formatPercentage
- 日期时间：formatDate, extractDates
- 颜色处理：generateGradient, blendColors, randomColor, generateChartColors
- 数据计算：average, max, min, calculateChangeRate, calculateTrend
- 异步工具：delay, retry, batchExecute
- DOM 操作：lazyLoadImages, virtualScroll
- 存储：storage.get/set/remove
- 事件：createEventBus
- 响应式：responsiveFontSize, onResize
- 媒体：formatVideoDuration, estimateVideoSize, generateVideoThumbnail
- 调试：timer, monitorMemory, onError

### 配置管理 (config.js)
- 获取配置：Config.get(path)
- 设置配置：Config.set(path, value)
- 批量设置：Config.setAll(config)
- 主题颜色：Config.getThemeColors(theme)
- 配置验证：Config.validate()

## 💡 最佳实践

1. **优先使用快捷模板** - `QuickSlides` 一行搞定常见场景
2. **选择合适的主题** - 商务用 dark，科技用 tech
3. **动画适度** - 重要内容用强调动画，列表用 stagger
4. **文本简洁** - 标题<20 字，每页<7 个要点
5. **数据格式化** - 大数字用万/亿，百分比保留 1-2 位小数

## 🔗 相关链接

- [快速入门](./QUICKSTART.md) - 5 分钟上手教程
- [详细示例](./EXAMPLES.md) - 完整 API 示例
- [主技能文档](../SKILL.md) - Video Generator Skill
