import { portfolioData } from './data.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderProjects } from './components/projects.js';
import { renderExperience } from './components/experience.js';
import { renderAbout } from './components/about.js';
import { renderSkills } from './components/skills.js';
import { renderSoftSkills } from './components/softSkills.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';
import { renderEducation } from './components/education.js';
import { renderCertifications } from './components/certifications.js';
import { initCmd, setOpenZshCallback } from './components/cmd.js';
import { initZsh, setOpenCmdCallback } from './components/zsh.js';

function init() {
    renderNav(portfolioData);
    renderHero(portfolioData);
    renderProjects(portfolioData.projects);
    renderExperience(portfolioData.experience);
    renderAbout(portfolioData);
    renderSkills(portfolioData.skills);
    renderSoftSkills(portfolioData.softSkills);
    renderContact(portfolioData);
    renderEducation(portfolioData.education);
    renderCertifications(portfolioData.certifications);
    renderFooter(portfolioData);
    
    const cmdControls = initCmd(portfolioData);
    const zshControls = initZsh(portfolioData);

    if (cmdControls && zshControls) {
        setOpenZshCallback(zshControls.openZsh);
        setOpenCmdCallback(cmdControls.openCmd);
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }


}

document.addEventListener('DOMContentLoaded', init);
