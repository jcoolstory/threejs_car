var width = window.innerWidth;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
//var orbitControls = new THREE.OrbitControls(camera);


//loading
var manager = new THREE.LoadingManager();
manager.onProgress = function(item, loaded, total){

}

var texture = new THREE.TextureLoader(manager).load("./res/skin00/0000.BMP");
var tireTxture = new THREE.TextureLoader(manager).load("./res/car/0000.BMP");
var loader = new THREE.OBJLoader(manager);
var materialColor = new THREE.Color(1,1,1);
//var material = new THREE.MeshPhongMaterial({color: materialColor, flatShading:false, side:THREE.DoubleSide});
//var material = new THREE.MeshPhongMaterial({color:materialColor, flatShading:false});
//var material = new THREE.MeshLambertMaterial({color:materialColor, flatShading:false, side: THREE.DoubleSide});

//material.map = texture;

loader.load("./res/Porsche_911_GT2_test.obj", function(obj){
    obj.traverse(function(child){
        if(child instanceof THREE.Mesh){
            var material = new THREE.MeshPhongMaterial();
            material.flatShading = false;
            material.side = THREE.DoubleSide;
            material.shininess = 40;
            material.specular = new THREE.Color(1,1,1);
            if(child.name.indexOf("body") > -1){
                material.color = new THREE.Color(1, 1, 0);
                material.map = null;
            }else if(child.name.indexOf("glasses") > -1){
                material.color = new THREE.Color(0, 0, 0);
                material.transparent = true;
                material.opacity = 0.4;
            }else if(child.name.indexOf("light") > -1){
                material.color = new THREE.Color(1, 1, 1);
                material.transparent = true;
                material.opacity = 0.7;
            }else if(child.name.indexOf("tire") > -1){
                material.map = tireTxture;
            }else{
                material.map = texture;
            }
            child.material = material;
            console.log(child.name, ": ", child);
        }
    });
    obj.position.y = 0;
    scene.add(obj);
});

var ambient = new THREE.AmbientLight(0xcccccc, 0.4);
var point = new THREE.PointLight(0xffffff, 0.7);
camera.add(point);
scene.add(ambient);

scene.add(camera);

function animate(){
    requestAnimationFrame(animate);
    //scene.update();
    renderer.render(scene, camera);
}

animate();