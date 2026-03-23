# 使用示例

## 快速开始

### 1. 在 HTML 中引入库

```html
<script src="./lib/animations.js"></script>
<script src="./lib/templates.js"></script>
<script src="./lib/utils.js"></script>
<script src="./lib/config.js"></script>
```

### 2. 使用模板创建幻灯片

```javascript
// 创建封面
const titleSlide = Templates.titleSlide({
  title: '2026 年经济展望',
  subtitle: '危机与机遇并存',
  author: '分析师团队',
  date: '2026 年 3 月',
  theme: 'tech',
  animation: true
});

// 创建章节页
const sectionSlide = Templates.sectionSlide({
  sectionNumber: '01',
  sectionTitle: '市场回顾',
  sectionDesc: '过去一年的关键事件',
  theme: 'tech'
});

// 创建内容页
const contentSlide = Templates.contentSlide({
  title: '主要发现',
  items: [
    '全球 GDP 增长放缓至 2.1%',
    '通胀压力持续存在',
    '科技股估值回调 30%',
    '新兴市场表现分化'
  ],
  theme: 'tech',
  highlightIndex: 0
});

// 创建统计数据页
const statsSlide = Templates.statsSlide({
  title: '关键指标',
  stats: [
    { value: '-15.6%', label: '股市跌幅' },
    { value: '4.2%', label: '通胀率' },
    { value: '2.1 万', label: '新增就业' }
  ],
  theme: 'tech'
});

// 创建图表页
const chartSlide = Templates.chartSlide({
  title: 'GDP 增长趋势',
  chartId: 'gdp-chart',
  chartType: 'line',
  description: '2024-2026 年季度 GDP 增长率',
  theme: 'tech'
});

// 创建时间轴
const timelineSlide = Templates.timelineSlide({
  title: '重要事件',
  events: [
    { date: '2025 Q1', event: '美联储加息' },
    { date: '2025 Q3', event: '科技股暴跌' },
    { date: '2026 Q1', event: '政策转向' }
  ],
  theme: 'tech'
});

// 创建引用页
const quoteSlide = Templates.quoteSlide({
  quote: '危机中往往蕴含着最大的机遇',
  author: '沃伦·巴菲特',
  theme: 'tech'
});

// 创建对比页
const comparisonSlide = Templates.comparisonSlide({
  title: '方案对比',
  left: {
    title: '保守策略',
    items: ['低风险', '稳定收益', '流动性差']
  },
  right: {
    title: '激进策略',
    items: ['高风险', '高回报', '波动大']
  },
  theme: 'tech'
});

// 创建总结页
const conclusionSlide = Templates.conclusionSlide({
  title: '核心建议',
  points: [
    '多元化配置降低风险',
    '关注科技和医疗板块',
    '保持充足现金流',
    '长期投资视角'
  ],
  callToAction: '立即行动，把握机遇！',
  theme: 'tech'
});

// 创建结束页
const endSlide = Templates.endSlide({
  text: '谢谢观看',
  subtext: '欢迎提问',
  contact: 'contact@example.com',
  theme: 'tech'
});
```

### 3. 使用动画效果

```javascript
// 淡入效果
Animations.fadeIn(element, { duration: 1, delay: 0.5 });

// 滑动入场
Animations.slideIn(element, { direction: 'up', distance: 50 });

// 缩放入场
Animations.scaleIn(element, { from: 0.8, to: 1 });

// 弹性入场
Animations.bounceIn(element, { duration: 1 });

// 打字机效果
Animations.typewriter(element, { speed: 50, delay: 0 });

// 列表依次入场
Animations.staggerList(listElement, {
  animation: 'fadeIn',
  delayBetween: 0.2
});

// 脉冲效果
Animations.pulse(element, { scale: 1.05, duration: 2 });

// 浮动效果
Animations.float(element, { distance: 20, duration: 3 });

// 数字滚动
Animations.animateNumber(element, 1000000, {
  duration: 2,
  suffix: '万',
  prefix: '¥'
});

// 创建粒子背景
Animations.createParticles(container, {
  count: 50,
  color: 'rgba(255,255,255,0.5)',
  size: 3,
  speed: 0.5
});

// 渐变背景动画
Animations.animateGradient(element, ['#667eea', '#764ba2'], {
  duration: 5,
  direction: '135deg'
});
```

### 4. 使用工具函数

```javascript
// 计算朗读时长
const duration = Utils.calculateDuration('这是一段测试文本', 220);
// 输出：约 3-5 秒

// 生成渐变
const gradient = Utils.generateGradient(['#ff6b6b', '#feca57'], '135deg');
// 输出：linear-gradient(135deg, #ff6b6b, #feca57)

// 格式化数字
Utils.formatNumber(1234567.89);
// 输出：1,234,567.89

Utils.formatLargeNumber(123456789);
// 输出：1.23 亿

// 格式化百分比
Utils.formatPercentage(0.1567, 2);
// 输出：15.67%

// 格式化日期
Utils.formatDate(new Date(), 'YYYY-MM-DD HH:mm');
// 输出：2026-03-21 19:00

// 截断文本
Utils.truncate('这是一段很长的文本...', 20);
// 输出：这是一段很长的文本...

// 文本分段
const segments = Utils.splitText('第一段。第二段！第三段？', 50);
// 输出：['第一段。', '第二段！', '第三段？']

// 生成随机颜色
const color = Utils.randomColor(70, 60);
// 输出：hsl(随机色相，70%, 60%)

// 计算变化率
Utils.calculateChangeRate(100, 120);
// 输出：20

// 延迟执行
await Utils.delay(1000);

// 重试执行
const result = await Utils.retry(async () => {
  return await fetchData();
}, 3, 1000);
```

### 5. 配置管理

```javascript
// 获取配置
const duration = Config.get('animation.defaultDuration');
const theme = Config.get('theme.default');

// 设置配置
Config.set('animation.defaultDuration', 1.2);
Config.set('theme.default', 'gradient');

// 批量设置
Config.setAll({
  animation: {
    defaultDuration: 1.0,
    enableAnimations: true
  },
  video: {
    resolution: '3840x2160',
    fps: 60
  }
});

// 获取主题颜色
const colors = Config.getThemeColors('tech');
// 输出：{ primary: '#00d9ff', secondary: '#7b2cbf', ... }

// 验证配置
const validation = Config.validate();
if (!validation.valid) {
  console.error('配置错误:', validation.errors);
}

// 导出配置
const config = Config.export();

// 导入配置
Config.import(JSON.stringify(config));
```

## 完整示例

```javascript
// 生成完整演示文稿
function generatePresentation(data) {
  const slides = [];
  
  // 1. 封面
  slides.push(Templates.titleSlide({
    title: data.title,
    subtitle: data.subtitle,
    author: data.author,
    date: data.date,
    theme: 'tech'
  }));
  
  // 2. 目录
  slides.push(Templates.contentSlide({
    title: '目录',
    items: data.sections.map(s => s.title),
    theme: 'tech'
  }));
  
  // 3. 各章节
  data.sections.forEach((section, index) => {
    // 章节页
    slides.push(Templates.sectionSlide({
      sectionNumber: String(index + 1).padStart(2, '0'),
      sectionTitle: section.title,
      theme: 'tech'
    }));
    
    // 内容页
    if (section.content) {
      slides.push(Templates.contentSlide({
        title: section.title,
        items: section.content,
        theme: 'tech'
      }));
    }
    
    // 数据页
    if (section.stats) {
      slides.push(Templates.statsSlide({
        title: '数据统计',
        stats: section.stats,
        theme: 'tech'
      }));
    }
  });
  
  // 4. 总结
  slides.push(Templates.conclusionSlide({
    title: '总结',
    points: data.conclusions,
    callToAction: data.callToAction,
    theme: 'tech'
  }));
  
  // 5. 结束
  slides.push(Templates.endSlide({
    text: '谢谢观看',
    contact: data.contact,
    theme: 'tech'
  }));
  
  return slides.join('\n');
}
```

## 最佳实践

1. **选择合适的主题**
   - 商务报告 → `dark` 或 `minimal`
   - 科技产品 → `tech`
   - 创意展示 → `gradient`
   - 环保主题 → `nature`

2. **动画使用原则**
   - 不要过度使用动画
   - 保持动画速度一致
   - 重要内容使用强调动画
   - 列表使用 stagger 效果

3. **配色建议**
   - 主色不超过 3 种
   - 保持足够的对比度
   - 使用主题预设配色

4. **文本长度**
   - 标题：不超过 20 字
   - 要点：每行不超过 30 字
   - 每页不超过 7 个要点

5. **图表使用**
   - 简单数据用柱状图
   - 趋势用折线图
   - 占比用饼图
   - 多系列用组合图
