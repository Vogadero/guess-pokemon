# 🎮 Guess Pokémon Game

[![Vue Version](https://img.shields.io/badge/Vue-3.5.13-brightgreen?logo=vue.js&logoColor=4FC08D)](https://vuejs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![依赖状态](https://img.shields.io/badge/dependencies-checked-brightgreen)](https://github.com/Vogadero/guess-pokemon/network/dependencies) [![Test coverage](https://img.shields.io/badge/测试覆盖率-85%25-green?logo=jest)](https://vogadero.github.io/guess-pokemon/coverage) [![最新版本](https://img.shields.io/github/package-json/v/Vogadero/guess-pokemon/main)](https://github.com/Vogadero/guess-pokemon/blob/main/package.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

[![GitHub issues](https://img.shields.io/github/issues/Vogadero/guess-pokemon?logo=discogs)](https://github.com/Vogadero/guess-pokemon/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/Vogadero/guess-pokemon?logo=git)](https://github.com/Vogadero/guess-pokemon/commits/main) [![GitHub Actions](https://img.shields.io/github/actions/workflow/status/Vogadero/guess-pokemon/ci.yml?label=CI%2FCD&logo=githubactions)](https://github.com/Vogadero/guess-pokemon/actions) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Vogadero/guess-pokemon/ci.yml?logo=gitextensions)](https://github.com/Vogadero/guess-pokemon/actions/workflows/ci.yml) [![Security Status](https://snyk.io/test/github/Vogadero/guess-pokemon/badge.svg)](https://snyk.io/test/github/Vogadero/guess-pokemon) [![Security](https://img.shields.io/badge/Security-CodeQL%20%7C%20Snyk%20%7C%20Scorecard-blue?logo=securityscorecard)](./.github/SECURITY.md)

[![CodeQL](https://github.com/Vogadero/guess-pokemon/actions/workflows/codeql.yml/badge.svg)](https://github.com/Vogadero/guess-pokemon/actions/workflows/codeql.yml) [![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/10522/badge)](https://bestpractices.coreinfrastructure.org/projects/10522) [![OpenSSF Best Practices](https://img.shields.io/badge/OpenSSF_Best_Practices-Level_2-017CEE?logo=openssf)](https://github.com/ossf/best-practices) [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Vogadero/guess-pokemon/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Vogadero/guess-pokemon) [![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/Vogadero/guess-pokemon)](https://github.com/Vogadero/guess-pokemon/security/code-scanning)

[![Slack](https://img.shields.io/badge/Slack-Join_Vogadero_Chat-4A154B?logo=slack)](https://join.slack.com/t/T08PVT37G4W/shared_invite/zt-34l17yfuq-40VKJO_bTcFyiFfFfNfbSw) [![Codecov 覆盖率](https://codecov.io/gh/Vogadero/guess-pokemon/branch/main/graph/badge.svg)](https://codecov.io/gh/Vogadero/guess-pokemon)

![Game Screenshot](./docs/screenshot.gif) 

[English](./README.md) | 简体中文

一款基于Vue 3的趣味宝可梦猜谜游戏，通过识别剪影猜测正确的宝可梦，体验收集与挑战的乐趣！

## 🌐 在线演示
[立即体验](https://your-demo-url.com) | [备用链接](https://vogadero.github.io/guess-pokemon/)

## ✨ 功能亮点
- 🎯 随机生成宝可梦剪影挑战
- 📊 实时胜负统计系统
- 🎉 胜利烟花庆祝动画
- 🖌️ Tailwind CSS驱动的精美UI
- ⚡ Vue 3响应式游戏逻辑
- 🧪 Vitest单元测试覆盖

## 🛠️ 技术栈
- **前端框架**: Vue 3 + TypeScript
- **UI框架**: Tailwind CSS + PostCSS
- **动画库**: Canvas Confetti
- **测试框架**: Vitest + Vue Test Utils
- **构建工具**: Vite 6
- **代码规范**: ESLint + Prettier

## 📜 数据来源
本游戏使用以下数据源：
- [PokeAPI](https://pokeapi.co/)：获取宝可梦基础数据
- [Pokédex](https://www.pokemon.com/us/pokedex/)：宝可梦图像及剪影
- 自定义生成算法：动态生成题目组合

所有数据仅用于教育目的，遵循[PokeAPI使用条款](https://pokeapi.co/docs/v2#fairuse)

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 运行测试

```bash
npm run test:unit
```

### 代码格式化

```bash
npm run format
```

## 📂 项目结构

```markdown
guess-pokemon/
├── src/
│   ├── modules/          # 游戏功能模块
│   ├── hooks/            # 自定义Hook
│   ├── assets/           # 静态资源
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── tailwind.config.js    # Tailwind配置
└── vite.config.ts        # Vite配置
```

## 🔍 技术实现

```mermaid
graph TD
    A[初始化游戏] --> B[获取随机宝可梦]
    B --> C[生成题目选项]
    C --> D{玩家选择}
    D -->|正确| E[播放胜利动画]
    D -->|错误| F[显示正确答案]
    E --> G[更新胜率统计]
    F --> G
    G --> H[准备下一回合]
```

## 🌟 实现亮点

1. **架构设计**：

   ```mermaid
   graph LR
       UI[Vue组件] --事件--> Logic[游戏逻辑Hook]
       Logic --状态--> Store[响应式状态]
       Store --更新--> UI
       API[PokeAPI] --数据获取--> Logic
   ```
2. **游戏逻辑封装**：使用`usePokemonGame`组合式API管理游戏状态
3. **性能优化**：动态加载宝可梦数据 + 图片懒加载，添加Web Workers处理数据解析
4. **动画系统**：Canvas实现的胜利烟花效果
5. **响应式设计**：移动端优先的UI布局
6. **类型安全**：严格的TypeScript类型定义
7. **错误处理**：实现三级容错机制（本地缓存 → 镜像API → 静态数据）
8. **可访问性**：支持键盘操作和ARIA标签

## 🔧 环境配置

需要Node.js 18+ 环境，推荐使用pnpm作为包管理器

## 🚀 自动化部署
```mermaid
graph LR
    A[代码推送] --> B(GitHub Actions)
    B --> C{分支类型}
    C -->|main| D[构建生产包]
    C -->|dev| E[构建测试包]
    D --> F[部署到GitHub Pages]
    E --> G[生成预览URL]
    F --> H[Slack通知]
    G --> H
```
- **实现特性**：
  - **双环境部署**：main 分支自动部署到生产环境，dev 分支生成预览链接
  - **智能缓存**：依赖缓存加速 CI 流程（节省约 40% 构建时间）
  - **安全检测**：自动进行依赖漏洞扫描 (npm audit)
  - **通知系统**：部署结果实时同步至 Slack 频道

## ⚙️ 部署流程

```bash
# 本地开发流程
git checkout -b feat/new-feature   # 创建新特性分支
npm run dev                        # 本地开发

# 提交变更
git commit -m "feat: 添加新特性模块"
git push origin feat/new-feature

# 创建 PR 后自动触发：
# 1. 单元测试 → 2. E2E测试 → 3. 安全扫描 → 4. 部署预览环境
```

## 🧮 质量保障

- **代码规范**: ESLint + Prettier + Commitlint
- **测试覆盖**: 
  - 单元测试: Vue组件核心逻辑 (Vitest)
  - E2E测试: 完整用户流程 (Cypress)
  - 可视化测试: Storybook 组件库
- **安全扫描**: Dependabot + npm audit
- **性能监控**: Lighthouse CI 集成

## 🤝 贡献指南

1. Fork项目仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交Pull Request

## MIT License

本项目基于MIT许可证开源 - 详情请见[LICENSE](vscode-webview://0khkdn2j8525463bq40sgktn2gqlie9imkvuhie6p6fkhsp7guor/LICENSE)文件
