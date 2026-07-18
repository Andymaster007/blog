// 导航高亮 + 平滑滚动辅助
(function () {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
})();

// 站内即时语言切换：原地换字、滚动位置不变；localStorage 记忆 + URL 参数 ?lang=en
(function () {
    const KEY = 'site-lang';
    const root = document.documentElement;

    function apply(lang) {
        root.setAttribute('data-lang', lang);
        root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
        try { localStorage.setItem(KEY, lang); } catch (e) {}
        const url = new URL(location.href);
        if (lang === 'en') url.searchParams.set('lang', 'en');
        else url.searchParams.delete('lang');
        history.replaceState(null, '', url);
    }

    const params = new URLSearchParams(location.search);
    let lang;
    if (params.get('lang') === 'en') lang = 'en';
    else {
        try { lang = localStorage.getItem(KEY); } catch (e) { lang = null; }
        if (lang !== 'en' && lang !== 'zh') lang = 'zh';
    }
    apply(lang);

    const btn = document.getElementById('langSwitch');
    if (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const cur = root.getAttribute('data-lang') === 'en' ? 'zh' : 'en';
            apply(cur);
        });
    }
})();
