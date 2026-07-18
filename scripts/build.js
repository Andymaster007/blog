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

// 1. 构建博客（Hexo 输出到 ../public/blog）
run('pnpm install', blogDir);
run('pnpm run build', blogDir);

// 2. 确保根 public 目录存在
fs.mkdirSync(publicDir, { recursive: true });

// 3. 复制主页静态文件到根 public（覆盖）
fs.cpSync(path.join(rootDir, 'assets'), path.join(publicDir, 'assets'), { recursive: true, force: true });
fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(publicDir, 'index.html'));

// 4. 复制英文主页到根 public（覆盖）
const enDir = path.join(rootDir, 'en');
if (fs.existsSync(enDir)) {
  fs.cpSync(enDir, path.join(publicDir, 'en'), { recursive: true, force: true });
}

console.log('\n✅ Build complete: public/');
console.log('  - public/index.html (中文)');
console.log('  - public/en/index.html (English)');
console.log('  - public/assets/');
console.log('  - public/blog/');
