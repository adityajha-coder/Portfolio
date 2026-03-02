export function renderProjects(projects) {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    projects.forEach(project => {
        const card = `
            <div class="group">
                <div class="glass-panel rounded-2xl overflow-hidden aspect-video relative mb-4 border border-white/10 group-hover:border-pink-500/50 transition-colors duration-500 shadow-2xl">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h4 class="text-xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${project.title}</h4>
                        <p class="text-xs text-pink-400 font-mono mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${project.category}</p>
                        <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-pink-500 hover:text-white transition-all w-fit translate-y-4 group-hover:translate-y-0 duration-300 delay-100 opacity-0 group-hover:opacity-100">
                            Visit Project <i data-lucide="external-link" width="14"></i>
                        </a>
                    </div>
                    <div class="w-full h-full bg-gray-800 project-image transition-transform duration-700 bg-cover bg-center group-hover:scale-110 group-hover:rotate-1" style="background-image: url('${project.image}')"></div>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed border-l-2 border-pink-500/50 pl-3">${project.description}</p>
            </div>
        `;
        projectGrid.innerHTML += card;
    });

    // convert any lucide icons that were injected with project cards
    if (window.lucide && typeof lucide.replace === 'function') {
        lucide.replace();
    }
}