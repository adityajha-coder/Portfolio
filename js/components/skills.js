export function renderSkills(skills) {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;
    skillsList.innerHTML = '';
    
    const categories = {
        languages: "Languages",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools"
    };

    for (const [key, label] of Object.entries(categories)) {
        if (skills[key]) {
            const categoryHtml = `
                <div class="w-full mb-2">
                    <h4 class="text-xs text-pink-400 font-bold uppercase tracking-widest mb-3 border-l-2 border-indigo-500 pl-3">${label}</h4>
                    <div class="flex flex-wrap gap-3">
                        ${skills[key].map(skill => `
                            <div class="flex flex-col items-center gap-1 group tech-icon transition-transform duration-300 cursor-default">
                                <div class="w-10 h-10 glass-panel rounded-lg flex items-center justify-center text-2xl border border-white/5 group-hover:border-pink-500/30">
                                    <i class="${skill.icon}"></i>
                                </div>
                                <span class="text-[10px] text-gray-400 group-hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">${skill.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            skillsList.innerHTML += categoryHtml;
        }
    }
}