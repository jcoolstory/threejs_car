var camera, controls, scene, renderer;
var group;
var mouse, INTERSECTED;
var raycaster;
var countHue = 0;
var cubes = [];
var counterMotion = 0;
var animationPlay = true;

var width = 0;
var height = 0;

init();
animate();

function onDocumentMouseMove(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentClick(e){
    e.preventDefault();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(group.children);

    if(intersects.length > 0){
        if(INTERSECTED != intersects[0].object){
            if(INTERSECTED){
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex(0xffffff);
        }
    }
}

function init(){
    width = window.innerWidth;
    height = window.innerHeight;

    group = new THREE.Object3D();
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 5);
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 5);
    camera.position.set(1.8, 1.8, 1.8);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
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

    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2);
    light.position.set(3,4, 2.4);
    light.target.position.set(0,0,0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,0.1,250));
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    scene.add(light);
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    //var material = new THREE.MeshPhongMaterial({color:0xff0000, flatShading:true});
    
    //MTL 로드
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('./obj/test.mtl', function(materials){
        console.log(materials);
        materials.preload();    
        //오브젝트 로드
        var loader = new THREE.OBJLoader();
        loader.setMaterials(materials);
        loader.load('./obj/test.obj', function(obj){
            obj.traverse(function(child){
                console.log("child", child);
                if(child instanceof THREE.Mesh){
                    //child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    group.add(child);
                }
            })
        });

    });

    
    var geometryP = new THREE.PlaneGeometry(10,10,50,50);
    var materialP = new THREE.MeshBasicMaterial({color:0xff0000, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(geometryP, materialP);
    plane.rotation.x = -Math.PI/2.0;
    plane.position.set(0, -1, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    group.add(plane);

    scene.add(group);

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'click', onDocumentClick, false );
}


function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}