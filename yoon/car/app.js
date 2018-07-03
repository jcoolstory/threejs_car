
var mainScene;
var cubeScene;
var camera;
var renderer;
var offsetX;
var offsetY;

var mainModel;
var bodyMaterial;
var interiorMaterial;
var shadow;
var theta = 0;
var controls;

var radius = 15;
var enableInner = true;//true 외부 false 내부
var press = false;
var loading = true;
var manager;

var animations = [];
var mouse = new THREE.Vector2();

var innerW = window.innerWidth;
var innerH = window.innerHeight;
var path = "./texture/";

function resetCamera(){
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = -5;

    camera.rotation.x = -0.329;
    camera.rotation.y = -0.75;
    camera.rotation.z = -0.23;
}

function init(){

    renderer = new THREE.WebGLRenderer({antialias: false});
    renderer.setSize(innerW, innerH);
    
    camera = new THREE.PerspectiveCamera(75, innerW/innerH, 0.1, 1000);
    resetCamera();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = toRadian(80);
    controls.maxDistance = 15;
    controls.minDistance = 5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    document.body.appendChild(renderer.domElement);

    manager = new THREE.LoadingManager();
    manager.onLoad = function(){
        loading = false;
    }

    createModels();
    createLight();
    createCubeMap();

    window.addEventListener( 'resize', onWindowResize, false );
    
}

var cubeControls;
var cubeCamera;
function createCubeMap(){
    var sheetArr = ["cloth", "leather", "leathercloth"];
    var gearTypeArr = ['auto', 'stick'];
    var cubeExtArr = ['negy', 'posx', 'posz'];
    var cubePath = path + "cube/interior/";

    cubeScene = new THREE.Scene();

    cubeCamera = new THREE.PerspectiveCamera(75, innerW/innerH, 0.1, 1000);
    
    cubeCamera.position.z = 1;
    cubeCamera.position.y = 0;
    cubeCamera.position.x = 0;

    cubeCamera.rotation.x = -1.5;
    cubeCamera.rotation.y = -1.2;
    cubeCamera.rotation.z = -1.5;
    
    cubeControls = new THREE.OrbitControls(cubeCamera, renderer.domElement );

    cubeScene.add( cubeCamera );

    for(var i = 0; i < cubeExtArr.length; i++){//변환되는 개수(ny, px, pz)
        for(var s = 0; s < gearTypeArr.length; s++){//기어 종류
            for(var j = 0; j < sheetArr.length; j++){//시트 종류
                new THREE.ImageLoader(manager).setPath(cubePath + gearTypeArr[s] + "-" + sheetArr[j] + "/").load(cubeExtArr[i] + '.jpg');
            }
            
        }
    }
}
function createModels(){

    var reflectIndoor = path + "cube/reflectIndoor/";
    var urls = [
        reflectIndoor + "px.jpg", reflectIndoor + "nx.jpg",
        reflectIndoor + "py.jpg", reflectIndoor + "ny.jpg",
        reflectIndoor + "pz.jpg", reflectIndoor + "nz.jpg"
    ];
    var textureCube = new THREE.CubeTextureLoader().load(urls);

    var reflectIndoorBlur = path + "cube/reflectIndoor-blur/";
    var urls2 = [
        reflectIndoorBlur + "px.jpg", reflectIndoorBlur + "nx.jpg",
        reflectIndoorBlur + "py.jpg", reflectIndoorBlur + "ny.jpg",
        reflectIndoorBlur + "pz.jpg", reflectIndoorBlur + "nz.jpg"
    ];

    var textureCubeBlur = new THREE.CubeTextureLoader().load(urls2);

    var texturePath = path + "Aventador/";

    mainScene = new THREE.Scene();
    mainScene.add(camera);

    new THREE.MTLLoader()
             .setPath(texturePath)
             .load("Avent.mtl", function(materials){
                materials.preload();
                new THREE.OBJLoader(manager)
                         .setMaterials(materials)
                         .setPath(texturePath)
                         .load("Avent.obj", function(obj){
                            obj.traverse(function(child){
                                if(child.material){
                                    if(child.material.name == "Body"){
                                        if(bodyMaterial == undefined){
                                            bodyMaterial = child.material;
                                            bodyMaterial.envMap = textureCube;
                                            bodyMaterial.reflectivity = 0.3;
                                            bodyMaterial.emissive = new THREE.Color(bodyMaterial.color);
                                            vue.bodyColor = "#" + bodyMaterial.color.getHexString();
                                        }
                                        child.material = bodyMaterial;
                                    }else if(child.material.name == "interior"){
                                        if(interiorMaterial == undefined){
                                            interiorMaterial = new THREE.MeshLambertMaterial({color:0x666666});
                                        }
                                        child.material = interiorMaterial;
                                    }else if(child.material.name == "Glass"){
                                        child.material.color = new THREE.Color(0.3,0.3,0.3);
                                        child.material.envMap = textureCube;
                                        child.material.reflectivity = 1;
                                        child.material.opacity = 0.5;
                                    }
                                }
                            });
                            mainModel = obj;
                            mainScene.add(obj);
                            shadow.visible = true;
                         }, vue.onProgress, onError);
                         
            });

    var shadowTexture = new THREE.TextureLoader().load(path + "car_shadow.png");
    var shadowGeometry = new THREE.PlaneBufferGeometry(7,4);
    var shadowMaterial = new THREE.MeshBasicMaterial({color:0xaaaaaa, map: shadowTexture, transparent: true});
    shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = - Math.PI/2;
    shadow.position.y = 0.1;
    shadow.visible = false;
    mainScene.add(shadow);

    /* 패턴 */
    var domTexture = new THREE.TextureLoader().load(path + "ground/pattern.png");
    domTexture.wrapS = domTexture.wrapT = THREE.RepeatWrapping;
    domTexture.repeat.set(2, 1);

    var domMaterial = new THREE.MeshBasicMaterial({color:0xffffff, side: THREE.BackSide});
    domMaterial.envMap = textureCubeBlur;
    domMaterial.map = domTexture;
    domMaterial.reflectivity = 0.05;
    
    var dom = new THREE.Mesh(new THREE.CylinderBufferGeometry(15, 15, 20,32), domMaterial);
    dom.position.y = 8;
    mainScene.add(dom);
    /* //패턴 */
    
    /* 바닥 */
    var floorTexture = new THREE.TextureLoader().load(path + "ground/TARMAC2.jpg");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4,4);

    var floorGeometry = new THREE.PlaneBufferGeometry(30, 32, 1, 1);
    var floorMaterial = new THREE.MeshPhongMaterial({color:0xffffff});
    floorMaterial.map = floorTexture;
    //floorMaterial.envMap = textureCube;
    floorMaterial.reflectivity = 0.1;
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = - Math.PI/2;
    floor.position.y = 0.001;
    mainScene.add(floor);
    /* 바닥 */
}

function createLight(){
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.8);
    var ambientLight = new THREE.AmbientLight( 0x333333,0.2 );
    // var pointLight = new THREE.PointLight(0xffffff, 1);
    var directLight = new THREE.DirectionalLight(0xffffff, 0.2);

    directLight.position.x = 3;
    directLight.position.y = 1;
    directLight.position.z = 3;

    // pointLight.position.x = 1;
    // pointLight.position.y = 1;
    // pointLight.position.z = 1;
    
    mainScene.add(hemisphereLight);
    // mainScene.add(pointLight);
    mainScene.add( ambientLight );
    mainScene.add( directLight );
     
}

var gearType = "auto";
var sheetType = "cloth";
function cubeInterior(){
    var commonPath = path + "cube/interior/";
    
    var interiorRoot = gearType + '-' + sheetType + '/';
    var cubeInteriorPath = path + "cube/interior/"+interiorRoot;
    var urls = [
        cubeInteriorPath + "posx.jpg", commonPath +       "negx.jpg",
        commonPath +       "posy.jpg", cubeInteriorPath + "negy.jpg",
        cubeInteriorPath + "posz.jpg", commonPath +       "negz.jpg"
    ];
    cubeControls.update();
    cubeScene.background = new THREE.CubeTextureLoader().load(urls);

    //renderer.setSize(innerW, innerH);
    // renderer.autoClear = false;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFShadowMap;
    
    //renderer.render(cubeScene, camera);
}

function animate(){
    requestAnimationFrame(animate);
    if (loading)
        return;
    
    if(enableInner){
        renderer.render(mainScene, camera );
        controls.update();
    }else{
        renderer.render(cubeScene, cubeCamera );
        cubeControls.update();
    }
        
}

var onError = function (xhr ) {
    console.log(xhr);
};  

function toRadian(num){
    return num * Math.PI / 180;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var vue = new Vue({
    el : "#wrap",
    data: function() {
        return {
            load : false,
            bodyColor : 0xffffff,
            statusView : enableInner,
            statusRotate : true,
            oldRotate: true,
            progressValue : 0,
            statusGear: gearType
        }
    },
    computed :{
        progressText() {
            return this.progressValue.toFixed(0);
        }
    },
    methods : {
        // MATERIALS
        onProgress  ( xhr) {
            if ( xhr.lengthComputable) {
                var percentComplate = xhr.loaded / xhr.total * 100;
                this.progressValue = percentComplate;
                if (percentComplate == 100) {
                    setTimeout(function() {
                        vue.loadFinish();
                    }, 1000)
                }
            }
        },

        loadFinish(){
            this.load = true;
        },
        colorChange  (color) {
            this.bodyColor = color;
            bodyMaterial.color = new THREE.Color("#"+this.bodyColor);
        },
    
        toggleRotate(){    
            controls.autoRotate = !controls.autoRotate;
            this.statusRotate =  controls.autoRotate;
            this.oldRotate = this.statusRotate;
        },
        toggleinner(){
            cubeInterior();
            enableInner = !enableInner;
            this.statusView = enableInner;
            if(this.statusView){
                console.log("main");

                if(this.oldRotate){
                    controls.autoRotate = true;
                    this.statusRotate =  controls.autoRotate;
                    this.oldRotate = this.statusRotate;
                }
                
            }else{
                
                controls.autoRotate = false;
                this.statusRotate =  controls.autoRotate;
            }
           

        },
        interiorChange(type){
            sheetType = type;
            cubeInterior();
        },
        toggleGear(){
            if(this.statusGear == 'auto'){
                this.statusGear = 'stick';
            }else{
                this.statusGear = 'auto';
            }
            gearType = this.statusGear;
            cubeInterior();
        }
    },
    mounted(){
        init();
        animate();
    }
})