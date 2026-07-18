/* ===== litmustz blog · custom behavior ===== */
(function () {
  // Add a clean hero tagline on the blog index page
  var isIndex = window.location.pathname === '/blog/' ||
                window.location.pathname === '/blog/index.html' ||
                window.location.pathname === '/blog';
  if (!isIndex) return;

  var recentPosts = document.getElementById('recent-posts');
  if (!recentPosts) return;

  var hero = document.createElement('div');
  hero.id = 'lz-blog-hero';
  hero.innerHTML = '<h1>成长札记</h1><p>算法 · 游戏 · 金融 · 编程</p>';

  var parent = recentPosts.parentNode;
  parent.insertBefore(hero, recentPosts);
})();
