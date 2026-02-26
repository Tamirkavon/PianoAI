---
description: Commit and push the current project to GitHub (Tamirkavon)
allowed-tools: Bash(git:*)
---

# Git Push Protocol

## Configuration
- **Username:** Tamirkavon
- **Repository Detection:** The current working directory name IS the repository name. Do not ask the user for this information.

## Step-by-Step Instructions
When triggered, you must generate a single, executable bash block. Do not provide explanations unless an error is detected.

1. **Verify Git Initialization:**
   `git init` (Only if .git folder is missing)
2. **Stage Changes:**
   `git add .`
3. **Create Commit:**
   `git commit -m "Update: $(date +'%Y-%m-%d %H:%M:%S')"`
4. **Set Remote:**
   `git remote add origin https://github.com/Tamirkavon/$(basename "$PWD").git 2>/dev/null || git remote set-url origin https://github.com/Tamirkavon/$(basename "$PWD").git`
5. **Push to Main:**
   `git branch -M main`
   `git push -u origin main`

## Success Criteria
- The output must be a single code block.
- There must be no placeholders like `[REPO_NAME]` in the final command; use shell substitution like `$(basename "$PWD")` or the literal folder name.
- If the push fails due to authentication, remind the user to ensure their GitHub Token or SSH Key is active in their terminal.
