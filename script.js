import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

let scene, camera, renderer, airplane;

function init() {
    // Create the scene
    scene = new THREE.Scene();
    
    // Create the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create the airplane
    let geometry = new THREE.BoxGeometry(1, 0.5, 2);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    airplane = new THREE.Mesh(geometry, material);
    scene.add(airplane);
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            airplane.position.y += 0.1;
            break;
        case 'ArrowDown':
            airplane.position.y -= 0.1;
            break;
        case 'ArrowLeft':
            airplane.position.x -= 0.1;
            break;
        case 'ArrowRight':
            airplane.position.x += 0.1;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();