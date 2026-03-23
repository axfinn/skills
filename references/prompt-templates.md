# Claude Dev Assistant 提示词模板

本文档包含各开发阶段的推荐提示词模板，可直接用于定制开发流程。

## 需求调研阶段

### 技术栈推荐

```
分析以下需求，推荐最适合的技术栈：

需求：{requirement}

考虑因素:
1. 项目规模和复杂度
2. 性能和可扩展性要求
3. 开发团队技术背景
4. 生态系统成熟度

返回 JSON:
{
  "tech_stack": ["技术 1", "技术 2"],
  "reasoning": "选择理由",
  "alternatives": ["备选技术"]
}
```

### 最佳实践搜索

```
搜索 {domain} 领域的最佳实践和设计模式：

主题：{topic}
场景：{use_case}

返回:
1. 主流解决方案对比
2. 推荐方案及理由
3. 常见陷阱和避免方法
```

## 需求分析阶段

### 功能点拆解

```
将以下需求拆解为具体功能点：

需求：{requirement}

返回 JSON:
{
  "features": [
    {
      "name": "功能名称",
      "description": "功能描述",
      "priority": "high|medium|low",
      "user_story": "作为 {角色}, 我想要 {功能}, 以便 {价值}"
    }
  ],
  "non_functional": [
    "性能要求",
    "安全要求",
    "可用性要求"
  ]
}
```

### 验收标准

```
为以下功能定义验收标准：

功能：{feature_name}
描述：{feature_description}

使用 Given-When-Then 格式:
- Given {前置条件}
- When {操作}
- Then {预期结果}
```

## 架构设计阶段

### 系统架构

```
设计以下系统的架构：

需求：{requirement}
技术栈：{tech_stack}

返回:
1. 系统架构图描述
2. 核心模块划分
3. 模块间依赖关系
4. 数据流设计
5. 关键技术决策及理由
```

### 模块设计

```
设计以下模块的详细结构：

模块：{module_name}
职责：{responsibility}

返回:
1. 类/函数设计
2. 接口定义
3. 数据结构
4. 错误处理策略
```

## 代码实现阶段

### 代码生成

```
你是{role}工程师。请生成以下功能的完整代码：

需求：{requirement}
技术栈：{tech_stack}
已有文件：{existing_files}

要求:
1. 遵循 {language} 最佳实践
2. 包含完整的错误处理
3. 添加必要的注释
4. 保持代码简洁可读

返回 JSON:
{
  "files": [
    {
      "path": "文件路径",
      "content": "文件内容",
      "description": "文件说明"
    }
  ]
}
```

### 代码角色选择

| 需求类型 | 推荐角色 |
|----------|----------|
| Chrome 插件 | Chrome 插件工程师 |
| React/Vue 前端 | 前端工程师 |
| Python 后端 | Python 后端工程师 |
| API 设计 | API 架构师 |
| 数据库设计 | 数据库工程师 |
| 测试代码 | 测试工程师 |

## 测试生成阶段

### 单元测试

```
为以下代码生成单元测试：

代码文件：{file_path}
代码内容：{code_content}

要求:
1. 使用 {test_framework} 测试框架
2. 覆盖所有公共方法
3. 包含边界条件测试
4. 包含异常场景测试

返回测试文件内容。
```

### 集成测试

```
生成以下功能的集成测试：

功能：{feature}
涉及模块：{modules}

测试场景:
1. 正常流程
2. 异常流程
3. 边界条件
4. 并发场景 (如适用)
```

## 代码审查阶段

### 审查检查清单

```
审查以下代码，检查以下方面：

代码：{code}

审查维度:
1. 代码质量
   - 命名规范
   - 代码结构
   - 重复代码
   - 复杂度

2. 安全性
   - 输入验证
   - SQL 注入
   - XSS 防护
   - 敏感信息处理

3. 性能
   - 时间复杂度
   - 空间复杂度
   - 资源泄漏
   - 数据库查询优化

4. 可维护性
   - 注释充分性
   - 测试覆盖
   - 文档完整性

返回 JSON:
{
  "passed": true|false,
  "issues": [
    {
      "severity": "critical|major|minor",
      "category": "quality|security|performance|maintenance",
      "description": "问题描述",
      "suggestion": "修复建议",
      "location": "文件：行号"
    }
  ]
}
```

### 代码改进

```
根据以下审查意见改进代码：

原代码：{original_code}
审查意见：{review_comments}

要求:
1. 逐一修复所有问题
2. 保持原有功能不变
3. 不引入新的问题

返回改进后的完整代码。
```

## Git 提交规范

### 提交消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型定义

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式 |
| refactor | 重构 |
| test | 测试相关 |
| chore | 构建/工具 |

### 示例

```
feat(user): 添加用户注册功能

- 实现用户注册 API
- 添加邮箱验证
- 包含密码强度检查

Closes #123
```

## 配置模板

### 项目配置 `.claude/config.yaml`

```yaml
version: '1.0'

project:
  name: {project_name}
  type: {project_type}  # web|api|cli|library

quality:
  review_cycles: 3
  gates:
    code_quality: required
    test_coverage: required
    security: required
    performance: optional
    documentation: required

skills:
  enabled:
    - codeql
    - super-linter
  auto_run: false

memory:
  auto_save: true
  checkpoint_interval: 5
  max_checkpoints: 10

interrupt:
  graceful_timeout: 30
  auto_save: true
```

## 常用命令速查

```bash
# 快速开发
python3 driver.py develop "需求"

# 指定路径
python3 driver.py develop "需求" --path /path/to/project

# 指定 Claude
python3 driver.py develop "需求" --claude /path/to/claude

# 查看日志
cat .claude/logs/*.log

# 查看生成的文档
cat docs/01-REQUIREMENTS.md
cat docs/02-DESIGN.md
```
