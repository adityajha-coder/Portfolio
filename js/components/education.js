export function renderEducation(education) {
    const educationContainer = document.getElementById('education-list');
    if (!educationContainer) return;

    education.forEach(edu => {
        const logoHtml = edu.logo ? `<img src="${edu.logo}" alt="${edu.institution} Logo" class="h-12 w-auto bg-white/10 p-1 rounded-md">` : '';

        const eduItem = `
            <div class="glass-panel p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-300">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 md:gap-2">
                    <div class="flex items-center gap-4">
                        ${logoHtml}
                        <div>
                            <h3 class="text-2xl font-bold text-white">${edu.institution}</h3>
                            <p class="text-pink-400 font-medium">${edu.affiliation}</p>
                        </div>
                    </div>
                    <span class="px-4 py-1 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10 uppercase tracking-wider font-semibold whitespace-nowrap">
                        ${edu.year}
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-pink-500"></div>
                    <p class="text-gray-300 text-lg">${edu.degree}</p>
                </div>
            </div>
        `;
        educationContainer.innerHTML += eduItem;
    });
}
