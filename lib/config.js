/**
 * 配置管理
 * 集中管理所有配置项
 */

const Config = {
  // 默认配置
  defaults: {
    // 动画配置
    animation: {
      defaultDuration: 0.8,      // 默认动画时长（秒）
      defaultDelay: 0,           // 默认延迟（秒）
      staggerDelay: 0.2,         // 列表项间隔延迟（秒）
      enableAnimations: true     // 是否启用动画
    },
    
    // 幻灯片配置
    slides: {
      width: 1920,               // 幻灯片宽度
      height: 1080,              // 幻灯片高度
      defaultDuration: 5,        // 默认每张幻灯片时长（秒）
      minDuration: 3,            // 最小时长
      maxDuration: 15,           // 最大时长
      transitionDuration: 0.5    // 转场时长
    },
    
    // 主题配置
    theme: {
      default: 'dark',           // 默认主题
      available: ['dark', 'gradient', 'minimal', 'tech', 'nature']
    },
    
    // 字体配置
    fonts: {
      title: "'PingFang SC', 'Microsoft YaHei', sans-serif",
      content: "'PingFang SC', 'Microsoft YaHei', sans-serif",
      numbers: "'DIN Alternate', 'Arial', sans-serif",
      sizes: {
        title: '3rem',
        subtitle: '1.8rem',
        content: '1.3rem',
        small: '1rem'
      }
    },
    
    // TTS 配置
    tts: {
      provider: 'elevenlabs',    // TTS 提供商
      voice: 'Meijia',           // 默认语音
      speed: 1.0,                // 语速倍率
      stability: 0.5,            // 稳定性
      similarity: 0.8,           // 相似度
      style: 0.0,                // 风格
      language: 'zh-CN'          // 语言
    },
    
    // 视频输出配置
    video: {
      format: 'mp4',             // 输出格式
      codec: 'h264',             // 视频编码
      resolution: '1920x1080',   // 分辨率
      fps: 30,                   // 帧率
      bitrate: '5000k',          // 视频比特率
      audioBitrate: '192k',      // 音频比特率
      audioCodec: 'aac'          // 音频编码
    },
    
    // 图表配置
    charts: {
      colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
      lineWidth: 3,
      pointRadius: 5,
      gridColor: 'rgba(255,255,255,0.1)',
      textColor: 'rgba(255,255,255,0.8)',
      fontSize: 14,
      fontFamily: "'PingFang SC', sans-serif"
    },
    
    // 截图配置
    capture: {
      format: 'png',             // 截图格式
      quality: 100,              // 截图质量
      scale: 2,                  // 设备像素比
      fullPage: true,            // 是否截取整页
      waitUntil: 'networkidle0'  // 等待状态
    },
    
    // 日志配置
    logging: {
      enabled: true,             // 是否启用日志
      level: 'info',             // 日志级别：debug, info, warn, error
      showProgress: true         // 是否显示进度
    }
  },
  
  // 运行时配置（可被覆盖）
  runtime: {},
  
  /**
   * 获取配置值
   * @param {string} path - 配置路径，如 'animation.defaultDuration'
   * @param {*} defaultValue - 默认值
   */
  get(path, defaultValue = undefined) {
    const keys = path.split('.');
    let value = this.runtime;
    
    // 优先从 runtime 获取，否则使用 defaults
    if (Object.keys(this.runtime).length === 0) {
      value = this.defaults;
    }
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // 从 defaults 获取
        value = this.defaults;
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return defaultValue !== undefined ? defaultValue : this.deepGet(this.defaults, path);
          }
        }
        return value;
      }
    }
    
    return value;
  },
  
  /**
   * 深度获取对象属性
   */
  deepGet(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  },
  
  /**
   * 设置配置值
   * @param {string} path - 配置路径
   * @param {*} value - 配置值
   */
  set(path, value) {
    const keys = path.split('.');
    let current = this.runtime;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  },
  
  /**
   * 批量设置配置
   * @param {Object} config - 配置对象
   */
  setAll(config) {
    this.merge(config);
  },
  
  /**
   * 合并配置
   */
  merge(config) {
    this.deepMerge(this.runtime, config);
  },
  
  /**
   * 深度合并对象
   */
  deepMerge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          target[key] = target[key] || {};
          this.deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  },
  
  /**
   * 重置配置
   */
  reset() {
    this.runtime = {};
  },
  
  /**
   * 导出当前配置
   */
  export() {
    return {
      ...this.defaults,
      ...this.runtime
    };
  },
  
  /**
   * 从 JSON 导入配置
   */
  import(jsonString) {
    try {
      const config = JSON.parse(jsonString);
      this.merge(config);
      return true;
    } catch (error) {
      console.error('配置导入失败:', error);
      return false;
    }
  },
  
  /**
   * 验证配置
   */
  validate() {
    const errors = [];
    
    // 验证幻灯片尺寸
    if (this.get('slides.width') < 640) {
      errors.push('幻灯片宽度不能小于 640');
    }
    if (this.get('slides.height') < 480) {
      errors.push('幻灯片高度不能小于 480');
    }
    
    // 验证视频配置
    const fps = this.get('video.fps');
    if (fps < 15 || fps > 60) {
      errors.push('视频帧率应在 15-60 之间');
    }
    
    // 验证 TTS 配置
    const speed = this.get('tts.speed');
    if (speed < 0.5 || speed > 2.0) {
      errors.push('TTS 语速应在 0.5-2.0 之间');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },
  
  /**
   * 获取主题颜色
   */
  getThemeColors(themeName) {
    const themes = {
      dark: {
        primary: '#ff6b6b',
        secondary: '#feca57',
        accent: '#48dbfb',
        background: '#1a1a2e',
        text: '#ffffff'
      },
      gradient: {
        primary: '#ffffff',
        secondary: '#feca57',
        accent: '#00d9ff',
        background: '#667eea',
        text: '#ffffff'
      },
      minimal: {
        primary: '#2d3436',
        secondary: '#636e72',
        accent: '#0984e3',
        background: '#ffffff',
        text: '#2d3436'
      },
      tech: {
        primary: '#00d9ff',
        secondary: '#7b2cbf',
        accent: '#00ff88',
        background: '#0f0c29',
        text: '#ffffff'
      },
      nature: {
        primary: '#ffffff',
        secondary: '#feca57',
        accent: '#00d9ff',
        background: '#134e5e',
        text: '#ffffff'
      }
    };
    
    return themes[themeName] || themes.dark;
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Config;
}
