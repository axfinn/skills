---
name: bilibili-upload
description: B 站视频上传与投稿自动化 - 支持新视频上传和已发布视频替换
---

# B 站投稿技能

B 站视频上传与投稿自动化技能。

## 上传新视频

### 步骤

1. **进入投稿页**: https://member.bilibili.com/platform/upload/video
2. **上传视频**: 拖拽或选择 `*.mp4` 文件
3. **填写信息**:
   - 标题：`赛博觉醒：第 X 章 - 副标题`
   - 分区：情感/生活/旅游出行
   - 标签：人工智能、科幻、赛博、原创
4. **设置封面**: 选择智能封面
5. **投稿**: 点击"立即投稿"

## 替换已发布视频

1. **进入管理页**: https://member.bilibili.com/platform/upload-manager/article
2. **找到视频**: 点击"编辑"
3. **更换视频**: 点击"更换视频"上传新文件
4. **提交**: 等待上传完成后点击"立即投稿"

## 视频生成

```bash
# 单章节
./make_novel_video.sh "第三章" cyber-ai-chapter3.md

# 批量
./make_novel_video_batch.sh
```

输出：`/home/node/.openclaw/workspace/novel_video/output/*.mp4`

## 注意事项

- 视频文件放 `/tmp/openclaw/uploads/` 目录
- 小说文本用 `axfinn_blogs/content/blog/2026-02/cyber-ai-chapter*.md`
- 替换视频后需重新设置封面和标签

## 相关技能

- `news-video`: 每日新闻视频生成
- `content-extract`: 网页内容提取
