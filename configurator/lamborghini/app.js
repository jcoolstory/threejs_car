var sacne , camera , renderer, labelRX, labelRY , offsetX ,offsetY;
var mainModel, bodyMaterial, raycaster, cursor , interiorMaterial, shadow , theta=0 ,controls
var radius =15, theta = 0 , enableInner = false , press = false , loading = true , manager;
var animations = [];
var mouse = new THREE.Vector2(), INTERSECTED;
var rightDoor = {name:"Mesh74_032Gruppe_12_1_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var leftDoor = {name:"Mesh204_032Gruppe_12_2_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var doorModels = [rightDoor, leftDoor];

init();
animate();

function resetCamera(){
    camera.position.z = 6;
    camera.position.y = 2;
    camera.position.x = -6;

    camera.rotation.x = -0.329;
    camera.rotation.y = -0.75;
    camera.rotation.z = -0.23;
}

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias:false});
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
    resetCamera();

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = toRadian(80);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener("click",onMouseClick);
    
    labelRX = document.getElementById("rotateX"); 
    labelRY = document.getElementById("rotateY");

    scene.add( camera );

    createModels();
    createLight();

    raycaster = new THREE.Raycaster();
}

function createModels() {
    manager = new THREE.LoadingManager();
    manager.onLoad = function(url, itemsLoaded, itemsTotal){
        console.log("onLoad");
        setTimeout(function() {
            var progressbar = document.getElementById("progressbar");
            progressbar.style = "display:none";
            loading = false;
        }, 1000)
    };
    var path = "../../res/textures/cube/skybox2/";
				var urls = [
					path + "px.jpg", path + "nx.jpg",
					path + "py.jpg", path + "ny.jpg",
					path + "pz.jpg", path + "nz.jpg"
				];

    textureCube = new THREE.CubeTextureLoader().load( urls );

    // MATERIALS
    var onProgress = function ( xhr) {
        if ( xhr.lengthComputable) {
            var percentComplate = xhr.loaded / xhr.total * 100;
            var value = document.getElementById("progressValue");
            value.innerText = percentComplate.toFixed(0);
            if (percentComplate == 100) {
                
                setTimeout(function() {
                    var progressbar = document.getElementById("progressbar");
                    progressbar.style = "display:none";
                    loading = false;
                }, 1000)
            }
        }
    };

    var onError = function (xhr ) {
    };    
    
    new THREE.MTLLoader()   
    .setPath( '../res/Aventador/' )
    .load( 'Avent.mtl', function ( materials ) {
        materials.preload();
        new THREE.OBJLoader(manager)
            .setMaterials( materials )
            .setPath( '../res/Aventador/' )            
            .load( 'Avent.obj', function ( object ) {
                object.traverse ( function ( child ) { 
                    
                    if (child.material)
                    {
                        if ( child.material.name === "Body") {
                            if (bodyMaterial == undefined)
                            {
                                bodyMaterial =  new THREE.MeshStandardMaterial( );
                                bodyMaterial.copy(child.material);
                                
                            }
                            child.material = bodyMaterial;
                        } else if (child.material.name == "interior"){
                            if (interiorMaterial == undefined)
                            {
                                interiorMaterial = new THREE.MeshLambertMaterial({color:0x333333});
                            }
                            child.material =interiorMaterial;
                        } else {

                        }
                    }
                });

                mainModel = object;                
                scene.add( object );
                shadow.visible = true;
            }, onProgress, onError );
    } );
    
    // create ground
    var groundTexture =  new THREE.TextureLoader().load("../res/crocodile--skin-texture.jpg");
    var groundGeo = new THREE.PlaneBufferGeometry( 50, 50 );
    var groundMat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    // groundMat.map = groundTexture;
    // groundMat.color.setHSL( 0.095, 0.095, 0.095 );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);


    var shadowTexture =  new THREE.TextureLoader().load("../res/car_shadow.png");
    var shadowGeometry = new THREE.PlaneBufferGeometry( 7, 4 );
    var shadowMet = new THREE.MeshBasicMaterial( { color: 0xffffff , map: shadowTexture} );
    shadow = new THREE.Mesh( shadowGeometry, shadowMet );
    shadow.rotation.x = -Math.PI/2;
    shadow.position.y = 0.01;
    shadow.visible = false;
    scene.add(shadow);

    // create dome
    var domeMaterial = new THREE.MeshBasicMaterial( { color:0xffffff ,side: THREE.DoubleSide } );
    var dome = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), domeMaterial );
    scene.add( dome );

    // cursor = new THREE.Mesh( new THREE.SphereBufferGeometry( 0.02, 20, 10 ), new THREE.MeshBasicMaterial({color:0xdddddd}) );
    // cursor.position.set( 0, 0, 0 );
    // scene.add( cursor );

}

function createLight(){
    
    var ambientLight = new THREE.AmbientLight( 0x333333,0.3 );
    var pointLight = new THREE.PointLight( 0xffffff, 1);
    var directLight = new THREE.DirectionalLight(0xfffffff,1);
    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = -5;
    pointLight.position.y = 5;
    pointLight.position.z = -5;
    scene.add(pointLight);
    scene.add(directLight);
    
    scene.add( ambientLight );
    let rectLight = new THREE.RectAreaLight( 0x333333, 0.5,20, 20 );
    rectLight.intensity = 2;
    rectLight.position.set( 4, 6, 0 );
    rectLight.rotation.x = toRadian(90);
    scene.add( rectLight );
}

function colorChange  (event) {
    bodyMaterial.color = new THREE.Color(event.value);
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function onMouseClick(event) {
    
}

function animate(time) {
    
    requestAnimationFrame( animate );
    if (loading)
        return
    
    
    if (animations.length){
        
        var result = animations[0](time)
        if (result== undefined)
        {
            animations.length = 0;
            camera.rotation.x = toRadian(-90);
            camera.rotation.y = toRadian(90);
            camera.rotation.z = toRadian(90);
        }
        else
        {
            camera.position.x = animations[0](time);
            camera.position.y = animations[1](time);
            camera.position.z = animations[2](time);
            camera.lookAt(scene.position);
        }
    }
    if (enableInner == false) {
        controls.update();
    }
    
	    renderer.render( scene, camera );
}

function StopWatch(dur, start, to){
    let startTime = +Date.now();
    var currentTime = 0;
    let range = to-start;
    let lastTime =+Date.now()/1000;
    return function(time){
        time = +Date.now()/1000;
        let delayTime =time- lastTime;
        currentTime = currentTime+ delayTime;
        if (dur < currentTime) return undefined;
         
        let radtio = currentTime/dur;
        lastTime = time;
        return start + range * radtio;
    }
}

function toggleinner(){
    if (enableInner) {
        // resetCamera();
        controls.enable = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = true;
        controls.autoRotate = true;
        animations = [StopWatch(3,camera.position.x,-6),StopWatch(3,camera.position.y,2),StopWatch(3,camera.position.z,6)];
        var toggle =  document.getElementById("toggleButton");
        toggle.value = "Inner Interior";
        
    } else {
        
        controls.enable = false;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        controls.autoRotate = false;
        // controls.mouse
        animations = [StopWatch(3,camera.position.x,0.24),StopWatch(3,camera.position.y,1.16),StopWatch(3,camera.position.z,0.422)];
        var toggle =  document.getElementById("toggleButton");
        toggle.value = "Out Interior";
        
    }
    enableInner = !enableInner;
    
}

function onMouseMove(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    if (controls.enable == false && press ){
        var velocityX = event.offsetX - offsetX;
        var velocityY = event.offsetY - offsetY;
        
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        
        camera.rotateOnAxis(new THREE.Vector3(0,1,0), toRadian(velocityX/5));
        
    }
    // else {
    //     var velocityX = event.offsetX - offsetX;
    //     var velocityY = event.offsetY - offsetY;
        
    //     offsetX = event.offsetX;
    //     offsetY = event.offsetY;
    // }
}

function onMouseDown(event) {
    
    press = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
}

function onMouseUp(event) {
    
    press = false;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}