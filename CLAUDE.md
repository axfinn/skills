# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Claude Code Skills repository - a collection of reusable AI assistant skills. Skills are markdown files that provide domain-specific guidance and context when working with particular types of projects.

## Repository Structure

- Each skill resides in its own directory with a `SKILL.md` file
- Skills use frontmatter format with `name` and `description` fields
- Currently contains the `devtools` skill for DDD-based full-stack development

## Skill File Format

```markdown
---
name: skill-name
description: Brief description of when to use this skill
---

# Skill Content
```

## Installation Methods for Users

Skills can be installed via:
1. CLI command: `claude mcp add-skill https://github.com/axfinn/skills/tree/main/{skill-name}`
2. Manual copy to `.claude/skills/` directory
3. Git submodule

## Working with This Repository

When adding new skills:
1. Create a new directory for the skill
2. Add a `SKILL.md` file with proper frontmatter
3. Optionally add a `README.md` for installation instructions
4. Update the main `README.md` to list the new skill
