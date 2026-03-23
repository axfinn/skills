/**
 * 常用幻灯片模板集合
 * 快速生成各种类型的幻灯片
 */

const QuickSlides = {
  /**
   * 封面幻灯片 - 多种风格
   */
  cover: {
    // 商务风格
    business(options = {}) {
      const {
        title = '报告标题',
        subtitle = '副标题',
        company = '',
        date = new Date().toLocaleDateString('zh-CN'),
        theme = 'dark'
      } = options;
      
      return Templates.titleSlide({
        title,
        subtitle,
        author: company,
        date,
        theme,
        animation: true
      });
    },
    
    // 科技感
    tech(options = {}) {
      const {
        title = '科技演示',
        subtitle = '探索未来',
        author = '',
        theme = 'tech'
      } = options;
      
      return Templates.titleSlide({
        title,
        subtitle,
        author,
        theme,
        animation: true
      });
    },
    
    // 简约风格
    minimal(options = {}) {
      const {
        title = '标题',
        subtitle = '',
        theme = 'minimal'
      } = options;
      
      return Templates.titleSlide({
        title,
        subtitle,
        theme,
        animation: true
      });
    }
  },
  
  /**
   * 内容幻灯片 - 多种布局
   */
  content: {
    // 要点列表
    bulletPoints(options = {}) {
      const {
        title = '要点',
        points = ['要点 1', '要点 2', '要点 3'],
        theme = 'dark'
      } = options;
      
      return Templates.contentSlide({
        title,
        items: points,
        theme,
        animation: true
      });
    },
    
    // 左右对比
    comparison(options = {}) {
      const {
        title = '对比分析',
        leftTitle = '方案 A',
        leftItems = [],
        rightTitle = '方案 B',
        rightItems = [],
        theme = 'dark'
      } = options;
      
      return Templates.comparisonSlide({
        title,
        left: { title: leftTitle, items: leftItems },
        right: { title: rightTitle, items: rightItems },
        theme,
        animation: true
      });
    },
    
    // 时间轴
    timeline(options = {}) {
      const {
        title = '发展历程',
        events = [],
        theme = 'dark'
      } = options;
      
      return Templates.timelineSlide({
        title,
        events,
        theme,
        animation: true
      });
    },
    
    // 统计数据
    stats(options = {}) {
      const {
        title = '数据统计',
        stats = [],
        theme = 'dark'
      } = options;
      
      return Templates.statsSlide({
        title,
        stats,
        theme,
        animation: true
      });
    }
  },
  
  /**
   * 财经类专用模板
   */
  financial: {
    // 市场概览
    marketOverview(options = {}) {
      const {
        title = '市场概览',
        data = {
          index: '上证指数',
          value: 3250.68,
          change: -2.35,
          changePercent: -0.72
        },
        theme = 'dark'
      } = options;
      
      const trend = data.change >= 0 ? 'up' : 'down';
      const trendColor = UtilsAdvanced.getTrendColor(trend, 'china');
      const trendIcon = UtilsAdvanced.getTrendIcon(trend);
      
      const stats = [
        { 
          value: `${data.value.toFixed(2)}`, 
          label: data.index 
        },
        { 
          value: `<span style="color: ${trendColor}">${trendIcon} ${Math.abs(data.change).toFixed(2)}</span>`, 
          label: '涨跌' 
        },
        { 
          value: `<span style="color: ${trendColor}">${trendIcon} ${Math.abs(data.changePercent).toFixed(2)}%</span>`, 
          label: '幅度' 
        }
      ];
      
      return Templates.statsSlide({
        title,
        stats,
        theme,
        animation: true
      });
    },
    
    // 财报数据
    financialReport(options = {}) {
      const {
        title = '财务数据',
        company = '某某公司',
        period = '2025 年报',
        data = {
          revenue: 1234.56,
          profit: 234.56,
          growth: 15.6
        },
        theme = 'dark'
      } = options;
      
      const stats = [
        { 
          value: `${UtilsAdvanced.formatLargeNumber(data.revenue * 100000000)}`, 
          label: '营业收入' 
        },
        { 
          value: `${UtilsAdvanced.formatLargeNumber(data.profit * 100000000)}`, 
          label: '净利润' 
        },
        { 
          value: `${data.growth.toFixed(1)}%`, 
          label: '同比增长' 
        }
      ];
      
      return Templates.statsSlide({
        title: `${company} ${period}`,
        stats,
        theme,
        animation: true
      });
    },
    
    // 经济指标
    economicIndicators(options = {}) {
      const {
        title = '经济指标',
        indicators = [
          { name: 'GDP 增速', value: '5.2%', trend: 'up' },
          { name: 'CPI', value: '0.3%', trend: 'flat' },
          { name: 'PPI', value: '-2.8%', trend: 'down' },
          { name: '失业率', value: '5.1%', trend: 'flat' }
        ],
        theme = 'dark'
      } = options;
      
      const stats = indicators.map(ind => {
        const color = UtilsAdvanced.getTrendColor(ind.trend, 'china');
        const icon = UtilsAdvanced.getTrendIcon(ind.trend);
        return {
          value: `<span style="color: ${color}">${ind.value} ${icon}</span>`,
          label: ind.name
        };
      });
      
      return Templates.statsSlide({
        title,
        stats,
        theme,
        animation: true
      });
    },
    
    // K 线图说明
    klineExplanation(options = {}) {
      const {
        title = 'K 线分析',
        stock = '上证指数',
        period = '日线',
        open = 3280.50,
        high = 3300.25,
        low = 3260.80,
        close = 3250.68,
        volume = 456.78,
        theme = 'dark'
      } = options;
      
      const isRed = close >= open;
      const color = isRed ? '#ff0000' : '#00aa00';
      const change = close - open;
      const changePercent = (change / open) * 100;
      
      const stats = [
        { value: `<span style="color: ${color}">${close.toFixed(2)}</span>`, label: '收盘' },
        { value: open.toFixed(2), label: '开盘' },
        { value: high.toFixed(2), label: '最高' },
        { value: low.toFixed(2), label: '最低' },
        { 
          value: `<span style="color: ${color}">${change > 0 ? '+' : ''}${change.toFixed(2)}</span>`, 
          label: '涨跌' 
        },
        { 
          value: `<span style="color: ${color}">${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%</span>`, 
          label: '幅度' 
        }
      ];
      
      return Templates.statsSlide({
        title: `${stock} (${period})`,
        stats,
        theme,
        animation: true
      });
    }
  },
  
  /**
   * 图表幻灯片
   */
  charts: {
    // 柱状图
    barChart(options = {}) {
      const {
        title = '数据对比',
        labels = ['A', 'B', 'C', 'D'],
        data = [10, 20, 30, 40],
        description = '',
        theme = 'dark'
      } = options;
      
      return Templates.chartSlide({
        title,
        chartId: 'bar-chart',
        chartType: 'bar',
        chartData: { labels, data },
        description,
        theme,
        animation: true
      });
    },
    
    // 折线图
    lineChart(options = {}) {
      const {
        title = '趋势分析',
        labels = ['1 月', '2 月', '3 月', '4 月'],
        data = [100, 120, 110, 150],
        description = '',
        theme = 'dark'
      } = options;
      
      return Templates.chartSlide({
        title,
        chartId: 'line-chart',
        chartType: 'line',
        chartData: { labels, data },
        description,
        theme,
        animation: true
      });
    },
    
    // 饼图
    pieChart(options = {}) {
      const {
        title = '占比分析',
        labels = ['A', 'B', 'C'],
        data = [30, 40, 30],
        description = '',
        theme = 'dark'
      } = options;
      
      return Templates.chartSlide({
        title,
        chartId: 'pie-chart',
        chartType: 'pie',
        chartData: { labels, data },
        description,
        theme,
        animation: true
      });
    }
  },
  
  /**
   * 特殊场景
   */
  special: {
    // 引言/名人名言
    quote(options = {}) {
      const {
        quote = '这是一句名言',
        author = '名人',
        theme = 'dark'
      } = options;
      
      return Templates.quoteSlide({
        quote,
        author,
        theme,
        animation: true
      });
    },
    
    // 章节过渡
    section(options = {}) {
      const {
        number = '01',
        title = '第一部分',
        description = '',
        theme = 'dark'
      } = options;
      
      return Templates.sectionSlide({
        sectionNumber: number,
        sectionTitle: title,
        sectionDesc: description,
        theme,
        animation: true
      });
    },
    
    // 总结
    summary(options = {}) {
      const {
        title = '总结',
        points = ['要点 1', '要点 2', '要点 3'],
        callToAction = '',
        theme = 'dark'
      } = options;
      
      return Templates.conclusionSlide({
        title,
        points,
        callToAction,
        theme,
        animation: true
      });
    },
    
    // 结束页
    end(options = {}) {
      const {
        text = '谢谢观看',
        subtext = '欢迎提问',
        contact = '',
        theme = 'dark'
      } = options;
      
      return Templates.endSlide({
        text,
        subtext,
        contact,
        theme,
        animation: true
      });
    },
    
    // Q&A
    qa(options = {}) {
      const {
        title = '问答环节',
        subtitle = '欢迎提问',
        theme = 'dark'
      } = options;
      
      return `
        <div class="slide qa-slide" style="background: ${Templates.themes[theme].background};">
          <h2 style="color: ${Templates.themes[theme].primary}; font-size: 4rem; margin-bottom: 30px;">${title}</h2>
          <p style="color: ${Templates.themes[theme].textMuted}; font-size: 2rem;">${subtitle}</p>
        </div>
      `;
    }
  },
  
  /**
   * 快速生成完整演示文稿
   */
  generatePresentation(structure) {
    const slides = [];
    
    structure.forEach(section => {
      switch (section.type) {
        case 'cover':
          slides.push(this.cover.business(section.options));
          break;
        case 'section':
          slides.push(this.special.section(section.options));
          break;
        case 'content':
          slides.push(this.content.bulletPoints(section.options));
          break;
        case 'stats':
          slides.push(this.content.stats(section.options));
          break;
        case 'chart':
          slides.push(this.charts.barChart(section.options));
          break;
        case 'comparison':
          slides.push(this.content.comparison(section.options));
          break;
        case 'timeline':
          slides.push(this.content.timeline(section.options));
          break;
        case 'quote':
          slides.push(this.special.quote(section.options));
          break;
        case 'summary':
          slides.push(this.special.summary(section.options));
          break;
        case 'end':
          slides.push(this.special.end(section.options));
          break;
        default:
          console.warn('Unknown section type:', section.type);
      }
    });
    
    return slides.join('\n');
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuickSlides;
}
