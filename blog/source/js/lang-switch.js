// 语言切换按钮：注入到 Fluid 导航栏最右，与个人主页风格一致
// 中文博客页(/blog/...) 显示 EN -> 跳 /en/blog/；英文博客页(/en/blog/...) 显示 中 -> 跳 /blog/
// 切换时记忆当前滚动位置，落到对方语言页后原地恢复（不回顶部）
(function () {
  var SCROLL_KEY = 'langScroll';

  // 落到新页面后，恢复切换前的滚动位置
  function restoreScroll() {
    var y = null;
    try { y = sessionStorage.getItem(SCROLL_KEY); } catch (e) {}
    if (y === null) return;
    y = parseInt(y, 10);
    function doScroll() { window.scrollTo(0, y); }
    // 内容多为服务端渲染，DOM 就绪即可滚；load 后再补一次以应对图片/字体导致的布局变化
    doScroll();
    window.addEventListener('load', doScroll);
    setTimeout(doScroll, 300);
    try { sessionStorage.removeItem(SCROLL_KEY); } catch (e) {}
  }
  restoreScroll();

  function addLangSwitch() {
    var path = location.pathname;
    var isEn = path.indexOf('/en/blog/') === 0;
    var label = isEn ? '中' : 'EN';
    var target = isEn ? '/blog/' : '/en/blog/';

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
