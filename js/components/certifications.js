export function renderCertifications(certifications) {
    const certificationsContainer = document.getElementById('certifications-list');
    if (!certificationsContainer) return;

    // Clear existing content to prevent duplication on re-renders
    certificationsContainer.innerHTML = '';

    certifications.forEach((cert, index) => {
        const itemHtml = `
            <div class="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 transform hover:border-pink-500/30 flex flex-col h-full">
                <button class="w-full flex justify-between items-center p-5 sm:p-6 hover:bg-white/5 transition-colors focus:outline-none cert-accordion-toggle group" data-index="${index}">
                    <div class="text-left pr-4">
                        <h3 class="text-lg sm:text-xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300 drop-shadow-md leading-tight">${cert.title}</h3>
                    </div>
                    <div class="bg-white/5 p-2 sm:p-3 rounded-full group-hover:bg-pink-500/20 transition-colors duration-300 flex-shrink-0">
                        <i data-lucide="chevron-down" class="text-gray-300 transition-transform duration-500 cert-icon-${index} w-5 h-5"></i>
                    </div>
                </button>
                <div class="hidden cert-content-${index} transition-all duration-500 origin-top flex-grow">
                    <div class="px-5 pb-5 sm:px-6 sm:pb-6 flex justify-center items-center h-full">
                        <img src="${cert.image}" alt="${cert.title}" class="max-w-full h-auto rounded-xl border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.15)] cursor-pointer" onclick="window.open('${cert.image}', '_blank')">
                    </div>
                </div>
            </div>
        `;
        certificationsContainer.innerHTML += itemHtml;
    });

    // Add event listeners for the accordion
    const toggleButtons = document.querySelectorAll('.cert-accordion-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const content = document.querySelector(`.cert-content-${index}`);
            const icon = document.querySelector(`.cert-icon-${index}`);

            if (content.classList.contains('hidden')) {
                // Show
                content.classList.remove('hidden');
                // Use a short timeout to allow the display:block to render before triggering opacity/transform transitions if any were added
                setTimeout(() => {
                    icon.style.transform = 'rotate(180deg)';
                    icon.classList.replace('text-gray-300', 'text-pink-400');
                }, 10);
            } else {
                // Hide
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
                icon.classList.replace('text-pink-400', 'text-gray-300');
            }
        });
    });

    // Refresh lucide icons for newly added elements
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}
