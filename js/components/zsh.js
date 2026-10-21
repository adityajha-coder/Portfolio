let openCmdRef = null;

export function setOpenCmdCallback(fn) {
    openCmdRef = fn;
}

export function initZsh(data) {
    const zshModal = document.getElementById('zsh-modal');
    const zshWindow = document.getElementById('zsh-window');
    const zshBody = document.getElementById('zsh-body');
    const zshOutput = document.getElementById('zsh-output');
    const zshInput = document.getElementById('zsh-input');
    const zshCloseBtn = document.getElementById('zsh-close-btn');
    const zshMinimizeBtn = document.getElementById('zsh-minimize-btn');
    const zshMaximizeBtn = document.getElementById('zsh-maximize-btn');
    const selectLinuxBtn = document.getElementById('select-linux-zsh');
    const mobileLinuxBtn = document.getElementById('mobile-linux-btn');

    if (!zshModal || !zshInput || !zshOutput) {
        console.warn('Linux Zsh elements missing from DOM');
        return { openZsh: () => {}, closeZsh: () => {} };
    }

    let isOpen = false;
    let isMaximized = false;
    const history = [];
    let historyIndex = -1;

    // cmds
    const COMMANDS = [
        'help',
        'neofetch',
        'about',
        'skills',
        'projects',
        'project',
        'experience',
        'education',
        'contact',
        'socials',
        'resume',
        'ls',
        'cat',
        'pwd',
        'whoami',
        'uname',
        'date',
        'clear',
        'history',
        'switch',
        'cowsay',
        'matrix',
        'exit'
    ];

    // Virtual files for 'ls' and 'cat' commands
    const virtualFiles = {
        'about.txt': () => getAboutText(data),
        'skills.json': () => JSON.stringify(data.skills, null, 2),
        'projects.md': () => getProjectsMarkdown(data),
        'experience.txt': () => getExperienceText(data),
        'education.txt': () => getEducationText(data),
        'contact.vcf': () => `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.role}\nEMAIL:${data.email}\nURL:https://github.com/adityajha-coder\nEND:VCARD`,
        'portfolio.sh': () => `#!/usr/bin/env bash\necho "Starting Aditya Jha Portfolio runtime..."\necho "Role: Full Stack // Backend // AI Developer"\nexit 0`
    };

    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function openZsh() {
        if (isOpen) return;
        isOpen = true;
        zshModal.classList.remove('opacity-0', 'pointer-events-none');
        zshModal.classList.add('opacity-100', 'pointer-events-auto');
        zshWindow.classList.remove('scale-95');
        zshWindow.classList.add('scale-100');

        const selectorModal = document.getElementById('terminal-selector-modal');
        if (selectorModal) {
            selectorModal.classList.remove('opacity-100', 'pointer-events-auto');
            selectorModal.classList.add('opacity-0', 'pointer-events-none');
            const box = document.getElementById('terminal-selector-box');
            if (box) {
                box.classList.remove('scale-100');
                box.classList.add('scale-95');
            }
        }

        // Close mobile drawer if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }

        // Print initial banner if empty
        if (zshOutput.innerHTML.trim() === '') {
            printWelcomeBanner();
        }

        setTimeout(() => {
            zshInput.focus();
            scrollToBottom();
        }, 50);
    }

    function closeZsh() {
        if (!isOpen) return;
        isOpen = false;
        zshModal.classList.remove('opacity-100', 'pointer-events-auto');
        zshModal.classList.add('opacity-0', 'pointer-events-none');
        zshWindow.classList.remove('scale-100');
        zshWindow.classList.add('scale-95');
    }

    function toggleMaximize() {
        isMaximized = !isMaximized;
        if (isMaximized) {
            zshWindow.classList.add('zsh-window-maximized');
        } else {
            zshWindow.classList.remove('zsh-window-maximized');
        }
        zshInput.focus();
        scrollToBottom();
    }

    function scrollToBottom() {
        if (zshBody) {
            zshBody.scrollTop = zshBody.scrollHeight;
        }
    }

    function printWelcomeBanner() {
        const bannerHtml = `
<div class="zsh-banner">
Welcome to <span class="zsh-text-emerald font-bold">adzyy OS 9.9.0-adzyy x86_64</span>
System: <span class="zsh-text-cyan">adzyy OS</span> | Kernel: <span class="zsh-text-yellow">9.9.0-adzyy</span>
Developer: <span class="text-white font-bold">${escapeHtml(data.name)}

Type '<span class="zsh-text-emerald font-bold">help</span>' for available commands, or '<span class="zsh-text-cyan font-bold">neofetch</span>' for system info.
</div>`;
        zshOutput.innerHTML = bannerHtml;
    }

    function appendOutput(html) {
        const block = document.createElement('div');
        block.className = 'zsh-output-block';
        block.innerHTML = html;
        zshOutput.appendChild(block);
        scrollToBottom();
    }

    function clearOutput() {
        zshOutput.innerHTML = '';
        scrollToBottom();
    }

    // Linux command handler

    function handleHelp() {
        return `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">adzyy OS (zsh) - AVAILABLE COMMANDS</div>
<span class="zsh-col-cmd">about</span>          Know about Aditya
<span class="zsh-col-cmd">skills</span>         Technical skills
<span class="zsh-col-cmd">projects</span>       Featured projects with links
<span class="zsh-col-cmd">project &lt;name&gt;</span>  Deep dive into a project (e.g. <span class="zsh-text-cyan">project trivoxa</span>)
<span class="zsh-col-cmd">experience</span>     Work history
<span class="zsh-col-cmd">education</span>      Education stuffs
<span class="zsh-col-cmd">contact</span>        Direct email &amp; collaboration details
<span class="zsh-col-cmd">socials</span>        GitHub, LinkedIn, Instagram, and X profiles
<span class="zsh-col-cmd">resume</span>         Resume credentials &amp; contact info

<span class="zsh-col-cmd">neofetch</span>       Display adzyy OS system stats
<span class="zsh-col-cmd">ls [-la]</span>       List directory files &amp; permissions
<span class="zsh-col-cmd">cat &lt;file&gt;</span>     Display file contents (e.g. <span class="zsh-text-cyan">cat about.txt</span>)
<span class="zsh-col-cmd">pwd</span>            Print current working directory
<span class="zsh-col-cmd">whoami</span>         Print current logged in user
<span class="zsh-col-cmd">uname [-a]</span>     Print operating system &amp; kernel info
<span class="zsh-col-cmd">date</span>           Current system date and time
<span class="zsh-col-cmd">switch</span>         Switch environment (e.g. <span class="zsh-text-cyan">switch windows</span>)
<span class="zsh-col-cmd">clear</span>          Clear the terminal screen
<span class="zsh-col-cmd">exit</span>           Close the terminal session
<span class="text-gray-400 text-xs">Tip: Press TAB to autocomplete commands &amp; files, UP/DOWN for history.</span>
</div>`;
    }

    function handleNeofetch() {
        return `
<div class="zsh-neofetch-container flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 my-2">
  <div class="zsh-neofetch-art-wrapper shrink-0">
    <img
      src="/Pics/portrait_ascii_art.png"
      alt="${escapeHtml(data.name)} ASCII Art"
      class="zsh-neofetch-art w-44 sm:w-52 h-auto select-none rounded-md"
      onerror="this.src='/pics/portrait_ascii_art.png'"
    />
  </div>
  <div class="zsh-neofetch-info flex-1 min-w-0 font-mono text-xs sm:text-sm">
    <div class="text-emerald-400 font-bold text-sm sm:text-base">adzyy<span class="text-gray-300">@</span>adzyy-os</div>
    <div class="text-gray-500 text-xs my-0.5"></div>
    <div><span class="text-cyan-400 font-semibold">User:</span> ${escapeHtml(data.name)}</div>
    <div><span class="text-cyan-400 font-semibold">OS:</span> adzyy </div>
    <div><span class="text-cyan-400 font-semibold">Host:</span> Aditya Jha </div>
    <div><span class="text-cyan-400 font-semibold">Kernel:</span> Caffeine-Fuled Event Loop</div>
    <div><span class="text-cyan-400 font-semibold">Packages:</span> 1337 (dpkg), 42 (flatpak)</div>
    <div><span class="text-cyan-400 font-semibold">Shell:</span> zsh 5.9 (adzyy-linux)</div>
    <div><span class="text-cyan-400 font-semibold">Terminal:</span> adzyy-terminal</div>
    <div><span class="text-cyan-400 font-semibold">CPU:</span> Problem Solving</div>
    <div><span class="text-cyan-400 font-semibold">Role:</span> ${escapeHtml(data.role)}</div>
    <div class="mt-3 flex items-center gap-1.5">
      <span class="terminal-color-block" style="background-color: #003f0f;"></span>
      <span class="terminal-color-block" style="background-color: #0a6c1f;"></span>
      <span class="terminal-color-block" style="background-color: #1f9f3a;"></span>
      <span class="terminal-color-block" style="background-color: #33ff65;"></span>
      <span class="terminal-color-block" style="background-color: #7de899;"></span>
      <span class="terminal-color-block" style="background-color: #00ff40;"></span>
      <span class="terminal-color-block" style="background-color: #c6ffd7;"></span>
      <span class="terminal-color-block" style="background-color: #ffffff;"></span>
    </div>
  </div>
</div>`;
    }

    function handleAbout() {
        const sections = data.aboutSections || {};
        let html = `
<div class="zsh-section">
<div class="text-cyan-400 font-bold mb-1">USER PROFILE: ${escapeHtml(data.name).toUpperCase()}</div>
<div><span class="text-gray-400 font-medium">Role:</span>     ${escapeHtml(data.role)}</div>
<div><span class="text-gray-400 font-medium">Bio:</span>      ${escapeHtml(data.shortBio)}</div>
<div><span class="text-gray-400 font-medium">Email:</span>    <a href="mailto:${data.email}" class="zsh-link">${escapeHtml(data.email)}</a></div>
<br/>`;

        if (sections.whyProgramming) {
            html += `<div class="text-emerald-400 font-semibold">&gt; ${escapeHtml(sections.whyProgramming.title)}:</div>`;
            sections.whyProgramming.points.forEach(pt => {
                html += `<div class="ml-3 text-gray-300">&#x2022; ${escapeHtml(pt)}</div>`;
            });
            html += `<br/>`;
        }

        if (sections.problemsEnjoyed) {
            html += `<div class="text-emerald-400 font-semibold">&gt; ${escapeHtml(sections.problemsEnjoyed.title)}:</div>`;
            sections.problemsEnjoyed.points.forEach(pt => {
                const formatted = pt.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-semibold">$1</span>');
                html += `<div class="ml-3 text-gray-300">&#x2022; ${formatted}</div>`;
            });
            html += `<br/>`;
        }

        if (sections.careerGoals) {
            html += `<div class="text-emerald-400 font-semibold">&gt; ${escapeHtml(sections.careerGoals.title)}:</div>`;
            sections.careerGoals.points.forEach(pt => {
                const formatted = pt.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-semibold">$1</span>');
                html += `<div class="ml-3 text-gray-300">&#x2022; ${formatted}</div>`;
            });
        }

        html += `</div>`;
        return html;
    }

    function handleSkills() {
        const s = data.skills || {};
        const languages = (s.languages || []).map(i => i.name).join(', ');
        const frontend = (s.frontend || []).map(i => i.name).join(', ');
        const backend = (s.backend || []).map(i => i.name).join(', ');
        const tools = (s.tools || []).map(i => i.name).join(', ');
        const softSkills = (data.softSkills || []).map(i => i.name).join(', ');

        return `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">TECHNICAL SKILLS &amp; STACK</div>
<span class="zsh-col-cat text-cyan-400">[Languages]</span>    ${escapeHtml(languages)}
<span class="zsh-col-cat text-cyan-400">[Frontend]</span>     ${escapeHtml(frontend)}
<span class="zsh-col-cat text-cyan-400">[Backend]</span>      ${escapeHtml(backend)}
<span class="zsh-col-cat text-cyan-400">[Tools/Ops]</span>    ${escapeHtml(tools)}
<span class="zsh-col-cat text-cyan-400">[Soft Skills]</span>  ${escapeHtml(softSkills)}
</div>`;
    }

    function handleProjects() {
        const projs = data.projects || [];
        let html = `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">FEATURED PROJECTS (Total: ${projs.length})</div>
`;

        projs.forEach((p, idx) => {
            const techStr = (p.tech || []).join(' | ');
            html += `
<div class="my-2.5 pb-2 border-b border-white/5">
  <div><span class="text-yellow-400 font-semibold">[${idx + 1}] ${escapeHtml(p.title)}</span> <span class="text-pink-400 text-xs">&lt;${escapeHtml(p.category)}&gt;</span></div>
  <div class="text-gray-400 text-xs my-1">${escapeHtml(p.description)}</div>
  <div class="text-xs"><span class="text-cyan-400">Stack:</span> ${escapeHtml(techStr)}</div>
  <div class="text-xs mt-1">${p.link ? `<a href="${p.link}" target="_blank" class="zsh-link">[Demo: ${p.link}]</a>  ` : ''}${p.github ? `<a href="${p.github}" target="_blank" class="zsh-link">[GitHub: ${p.github}]</a>` : ''}</div>
</div>`;
        });

        html += `
<span class="text-gray-400 text-xs">Tip: Run '<span class="text-cyan-400">project &lt;name&gt;</span>' (e.g. '<span class="text-cyan-400">project trivoxa</span>') for full breakdown.</span>
</div>`;
        return html;
    }

    function handleProjectDetail(targetName) {
        if (!targetName) {
            return `<div class="text-red-400">Usage: project &lt;project-name&gt; (e.g., project trivoxa, project authors)</div>`;
        }
        const projs = data.projects || [];
        const match = projs.find(p => p.title.toLowerCase().includes(targetName.toLowerCase()));

        if (!match) {
            const names = projs.map(p => p.title.toLowerCase()).join(', ');
            return `<div class="text-red-400">project: '${escapeHtml(targetName)}' not found. Available: ${escapeHtml(names)}</div>`;
        }

        return `
<div class="zsh-section">
<div class="text-cyan-400 font-bold mb-1">PROJECT: ${escapeHtml(match.title).toUpperCase()}</div>
<div><span class="text-gray-400">Category:</span>   ${escapeHtml(match.category)}</div>
<div><span class="text-gray-400">Stack:</span>      ${escapeHtml((match.tech || []).join(', '))}</div>
<br/>
<div class="text-emerald-400 font-semibold">Description:</div>
<div class="text-gray-300">${escapeHtml(match.description)}</div>
<br/>
<div>${match.link ? `<span class="text-gray-400">Live URL:</span> <a href="${match.link}" target="_blank" class="zsh-link">${match.link}</a><br/>` : ''}${match.github ? `<span class="text-gray-400">GitHub:</span>   <a href="${match.github}" target="_blank" class="zsh-link">${match.github}</a>` : ''}</div>
</div>`;
    }

    function handleExperience() {
        const exp = data.experience || [];
        let html = `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">WORK EXPERIENCE &amp; CONTRIBUTIONS</div>
`;

        exp.forEach(e => {
            html += `
<div class="my-2">
  <div><span class="text-yellow-400 font-semibold"># ${escapeHtml(e.title)}</span> <span class="text-gray-300">@ ${escapeHtml(e.company)}</span> <span class="text-gray-500 text-xs">(${escapeHtml(e.year)})</span></div>
  <div class="text-gray-300 text-xs ml-3 mt-1">${escapeHtml(e.description)}</div>
</div>`;
        });

        html += `</div>`;
        return html;
    }

    function handleEducation() {
        const edu = data.education || [];
        let html = `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">ACADEMIC BACKGROUND</div>
`;

        edu.forEach(item => {
            html += `
<div class="my-2">
  <div class="text-yellow-400 font-semibold">&gt; ${escapeHtml(item.institution)}</div>
  <div class="ml-3 text-xs text-gray-300">&#x2022; <span class="text-white">Degree:</span> ${escapeHtml(item.degree)}</div>
  <div class="ml-3 text-xs text-gray-400">&#x2022; Affiliation: ${escapeHtml(item.affiliation)}</div>
  <div class="ml-3 text-xs text-gray-500">&#x2022; Timeline: ${escapeHtml(item.year)}</div>
</div>`;
        });

        html += `</div>`;
        return html;
    }

    function handleContact() {
        return `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">CONTACT &amp; REACH OUT</div>
<span class="text-gray-400">Name:</span>       ${escapeHtml(data.name)}
<span class="text-gray-400">Role:</span>       ${escapeHtml(data.role)}
<span class="text-gray-400">Email:</span>      <a href="mailto:${data.email}" class="zsh-link">${escapeHtml(data.email)}</a>
<span class="text-gray-400">Status:</span>     Open to software engineering roles &amp; freelance opportunities.
</div>`;
    }

    function handleSocials() {
        const socials = data.socials || [];
        let html = `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">PROFILES &amp; SOCIALS</div>
`;

        socials.forEach(s => {
            html += `
<div class="my-1"><span class="zsh-col-cmd text-cyan-400">${escapeHtml(s.name)}:</span> <a href="${s.url}" target="_blank" class="zsh-link">${escapeHtml(s.url)}</a></div>`;
        });

        html += `</div>`;
        return html;
    }

    function handleLs(flags) {
        const files = Object.keys(virtualFiles);
        const isLong = flags && (flags.includes('l') || flags.includes('la') || flags.includes('-l'));

        if (isLong) {
            let listHtml = 'total 36\n';
            listHtml += `<span class="text-blue-400">drwxr-xr-x</span>  2 adzyy adzyy 4096 Oct 22 02:00 <span class="text-blue-400">.</span>\n`;
            listHtml += `<span class="text-blue-400">drwxr-xr-x</span>  4 adzyy adzyy 4096 Oct 22 02:00 <span class="text-blue-400">..</span>\n`;

            files.forEach(f => {
                const size = virtualFiles[f]().length;
                const sizeStr = size.toString().padStart(5, ' ');
                const isExec = f.endsWith('.sh');
                const perm = isExec ? '-rwxr-xr-x' : '-rw-r--r--';
                const fileColor = isExec ? 'text-green-400 font-semibold' : 'text-gray-200';
                listHtml += `${perm}  1 adzyy adzyy ${sizeStr} Oct 22 02:00 <span class="${fileColor}">${f}</span>\n`;
            });
            return `<div class="zsh-section"><pre class="font-mono text-xs leading-relaxed">${listHtml}</pre></div>`;
        }

        // Short grid format
        const items = files.map(f => {
            const isExec = f.endsWith('.sh');
            const colorClass = isExec ? 'text-green-400 font-bold' : 'text-gray-200';
            return `<span class="${colorClass}">${f}</span>`;
        }).join('    ');

        return `<div class="zsh-section font-mono text-xs">${items}</div>`;
    }

    function handleCat(fileName) {
        if (!fileName) {
            return `<div class="text-red-400">cat: missing operand. Usage: cat &lt;filename&gt; (e.g. cat about.txt)</div>`;
        }

        const match = Object.keys(virtualFiles).find(k => k.toLowerCase() === fileName.toLowerCase());
        if (!match) {
            return `<div class="text-red-400">cat: ${escapeHtml(fileName)}: No such file or directory. Type 'ls' to list files.</div>`;
        }

        const content = virtualFiles[match]();
        return `<div class="zsh-section"><pre class="zsh-pre">${escapeHtml(content)}</pre></div>`;
    }

    function handleCowsay(text) {
        const msg = text || 'Welcome to adzyy OS!';
        const len = msg.length;
        const border = '-'.repeat(len + 2);
        return `
<div class="zsh-section">
<pre class="font-mono text-xs text-yellow-300 leading-tight">
  ${border}
&lt; ${escapeHtml(msg)} &gt;
  ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>
</div>`;
    }

    function handleSwitch(target) {
        const t = (target || '').toLowerCase().trim();
        if (t === 'windows' || t === 'cmd' || t === 'cmd.exe') {
            closeZsh();
            if (openCmdRef) {
                openCmdRef();
            }
            return '';
        }
        return `<div class="text-red-400">Usage: switch windows (switches environment to Windows Command Prompt)</div>`;
    }

    // Builders for virtual files
    function getAboutText(d) {
        return `Name: ${d.name}\nRole: ${d.role}\nBio: ${d.shortBio}\nEmail: ${d.email}`;
    }

    function getProjectsMarkdown(d) {
        return (d.projects || []).map(p => `# ${p.title} (${p.category})\n${p.description}\nTech: ${(p.tech || []).join(', ')}\nDemo: ${p.link || 'N/A'}\nCode: ${p.github || 'N/A'}`).join('\n\n');
    }

    function getExperienceText(d) {
        return (d.experience || []).map(e => `[${e.year}] ${e.title} at ${e.company}\n${e.description}`).join('\n\n');
    }

    function getEducationText(d) {
        return (d.education || []).map(e => `${e.institution} (${e.year})\nDegree: ${e.degree}\nAffiliation: ${e.affiliation}`).join('\n\n');
    }

    // cmd routers

    function execute(rawCmd) {
        const trimmed = rawCmd.trim();

        // Echo prompt line
        const lineDiv = document.createElement('div');
        lineDiv.className = 'zsh-line-entry';
        lineDiv.innerHTML = `
          <span class="text-emerald-400 font-bold">➜</span>
          <span class="text-cyan-400 font-bold text-xs ml-1.5">portfolio</span>
          <span class="text-gray-100 font-semibold ml-2 text-xs">${escapeHtml(trimmed)}</span>
        `;
        zshOutput.appendChild(lineDiv);

        if (!trimmed) {
            scrollToBottom();
            return;
        }

        // Add to history
        if (history[history.length - 1] !== trimmed) {
            history.push(trimmed);
        }
        historyIndex = history.length;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        const argStr = args.join(' ');

        let responseHtml = '';

        switch (cmd) {
            case 'help':
            case '?':
                responseHtml = handleHelp();
                break;

            case 'neofetch':
            // case 'fastfetch':
                responseHtml = handleNeofetch();
                break;

            case 'about':
            case 'bio':
            case 'info':
                responseHtml = handleAbout();
                break;

            case 'skills':
            case 'skill':
            case 'tech':
                responseHtml = handleSkills();
                break;

            case 'projects':
            case 'work':
                responseHtml = handleProjects();
                break;

            case 'project':
                responseHtml = handleProjectDetail(argStr);
                break;

            case 'experience':
            case 'exp':
            case 'jobs':
                responseHtml = handleExperience();
                break;

            case 'education':
            case 'edu':
                responseHtml = handleEducation();
                break;

            case 'contact':
            case 'email':
                responseHtml = handleContact();
                break;

            case 'socials':
            case 'social':
            case 'links':
                responseHtml = handleSocials();
                break;

            case 'resume':
            case 'cv':
                responseHtml = `
<div class="zsh-section">
<div class="text-emerald-400 font-bold mb-1">RESUME // CREDENTIALS</div>
Aditya Jha - Full Stack // Backend // AI Developer
Current Resume is available upon request: <a href="mailto:${data.email}" class="zsh-link">${data.email}</a>
GitHub:  <a href="https://github.com/adityajha-coder" target="_blank" class="zsh-link">https://github.com/adityajha-coder</a>
LinkedIn:<a href="https://www.linkedin.com/in/aditya-jha-8534a1305/" target="_blank" class="zsh-link">https://www.linkedin.com/in/aditya-jha-8534a1305/</a>
</div>`;
                break;

            case 'ls':
            case 'dir':
                responseHtml = handleLs(argStr);
                break;

            case 'cat':
            case 'type':
                responseHtml = handleCat(argStr);
                break;

            case 'pwd':
                responseHtml = `<div class="zsh-line text-xs font-mono text-gray-300">/home/adzyy/portfolio</div>`;
                break;

            case 'whoami':
                responseHtml = `<div class="zsh-line text-xs font-mono text-emerald-400 font-semibold">adzyy</div>`;
                break;

            case 'uname':
                responseHtml = `<div class="zsh-line text-xs font-mono text-gray-300">Linux adzyy-os 6.8.0-adzyy #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</div>`;
                break;

            case 'date':
                responseHtml = `<div class="zsh-line text-xs font-mono text-gray-300">${new Date().toString()}</div>`;
                break;

            case 'clear':
            case 'cls':
                clearOutput();
                return;

            case 'history':
                let hStr = '';
                history.forEach((h, i) => {
                    hStr += `${(i + 1).toString().padStart(4, ' ')}  ${escapeHtml(h)}\n`;
                });
                responseHtml = `<div class="zsh-section"><pre class="font-mono text-xs">${hStr}</pre></div>`;
                break;

            case 'switch':
                responseHtml = handleSwitch(argStr);
                if (!responseHtml) return;
                break;

            case 'cmd':
                handleSwitch('windows');
                return;

            case 'cowsay':
                responseHtml = handleCowsay(argStr);
                break;

            case 'matrix':
                responseHtml = `<div class="text-emerald-400 font-mono text-xs">Entering the Matrix... Wake up, adzyy.</div>`;
                break;

            case 'exit':
            case 'quit':
                closeZsh();
                return;

            default:
                responseHtml = `<div class="text-red-400 text-xs font-mono">zsh: command not found: ${escapeHtml(cmd)}. Type '<span class="text-cyan-400">help</span>' for a list of commands.</div>`;
                break;
        }

        appendOutput(responseHtml);
    }

    //listners
    zshInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = zshInput.value;
            zshInput.value = '';
            execute(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                if (historyIndex > 0) {
                    historyIndex--;
                }
                zshInput.value = history[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (history.length > 0) {
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    zshInput.value = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    zshInput.value = '';
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const val = zshInput.value.trim().toLowerCase();
            if (val) {
                const match = COMMANDS.find(c => c.startsWith(val));
                if (match) {
                    zshInput.value = match;
                } else {
                    const fileMatch = Object.keys(virtualFiles).find(f => f.startsWith(val));
                    if (fileMatch) {
                        zshInput.value = fileMatch;
                    }
                }
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeZsh();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            clearOutput();
        }
    });

    zshBody.addEventListener('click', () => {
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            zshInput.focus();
        }
    });

    if (zshCloseBtn) zshCloseBtn.addEventListener('click', closeZsh);
    if (zshMinimizeBtn) zshMinimizeBtn.addEventListener('click', closeZsh);
    if (zshMaximizeBtn) zshMaximizeBtn.addEventListener('click', toggleMaximize);

    if (selectLinuxBtn) {
        selectLinuxBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openZsh();
        });
    }

    if (mobileLinuxBtn) {
        mobileLinuxBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openZsh();
        });
    }

    zshModal.addEventListener('click', (e) => {
        if (e.target === zshModal) {
            closeZsh();
        }
    });

    return {
        openZsh,
        closeZsh
    };
}
