# 部署到 Cloudflare Pages（GitHub 自动部署）

部署架构：本地写 Markdown / 改主页 → push 到 GitHub → Cloudflare Pages 自动拉取并构建 → 全球访问 + 自动 HTTPS。

当前站点结构：
- **主页**：`litmustz.pages.dev/`（静态 HTML + CSS + JS，项目入口）
- **博客**：`litmustz.pages.dev/blog/`（Hexo + Butterfly 子项目）

## 仓库结构

```
D:\Github\Blog/
├── index.html                 # 主页
├── assets/                    # 主页静态资源（css/js）
├── scripts/build.js           # 根构建脚本：构建博客 + 合并主页
├── .nvmrc                     # Node 22（Cloudflare 读取）
├── blog/                      # Hexo 博客完整目录
│   ├── _config.yml            # 已设置 root: /blog/
│   ├── package.json
│   ├── source/                # 展示层文章
│   ├── _source-archive/       # 原始素材库
│   └── ...
└── .workbuddy/memory/         # 项目记忆
```

## 构建命令（Cloudflare Pages 设置）

- **Framework preset**：None
- **Build command**：`node scripts/build.js`
- **Build output directory**：`public`
- **Root directory**：`/`
- **Production branch**：`main`

`scripts/build.js` 会先做 `cd blog && pnpm install && pnpm run build`，再把 `blog/public` 复制到 `public/blog/`，最后把主页文件复制到 `public/` 根目录。

## 日常流程

1. 写博客：在 `blog/source/_posts/` 新增 Markdown 文章（沿用双层架构：`blog/_source-archive/` 存素材）。
2. 改主页：编辑 `index.html` 或 `assets/`。
3. 本地预览：运行 `node scripts/build.js` 生成 `public/`，再启动静态服务器（如 `python -m http.server 4000`）。
4. 确认后 `git push origin main`，Cloudflare 自动构建上线。

## 注意事项

- **Node 版本**：仓库根 `.nvmrc` 为 `22`。Cloudflare 构建环境若报错，可改为 `20`。
- **pnpm 报错**：若 Cloudflare 对 pnpm 支持异常，可临时把 Build command 改成 `npx hexo generate` 相关命令，但优先保持 `node scripts/build.js`。
- **子域名已锁定**：Pages 项目名为 `litmustz`，网址 `https://litmustz.pages.dev/`。要换 `*.pages.dev` 必须删旧项目重建，由 AI 用 API 处理。
