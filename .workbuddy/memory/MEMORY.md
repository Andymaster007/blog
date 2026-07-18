# 博客项目 · 长期约定（MEMORY.md）

## ⭐ AI 角色定位（菜头）—— 新对话先读这段
- 我是 **菜头**，Andy（GitHub: Andymaster007，香港大学计算机系 / 人工智能与数据科学）的**博客代运营 AI 助手**。
- 完整身份与端到端职责见用户级 `IDENTITY.md`（已固化，新会话自动注入）。
- 一句话：Andy 口述/他的 GitHub 项目 → 我存素材库、整理成文、本地预览 → 他确认 → 我 push → Cloudflare 自动上线。对外发布前必须等 Andy 确认。

## 项目定位
Andy（香港大学计算机系，人工智能与数据科学方向）的个人成长博客，由 **菜头（AI 助手）长期代运营**。Andy 只管口述心得，菜头负责整理、成文、发布。最终面向 HR 展示算法 / 游戏 / 金融 / 编程的成长轨迹。对外网址 **https://litmustz.pages.dev/**。

## 技术栈（锁定）
- Hexo 8.x + Butterfly 主题，Markdown 写作。
- 代码托管 GitHub；部署用 Cloudflare Pages（连 GitHub 自动上线，免费 + 自动 HTTPS）。
- 本地预览：`npx hexo server`（默认 4000 端口）。

## ⚠️ 包管理硬性约定
- **本仓库必须用 pnpm 安装依赖，不要用 npm。** hexo init 生成的是 pnpm 结构的 node_modules，用 npm 装包会报 `Cannot read properties of null (reading 'matches')`。
- pnpm 路径：`/c/Users/Andy/AppData/Local/pnpm/pnpm`（系统 pnpm 10.33.2）。node 用 managed：`C:\Users\Andy\.workbuddy\binaries\node\versions\22.22.2\node.exe`。

## ⚠️ Hexo 永久链接时区坑（已踩，必守）
- 现象：Cloudflare 构建机是 **UTC**，本地是 **GMT+8**。`_config.yml` 已设 `timezone: Asia/Shanghai`，但 Hexo 生成 `:year/:month/:day` 永久链接时，把只有日期的 `date: 2026-07-05`（按当天 00:00 算）解析成 `07-04 16:00 UTC`，线上 URL 变成 `07/04`，与本地预览 `07/05` 差一天，导致文章线上在但本地查不到（404 兜底页）。
- **铁律：文章 front-matter 的 `date` / `updated` 必须带具体时间**，如 `2026-07-05 12:00:00`（正午），保证任一端格式化都落在同一天。模板 `scaffolds/post.md` 已加警告注释。
- 线上验证技巧：别只 curl 自己推断的 URL；从首页 HTML 抠 `href` 拿真实链接，或直接查 Cloudflare API `/pages/projects/litmustz/deployments` 确认 `latest_stage: success` 与 commit hash。

## 对外呈现约定（必守）
- Andy 明确要求：**博客与主页对外不出现「菜头 / AI 助手 / 代运营」任何影子**，一律呈现为 Andy 独立完成的个人作品（面向 HR 的作品集）。
- 已清除：`source/about/index.md` 第 24 行改为「由我独立运营与维护…」；`source/_posts/2026-07-18-blog-setup.md` 全文去除「代运营 / 口述给 AI / AI 打理」等表述，改为「我自己打理 / 记录」。
- **写新文章、改关于页时，一律用 Andy 第一人称（「我做了…」「我整理了…」），不得出现代运营、AI 帮我等字眼。** 素材库 `_source-archive/` 内部的 raw.md/meta.yml 可保留原始记录（不对外，不进 Hexo 构建）。
- 站点 `_config.yml` 的 subtitle/description 保持中性，勿添加 AI 相关字样。

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

## Cloudflare（用户授权菜头全权自主管理 ✅ 已配置完成）
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
