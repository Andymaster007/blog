// 语言切换按钮：注入到 Fluid 导航栏最右，与个人主页行为一致
// 中文博客页(/blog/...) 显示 EN -> 跳 /en/blog/；英文博客页(/en/blog/...) 显示 中 -> 跳 /blog/
(function () {
  function addLangSwitch() {
    var path = location.pathname;
    var isEn = path.indexOf('/en/blog/') === 0;
    var label = isEn ? '中' : 'EN';
    var target = isEn ? '/blog/' : '/en/blog/';

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
