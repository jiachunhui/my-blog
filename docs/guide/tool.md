---
group: 学习笔记
title: 开发工具设置
order: 1000
toc: content
---

## Vs Code

可以直接替换 vs code 本地的用户设置

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.fontLigatures": true,
  "editor.formatOnSave": false,
  "editor.guides.bracketPairs": "active",
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.tabSize": 2,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact",
    "html",
    "json",
    "jsonc"
  ],
  "files.associations": {
    "*.env.*": "dotenv"
  },
  "files.eol": "\n",
  "git.enableSmartCommit": true,
  "gutterpreview.paths": {
    "@": "/src",
    "~@": "/src"
  },
  "material-icon-theme.activeIconPack": "angular",
  "material-icon-theme.files.associations": {},
  "material-icon-theme.folders.associations": {
    "enum": "typescript",
    "enums": "typescript",
    "store": "context",
    "stores": "context",
    "composable": "hook",
    "composables": "hook",
    "directive": "tools",
    "directives": "tools",
    "business": "core",
    "request": "api",
    "adapter": "middleware"
  },
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src",
    "~@": "${workspaceFolder}/src"
  },
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.fontWeight": 500,
  "terminal.integrated.tabs.enabled": true,
  "workbench.iconTheme": "eq-material-theme-icons-palenight",
  "workbench.colorTheme": "One Dark Pro",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  }
}
```
