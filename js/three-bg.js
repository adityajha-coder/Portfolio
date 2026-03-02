const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
canvasContainer.appendChild(renderer.domElement);

const knotGeometry = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 32); 
const knotMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111, roughness: 0.1, metalness: 0.8 
});
const mainMesh = new THREE.Mesh(knotGeometry, knotMaterial);
scene.add(mainMesh);

const wireframeGeo = new THREE.WireframeGeometry(knotGeometry);
const wireframeMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.15 }); 
const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
mainMesh.add(wireframe);

const ringGeo1 = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
const ringMat1 = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.5 });
const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
scene.add(ring1);

const ringGeo2 = new THREE.TorusGeometry(2.0, 0.02, 16, 100);
const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xd946ef, emissive: 0xd946ef, emissiveIntensity: 0.5 });
const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
scene.add(ring2);

const gridHelper = new THREE.GridHelper(40, 40, 0x222222, 0x111111);
gridHelper.position.y = -5;
scene.add(gridHelper);

const planes = [];
const planeGeo = new THREE.PlaneGeometry(0.5, 0.5);
for(let i=0; i<20; i++) {
    const mat = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.5 ? 0x4f46e5 : 0xd946ef, 
        side: THREE.DoubleSide, transparent: true, opacity: 0.4, wireframe: true
    });
    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 5 - 2);
    mesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    scene.add(mesh);
    planes.push({ mesh, speed: Math.random() * 0.02 + 0.005 });
}

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 60; 
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.03, color: 0xffffff, transparent: true, opacity: 0.6 });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0x4f46e5, 5);
spotLight.position.set(10, 10, 10);
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0x06b6d4, 5);
spotLight2.position.set(-10, -10, 5);
scene.add(spotLight2);
const cursorLight = new THREE.PointLight(0xff00ff, 4, 15);
scene.add(cursorLight);

let scrollY = 0;
let mouseX = 0; let mouseY = 0;
let targetX = 0; let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
camera.position.z = 6;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    if (scrollY > 50) navbar.classList.add('bg-black/80', 'backdrop-blur-md');
    else navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
});

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    cursorLight.position.x += (targetX * 8 - cursorLight.position.x) * 0.1;
    cursorLight.position.y += (-targetY * 8 - cursorLight.position.y) * 0.1;
    cursorLight.position.z = 3; 

    mainMesh.rotation.y = elapsedTime * 0.3;
    mainMesh.rotation.x = elapsedTime * 0.15 + (scrollY * 0.001);
    mainMesh.position.x += (targetX - mainMesh.position.x) * 0.02;
    mainMesh.position.y += (-targetY - mainMesh.position.y) * 0.02;

    ring1.rotation.x = elapsedTime * 0.5; ring1.rotation.y = elapsedTime * 0.2;
    ring2.rotation.x = elapsedTime * 0.3; ring2.rotation.y = elapsedTime * 0.6;
    ring1.position.x = mainMesh.position.x * 0.5; ring1.position.y = mainMesh.position.y * 0.5;
    ring2.position.x = mainMesh.position.x * 0.4; ring2.position.y = mainMesh.position.y * 0.4;

    planes.forEach(p => {
        p.mesh.rotation.x += p.speed;
        p.mesh.rotation.y += p.speed;
        p.mesh.position.y += Math.sin(elapsedTime * p.speed) * 0.01;
    });

    camera.position.y = -scrollY * 0.0025; 
    gridHelper.position.z = (elapsedTime * 2) % 10;
    gridHelper.position.y = -6 + (-scrollY * 0.0025);

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};
tick();