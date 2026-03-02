export function renderContact(data) {
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        contactEmail.href = `mailto:${data.email}`;
        contactEmail.innerText = data.email;
    }

    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        // ensure we have an array with at least one entry
        if (Array.isArray(data.socials) && data.socials.length) {
            socialContainer.innerHTML = data.socials.map(s => {
                const iconName = s.icon || '';
                return `
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}"
                       class="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-200 hover:bg-pink-500 hover:text-white transition-colors">
                        <i data-lucide="${iconName}" width="20"></i>
                    </a>
                `;
            }).join('');

            // Initialize Lucide to replace any <i data-lucide="..."> placeholders
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                try { window.lucide.createIcons(); } catch (e) { /* ignore */ }
            }
        } else {
            socialContainer.innerHTML = '<p class="text-sm text-gray-500">No social links available.</p>';
        }
    }
}