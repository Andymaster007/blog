# 博客项目 · 长期约定（MEMORY.md）

## ⭐ AI 角色定位（菜头）—— 新对话先读这段
- 我是 **菜头**，Andy（GitHub: Andymaster007，香港大学计算机系 / 人工智能与数据科学）的**博客代运营 AI 助手**。
- 完整身份与端到端职责见用户级 `IDENTITY.md`（已固化，新会话自动注入）。
- 一句话：Andy 口述/他的 GitHub 项目 → 我存素材库、整理成文、本地预览 → 他确认 → 我 push → Cloudflare 自动上线。对外发布前必须等 Andy 确认。

## 项目定位
Andy（香港大学计算机系，人工智能与数据科学方向）的个人主页 + 博客组合站，由 **菜头（AI 助手）长期代运营**。对外网址 **https://litmustz.pages.dev/**：主页在 `/`，展示简介与项目卡片；博客子项目在 `/blog/`，继续用 Hexo 展示算法 / 游戏 / 金融 / 编程的成长轨迹。Andy 只管口述心得，菜头负责整理、成文、发布。

## 技术栈（锁定）
- Hexo 8.x + **Fluid 主题 1.9.9**（2026-07-18 由 Butterfly 5.6.0 切换，用户指定「博客采用 Fluid，按主题标准格式生成」），Markdown 写作（位于 `blog/` 子目录）。
- 主题配置：`blog/_config.fluid.yml`（覆盖层，仅设导航菜单 / 搜索 / 首页副标题 / 关于页；其余全用 Fluid 默认标准格式）。旧 `blog/_config.butterfly.yml` 已删除。
- 导航菜单（Fluid `navbar.menu`）：主页(`/`) / 归档(`/archives/`) / 分类(`/categories/`) / 个人主页(`https://litmustz.pages.dev/`，跳转回个人主页)。搜索= Fluid 原生 `search`（基于已装 hexo-generator-search 生成 `/search.xml`，导航栏自动出搜索框）。链接用根相对路径，Hexo 自动拼 `root:/blog/` 前缀。
- 主页：纯静态 HTML/CSS/JS，位于仓库根目录 `index.html` + `assets/` + `en/`。主页顶部导航保留「Blog」链接（**同标签页**跳转 `/blog/`，用户要求博客独立成页但仍可在主页进入）。主页「项目」区卡片（SDLSpaceShooter 等）点击进入 `projects/` 下的**独立项目详情页**（见下）。
- 代码托管 GitHub；部署用 Cloudflare Pages（连 GitHub 自动上线，免费 + 自动 HTTPS）。
- 构建：根目录 `node scripts/build.js` 会先在 `blog/` 运行 Hexo（`pnpm run build` = `hexo clean && hexo generate`，见下「⚠️ 博客构建坑」），生成到 `public/blog/`，再把主页文件与 `projects/`、`en/projects/`、`assets/` 复制到 `public/`；最终 `public/` = 主页 + 博客 + 项目详情页。⚠️ 切换主题后若报 `entities`/`htmlparser2` 的 `exports` 冲突，执行 `cd blog && rm -rf node_modules pnpm-lock.yaml && pnpm install` 干净重装即可（pnpm 10.33.2 + hoisted linker）。
- 本地预览：先 `node scripts/build.js` 生成 `public/`，再 `cd public && python -m http.server 4000`。
- **独立项目详情页**：个人主页「项目」区卡片点击进入 `projects/<slug>.html`（中文）与 `en/projects/<slug>.html`（英文），配图放 `assets/projects/<slug>/`。首页卡片在 `index.html`/`en/index.html` 里写成 `<a href="/projects/...">`，详情页共用 `assets/css/style.css` 并新增了 `.detail-*` 样式。**SDLSpaceShooter 的整体介绍已放在这里**（中英文各一页），不再进博客。TermPoker / HKU-MyGo 暂为占位卡片（`card-placeholder`，未链接）。
- ⚠️ **博客构建坑（重要）**：`blog/package.json` 的 `build` 已改为 `hexo clean && hexo generate`。原因：① Cloudflare Pages 构建缓存会保留旧的 `db.json`/`public`，导致「删掉的文章」线上仍残留 → `hexo clean` 从零生成可彻底解决；② Fluid 主题自带 `scripts/generators/index-generator.js` 覆盖默认首页生成，且 **hexo 在 0 篇文章时不会生成 `index.html` 与 `archives/`**（博客首页会 404）。因此**博客必须至少保留 1 篇文章**，否则 `/blog/` 打不开。当前保留「博客开通，先说几句」(分类 `随笔`) 作为占位/开篇。
- 注：用户曾草拟 Gitee + 腾讯云 Lighthouse + Nginx + Ubuntu 的部署方案，但仅作决策笔记，**未实施**；线上部署维持 Cloudflare Pages + GitHub。

## ⚠️ 项目详情页配图显示规则（必守）
- **配图必须完整显示，绝不裁切**。详情页顶部配图（`.detail-cover`）原用 `object-fit: cover` 会把超出部分裁掉（如 SDLSpaceShooter 飞船图下半截被截，用户 2026-07-18 指出），已改为：外层 `.detail-cover-wrap` 作占位框（桌面 `height:420px`、移动端 `280px`），内层 `<img class="detail-cover">` 设 `max-width:80%; max-height:80%; object-fit:contain; width/height:auto`，flex 居中。
- **规则（以后所有顶部配图都照此）**：图片完整可见、保持比例不变形、最多占占位框 80%、居中、四周自然留白。严禁再用 `object-fit: cover` 或 `width:100%+固定高` 导致裁切。
- 涉及文件：`assets/css/style.css`（`.detail-cover-wrap` / `.detail-cover`）、`projects/*.html`、`en/projects/*.html`。

## ⚠️ 包管理硬性约定
- **本仓库必须用 pnpm 安装依赖，不要用 npm。** hexo init 生成的是 pnpm 结构的 node_modules，用 npm 装包会报 `Cannot read properties of null (reading 'matches')`。
- pnpm 路径：`/c/Users/Andy/AppData/Local/pnpm/pnpm`（系统 pnpm 10.33.2）。node 用 managed：`C:\Users\Andy\.workbuddy\binaries\node\versions\22.22.2\node.exe`。

## ⚠️ Hexo 永久链接时区坑（已踩，必守）
- 现象：Cloudflare 构建机是 **UTC**，本地是 **GMT+8**。`_config.yml` 已设 `timezone: Asia/Shanghai`，但 Hexo 生成 `:year/:month/:day` 永久链接时，把只有日期的 `date: 2026-07-05`（按当天 00:00 算）解析成 `07-04 16:00 UTC`，线上 URL 变成 `07/04`，与本地预览 `07/05` 差一天，导致文章线上在但本地查不到（404 兜底页）。
- **铁律：文章 front-matter 的 `date` / `updated` 必须带具体时间**，如 `2026-07-05 12:00:00`（正午），保证任一端格式化都落在同一天。模板 `scaffolds/post.md` 已加警告注释。
- 线上验证技巧：别只 curl 自己推断的 URL；从首页 HTML 抠 `href` 拿真实链接，或直接查 Cloudflare API `/pages/projects/litmustz/deployments` 确认 `latest_stage: success` 与 commit hash。

## 对外呈现约定（必守）
- **内部 vs 对外要分清**：配置文件（IDENTITY.md / SOUL.md / 本文件）内部如实记录「菜头是 Andy 的博客代运营 AI」；但**任何对外的产出都不得暴露此身份**。
- Andy 明确要求：**博客与主页对外不出现「菜头 / AI 助手 / 代运营」任何影子**，一律呈现为 Andy 独立完成的个人作品（面向 HR 的作品集）。
- 已清除：`source/about/index.md` 第 24 行改为「由我独立运营与维护…」；`source/_posts/2026-07-18-blog-setup.md` 全文去除「代运营 / 口述给 AI / AI 打理」等表述，改为「我自己打理 / 记录」。
- **写新文章、改关于页时，一律用 Andy 第一人称（「我做了…」「我整理了…」），不得出现代运营、AI 帮我等字眼。** 素材库 `_source-archive/` 内部的 raw.md/meta.yml 可保留原始记录（不对外，不进 Hexo 构建）。
- 站点 `_config.yml` 的 subtitle/description 保持中性，勿添加 AI 相关字样。

## 双层内容架构（核心）
- **`blog/_source-archive/<id>/{raw.md, meta.yml, assets/}`**：原始素材库（已随博客迁移到 `blog/` 子目录）。不进 Hexo 构建，纳入 Git，是改版/再生成的唯一真相来源。
- **`blog/source/_posts/<slug>.md`**：展示层成品，由 Hexo 构建成网页。
- 改版只动展示层；换主题/版面时从素材库重新生成，零丢失。
- 博客板块（categories）：**不再固定「项目/心得」两大分类**（已从导航移除）。博客定位 = 放「跟项目有关的其他东西」——开发日志、某个难点的解法、技术深挖、复盘，区别于放在个人主页项目页的「项目整体介绍」。首篇文章为「博客开通，先说几句」（分类 `随笔`）。文章分类自由，不强行约束。
- 文章模板：`scaffolds/post.md`（案例式结构）。

## 发布流程（半自动确认）
用户口述 → 存 `blog/_source-archive` → 加工成 `blog/source/_posts` → 运行 `node scripts/build.js` 生成 `public/` + 本地预览确认 → 用户点头 → push GitHub → Cloudflare 自动上线。

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
