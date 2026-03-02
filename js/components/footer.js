export function renderFooter(data) {
    const footerText = document.getElementById('footer-text');
    if (footerText) {
        footerText.innerHTML = `&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.`;
    }
}