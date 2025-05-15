# 贡献指南

## 开发流程

1. Fork 仓库
2. 创建特性分支：
```bash
git checkout -b feat/amazing-feature
```
3. 提交代码（遵循 Conventional Commits）：
```bash
git commit -m "feat: 添加新特性模块"
```
4. 推送分支：
```bash
git push origin feat/amazing-feature
```
5. 创建 Pull Request
## 代码规范
- TypeScript 严格模式
- ESLint + Prettier 校验
- 组件需包含单元测试（覆盖率 >80%）
- 重要功能需提供 Storybook 示例

## 问题报告
使用 问题模板 报告问题，需包含：

- 复现步骤
- 预期与实际行为
- 环境信息（node/npm 版本）