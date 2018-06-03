
function toRadian(degree) {
    return degree * Math.PI / 180;
}

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
var geometry = new THREE.CubeGeometry(10, 10, 10);
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 5;
var helper = new THREE.GridHelper( 1000, 100 );
helper.position.y = - 0;
helper.material.opacity = 0.25;
helper.material.transparent = false;

scene.add(cube);
scene.add(helper);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 50;
function animate(time) {
    requestAnimationFrame(animate);
    
	renderer.render( scene, camera );
}
animate(0);
