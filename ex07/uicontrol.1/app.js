var sacne , camera , renderer, labelRX, labelRY, labelRZ,labelPX, labelPY, labelPZ;
var mainModel, bodyMaterial, raycaster, cursor , interiorMaterial, shadow , theta=0 ,controls
var radius =15, theta = 0, progress;
var  hemisphereLight, ambientLight, pointLight, directLight, rectLight,ground,spotLightRight,spotLightLeft;
var animations = [];
var mouse = new THREE.Vector2(), INTERSECTED;
var rightDoor = {name:"Mesh74_032Gruppe_12_1_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var leftDoor = {name:"Mesh204_032Gruppe_12_2_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var doorModels = [rightDoor, leftDoor];
var loaded = false ,loadingScene,loadingCamera;
init();
animate();

function loadInit(){
     loadingScene = new THREE.Scene();
    console.log(window.innerWidth);
     loadingCamera = new THREE.OrthographicCamera(0,window.innerWidth,0,window.innerHeight,1,0);
    var BoxGeometry = new THREE.BoxGeometry(window.innerWidth /2 ,window.innerHeight / 2,1);
    
    progress = new THREE.Mesh(BoxGeometry,new THREE.MeshBasicMaterial({color:0xffffff}));
    progress.position.x = window.innerWidth / 2;
    progress.position.y = window.innerHeight / 2;
    progress.scale.x = 0.001;
    // setInterval( ()=>{
    //     progress.scale.x += 0.1;
        
    // },100)
    loadingCamera.lookAt(loadingScene.position);
    loadingScene.add(progress);
    loadingScene.add(loadingCamera);
    renderer.render(loadingScene,loadingCamera);
    renderer.background = new THREE.Color(0xffffff);
}

function init() {
    var container = document.getElementById('container');
    
    renderer = new THREE.WebGLRenderer({antialias:false});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    loadInit();
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 6;
    camera.position.y = 2;
    camera.position.x = -6;
    camera.lookAt(10,0,10);
    // camera.rotation.x = -0.329;
    // camera.rotation.y = -0.75;
    // camera.rotation.z = -0.23;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener("mousemove", mousemove);
    //controls.target = new THREE.Vector3(10,0,10);// .po(10,0,10);
    // controls.maxPolarAngle = toRadian(80);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;
    document.addEventListener("mousemove", onMouseMove);
    // document.addEventListener("mousedown",)//
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp);

    document.addEventListener("click",onMouseClick);
    labelRX = document.getElementById("rotateX"); 
    labelRY = document.getElementById("rotateY");

    scene.add( camera );

    createModels();
    createLight();

    raycaster = new THREE.Raycaster();
    stats = new Stats();
	container.appendChild( stats.dom );
    // setupGui();
    labelRX = document.getElementById("labelRX");
    labelRY = document.getElementById("labelRY");
    labelRZ = document.getElementById("labelRZ");

    labelPX = document.getElementById("labelPX");
    labelPY = document.getElementById("labelPY");
    labelPZ = document.getElementById("labelPZ");
}

function createModels() {

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
            progress.scale.x = percentComplate / 100;
            // progress.update();
            // console.log(percentComplate)
        }
    };

    var onError = function (xhr ) {
    };    
    
    new THREE.MTLLoader()   
    .setPath( '../res/Aventador/' )
    .load( 'Avent.mtl', function ( materials ) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials( materials )
            .setPath( '../res/Aventador/' )
            .load( 'Avent.obj', function ( object ) {
                object.traverse ( function ( child ) { 
                    
                    if (child.material)
                    {
                        if ( child.material.name === "Body") {
                            if (bodyMaterial == undefined)
                            {
                                bodyMaterial = new THREE.MeshStandardMaterial( );
                                bodyMaterial.copy(child.material);
                                bodyMaterial.side = THREE.DoubleSide;
                                bodyMaterial.envMap = textureCube;
                            }
                            child.material = bodyMaterial;
                        } else if (child.material.name == "interior"){
                            if (interiorMaterial == undefined)
                            {
                                interiorMaterial = new THREE.MeshPhongMaterial({color:0x333333});
                            }
                            child.material =interiorMaterial;
                        }
                         else {

                        }
                    }
                });
                setupGui();
                mainModel = object;                
                scene.add( object );
                // shadow.visible = true;
                // var box = new THREE.BoxHelper( object, 0xffff00 );
                // scene.add(box);
                // box.geometry.computeBoundingBox();
                // console.log(mainModel.children);
                var names = object.children.reduce((p,c)=>{
                    if (c.material.name in p) {
                        p[c.material.name].push(c.material);
                    }
                    else {
                        p[c.material.name] =[c.material];
                    }
                    return p;
                },{})
                console.log("material-names", names);
                console.log(camera.position);
                
                // setTimeout(function(){

                    loaded=  true;
                //     
                // },500)
                
            }, onProgress, onError );
    } );
    
    // create ground
    var groundTexture =  new THREE.TextureLoader().load("../res/crocodile--skin-texture.jpg");
    var groundGeo = new THREE.PlaneBufferGeometry( 50, 50 );
    var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    // groundMat.map = groundTexture;
    // groundMat.color.setHSL( 0.095, 0.095, 0.095 );
    ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);


    // var shadowTexture =  new THREE.TextureLoader().load("../res/car_shadow.png");
    // var shadowGeometry = new THREE.PlaneBufferGeometry( 7, 4 );
    // var shadowMet = new THREE.MeshBasicMaterial( { color: 0xffffff , map: shadowTexture} );
    // shadow = new THREE.Mesh( shadowGeometry, shadowMet );
    // shadow.rotation.x = -Math.PI/2;
    // shadow.position.y = 0.01;
    // shadow.visible = false;
    // scene.add(shadow);

    // // create dome
    // var domeMaterial = new THREE.MeshBasicMaterial( { color:0xffffff ,side: THREE.DoubleSide } );
    // var dome = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), domeMaterial );
    // scene.add( dome );

    cursor = new THREE.Mesh( new THREE.SphereBufferGeometry( 0.02, 20, 10 ), new THREE.MeshBasicMaterial({color:0xdddddd}) );
    cursor.position.set( 0, 0, 0 );
    scene.add( cursor );

}

function createLight(){
    hemisphereLight = new THREE.HemisphereLight( 0x111111, 0x44444488 )     
    ambientLight = new THREE.AmbientLight( 0x333333,0.3 );
    pointLight = new THREE.PointLight( 0xeeeeee, 0.5);
    directLight = new THREE.DirectionalLight(0xeeeeee, 0.5);

    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = -5;
    pointLight.position.y = 5;
    pointLight.position.z = -5;
    scene.add(hemisphereLight);
    // scene.add(pointLight);
    // scene.add(directLight);
    scene.add( ambientLight );
    
    var spotX  = new THREE.SpotLight(0xffffff,5,30,0.3);
    spotX.position.x = 15;
    spotX.position.y = 15;
    spotX.position.z = 5;
    spotX.penumbra = 1;

    scene.add( spotX );
    
    // var p = new THREE.DirectionalLightHelper( directLight);
    // // p.position.y = 0.5;
    // scene.add(p);

    
    rectLight = new THREE.RectAreaLight( 0x333333, 0.5,20, 20 );
    rectLight.intensity = 2;
    rectLight.position.set( 4, 6, 0 );
    rectLight.rotation.x = toRadian(90);
    // scene.add( rectLight );

    
    spotLightRight = new THREE.SpotLight(0xffffff,1,10,0.6);
    spotLightRight.position.set(-2.244489857715184,  0.766449233915141,  0.8872985465416559);
    scene.add(spotLightRight);
    spotLightRight.target.position.set(-6.430185835893451,0,0.7110184568926261)
    spotLightRight.updateMatrix();
    scene.add(spotLightRight.target);
   

    spotLightLeft = new THREE.SpotLight(0xffffff,1,10,0.6);
    spotLightLeft.position.set(-2.4077858903756386,  0.766449233915141,  -0.8125950461638625);
    scene.add(spotLightLeft);
    spotLightLeft.target.position.set(-6.5434621199902425,0,-1.4596229857608884)
    spotLightLeft.updateMatrix();
    scene.add(spotLightLeft.target);

    var spotHelper = new THREE.SpotLightHelper(spotLightLeft);
    scene.add(spotHelper);
//     -2.4077858903756386
// y
// :
// 0.7255074581992889
// z
// :
// -0.8125950461638625
    // var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
    // rectLightMesh.scale.x = rectLight.width;
    // rectLightMesh.scale.y = rectLight.height;
    // rectLight.add( rectLightMesh );

    // var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
    // rectLightMeshBack.rotation.y = Math.PI;
    // rectLightMesh.add( rectLightMeshBack );

}


function setupGui(){
    var h;
    var gui = new dat.GUI();
    h = gui.addFolder("Light");
    var lightcontrols = [
        {name:"hemisphere", obj:hemisphereLight},
        {name:"ambient", obj:ambientLight},
        {name:"point", obj:pointLight},
        {name:"direct", obj:directLight},
        {name:"rect", obj:rectLight},
        {name:"right", obj:spotLightRight},
        {name:"left", obj:spotLightLeft},
    ]
    lightcontrols.forEach(e=>{
        var hx=h.addFolder(e.name);
        addTree(hx,e.obj,0);
    })
    hx = gui.addFolder("body")
    addTree(hx,bodyMaterial,0);

    // hx = gui.addFolder("control")
    // addTree(hx,controls,0);

    hx = gui.addFolder("camera") 
    addTree(hx,camera,0);
}

function addTree(gui,obj, depth){
    depth++;
    if (depth > 2)
        return;
    
    var keys = Object.keys(obj);
    keys.forEach(e=>{
        try {
            if (typeof(obj[e]) == "object"){
                h = gui.addFolder(e);
                addTree(h,obj[e],depth);
            }else {
                gui.add(obj,e);
            }
        }
        catch(ex) {}
    });
}

function colorChange  (event) {
    console.log("colorChange",event.value,new THREE.Color(event.value));
    bodyMaterial.color = new THREE.Color(event.value);
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function toDegree(rad) {
    return rad / Math.PI * 180;
}
var offsetX = 0;
var offsetY = 0;
function onMouseMove(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    if (controls.enable == false && press ){
        var velocityX = event.offsetX - offsetX;
        var velocityY = event.offsetY - offsetY;
        
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        
        
        // camera.rotation.x += toRadian(velocityX/5);
        // camera.rotation.z += toRadian(velocityX/5);//
        camera.rotateOnAxis(new THREE.Vector3(0,1,0), toRadian(velocityX/5));
        // camera.rotation.y += toRadian(velocityY/5);
        //camera.rotateZ(velocityX/5);
    }
    else {
        var velocityX = event.offsetX - offsetX;
        var velocityY = event.offsetY - offsetY;
        
        offsetX = event.offsetX;
        offsetY = event.offsetY;

        
        // mainModel.rotation.y += toRadian(velocityX);
        // mainModel.rotation.y += toRadian(velocityX);
        // mainModel.rotation.z += toRadian(velocityX);
    }
}
var press = false;
function onMouseDown(event) {
    console.log("onMouseDown",event);
    press = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
}

function onMouseUp(event) {
    console.log("onMouseUp",event);
    press = false;
}

function touchMove(event) {
    console.log("touchMove");
    if (controls.enable == false)
    {
        camera.rotation.z+=0.1;
        // console.log(controls);
        // controls.rotateUp(0.1);
        
    }
}

function onMouseClick(event) {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    console.log(intersects)
    if (mainModel) {
        var intersects = raycaster.intersectObjects( mainModel.children );
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                INTERSECTED = intersects[ 0 ].object;
                // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                // INTERSECTED.material.emissive.setHex( 0xff0000 );
                if (INTERSECTED.name == rightDoor.name)
                {
                    if (rightDoor.opened == false)
                    {
                        INTERSECTED.rotation.y +=toRadian(60);
                        INTERSECTED.position.z +=-1.5;
                        INTERSECTED.position.x +=0.36;
                    }
                    else{
                        INTERSECTED.rotation.y =0;
                        INTERSECTED.position.z =0;
                        INTERSECTED.position.x =0;
                    }
                    rightDoor.opened = !rightDoor.opened;
                }
                if (INTERSECTED.name == leftDoor.name){
                    if (leftDoor.opened == false){
                        INTERSECTED.rotation.y +=toRadian(-60);
                        INTERSECTED.position.z +=1.5;
                        INTERSECTED.position.x +=0.36;
                    }else {
                        INTERSECTED.rotation.y =0;
                        INTERSECTED.position.z =0;
                        INTERSECTED.position.x =0;
                    }
                    leftDoor.opened = !leftDoor.opened;
                }
                // console.log(INTERSECTED);
                // 
                
            }
        } else {
            // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }
    }
}

function animate(time) {

    stats.begin();
    requestAnimationFrame( animate );
    raycaster.setFromCamera( mouse, camera );
    // controls.update();
    if (animations.length){
        // animations.forEach(el=>{
        //     el(time)
        // })
        var x = animations[0](time)
        if (x== undefined)
        {
            animations.length = 0;
            // camera.rotation.x= 0;
            // camera.rotation.y= 0;
            // camera.rotation.z= 0;
            //camera.lookAt(new THREE.Vector3(0,0,))
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
        // console.log(animations[0](time),animations[1](time),animations[2](time));
    }
    // theta += 0.1;
    // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    // // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    // camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
    // camera.lookAt( scene.position );

    if (mainModel) {
        var intersects = raycaster.intersectObjects( mainModel.children );
        if ( intersects.length > 0 ) {
            cursor.position.x  = intersects[0].point.x;
            cursor.position.y  = intersects[0].point.y;
            cursor.position.z  = intersects[0].point.z;
            cursor.visible = true;
        } else {
            cursor.visible = false;
        }
    }
    if (loaded)
        renderer.render( scene, camera );
    else 
        renderer.render(loadingScene,loadingCamera);
    labelRX.innerHTML = camera.position.x.toFixed(3);
    labelRY.innerHTML = camera.position.y.toFixed(3);
    labelRZ.innerHTML = camera.position.z.toFixed(3);

    labelPX.innerHTML = toDegree(camera.rotation.x).toFixed(3);
    labelPY.innerHTML = toDegree(camera.rotation.y).toFixed(3);
    labelPZ.innerHTML = toDegree(camera.rotation.z).toFixed(3);

    stats.end();
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
    controls.enable = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    // controls.mouse
    animations = [StopWatch(3,camera.position.x,0.24),StopWatch(3,camera.position.y,1.16),StopWatch(3,camera.position.z,0.422)];
}