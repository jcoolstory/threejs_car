var camera, controls, scene, renderer;
var group;
var light;
var width = 0;
var height = 0;

var raycaster;
var mouse;

init();
animate();

function init(){
    width = window.innerWidth;
    height = window.innerHeight;

    group = new THREE.Object3D();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    //scene.fog = new THREE.Fog(0x000000, 0.5, 0.5);
    
    camera = new THREE.PerspectiveCamera(75, width/height, 01, 2000);
    camera.position.set(100,500,1000);

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

    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/2);
    light.position.set(500, 700, 740);
    light.target.position.set(0,0,0);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 0.1, 250));
    light.shadow.bias = 0.00001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    scene.add(light);
    scene.add(new THREE.HemisphereLight(0x443333, 0x222233, 4));

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    scene.background = new THREE.CubeTextureLoader()
                                .setPath("./test/")
                                .load([
                                    'px.jpg',
                                    'nx.jpg',
                                    'py.jpg',
                                    'ny.jpg',
                                    'pz.jpg',
                                    'nz.jpg'
                                ]);

    //var geometry = new THREE.TorusGeometry(350, 100, 64, 360);
    var geometry = new THREE.CubeGeometry(350, 350, 350);
    //geometry.uvsNeedUpdate = true;
    var material = new THREE.MeshStandardMaterial();
    var loader = new THREE.TextureLoader();

    material.roughness = 0.3;
    material.metalness = 0.6;
    material.map = loader.load('./test/test.jpg');
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(1,1);
    
    // material.metalnessMap = loader.load( 'texturetest/metalmap.jpg' );
    // material.metalnessMap.wrapS = THREE.RepeatWrapping;
    // material.metalnessMap.wrapT = THREE.RepeatWrapping;
    
    // material.normalMap = loader.load( 'texturetest/normalmap.jpg' );
    // material.normalMap.wrapS = THREE.RepeatWrapping;
    // material.normalMap.wrapT = THREE.RepeatWrapping;
    
   //var face = [[2,1],[0,1],[1,0],[1,2],[1,1],[3,1]];
   //var face = [[3,1], [1,1], [1,2], [1,0], [0,1], [2,1]];
   var face = [[1,1], [0, 2], [1, 2], [2, 2], [3, 2], [1,3]];
   var cellWidth = 1/4;
   var cellHeight = 1/4;
   face.forEach((el, i)=>{
    var j =  i * 2;
    geometry.faceVertexUvs[0][j][0] = new THREE.Vector2(el[0] * cellWidth + 0, el[1] * cellHeight + cellHeight);
    geometry.faceVertexUvs[0][j][1] = new THREE.Vector2(el[0] * cellWidth + 0, el[1] * cellHeight + 0);
    geometry.faceVertexUvs[0][j][2] = new THREE.Vector2(el[0] * cellWidth + cellWidth, el[1] * cellHeight + cellHeight);

    geometry.faceVertexUvs[0][j + 1][0] = new THREE.Vector2(el[0] * cellWidth + 0, el[1] * cellHeight + 0);
    geometry.faceVertexUvs[0][j + 1][1] = new THREE.Vector2(el[0] * cellWidth + cellWidth, el[1] * cellHeight + 0);
    geometry.faceVertexUvs[0][j + 1][2] = new THREE.Vector2(el[0] * cellWidth + cellWidth, el[1] * cellHeight + cellHeight);
   });
   

   console.log(geometry.faceVertexUvs);
    var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;

    group.add(object);
    scene.add(group);
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}