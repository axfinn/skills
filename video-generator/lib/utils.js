/**
 * 工具函数库
 * 提供常用的辅助函数
 * 
 * 分类:
 * - 文本处理
 * - 数字格式化
 * - 日期时间
 * - 颜色处理
 * - 数据计算
 * - 异步工具
 * - DOM 操作
 * - 视频/音频工具
 */

const Utils = {
  /**
   * 计算文本朗读时长（秒）
   * @param {string} text - 文本内容
   * @param {number} speed - 语速（字/分钟），默认 220
   */
  calculateDuration(text, speed = 220) {
    const charCount = text.length;
    // 中文按字符数计算，英文按单词数
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    
    // 估算总字数
    const totalWords = chineseChars + englishWords * 1.5;
    
    // 计算时长（秒）
    const duration = (totalWords / speed) * 60;
    
    // 添加缓冲时间
    return Math.max(duration + 1, 3);
  },

  /**
   * 生成渐变 CSS
   */
  generateGradient(colors, direction = '135deg') {
    return `linear-gradient(${direction}, ${colors.join(', ')})`;
  },

  /**
   * 颜色混合
   */
  blendColors(color1, color2, ratio = 0.5) {
    const hex2rgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };
    
    const rgb1 = hex2rgb(color1);
    const rgb2 = hex2rgb(color2);
    
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  },

  /**
   * 格式化数字（添加千位分隔符）
   */
  formatNumber(num, decimals = 0) {
    return Number(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * 格式化大数字（万、亿）
   */
  formatLargeNumber(num) {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(2) + '亿';
    } else if (num >= 10000) {
      return (num / 10000).toFixed(2) + '万';
    }
    return this.formatNumber(num);
  },

  /**
   * 格式化百分比
   */
  formatPercentage(value, decimals = 1) {
    const num = Number(value) * 100;
    return num.toFixed(decimals) + '%';
  },

  /**
   * 格式化日期
   */
  formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes);
  },

  /**
   * 截断文本（添加省略号）
   */
  truncate(text, maxLength = 100, suffix = '...') {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  },

  /**
   * 文本分段（按指定长度）
   */
  splitText(text, maxLength = 50) {
    const segments = [];
    let current = '';
    
    for (let i = 0; i < text.length; i++) {
      current += text[i];
      if (current.length >= maxLength || (text[i] === '。' || text[i] === '！' || text[i] === '？')) {
        segments.push(current.trim());
        current = '';
      }
    }
    
    if (current.trim()) {
      segments.push(current.trim());
    }
    
    return segments;
  },

  /**
   * 生成随机颜色
   */
  randomColor(saturation = 70, lightness = 60) {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  },

  /**
   * 生成配色方案
   */
  generateColorPalette(baseColor) {
    // 简单的配色方案生成
    return {
      primary: baseColor,
      secondary: this.blendColors(baseColor, '#000000', 0.3),
      accent: this.blendColors(baseColor, '#ffffff', 0.2),
      background: this.blendColors(baseColor, '#ffffff', 0.95),
      text: '#333333'
    };
  },

  /**
   * 计算数组平均值
   */
  average(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  },

  /**
   * 计算数组最大值
   */
  max(arr) {
    return Math.max(...arr);
  },

  /**
   * 计算数组最小值
   */
  min(arr) {
    return Math.min(...arr);
  },

  /**
   * 计算变化率
   */
  calculateChangeRate(oldValue, newValue) {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / oldValue) * 100;
  },

  /**
   * 平滑曲线数据生成（用于图表）
   */
  generateSmoothCurve(data, points = 100) {
    // 简单的线性插值
    const result = [];
    const segments = data.length - 1;
    
    for (let i = 0; i < points; i++) {
      const segmentIndex = Math.floor((i / points) * segments);
      const segmentProgress = ((i / points) * segments) - segmentIndex;
      
      const value = data[segmentIndex] + (data[segmentIndex + 1] - data[segmentIndex]) * segmentProgress;
      result.push(value);
    }
    
    return result;
  },

  /**
   * 延迟执行
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * 批量执行（限制并发）
   */
  async batchExecute(tasks, concurrency = 5) {
    const results = [];
    const executing = [];
    
    for (const task of tasks) {
      const p = task().then(result => {
        executing.splice(executing.indexOf(p), 1);
        return result;
      });
      
      results.push(p);
      executing.push(p);
      
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
    
    return Promise.all(results);
  },

  /**
   * 重试执行
   */
  async retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(delay);
      }
    }
  },

  /**
   * 下载文件
   */
  downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  /**
   * 读取文件为 DataURL
   */
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * 防抖函数
   */
  debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  /**
   * 节流函数
   */
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
