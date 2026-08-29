export function renderAbout(data) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent && data.aboutSections) {
        let html = '<div class="space-y-10">';
        
        Object.entries(data.aboutSections).forEach(([key, section]) => {
            const pointsHtml = section.points.map(point => {
                // bolding text
                const formattedPoint = point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
                return `<p class="text-base text-white leading-relaxed">${formattedPoint}</p>`;
            }).join('');
            
            html += `
                <div class="max-w-4xl">
                    <h3 class="text-lg font-bold tracking-wider text-pink-400 uppercase mb-3 border-l-2 border-pink-400 pl-4">${section.title}</h3>
                    <div class="space-y-3 pl-5 border-l border-white/5">
                        ${pointsHtml}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        aboutContent.innerHTML = html;
    }
}