# 快速使用示例

## 🚀 5 分钟快速上手

### 示例 1: 最简单的封面页

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="./lib/animations.js"></script>
  <script src="./lib/templates.js"></script>
  <script src="./lib/utils.js"></script>
  <script src="./lib/config.js"></script>
</head>
<body>
  <div id="slides"></div>
  
  <script>
    // 生成封面
    const cover = Templates.titleSlide({
      title: '我的演示文稿',
      subtitle: '2026 年 3 月',
      theme: 'dark'
    });
    
    document.getElementById('slides').innerHTML = cover;
  </script>
</body>
</html>
```

### 示例 2: 使用快捷模板

```javascript
// 引入快捷模板库
<script src="./lib/quick-slides.js"></script>

// 一键生成财经类幻灯片
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

// 一键生成 K 线分析
const klineSlide = QuickSlides.financial.klineExplanation({
  stock: '贵州茅台',
  period: '日线',
  open: 1680.50,
  high: 1700.25,
  low: 1660.80,
  close: 1695.68,
  volume: 123.45,
  theme: 'dark'
});
```

### 示例 3: 完整演示文稿结构

```javascript
// 定义演示文稿结构
const structure = [
  {
    type: 'cover',
    options: {
      title: '2026 年投资策略',
      subtitle: '危机中的机遇',
      company: '投资研究部',
      date: '2026 年 3 月'
    }
  },
  {
    type: 'section',
    options: {
      number: '01',
      title: '市场回顾',
      description: '2025 年关键事件'
    }
  },
  {
    type: 'content',
    options: {
      title: '主要发现',
      points: [
        '全球 GDP 增长放缓至 2.1%',
        '通胀压力持续存在',
        '科技股估值回调 30%',
        '新兴市场表现分化'
      ]
    }
  },
  {
    type: 'stats',
    options: {
      title: '关键指标',
      stats: [
        { value: '-15.6%', label: '股市跌幅' },
        { value: '4.2%', label: '通胀率' },
        { value: '2.1 万', label: '新增就业' }
      ]
    }
  },
  {
    type: 'comparison',
    options: {
      title: '策略对比',
      leftTitle: '保守策略',
      leftItems: ['低风险', '稳定收益', '流动性差'],
      rightTitle: '激进策略',
      rightItems: ['高风险', '高回报', '波动大']
    }
  },
  {
    type: 'summary',
    options: {
      title: '核心建议',
      points: [
        '多元化配置降低风险',
        '关注科技和医疗板块',
        '保持充足现金流'
      ],
      callToAction: '立即行动，把握机遇！'
    }
  },
  {
    type: 'end',
    options: {
      text: '谢谢观看',
      contact: 'contact@example.com'
    }
  }
];

// 一键生成完整 PPT
const presentation = QuickSlides.generatePresentation(structure);
document.getElementById('slides').innerHTML = presentation;
```

### 示例 4: 使用动画效果

```javascript
// 创建元素
const element = document.createElement('div');
element.textContent = 'Hello World';
document.body.appendChild(element);

// 添加动画
Animations.fadeIn(element, { duration: 1, delay: 0.5 });
Animations.slideIn(element, { direction: 'up', duration: 0.8 });

// 列表动画
const list = document.querySelector('ul');
Animations.staggerList(list, {
  animation: 'fadeIn',
  delayBetween: 0.2
});

// 数字滚动
const numberElement = document.querySelector('.stat-value');
Animations.animateNumber(numberElement, 1000000, {
  duration: 2,
  suffix: '万',
  prefix: '¥'
});

// 粒子背景
const container = document.querySelector('.slide');
Animations.createParticles(container, {
  count: 50,
  color: 'rgba(255,255,255,0.5)',
  size: 4
});
```

### 示例 5: 使用工具函数

```javascript
// 计算朗读时长
const text = '这是一段需要朗读的文本，大约需要几秒钟时间。';
const duration = Utils.calculateDuration(text, 220);
console.log(`朗读时长：${duration.toFixed(1)}秒`);

// 格式化数字
console.log(Utils.formatLargeNumber(123456789));  // "1.23 亿"
console.log(Utils.formatPercentage(0.1567, 2));   // "15.67%"
console.log(Utils.formatNumber(1234567.89));      // "1,234,567.89"

// 文本处理
const longText = '这是一段很长的文本...' * 100;
console.log(Utils.smartTruncate(longText, 100));

// 高亮关键词
const text = 'GDP 增长 5.2%，CPI 上涨 0.3%';
const highlighted = Utils.highlightKeywords(text, ['GDP', 'CPI'], 'highlight');

// 提取数据
const numbers = Utils.extractNumbers('增长了 15.6%，达到 1234 亿元');
console.log(numbers);  // [15.6, 1234]

// 生成渐变
const gradient = Utils.generateGradient(['#ff6b6b', '#feca57'], '135deg');

// 颜色处理
const color = Utils.blendColors('#ff6b6b', '#feca57', 0.5);
```

### 示例 6: 财经数据展示

```javascript
// 经济指标
const economicSlide = QuickSlides.financial.economicIndicators({
  title: '宏观经济指标',
  indicators: [
    { name: 'GDP 增速', value: '5.2%', trend: 'up' },
    { name: 'CPI', value: '0.3%', trend: 'flat' },
    { name: 'PPI', value: '-2.8%', trend: 'down' },
    { name: '失业率', value: '5.1%', trend: 'flat' },
    { name: 'PMI', value: '50.8', trend: 'up' }
  ],
  theme: 'tech'
});

// 财报数据
const reportSlide = QuickSlides.financial.financialReport({
  company: '腾讯控股',
  period: '2025 年 Q4',
  data: {
    revenue: 1556.23,  // 亿元
    profit: 456.78,    // 亿元
    growth: 12.5       // %
  },
  theme: 'dark'
});
```

### 示例 7: 使用配置管理

```javascript
// 获取当前配置
const defaultDuration = Config.get('animation.defaultDuration');
const defaultTheme = Config.get('theme.default');

// 修改配置
Config.set('animation.defaultDuration', 1.2);
Config.set('theme.default', 'gradient');

// 批量设置
Config.setAll({
  animation: {
    defaultDuration: 1.0,
    enableAnimations: true
  },
  slides: {
    width: 3840,
    height: 2160
  }
});

// 获取主题颜色
const colors = Config.getThemeColors('tech');
console.log(colors);
// { primary: '#00d9ff', secondary: '#7b2cbf', ... }

// 验证配置
const validation = Config.validate();
if (!validation.valid) {
  console.error('配置错误:', validation.errors);
}
```

## 📊 实际案例

### 案例 1: 股市分析视频

```javascript
const stockAnalysis = [
  {
    type: 'cover',
    options: {
      title: 'A 股市场周报',
      subtitle: '2026 年第 12 周',
      company: '市场研究部',
      date: '2026-03-21'
    }
  },
  {
    type: 'stats',
    options: {
      title: '主要指数表现',
      stats: [
        { value: '3250.68', label: '上证指数' },
        { value: '-0.77%', label: '周涨跌幅' },
        { value: '4567 亿', label: '日均成交' }
      ]
    }
  },
  {
    type: 'content',
    options: {
      title: '本周要点',
      points: [
        '市场震荡调整，成交量萎缩',
        '科技股领跌，白酒股反弹',
        '北向资金净流出 120 亿',
        'IPO 节奏放缓'
      ]
    }
  },
  {
    type: 'comparison',
    options: {
      title: '板块表现',
      leftTitle: '领涨板块',
      leftItems: ['白酒 +5.2%', '银行 +2.1%', '家电 +1.8%'],
      rightTitle: '领跌板块',
      rightItems: ['芯片 -8.5%', '软件 -6.2%', '传媒 -4.3%']
    }
  },
  {
    type: 'summary',
    options: {
      title: '下周策略',
      points: [
        '控制仓位，等待方向明朗',
        '关注一季报预增股',
        '回避高估值题材股'
      ]
    }
  },
  {
    type: 'end',
    options: {
      text: '感谢观看'
    }
  }
];

const html = QuickSlides.generatePresentation(stockAnalysis);
```

### 案例 2: 公司财报解读

```javascript
const earningsReport = [
  {
    type: 'cover',
    options: {
      title: '贵州茅台 2025 年报解读',
      subtitle: '稳健增长 持续分红',
      company: '投资研究部',
      date: '2026-03-20'
    }
  },
  {
    type: 'section',
    options: {
      number: '01',
      title: '核心数据'
    }
  },
  {
    type: 'stats',
    options: {
      title: '2025 年主要财务指标',
      stats: [
        { value: '1556 亿', label: '营业收入' },
        { value: '785 亿', label: '净利润' },
        { value: '+15.6%', label: '同比增长' },
        { value: '92.3%', label: '毛利率' }
      ]
    }
  },
  {
    type: 'content',
    options: {
      title: '亮点分析',
      points: [
        '营收首次突破 1500 亿',
        '直销占比提升至 45%',
        '系列酒增长 30%',
        '拟分红率 52%'
      ]
    }
  },
  {
    type: 'quote',
    options: {
      quote: '茅台的护城河依然深厚，品牌价值持续提升',
      author: '董事长'
    }
  },
  {
    type: 'summary',
    options: {
      title: '投资建议',
      points: [
        '长期价值凸显',
        '建议逢低配置',
        '目标价 2000 元'
      ],
      callToAction: '关注长期价值投资机会'
    }
  },
  {
    type: 'end',
    options: {
      text: '谢谢观看',
      contact: 'research@example.com'
    }
  }
];

const html = QuickSlides.generatePresentation(earningsReport);
```

## 💡 最佳实践

### 1. 选择合适的主题
```javascript
// 商务报告 → dark 或 minimal
QuickSlides.cover.business({ theme: 'dark' });

// 科技产品 → tech
QuickSlides.cover.tech({ theme: 'tech' });

// 创意展示 → gradient
QuickSlides.cover.minimal({ theme: 'gradient' });
```

### 2. 动画使用原则
```javascript
// 重要内容使用强调动画
Animations.bounceIn(importantElement, { duration: 1 });

// 列表使用 stagger 效果
Animations.staggerList(list, { delayBetween: 0.2 });

// 不要过度使用动画
// 保持动画速度一致
```

### 3. 文本长度控制
```javascript
// 标题不超过 20 字
const title = Utils.smartTruncate(longTitle, 20);

// 每页不超过 7 个要点
const points = allPoints.slice(0, 7);
```

### 4. 数据格式化
```javascript
// 大数字使用万/亿
const revenue = Utils.formatLargeNumber(12345678900);  // "123.46 亿"

// 百分比保留合适小数
const growth = Utils.formatPercentage(0.15678, 1);  // "15.7%"
```

## 🎯 下一步

- 查看 `lib/README.md` 了解完整 API
- 查看 `lib/animations.js` 了解所有动画效果
- 查看 `lib/templates.js` 了解所有模板
- 查看 `lib/utils-advanced.js` 了解高级工具函数
