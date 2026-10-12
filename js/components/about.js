export function renderAbout(data) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent && data.aboutSections) {
        let html = '<div class="space-y-6">';
        
        Object.entries(data.aboutSections).forEach(([key, section]) => {
            const pointsHtml = section.points.map(point => {
                // bolding text
                const formattedPoint = point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
                return `<p class="text-sm sm:text-base text-gray-200 leading-relaxed">${formattedPoint}</p>`;
            }).join('');
            
            html += `
                <div class="bg-white/5 backdrop-blur-md p-5 md:p-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10 max-w-4xl">
                    <h3 class="text-base sm:text-lg font-bold tracking-wider text-pink-400 uppercase mb-3 border-l-2 border-pink-400 pl-3">${section.title}</h3>
                    <div class="space-y-3 pl-4 border-l border-white/10">
                        ${pointsHtml}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        aboutContent.innerHTML = html;
    }
}