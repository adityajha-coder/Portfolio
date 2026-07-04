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
                        <div class="project-footer flex items-center justify-between">
                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                View Live
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            </a>
                            ${project.github ? `
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub Repository">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            </a>
                            ` : ''}
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