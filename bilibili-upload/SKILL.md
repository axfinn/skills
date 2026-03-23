# B站投稿技能

## 上传新视频

### 第1步：进入投稿页
- 浏览器打开: https://member.bilibili.com/platform/upload/video
- 点击"上传视频"按钮

### 第2步：上传视频文件
- 方式A：点击"选择文件"，选 `*.mp4`
- 方式B：拖拽视频到上传区域
- 视频文件放 `/tmp/openclaw/uploads/*.mp4`

### 第3步：填写信息
- **标题**: `赛博觉醒：第X章 - 副标题`
- **分区**: 点击"选择分区" → 情感/生活/旅游出行
- **标签**: 点击添加标签
  - 推荐: 人工智能、科幻、赛博、原创、小说、剧情

### 第4步：设置封面
- 找到"封面"区域
- 点击"封面设置"
- 选择"智能"标签页，点击一个封面
- 点击"完成"

### 第5步：投稿
- 滚动到页面底部
- 点击"立即投稿"
- 提示"稿件投递成功"即完成

---

## 替换已发布视频

### 第1步：进入稿件管理
- 浏览器打开: https://member.bilibili.com/platform/upload-manager/article

### 第2步：找到目标视频
- 在列表中找到要替换的视频
- 点击该行的"编辑"按钮（图标: 笔）

### 第3步：更换视频
- 在视频预览区点击"更换视频"
- 上传新视频文件
- 确认弹窗提示，点击"确定"

### 第4步：提交
- 等待新视频上传完成（看进度条）
- 点击"立即投稿"

---

## 视频生成（事前准备）

### 用脚本生成
```bash
cd /home/node/.openclaw/workspace/scripts
./make_novel_video.sh "第三章" ../axfinn_blogs/content/blog/2026-02/cyber-ai-chapter3.md
```

### 生成的视频在哪
- 输出: `/home/node/.openclaw/workspace/novel_video/output/*.mp4`
- 复制到上传目录: `cp *.mp4 /tmp/openclaw/uploads/`

---

## 注意事项

- 视频文件必须放 `/tmp/openclaw/uploads/` 才能被浏览器上传
- 小说文本必须用 `axfinn_blogs/content/blog/2026-02/cyber-ai-chapter*.md` 完整版
- 替换视频后，个性化配置（封面、标签等）需重新设置
