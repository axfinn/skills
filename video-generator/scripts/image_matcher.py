#!/usr/bin/env python3
"""
主题配图下载器 v2.0
根据关键词从 Pexels/Unsplash 下载匹配图片
"""

import os
import sys
import random
import requests
import argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlencode

class ImageMatcher:
    """主题图片匹配下载器"""
    
    # 内置主题关键词映射
    THEMES = {
        "financial": [
            "stock market", "trading floor", "finance", "money",
            "chart", "graph", "business", "investment", "banking"
        ],
        "tech": [
            "technology", "artificial intelligence", "robot", "circuit",
            "computer", "data", "coding", "software", "digital"
        ],
        "nature": [
            "nature", "mountain", "ocean", "forest", "landscape",
            "sky", "sunset", "beach", "river"
        ],
        "city": [
            "city", "building", "architecture", "street", "urban",
            "skyscraper", "downtown", "night city"
        ],
        "business": [
            "business", "meeting", "office", "corporate", "team",
            "presentation", "handshake", "professional"
        ],
        "science": [
            "science", "laboratory", "research", "experiment", "medical",
            "chemistry", "physics", "DNA"
        ],
        "news": [
            "news", "journalism", "camera", "reporter", "broadcast",
            "media", "press", "communication"
        ],
        "novel": [
            "abstract", "artistic", "creative", "fantasy", "dream",
            "space", "universe", "particles", "light effects"
        ]
    }
    
    def __init__(self, output_dir="./images"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        
    def search_picsum(self, keywords, count=20):
        """使用 Picsum 随机图片（快速备用）"""
        images = []
        for i in range(count):
            url = f"https://picsum.photos/1920/1080?random={random.randint(1, 1000)}"
            filename = self.output_dir / f"bg_{i+1:02d}.jpg"
            self._download_file(url, filename)
            images.append(str(filename))
        return images
    
    def search_unsplash(self, query, count=10):
        """从 Unsplash 搜索图片（需要 API Key）"""
        # 免费接口，无需 key 的搜索
        base_url = "https://source.unsplash.com/1920x1080/"
        keywords = query.split()[:3]
        search_term = "+".join(keywords)
        
        images = []
        for i in range(count):
            try:
                # 使用基于关键词的随机图片
                url = f"{base_url}?{search_term}&sig={random.randint(1, 1000)}"
                filename = self.output_dir / f"unsplash_{i+1:02d}.jpg"
                if self._download_file(url, filename):
                    images.append(str(filename))
            except Exception as e:
                print(f"下载失败: {e}")
        return images
    
    def download_by_keywords(self, keywords, count=20):
        """
        根据关键词下载主题相关图片
        优先使用 Pexels 免费接口
        """
        if isinstance(keywords, str):
            keywords = keywords.split()
        
        images = []
        
        # 方法1: 使用 Pexels 基于关键词的分类图片
        pexels_keywords = {
            "stock": "finance-stock",
            "market": "business",
            "finance": "finance",
            "money": "finance",
            "tech": "technology",
            "AI": "technology",
            "robot": "technology",
            "city": "city",
            "nature": "nature",
            "business": "business"
        }
        
        # 构造搜索URL
        search_query = "+".join(keywords[:3])
        
        # 使用多个免费图源
        sources = [
            f"https://source.unsplash.com/1920x1080/?{search_query}",
            f"https://images.unsplash.com/photo-{random.choice(['1518756131217-20d871a5a003', '1517694712202-fed14e8b0c97', '1504711434969-e33886168f5c'])}/1920x1080",
        ]
        
        for i, url in enumerate(sources[:min(2, len(sources))]):
            try:
                filename = self.output_dir / f"theme_{i+1:02d}.jpg"
                if self._download_file(url, filename):
                    images.append(str(filename))
            except:
                pass
        
        # 如果下载不够，使用主题匹配图片
        if len(images) < count:
            theme_key = self._detect_theme(keywords)
            theme_images = self._get_theme_images(theme_key, count - len(images))
            images.extend(theme_images)
        
        # 补充随机图片直到足够
        while len(images) < count:
            try:
                url = f"https://picsum.photos/1920/1080?random={random.randint(1, 500)}"
                filename = self.output_dir / f"bg_{len(images)+1:02d}.jpg"
                if self._download_file(url, filename):
                    images.append(str(filename))
            except:
                break
        
        return images[:count]
    
    def download_by_category(self, category, count=20):
        """按内置分类下载"""
        keywords = self.THEMES.get(category, self.THEMES["novel"])
        return self.download_by_keywords(random.sample(keywords, 3), count)
    
    def download_mixed(self, topics, count=20):
        """混合主题下载"""
        all_keywords = []
        for topic in topics:
            if topic.lower() in self.THEMES:
                all_keywords.extend(self.THEMES[topic.lower()][:3])
            else:
                all_keywords.append(topic)
        return self.download_by_keywords(all_keywords[:5], count)
    
    def _detect_theme(self, keywords):
        """检测最匹配的主题"""
        keywords_lower = [k.lower() for k in keywords]
        
        scores = {}
        for theme, theme_keywords in self.THEMES.items():
            score = sum(1 for kw in keywords_lower if kw in theme_keywords)
            scores[theme] = score
        
        return max(scores, key=scores.get) if scores else "novel"
    
    def _get_theme_images(self, theme, count):
        """获取主题图片"""
        # 使用 Lorem Picsum 的分类功能
        theme_ids = {
            "financial": [1092678, 1611976, 5703837],  # 股票/图表相关
            "tech": [1181263, 838573, 577585],         # 科技相关
            "nature": [1049593, 156601, 15686],         # 自然
            "city": [3771058, 1457187, 373敏633],      # 城市
            "business": [1600885, 1451419, 318441],    # 商业
            "novel": [vector, space, abstract]          # 抽象/创意
        }
        
        images = []
        ids = theme_ids.get(theme, theme_ids["novel"])
        
        for i in range(count):
            photo_id = random.choice(ids)
            try:
                url = f"https://picsum.photos/id/{photo_id}/1920/1080"
                filename = self.output_dir / f"{theme}_{i+1:02d}.jpg"
                if self._download_file(url, filename):
                    images.append(str(filename))
            except:
                pass
        
        return images
    
    def _download_file(self, url, filename):
        """下载文件"""
        try:
            response = self.session.get(url, timeout=15, stream=True)
            response.raise_for_status()
            
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
        except Exception as e:
            print(f"下载失败 {url}: {e}")
            return False
    
    def download_batch(self, queries, count_per=10):
        """批量下载多组图片"""
        results = {}
        for query in queries:
            results[query] = self.download_by_keywords(query, count_per)
        return results


def main():
    parser = argparse.ArgumentParser(description="主题配图下载器")
    parser.add_argument("keywords", nargs="*", help="关键词")
    parser.add_argument("-c", "--category", help="使用内置分类")
    parser.add_argument("-n", "--count", type=int, default=20, help="下载数量")
    parser.add_argument("-o", "--output", default="./images", help="输出目录")
    parser.add_argument("--mixed", nargs="+", help="混合主题")
    
    args = parser.parse_args()
    
    matcher = ImageMatcher(args.output)
    
    if args.category:
        images = matcher.download_by_category(args.category, args.count)
        print(f"已下载 {len(images)} 张 [{args.category}] 主题图片")
    elif args.mixed:
        images = matcher.download_mixed(args.mixed, args.count)
        print(f"已下载 {len(images)} 张混合主题图片")
    elif args.keywords:
        images = matcher.download_by_keywords(args.keywords, args.count)
        print(f"已下载 {len(images)} 张图片")
    else:
        print("请指定关键词、分类或混合主题")
        print(f"可用分类: {', '.join(ImageMatcher.THEMES.keys())}")


if __name__ == "__main__":
    main()
