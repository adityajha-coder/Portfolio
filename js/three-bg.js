// ============================================================================
// CINEMATIC HOGWARTS CASTLE AT NIGHT - 3D THREE.JS FLY-THROUGH
// ============================================================================

const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x04060f, 0.012);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
canvasContainer.appendChild(renderer.domElement);

// ----------------------------------------------------------------------------
// LIGHTING SETUP
// ----------------------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0x081026, 1.8);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xb5d8ff, 1.3);
moonLight.position.set(15, 30, 20);
scene.add(moonLight);

const warmWindowLight = new THREE.PointLight(0xff9900, 2.5, 25);
warmWindowLight.position.set(0, 0, 2);
scene.add(warmWindowLight);

const lightningLight = new THREE.PointLight(0xdbeafe, 0, 80);
lightningLight.position.set(0, 12, 5);
scene.add(lightningLight);

// ----------------------------------------------------------------------------
// PROCEDURAL CANVAS TEXTURES
// ----------------------------------------------------------------------------
function createSparkleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(254, 215, 170, 0.85)');
    grad.addColorStop(0.6, 'rgba(236, 72, 153, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
}

function createCloudTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(35, 50, 85, 0.45)');
    grad.addColorStop(0.5, 'rgba(15, 25, 45, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
}

const sparkleTexture = createSparkleTexture();
const cloudTexture = createCloudTexture();

// ----------------------------------------------------------------------------
// FULL-SCREEN ADAPTIVE HOGWARTS CASTLE BACKDROP
// ----------------------------------------------------------------------------
const textureLoader = new THREE.TextureLoader();
let bgMesh = null;
const BG_DEPTH = -4.0;
const IMG_ASPECT = 16 / 9;

function updateBackgroundCover() {
    if (!bgMesh) return;
    const dist = Math.abs(14.0 - BG_DEPTH);
    const vFov = (camera.fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(vFov / 2) * dist;
    const viewWidth = viewHeight * (window.innerWidth / window.innerHeight);
    const viewAspect = window.innerWidth / window.innerHeight;

    let width, height;
    if (viewAspect > IMG_ASPECT) {
        width = viewWidth * 1.15;
        height = width / IMG_ASPECT;
    } else {
        height = viewHeight * 1.15;
        width = height * IMG_ASPECT;
    }
    bgMesh.scale.set(width, height, 1);
}

textureLoader.load('/Pics/hogwarts.jpg', (texture) => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    if (renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }

    const bgGeo = new THREE.PlaneGeometry(1, 1, 32, 32);
    const bgMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.85,
        metalness: 0.08,
        transparent: true,
        opacity: 0.98
    });

    bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.set(0, 0.2, BG_DEPTH);
    scene.add(bgMesh);
    updateBackgroundCover();
});

// ----------------------------------------------------------------------------
// PROCEDURAL 3D BRANCHING LIGHTNING & THUNDER
// ----------------------------------------------------------------------------
const lightningGroup = new THREE.Group();
scene.add(lightningGroup);

const lightningCoreMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 3,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
});

const lightningGlowMat = new THREE.LineBasicMaterial({
    color: 0x93c5fd,
    linewidth: 6,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending
});

function createBranchPoints(startX, startY, endX, endY, depth = 0) {
    const points = [];
    const segments = 12;
    const dx = (endX - startX) / segments;
    const dy = (endY - startY) / segments;

    let curX = startX;
    let curY = startY;
    points.push(new THREE.Vector3(curX, curY, -3.5));

    for (let i = 1; i < segments; i++) {
        const jaggedX = (Math.random() - 0.5) * (1.1 / (depth + 1));
        const jaggedY = (Math.random() - 0.5) * 0.4;
        curX = startX + dx * i + jaggedX;
        curY = startY + dy * i + jaggedY;
        points.push(new THREE.Vector3(curX, curY, -3.5));
    }
    points.push(new THREE.Vector3(endX, endY, -3.5));
    return points;
}

const mainBoltLines = [];
for (let i = 0; i < 4; i++) {
    const geo = new THREE.BufferGeometry();
    const coreLine = new THREE.Line(geo, lightningCoreMat);
    const glowLine = new THREE.Line(geo, lightningGlowMat);
    lightningGroup.add(glowLine);
    lightningGroup.add(coreLine);
    mainBoltLines.push({ geo });
}

let isThunderActive = false;
let thunderTimer = 0;
let nextThunderTime = 3.5;

function strikeLightning(targetPosX = null) {
    const startX = targetPosX !== null ? targetPosX + (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 16;
    const startY = 8.5 + Math.random() * 2.0;
    const endX = startX + (Math.random() - 0.5) * 4.0;
    const endY = 1.0 + Math.random() * 2.5;

    const mainPoints = createBranchPoints(startX, startY, endX, endY, 0);
    mainBoltLines[0].geo.setFromPoints(mainPoints);

    for (let b = 1; b < mainBoltLines.length; b++) {
        const branchStartIdx = Math.floor(Math.random() * (mainPoints.length - 4)) + 2;
        const bStart = mainPoints[branchStartIdx];
        const bEndX = bStart.x + (Math.random() - 0.5) * 3.5;
        const bEndY = bStart.y - 1.5 - Math.random() * 2.0;
        const branchPoints = createBranchPoints(bStart.x, bStart.y, bEndX, bEndY, 1);
        mainBoltLines[b].geo.setFromPoints(branchPoints);
    }

    lightningLight.position.set(startX, startY - 2, -1);
    isThunderActive = true;
    thunderTimer = 0;
}

// ----------------------------------------------------------------------------
// GREAT HALL & TOWER WINDOWS (Candlelight Glow Points)
// ----------------------------------------------------------------------------
const windowGlowCount = 50;
const windowGeo = new THREE.BufferGeometry();
const windowPositions = new Float32Array(windowGlowCount * 3);
const windowColors = new Float32Array(windowGlowCount * 3);

const castleClusters = [
    { cx: -4.5, cy: 0.2, cz: -3.5, spreadX: 2.4, spreadY: 1.3 }, // Great Hall
    { cx: -1.8, cy: 2.5, cz: -3.5, spreadX: 0.9, spreadY: 2.5 }, // Central Tower
    { cx: 2.2, cy: 1.8, cz: -3.5, spreadX: 2.0, spreadY: 2.2 },  // Turrets
    { cx: 4.8, cy: 0.8, cz: -3.5, spreadX: 1.6, spreadY: 1.6 }   // Astronomy Wing
];

const colorWarmAmber = new THREE.Color(0xfbbf24);
const colorGoldFlame = new THREE.Color(0xf59e0b);
const colorDeepOrange = new THREE.Color(0xd97706);

for (let i = 0; i < windowGlowCount; i++) {
    const cluster = castleClusters[i % castleClusters.length];
    windowPositions[i * 3] = cluster.cx + (Math.random() - 0.5) * cluster.spreadX;
    windowPositions[i * 3 + 1] = cluster.cy + (Math.random() - 0.5) * cluster.spreadY;
    windowPositions[i * 3 + 2] = cluster.cz + (Math.random() - 0.5) * 0.4;

    const r = Math.random();
    const c = r < 0.4 ? colorWarmAmber : r < 0.8 ? colorGoldFlame : colorDeepOrange;
    windowColors[i * 3] = c.r;
    windowColors[i * 3 + 1] = c.g;
    windowColors[i * 3 + 2] = c.b;
}

windowGeo.setAttribute('position', new THREE.BufferAttribute(windowPositions, 3));
windowGeo.setAttribute('color', new THREE.BufferAttribute(windowColors, 3));

const windowMat = new THREE.PointsMaterial({
    size: 0.48,
    map: sparkleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
scene.add(new THREE.Points(windowGeo, windowMat));

// ----------------------------------------------------------------------------
// ATMOSPHERIC DRIFTING MIST & CLOUDS
// ----------------------------------------------------------------------------
const cloudCount = 35;
const cloudGeo = new THREE.BufferGeometry();
const cloudPositions = new Float32Array(cloudCount * 3);

for (let i = 0; i < cloudCount; i++) {
    cloudPositions[i * 3] = (Math.random() - 0.5) * 50;
    cloudPositions[i * 3 + 1] = -6 + Math.random() * 20;
    cloudPositions[i * 3 + 2] = -2 + Math.random() * 14;
}

cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
const cloudMat = new THREE.PointsMaterial({
    size: 11.0,
    map: cloudTexture,
    transparent: true,
    opacity: 0.38,
    blending: THREE.NormalBlending,
    depthWrite: false
});
scene.add(new THREE.Points(cloudGeo, cloudMat));

// ----------------------------------------------------------------------------
// LUMOS & PATRONUS STARDUST EMBERS
// ----------------------------------------------------------------------------
const dustCount = 450;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
const dustColors = new Float32Array(dustCount * 3);

for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 45;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 24 + 2;

    const r = Math.random();
    const c = r < 0.5 ? new THREE.Color(0xfef08a) : r < 0.8 ? new THREE.Color(0x38bdf8) : new THREE.Color(0xf1f5f9);
    dustColors[i * 3] = c.r;
    dustColors[i * 3 + 1] = c.g;
    dustColors[i * 3 + 2] = c.b;
}

dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

const dustMat = new THREE.PointsMaterial({
    size: 0.38,
    map: sparkleTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const dustParticles = new THREE.Points(dustGeo, dustMat);
scene.add(dustParticles);

// ----------------------------------------------------------------------------
// INTERACTIVE WAND SPELL SPARKS
// ----------------------------------------------------------------------------
const wandSparksCount = 60;
const wandGeo = new THREE.BufferGeometry();
const wandPos = new Float32Array(wandSparksCount * 3);
const wandVelo = [];

for (let i = 0; i < wandSparksCount; i++) {
    wandPos[i * 3] = 0;
    wandPos[i * 3 + 1] = -100;
    wandPos[i * 3 + 2] = 0;
    wandVelo.push({ x: 0, y: 0, z: 0, life: 0 });
}

wandGeo.setAttribute('position', new THREE.BufferAttribute(wandPos, 3));
const wandMat = new THREE.PointsMaterial({
    size: 0.7,
    map: sparkleTexture,
    color: 0x67e8f9,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
scene.add(new THREE.Points(wandGeo, wandMat));
let wandIndex = 0;

// ----------------------------------------------------------------------------
// INPUT LISTENERS (Scroll, Mouse, Resize)
// ----------------------------------------------------------------------------
let scrollY = window.scrollY;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (scrollY > 50) navbar.classList.add('bg-black/80', 'backdrop-blur-md');
        else navbar.classList.remove('bg-black/80', 'backdrop-blur-md');
    }
});

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

    const wx = ((event.clientX / window.innerWidth) * 2 - 1) * 8.0;
    const wy = (-(event.clientY / window.innerHeight) * 2 + 1) * 5.0;

    const posAttr = wandGeo.attributes.position;
    for (let k = 0; k < 2; k++) {
        const idx = (wandIndex + k) % wandSparksCount;
        posAttr.setXYZ(idx, wx + (Math.random() - 0.5) * 0.2, wy + (Math.random() - 0.5) * 0.2, 6.0);
        wandVelo[idx].x = (Math.random() - 0.5) * 0.04;
        wandVelo[idx].y = (Math.random() * 0.03) + 0.01;
        wandVelo[idx].z = (Math.random() - 0.5) * 0.04;
        wandVelo[idx].life = 1.0;
    }
    wandIndex = (wandIndex + 2) % wandSparksCount;
    posAttr.needsUpdate = true;
});

window.addEventListener('click', (event) => {
    const wx = ((event.clientX / window.innerWidth) * 2 - 1) * 8.0;
    const wy = (-(event.clientY / window.innerHeight) * 2 + 1) * 5.0;

    const posAttr = wandGeo.attributes.position;
    for (let i = 0; i < 25; i++) {
        const idx = (wandIndex + i) % wandSparksCount;
        posAttr.setXYZ(idx, wx, wy, 6.0);
        wandVelo[idx].x = (Math.random() - 0.5) * 0.22;
        wandVelo[idx].y = (Math.random() - 0.5) * 0.22;
        wandVelo[idx].z = (Math.random() - 0.5) * 0.22;
        wandVelo[idx].life = 1.0;
    }
    wandIndex = (wandIndex + 25) % wandSparksCount;
    posAttr.needsUpdate = true;

    strikeLightning(wx * 0.8);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateBackgroundCover();
});

// ----------------------------------------------------------------------------
// ANIMATION LOOP
// ----------------------------------------------------------------------------
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Mouse Parallax
    targetX = mouseX * 0.003;
    targetY = mouseY * 0.003;

    // Scroll Camera Dolly toward Castle
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollRatio = Math.min(1, Math.max(0, scrollY / maxScroll));

    const desiredCamX = targetX * 1.5;
    const desiredCamY = (scrollRatio * 0.7) - targetY;
    const desiredCamZ = 14.0 - (scrollRatio * 2.2);

    camera.position.x += (desiredCamX - camera.position.x) * 0.04;
    camera.position.y += (desiredCamY - camera.position.y) * 0.04;
    camera.position.z += (desiredCamZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0.2 + (scrollRatio * 0.4), BG_DEPTH);

    // Castle Backdrop Parallax & Smooth Approach
    if (bgMesh) {
        bgMesh.rotation.y = targetX * 0.05;
        bgMesh.rotation.x = targetY * 0.03;

        const approachScale = 1.0 + (scrollRatio * 0.06);
        const dist = Math.abs(14.0 - BG_DEPTH);
        const vFov = (camera.fov * Math.PI) / 180;
        const viewHeight = 2 * Math.tan(vFov / 2) * dist;
        const viewWidth = viewHeight * (window.innerWidth / window.innerHeight);
        const viewAspect = window.innerWidth / window.innerHeight;

        let baseW, baseH;
        if (viewAspect > IMG_ASPECT) {
            baseW = viewWidth * 1.15;
            baseH = baseW / IMG_ASPECT;
        } else {
            baseH = viewHeight * 1.15;
            baseW = baseH * IMG_ASPECT;
        }
        bgMesh.scale.set(baseW * approachScale, baseH * approachScale, 1);
    }

    // Great Hall Windows Firelight Flickers
    const flickerPulse = Math.sin(elapsedTime * 8) * 0.15 + Math.cos(elapsedTime * 14) * 0.1;
    windowMat.size = (0.46 + flickerPulse * 0.08) * (1.0 + scrollRatio * 0.4);
    warmWindowLight.intensity = 2.4 + flickerPulse * 0.6;

    // Mist & Cloud Drift
    const cloudPos = cloudGeo.attributes.position;
    for (let i = 0; i < cloudCount; i++) {
        let cx = cloudPos.getX(i) + 0.008;
        if (cx > 26) cx = -26;
        cloudPos.setX(i, cx);
    }
    cloudGeo.attributes.position.needsUpdate = true;

    // Lumos Stardust Drift
    const dustPos = dustGeo.attributes.position;
    for (let i = 0; i < dustCount; i++) {
        const dy = dustPos.getY(i) + Math.sin(elapsedTime * 0.5 + i) * 0.012;
        dustPos.setY(i, dy);
    }
    dustGeo.attributes.position.needsUpdate = true;
    dustParticles.rotation.y = elapsedTime * 0.015;

    // Lightning Staccato Flashes
    if (elapsedTime > nextThunderTime && !isThunderActive) {
        strikeLightning();
        nextThunderTime = elapsedTime + 4.5 + Math.random() * 6.5;
    }

    if (isThunderActive) {
        thunderTimer += 0.016;
        let flashIntensity = 0;
        let boltOpacity = 0;

        if (thunderTimer < 0.06) {
            flashIntensity = 3.5;
            boltOpacity = 0.9;
        } else if (thunderTimer < 0.10) {
            flashIntensity = 1.0;
            boltOpacity = 0.2;
        } else if (thunderTimer < 0.22) {
            flashIntensity = 6.0;
            boltOpacity = 1.0;
        } else if (thunderTimer < 0.55) {
            const decay = 1.0 - ((thunderTimer - 0.22) / 0.33);
            flashIntensity = Math.max(0, decay * 4.0);
            boltOpacity = Math.max(0, decay * 0.8);
        } else {
            isThunderActive = false;
        }

        lightningLight.intensity = flashIntensity * 2.5;
        moonLight.intensity = 1.3 + flashIntensity * 1.2;
        ambientLight.intensity = 1.8 + flashIntensity * 0.9;
        lightningCoreMat.opacity = boltOpacity;
        lightningGlowMat.opacity = boltOpacity * 0.7;
    } else {
        lightningLight.intensity = 0;
        moonLight.intensity = 1.3;
        ambientLight.intensity = 1.8;
        lightningCoreMat.opacity = 0;
        lightningGlowMat.opacity = 0;
    }

    // Wand Cursor Sparks Physics
    const wandPosAttr = wandGeo.attributes.position;
    for (let i = 0; i < wandSparksCount; i++) {
        if (wandVelo[i].life > 0) {
            wandVelo[i].life -= 0.025;
            wandPosAttr.setXYZ(
                i,
                wandPosAttr.getX(i) + wandVelo[i].x,
                wandPosAttr.getY(i) + wandVelo[i].y,
                wandPosAttr.getZ(i) + wandVelo[i].z
            );
        } else {
            wandPosAttr.setXYZ(i, 0, -100, 0);
        }
    }
    wandPosAttr.needsUpdate = true;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();