#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const blogDir = path.join(rootDir, 'blog');
const publicDir = path.join(rootDir, 'public');

function run(cmd, cwd) {
  console.log(`> ${cmd} (cwd: ${cwd || rootDir})`);
  execSync(cmd, { cwd: cwd || rootDir, stdio: 'inherit' });
}

// 1. 安装依赖
run('pnpm install', blogDir);

// 1.5 先构建英文博客（clean + generate，输出到 ../public/en/blog）
//     注意：英文构建会改写共享的 db.json，必须 clean 避免残留中文缓存；
//     同时中文构建放在最后跑，保证最终 public/blog 与 db.json 一定是中文。
run('pnpm exec hexo --config _config.yml,_config.blog-en.yml clean', blogDir);
run('pnpm exec hexo --config _config.yml,_config.blog-en.yml generate', blogDir);
console.log('  - public/en/blog/ (English)');

// 1.6 最后构建中文博客（clean + generate，输出到 ../public/blog）
//     中文的 public_dir 是 public/blog，hexo clean 只会删 public/blog 与 db.json，
//     不会误删 public/en/blog；跑在最后确保 db.json 最终为纯中文。
run('pnpm exec hexo clean', blogDir);
run('pnpm exec hexo generate', blogDir);
console.log('  - public/blog/ (中文)');

// 2. 确保根 public 目录存在
fs.mkdirSync(publicDir, { recursive: true });

// 2.5 清理旧的英文静态首页（已合并进单页，避免 public/en/index.html、public/en/projects 残留）
//    注意：博客的 public/en/blog 由 hexo 重新生成，不受此影响。
fs.rmSync(path.join(publicDir, 'en', 'index.html'), { force: true });
fs.rmSync(path.join(publicDir, 'en', 'projects'), { recursive: true, force: true });

// 3. 复制主页静态文件到根 public（覆盖）
fs.cpSync(path.join(rootDir, 'assets'), path.join(publicDir, 'assets'), { recursive: true, force: true });
fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(publicDir, 'index.html'));

// 4.5 复制项目详情页到根 public（覆盖）
const projectsDir = path.join(rootDir, 'projects');
if (fs.existsSync(projectsDir)) {
  fs.cpSync(projectsDir, path.join(publicDir, 'projects'), { recursive: true, force: true });
}

// 5. 复制 Cloudflare Pages _redirects（如存在）
const redirectsFile = path.join(rootDir, '_redirects');
if (fs.existsSync(redirectsFile)) {
  fs.copyFileSync(redirectsFile, path.join(publicDir, '_redirects'));
}

console.log('\n✅ Build complete: public/');
console.log('  - public/index.html (中文)');
console.log('  - public/en/index.html (English)');
console.log('  - public/assets/');
console.log('  - public/projects/ (项目详情页)');
console.log('  - public/blog/ (中文博客)');
console.log('  - public/en/blog/ (English blog)');
