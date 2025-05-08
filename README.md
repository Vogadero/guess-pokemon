# 🎮 Guess Pokémon Game

[![Vue Version](https://img.shields.io/badge/Vue-3.5.13-brightgreen?logo=vue.js&logoColor=4FC08D)](https://vuejs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Dependency State](https://img.shields.io/badge/dependencies-checked-brightgreen)](https://github.com/Vogadero/guess-pokemon/network/dependencies) [![Test coverage](https://img.shields.io/badge/Test_Coverage-85%25-green?logo=jest)](https://vogadero.github.io/guess-pokemon/coverage) [![最新版本](https://img.shields.io/github/package-json/v/Vogadero/guess-pokemon/main)](https://github.com/Vogadero/guess-pokemon/blob/main/package.json) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![GitHub issues](https://img.shields.io/github/issues/Vogadero/guess-pokemon?logo=discogs)](https://github.com/Vogadero/guess-pokemon/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/Vogadero/guess-pokemon?logo=git)](https://github.com/Vogadero/guess-pokemon/commits/main) [![GitHub Actions](https://img.shields.io/github/actions/workflow/status/Vogadero/guess-pokemon/ci.yml?label=CI%2FCD&logo=githubactions)](https://github.com/Vogadero/guess-pokemon/actions) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Vogadero/guess-pokemon/ci.yml?logo=gitextensions)](https://github.com/Vogadero/guess-pokemon/actions/workflows/ci.yml) [![Security Status](https://snyk.io/test/github/Vogadero/guess-pokemon/badge.svg)](https://snyk.io/test/github/Vogadero/guess-pokemon) [![Security](https://img.shields.io/badge/Security-CodeQL%20%7C%20Snyk%20%7C%20Scorecard-blue?logo=securityscorecard)](SECURITY.md)

[![CodeQL](https://github.com/Vogadero/guess-pokemon/actions/workflows/codeql.yml/badge.svg)](https://github.com/Vogadero/guess-pokemon/actions/workflows/codeql.yml) [![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/10522/badge)](https://bestpractices.coreinfrastructure.org/projects/10522) [![OpenSSF Best Practices](https://img.shields.io/badge/OpenSSF_Best_Practices-Level_2-017CEE?logo=openssf)](https://github.com/ossf/best-practices) [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Vogadero/guess-pokemon/badge)](https://securityscorecards.dev/viewer/?uri=github.com/Vogadero/guess-pokemon) [![OpenSSF Scorecard](https://img.shields.io/ossf-scorecard/github.com/Vogadero/guess-pokemon)](https://github.com/Vogadero/guess-pokemon/security/code-scanning)


[![Slack](https://img.shields.io/badge/Slack-Join_Vogadero_Chat-4A154B?logo=slack)](https://join.slack.com/t/T08PVT37G4W/shared_invite/zt-34l17yfuq-40VKJO_bTcFyiFfFfNfbSw)


[![Codecov 覆盖率](https://img.shields.io/codecov/c/github/Vogadero/guess-pokemon?logo=codecov&style=flat-square)](https://codecov.io/gh/Vogadero/guess-pokemon)

![Game Screenshot](./docs/screenshot.gif)

English | [简体中文](./README.zh-CN.md)

A fun Pokémon guessing game built with Vue 3, challenge yourself to identify Pokémon by their silhouettes!

## 🌐 Live Demo
[Play Now](https://vogadero.github.io/guess-pokemon/) | [Mirror Link](https://mirror-demo-url.com)

## ✨ Features
- 🎯 Random Pokémon silhouette challenges
- 📊 Real-time win/loss statistics
- 🎉 Victory confetti animation
- 🖌️ Tailwind CSS powered UI
- ⚡ Vue 3 reactive game logic
- 🧪 Vitest unit testing

## 🛠️ Tech Stack
- **Framework**: Vue 3 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Animation**: Canvas Confetti
- **Testing**: Vitest + Vue Test Utils
- **Build**: Vite 6
- **Linting**: ESLint + Prettier

## 📜 Data Sources
- [PokeAPI](https://pokeapi.co/) - Pokémon metadata
- [Pokédex](https://www.pokemon.com/us/pokedex/) - Images & silhouettes
- Custom algorithm for question generation

All data used for educational purposes under [PokeAPI Fair Use Policy](https://pokeapi.co/docs/v2#fairuse)

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Testing

```bash
npm run test:unit
```

### Formatting

```bash
npm run format
```

## 📂 Project Structure

```markdown
guess-pokemon/
├── src/
│   ├── modules/          # Feature modules
│   ├── hooks/            # Custom hooks
│   ├── assets/           # Static assets
│   ├── App.vue           # Root component
│   └── main.ts           # Entry file
├── tailwind.config.js    # Tailwind config
└── vite.config.ts        # Vite config
```

## 🔍 Technical Implementation

```mermaid
graph TD
    A[Initialize Game] --> B[Fetch Random Pokémon]
    B --> C[Generate Options]
    C --> D{Player Choice}
    D -->|Correct| E[Play Victory Animation]
    D -->|Wrong| F[Reveal Answer]
    E --> G[Update Stats]
    F --> G
    G --> H[Next Round]
```

## 🌟 Key Features

1. **Architecture**:

   ```mermaid
   graph LR
       UI[Vue Components] --Events--> Logic[Game Hook]
       Logic --State--> Store[Reactive Store]
       Store --Updates--> UI
       API[PokeAPI] --Data Fetching--> Logic
   ```

2. **Game Logic**: `usePokemonGame` composition API

3. **Performance**: Dynamic loading + Web Workers

4. **Animations**: Canvas confetti effects

5. **Responsive Design**: Mobile-first layout

6. **Type Safety**: Strict TypeScript definitions

7. **Error Handling**: Three-level fallback system

8. **Accessibility**: Keyboard navigation & ARIA

## 🔧 Requirements

- Node.js 18+
- Recommended: pnpm

## 🚀 Automated Deployment
```mermaid
graph LR
    A[Code Push] --> B(GitHub Actions)
    B --> C{Branch Type}
    C -->|main| D[Build Production]
    C -->|dev| E[Build Test Version]
    D --> F[Deploy to GitHub Pages]
    E --> G[Generate Preview URL]
    F --> H[Slack Notification]
    G --> H
```

- **Key Features**:
  - **Dual-environment deployment**: main branch auto-deploys to production, dev branch generates preview links
  - **Smart caching**: Dependency caching accelerates CI workflows (≈40% build time reduction)
  - **Security checks**: Automatic dependency vulnerability scanning (npm audit)
  - **Notification system**: Deployment results sync to Slack channel in real-time

## ⚙️ Deployment Process
```bash
# Local development workflow
git checkout -b feat/new-feature   # Create feature branch
npm run dev                        # Local development

# Commit changes
git commit -m "feat: add new feature module"
git push origin feat/new-feature

# Automatically triggers after PR creation:
# 1. Unit Tests → 2. E2E Tests → 3. Security Scanning → 4. Preview Deployment
```

## 🧮 Quality Assurance

- **Code Standards**: ESLint + Prettier + Commitlint
- **Test Coverage**: 
  - Unit Testing: Vue component core logic (Vitest)
  - E2E Testing: Full user workflows (Cypress)
  - Visual Testing: Storybook component library
- **Security Scanning**: Dependabot + npm audit
- **Performance Monitoring**: Lighthouse CI integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feat/amazing-feature`)
5. Open Pull Request

## MIT License

Licensed under [MIT License](vscode-webview://0khkdn2j8525463bq40sgktn2gqlie9imkvuhie6p6fkhsp7guor/LICENSE)