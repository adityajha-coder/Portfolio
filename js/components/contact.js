export function renderContact(data) {
    const contactEmail = document.getElementById('contact-email');
    if (contactEmail) {
        contactEmail.href = `mailto:${data.email}`;
        contactEmail.innerText = data.email;
    }

    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        socialContainer.innerHTML = data.socials.map(s => `
            <a href="${s.url}" target="_blank" class="hover:text-white transition-colors">
                <i data-lucide="${s.icon}" width="24"></i>
            </a>
        `).join('');
    }
}