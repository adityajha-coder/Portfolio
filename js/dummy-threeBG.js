// const canvasContainer = document.getElementById('canvas-container');
// const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x000000, 0.025);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 5, 15);

// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// canvasContainer.appendChild(renderer.domElement);

// // matrix grid
// const geometry = new THREE.PlaneGeometry(400, 400, 150, 150);
// geometry.rotateX(-Math.PI / 2);

// const pos = geometry.attributes.position;
// const count = pos.count;
// const colors = new Float32Array(count * 3);
// const colorBase = new THREE.Color(0x0a0a2e);
// const colorCyan = new THREE.Color(0x06b6d4);

// // color gradient
// for (let i = 0; i < count; i++) {
//     const x = pos.getX(i);
//     const z = pos.getZ(i);
//     const mixRatio = (Math.sin(x * 0.05) + Math.cos(z * 0.05) + 2) / 4;
//     const c = colorBase.clone().lerp(colorCyan, mixRatio);
//     colors[i * 3] = c.r;
//     colors[i * 3 + 1] = c.g;
//     colors[i * 3 + 2] = c.b;
// }

// geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// const material = new THREE.PointsMaterial({
//     size: 0.20,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.9,
//     blending: THREE.AdditiveBlending
// });

// const terrain = new THREE.Points(geometry, material);
// scene.add(terrain);

// // wireframe
// const wireMaterial = new THREE.MeshBasicMaterial({
//     color: 0x4f46e5, 
//     transparent: true,
//     opacity: 0.08,
//     wireframe: true,
//     blending: THREE.AdditiveBlending
// });
// const wireTerrain = new THREE.Mesh(geometry, wireMaterial);
// wireTerrain.position.y = -0.1;
// scene.add(wireTerrain);

// let scrollY = window.scrollY;
// let mouseX = 0;
// let mouseY = 0;
// let targetX = 0;
// let targetY = 0;
// const windowHalfX = window.innerWidth / 2;
// const windowHalfY = window.innerHeight / 2;

// window.addEventListener('scroll', () => {
//     scrollY = window.scrollY;
//     const navbar = document.getElementById('navbar');
//     if (navbar) {
//         if (scrollY > 50) navbar.classList.add('bg-black/80', 'backdrop-blur-md');
//         else navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
//     }
// });

// document.addEventListener('mousemove', (event) => {
//     mouseX = (event.clientX - windowHalfX);
//     mouseY = (event.clientY - windowHalfY);
// });

// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// const clock = new THREE.Clock();

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime();

//     targetX = mouseX * 0.008;
//     targetY = mouseY * 0.008;

//     const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
//     const scrollRatio = Math.min(1, Math.max(0, scrollY / maxScroll));

//     const desiredY = 6 - (scrollRatio * 7) + (-targetY);
//     const desiredZ = 15 - (scrollRatio * 40);

//     camera.position.x += (targetX - camera.position.x) * 0.03;
//     camera.position.y += (desiredY - camera.position.y) * 0.05;
//     camera.position.z += (desiredZ - camera.position.z) * 0.05;

//     camera.lookAt(0, -2 + (scrollRatio * 2), -10);

//     // wave animation
//     for (let i = 0; i < pos.count; i++) {
//         const x = pos.getX(i);
//         const z = pos.getZ(i);

//         // math magic
//         const wave1 = Math.sin(x * 0.15 + elapsedTime * 1.0) * 2.2;
//         const wave2 = Math.cos(z * 0.15 - elapsedTime * 0.9) * 1.6;
//         const wave3 = Math.sin((x + z) * 0.1 + elapsedTime * 1.4) * 1.0;

//         pos.setY(i, wave1 + wave2 + wave3);
//     }
//     pos.needsUpdate = true;

//     // slight rotation
//     terrain.rotation.y = elapsedTime * 0.08;
//     wireTerrain.rotation.y = elapsedTime * 0.08;

//     renderer.render(scene, camera);
//     window.requestAnimationFrame(tick);
// };
// tick();