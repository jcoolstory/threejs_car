var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);

camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.id = "test";
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(2, 2, 2);
//geometry.uvsNeedUpdate = true;
//단일
//var material = new THREE.MeshBasicMaterial({color:0x00ff00});
//var cube = new THREE.Mesh(geometry, material);

//복수
var materials = [
    new THREE.MeshBasicMaterial({color:0x00ff00}),
    new THREE.MeshBasicMaterial({color:0x0000ff}),
    new THREE.MeshBasicMaterial({color:0xff0000}),
    new THREE.MeshBasicMaterial({color:0x00f0f0}),
    new THREE.MeshBasicMaterial({color:0xf0f0f0}),
    new THREE.MeshBasicMaterial({color:0x0f0f0f}) 
];

var cube = new THREE.Mesh(geometry, materials);

scene.add(cube);

//바로실행
//renderer.render(scene, camera);

// 회전
// function animate(){
//     requestAnimationFrame(animate);
//     //console.log(cube.rotation);
//     cube.rotation.x += 0.1;
//     cube.rotation.y += 0.1;

//     renderer.render(scene, camera);
// }
// animate();

//마우스 컨트롤
var trackControl = new THREE.TrackballControls(camera, renderer.domElement);
function coltrol(){
    requestAnimationFrame(coltrol);
    trackControl.update();
    renderer.render(scene, camera);
}
coltrol();