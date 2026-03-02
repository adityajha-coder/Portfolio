export function renderAbout(data) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = data.longBio.map(p => `<p>${p}</p>`).join('');
    }

    const codeBlock = document.getElementById('code-block');
    if (codeBlock) {
        codeBlock.innerHTML = `
        <p class="mb-2"><span class="text-pink-500">const</span> <span class="text-yellow-300">developer</span> = {</p>
        <p class="pl-4 mb-1">name: <span class="text-cyan-300">"${data.name}"</span>,</p>
        <p class="pl-4 mb-1">skills: [<span class="text-cyan-300">"FullStack"</span>, <span class="text-cyan-300">"AI"</span>],</p>
        <p class="pl-4 mb-1">status: <span class="text-green-300">"Open to Work"</span>,</p>
        <p class="pl-4 mb-1">hire: <span class="text-pink-500">() =></span> {</p>
        <p class="pl-8 text-gray-500">// Let's build something great...</p>
        <p class="pl-8">return <span class="text-purple-400">Collaboration</span>.start();</p>
        <p class="pl-4">}</p>
        <p>}</p>
        <p class="mt-4 animate-pulse">> system_ready_</p>
    `;
    }
}