export function renderSoftSkills(softSkills) {
    const softSkillsList = document.getElementById('soft-skills-list');
    if (!softSkillsList) return;

    softSkills.forEach(skill => {
        softSkillsList.innerHTML += `
            <span class="px-4 py-2 glass-panel rounded-full text-sm text-gray-300 border border-white/10 hover:border-pink-500/50 hover:text-white transition-all cursor-default">
                ${skill.name}
            </span>`;
    });
}