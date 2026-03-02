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
                    // If the icon string looks like a devicon class, render as <i class="...">,
                    // otherwise assume it's a lucide icon name and use data-lucide attribute.
                    const isDevicon = String(s.icon || '').includes('devicon');
                    if (isDevicon) {
                        return `
                            <a href="${s.url}" target="_blank" class="hover:text-white transition-colors">
                                <i class="${s.icon}" style="font-size:22px"></i>
                            </a>
                        `;
                    } else {
                        return `
                            <a href="${s.url}" target="_blank" class="hover:text-white transition-colors">
                                <i data-lucide="${s.icon}" width="24"></i>
                            </a>
                        `;
                    }
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