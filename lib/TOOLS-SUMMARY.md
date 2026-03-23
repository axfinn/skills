# 🛠️ 工具库总览

> 快速查找你需要的工具函数！

## 📊 统计

- **动画效果**: 15+ 种
- **幻灯片模板**: 10+ 种
- **快捷模板**: 20+ 种
- **工具函数**: 80+ 个
- **主题**: 5 种

---

## 🎬 动画效果 (animations.js)

### 基础动画
| 函数 | 说明 | 参数示例 |
|------|------|----------|
| `fadeIn` | 淡入 | `{ duration: 1, delay: 0.5 }` |
| `fadeOut` | 淡出 | `{ duration: 1 }` |
| `slideIn` | 滑动入场 | `{ direction: 'up', distance: 50 }` |
| `scaleIn` | 缩放入场 | `{ from: 0.8, to: 1 }` |
| `rotateIn` | 旋转入场 | `{ from: -180 }` |
| `bounceIn` | 弹性入场 | `{ duration: 1 }` |

### 特殊效果
| 函数 | 说明 | 参数示例 |
|------|------|----------|
| `typewriter` | 打字机效果 | `{ speed: 50, delay: 0 }` |
| `pulse` | 脉冲效果 | `{ scale: 1.05, duration: 2 }` |
| `float` | 浮动效果 | `{ distance: 20, duration: 3 }` |
| `highlight` | 高亮闪烁 | `{ color: '#feca57', duration: 1 }` |

### 列表与图表
| 函数 | 说明 | 参数示例 |
|------|------|----------|
| `staggerList` | 列表依次入场 | `{ animation: 'fadeIn', delayBetween: 0.2 }` |
| `animateBarChart` | 柱状图增长 | `{ duration: 1, delay: 0 }` |
| `animateNumber` | 数字滚动 | `{ duration: 2, suffix: '万', prefix: '¥' }` |

### 背景效果
| 函数 | 说明 | 参数示例 |
|------|------|----------|
| `createParticles` | 粒子背景 | `{ count: 50, color: 'rgba(255,255,255,0.5)', size: 3 }` |
| `animateGradient` | 渐变背景动画 | `{ duration: 5, direction: '135deg' }` |

---

## 📋 幻灯片模板 (templates.js)

### 基础模板
| 模板 | 说明 | 主要参数 |
|------|------|----------|
| `titleSlide` | 封面页 | title, subtitle, author, date, theme |
| `sectionSlide` | 章节页 | sectionNumber, sectionTitle, sectionDesc |
| `contentSlide` | 内容页 | title, items, highlightIndex |
| `statsSlide` | 统计数据 | title, stats (数组) |
| `chartSlide` | 图表页 | title, chartId, chartType, chartData |
| `timelineSlide` | 时间轴 | title, events (数组) |
| `quoteSlide` | 引用页 | quote, author |
| `comparisonSlide` | 对比页 | title, left, right |
| `conclusionSlide` | 总结页 | title, points, callToAction |
| `endSlide` | 结束页 | text, subtext, contact |

---

## ⚡ 快捷模板 (quick-slides.js) ⭐

### 封面模板
```javascript
QuickSlides.cover.business({ title, subtitle, company, date })
QuickSlides.cover.tech({ title, subtitle, author })
QuickSlides.cover.minimal({ title, subtitle })
```

### 内容模板
```javascript
QuickSlides.content.bulletPoints({ title, points })
QuickSlides.content.comparison({ title, leftTitle, leftItems, rightTitle, rightItems })
QuickSlides.content.timeline({ title, events })
QuickSlides.content.stats({ title, stats })
```

### 财经专用 ⭐
```javascript
QuickSlides.financial.marketOverview({ title, data: { index, value, change, changePercent } })
QuickSlides.financial.financialReport({ company, period, data: { revenue, profit, growth } })
QuickSlides.financial.economicIndicators({ title, indicators: [{ name, value, trend }] })
QuickSlides.financial.klineExplanation({ stock, period, open, high, low, close, volume })
```

### 图表模板
```javascript
QuickSlides.charts.barChart({ title, labels, data })
QuickSlides.charts.lineChart({ title, labels, data })
QuickSlides.charts.pieChart({ title, labels, data })
```

### 特殊场景
```javascript
QuickSlides.special.quote({ quote, author })
QuickSlides.special.section({ number, title, description })
QuickSlides.special.summary({ title, points, callToAction })
QuickSlides.special.end({ text, subtext, contact })
QuickSlides.special.qa({ title, subtitle })
```

### 一键生成
```javascript
const structure = [
  { type: 'cover', options: {...} },
  { type: 'content', options: {...} },
  { type: 'stats', options: {...} },
  { type: 'end', options: {...} }
];
QuickSlides.generatePresentation(structure);
```

---

## 🔧 工具函数

### 文本处理
| 函数 | 说明 | 示例 |
|------|------|------|
| `calculateDuration` | 计算朗读时长 | `Utils.calculateDuration(text, 220)` |
| `smartTruncate` | 智能截断 | `Utils.smartTruncate(text, 100)` |
| `highlightKeywords` | 高亮关键词 | `Utils.highlightKeywords(text, ['关键词'])` |
| `extractNumbers` | 提取数字 | `Utils.extractNumbers('增长 15.6%')` |
| `extractPercentages` | 提取百分比 | `Utils.extractPercentages(text)` |
| `extractDates` | 提取日期 | `Utils.extractDates(text)` |
| `toSpeechFriendly` | 转语音友好格式 | `Utils.toSpeechFriendly(text)` |
| `summarize` | 生成摘要 | `Utils.summarize(text, 200)` |

### 数字格式化
| 函数 | 说明 | 示例 | 输出 |
|------|------|------|------|
| `formatNumber` | 千位分隔 | `Utils.formatNumber(1234567.89)` | 1,234,567.89 |
| `formatLargeNumber` | 大数字 (万/亿) | `Utils.formatLargeNumber(123456789)` | 1.23 亿 |
| `formatPercentage` | 百分比 | `Utils.formatPercentage(0.1567, 2)` | 15.67% |

### 日期时间
| 函数 | 说明 | 示例 |
|------|------|------|
| `formatDate` | 格式化日期 | `Utils.formatDate(new Date(), 'YYYY-MM-DD')` |

### 颜色处理
| 函数 | 说明 | 示例 |
|------|------|------|
| `generateGradient` | 生成渐变 | `Utils.generateGradient(['#ff6b6b', '#feca57'])` |
| `blendColors` | 颜色混合 | `Utils.blendColors('#ff6b6b', '#000', 0.5)` |
| `randomColor` | 随机颜色 | `Utils.randomColor(70, 60)` |
| `generateColorPalette` | 生成配色方案 | `Utils.generateColorPalette('#667eea')` |
| `generateChartColors` | 图表颜色 | `UtilsAdvanced.generateChartColors(5, 'vibrant')` |

### 数据计算
| 函数 | 说明 | 示例 |
|------|------|------|
| `average` | 平均值 | `Utils.average([1,2,3,4,5])` |
| `max` | 最大值 | `Utils.max([1,2,3])` |
| `min` | 最小值 | `Utils.min([1,2,3])` |
| `calculateChangeRate` | 变化率 | `Utils.calculateChangeRate(100, 120)` → 20 |
| `calculateTrend` | 趋势方向 | `UtilsAdvanced.calculateTrend(data)` → 'up'/'down'/'flat' |
| `getTrendIcon` | 趋势图标 | `UtilsAdvanced.getTrendIcon('up')` → '↑' |
| `getTrendColor` | 趋势颜色 | `UtilsAdvanced.getTrendColor('up', 'china')` |

### 异步工具
| 函数 | 说明 | 示例 |
|------|------|------|
| `delay` | 延迟 | `await Utils.delay(1000)` |
| `retry` | 重试 | `await Utils.retry(fn, 3, 1000)` |
| `batchExecute` | 批量执行 | `await Utils.batchExecute(tasks, 5)` |

### DOM 操作
| 函数 | 说明 | 示例 |
|------|------|------|
| `lazyLoadImages` | 图片懒加载 | `Utils.lazyLoadImages(container)` |
| `virtualScroll` | 虚拟滚动 | `Utils.virtualScroll(list, items, { itemHeight: 50 })` |
| `downloadImage` | 下载图片 | `Utils.downloadImage(canvas, 'slide.png')` |
| `downloadText` | 下载文本 | `Utils.downloadText(content, 'file.txt')` |
| `downloadJSON` | 下载 JSON | `Utils.downloadJSON(data, 'data.json')` |

### 本地存储
```javascript
Utils.storage.get(key, defaultValue)
Utils.storage.set(key, value)
Utils.storage.remove(key)
Utils.storage.setWithExpiry(key, value, ttl)
Utils.storage.getWithExpiry(key)
```

### 事件工具
```javascript
const bus = UtilsAdvanced.createEventBus();
bus.on('event', callback);
bus.emit('event', data);
bus.off('event', callback);
```

### 响应式
| 函数 | 说明 | 示例 |
|------|------|------|
| `responsiveFontSize` | 响应式字体 | `Utils.responsiveFontSize(16)` |
| `onResize` | 监听窗口变化 | `Utils.onResize((w, h) => {...})` |
| `isMobile` | 检测设备 | `Utils.isMobile()` |

### 媒体工具
| 函数 | 说明 | 示例 |
|------|------|------|
| `formatVideoDuration` | 格式化视频时长 | `UtilsAdvanced.formatVideoDuration(3661)` → "1:01:01" |
| `estimateVideoSize` | 估算文件大小 | `UtilsAdvanced.estimateVideoSize(300, '5000k')` |
| `getVideoMetadata` | 获取视频元数据 | `UtilsAdvanced.getVideoMetadata(video)` |
| `generateVideoThumbnail` | 生成缩略图 | `await UtilsAdvanced.generateVideoThumbnail(url, 5)` |

### 调试工具
```javascript
// 性能计时
const timer = UtilsAdvanced.timer('Load');
// ... code ...
timer.end();

// 内存监控
UtilsAdvanced.monitorMemory(({ usedJSHeapSize }) => {
  console.log(`内存：${usedJSHeapSize}MB`);
});

// 错误监控
UtilsAdvanced.onError(({ message, source, lineno }) => {
  console.error('错误:', message);
});
```

---

## ⚙️ 配置管理 (config.js)

### 基本操作
```javascript
Config.get('animation.defaultDuration')
Config.set('animation.defaultDuration', 1.2)
Config.setAll({ animation: { defaultDuration: 1.0 } })
Config.merge({ theme: { default: 'tech' } })
```

### 主题颜色
```javascript
const colors = Config.getThemeColors('tech');
// { primary: '#00d9ff', secondary: '#7b2cbf', ... }
```

### 配置验证
```javascript
const validation = Config.validate();
if (!validation.valid) {
  console.error(validation.errors);
}
```

### 导入导出
```javascript
const config = Config.export();
Config.import(JSON.stringify(config));
```

---

## 🎨 主题列表

| 主题名 | 主色 | 适用场景 |
|--------|------|----------|
| `dark` | #ff6b6b | 商务报告、财经分析 |
| `gradient` | #667eea | 创意展示、产品介绍 |
| `minimal` | #2d3436 | 学术报告、简约风格 |
| `tech` | #00d9ff | 科技产品、互联网 |
| `nature` | #134e5e | 环保、健康主题 |

---

## 📖 快速查找

### 我想...
- **创建封面页** → `Templates.titleSlide()` 或 `QuickSlides.cover.business()`
- **展示数据** → `Templates.statsSlide()` 或 `QuickSlides.content.stats()`
- **做对比** → `Templates.comparisonSlide()` 或 `QuickSlides.content.comparison()`
- **显示趋势** → `QuickSlides.financial.marketOverview()`
- **添加动画** → `Animations.fadeIn()`, `Animations.slideIn()`
- **格式化数字** → `Utils.formatLargeNumber()`, `Utils.formatPercentage()`
- **计算时长** → `Utils.calculateDuration()`
- **高亮关键词** → `Utils.highlightKeywords()`
- **提取数据** → `Utils.extractNumbers()`, `Utils.extractDates()`

### 财经类专用
- **市场概览** → `QuickSlides.financial.marketOverview()`
- **财报数据** → `QuickSlides.financial.financialReport()`
- **经济指标** → `QuickSlides.financial.economicIndicators()`
- **K 线分析** → `QuickSlides.financial.klineExplanation()`

---

## 🔗 相关文档

- [快速入门](./QUICKSTART.md) - 5 分钟上手
- [详细示例](./EXAMPLES.md) - 完整 API 示例
- [主技能文档](../SKILL.md) - Video Generator Skill

---

*最后更新：2026-03-21*
