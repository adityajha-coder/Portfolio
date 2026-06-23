const ICON_MAP = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
};

const SOCIAL_HOVER_MAP = {
    github: 'hover:bg-[#24292e] hover:text-white hover:border-[#24292e]',
    linkedin: 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]',
    instagram: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent',
    x: 'hover:bg-[#000000] hover:text-white hover:border-[#000000]'
};

export function renderContact(data) {
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        contactEmail.href = `mailto:${data.email}`;
        contactEmail.innerText = data.email;
    }

    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        if (Array.isArray(data.socials) && data.socials.length) {
            socialContainer.innerHTML = data.socials.map(s => {
                const iconKey = (s.icon || '').toLowerCase();
                const svgIcon = ICON_MAP[iconKey] || `<i data-lucide="${iconKey}" width="20"></i>`;
                const hoverClass = SOCIAL_HOVER_MAP[iconKey] || 'hover:bg-pink-500 hover:text-white';
                return `
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}"
                       class="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-200 border border-white/5 ${hoverClass} transition-all duration-300 hover:scale-110">
                        ${svgIcon}
                    </a>
                `;
            }).join('');

            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                try { window.lucide.createIcons(); } catch (e) { /* ignore */ }
            }
        } else {
            socialContainer.innerHTML = '<p class="text-sm text-gray-500">No social links available.</p>';
        }
    }
}