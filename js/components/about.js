export function renderAbout(data) {
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = data.longBio.map(p => `<p>${p}</p>`).join('');
    }

    const codeBlock = document.getElementById('code-block');
    if (codeBlock) {
        const fullHtml = `
        <p class="mb-2"><span class="text-pink-500">const</span> <span class="text-yellow-300">developer</span> = {</p>
        <p class="pl-4 mb-1">name: <span class="text-cyan-300">"${data.name}"</span>,</p>
        <p class="pl-4 mb-1">skills: [<span class="text-cyan-300">"FullStack"</span>, <span class="text-cyan-300">"AI"</span>],</p>
        <p class="pl-4 mb-1">status: <span class="text-green-300">"Open to Work"</span>,</p>
        <p class="pl-4 mb-1">hire: <span class="text-pink-500">() =></span> {</p>
        <p class="pl-8 text-gray-500">// Let's build something great...</p>
        <p class="pl-8">return <span class="text-purple-400">Collaboration</span>.start();</p>
        <p class="pl-4">}</p>
        <p>}</p>
        <p class="mt-4"><span class="text-green-400">> system_ready_</span></p>
        `;

        codeBlock.innerHTML = fullHtml;
        
        // dom typewriter
        const textNodes = [];
        const walk = document.createTreeWalker(codeBlock, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while(n = walk.nextNode()) {
            if(n.nodeValue.trim() !== '') {
                textNodes.push({ node: n, text: n.nodeValue });
                n.nodeValue = '';
            }
        }
        
        let currentNodeIndex = 0;
        let charIndex = 0;
        
        const cursor = document.createElement('span');
        cursor.className = 'animate-pulse text-white font-bold ml-1';
        cursor.textContent = '|';
        
        const typeStep = () => {
             if (currentNodeIndex < textNodes.length) {
                 const currentObj = textNodes[currentNodeIndex];
                 
                 if (currentObj.node.parentNode && cursor.parentNode !== currentObj.node.parentNode) {
                     currentObj.node.parentNode.appendChild(cursor);
                 }

                 if (charIndex < currentObj.text.length) {
                     currentObj.node.nodeValue += currentObj.text.charAt(charIndex);
                     charIndex++;
                     setTimeout(typeStep, 20 + Math.random() * 30); 
                 } else {
                     currentNodeIndex++;
                     charIndex = 0;
                     setTimeout(typeStep, 60); //pause
                 }
             } else {
                 if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
             }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeStep();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(codeBlock);
    }
}