/**
 * 动画效果库
 * 提供丰富的幻灯片动画效果
 */

const Animations = {
  // 配置
  config: {
    defaultDuration: 0.8,
    defaultDelay: 0,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },

  /**
   * 淡入效果
   */
  fadeIn(element, options = {}) {
    const { duration = this.config.defaultDuration, delay = this.config.defaultDelay } = options;
    
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}s ease ${delay}s`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
    
    return this;
  },

  /**
   * 淡出效果
   */
  fadeOut(element, options = {}) {
    const { duration = this.config.defaultDuration } = options;
    
    element.style.transition = `opacity ${duration}s ease`;
    element.style.opacity = '0';
    
    return this;
  },

  /**
   * 滑动入场
   * @param {string} direction - 'left' | 'right' | 'up' | 'down'
   */
  slideIn(element, options = {}) {
    const { 
      direction = 'up', 
      duration = this.config.defaultDuration,
      distance = 50
    } = options;
    
    const transforms = {
      left: `translateX(-${distance}px)`,
      right: `translateX(${distance}px)`,
      up: `translateY(-${distance}px)`,
      down: `translateY(${distance}px)`
    };
    
    element.style.opacity = '0';
    element.style.transform = transforms[direction];
    element.style.transition = `all ${duration}s ${this.config.easing}`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0)';
    });
    
    return this;
  },

  /**
   * 缩放入场
   */
  scaleIn(element, options = {}) {
    const { 
      from = 0.8, 
      to = 1,
      duration = this.config.defaultDuration
    } = options;
    
    element.style.opacity = '0';
    element.style.transform = `scale(${from})`;
    element.style.transition = `all ${duration}s ${this.config.easing}`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = `scale(${to})`;
    });
    
    return this;
  },

  /**
   * 弹性入场
   */
  bounceIn(element, options = {}) {
    const { duration = 1 } = options;
    
    element.style.animation = `bounceIn ${duration}s ${this.config.easing}`;
    
    return this;
  },

  /**
   * 旋转入场
   */
  rotateIn(element, options = {}) {
    const { 
      from = -180, 
      duration = this.config.defaultDuration
    } = options;
    
    element.style.opacity = '0';
    element.style.transform = `rotate(${from}deg)`;
    element.style.transition = `all ${duration}s ${this.config.easing}`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'rotate(0deg)';
    });
    
    return this;
  },

  /**
   * 打字机效果
   */
  typewriter(element, options = {}) {
    const { 
      speed = 50, 
      delay = 0
    } = options;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid currentColor';
    
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.style.borderRight = 'none';
      }
    };
    
    setTimeout(type, delay);
    
    return this;
  },

  /**
   * 列表项依次入场
   */
  staggerList(listElement, options = {}) {
    const { 
      animation = 'fadeIn',
      delayBetween = 0.2
    } = options;
    
    const items = listElement.querySelectorAll('li');
    items.forEach((item, index) => {
      setTimeout(() => {
        this[animation](item, { delay: index * delayBetween });
      }, 0);
    });
    
    return this;
  },

  /**
   * 脉冲效果
   */
  pulse(element, options = {}) {
    const { 
      scale = 1.05, 
      duration = 2,
      infinite = true
    } = options;
    
    element.style.animation = `pulse ${duration}s ease-in-out ${infinite ? 'infinite' : 'once'}`;
    
    return this;
  },

  /**
   * 浮动效果
   */
  float(element, options = {}) {
    const { 
      distance = 20, 
      duration = 3,
      infinite = true
    } = options;
    
    element.style.animation = `float ${duration}s ease-in-out ${infinite ? 'infinite' : 'once'}`;
    
    return this;
  },

  /**
   * 高亮闪烁
   */
  highlight(element, options = {}) {
    const { 
      color = '#feca57',
      duration = 1
    } = options;
    
    const originalBg = element.style.backgroundColor;
    element.style.transition = `background-color ${duration/2}s ease`;
    element.style.backgroundColor = color;
    
    setTimeout(() => {
      element.style.backgroundColor = originalBg || 'transparent';
    }, duration * 1000);
    
    return this;
  },

  /**
   * 图表动画 - 柱状图增长
   */
  animateBarChart(chartElement, options = {}) {
    const { duration = 1, delay = 0 } = options;
    
    const bars = chartElement.querySelectorAll('.chart-bar, rect');
    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transition = `height ${duration}s ease, transform ${duration}s ease`;
        bar.style.transform = 'scaleY(1)';
      }, delay + index * 100);
    });
    
    return this;
  },

  /**
   * 数字滚动增长
   */
  animateNumber(element, endValue, options = {}) {
    const { 
      duration = 2, 
      suffix = '',
      prefix = ''
    } = options;
    
    const startValue = 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.round(startValue + (endValue - startValue) * eased);
      element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    
    return this;
  },

  /**
   * 粒子背景效果
   */
  createParticles(container, options = {}) {
    const {
      count = 50,
      color = 'rgba(255,255,255,0.5)',
      size = 3,
      speed = 0.5
    } = options;
    
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${5 + Math.random() * 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
      particles.push(particle);
    }
    
    return particles;
  },

  /**
   * 渐变背景动画
   */
  animateGradient(element, colors, options = {}) {
    const { 
      duration = 5,
      direction = '135deg'
    } = options;
    
    element.style.background = `linear-gradient(${direction}, ${colors.join(', ')})`;
    element.style.backgroundSize = '400% 400%';
    element.style.animation = `gradientShift ${duration}s ease infinite`;
    
    return this;
  }
};

// 添加 CSS 动画 keyframes
(function addKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes particleFloat {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(50px);
        opacity: 0;
      }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
})();

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
