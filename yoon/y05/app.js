var camera;
var controls;
var scene;
var renderer;

var cube;

var width;
var height;

var mouse;
var INTERSECTED;
var raycaster;

var dragControls;
var indragging = false;

init(function(){
    cubeGroup();
});
animate();

function init(callback){
    width = window.innerWidth;
    height = window.innerHeight;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x707070);
    scene.fog = new THREE.Fog(0x707070, 1, 1600);

    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 2000);
    camera.position.set(450, 200, 300);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.tyep = THREE.PCFShadowMap;
    document.body.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.2;

    var ambient = new THREE.AmbientLight(0x111111);
    scene.add(ambient);

    var light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI /2);
    light.position.set(450, 800, 1100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 300, 1500));
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width =  4096;
    light.shadow.mapSize.height = 4096;
    scene.add(light);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    /*
    var material = new THREE.MeshBasicMaterial({color:0xff0000, flatShading: true});
    var mesh = new THREE.BoxGeometry(150,150,150);

    cube = new THREE.Mesh(mesh, material);

    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);
    */
    callback();

    dragControls = new THREE.DragControls(group.children, camera, renderer.domElement);

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener("resize", onResize, false);

    dragControls.addEventListener("dragstart", function(e){
        console.log(dragControls);
        controls.enabled = false;
        indragging = true;
    }, false);
    dragControls.addEventListener("dragend", function(e){
        controls.enabled = true;
        indragging = false;
    }, false);
}

function cubeGroup(){
    group = new THREE.Object3D();
    var geometry = new THREE.BoxBufferGeometry(70, 70, 3);
    for(var i = 0; i < 1000; i++){
        var obj = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color:0xff0000}));
        obj.position.x = Math.random() * 800 - 400;
        obj.position.y = Math.random() * 800 - 400;
        obj.position.z = Math.random() * 800 - 400;
        obj.rotation.x = Math.random() * 2 * Math.PI;
        obj.rotation.y = Math.random() * 2 * Math.PI;
        obj.rotation.z = Math.random() * 2 * Math.PI;
        obj.scale.x = Math.random() + 0.5;
        obj.scale.y = Math.random() + 0.5;
        obj.scale.z = Math.random() + 0.5;
        obj.castShadow = true;
        obj.receiveShadow = true;
        group.add(obj);
    }
    scene.add(group);
}

function animate(){
    requestAnimationFrame(animate);
    
    if(!indragging){
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        
        var intersects = raycaster.intersectObjects(group.children);
        //console.log(intersects);
        if(intersects.length > 0){
            if(INTERSECTED != intersects[0].object){
                if(INTERSECTED){
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                }
                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                INTERSECTED.material.color.setHex(0xffffff);
                console.log(INTERSECTED);
            }
        }else{
            if(INTERSECTED){
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = null;
        }
    }

    controls.update();
    renderer.render(scene, camera);
}

function onMouseMove(e){
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    //console.log("mouse", "x :" +  mouse.x, "y: " +  mouse.y); 
}
function onResize(){
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}