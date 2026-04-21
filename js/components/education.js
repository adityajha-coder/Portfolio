export function renderEducation(education) {
    const educationContainer = document.getElementById('education-list');
    if (!educationContainer) return;

    education.forEach(edu => {
        const eduItem = `
            <div class="glass-panel p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-300">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                    <div>
                        <h3 class="text-2xl font-bold text-white">${edu.institution}</h3>
                        <p class="text-pink-400 font-medium">${edu.affiliation}</p>
                    </div>
                    <span class="px-4 py-1 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10 uppercase tracking-wider font-semibold">
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
