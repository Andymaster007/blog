# 部署到 Cloudflare Pages（GitHub 自动部署）

部署架构：本地写 Markdown → push 到 GitHub → Cloudflare Pages 自动拉取并构建 → 全球访问 + 自动 HTTPS。

> 当前 git remote 已指向 `git@github.com:Andymaster007/blog.git`（用户名已确认 = Andymaster007）。代码已 push 到 `main`，SSH 公钥已加、空仓库已建。**以下步骤只剩 Cloudflare 连接这一步。**

## 一、已完成的准备（无需重做）
- ✅ GitHub SSH 公钥已添加，可免密推送
- ✅ 空仓库 `blog` 已建好
- ✅ 代码已 `git push` 到 `main`（含 `_source-archive/` 素材库 + `source/_posts/` 文章 + 主题配置 `_config.butterfly.yml`）
- ✅ 已移除 wrangler 直传方案，部署走「GitHub 集成 Pages」（Cloudflare 拉仓库自构建）

## 二、你只需做 1 件网页操作：在 Cloudflare 连接 GitHub（一次性）
1. 登录 Cloudflare → 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 点 **Authorize GitHub**（弹窗里登录 `Andymaster007` 的 GitHub 账号并授权）
3. 仓库列表选 **blog**
4. 构建设置填：
   - Framework preset：**None（无）**
   - Build command：`pnpm run build`
   - Build output directory：`public`
   - Root directory：默认 `/`（不动）
   - Production branch：`main`
5. 点 **Save and Deploy**

> **同名冲突**：你之前误建过一个 Worker `blog.litmustz007.workers.dev`，若 Pages 项目名 `blog` 因此不让用，就填 **`blog-site`** 或 **`andy-blog`**（网址变 `blog-site.pages.dev`，功能一样）。那个 Worker 可在其 Settings 里删掉，不删也不碍事。

部署成功后会得到一个 `*.pages.dev` 网址，之后每次 `git push` 到 `main` 都会自动重新构建上线。**无需任何 Cloudflare API Token**——GitHub 授权是在网页点出来的 OAuth，token 替代不了也用不上。

## 四、日常发文章流程
你只管把心得发给我 → 我存素材库 + 写文章 + 本地预览给你确认 → 你点头 → 我 `git push` → Cloudflare 几十秒后自动上线。

## 五、可能踩的坑
- **Node 版本报错**：把仓库根目录 `.nvmrc` 里的 `22` 改成 `20` 再 push（Cloudflare 构建环境若没有 Node 22 时会用到）。
- **pnpm 构建报错**：把 Build command 改为 `npx hexo generate` 再部署。
- **Cloudflare 连不上 GitHub 仓库**：确认仓库名确实是 `blog`、且已成功 push 了一次代码（空仓库不会被列出）。
