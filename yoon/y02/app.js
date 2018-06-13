var width = window.innerWidth;
var height = window.innerHeight;
var scene = new THREE.Scene();

scene.background = new THREE.Color(0xa00000);
scene.fog = new THREE.Fog(0xa00000, 1, 130);

var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

camera.position.z = 80;

var geometry = new THREE.Geometry();

//반복문 없이
// var material = new THREE.LineBasicMaterial({color:0x0e0e0});
// geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
// geometry.vertices.push(new THREE.Vector3(5, 15, -5));
// geometry.vertices.push(new THREE.Vector3(-3, 2, 22) );
// geometry.vertices.push(new THREE.Vector3(10, -11, 5) );
// geometry.vertices.push(new THREE.Vector3(5, 0, 15) );
// geometry.vertices.push(new THREE.Vector3(-10, 0, 0) );
// var line = new THREE.Line(geometry, material);

// 반복문
// var materials = [];
// for(var i = 0; i < 1000; i++){
//     var xPos = Math.random() * 20 - 10;
//     var yPos = Math.random() * 20 - 10;
//     var zPos = Math.random() * 20 - 10;
//     //var randomColor = "0x" + Math.floor(Math.random()*16777215).toString(16);
//     geometry.vertices.push(new THREE.Vector3(xPos, yPos, zPos));
//     //materials.push(new THREE.LineBasicMaterial({color:randomColor}));
// }
// var randomColor = "0x" + Math.floor(Math.random()*16777215).toString(16);
// materials = new THREE.LineBasicMaterial({color:randomColor, lineWidth: 1});
// var line = new THREE.Line(geometry, materials);

var circleSize = 50;
var randomColor = "0x" + Math.floor(Math.random()*16777215).toString(16);
var material = new THREE.LineBasicMaterial({color:randomColor, lineWidth: 1});
for(var i = 0; i < 5000; i++){
    var xPos = circleSize * Math.sin(i * 3 * (Math.PI / 180));
    var yPos = circleSize * Math.cos(i * 3 * (Math.PI / 180));
    var zPos = (-1500 +i ) * 0.03;

    geometry.vertices.push(new THREE.Vector3(xPos, yPos, zPos));
}

var line = new THREE.Line(geometry, material);
scene.add(line);

//renderer.render(scene, camera);

function animate(){
    requestAnimationFrame(animate);
    line.rotation.x += 0.003;
    line.rotation.y += 0.002;
    line.rotation.z += 0.001;
    renderer.render(scene, camera);
}

animate();
