var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 2000);
camera.position.z = 800;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.tyep = THREE.PCFShadowMap;

document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x00ffff);
scene.fog = new THREE.Fog(0x00ffff, 1, 2000);//안개, 가우시안 블러 느낌??

/*
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.35);
directionalLight.position.x = Math.random() - 0.5;
directionalLight.position.y = Math.random() - 0.5;
directionalLight.position.z = Math.random() - 0.5;
directionalLight.position.normalize();

scene.add(directionalLight);
*/

var light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/2);
light.position.set(0, 1500, 1000);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 1000, 2500));
light.shadow.bias = 0.001;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

scene.add(light);

var ambient = new THREE.AmbientLight(0x111111);
scene.add(ambient);

// var geometry = new THREE.BoxGeometry(1,1,1);
// var material = new THREE.MeshBasicMaterial(0xffffff);
// var cube = new THREE.Mesh(geometry, material);

// scene.add(cube);
var material = new THREE.MeshPhongMaterial({color:0xffffff, flatShading: true});
var group = new THREE.Object3D();

for(var i = 0; i < 500; i++){
    var _cubeSize = Math.random() * 80 + 10;
    var geometry = new THREE.BoxGeometry(_cubeSize,_cubeSize,_cubeSize);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 1000 - 500;
    mesh.position.y = Math.random() * 1000 - 500;
    mesh.position.z = Math.random() * 1000 - 500;

    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;

    mesh.receiveShadow = true;
    mesh.castShadow = true;

    group.add(mesh);
    
}

scene.add(group);

function animate(){
    requestAnimationFrame(animate);
    group.rotation.x += 0.003;
    group.rotation.y += 0.002;
    group.rotation.z += 0.001;

    renderer.render(scene, camera);
}

animate();