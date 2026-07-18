// 语言切换按钮：注入到 Fluid 导航栏最右，与个人主页风格一致
// 中文博客页(/blog/...) 显示 EN -> 跳 /en/blog/；英文博客页(/en/blog/...) 显示 中 -> 跳 /blog/
// 切换时记忆当前滚动位置，落到对方语言页后原地恢复（不回顶部）
(function () {
  var SCROLL_KEY = 'langScroll';

  // 关闭浏览器默认的滚动恢复，完全由我们接管
  if ('scrollRestoration' in history) {
    try { history.scrollRestoration = 'manual'; } catch (e) {}
  }

  // 落到新页面后，恢复切换前的滚动位置。
  // Fluid 主题在 load 后可能有回顶/淡入动作，且图片/字体会撑高页面，
  // 单次 scrollTo 常被覆盖或落空 —— 故持续重试约 1.8s，直到到位或超时；
  // 一旦用户自己滚动/触屏/按键就立即停手，不跟用户抢。
  function restoreScroll() {
    var raw = null;
    try { raw = sessionStorage.getItem(SCROLL_KEY); } catch (e) {}
    if (raw === null) return;
    try { sessionStorage.removeItem(SCROLL_KEY); } catch (e) {}
    var y = parseInt(raw, 10);
    if (isNaN(y) || y <= 0) return;

    var aborted = false;
    function abort() { aborted = true; }
    function cleanup() {
      window.removeEventListener('wheel', abort);
      window.removeEventListener('touchstart', abort);
      window.removeEventListener('keydown', abort);
    }
    window.addEventListener('wheel', abort, { passive: true });
    window.addEventListener('touchstart', abort, { passive: true });
    window.addEventListener('keydown', abort);

    var start = Date.now();
    var timer = setInterval(function () {
      if (aborted) { clearInterval(timer); cleanup(); return; }
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var goal = Math.min(y, Math.max(0, max));
      window.scrollTo(0, goal);
      var reached = Math.abs(window.scrollY - goal) <= 2 && goal >= y - 2;
      if (reached || Date.now() - start > 1800) {
        clearInterval(timer);
        cleanup();
      }
    }, 50);
  }
  restoreScroll();

  function addLangSwitch() {
    var path = location.pathname;
    var isEn = path.indexOf('/en/blog/') === 0;
    var label = isEn ? '中' : 'EN';
    // 切换时跳「当前页面的对应语言版」：仅在路径前加/去 /en 前缀
    // /blog/... -> /en/blog/...；/en/blog/... -> /blog/...（文章/分类/归档/标签/关于 均适用）
    var target = isEn ? (path.replace(/^\/en/, '') || '/blog/') : ('/en' + path);

    // 点击切换前，记住当前滚动位置
    function bindSave(el) {
      el.addEventListener('click', function () {
        try { sessionStorage.setItem(SCROLL_KEY, window.scrollY); } catch (e) {}
      });
    }

    // 桌面端导航栏（#navbarSupportedContent 内的 .navbar-nav）
    var nav = document.querySelector('#navbarSupportedContent .navbar-nav');
    if (nav && !nav.querySelector('.lang-switch-item')) {
      var li = document.createElement('li');
      li.className = 'nav-item lang-switch-item';
      var a = document.createElement('a');
      a.className = 'lang-switch';
      a.href = target;
      a.textContent = label;
      a.title = isEn ? '中文' : 'English';
      bindSave(a);
      li.appendChild(a);
      nav.appendChild(li);
    }

    // 移动端网格菜单（#mobile-grid-menu 内的 .row）
    var grid = document.querySelector('#mobile-grid-menu .row');
    if (grid && !grid.querySelector('.lang-switch-grid-cell')) {
      var cell = document.createElement('div');
      cell.className = 'col-4 mobile-grid-cell lang-switch-grid-cell';
      var ga = document.createElement('a');
      ga.href = target;
      ga.title = isEn ? '中文' : 'English';
      bindSave(ga);
      var inner = document.createElement('div');
      inner.className = 'mobile-grid-item';
      var icon = document.createElement('i');
      icon.className = 'iconfont icon-language';
      var span = document.createElement('span');
      span.textContent = label;
      inner.appendChild(icon);
      inner.appendChild(span);
      ga.appendChild(inner);
      cell.appendChild(ga);
      grid.appendChild(cell);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLangSwitch);
  } else {
    addLangSwitch();
  }
})();
