/**
 * 幻灯片模板库
 * 提供多种风格的幻灯片模板
 */

const Templates = {
  // 主题配置
  themes: {
    dark: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      primary: '#ff6b6b',
      secondary: '#feca57',
      accent: '#48dbfb',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.7)'
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      primary: '#ffffff',
      secondary: '#feca57',
      accent: '#00d9ff',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.8)'
    },
    minimal: {
      background: '#ffffff',
      primary: '#2d3436',
      secondary: '#636e72',
      accent: '#0984e3',
      text: '#2d3436',
      textMuted: '#636e72'
    },
    tech: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      primary: '#00d9ff',
      secondary: '#7b2cbf',
      accent: '#00ff88',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.7)'
    },
    nature: {
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      primary: '#ffffff',
      secondary: '#feca57',
      accent: '#00d9ff',
      text: '#ffffff',
      textMuted: 'rgba(255,255,255,0.8)'
    }
  },

  /**
   * 创建封面幻灯片
   */
  titleSlide(options = {}) {
    const {
      title = '标题',
      subtitle = '副标题',
      author = '',
      date = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    const animClass = animation ? 'animate-in' : '';
    
    return `
      <div class="slide title-slide" style="background: ${colors.background};">
        ${animation ? '<div class="particle-bg"></div>' : ''}
        <h1 class="main-title ${animClass}" style="color: ${colors.primary};">${title}</h1>
        <p class="subtitle ${animClass}" style="color: ${colors.accent};">${subtitle}</p>
        ${author || date ? `
          <div class="author-info ${animClass}" style="color: ${colors.textMuted};">
            ${author ? `<span>${author}</span>` : ''}
            ${author && date ? ' | ' : ''}
            ${date ? `<span>${date}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * 创建章节过渡幻灯片
   */
  sectionSlide(options = {}) {
    const {
      sectionNumber = '01',
      sectionTitle = '章节标题',
      sectionDesc = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    return `
      <div class="slide section-slide" style="background: ${colors.background};">
        <div class="section-number" style="color: ${colors.textMuted}; opacity: 0.3; font-size: 8rem; font-weight: bold;">${sectionNumber}</div>
        <h2 class="section-title" style="color: ${colors.primary};">${sectionTitle}</h2>
        ${sectionDesc ? `<p class="section-desc" style="color: ${colors.textMuted};">${sectionDesc}</p>` : ''}
      </div>
    `;
  },

  /**
   * 创建内容列表幻灯片
   */
  contentSlide(options = {}) {
    const {
      title = '标题',
      items = [],
      theme = 'dark',
      highlightIndex = -1,
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    const listItems = items.map((item, index) => {
      const isHighlighted = index === highlightIndex;
      const delay = animation ? `style="animation-delay: ${index * 0.2}s"` : '';
      const highlightStyle = isHighlighted ? `background: rgba(${hexToRgb(colors.primary)}, 0.2); border-left: 4px solid ${colors.primary}; padding-left: 20px;` : '';
      
      return `<li class="list-item animate-in" ${delay} style="${highlightStyle}">${item}</li>`;
    }).join('\n');
    
    return `
      <div class="slide content-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <ul class="content-list">
          ${listItems}
        </ul>
      </div>
    `;
  },

  /**
   * 创建图表幻灯片
   */
  chartSlide(options = {}) {
    const {
      title = '数据图表',
      chartId = 'chart-1',
      chartType = 'bar',
      chartData = {},
      description = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    return `
      <div class="slide chart-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <div class="chart-container" style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px;">
          ${description ? `<p class="chart-desc" style="color: ${colors.textMuted}; margin-bottom: 20px;">${description}</p>` : ''}
          <canvas id="${chartId}"></canvas>
        </div>
      </div>
    `;
  },

  /**
   * 创建统计数据幻灯片
   */
  statsSlide(options = {}) {
    const {
      title = '数据统计',
      stats = [],
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    const statCards = stats.map((stat, index) => {
      const delay = animation ? `style="animation-delay: ${index * 0.2}s"` : '';
      return `
        <div class="stat-card animate-in" ${delay} style="background: linear-gradient(135deg, ${colors.accent}22, ${colors.accent}11); border: 1px solid ${colors.accent}44;">
          <div class="stat-value" style="color: ${colors.primary}; font-size: 2.5rem; font-weight: bold;">${stat.value}</div>
          <div class="stat-label" style="color: ${colors.textMuted};">${stat.label}</div>
        </div>
      `;
    }).join('\n');
    
    return `
      <div class="slide stats-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <div class="stat-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
          ${statCards}
        </div>
      </div>
    `;
  },

  /**
   * 创建时间轴幻灯片
   */
  timelineSlide(options = {}) {
    const {
      title = '时间线',
      events = [],
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    const timelineItems = events.map((event, index) => {
      const delay = animation ? `style="animation-delay: ${index * 0.3}s"` : '';
      return `
        <div class="timeline-item animate-in" ${delay} style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 20px; margin: 10px; min-width: 200px;">
          <div class="timeline-date" style="color: ${colors.secondary}; font-weight: bold;">${event.date}</div>
          <div class="timeline-event" style="color: ${colors.text}; margin-top: 10px;">${event.event}</div>
        </div>
      `;
    }).join('\n');
    
    return `
      <div class="slide timeline-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <div class="timeline" style="display: flex; justify-content: space-around; margin: 40px 0; flex-wrap: wrap;">
          ${timelineItems}
        </div>
      </div>
    `;
  },

  /**
   * 创建引用/重点幻灯片
   */
  quoteSlide(options = {}) {
    const {
      quote = '',
      author = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    return `
      <div class="slide quote-slide" style="background: ${colors.background};">
        <div class="quote-box" style="background: linear-gradient(135deg, ${colors.primary}22, ${colors.primary}11); border: 2px solid ${colors.primary}; border-radius: 20px; padding: 60px; text-align: center;">
          <div class="quote-icon" style="font-size: 4rem; color: ${colors.primary}; margin-bottom: 20px;">"</div>
          <p class="quote-text" style="font-size: 2rem; color: ${colors.text}; line-height: 1.8; font-style: italic;">${quote}</p>
          ${author ? `<p class="quote-author" style="color: ${colors.accent}; margin-top: 30px; font-size: 1.2rem;">— ${author}</p>` : ''}
        </div>
      </div>
    `;
  },

  /**
   * 创建对比幻灯片
   */
  comparisonSlide(options = {}) {
    const {
      title = '对比分析',
      left = { title: '方案 A', items: [] },
      right = { title: '方案 B', items: [] },
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    const leftItems = left.items.map(item => `<li style="color: ${colors.text};">${item}</li>`).join('\n');
    const rightItems = right.items.map(item => `<li style="color: ${colors.text};">${item}</li>`).join('\n');
    
    return `
      <div class="slide comparison-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px;">
          <div class="comparison-left" style="background: rgba(${hexToRgb(colors.primary)}, 0.1); border-radius: 15px; padding: 30px;">
            <h4 style="color: ${colors.primary}; font-size: 1.5rem; margin-bottom: 20px;">${left.title}</h4>
            <ul style="list-style: none; padding: 0;">
              ${leftItems}
            </ul>
          </div>
          <div class="comparison-right" style="background: rgba(${hexToRgb(colors.accent)}, 0.1); border-radius: 15px; padding: 30px;">
            <h4 style="color: ${colors.accent}; font-size: 1.5rem; margin-bottom: 20px;">${right.title}</h4>
            <ul style="list-style: none; padding: 0;">
              ${rightItems}
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 创建结尾幻灯片
   */
  conclusionSlide(options = {}) {
    const {
      title = '总结',
      points = [],
      callToAction = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    const conclusionPoints = points.map((point, index) => {
      const delay = animation ? `style="animation-delay: ${index * 0.2}s"` : '';
      return `<li class="animate-in" ${delay} style="color: ${colors.text}; font-size: 1.3rem; line-height: 2;">${point}</li>`;
    }).join('\n');
    
    return `
      <div class="slide conclusion-slide" style="background: ${colors.background};">
        <h3 class="slide-title" style="color: ${colors.primary};">${title}</h3>
        <div class="conclusion-box" style="background: linear-gradient(135deg, ${colors.secondary}22, ${colors.secondary}11); border-radius: 20px; padding: 40px; margin-top: 30px;">
          <ul style="list-style: none; padding: 0;">
            ${conclusionPoints}
          </ul>
          ${callToAction ? `
            <div class="call-to-action" style="margin-top: 30px; padding: 20px; background: ${colors.primary}; border-radius: 10px; text-align: center; color: #fff; font-size: 1.2rem; font-weight: bold;">
              ${callToAction}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  /**
   * 创建结束幻灯片
   */
  endSlide(options = {}) {
    const {
      text = '谢谢观看',
      subtext = '',
      contact = '',
      theme = 'dark',
      animation = true
    } = options;
    
    const colors = this.themes[theme] || this.themes.dark;
    
    return `
      <div class="slide end-slide" style="background: ${colors.background};">
        <h2 class="end-title" style="color: ${colors.primary}; font-size: 4rem; margin-bottom: 20px;">${text}</h2>
        ${subtext ? `<p class="end-subtext" style="color: ${colors.textMuted}; font-size: 1.5rem;">${subtext}</p>` : ''}
        ${contact ? `<p class="contact" style="color: ${colors.accent}; margin-top: 40px; font-size: 1.2rem;">${contact}</p>` : ''}
      </div>
    `;
  }
};

// 辅助函数
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Templates;
}
