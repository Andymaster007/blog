# 部署到 Cloudflare Pages（GitHub 自动部署）

部署架构：本地写 Markdown → push 到 GitHub → Cloudflare Pages 自动拉取并构建 → 全球访问 + 自动 HTTPS。

> 当前 git remote 已指向 `git@github.com:Andymaster007/blog.git`（用户名按本机 git 配置假设为 `Andymaster007`，若实际不同，改一行：`git remote set-url origin git@github.com:<真实用户名>/blog.git`）。

## 一、你只需做 2 件网页操作（一次性）

### 操作 1：把 SSH 公钥加到 GitHub（之后我就能免密推送）
1. 打开 https://github.com/settings/ssh/new
2. Title 随便填（如 `Blog-PC`）
3. Key 文本框粘贴下面这串公钥：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH751CB/v7etqpcWPU3soaacbWufxbYnJfzLc1LmoBnS Andymaster@126.com
```
4. 点 **Add SSH key**

### 操作 2：新建一个名为 `blog` 的空仓库
1. 打开 https://github.com/new
2. Repository name 填 `blog`
3. 其余保持默认（**不要**勾 Add README / .gitignore / license，保持空仓库）
4. 点 **Create repository**

## 二、之后交给我（你不用动）
你做完上面两步，告诉我一声，我会执行：
```
git push -u origin main
```
把代码推上去（含 `_source-archive/` 素材库 + `source/_posts/` 文章 + 主题配置 `_config.butterfly.yml`）。

## 三、在 Cloudflare 连接 GitHub（也是网页操作，push 之后做）
1. 登录 Cloudflare → 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权连接你的 GitHub 账号（弹窗里点授权）
3. 仓库列表选 **blog**
4. 构建设置填：
   - Framework preset：**None（无）**
   - Build command：`pnpm run build`
   - Build output directory：`public`
   - Root directory：默认 `/`（不动）
5. 点 **Save and Deploy**

部署成功后会得到一个 `*.pages.dev` 网址，之后每次 `git push` 到 `main` 都会自动重新构建上线。

## 四、日常发文章流程
你只管把心得发给我 → 我存素材库 + 写文章 + 本地预览给你确认 → 你点头 → 我 `git push` → Cloudflare 几十秒后自动上线。

## 五、可能踩的坑
- **Node 版本报错**：把仓库根目录 `.nvmrc` 里的 `22` 改成 `20` 再 push（Cloudflare 构建环境若没有 Node 22 时会用到）。
- **pnpm 构建报错**：把 Build command 改为 `npx hexo generate` 再部署。
- **Cloudflare 连不上 GitHub 仓库**：确认仓库名确实是 `blog`、且已成功 push 了一次代码（空仓库不会被列出）。
