// cmd.js - Windows Command Prompt Component for Aditya Jha Portfolio

export function initCmd(data) {
    const cmdModal = document.getElementById('cmd-modal');
    const cmdWindow = document.getElementById('cmd-window');
    const cmdTitleBar = document.getElementById('cmd-title-bar');
    const cmdBody = document.getElementById('cmd-body');
    const cmdOutput = document.getElementById('cmd-output');
    const cmdInput = document.getElementById('cmd-input');
    const cmdToggleBtn = document.getElementById('cmd-toggle-btn');
    const mobileCmdBtn = document.getElementById('mobile-cmd-btn');
    const cmdCloseBtn = document.getElementById('cmd-close-btn');
    const cmdMinimizeBtn = document.getElementById('cmd-minimize-btn');
    const cmdMaximizeBtn = document.getElementById('cmd-maximize-btn');
    const cmdMaximizeIcon = document.getElementById('cmd-maximize-icon');

    if (!cmdModal || !cmdInput || !cmdOutput) {
        console.warn('CMD elements missing from DOM');
        return;
    }

    let isOpen = false;
    let isMaximized = false;
    const history = [];
    let historyIndex = -1;

    // Available commands for auto-complete and help
    const COMMANDS = [
        'help',
        'about',
        'skills',
        'projects',
        'project',
        'experience',
        'education',
        'contact',
        'socials',
        'resume',
        'dir',
        'type',
        'cls',
        'clear',
        'color',
        'gui',
        'whoami',
        'date',
        'time',
        'echo',
        'exit'
    ];

    // Virtual files for 'dir' and 'type' commands
    const virtualFiles = {
        'about.txt': () => getAboutText(data),
        'skills.json': () => JSON.stringify(data.skills, null, 2),
        'projects.md': () => getProjectsMarkdown(data),
        'experience.txt': () => getExperienceText(data),
        'education.txt': () => getEducationText(data),
        'contact.vcf': () => `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.role}\nEMAIL:${data.email}\nURL:https://github.com/adityajha-coder\nEND:VCARD`,
        'resume.txt': () => `Aditya Jha - Full Stack Developer\nResume available upon request: ${data.email}\nGitHub: https://github.com/adityajha-coder\nLinkedIn: https://www.linkedin.com/in/aditya-jha-8534a1305/`
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

    function openCmd() {
        if (isOpen) return;
        isOpen = true;
        cmdModal.classList.remove('opacity-0', 'pointer-events-none');
        cmdModal.classList.add('opacity-100', 'pointer-events-auto');
        cmdWindow.classList.remove('scale-95');
        cmdWindow.classList.add('scale-100');

        // Close mobile drawer if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }

        // Print initial banner if empty
        if (cmdOutput.innerHTML.trim() === '') {
            printWelcomeBanner();
        }

        setTimeout(() => {
            cmdInput.focus();
            scrollToBottom();
        }, 50);
    }

    function closeCmd() {
        if (!isOpen) return;
        isOpen = false;
        cmdModal.classList.remove('opacity-100', 'pointer-events-auto');
        cmdModal.classList.add('opacity-0', 'pointer-events-none');
        cmdWindow.classList.remove('scale-100');
        cmdWindow.classList.add('scale-95');
    }

    function toggleMaximize() {
        isMaximized = !isMaximized;
        if (isMaximized) {
            cmdWindow.classList.add('cmd-window-maximized');
            if (cmdMaximizeIcon) {
                // Restore icon (overlapping squares)
                cmdMaximizeIcon.innerHTML = '&#x29C9;';
            }
        } else {
            cmdWindow.classList.remove('cmd-window-maximized');
            if (cmdMaximizeIcon) {
                // Maximize square icon
                cmdMaximizeIcon.innerHTML = '&#x25A2;';
            }
        }
        cmdInput.focus();
        scrollToBottom();
    }

    function scrollToBottom() {
        if (cmdBody) {
            cmdBody.scrollTop = cmdBody.scrollHeight;
        }
    }

    function printWelcomeBanner() {
        const bannerHtml = `
<div class="cmd-banner">
Microsoft Windows [Version 10.0.22631.3007]
(c) Microsoft Corporation. All rights reserved.

<span class="cmd-text-bright">C:\\Users\\Aditya&gt; portfolio.exe --interactive</span>
================================================================================
 <span class="cmd-text-cyan">${escapeHtml(data.name).toUpperCase()}</span> - COMMAND PROMPT
================================================================================
Type '<span class="cmd-text-yellow">help</span>' to view all available commands.
Type '<span class="cmd-text-yellow">exit</span>' or press <span class="cmd-text-yellow">ESC</span> to close this terminal.
</div>`;
        cmdOutput.innerHTML = bannerHtml;
    }

    function appendOutput(html) {
        const block = document.createElement('div');
        block.className = 'cmd-output-block';
        block.innerHTML = html;
        cmdOutput.appendChild(block);
        scrollToBottom();
    }

    function clearOutput() {
        cmdOutput.innerHTML = '';
        scrollToBottom();
    }

    // -------------------------------------------------------------
    // Command Handlers
    // -------------------------------------------------------------

    function handleHelp() {
        return `
<div class="cmd-section">
<div class="cmd-title-header">AVAILABLE COMMAND PROMPTS</div>
--------------------------------------------------------------------------------
<span class="cmd-col-cmd">about</span>          Know about Aditya
<span class="cmd-col-cmd">skills</span>         Technical skills 
<span class="cmd-col-cmd">projects</span>       List all featured projects
<span class="cmd-col-cmd">project &lt;name&gt;</span>  Deep dive into a specific project (e.g. <span class="cmd-text-yellow">project trivoxa</span>)
<span class="cmd-col-cmd">experience</span>     Work history
<span class="cmd-col-cmd">education</span>      Education related stuffs
<span class="cmd-col-cmd">contact</span>        Direct email & collaboration details
<span class="cmd-col-cmd">socials</span>        GitHub, LinkedIn, Instagram, and X profiles
<span class="cmd-col-cmd">resume</span>         Resume details and credentials
--------------------------------------------------------------------------------
<span class="cmd-col-cmd">dir</span>            List virtual directory contents of C:\\Users\\Aditya\\Portfolio
<span class="cmd-col-cmd">type &lt;file&gt;</span>     Display contents of a file (e.g. <span class="cmd-text-yellow">type about.txt</span>)
<span class="cmd-col-cmd">color &lt;attr&gt;</span>    Change console color (e.g. <span class="cmd-text-yellow">color 0a</span> for Matrix, <span class="cmd-text-yellow">color 0b</span>, <span class="cmd-text-yellow">color 07</span>)
<span class="cmd-col-cmd">gui &lt;section&gt;</span>  Scroll site to section (<span class="cmd-text-yellow">gui work</span>, <span class="cmd-text-yellow">gui about</span>, <span class="cmd-text-yellow">gui contact</span>)
<span class="cmd-col-cmd">cls / clear</span>    Clear screen
<span class="cmd-col-cmd">whoami</span>         Display current session user info
<span class="cmd-col-cmd">date / time</span>    Print current system date & time
<span class="cmd-col-cmd">echo &lt;text&gt;</span>    Print text to the console
<span class="cmd-col-cmd">exit</span>           Close the command prompt
--------------------------------------------------------------------------------
<span class="cmd-text-dim">Tip: Use UP/DOWN arrow keys for history, TAB for autocompletion.</span>
</div>`;
    }

    function handleAbout() {
        const sections = data.aboutSections || {};
        let html = `
<div class="cmd-section">
<div class="cmd-title-header">PROFILE: ${escapeHtml(data.name).toUpperCase()}</div>
<div class="cmd-line"><span class="cmd-text-dim">Role:</span>     ${escapeHtml(data.role)}</div>
<div class="cmd-line"><span class="cmd-text-dim">Bio:</span>      ${escapeHtml(data.shortBio)}</div>
<div class="cmd-line"><span class="cmd-text-dim">Contact:</span>  ${escapeHtml(data.email)}</div>
<br/>`;

        if (sections.whyProgramming) {
            html += `<div class="cmd-subtitle">&gt; ${escapeHtml(sections.whyProgramming.title)}:</div>`;
            sections.whyProgramming.points.forEach(pt => {
                html += `<div class="cmd-bullet">&#x2022; ${escapeHtml(pt)}</div>`;
            });
            html += `<br/>`;
        }

        if (sections.problemsEnjoyed) {
            html += `<div class="cmd-subtitle">&gt; ${escapeHtml(sections.problemsEnjoyed.title)}:</div>`;
            sections.problemsEnjoyed.points.forEach(pt => {
                const formatted = pt.replace(/\*\*(.*?)\*\*/g, '<span class="cmd-text-bright">$1</span>');
                html += `<div class="cmd-bullet">&#x2022; ${formatted}</div>`;
            });
            html += `<br/>`;
        }

        if (sections.careerGoals) {
            html += `<div class="cmd-subtitle">&gt; ${escapeHtml(sections.careerGoals.title)}:</div>`;
            sections.careerGoals.points.forEach(pt => {
                const formatted = pt.replace(/\*\*(.*?)\*\*/g, '<span class="cmd-text-bright">$1</span>');
                html += `<div class="cmd-bullet">&#x2022; ${formatted}</div>`;
            });
        }

        html += `</div>`;
        return html;
    }

    function handleSkills(sub) {
        const s = data.skills || {};
        const filter = (sub || '').toLowerCase();

        const languages = (s.languages || []).map(i => i.name).join(', ');
        const frontend = (s.frontend || []).map(i => i.name).join(', ');
        const backend = (s.backend || []).map(i => i.name).join(', ');
        const tools = (s.tools || []).map(i => i.name).join(', ');
        const softSkills = (data.softSkills || []).map(i => i.name).join(', ');

        return `
<div class="cmd-section">
<div class="cmd-title-header">TECHNICAL SKILL INVENTORY</div>
--------------------------------------------------------------------------------
<span class="cmd-col-cat">[LANGUAGES]</span>    ${escapeHtml(languages)}
<span class="cmd-col-cat">[FRONTEND]</span>     ${escapeHtml(frontend)}
<span class="cmd-col-cat">[BACKEND]</span>      ${escapeHtml(backend)}
<span class="cmd-col-cat">[TOOLS &amp; OPS]</span>  ${escapeHtml(tools)}
<span class="cmd-col-cat">[SOFT SKILLS]</span>  ${escapeHtml(softSkills)}
--------------------------------------------------------------------------------
<span class="cmd-text-dim">Total Technologies Tracked: ${(s.languages || []).length + (s.frontend || []).length + (s.backend || []).length + (s.tools || []).length}</span>
</div>`;
    }

    function handleProjects() {
        const projs = data.projects || [];
        let html = `
<div class="cmd-section">
<div class="cmd-title-header">FEATURED PROJECTS (Total: ${projs.length})</div>
--------------------------------------------------------------------------------`;

        projs.forEach((p, idx) => {
            const techStr = (p.tech || []).join(' | ');
            html += `
<div class="cmd-project-item">
  <div class="cmd-line"><span class="cmd-text-yellow">[${idx + 1}] ${escapeHtml(p.title)}</span> <span class="cmd-tag-badge">&lt;${escapeHtml(p.category)}&gt;</span></div>
  <div class="cmd-line cmd-text-dim">${escapeHtml(p.description)}</div>
  <div class="cmd-line"><span class="cmd-text-cyan">Stack:</span> ${escapeHtml(techStr)}</div>
  <div class="cmd-line">${p.link ? `<a href="${p.link}" target="_blank" class="cmd-link">[Live Demo: ${p.link}]</a>  ` : ''}${p.github ? `<a href="${p.github}" target="_blank" class="cmd-link">[GitHub: ${p.github}]</a>` : ''}</div>
</div>`;
        });

        html += `
--------------------------------------------------------------------------------
<span class="cmd-text-dim">Tip: Type '<span class="cmd-text-yellow">project &lt;name&gt;</span>' (e.g. '<span class="cmd-text-yellow">project trivoxa</span>') for details.</span>
</div>`;
        return html;
    }

    function handleProjectDetail(targetName) {
        if (!targetName) {
            return `<div class="cmd-error">Usage: project &lt;project-name&gt; (e.g., project trivoxa, project authors)</div>`;
        }
        const projs = data.projects || [];
        const match = projs.find(p => p.title.toLowerCase().includes(targetName.toLowerCase()));

        if (!match) {
            const names = projs.map(p => p.title.toLowerCase()).join(', ');
            return `<div class="cmd-error">Project '${escapeHtml(targetName)}' not found. Available: ${escapeHtml(names)}</div>`;
        }

        return `
<div class="cmd-section">
<div class="cmd-title-header">PROJECT: ${escapeHtml(match.title).toUpperCase()}</div>
<div class="cmd-line"><span class="cmd-text-dim">Category:</span>     ${escapeHtml(match.category)}</div>
<div class="cmd-line"><span class="cmd-text-dim">Tech Stack:</span>   ${escapeHtml((match.tech || []).join(', '))}</div>
<br/>
<div class="cmd-line"><span class="cmd-subtitle">Overview:</span></div>
<div class="cmd-line">${escapeHtml(match.description)}</div>
<br/>
<div class="cmd-line">${match.link ? `<span class="cmd-text-dim">Live Website:</span> <a href="${match.link}" target="_blank" class="cmd-link">${match.link}</a><br/>` : ''}${match.github ? `<span class="cmd-text-dim">Source Code:</span>  <a href="${match.github}" target="_blank" class="cmd-link">${match.github}</a>` : ''}</div>
</div>`;
    }

    function handleExperience() {
        const exp = data.experience || [];
        let html = `
<div class="cmd-section">
<div class="cmd-title-header">WORK EXPERIENCE &amp; CONTRIBUTIONS</div>
--------------------------------------------------------------------------------`;

        exp.forEach(e => {
            html += `
<div class="cmd-line"><span class="cmd-text-yellow">&gt; ${escapeHtml(e.title)}</span> | <span class="cmd-text-bright">${escapeHtml(e.company)}</span> <span class="cmd-text-dim">(${escapeHtml(e.year)})</span></div>
<div class="cmd-bullet">${escapeHtml(e.description)}</div>
<br/>`;
        });

        html += `--------------------------------------------------------------------------------</div>`;
        return html;
    }

    function handleEducation() {
        const edu = data.education || [];
        let html = `
<div class="cmd-section">
<div class="cmd-title-header">ACADEMIC BACKGROUND</div>
--------------------------------------------------------------------------------`;

        edu.forEach(item => {
            html += `
<div class="cmd-line"><span class="cmd-text-yellow">&gt; ${escapeHtml(item.institution)}</span></div>
<div class="cmd-bullet">&#x2022; <span class="cmd-text-bright">Degree:</span>      ${escapeHtml(item.degree)}</div>
<div class="cmd-bullet">&#x2022; <span class="cmd-text-dim">Affiliation:</span> ${escapeHtml(item.affiliation)}</div>
<div class="cmd-bullet">&#x2022; <span class="cmd-text-dim">Timeline:</span>    ${escapeHtml(item.year)}</div>
<br/>`;
        });

        html += `--------------------------------------------------------------------------------</div>`;
        return html;
    }

    function handleContact() {
        return `
<div class="cmd-section">
<div class="cmd-title-header">CONTACT INFORMATION</div>
--------------------------------------------------------------------------------
<span class="cmd-text-dim">Name:</span>       ${escapeHtml(data.name)}
<span class="cmd-text-dim">Role:</span>       ${escapeHtml(data.role)}
<span class="cmd-text-dim">Email:</span>      <a href="mailto:${data.email}" class="cmd-link">${escapeHtml(data.email)}</a>
<span class="cmd-text-dim">Status:</span>     Open to collaboration, software roles &amp; freelance opportunities.
--------------------------------------------------------------------------------
<span class="cmd-text-dim">Send an email directly by clicking the link above, or use the website contact form.</span>
</div>`;
    }

    function handleSocials() {
        const socials = data.socials || [];
        let html = `
<div class="cmd-section">
<div class="cmd-title-header">ONLINE PROFILES &amp; SOCIALS</div>
--------------------------------------------------------------------------------`;

        socials.forEach(s => {
            html += `
<div class="cmd-line"><span class="cmd-col-cmd">${escapeHtml(s.name)}</span> <a href="${s.url}" target="_blank" class="cmd-link">${escapeHtml(s.url)}</a></div>`;
        });

        html += `--------------------------------------------------------------------------------</div>`;
        return html;
    }

    function handleDir() {
        const files = Object.keys(virtualFiles);
        let listHtml = '';
        let totalBytes = 0;

        files.forEach(fileName => {
            const size = virtualFiles[fileName]().length;
            totalBytes += size;
            const sizeFormatted = size.toLocaleString().padStart(9, ' ');
            listHtml += `22-10-2026  01:00              ${sizeFormatted} ${fileName}\n`;
        });

        return `
<div class="cmd-section">
 Volume in drive C is OS
 Volume Serial Number is 4C22-89A1

 Directory of C:\\Users\\Aditya\\Portfolio

22-10-2026  01:00    &lt;DIR&gt;          .
22-10-2026  01:00    &lt;DIR&gt;          ..
${listHtml}               ${files.length} File(s)         ${totalBytes.toLocaleString()} bytes
               2 Dir(s)  142,593,212,416 bytes free
</div>`;
    }

    function handleType(fileName) {
        if (!fileName) {
            return `<div class="cmd-error">The syntax of the command is incorrect. Usage: type &lt;filename&gt; (e.g. type about.txt)</div>`;
        }

        const matchKey = Object.keys(virtualFiles).find(k => k.toLowerCase() === fileName.toLowerCase());
        if (!matchKey) {
            return `<div class="cmd-error">The system cannot find the file specified: '${escapeHtml(fileName)}'. Type 'dir' to see files.</div>`;
        }

        const content = virtualFiles[matchKey]();
        return `<div class="cmd-section"><pre class="cmd-pre">${escapeHtml(content)}</pre></div>`;
    }

    function handleColor(attr) {
        if (!attr || attr === 'reset' || attr === 'default') {
            cmdWindow.style.color = '#cccccc';
            cmdWindow.style.backgroundColor = '#0c0c0c';
            return `<div class="cmd-line">Console colors reset to default (07: Silver on Black).</div>`;
        }

        const COLOR_MAP = {
            '0': '#000000',
            '1': '#000080',
            '2': '#008000',
            '3': '#008080',
            '4': '#800000',
            '5': '#800080',
            '6': '#808000',
            '7': '#cccccc',
            '8': '#808080',
            '9': '#0000ff',
            'a': '#00ff66',
            'b': '#00ffff',
            'c': '#ff3333',
            'd': '#ff00ff',
            'e': '#ffff33',
            'f': '#ffffff'
        };

        const cleaned = attr.trim().toLowerCase();
        if (cleaned.length === 2 && COLOR_MAP[cleaned[0]] && COLOR_MAP[cleaned[1]]) {
            const bg = COLOR_MAP[cleaned[0]];
            const fg = COLOR_MAP[cleaned[1]];
            cmdWindow.style.backgroundColor = bg;
            cmdWindow.style.color = fg;
            return `<div class="cmd-line">Console color set to '${cleaned.toUpperCase()}'. Type 'color reset' to restore.</div>`;
        } else if (cleaned.length === 1 && COLOR_MAP[cleaned]) {
            cmdWindow.style.color = COLOR_MAP[cleaned];
            return `<div class="cmd-line">Console text color set to '${cleaned.toUpperCase()}'.</div>`;
        } else {
            return `
<div class="cmd-error">
Invalid color attribute.
Usage: color [attr]
Colors: 0=Black, 7=Silver, a=Matrix Green, b=Aqua, c=Red, e=Yellow, f=Bright White.
Example: color 0a (Matrix style) or color reset
</div>`;
        }
    }

    function handleGui(section) {
        const sec = (section || '').toLowerCase();
        const map = {
            'home': 'home',
            'about': 'about',
            'work': 'work',
            'projects': 'work',
            'experience': 'experience',
            'contact': 'contact'
        };

        const targetId = map[sec] || 'home';
        const targetEl = document.getElementById(targetId);

        closeCmd();
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return '';
    }

    function handleDate() {
        const now = new Date();
        return `<div class="cmd-line">The current date is: ${now.toDateString()}</div>`;
    }

    function handleTime() {
        const now = new Date();
        return `<div class="cmd-line">The current time is: ${now.toLocaleTimeString()}</div>`;
    }

    function handleWhoami() {
        return `<div class="cmd-line">aditya-portfolio\\visitor (Privilege Level: Interactive Guest User)</div>`;
    }

    // Helper builders for virtual files
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

    // -------------------------------------------------------------
    // Execute Command Router
    // -------------------------------------------------------------

    function execute(rawCmd) {
        const trimmed = rawCmd.trim();

        // Echo command line into output
        const lineDiv = document.createElement('div');
        lineDiv.className = 'cmd-line-entry';
        lineDiv.innerHTML = `<span class="cmd-prompt-path">C:\\Users\\Aditya&gt;</span> <span class="cmd-executed-cmd">${escapeHtml(trimmed)}</span>`;
        cmdOutput.appendChild(lineDiv);

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
            case 'commands':
                responseHtml = handleHelp();
                break;

            case 'about':
            case 'bio':
            case 'info':
                responseHtml = handleAbout();
                break;

            case 'skills':
            case 'skill':
            case 'tech':
            case 'stack':
                responseHtml = handleSkills(argStr);
                break;

            case 'projects':
            case 'work':
            case 'portfolio':
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
            case 'college':
                responseHtml = handleEducation();
                break;

            case 'contact':
            case 'email':
            case 'reach':
                responseHtml = handleContact();
                break;

            case 'socials':
            case 'social':
            case 'links':
            case 'github':
            case 'linkedin':
                responseHtml = handleSocials();
                break;

            case 'resume':
            case 'cv':
                responseHtml = `
<div class="cmd-section">
<div class="cmd-title-header">RESUME &amp; CREDENTIALS</div>
--------------------------------------------------------------------------------
Aditya Jha - Full Stack // Backend // AI Developer
Current Resume is available upon direct request.
Contact: <a href="mailto:${data.email}" class="cmd-link">${data.email}</a>
GitHub:  <a href="https://github.com/adityajha-coder" target="_blank" class="cmd-link">https://github.com/adityajha-coder</a>
LinkedIn:<a href="https://www.linkedin.com/in/aditya-jha-8534a1305/" target="_blank" class="cmd-link">https://www.linkedin.com/in/aditya-jha-8534a1305/</a>
--------------------------------------------------------------------------------
</div>`;
                break;

            case 'dir':
            case 'ls':
                responseHtml = handleDir();
                break;

            case 'type':
            case 'cat':
                responseHtml = handleType(argStr);
                break;

            case 'cls':
            case 'clear':
                clearOutput();
                return;

            case 'color':
                responseHtml = handleColor(argStr);
                break;

            case 'gui':
                responseHtml = handleGui(argStr);
                if (!responseHtml) return;
                break;

            case 'whoami':
                responseHtml = handleWhoami();
                break;

            case 'date':
                responseHtml = handleDate();
                break;

            case 'time':
                responseHtml = handleTime();
                break;

            case 'echo':
                responseHtml = `<div class="cmd-line">${escapeHtml(argStr)}</div>`;
                break;

            case 'exit':
            case 'quit':
                closeCmd();
                return;

            // Authentic easter eggs / commands
            case 'sudo':
                responseHtml = `<div class="cmd-error">aditya is not in the sudoers file. This incident will be reported to C:\\WINDOWS\\System32\\security.log.</div>`;
                break;

            case 'ver':
                responseHtml = `<div class="cmd-line">Microsoft Windows [Version 10.0.22631.3007]</div>`;
                break;

            case 'ipconfig':
                responseHtml = `
<div class="cmd-section">
Windows IP Configuration

Ethernet adapter vEthernet (WSL):
   Connection-specific DNS Suffix  . :
   IPv4 Address. . . . . . . . . . . : 172.28.16.1
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :
</div>`;
                break;

            case 'ping':
                const host = argStr || 'portfolio.adityajha.dev';
                responseHtml = `
<div class="cmd-section">
Pinging ${escapeHtml(host)} [127.0.0.1] with 32 bytes of data:
Reply from 127.0.0.1: bytes=32 time&lt;1ms TTL=128
Reply from 127.0.0.1: bytes=32 time&lt;1ms TTL=128
Reply from 127.0.0.1: bytes=32 time&lt;1ms TTL=128
Reply from 127.0.0.1: bytes=32 time&lt;1ms TTL=128

Ping statistics for 127.0.0.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms
</div>`;
                break;

            case 'matrix':
                handleColor('0a');
                responseHtml = `<div class="cmd-line cmd-text-green">Wake up, Neo... The Matrix has you. (Theme set to Matrix green)</div>`;
                break;

            default:
                responseHtml = `<div class="cmd-error">'${escapeHtml(cmd)}' is not recognized as an internal or external command, operable program or batch file. Type '<span class="cmd-text-yellow">help</span>' for a list of commands.</div>`;
                break;
        }

        appendOutput(responseHtml);
    }

    // -------------------------------------------------------------
    // Event Listeners
    // -------------------------------------------------------------

    // Input Key Handling
    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = cmdInput.value;
            cmdInput.value = '';
            execute(val);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                if (historyIndex > 0) {
                    historyIndex--;
                }
                cmdInput.value = history[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (history.length > 0) {
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    cmdInput.value = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    cmdInput.value = '';
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const val = cmdInput.value.trim().toLowerCase();
            if (val) {
                const match = COMMANDS.find(c => c.startsWith(val));
                if (match) {
                    cmdInput.value = match;
                }
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeCmd();
        } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            clearOutput();
        }
    });

    // Clicking anywhere in the terminal window focuses input
    cmdBody.addEventListener('click', (e) => {
        // Only focus if user isn't actively selecting text
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
            cmdInput.focus();
        }
    });

    // Button Triggers
    if (cmdToggleBtn) {
        cmdToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isOpen) {
                closeCmd();
            } else {
                openCmd();
            }
        });
    }

    if (mobileCmdBtn) {
        mobileCmdBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCmd();
        });
    }

    if (cmdCloseBtn) {
        cmdCloseBtn.addEventListener('click', closeCmd);
    }

    if (cmdMinimizeBtn) {
        cmdMinimizeBtn.addEventListener('click', closeCmd);
    }

    if (cmdMaximizeBtn) {
        cmdMaximizeBtn.addEventListener('click', toggleMaximize);
    }

    // Close when clicking modal backdrop
    cmdModal.addEventListener('click', (e) => {
        if (e.target === cmdModal) {
            closeCmd();
        }
    });

    // Global keyboard shortcut: Backtick / Tilde (`) to toggle CMD
    document.addEventListener('keydown', (e) => {
        // Toggle with backtick ` (unless typing inside another input/textarea)
        if (e.key === '`' || e.key === '~') {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'textarea' && (activeTag !== 'input' || document.activeElement === cmdInput)) {
                e.preventDefault();
                if (isOpen) {
                    closeCmd();
                } else {
                    openCmd();
                }
            }
        } else if (e.key === 'Escape' && isOpen) {
            closeCmd();
        }
    });
}
