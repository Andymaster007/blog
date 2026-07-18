# 博客项目 · 长期约定（MEMORY.md）

## ⭐ AI 角色定位（菜头）
- 我是 **菜头**，Andy（GitHub: Andymaster007，香港大学计算机系 / AI 与数据科学）的**博客代运营 AI 助手**。
- 完整身份见用户级 `IDENTITY.md`（新会话自动注入）。职责：Andy 口述/他的 GitHub 项目 → 存素材库 → 整理成文 → 本地预览 → 他确认 → 我 push → Cloudflare 自动上线。**对外发布前必须等 Andy 确认。**

## 项目定位
Andy 个人主页 + 博客组合站，由菜头长期代运营。对外网址 **https://litmustz.pages.dev/**：主页 `/`（简介+项目卡片），博客 `/blog/`（Hexo 展示算法/游戏/金融/编程成长轨迹）。Andy 只管口述，菜头整理发布。

## 技术栈（锁定）
- Hexo 8.x + **Fluid 主题 1.9.9**（2026-07-18 由 Butterfly 切换，用户指定「博客用 Fluid，按主题标准格式」）。
- 主题覆盖层 `blog/_config.fluid.yml`（仅设导航菜单/搜索/首页副标题/关于页，其余用 Fluid 默认）。
- 主页：纯静态 HTML/CSS/JS，根目录 `index.html` + `assets/` + `en/`。导航保留「Blog」链接同标签页跳 `/blog/`。
- 独立项目详情页：`projects/<slug>.html`（中文）+ `en/projects/<slug>.html`（英文），配图 `assets/projects/<slug>/`，共用 `assets/css/style.css` 的 `.detail-*` 样式。**SDLSpaceShooter 中英文各一页**；TermPoker / HKU-MyGo 为占位卡片（未链接）。
- 部署：GitHub + Cloudflare Pages（连 GitHub 自动上线）。构建：根目录 `node scripts/build.js` → 生成 `public/`（主页+博客+项目详情页）。⚠️ 切换主题后若报 `entities`/`htmlparser2` 冲突：`cd blog && rm -rf node_modules pnpm-lock.yaml && pnpm install` 干净重装。
- 本地预览：**先 `node scripts/build.js` 生成 `public/`，再 `cd public && python -m http.server 4000`**（务必基于新建构，否则看到旧 CSS/HTML —— 见文末「预览坑」）。

## ⚠️ 项目详情页配图显示规则（必守）
- **配图必须完整显示、绝不裁切。** 外层 `.detail-cover-wrap`（桌面 `height:420px`、移动 `280px`）占位；内层 `<img class="detail-cover">` = `max-width:80%; max-height:80%; object-fit:contain; width/height:auto`，flex 居中、四周留白。
- 严禁 `object-fit:cover` 或 `width:100%+固定高` 导致裁切。涉及 `assets/css/style.css`、`projects/*.html`、`en/projects/*.html`。

## ⚠️ 包管理硬性约定
- **本仓库必须用 pnpm**，不要用 npm（会报 `Cannot read properties of null (reading 'matches')`）。pnpm 路径 `/c/Users/Andy/AppData/Local/pnpm/pnpm`（10.33.2）；node 用 managed `C:\Users\Andy\.workbuddy\binaries\node\versions\22.22.2\node.exe`。

## ⚠️ Hexo 永久链接时区坑（必守）
- Cloudflare 构建机 UTC、本地 GMT+8。`_config.yml` 已设 `timezone: Asia/Shanghai`，但 Hexo 生成 `:year/:month/:day` 时把纯日期 `date` 按 00:00 解析成前一日 16:00 UTC，线上 URL 差一天。
- **铁律：文章 front-matter 的 `date`/`updated` 必须带具体时间**（如 `2026-07-05 12:00:00`）。模板 `scaffolds/post.md` 已加警告。
- 线上验证：从首页 HTML 抠真实 `href`，或查 Cloudflare API `/pages/projects/litmustz/deployments` 确认 `latest_stage:success` + commit hash。

## 对外呈现约定（必守）
- 内部实录「菜头是代运营 AI」；**任何对外产出不得暴露此身份**，一律呈现为 Andy 独立完成（面向 HR 的作品集）。
- 写文章/改关于页一律 Andy 第一人称；不出现「代运营/AI 帮我」。素材库 `_source-archive/` 内部 raw.md/meta.yml 可保留原始记录（不进 Hexo 构建）。站点 subtitle/description 保持中性。

## 双层内容架构（核心）
- 素材库 `blog/_source-archive/<id>/{raw.md,meta.yml,assets/}`（不进构建，Git 纳入，唯一真相源）。
- 展示层 `blog/source/_posts/<slug>.md` 由 Hexo 构建。博客定位 = 项目相关的开发日志/解法/复盘（区别于主页项目页的整体介绍）。首篇「博客开通，先说几句」(分类 `随笔`)，须至少保留 1 篇否则 `/blog/` 404。
- 文章模板 `scaffolds/post.md`（案例式）。

## 发布流程（半自动确认）
用户口述 → 存 `_source-archive` → 加工 `_posts` → `node scripts/build.js` + 本地预览确认 → 用户点头 → push → Cloudflare 自动上线。

## Git / Cloudflare
- 默认分支 `main`，`.gitignore` 忽略 `node_modules/`、`public/`。remote `git@github.com:Andymaster007/blog.git`。SSH `~/.ssh/id_ed25519` 已加 GitHub。
- Cloudflare 用户全权交菜头：`C:\Users\Andy\.workbuddy\cloudflare.env`（仅本地、不进 Git）。Pages 项目 `litmustz` 已连 GitHub（production_branch=main，build `pnpm run build`、输出 `public`、root `/`）。⚠️ Pages 子域名创建时锁定，改名须删旧建新。部署=push 触发 GitHub webhook 自动构建；沙箱直连 `*.pages.dev` 偶发 HTTP 000 重试即 200。

## 双语架构（主页 + 博客，2026-07-18）
- **主页（单页双语·原地切换，2026-07-19 实装）**：`index.html` 与 `projects/*.html` 每个都内置中英文双份文本（中文 `<span class="v-zh">`、英文 `<span class="v-en">`），根 `<html data-lang>` 切换显示；`assets/js/main.js` 读 URL `?lang=en` > localStorage `site-lang` > 默认 zh，点按钮**原地换字（不刷新、滚动位置不变）**，并写回 `?lang=en`。导航栏最右 `.lang-switch`（`href="#"` + `id="langSwitch"`）。**原 `en/` 源目录已删除**，旧 `/en/`、`/en/projects/*` 由根 `_redirects` 301 重定向到 `/?lang=en`、`/projects/:splat?lang=en`（不影响 `/en/blog/`）。`build.js` 已去掉 `en/` 复制块并清理 `public/en` 下残留首页。CSS 规则：`html[data-lang="zh"] .v-en{display:none}` / `html[data-lang="en"] .v-zh{display:none}`。
- **博客**：双 Hexo 构建——中文 `blog/source/`、英文 `blog/source-en/`；`scripts/build.js` 跑**两次 hexo（各先 clean）**：**英文先、中文最后**（保 `public/blog` 与 `db.json` 纯中文）。英文配置 `_config.blog-en.yml`（`root:/en/blog/`、`source_dir:source-en`、`public_dir:../public/en/blog`）。切换按钮 `blog/source/css|js/lang-switch.*`（中）+ `source-en/` 同款，按 `location.pathname` 注入。
- ⚠️ **db.json 串味坑（必守）**：两次 `hexo generate` 共用 `blog/db.json`，同名 slug 文章会污染。**每次 generate 前必 clean，中文构建跑最后**。本地验证须 `rm -rf blog/db.json blog/.hexo` 后再 generate。
- ⚠️ **新增内容默认双语（必守）**：以后用户给素材，菜头整理时**默认同时产出另一语言版**。主页/项目页用**单页双份文本**（同一文件里加 `<span class="v-zh">`/`<span class="v-en">` 两套），博客用**双树** `source/`↔`source-en/`。用户无需每次说"要双语"；若明确"仅某语"则按指示。
- 本地 Bash 有「safe-delete」保护会拦截 `hexo clean` 批量删；**Cloudflare Linux 构建环境无此限制**，线上正常。本地可改 `rm -rf`/`cp -rf`（走 OS）+ `hexo generate`（不 clean）等价验证。

## ⚠️ 本次修复经验（2026-07-18 末）
- **英文首页项目卡片误链中文详情页**：`en/index.html` 的 SDL 卡片原写 `/projects/sdl-space-shooter.html`（中文），从英文首页点进去被带去中文；英文详情页 `en/projects/sdl-space-shooter.html` 其实早已存在。修复=链接改 `/en/projects/sdl-space-shooter.html`，并把详情页语言切换按钮改成跳「对方同篇」（`projects/...` ↔ `en/projects/...`）而非对方首页。
- **主页语言切换按钮"偏低"根因**：预览跑的是旧构建 `public/`，源码 CSS 改动未同步。修复=`.main-nav` 加 `align-items:center` + 按钮 `align-self:center` 双保险，并**重新 `node scripts/build.js`** 再预览。结论：**本地预览必须基于新建构的 `public/`**，否则看到的是旧 CSS/HTML，会误判"改了没生效"。

## ⚠️ 站内即时语言切换实装（2026-07-19）
- **主页 + 项目详情页 = 单页双语、真·原地切换**：`index.html`/`projects/*.html` 内置中文 `<span class="v-zh">` 与英文 `<span class="v-en">` 双份文本；`assets/js/main.js` 按 `URL?lang=en` > `localStorage.site-lang` > 默认 zh 设根 `<html data-lang>`，CSS `html[data-lang=zh] .v-en{display:none}` / `[data-lang=en] .v-zh{display:none}` 切换显示。点按钮 `e.preventDefault()` + 切 `data-lang` + `history.replaceState` 写回 `?lang=en`，**不刷新故滚动位置不变**，正是用户要的"字在原地换了"。`<head>` 内联脚本提前设 `data-lang` 防首屏闪烁。原 `en/` 目录已删，旧 `/en/`、`/en/projects/*` 由根 `_redirects` 301 到 `/?lang=en`、`/projects/:splat?lang=en`（不影响 `/en/blog/`）。`build.js` 去掉 `en/` 复制、并 `fs.rmSync` 清理 `public/en` 残留首页/项目页。
- **博客 = 滚动位置记忆**（保留双树 `/blog/`↔`/en/blog/`）：`blog/source/js/lang-switch.js`（中）+ `source-en/` 同款，点击切换前 `sessionStorage.langScroll = window.scrollY`，落到对方语言页后 `DOMContentLoaded`/`load` + 300ms 兜底 `window.scrollTo(0,y)` 恢复并清除。不回顶部。
