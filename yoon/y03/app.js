var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 2000);
camera.position.z = 1000;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 1, 2000);

//var meterial = new THREE.MeshBasicMaterial({color:0xefefef, transparent: true});

var group = new THREE.Object3D();

for(var i = 0; i < 1000; i++){
    var _cubeSize = Math.random() * 50 + 5;
    var geometry = new THREE.BoxGeometry(_cubeSize, _cubeSize, _cubeSize);
    var randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());

    var meterial = new THREE.MeshBasicMaterial({color: randomColor, transparent: true});

    var mesh = new THREE.Mesh(geometry, meterial);

    mesh.position.x = Math.random() * 1000 - 500;
    mesh.position.y = Math.random() * 1000 - 500;
    mesh.position.z = Math.random() * 1000 - 500;

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