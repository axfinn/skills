# 新闻视频生成 Skill

## 触发条件
用户要求生成新闻视频、每日新闻简报、视频投稿等

## 能力
- 自动抓取今日新闻
- 生成中文TTS语音
- 20张随机背景图轮播
- 同步字幕（当前高亮+下一条置灰）
- 底部蒙版防遮挡
- 上传到分享平台

## 使用流程

### 1. 获取新闻
从 news.163.com 抓取今日热点

### 2. 生成逐条TTS
每条新闻单独生成语音

### 3. 合成视频
- 背景轮播: `-loop 1 -t 2.6`
- 字幕同步: `enable='between(t,start,end)'`
- 蒙版: `drawbox=color=black@0.8`

### 4. 上传分享
调用 t.jaxiu.cn API

## 依赖
- FFmpeg
- Edge TTS (zh-CN-XiaoxiaoNeural)
- picsum.photos
- t.jaxiu.cn

## 工具位置
- 脚本: `tools/news_video_generator.js`
- 文档: `tools/NEWS_VIDEO.md`

## 注意事项
- 背景图必须用 `-t` 控制显示时间
- 字幕要加蒙版防遮挡
- 提前计算每条新闻的时间区间
