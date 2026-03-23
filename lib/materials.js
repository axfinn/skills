/**
 * 素材管理工具库
 * 提供视频、音频、图片等素材的管理和使用
 */

const Materials = {
  // ==================== 素材网站资源 ====================
  
  /**
   * 免费可商用素材网站
   */
  resources: {
    // 视频素材
    video: [
      {
        name: 'Pexels Videos',
        url: 'https://www.pexels.com/videos/',
        desc: '免费高质量股票视频',
        commercial: true,
        attribution: false
      },
      {
        name: 'Pixabay Videos',
        url: 'https://pixabay.com/videos/',
        desc: '免费视频和动画片段',
        commercial: true,
        attribution: false
      },
      {
        name: 'Mixkit',
        url: 'https://mixkit.co/free-stock-video/',
        desc: '免费股票视频和转场',
        commercial: true,
        attribution: false
      },
      {
        name: 'Coverr',
        url: 'https://coverr.co/',
        desc: '免费背景视频',
        commercial: true,
        attribution: false
      },
      {
        name: 'Videezy',
        url: 'https://www.videezy.com/',
        desc: '免费和付费视频素材',
        commercial: 'mixed',
        attribution: 'required'
      }
    ],
    
    // 图片素材
    image: [
      {
        name: 'Unsplash',
        url: 'https://unsplash.com/',
        desc: '高质量免费图片',
        commercial: true,
        attribution: false
      },
      {
        name: 'Pexels',
        url: 'https://www.pexels.com/',
        desc: '免费股票照片',
        commercial: true,
        attribution: false
      },
      {
        name: 'Pixabay',
        url: 'https://pixabay.com/',
        desc: '免费图片和插画',
        commercial: true,
        attribution: false
      },
      {
        name: 'Burst',
        url: 'https://burst.shopify.com/',
        desc: 'Shopify 免费图片库',
        commercial: true,
        attribution: false
      }
    ],
    
    // 音乐/音效
    audio: [
      {
        name: 'YouTube Audio Library',
        url: 'https://www.youtube.com/audiolibrary/',
        desc: 'YouTube 免费音乐库',
        commercial: true,
        attribution: false
      },
      {
        name: 'Bensound',
        url: 'https://www.bensound.com/',
        desc: '免费背景音乐',
        commercial: 'mixed',
        attribution: 'required'
      },
      {
        name: 'Freesound',
        url: 'https://freesound.org/',
        desc: '免费音效库',
        commercial: 'mixed',
        attribution: 'varies'
      },
      {
        name: 'Mixkit Music',
        url: 'https://mixkit.co/free-stock-music/',
        desc: '免费背景音乐',
        commercial: true,
        attribution: false
      }
    ],
    
    // 图标/插画
    graphics: [
      {
        name: 'unDraw',
        url: 'https://undraw.co/',
        desc: '免费 SVG 插画',
        commercial: true,
        attribution: false
      },
      {
        name: 'Flaticon',
        url: 'https://www.flaticon.com/',
        desc: '免费图标库',
        commercial: 'mixed',
        attribution: 'required'
      },
      {
        name: 'IconFont',
        url: 'https://www.iconfont.cn/',
        desc: '阿里巴巴图标库',
        commercial: true,
        attribution: false
      }
    ]
  },
  
  // ==================== 素材下载工具 ====================
  
  /**
   * 下载视频素材（使用 yt-dlp）
   */
  async downloadVideo(url, options = {}) {
    const {
      outputDir = './downloads',
      format = 'mp4',
      quality = 'best',
      filename = null
    } = options;
    
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    const output = filename 
      ? `${outputDir}/${filename}.%(ext)s`
      : `${outputDir}/%(title)s.%(ext)s`;
    
    try {
      await execAsync(`yt-dlp -f ${format} -o "${output}" "${url}"`);
      return { success: true, path: output };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  /**
   * 从 Pexels 下载视频
   */
  async downloadFromPexels(searchQuery, options = {}) {
    const {
      limit = 5,
      quality = 'hd',
      orientation = 'landscape'
    } = options;
    
    // Pexels API 需要 API key
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
      console.warn('需要设置 PEXELS_API_KEY 环境变量');
      return [];
    }
    
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(searchQuery)}&per_page=${limit}`,
      {
        headers: { 'Authorization': apiKey }
      }
    );
    
    const data = await response.json();
    return data.videos.map(video => ({
      id: video.id,
      title: video.title,
      duration: video.duration,
      thumbnail: video.image,
      downloadUrl: video.video_files.find(f => f.quality === quality)?.link
    }));
  },
  
  /**
   * 从 Unsplash 下载图片
   */
  async downloadFromUnsplash(searchQuery, options = {}) {
    const {
      limit = 10,
      orientation = 'landscape',
      width = 1920,
      height = 1080
    } = options;
    
    const apiKey = process.env.UNSPLASH_API_KEY;
    if (!apiKey) {
      console.warn('需要设置 UNSPLASH_API_KEY 环境变量');
      return [];
    }
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${limit}&orientation=${orientation}`,
      {
        headers: { 'Authorization': `Client-ID ${apiKey}` }
      }
    );
    
    const data = await response.json();
    return data.results.map(photo => ({
      id: photo.id,
      title: photo.alt_description,
      photographer: photo.user.name,
      downloadUrl: photo.urls.regular,
      fullUrl: `${photo.urls.raw}&w=${width}&h=${height}`
    }));
  },
  
  // ==================== 素材管理 ====================
  
  /**
   * 素材库分类
   */
  categories: {
    // 财经类素材
    financial: [
      'stock market', '股市', 'k line', 'candlestick',
      'money', 'currency', 'bitcoin', 'cryptocurrency',
      'bank', 'finance', 'trading', 'investment',
      'chart', 'graph', 'data visualization',
      'business', 'office', 'meeting', 'presentation'
    ],
    
    // 科技类素材
    tech: [
      'technology', 'computer', 'code', 'programming',
      'ai', 'artificial intelligence', 'robot',
      'data', 'server', 'cloud', 'network',
      'smartphone', 'mobile', 'digital',
      'futuristic', 'cyber', 'hologram'
    ],
    
    // 自然类素材
    nature: [
      'nature', 'landscape', 'mountain', 'ocean',
      'forest', 'tree', 'flower', 'garden',
      'sky', 'cloud', 'sunset', 'sunrise',
      'water', 'river', 'lake', 'beach'
    ],
    
    // 城市类素材
    city: [
      'city', 'urban', 'building', 'skyscraper',
      'street', 'traffic', 'night', 'downtown',
      'architecture', 'bridge', 'park', 'square'
    ],
    
    // 人物类素材
    people: [
      'people', 'business man', 'business woman',
      'team', 'meeting', 'handshake', 'presentation',
      'working', 'office', 'professional'
    ],
    
    // 转场特效
    transitions: [
      'abstract', 'particle', 'light', 'gradient',
      'blur', 'bokeh', 'geometric', 'pattern'
    ]
  },
  
  /**
   * 根据场景推荐素材关键词
   */
  getKeywordsForScene(scene) {
    const sceneKeywords = {
      'market_overview': ['stock market', 'trading floor', 'financial chart', 'bull bear'],
      'economic_data': ['data visualization', 'chart', 'graph', 'statistics'],
      'company_report': ['office building', 'corporate', 'business meeting', 'logo'],
      'tech_analysis': ['technology', 'computer', 'code', 'digital'],
      'conclusion': ['handshake', 'success', 'team', 'celebration']
    };
    
    return sceneKeywords[scene] || [];
  },
  
  // ==================== 素材处理工具 ====================
  
  /**
   * 裁剪视频
   */
  async cropVideo(inputFile, outputFile, options = {}) {
    const {
      startTime = '00:00:00',
      duration = '00:00:10',
      width = 1920,
      height = 1080
    } = options;
    
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      await execAsync(
        `ffmpeg -i "${inputFile}" -ss ${startTime} -t ${duration} ` +
        `-vf "scale=${width}:${height}" -c:v libx264 -c:a aac "${outputFile}"`
      );
      return { success: true, path: outputFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  /**
   * 调整视频大小
   */
  async resizeVideo(inputFile, outputFile, width = 1920, height = 1080) {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      await execAsync(
        `ffmpeg -i "${inputFile}" -vf "scale=${width}:${height}" ` +
        `-c:v libx264 -c:a aac "${outputFile}"`
      );
      return { success: true, path: outputFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  /**
   * 视频转 GIF
   */
  async videoToGif(inputFile, outputFile, options = {}) {
    const {
      startTime = '00:00:00',
      duration = '00:00:05',
      width = 480,
      fps = 10
    } = options;
    
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      await execAsync(
        `ffmpeg -i "${inputFile}" -ss ${startTime} -t ${duration} ` +
        `-vf "fps=${fps},scale=${width}:-1:flags=lanczos" "${outputFile}"`
      );
      return { success: true, path: outputFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  /**
   * 提取视频帧
   */
  async extractFrames(inputFile, outputDir, options = {}) {
    const {
      interval = 1,  // 每隔多少秒提取一帧
      format = 'png',
      quality = 2
    } = options;
    
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    const outputPattern = `${outputDir}/frame_%03d.${format}`;
    
    try {
      await execAsync(
        `ffmpeg -i "${inputFile}" -vf "fps=1/${interval}" -q:v ${quality} "${outputPattern}"`
      );
      return { success: true, path: outputPattern };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  /**
   * 生成缩略图
   */
  async generateThumbnail(videoFile, outputFile, time = '00:00:01') {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    try {
      await execAsync(
        `ffmpeg -i "${videoFile}" -ss ${time} -vframes 1 ` +
        `-vf "scale=320:180" "${outputFile}"`
      );
      return { success: true, path: outputFile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // ==================== 素材使用建议 ====================
  
  /**
   * 根据内容类型推荐素材
   */
  recommendMaterials(contentType) {
    const recommendations = {
      '财经新闻': {
        video: ['stock market', 'trading', 'financial district'],
        image: ['chart', 'graph', 'money'],
        music: ['corporate', 'upbeat', 'professional']
      },
      '科技评测': {
        video: ['technology', 'computer', 'gadget'],
        image: ['circuit', 'chip', 'digital'],
        music: ['electronic', 'modern', 'tech']
      },
      '旅游视频': {
        video: ['landscape', 'travel', 'nature'],
        image: ['destination', 'landmark', 'scenic'],
        music: ['ambient', 'relaxing', 'world']
      },
      '教育课程': {
        video: ['classroom', 'teacher', 'student'],
        image: ['book', 'education', 'learning'],
        music: ['calm', 'focus', 'inspirational']
      }
    };
    
    return recommendations[contentType] || {};
  },
  
  /**
   * 素材使用最佳实践
   */
  bestPractices: {
    video: [
      '使用 1080p 或更高分辨率',
      '保持视频片段简短（5-15 秒）',
      '选择与内容情绪匹配的素材',
      '避免过度使用转场特效',
      '注意版权和授权'
    ],
    image: [
      '使用高质量图片（至少 1920x1080）',
      '保持风格一致性',
      '适当压缩以减小文件大小',
      '添加文字时确保对比度',
      '优先选择免版税图片'
    ],
    music: [
      '音量不要盖过旁白',
      '选择与内容情绪匹配的音乐',
      '注意音乐的节奏变化',
      '使用淡入淡出效果',
      '确保有商业使用授权'
    ]
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Materials;
}
