#!/usr/bin/env python3
"""
视频生成器 v2.0 - 统一入口
支持: 小说视频 / 新闻视频 / PPT视频
"""

import os
import sys
import json
import time
import argparse
import subprocess
from pathlib import Path
from datetime import datetime

# 尝试导入依赖
try:
    import edge_tts
    import asyncio
    HAS_EDGE_TTS = True
except ImportError:
    HAS_EDGE_TTS = False

class VideoGenerator:
    """统一视频生成器"""
    
    VOICES = {
        "female": "zh-CN-XiaoxiaoNeural",
        "male": "zh-CN-YunyangNeural",
        "young_male": "zh-CN-YunxiNeural",
        "young_female": "zh-CN-XiaoyiNeural"
    }
    
    def __init__(self, output_dir="./output", voice="female", rate="+10%"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.voice = self.VOICES.get(voice, voice)
        self.rate = rate
        
        # 工作目录
        self.work_dir = self.output_dir / "temp"
        self.work_dir.mkdir(parents=True, exist_ok=True)
        
        self.images_dir = self.work_dir / "images"
        self.audio_dir = self.work_dir / "audio"
        self.slides_dir = self.work_dir / "slides"
        
        for d in [self.images_dir, self.audio_dir, self.slides_dir]:
            d.mkdir(exist_ok=True)
    
    def generate_novel(self, chapter_name, text_file, bg_theme="novel"):
        """生成小说视频"""
        print(f"📖 开始生成小说视频: {chapter_name}")
        
        # 1. 读取文本
        with open(text_file, 'r', encoding='utf-8') as f:
            text = f.read()
        
        # 2. 生成TTS
        print("🔊 生成语音...")
        audio_file = self.audio_dir / f"{chapter_name}.mp3"
        self._generate_tts(text, audio_file)
        
        # 3. 下载配图
        print("🖼️ 下载主题配图...")
        self._download_images(bg_theme, count=20)
        
        # 4. 合成视频
        print("🎬 合成视频...")
        output_file = self.output_dir / f"{chapter_name}_video.mp4"
        self._create_video(audio_file, output_file)
        
        print(f"✅ 完成: {output_file}")
        return output_file
    
    def generate_news(self, news_items, title="每日新闻"):
        """生成新闻视频"""
        print(f"📰 开始生成新闻视频: {title}")
        
        # 1. 生成各条新闻的TTS
        print("🔊 生成语音...")
        audio_files = []
        for i, item in enumerate(news_items):
            audio_file = self.audio_dir / f"news_{i:02d}.mp3"
            self._generate_tts(item["text"], audio_file)
            audio_files.append((item, audio_file))
        
        # 2. 合并音频
        merged_audio = self.audio_dir / "news_merged.mp3"
        self._merge_audio(audio_files, merged_audio)
        
        # 3. 下载配图
        print("🖼️ 下载主题配图...")
        self._download_images("news", count=len(news_items))
        
        # 4. 合成视频
        print("🎬 合成视频...")
        output_file = self.output_dir / f"news_{datetime.now().strftime('%Y%m%d')}.mp4"
        self._create_video(merged_audio, output_file)
        
        print(f"✅ 完成: {output_file}")
        return output_file
    
    def generate_ppt(self, html_file, voice_over=None):
        """生成PPT视频"""
        print(f"📊 开始生成PPT视频: {html_file}")
        
        # 1. 截取幻灯片
        print("📸 截取幻灯片...")
        self._capture_slides(html_file)
        
        # 2. 生成/使用配音
        if voice_over:
            audio_file = self.audio_dir / "ppt_voiceover.mp3"
            self._generate_tts(voice_over, audio_file)
        else:
            audio_file = None
        
        # 3. 合成视频
        print("🎬 合成视频...")
        output_file = self.output_dir / "ppt_video.mp4"
        self._create_video_from_slides(audio_file, output_file)
        
        print(f"✅ 完成: {output_file}")
        return output_file
    
    def _generate_tts(self, text, output_file):
        """生成TTS语音"""
        if not HAS_EDGE_TTS:
            print("⚠️ edge-tts 未安装，使用静音频")
            # 创建1秒静音
            subprocess.run([
                "ffmpeg", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                "-t", "1", "-y", str(output_file)
            ], capture_output=True)
            return
        
        async def _tts():
            communicate = edge_tts.Communicate(text, self.voice, rate=self.rate)
            await communicate.save(str(output_file))
        
        asyncio.run(_tts())
    
    def _merge_audio(self, audio_files, output_file):
        """合并多个音频文件"""
        # 创建文件列表
        list_file = self.work_dir / "audio_list.txt"
        with open(list_file, 'w') as f:
            for item, audio_file in audio_files:
                # 添加静音间隔
                silence = self.work_dir / "silence.mp3"
                subprocess.run([
                    "ffmpeg", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                    "-t", "0.5", "-y", str(silence)
                ], capture_output=True)
                f.write(f"file '{audio_file}'\n")
                f.write(f"file '{silence}'\n")
        
        subprocess.run([
            "ffmpeg", "-y", "-f", "concat", "-safe", "0",
            "-i", str(list_file), "-c:a", "copy", str(output_file)
        ], capture_output=True)
    
    def _download_images(self, theme, count=20):
        """下载配图"""
        try:
            from image_matcher import ImageMatcher
            matcher = ImageMatcher(str(self.images_dir))
            
            if theme in ["novel", "tech", "financial", "nature", "city", "business", "news"]:
                matcher.download_by_category(theme, count)
            else:
                matcher.download_by_keywords(theme, count)
        except ImportError:
            # 备用：使用 Picsum
            import random
            for i in range(count):
                url = f"https://picsum.photos/1920/1080?random={random.randint(1, 500)}"
                subprocess.run([
                    "curl", "-sL", url, "-o", str(self.images_dir / f"bg_{i+1:02d}.jpg")
                ])
    
    def _create_video(self, audio_file, output_file):
        """创建视频（图片轮播+音频）"""
        # 获取音频时长
        result = subprocess.run([
            "ffprobe", "-i", str(audio_file),
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1"
        ], capture_output=True, text=True)
        
        try:
            duration = float(result.stdout.strip())
        except:
            duration = 10
        
        # 获取图片列表
        images = sorted(self.images_dir.glob("*.jpg")) + sorted(self.images_dir.glob("*.png"))
        
        if not images:
            print("⚠️ 没有找到图片，使用纯色背景")
            # 创建纯色背景
            subprocess.run([
                "ffmpeg", "-y",
                "-f", "lavfi", "-i", f"color=c=0x1a1a2e:s=1920x1080:d={duration}",
                "-i", str(audio_file),
                "-c:v", "libx264", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-shortest",
                str(output_file)
            ], capture_output=True)
            return
        
        # 计算每张图时长
        per_image_duration = duration / len(images)
        
        # 方法1: 使用 concat 过滤器（更稳定）
        concat_file = self.work_dir / "concat.txt"
        with open(concat_file, 'w') as f:
            for img in images:
                f.write(f"file '{img}'\n")
                f.write(f"duration {per_image_duration}\n")
        
        subprocess.run([
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0", "-i", str(concat_file),
            "-i", str(audio_file),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
            "-c:a", "aac", "-b:a", "128k",
            "-shortest",
            str(output_file)
        ], capture_output=True)
    
    def _create_video_from_slides(self, audio_file, output_file):
        """从幻灯片创建视频"""
        slides = sorted(self.slides_dir.glob("*.png"))
        
        if not slides:
            print("⚠️ 没有找到幻灯片")
            return
        
        # 每张幻灯片默认5秒
        concat_file = self.work_dir / "slides_concat.txt"
        with open(concat_file, 'w') as f:
            for slide in slides:
                f.write(f"file '{slide}'\n")
                f.write("duration 5\n")
        
        cmd = [
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0", "-i", str(concat_file),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30"
        ]
        
        if audio_file and audio_file.exists():
            cmd.extend(["-i", str(audio_file), "-c:a", "aac", "-shortest"])
        else:
            cmd.extend(["-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-c:a", "aac"])
        
        cmd.append(str(output_file))
        
        subprocess.run(cmd, capture_output=True)
    
    def _capture_slides(self, html_file):
        """截取HTML幻灯片"""
        # 需要 playwright
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            print("⚠️ 需要安装 playwright: pip install playwright")
            return
        
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(viewport={"width": 1920, "height": 1080})
            page.goto(f"file://{os.path.abspath(html_file)}")
            page.wait_for_timeout(2000)
            
            # 查找所有 slide 元素
            slides = page.query_selector_all(".slide")
            
            for i, slide in enumerate(slides):
                slide.screenshot(path=str(self.slides_dir / f"slide_{i+1:02d}.png"))
            
            browser.close()


def main():
    parser = argparse.ArgumentParser(description="视频生成器 v2.0")
    subparsers = parser.add_subparsers(dest="type", help="生成类型")
    
    # 小说视频
    novel_parser = subparsers.add_parser("novel", help="生成小说视频")
    novel_parser.add_argument("chapter", help="章节名")
    novel_parser.add_argument("text_file", help="文本文件路径")
    novel_parser.add_argument("--theme", default="novel", help="背景主题")
    novel_parser.add_argument("--voice", default="female", help="语音")
    novel_parser.add_argument("--rate", default="+10%", help="语速")
    novel_parser.add_argument("-o", "--output", default="./output", help="输出目录")
    
    # 新闻视频
    news_parser = subparsers.add_parser("news", help="生成新闻视频")
    news_parser.add_argument("--title", default="每日新闻", help="标题")
    news_parser.add_argument("--json", help="JSON格式新闻数据")
    news_parser.add_argument("-o", "--output", default="./output", help="输出目录")
    
    # PPT视频
    ppt_parser = subparsers.add_parser("ppt", help="生成PPT视频")
    ppt_parser.add_argument("html_file", help="HTML文件路径")
    ppt_parser.add_argument("--voiceover", help="配音文本")
    ppt_parser.add_argument("-o", "--output", default="./output", help="输出目录")
    
    args = parser.parse_args()
    
    if not args.type:
        parser.print_help()
        return
    
    # 创建生成器
    gen = VideoGenerator(
        output_dir=args.output,
        voice=getattr(args, 'voice', 'female'),
        rate=getattr(args, 'rate', '+10%')
    )
    
    if args.type == "novel":
        gen.generate_novel(args.chapter, args.text_file, args.theme)
    elif args.type == "news":
        if args.json:
            with open(args.json) as f:
                news_items = json.load(f)
        else:
            # 示例数据
            news_items = [
                {"text": "今天市场大幅上涨。" },
                {"text": "科技股表现强劲。" }
            ]
        gen.generate_news(news_items, args.title)
    elif args.type == "ppt":
        gen.generate_ppt(args.html_file, args.voiceover)


if __name__ == "__main__":
    main()
