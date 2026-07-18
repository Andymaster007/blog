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

// 1. 构建博客
run('pnpm install', blogDir);
run('pnpm run build', blogDir);

// 2. 清理并创建根 public
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir, { recursive: true });

// 3. 复制博客输出到 public/blog
fs.cpSync(path.join(blogDir, 'public'), path.join(publicDir, 'blog'), { recursive: true });

// 4. 复制主页静态文件
fs.cpSync(path.join(rootDir, 'assets'), path.join(publicDir, 'assets'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(publicDir, 'index.html'));

// 5. 复制英文主页
const enDir = path.join(rootDir, 'en');
if (fs.existsSync(enDir)) {
  fs.cpSync(enDir, path.join(publicDir, 'en'), { recursive: true });
}

console.log('\n✅ Build complete: public/');
console.log('  - public/index.html (中文)');
console.log('  - public/en/index.html (English)');
console.log('  - public/assets/');
console.log('  - public/blog/');
