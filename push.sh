#!/bin/bash
# 推送到 GitHub 脚本

echo "🚀 推送到 GitHub..."
echo ""
echo "请选择认证方式:"
echo "1. HTTPS with Personal Access Token"
echo "2. SSH Key"
echo ""
read -p "选择 (1/2): " choice

if [ "$choice" = "1" ]; then
    read -p "GitHub Username: " username
    read -sp "GitHub Token: " token
    echo ""
    
    git remote set-url origin https://${username}:${token}@github.com/axfinn/skills.git
    git push origin main
    
elif [ "$choice" = "2" ]; then
    git remote set-url origin git@github.com:axfinn/skills.git
    git push origin main
else
    echo "❌ 无效选择"
    exit 1
fi

echo ""
echo "✅ 推送完成！"
