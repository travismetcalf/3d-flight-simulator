import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

let scene, camera, renderer, airplane, skybox, ground;
let velocity = new THREE.Vector3();
let rotation = new THREE.Vector3();
const SPEED = 0.1;
const ROTATION_SPEED = 0.02;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Create a more airplane-like shape
    const fuselage = new THREE.BoxGeometry(1, 0.5, 2);
    const wings = new THREE.BoxGeometry(4, 0.1, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0x3366ff });

    airplane = new THREE.Group();
    airplane.add(new THREE.Mesh(fuselage, material));
    const wingsObj = new THREE.Mesh(wings, material);
    wingsObj.position.y = 0.1;
    airplane.add(wingsObj);
    scene.add(airplane);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(ambientLight, directionalLight);

    // Create skybox
    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide });
    skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);

    // Create ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}

function onDocumentKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            rotation.x = -ROTATION_SPEED;
            break;
        case 'ArrowDown':
            rotation.x = ROTATION_SPEED;
            break;
        case 'ArrowLeft':
            rotation.y = ROTATION_SPEED;
            break;
        case 'ArrowRight':
            break;
        case ' ': // Spacebar for speed boost
            velocity.z = -SPEED * 2;
            break;
    }
}

function updatePlane() {
    // Apply rotation
    airplane.rotation.x += rotation.x;
    airplane.rotation.y += rotation.y;

    // Move forward
    velocity.z = -SPEED;
    airplane.translateZ(velocity.z);

    // Camera follows the airplane
    camera.position.copy(airplane.position);
    camera.position.add(new THREE.Vector3(0, 2, 5));
    camera.lookAt(airplane.position);

    // Reset rotation for next frame
    rotation.set(0, 0, 0);
}

function animate() {
    requestAnimationFrame(animate);
    updatePlane();
    renderer.render(scene, camera);
}

init();
animate();