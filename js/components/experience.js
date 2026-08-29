export function renderExperience(experiences) {
    const expList = document.getElementById('experience-list');
    if (!expList) return;

    experiences.forEach(exp => {
        const logoHtml = exp.logo 
            ? `<img src="${exp.logo}" alt="${exp.company} Logo" class="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0 mt-1">` 
            : '';

        const item = `
            <div class="relative group">
                <div class="hidden md:block absolute left-[-45px] top-4 w-3 h-3 bg-pink-500 rounded-full border-4 border-[#050505] shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10 group-hover:scale-150 transition-transform"></div>
                <div class="glass-panel p-5 md:p-6 rounded-xl hover:bg-white/5 transition-colors border border-white/5 flex flex-col md:flex-row gap-4">
                    ${logoHtml}
                    <div>
                        <span class="text-xs text-pink-400 font-mono mb-1 block">${exp.year}</span>
                        <h3 class="text-xl font-bold text-white">${exp.title}</h3>
                        <h4 class="text-sm text-gray-300 font-medium mb-2.5">${exp.company}</h4>
                        <p class="text-sm text-gray-300 leading-relaxed">${exp.description}</p>
                    </div>
                </div>
            </div>
        `;
        expList.innerHTML += item;
    });
}