#!/usr/bin/env python3
"""
最终版本 - 使用高清音频，精确音画同步
"""

import os
import subprocess

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
FFMPEG = os.path.join(PROJECT_DIR, 'ffmpeg')
SLIDES_DIR = os.path.join(PROJECT_DIR, 'slides')
AUDIO_DIR = os.path.join(PROJECT_DIR, 'audio_hd')  # 使用高清音频
OUTPUT_VIDEO = os.path.join(PROJECT_DIR, '2026_stock_crisis_FINAL.mp4')

# 幻灯片配置 - 根据内容精确匹配
SEGMENTS = [
    # 封面
    {"audio": "01_intro", "slides": [("001_cover", 28.5)]},
    
    # 时间线 - 3月1日
    {"audio": "02_timeline", "slides": [("002_timeline_intro", 14.0), ("003_march1", 17.0)]},
    
    # 3月3日
    {"audio": "03_black_tuesday", "slides": [("004_march3", 26.5)]},
    
    # 3月4日
    {"audio": "04_darkest_day", "slides": [("005_march4", 25.5)]},
    
    # 3月19日 A股
    {"audio": "05_a_stock_crash", "slides": [("006_march19", 35.0)]},
    
    # 风险介绍
    {"audio": "06_risk_intro", "slides": [("007_risk_intro", 14.0), ("008_risk1", 12.0)]},
    
    # 风险1详情
    {"audio": "07_risk_detail", "slides": [("008_risk1", 30.0)]},
    
    # 风险2
    {"audio": "08_risk2", "slides": [("009_risk2", 27.0)]},
    
    # 风险3
    {"audio": "09_risk3", "slides": [("010_risk3", 36.5)]},
    
    # 风险4
    {"audio": "10_risk4", "slides": [("011_risk4", 30.0)]},
    
    # 机构警告
    {"audio": "11_warning", "slides": [("012_global", 21.0)]},
    
    # A股冲击 + 展望
    {"audio": "12_outlook", "slides": [("014_optimistic", 18.0), ("015_pessimistic", 18.0)]},
    
    # 投资建议
    {"audio": "13_advice", "slides": [("016_advice", 28.0)]},
    
    # 结语
    {"audio": "14_conclusion", "slides": [("017_conclusion", 39.0)]},
]


def get_audio_duration(audio_path):
    """获取音频时长"""
    cmd = [FFMPEG, '-i', audio_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    for line in result.stderr.split('\n'):
        if 'Duration:' in line:
            time_str = line.split('Duration:')[1].split(',')[0].strip()
            h, m, s = time_str.split(':')
            return float(h) * 3600 + float(m) * 60 + float(s)
    return 0


def create_concat_file():
    """创建ffmpeg concat文件"""
    concat_path = os.path.join(PROJECT_DIR, 'final_concat.txt')
    
    lines = []
    total_video_duration = 0
    total_audio_duration = 0
    
    for seg in SEGMENTS:
        audio_path = os.path.join(AUDIO_DIR, f"{seg['audio']}.mp3")
        audio_duration = get_audio_duration(audio_path)
        total_audio_duration += audio_duration
        
        # 计算每张幻灯片的时长
        slide_count = len(seg['slides'])
        
        for slide_name, planned_duration in seg['slides']:
            slide_path = os.path.join(SLIDES_DIR, f"{slide_name}.png")
            if os.path.exists(slide_path):
                lines.append(f"file '{slide_path}'")
                lines.append(f"duration {planned_duration:.3f}")
                total_video_duration += planned_duration
            else:
                print(f"⚠️  幻灯片不存在: {slide_path}")
    
    # 最后一帧
    last_slide = SEGMENTS[-1]['slides'][-1][0]
    last_slide_path = os.path.join(SLIDES_DIR, f"{last_slide}.png")
    lines.append(f"file '{last_slide_path}'")
    
    with open(concat_path, 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"📊 计划视频时长: {total_video_duration:.1f}秒")
    print(f"📊 实际音频时长: {total_audio_duration:.1f}秒")
    print(f"📊 差异: {abs(total_video_duration - total_audio_duration):.1f}秒")
    
    return concat_path, total_audio_duration


def merge_audio_files():
    """合并所有音频文件"""
    print("\n🔊 合并高清音频文件...")
    
    audio_list_path = os.path.join(PROJECT_DIR, 'final_audio_list.txt')
    with open(audio_list_path, 'w') as f:
        for seg in SEGMENTS:
            audio_path = os.path.join(AUDIO_DIR, f"{seg['audio']}.mp3")
            f.write(f"file '{audio_path}'\n")
    
    merged_audio = os.path.join(PROJECT_DIR, 'final_merged_audio.mp3')
    cmd = [FFMPEG, '-y', '-f', 'concat', '-safe', '0',
           '-i', audio_list_path, '-c', 'copy', merged_audio]
    
    subprocess.run(cmd, capture_output=True)
    
    duration = get_audio_duration(merged_audio)
    print(f"✓ 音频已合并: {duration:.1f}秒")
    
    return merged_audio


def create_video_from_slides(concat_file, target_duration):
    """从幻灯片创建视频"""
    print("\n🎬 从幻灯片创建视频...")
    
    temp_video = os.path.join(PROJECT_DIR, 'final_temp_video.mp4')
    
    cmd = [FFMPEG, '-y',
           '-f', 'concat', '-safe', '0', '-i', concat_file,
           '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p',
           '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
           temp_video]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ 视频创建失败: {result.stderr}")
        return None
    
    # 检查视频时长
    video_duration = get_audio_duration(temp_video)
    print(f"✓ 视频已创建: {video_duration:.1f}秒")
    
    # 如果视频比音频短，需要延长
    if video_duration < target_duration:
        print(f"   视频需要延长 {target_duration - video_duration:.1f}秒")
    
    return temp_video


def add_audio_to_video(video_path, audio_path):
    """添加音频到视频"""
    print("\n🎵 添加音频到视频...")
    
    cmd = [FFMPEG, '-y',
           '-i', video_path, '-i', audio_path,
           '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
           '-shortest',
           OUTPUT_VIDEO]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"❌ 添加音频失败: {result.stderr}")
        return False
    
    return True


def main():
    print("=" * 60)
    print("🎬 最终版本 - 高清音频 + 精确同步")
    print("=" * 60)
    
    # 步骤1: 创建concat文件
    print("\n📝 创建幻灯片序列...")
    concat_file, target_duration = create_concat_file()
    
    # 步骤2: 合并音频
    merged_audio = merge_audio_files()
    
    # 步骤3: 从幻灯片创建视频
    temp_video = create_video_from_slides(concat_file, target_duration)
    if not temp_video:
        return
    
    # 步骤4: 添加音频到视频
    if add_audio_to_video(temp_video, merged_audio):
        # 获取最终视频信息
        duration = get_audio_duration(OUTPUT_VIDEO)
        file_size = os.path.getsize(OUTPUT_VIDEO) / (1024 * 1024)
        
        print("\n" + "=" * 60)
        print("✅ 最终视频制作完成!")
        print(f"📹 输出文件: {OUTPUT_VIDEO}")
        print(f"⏱️  时长: {duration:.1f}秒 ({duration/60:.1f}分钟)")
        print(f"📦 大小: {file_size:.1f}MB")
        print(f"📐 分辨率: 1920x1080")
        print(f"🎙️  语音: Meijia (台湾女声)")
        print("=" * 60)
        
        # 清理临时文件
        for f in [temp_video, merged_audio, concat_file, 
                  os.path.join(PROJECT_DIR, 'final_audio_list.txt')]:
            if os.path.exists(f):
                os.remove(f)
        
        print("\n🎉 视频已准备就绪，可以上传了！")


if __name__ == "__main__":
    main()
