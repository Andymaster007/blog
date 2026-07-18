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

## Cloudflare（用户授权 AI 全权自主管理 ✅ 已配置完成）
- 用户已注册 Cloudflare（邮箱 litmustz007@gmail.com，Account ID 88ce374c150524b4b9339242327d11f7）。
- **用户明确：把 Cloudflare 全权交给我**（部署/改设置/以后任何操作都由我调 API 完成，用户零操作）。
- 凭证存放：`C:\Users\Andy\.workbuddy\cloudflare.env`（**仅本地、不进 Git**；回收权限=删此文件 + Cloudflare 后台 Roll key）。当前有效 token：`cfut_...`（2026-07-18 经 /user/tokens/verify 验证 active）。
- **Pages 项目 `litmustz` 已用 API 创建并连 GitHub**（2026-07-18）：source=github 连 `Andymaster007/blog`，production_branch=main，build `pnpm run build`、输出 `public`、root `/`。
- **博客已上线**：**https://litmustz.pages.dev/**（外网可访问、自动 HTTPS）。
- ⚠️ **Cloudflare Pages 子域名在创建时锁定、改名不会改子域名**：要换 `*.pages.dev` 网址，必须删旧项目 + 用目标名重建（2026-07-18 已为此把 `blog`→`litmustz` 重建，旧 `blog-7d2.pages.dev` 已废弃）。
- 误建 Worker `blog` 已删（用 API DELETE）。
- 部署方式：AI 只 push GitHub → **Cloudflare 拉仓库自构建自动上线**（Git 集成 Pages）。每次 `git push main` → GitHub webhook 自动触发构建部署。
- 注：Cloudflare 连 GitHub 所需的 GitHub OAuth（Authorize GitHub）此前已由用户完成/已生效，故 AI 用 API 直接建项目即成功；若日后重连需用户在 Cloudflare 网页点一次。
- 排错：Node 看 `.nvmrc`(22)，报错改 20；pnpm 报错改 `npx hexo generate`（见 DEPLOY.md）。沙箱直连 `*.pages.dev` 偶发 HTTP 000，重试即 200。
