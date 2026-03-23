/**
 * 高级工具函数库
 * 补充常用的高级功能
 */

const UtilsAdvanced = {
  // ==================== 文本处理增强 ====================
  
  /**
   * 智能文本截断 (按语义)
   */
  smartTruncate(text, maxLength = 100, options = {}) {
    const {
      suffix = '...',
      keepWords = true,
      keepSentence = true
    } = options;
    
    if (text.length <= maxLength) return text;
    
    let truncated = text.substring(0, maxLength - suffix.length);
    
    // 保持单词完整
    if (keepWords && !/[\u4e00-\u9fa5]/.test(truncated.slice(-1))) {
      truncated = truncated.replace(/\s+\S+$/, '');
    }
    
    // 保持句子完整
    if (keepSentence) {
      const lastPunctuation = /[。！？.!?]$/.exec(truncated);
      if (!lastPunctuation) {
        const lastMatch = /[。！？.!?]/.exec(truncated);
        if (lastMatch) {
          truncated = truncated.substring(0, lastMatch.index + 1);
        }
      }
    }
    
    return truncated.trim() + suffix;
  },
  
  /**
   * 文本高亮关键词
   */
  highlightKeywords(text, keywords, className = 'highlight') {
    if (!keywords || keywords.length === 0) return text;
    
    const pattern = new RegExp(
      `(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );
    
    return text.replace(pattern, `<span class="${className}">$1</span>`);
  },
  
  /**
   * 提取文本中的数字
   */
  extractNumbers(text) {
    const matches = text.match(/-?\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  },
  
  /**
   * 提取文本中的百分比
   */
  extractPercentages(text) {
    const matches = text.match(/-?\d+(\.\d+)?%/g);
    return matches ? matches.map(m => parseFloat(m) / 100) : [];
  },
  
  /**
   * 提取文本中的日期
   */
  extractDates(text) {
    const patterns = [
      /\d{4}[-/年]\d{1,2}[-/月]\d{1,2}[日号]?/g,
      /\d{1,2}[-/月]\d{1,2}[日号]?/g,
      /20\d{2}年/g,
      /今年 | 明年 | 去年/g
    ];
    
    const dates = [];
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) dates.push(...matches);
    });
    
    return [...new Set(dates)];
  },
  
  /**
   * 文本转语音友好格式
   */
  toSpeechFriendly(text) {
    return text
      .replace(/(\d+)\%/, '$1 百分之')
      .replace(/(\d+\.\d+)/g, (match) => {
        return match.replace(/\./g, '点');
      })
      .replace(/([a-zA-Z]+)/g, (match) => {
        return match.split('').join(' ');
      })
      .replace(/\$/g, '美元')
      .replace(/¥|人民币/g, '元')
      .replace(/GDP/g, '国内生产总值')
      .replace(/CPI/g, '消费者物价指数')
      .replace(/PPI/g, '生产者物价指数');
  },
  
  /**
   * 生成文本摘要
   */
  summarize(text, maxLength = 200) {
    const sentences = text.split(/[。！？.!?]/).filter(s => s.trim());
    
    if (sentences.length === 0) return text;
    
    // 取第一句和包含关键词的句子
    const summary = [sentences[0]];
    let currentLength = sentences[0].length;
    
    for (let i = 1; i < sentences.length && currentLength < maxLength; i++) {
      summary.push(sentences[i]);
      currentLength += sentences[i].length;
    }
    
    return summary.join('。') + '。';
  },
  
  // ==================== 数据可视化增强 ====================
  
  /**
   * 生成图表颜色方案
   */
  generateChartColors(count, scheme = 'default') {
    const schemes = {
      default: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'],
      pastel: ['#ffb3ba', '#bae1ff', '#baffc9', '#ffffba', '#ffdfba', '#e2f0cb', '#ffd3ba', '#d4a5a5'],
      vibrant: ['#ff006e', '#8338ec', '#3a86ff', '#06d6a0', '#ffd166', '#ef476f', '#118ab2', '#073b4c'],
      monochrome: ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'],
      financial: ['#dc3545', '#28a745', '#007bff', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997']
    };
    
    const colors = schemes[scheme] || schemes.default;
    const result = [];
    
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }
    
    return result;
  },
  
  /**
   * 格式化图表数据
   */
  formatChartData(data, options = {}) {
    const {
      prefix = '',
      suffix = '',
      decimals = 0,
      multiply = 1
    } = options;
    
    return data.map(item => {
      if (typeof item === 'number') {
        const value = (item * multiply).toFixed(decimals);
        return `${prefix}${value}${suffix}`;
      }
      return item;
    });
  },
  
  /**
   * 计算趋势方向
   */
  calculateTrend(data) {
    if (data.length < 2) return 'flat';
    
    const first = data[0];
    const last = data[data.length - 1];
    const change = ((last - first) / first) * 100;
    
    if (change > 2) return 'up';
    if (change < -2) return 'down';
    return 'flat';
  },
  
  /**
   * 生成趋势图标
   */
  getTrendIcon(trend) {
    const icons = {
      up: '↑',
      down: '↓',
      flat: '→'
    };
    return icons[trend] || icons.flat;
  },
  
  /**
   * 生成趋势颜色
   */
  getTrendColor(trend, mode = 'china') {
    const colors = {
      china: { up: '#ff0000', down: '#00aa00', flat: '#999999' },
      global: { up: '#00aa00', down: '#ff0000', flat: '#999999' }
    };
    
    const scheme = colors[mode] || colors.china;
    return scheme[trend] || scheme.flat;
  },
  
  // ==================== 响应式设计 ====================
  
  /**
   * 根据屏幕尺寸调整字体
   */
  responsiveFontSize(baseSize, containerWidth = 1920) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const ratio = screenWidth / containerWidth;
    return `${baseSize * ratio}px`;
  },
  
  /**
   * 响应式布局类
   */
  getResponsiveClass(baseClass) {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    if (width >= 1920) return `${baseClass}-xl`;
    if (width >= 1280) return `${baseClass}-lg`;
    if (width >= 768) return `${baseClass}-md`;
    return `${baseClass}-sm`;
  },
  
  // ==================== 文件与下载 ====================
  
  /**
   * 下载图片
   */
  downloadImage(canvas, filename = 'slide.png', format = 'image/png', quality = 1.0) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL(format, quality);
    link.click();
  },
  
  /**
   * 下载文本文件
   */
  downloadText(content, filename = 'output.txt', type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },
  
  /**
   * 下载 JSON
   */
  downloadJSON(data, filename = 'data.json') {
    const content = JSON.stringify(data, null, 2);
    this.downloadText(content, filename, 'application/json');
  },
  
  /**
   * 读取 JSON 文件
   */
  readJSONFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target.result));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },
  
  // ==================== 性能优化 ====================
  
  /**
   * 图片懒加载
   */
  lazyLoadImages(container = document) {
    const images = container.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  },
  
  /**
   * 虚拟滚动 (大数据列表)
   */
  virtualScroll(listElement, items, options = {}) {
    const {
      itemHeight = 50,
      containerHeight = 600,
      renderItem
    } = options;
    
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    let startIndex = 0;
    
    const render = () => {
      listElement.innerHTML = '';
      const fragment = document.createDocumentFragment();
      
      for (let i = startIndex; i < Math.min(startIndex + visibleCount + 5, items.length); i++) {
        const item = document.createElement('div');
        item.style.height = `${itemHeight}px`;
        item.innerHTML = renderItem(items[i], i);
        fragment.appendChild(item);
      }
      
      listElement.appendChild(fragment);
    };
    
    listElement.addEventListener('scroll', () => {
      startIndex = Math.floor(listElement.scrollTop / itemHeight);
      requestAnimationFrame(render);
    });
    
    render();
  },
  
  // ==================== 本地存储 ====================
  
  /**
   * 安全存储数据
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.warn('Storage get error:', error);
        return defaultValue;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn('Storage set error:', error);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.warn('Storage remove error:', error);
        return false;
      }
    },
    
    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.warn('Storage clear error:', error);
        return false;
      }
    },
    
    // 带过期时间的存储
    setWithExpiry(key, value, ttl) {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + ttl
      };
      return this.set(key, item);
    },
    
    getWithExpiry(key) {
      const item = this.get(key);
      if (!item) return null;
      
      if (item.expiry && new Date().getTime() > item.expiry) {
        this.remove(key);
        return null;
      }
      
      return item.value;
    }
  },
  
  // ==================== 事件工具 ====================
  
  /**
   * 事件总线
   */
  createEventBus() {
    const events = {};
    
    return {
      on(event, callback) {
        if (!events[event]) {
          events[event] = [];
        }
        events[event].push(callback);
        return () => this.off(event, callback);
      },
      
      off(event, callback) {
        if (!events[event]) return;
        events[event] = events[event].filter(cb => cb !== callback);
      },
      
      emit(event, ...args) {
        if (!events[event]) return;
        events[event].forEach(callback => callback(...args));
      },
      
      once(event, callback) {
        const wrapper = (...args) => {
          this.off(event, wrapper);
          callback(...args);
        };
        return this.on(event, wrapper);
      }
    };
  },
  
  // ==================== 媒体查询 ====================
  
  /**
   * 监听窗口大小变化
   */
  onResize(callback, delay = 250) {
    let timeout;
    const handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(window.innerWidth, window.innerHeight), delay);
    };
    
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  },
  
  /**
   * 检测设备类型
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  isTablet() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  },
  
  isDesktop() {
    return !this.isMobile() && !this.isTablet();
  },
  
  // ==================== 动画辅助 ====================
  
  /**
   * 缓动函数
   */
  easing: {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInQuint: t => t * t * t * t * t,
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  },
  
  /**
   * 动画帧循环
   */
  animate(duration, easing, callback) {
    const start = performance.now();
    
    const loop = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easing(progress);
      
      callback(eased, progress, elapsed);
      
      if (progress < 1) {
        requestAnimationFrame(loop);
      }
    };
    
    requestAnimationFrame(loop);
  },
  
  // ==================== 视频/音频工具 ====================
  
  /**
   * 格式化视频时长
   */
  formatVideoDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
  },
  
  /**
   * 计算视频文件大小估算
   */
  estimateVideoSize(durationSeconds, bitrate = '5000k') {
    const bitrateMbps = parseFloat(bitrate) / 8;
    const audioBitrate = 0.25; // Mbps
    const totalBitrate = bitrateMbps + audioBitrate;
    const sizeMB = (totalBitrate * durationSeconds) / 8;
    return sizeMB.toFixed(2);
  },
  
  /**
   * 获取视频元数据
   */
  getVideoMetadata(videoElement) {
    return {
      duration: videoElement.duration,
      width: videoElement.videoWidth,
      height: videoElement.videoHeight,
      aspectRatio: videoElement.videoWidth / videoElement.videoHeight
    };
  },
  
  /**
   * 生成视频缩略图
   */
  generateVideoThumbnail(videoUrl, time = 0) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      video.currentTime = time;
      
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      });
      
      video.addEventListener('error', reject);
    });
  },
  
  // ==================== 调试工具 ====================
  
  /**
   * 性能计时器
   */
  timer(label = 'Timer') {
    const start = performance.now();
    return {
      end: () => {
        const end = performance.now();
        console.log(`⏱️  ${label}: ${(end - start).toFixed(2)}ms`);
        return end - start;
      }
    };
  },
  
  /**
   * 内存使用监控
   */
  monitorMemory(callback, interval = 5000) {
    if (!performance.memory) {
      console.warn('Memory API not supported');
      return () => {};
    }
    
    const id = setInterval(() => {
      const memory = performance.memory;
      callback({
        usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2),
        totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2),
        jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2)
      });
    }, interval);
    
    return () => clearInterval(id);
  },
  
  /**
   * 错误监控
   */
  onError(callback) {
    window.addEventListener('error', (event) => {
      callback({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      callback({
        message: 'Unhandled Promise Rejection',
        reason: event.reason
      });
    });
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UtilsAdvanced;
}
