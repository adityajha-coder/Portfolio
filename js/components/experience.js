export function renderExperience(experiences) {
    const expList = document.getElementById('experience-list');
    if (!expList) return;

    experiences.forEach(exp => {
        const item = `
            <div class="relative group">
                <div class="hidden md:block absolute left-[-45px] top-2 w-3 h-3 bg-pink-500 rounded-full border-4 border-[#050505] shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10 group-hover:scale-150 transition-transform"></div>
                <div class="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5">
                    <span class="text-sm text-pink-400 font-mono mb-2 block">${exp.year}</span>
                    <h3 class="text-2xl font-bold mb-1">${exp.title}</h3>
                    <h4 class="text-lg text-gray-400 mb-4">${exp.company}</h4>
                    <p class="text-gray-400 leading-relaxed">${exp.description}</p>
                </div>
            </div>
        `;
        expList.innerHTML += item;
    });
}