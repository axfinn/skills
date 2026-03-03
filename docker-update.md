---
name: docker-update
description: 自动更新 OpenClaw Docker 容器。功能：git fetch → merge origin/main → 自动解决冲突 → docker build → 重启容器。用于本地开发环境的快速更新。
---

更新 OpenClaw Docker 容器：

1. 运行脚本：`./scripts/docker-update.sh`
2. 脚本会自动处理冲突并重启容器

如果遇到复杂冲突，脚本会暂停让你手动处理。
