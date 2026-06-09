export function renderProjects(projects) {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    projectGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10';

    projects.forEach((project, index) => {
        const techPills = (project.tech || []).map(t =>
            `<span class="project-tech-pill">${t}</span>`
        ).join('');

        const card = `
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
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech-row">${techPills}</div>
                        <div class="project-footer">
                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                View Live
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectGrid.innerHTML += card;
    });

    if (window.lucide && typeof lucide.replace === 'function') {
        lucide.replace();
    }
}