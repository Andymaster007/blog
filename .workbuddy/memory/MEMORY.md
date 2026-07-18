# 博客项目 · 长期约定（MEMORY.md）

## 项目定位
Andy（计算机学生）的个人成长博客，由 AI 助手**长期代运营**。用户只管口述心得，AI 负责整理、成文、发布。最终面向 HR 展示算法 / 游戏 / 金融 / 编程的成长轨迹。

## 技术栈（锁定）
- Hexo 8.x + Butterfly 主题，Markdown 写作。
- 代码托管 GitHub；部署用 Cloudflare Pages（连 GitHub 自动上线，免费 + 自动 HTTPS）。
- 本地预览：`npx hexo server`（默认 4000 端口）。

## ⚠️ 包管理硬性约定
- **本仓库必须用 pnpm 安装依赖，不要用 npm。** hexo init 生成的是 pnpm 结构的 node_modules，用 npm 装包会报 `Cannot read properties of null (reading 'matches')`。
- pnpm 路径：`/c/Users/Andy/AppData/Local/pnpm/pnpm`（系统 pnpm 10.33.2）。node 用 managed：`C:\Users\Andy\.workbuddy\binaries\node\versions\22.22.2\node.exe`。

## 双层内容架构（核心）
- **`_source-archive/<id>/{raw.md, meta.yml, assets/}`**：原始素材库（用户原话 + 原图 + 元信息）。不进 Hexo 构建，纳入 Git，是改版/再生成的唯一真相来源。
- **`source/_posts/<slug>.md`**：展示层成品，由 Hexo 构建成网页。
- 改版只动展示层；换主题/版面时从素材库重新生成，零丢失。
- 板块（categories）：算法心得 / 游戏项目 / 金融项目 / 编程技术杂谈。
- 文章模板：`scaffolds/post.md`（案例式结构）。

## 发布流程（半自动确认）
用户口述 → 存 `_source-archive` → 加工成 `source/_posts` → `hexo generate` + 本地预览确认 → 用户点头 → push GitHub → Cloudflare 自动上线。

## Git
- 默认分支 `main`；`.gitignore` 已忽略 `node_modules/`、`public/`。
- remote：`git@github.com:Andymaster007/blog.git`（**GitHub 用户名已确认 = Andymaster007**，2026-07-18 push 成功）。
- SSH key：`~/.ssh/id_ed25519`（公钥已加到 GitHub，之后免密 push）。
- 部署指南见仓库根 `DEPLOY.md`。

## Cloudflare
- 用户已注册 Cloudflare 账号，代码已 push 到 GitHub。
- 待用户在 Cloudflare Pages **连 GitHub 仓库 `blog`**（需网页 OAuth 授权，AI 无法代做）→ 自动部署（Build `pnpm run build` / 输出 `public`）。
- 构建坑：Node 版本看 `.nvmrc`(22)，报错改 20；pnpm 报错改 `npx hexo generate`。

## 待办
- Cloudflare Pages 连 GitHub 自动部署（网页操作）。
- 之后用户发心得 → 我写文 → 预览确认 → push 自动上线。
