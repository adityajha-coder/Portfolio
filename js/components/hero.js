export function renderHero(data) {
    const roleEl = document.getElementById('hero-role');
    if (roleEl) roleEl.innerText = data.role;

    const headline1 = document.getElementById('hero-headline-1');
    if (headline1) headline1.innerText = data.heroHeadline[0];

    const glitchText = document.getElementById('hero-glitch-text');
    if (glitchText) {
        glitchText.innerText = data.heroHeadline[1];
        glitchText.setAttribute('data-text', data.heroHeadline[1]);
    }

    const headline2 = document.getElementById('hero-headline-2');
    if (headline2) headline2.innerText = data.heroHeadline[2];

    const bio = document.getElementById('hero-bio');
    if (bio) bio.innerText = data.shortBio;
}