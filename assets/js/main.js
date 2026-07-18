// 简单的导航高亮与平滑滚动辅助
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
