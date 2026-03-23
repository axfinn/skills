/**
 * 素材管理库 v2.0
 * 免费可商用素材资源 + 智能下载管理工具
 */

const Materials = {
  // 免费素材网站
  sources: {
    video: [
      { name: 'Pexels Videos', url: 'https://www.pexels.com/videos/', free: true, attribution: false },
      { name: 'Pixabay Videos', url: 'https://pixabay.com/videos/', free: true, attribution: false },
      { name: 'Mixkit', url: 'https://mixkit.co/free-stock-video/', free: true, attribution: false },
      { name: 'Coverr', url: 'https://coverr.co/', free: true, attribution: false },
      { name: 'Videezy', url: 'https://www.videezy.com/', free: false, attribution: true }
    ],
    image: [
      { name: 'Unsplash', url: 'https://unsplash.com/', free: true, attribution: false },
      { name: 'Pexels Photos', url: 'https://www.pexels.com/', free: true, attribution: false },
      { name: 'Pixabay', url: 'https://pixabay.com/', free: true, attribution: false },
      { name: 'Burst', url: 'https://burst.shopify.com/', free: true, attribution: false }
    ],
    music: [
      { name: 'YouTube Audio Library', url: 'https://www.youtube.com/audiolibrary/', free: true, attribution: false },
      { name: 'Mixkit Music', url: 'https://mixkit.co/free-stock-music/', free: true, attribution: false },
      { name: 'Bensound', url: 'https://www.bensound.com/', free: false, attribution: true }
    ],
    icons: [
      { name: 'unDraw', url: 'https://undraw.co/', free: true, attribution: false },
      { name: 'IconFont', url: 'https://www.iconfont.cn/', free: true, attribution: false }
    ]
  },

  // 主题分类关键词
  categories: {
    financial: [
      'stock market', 'trading floor', 'finance', 'money', 'chart',
      'graph', 'business', 'investment', 'banking', 'currency',
      'k line', 'stock price', 'bull bear', 'wall street'
    ],
    tech: [
      'technology', 'artificial intelligence', 'robot', 'circuit',
      'computer', 'data', 'coding', 'software', 'digital',
      'server', 'chip', 'code', 'algorithm', 'cyber'
    ],
    nature: [
      'nature', 'mountain', 'ocean', 'forest', 'landscape',
      'sky', 'sunset', 'beach', 'river', 'waterfall',
      'sunrise', 'clouds', 'trees'
    ],
    city: [
      'city', 'building', 'architecture', 'street', 'urban',
      'skyscraper', 'downtown', 'night city', 'bridge',
      'traffic', 'office building'
    ],
    business: [
      'business', 'meeting', 'office', 'corporate', 'team',
      'presentation', 'handshake', 'professional', 'suit',
      'work', 'conference'
    ],
    science: [
      'science', 'laboratory', 'research', 'experiment', 'medical',
      'chemistry', 'physics', 'DNA', 'microscope', 'test tube'
    ],
    news: [
      'news', 'journalism', 'camera', 'reporter', 'broadcast',
      'media', 'press', 'communication', 'microphone'
    ],
    novel: [
      'abstract', 'artistic', 'creative', 'fantasy', 'dream',
      'space', 'universe', 'particles', 'light effects', 'nebula',
      'stars', 'galaxy'
    ]
  },

  // 场景推荐素材
  sceneRecommendations: {
    market_overview: {
      video: ['stock market', 'trading floor', 'financial district'],
      image: ['stock chart', 'k line', 'money', 'finance building'],
      keywords: ['stock market', 'trading', 'financial', 'k line']
    },
    economic_data: {
      video: ['data visualization', 'chart animation', 'graph'],
      image: ['chart', 'graph', 'statistics', 'infographic'],
      keywords: ['data visualization', 'chart', 'graph', 'statistics']
    },
    tech_trend: {
      video: ['technology', 'circuit', 'robotics', 'AI'],
      image: ['technology', 'computer', 'digital', 'cyber'],
      keywords: ['technology', 'AI', 'robot', 'digital', 'circuit']
    },
    company_intro: {
      video: ['office', 'corporate', 'business meeting'],
      image: ['office building', 'company logo', 'team'],
      keywords: ['office', 'corporate', 'business', 'professional']
    }
  },

  /**
   * 根据场景获取推荐关键词
   */
  getKeywordsForScene(sceneName) {
    const scene = this.sceneRecommendations[sceneName];
    return scene ? scene.keywords : [];
  },

  /**
   * 推荐素材（按内容类型）
   */
  recommendMaterials(contentType) {
    const recommendations = {
      '财经新闻': {
        video: ['stock market', 'trading', 'financial district', 'chart animation'],
        image: ['chart', 'graph', 'money', 'finance', 'stock'],
        music: ['corporate', 'upbeat', 'professional', 'news']
      },
      '科技评测': {
        video: ['technology', 'computer', 'smartphone', 'gadget'],
        image: ['technology', 'circuit', 'chip', 'digital', 'code'],
        music: ['electronic', 'modern', 'tech', 'energetic']
      },
      '旅游vlog': {
        video: ['travel', 'landscape', 'adventure'],
        image: ['landscape', 'mountain', 'ocean', 'city'],
        music: ['travel', 'adventure', 'uplifting', 'tropical']
      },
      '美食教程': {
        video: ['food', 'cooking', 'kitchen'],
        image: ['food', 'restaurant', 'ingredients'],
        music: ['cooking', 'upbeat', 'warm']
      },
      '小说朗读': {
        video: ['abstract', 'artistic', 'particles'],
        image: ['abstract', 'fantasy', 'creative', 'dream'],
        music: ['ambient', 'calm', 'atmospheric']
      }
    };

    return recommendations[contentType] || recommendations['财经新闻'];
  },

  /**
   * 生成搜索URL
   */
  getSearchUrl(platform, keywords) {
    const query = encodeURIComponent(keywords.join(' '));
    const urls = {
      pexels: `https://www.pexels.com/search/videos/${query}/`,
      unsplash: `https://unsplash.com/s/photos/${query}`,
      pixabay: `https://pixabay.com/videos/search/${query}/`,
      youtube: `https://www.youtube.com/results?search_query=${query}`
    };
    return urls[platform] || urls.pexels;
  },

  /**
   * 下载图片（使用 yt-dlp）
   */
  async downloadImage(url, options = {}) {
    const { outputDir = './downloads', filename = 'image.jpg' } = options;
    
    try {
      // 使用 fetch 下载
      const response = await fetch(url);
      const blob = await response.blob();
      const fs = require('fs');
      const path = require('path');
      
      const outputPath = path.join(outputDir, filename);
      fs.writeFileSync(outputPath, Buffer.from(await blob.arrayBuffer()));
      
      return { success: true, path: outputPath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * 裁剪视频
   */
  async cropVideo(inputFile, outputFile, options = {}) {
    const { startTime = '00:00:00', duration = 10, width = 1920, height = 1080 } = options;
    
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      const command = [
        'ffmpeg', '-y',
        '-i', inputFile,
        '-ss', startTime,
        '-t', duration.toString(),
        '-vf', `scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
        '-c:v', 'libx264',
        '-preset', 'fast',
        outputFile
      ].join(' ');
      
      exec(command, (error, stdout, stderr) => {
        if (error) reject({ success: false, error: stderr });
        else resolve({ success: true, path: outputFile });
      });
    });
  },

  /**
   * 调整视频大小
   */
  async resizeVideo(inputFile, outputFile, width, height) {
    return this.cropVideo(inputFile, outputFile, { width, height, duration: 999, startTime: '00:00:00' });
  },

  /**
   * 视频转GIF
   */
  async videoToGif(inputFile, outputGif, options = {}) {
    const { startTime = '00:00:00', duration = 5, width = 480, fps = 10 } = options;
    
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      const command = [
        'ffmpeg', '-y',
        '-i', inputFile,
        '-ss', startTime,
        '-t', duration.toString(),
        '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-loop', '0',
        outputGif
      ].join(' ');
      
      exec(command, (error) => {
        if (error) reject({ success: false, error });
        else resolve({ success: true, path: outputGif });
      });
    });
  },

  /**
   * 提取视频帧
   */
  async extractFrames(inputFile, outputDir, options = {}) {
    const { interval = 1, format = 'png' } = options;
    
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      const outputPattern = `${outputDir}/frame_%04d.${format}`;
      const command = [
        'ffmpeg', '-y',
        '-i', inputFile,
        '-vf', `fps=1/${interval}`,
        '-q:v', '2',
        outputPattern
      ].join(' ');
      
      exec(command, (error) => {
        if (error) reject({ success: false, error });
        else resolve({ success: true, outputDir });
      });
    });
  },

  /**
   * 生成缩略图
   */
  async generateThumbnail(inputFile, outputThumb, time = '00:00:01') {
    return new Promise((resolve, reject) => {
      const { exec } = require('child_process');
      const command = [
        'ffmpeg', '-y',
        '-i', inputFile,
        '-ss', time,
        '-vframes', '1',
        '-q:v', '2',
        outputThumb
      ].join(' ');
      
      exec(command, (error) => {
        if (error) reject({ success: false, error });
        else resolve({ success: true, path: outputThumb });
      });
    });
  },

  /**
   * 批量下载主题图片
   */
  async downloadThemeImages(theme, count = 20, outputDir = './images') {
    const keywords = this.categories[theme] || this.categories.novel;
    const results = [];
    
    // 使用 Lorem Picsum（基于主题ID）
    const themeIds = {
      financial: [1092678, 1611976, 5703837, 6108813, 6447483],
      tech: [1181263, 838573, 577585, 1181673, 576],

      nature: [1049593, 156601, 15686, 1043844, 1281659],
      city: [3771058, 1457187, 1453633, 373633, 321](),
      novel: [1103970, 1103949, 1103950, 1171736, 1171056]
    };
    
    const ids = themeIds[theme] || themeIds.novel;
    
    for (let i = 0; i < count; i++) {
      const photoId = ids[i % ids.length];
      const url = `https://picsum.photos/id/${photoId}/1920/1080`;
      const filename = `theme_${i + 1}.jpg`;
      
      try {
        const result = await this.downloadImage(url, { outputDir, filename });
        results.push(result);
      } catch (e) {
        results.push({ success: false, error: e.message });
      }
    }
    
    return results;
  },

  // 最佳实践
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
