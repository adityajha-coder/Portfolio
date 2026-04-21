export function renderNav(data) {
    const navName = document.getElementById('nav-name');
    if (navName) {
        navName.innerText = data.name.toUpperCase();
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileSocialLinks = document.getElementById('mobile-social-links');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });

    // Inject social links into mobile menu
    if (mobileSocialLinks && data.socials) {
        mobileSocialLinks.innerHTML = data.socials.map(social => `
            <a href="${social.url}" target="_blank" class="text-gray-400 hover:text-pink-400 transition-all transform hover:scale-110">
                <i data-lucide="${social.icon}"></i>
            </a>
        `).join('');
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
