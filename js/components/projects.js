function createProjectCardHtml(project, index) {
    const techPills = (project.tech || []).map(t =>
        `<span class="project-tech-pill">${t}</span>`
    ).join('');

    return `
        <div class="project-card group" id="project-${index}">
            <div class="project-card-inner">
                <div class="project-image-wrap">
                    <div class="project-number">0${index + 1}</div>
                    <div class="project-image-bg" style="background-image: url('${project.image}')"></div>
                    <div class="project-image-overlay">
                        <span class="project-category-badge">${project.category}</span>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description text-xs text-gray-300 mb-4 line-clamp-3 leading-relaxed">${project.description}</p>
                    <div class="project-tech-row">${techPills}</div>
                    <div class="project-footer flex items-center justify-between mt-auto">
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link hover:text-pink-400 transition-colors">
                            View Live
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                        </a>
                        ${project.github ? `
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link hover:text-pink-400 transition-colors" aria-label="GitHub Repository">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderProjects(projects) {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    projectGrid.className = 'w-full max-w-6xl mx-auto';
    projectGrid.style.cssText = '';

    // First 3 projects
    const featuredProjects = projects.slice(0, 3);
    const featuredCardsHtml = featuredProjects.map((project, index) => 
        createProjectCardHtml(project, index)
    ).join('');

    projectGrid.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${featuredCardsHtml}
        </div>
        <div class="mt-12 text-center">
            <button id="view-all-projects-btn" class="px-8 py-4 glass-panel text-white font-semibold rounded-full border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-200 active:scale-95 inline-flex items-center gap-3 cursor-pointer">
                <span>View All Projects</span>
                <i data-lucide="arrow-right" class="w-4 h-4 text-pink-400"></i>
            </button>
        </div>
    `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    const viewAllBtn = document.getElementById('view-all-projects-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            openAllProjectsModal(projects);
        });
    }
}

function openAllProjectsModal(projects) {
    let modal = document.getElementById('all-projects-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'all-projects-modal';
        document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto transition-opacity duration-300';
    document.body.style.overflow = 'hidden';

    const allCardsHtml = projects.map((project, index) => 
        createProjectCardHtml(project, index)
    ).join('');

    modal.innerHTML = `
        <div class="min-h-screen py-12 px-6 md:px-16 flex flex-col">
            <div class="flex justify-between items-center max-w-6xl w-full mx-auto mb-10">
                <div>
                    <h2 class="text-3xl md:text-5xl font-bold text-white">Things I've Built.</h2>
                    <p class="text-sm text-gray-400 mt-2">Each work showcase my passion towards tech and innovation</p>
                </div>
                <button id="close-projects-modal" class="px-5 py-2.5 glass-panel text-white hover:text-pink-400 rounded-full border border-white/10 hover:border-pink-500/40 transition-all active:scale-95 flex items-center gap-2 text-sm font-semibold cursor-pointer">
                    <span>Close</span>
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mb-12">
                ${allCardsHtml}
            </div>
        </div>
    `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    const closeModal = () => {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    };

    modal.style.display = 'block';
    modal.classList.remove('opacity-0');

    const closeBtn = document.getElementById('close-projects-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            window.removeEventListener('keydown', handleKeyDown);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
}