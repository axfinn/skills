// 幻灯片截图脚本 - 使用Playwright
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const slidesDir = path.join(__dirname, 'slides');
const htmlPath = path.join(__dirname, 'presentation.html');

// 幻灯片配置
const slides = [
  { id: 'cover', selector: '.title-slide', name: '001_cover' },
  { id: 'timeline_intro', selector: '.slide:nth-child(2)', name: '002_timeline_intro' },
  { id: 'march1', selector: '.slide:nth-child(2)', scroll: 0, name: '003_march1' },
  { id: 'march3', selector: '.slide:nth-child(2)', scroll: 800, name: '004_march3' },
  { id: 'march4', selector: '.slide:nth-child(2)', scroll: 1600, name: '005_march4' },
  { id: 'march19', selector: '.slide:nth-child(2)', scroll: 2400, name: '006_march19' },
  { id: 'risk_intro', selector: '.slide:nth-child(3)', name: '007_risk_intro' },
  { id: 'risk1', selector: '.slide:nth-child(3)', scroll: 0, name: '008_risk1' },
  { id: 'risk2', selector: '.slide:nth-child(3)', scroll: 800, name: '009_risk2' },
  { id: 'risk3', selector: '.slide:nth-child(3)', scroll: 1400, name: '010_risk3' },
  { id: 'risk4', selector: '.slide:nth-child(3)', scroll: 2200, name: '011_risk4' },
  { id: 'global', selector: '.slide:nth-child(4)', name: '012_global' },
  { id: 'a_stock', selector: '.slide:nth-child(4)', scroll: 600, name: '013_a_stock' },
  { id: 'optimistic', selector: '.slide:nth-child(5)', name: '014_optimistic' },
  { id: 'pessimistic', selector: '.slide:nth-child(5)', scroll: 600, name: '015_pessimistic' },
  { id: 'advice', selector: '.slide:nth-child(5)', scroll: 1200, name: '016_advice' },
  { id: 'conclusion', selector: '.slide:nth-child(6)', name: '017_conclusion' },
];

async function captureSlides() {
  console.log('启动浏览器...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 设置视口大小
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('加载HTML...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  
  // 等待图表加载
  await page.waitForTimeout(2000);
  
  console.log('开始截图...');
  
  for (const slide of slides) {
    const outputPath = path.join(slidesDir, `${slide.name}.png`);
    
    if (slide.scroll !== undefined) {
      // 需要滚动的幻灯片
      await page.evaluate((scrollY) => {
        window.scrollTo(0, scrollY);
      }, slide.scroll);
      await page.waitForTimeout(500);
    }
    
    // 截取整个视口
    await page.screenshot({
      path: outputPath,
      fullPage: false
    });
    
    console.log(`✓ 已保存: ${slide.name}.png`);
  }
  
  await browser.close();
  console.log('所有幻灯片截图完成！');
}

captureSlides().catch(console.error);
