// controller
var scene, camera , renderer, offsetX ,offsetY, manager, mainCarmodel, mainBounding,
    animations = [],roadblock , collisionWarning = false, followCamera = false;
    accel = 0 , rotationVelo = 0 ,stats = undefined , controlSteer = false; 
    pointSehpare = undefined;
    lines = [];
    mouse = new THREE.Vector2();
    clock = new THREE.Clock();
const groundScale = 20;
var roadCar = [
    {
        accel : 0.0,
        resetPoint : { x: 0 , y : -540 },
        rotationVelo :0,
        direction : 0
    },
    {
        accel : 0.5,
        resetPoint : { x : -20 , y:-240},
        rotationVelo :0,
        direction : toRadian(180)
    },
    {
        accel : 0.4,
        resetPoint : { x:15, y:-200},
        rotationVelo :0,
        direction : 0
    }

];

// let newCar1 = initRoadCar(obj);
// newCar1.accel = 0.0;
// newCar1.resetPoint.x = 0;
// newCar1.resetPoint.y = -540;

// startRoadCar(newCar1);
// roadCar.push(newCar1);
// scene.add(newCar1.model);

// let newCar2 = initRoadCar(obj);

// newCar2.accel = 0.5;
// newCar2.resetPoint.x = -40;
// newCar2.resetPoint.y = -240;
// newCar2.model.rotation.y = toRadian(180);
// startRoadCar(newCar2);
// roadCar.push(newCar2);
// scene.add(newCar2.model);

// let newCar3 = initRoadCar(obj);

// newCar3.accel = 0.4;
// newCar3.resetPoint.x = 15;
// newCar3.resetPoint.y = -200;

    
var mapBuffer = [];    

// materials
var bodyMaterial, interiorMaterial, glassMaterial, shadow , controls,envCubemap ,envCubemapBlur

// flags
var enableInner = false , press = false , loading = true ;

init();
animate();

function resetCamera(){
    camera.position.z = -200;
    camera.position.y = 100;
    camera.position.x = -200;

    camera.rotation.x = -0.329;
    camera.rotation.y = -0.75;
    camera.rotation.z = -0.23;
}   

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( window.innerWidth, window.innerHeight );    
    renderer.toneMapping = THREE.Uncharted2ToneMapping;
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1,1000 );
    resetCamera();

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = toRadian(80);
    controls.maxDistance = 400;
    // controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableKeys = false;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keypress", onKeyPress);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener("click",onMouseClick);

    scene.add( camera );

    createModels();
    createLight();
    scene.background = new THREE.Color(0xaaaaaa);
    // scene.background = envCubemapBlur;
    // scene.background = envCubemap;
    // raycaster = new THREE.Raycaster();

    toggleCameraThree();
    stats = new Stats();
    document.body.appendChild( stats.dom );
}

function onKeyPress(evt) {
    // console.log("onKeyPress : " ,evt.key, ":", evt.keyCode)
    if (evt.key === 'w')
    {
        if (collisionWarning == false)
            accel += 5;
    }
    else if (evt.key === "s")
        accel -= 3;
    else if (evt.key === "a") 
    {
        controlSteer = true;
        rotationVelo += 2;
    }
    else if (evt.key === "d")
    {
        controlSteer = true;
        rotationVelo -= 2;
    }

}

function onKeyDown(evt) {
    // console.log("onKeyDown : " ,evt.key , ":", evt.keyCode)
}

function onKeyUp(evt) {
     
    if (evt.key === "a" || evt.key === "d") 
        controlSteer = false;
}

function createModels() {
    
    createBackground();
    createCar();
    createPartObjects();
    createShadow();
    
}

function createPartObjects() {
    var geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    
    roadblock = new THREE.Mesh( geometry, material );
    
    roadblock.position.z = -540;
    // scene.add( roadblock );

    var geometrySe = new THREE.SphereBufferGeometry(1,10,10);
    var materialSe = new THREE.MeshBasicMaterial({color:0xff0000});

    pointSehpare = new THREE.Mesh(geometrySe, materialSe);
    // scene.add(pointSehpare);
}

function carTraverse(materials) {
    if (materials) {

        var materialValues = Object.values(materials);
        for (var i = 0 ; i < materialValues.length ; i++) {

            var material = materialValues[i];
            if (material.name == "carpaint") {
                
                bodyMaterial = material;

                // bodyMaterial = new THREE.MeshLambertMaterial();
                // bodyMaterial.copy(material);
                // materials["carpaint"] = bodyMaterial;
                // material = bodyMaterial;
                
                vueApp.bodyColor = "#" + bodyMaterial.color.getHexString();
            }
            material.envMap = envCubemap;
            material.reflectivity = 0.6;
            material.shininess = 0.1;
        }

        // if ( child.material.name === "Body") {
        //     if (bodyMaterial == undefined) {

        //         bodyMaterial = child.material;
        //         bodyMaterial.envMap = envCubemap;
        //         bodyMaterial.reflectivity = 0.3;
        //         bodyMaterial.emissive = new THREE.Color(0.1,0.1,0.1);
        //         bodyMaterial.needsUpdate = true;
        //         vueApp.bodyColor = "#" + bodyMaterial.color.getHexString();
        //     }
        //     child.material = bodyMaterial;
        // } else if (child.material.name == "interior") {
        //     // if (interiorMaterial == undefined) {
        //     //     interiorMaterial = new THREE.MeshLambertMaterial({color:0x333333});
        //     // }
        //     // child.material =interiorMaterial;
        // } else  if (child.material.name == "Glass") {
        //     if (glassMaterial == undefined) {
        //         glassMaterial = child.material;
        //         glassMaterial.color = new THREE.Color(0.3,0.3,0.3);
        //         glassMaterial.envMap = envCubemap;
        //         glassMaterial.reflectivity = 1;
        //         glassMaterial.opacity = 0.5; 
        //     }
        // }
    }
}

function createCar() {
    manager = new THREE.LoadingManager();
    manager.onLoad = ( f => { loading = false } );
    manager.onLoad= (f=> {
        loading = false;
    })
    var path = "../../res/textures/cube/reflectGray/";
    var urls = [
        path + "px.jpg", path + "nx.jpg",
        path + "py.jpg", path + "ny.jpg",
        path + "pz.jpg", path + "nz.jpg"
    ];

    envCubemap = new THREE.CubeTextureLoader().load( urls );

    var onError = function (xhr ) {
    };
    
    new THREE.MTLLoader()   
    .setPath( '../res/Aventador/' )
    .load( 'Avent.mtl', function ( materials ) {
        
        materials.preload();
        console.log(materials);
        carTraverse(materials.materials);
        new THREE.OBJLoader(manager)
            .setMaterials( materials )
            .setPath( '../res/Aventador/' )            
            .load( 'Avent-flip.obj', function ( object ) {
                
                mainCarmodel = object;
                scene.add( object );
                shadow.visible = true;

                // roadCar = object.clone();
                // initRoadCar(roadCar);
                // scene.add(roadCar);
                mainBounding = new THREE.BoxHelper( mainCarmodel, 0xffff00 );
                scene.add(mainBounding);
                mainBounding.geometry.computeBoundingBox();                
            }, vueApp.onProgress, onError );
    } );


    var texture = new THREE.TextureLoader(manager).load( '../res/Porsche/skin04/0000.BMP' );
    var loader = new THREE.OBJLoader(manager);
    var materialColor = new THREE.Color(1,1,1);
    var texturedMaterial =new THREE.MeshPhongMaterial( { color: materialColor, flatShading:false, side: THREE.DoubleSide } )
    //var texturedMaterial = new MeshLambertMaterial( { color: materialColor, flatShading:false, side: THREE.DoubleSide } )
    //var texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor,wireframe: true } );
    texturedMaterial.shininess = 40;
    texturedMaterial.specular = new THREE.Color(1,1,1);
    texturedMaterial.map = texture;

    loader.load('../res/Porsche/Porsche_911_GT2.obj', function (obj){
        obj.traverse ( function ( child ) { 
            if ( child instanceof THREE.Mesh) {
                
                child.material = texturedMaterial;
            }
        });
        // obj.scale.x = 1.3;
        // obj.scale.y = 1.3;
        // obj.scale.z = 1.3;
        obj.updateMatrix();
        var box = new THREE.BoxHelper( obj, 0xffff00 );
        box.geometry.computeBoundingBox();
        
        // scene.add(box);
        obj.position.y = -box.geometry.boundingBox.min.y;
        // obj.position.y = 0
        
        ;
        for( var i = 0 ; i < roadCar.length ; i++) {
            initRoadCar(obj,roadCar[i]);
            startRoadCar(roadCar[i])
            scene.add(roadCar[i].model);
        }
    });
}

function initRoadCar(carmodel, object) {
    let car = carmodel.clone();
    object.model = car;
    
    var box = new THREE.BoxHelper( carmodel, 0xfff0ff );
    box.geometry.computeBoundingBox();
    scene.add(box);
    object.box = box;
    return car;
}

function startRoadCar(car) {
    car.model.position.x = car.resetPoint.x;
    car.model.position.z = car.resetPoint.y;
    car.model.rotation.y = car.direction;
    console.log(car.model)
}

function createShadow() {

    var shadowTexture =  new THREE.TextureLoader().load("../res/car_shadow.png");
    var shadowGeometry = new THREE.PlaneBufferGeometry( 7, 4 );
    var shadowMet = new THREE.MeshBasicMaterial( { color: 0xaaaaaa , map: shadowTexture, transparent:true} );
    shadow = new THREE.Mesh( shadowGeometry, shadowMet );
    shadow.rotation.x = -Math.PI/2;
    shadow.position.y = 0.02;
    shadow.visible = false;
    // scene.add(shadow);
}

function createBackground() {   

    var path2 = "../../res/textures/cube/reflectIndoor-blur/";
    var urls2 = [
        path2 + "px.jpg", path2 + "nx.jpg",
        path2 + "py.jpg", path2 + "ny.jpg",
        path2 + "pz.jpg", path2 + "nz.jpg"
    ];

    var textureCubeBlur = new THREE.CubeTextureLoader().load(urls2);
    envCubemapBlur = textureCubeBlur;
    // // create dome or cylinder
    // var domTexture =   new THREE.TextureLoader().load("../../res/textures/ground/pattern.png");
    // domTexture.wrapS = THREE.RepeatWrapping;
    // domTexture.wrapT = THREE.RepeatWrapping;
    // domTexture.repeat.set( 16, 16 );
    // var domeMaterial = new THREE.MeshBasicMaterial( { color:0xffffff , side: THREE.BackSide } );
    // domeMaterial.envMap = textureCubeBlur;
    // domeMaterial.reflectivity = 1;

    // var dome = new THREE.Mesh( new THREE.CylinderBufferGeometry( 150, 150, 20,32 ), domeMaterial );
    // dome.position.y = 10;
    // scene.add( dome );

    ///
    /// showroomt을 white color 변경시 필요없음
    /// 
    // // create ground    
    var groundTexture =  new THREE.TextureLoader().load("../res/ground_1024.png",(obj)=>{
        let can = document.createElement('canvas');
        let ctx = can.getContext('2d');
        ctx.drawImage(obj.image, 0, 0);
        let imgIn = ctx.getImageData(0, 0, obj.image.width,  obj.image.height);
        let width =  obj.image.width;
        let height = obj.image.height;
        let length = imgIn.data.length;

        for (var i = 0 ; i < length ; i +=4) {
            mapBuffer[i/4] = 255- imgIn.data[i];
        }
        
        var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        geometry.translate( 0, 0.5, 0 );
        var material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, flatShading: true } );
        for ( var i = 0; i < mapBuffer.length; i ++ ) {
            if (mapBuffer[i] == 0)
                continue;

            var mesh = new THREE.Mesh( geometry, material );
            
            let x = i % width;
            let y = i / width;

            mesh.position.x = x * groundScale - 128 * groundScale / 2;
            mesh.position.z = y * groundScale  - 128 * groundScale / 2;
            mesh.position.y = 0;
            mesh.scale.x = groundScale;
            mesh.scale.y = mapBuffer[i];
            mesh.scale.z = groundScale;
            mesh.updateMatrix();
            mesh.matrixAutoUpdate = false;
            scene.add( mesh );
        }
    });
    
    // groundTexture.wrapS = THREE.RepeatWrapping;
    // groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.magFilter = THREE.NearestFilter;
    groundTexture.minFilter = THREE.NearestFilter;
    // groundTexture.repeat.set( 40, 40 );
    var groundGeo = new THREE.PlaneGeometry( 128*20, 128*20,1,1 );
    var groundMat = new THREE.MeshLambertMaterial({ color:0x222222, shininess:0});

    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);
    // scene.fog = new THREE.Fog( 0xaaaaaa, 50, 100 );

    // var helper = new THREE.GridHelper( 5000, 50 );
    // helper.material.transparent = false;
    // scene.add(helper);
}

function createLight(){
    
    var hemisphereLight = new THREE.HemisphereLight( 0xeeeeee ,0x111111)     
    var ambientLight = new THREE.AmbientLight( 0xffffff,0.6 );
    var pointLight = new THREE.PointLight( 0xeeeeee, 0.6);
    var directLight = new THREE.DirectionalLight(0xffffff, 0.8);

    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = 0;
    pointLight.position.y = 150;
    pointLight.position.z = 0;
    // camera.add(directLight);
    scene.add(hemisphereLight);
    scene.add(pointLight);
    
    scene.add( ambientLight );
}


function toDegree(rad) {    
    return rad * 180 / Math.PI
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function onMouseClick(event) {
    
}

function toggleView(){
            
    if (enableInner) {
        // resetCamera();
        controls.enable = true;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.enablePan = true;
        controls.autoRotate = true;
        animations = [StopWatch(3,camera.position.x,-6),StopWatch(3,camera.position.y,2),StopWatch(3,camera.position.z,6)];
        
    } else {
        
        controls.enable = false;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        controls.autoRotate = false;                
        animations = [StopWatch(3,camera.position.x,0.26),StopWatch(3,camera.position.y,1.16),StopWatch(3,camera.position.z,0.442)];
        
    }
    enableInner = !enableInner;
    return enableInner;
    
}

function lineIntersection(srt1, end1,srt2,end2){

    var dx_ba = end1.x - srt1.x;
    var dx_dc = end2.x - srt2.x;
    var dy_ba = end1.y - srt1.y;
    var dy_dc = end2.y - srt2.y;
    var den = dy_dc * dx_ba - dx_dc * dy_ba;

    if (den == 0)
        return false;
        

    var dy_ac = srt1.y-srt2.y;
    var dx_ac = srt1.x-srt2.x
    var ua = (dx_dc * dy_ac-dy_dc * dx_ac) / den;
    var ub = (dx_ba * dy_ac-dy_ba * dx_ac) / den;

    if ( 0 < ua && ua <1 && 0 < ub && ub <1 )
    {   
        var nx = srt1.x + dx_ba * ua;
        var ny = srt1.y + dy_ba * ua;
        return {x:nx,y:ny};
    }else{
        return false;
    }
}

function Point(x,y) {
    this.x = x;
    this.y = y;
}

function circlelineintersection(p1,r,p2,p3)  {

    var x = p1.x;
    var y = p1.y;

    var a = p2.x;
    var b = p2.y;
    var c = p3.x;
    var d = p3.y;

    if (c != a){
        var m = (d-b)/(c-a);;
        var n = (b*c-a*d)/(c-a);

        var A = m*m+1;
        var B1 = (m*n-m*y-x);
        var C = (x*x+y*y-r*r + n*n - 2 * n * y);
        var D = B1 * B1 - A*C;

        if (D<0){
            return []
        }
        else if (D==0){
            var X = -B1/A
            var Y = m*X+n
            return [new Point(X,Y)]
        }
        else {
            var X = -(B1 + Math.sqrt(D))/A
            var Y = m*X + n

            var X2 = -(B1 - Math.sqrt(D))/A
            var Y2 = m*X2+n
            return [ new Point(X,Y), new Point(X2,Y2)]
        }
    }
    else {
        if (a < (x - r) || a > (x + r) ) {
            return []
        }
        else if (a == (x-r) || a ==(x+r)){
            var X=a;
            var Y=y;
            return [new Point(X,Y)]
        }
        else {
            var X = a
            var Y = y + Math.sqrt( r * r - (a-x)*(a-x))
            
            var Y1 = y - Math.sqrt( r * r - (a-x)*(a-x))

            return [new Point(X,Y), new Point(X,Y1)]
        }
    }
}

function updateCars(car){
    if (! car )
        return;

    let current =  -(Math.abs(car.accel) > 0.01 ? car.accel :0);
    // console.log(current)
    if (car.rotationVelo > 0.05)
        car.rotationVelo = 0.05;
    
    if ( Math.abs(current) > 0.0)
        car.model.rotation.y += car.rotationVelo;

    
    let x = Math.sin(car.model.rotation.y) * current;
    let z = Math.cos(car.model.rotation.y) * current;
    // console.log(car.model.rotation.y)
    car.model.position.x += x;
    car.model.position.z += z;
    
    
    // if (car.accel > 0.003)
    //     car.accel -= 0.003;

    if ( Math.abs(car.rotationVelo) > 0.001)
        car.rotationVelo *= 0.95;
    else
        car.rotationVelo = 0;
    // console.log(car.model.position)

    car.box.matrix.makeRotationFromQuaternion(car.model.quaternion);
    car.box.matrix.setPosition(car.model.position);
    car.box.update();
}


// browser visible changed event
// document.addEventListener("visibilitychange", function() {
//     console.log(document.hidden, document.visibilityState);
//   }, false);
  
  
function update(time){
    
    for ( var i = 0 ; i < roadCar.length ; i++) {
        if (roadCar[i].model)
            updateCars(roadCar[i]);
    }
    if (mainCarmodel) {
        let current = -( Math.abs(accel) > 0.01 ? accel : 0) * time;
        //mainCarmodel.position.z += current;
        if (rotationVelo > 45)
            rotationVelo = 45;
        if ( Math.abs(current) > 0.0)
            mainCarmodel.rotation.y += (toRadian(rotationVelo) * time);
        let x = Math.sin(mainCarmodel.rotation.y) * current;
        let z = Math.cos(mainCarmodel.rotation.y) * current;

        
        
        let locationX = parseInt( (mainCarmodel.position.x + 10)  / groundScale + 64) ;
        let locationY = parseInt( (mainCarmodel.position.z + 10)  / groundScale + 64);
        
        if (mapBuffer[locationX  + locationY * 128] <= 1 || accel < 0) {
            mainCarmodel.position.x += x;
            mainCarmodel.position.z += z;
            
        }

        // if (accel > 0.003)
        //     accel -= 0.003;

        if (controlSteer == false)
            if (Math.abs(rotationVelo) > 1 ) {
                rotationVelo *= 0.9;
            } else {
                rotationVelo = 0;
            }
             

        x = Math.sin(mainCarmodel.rotation.y) * 10;
        z = Math.cos(mainCarmodel.rotation.y) * 10;

        if (followCamera) {
            camera.position.x = mainCarmodel.position.x  + x;
            camera.position.y = mainCarmodel.position.y  + 5;
            camera.position.z = mainCarmodel.position.z  + z;
        }
        camera.lookAt(mainCarmodel.position);

        let p =  new Point(roadblock.position.x, roadblock.position.z);
        let r = 3;
        let p2 = new Point(mainCarmodel.position.x, mainCarmodel.position.z);
        let p3 = new Point(0,0);
        p3.x = mainCarmodel.position.x - Math.sin(mainCarmodel.rotation.y) * 150;
        p3.y = mainCarmodel.position.z -Math.cos(mainCarmodel.rotation.y) * 150;

        pointSehpare.position.x =  p3.x;
        pointSehpare.position.z =  p3.y;

        let distance = getDistance(mainCarmodel, roadblock);
        if (distance < 80) {
            
            let result = circlelineintersection(p,r,p2,p3)
            if (result.length > 0)
                collisionWarning = true
            else 
                collisionWarning = false;
        }
        else
            collisionWarning = false;
        
        if (collisionWarning && accel > 0.0)
            accel *=0.96;

        if (accel > 40)
            accel = 40;

        if (accel < -20)
            accel = -20;

        mainBounding.matrix.makeRotationFromQuaternion(mainCarmodel.quaternion);
        mainBounding.matrix.setPosition(mainCarmodel.position);        
    }
}

function getDistance(src,dst) {
    let x = src.position.x - dst.position.x;
    let z = src.position.z - dst.position.z;
    return Math.sqrt(Math.pow(x,2) + Math.pow(z,2));
}

function toggleCameraThree() {
    followCamera = !followCamera;

    if (followCamera == false) {
        resetCamera();
    }
}

function resetPositionThree() {
    accel = 0;
    collisionWarning = false;
    rotationVelo = 0;
    mainCarmodel.position.x = 0;
    mainCarmodel.position.y= 0;
    mainCarmodel.position.z=0;
    mainCarmodel.rotation.y = 0;
}

function animate(time) {
    
    requestAnimationFrame( animate );
    
    // if (loading)
    //     return
    update(clock.getDelta());

    // if (animations.length){
        
    //     var result = animations[0](time)
    //     if (result== undefined){
    //         animations.length = 0;
    //         camera.rotation.x = toRadian(-90);
    //         camera.rotation.y = toRadian(90);
    //         camera.rotation.z = toRadian(90);
    //     }
    //     else {
    //         camera.position.x = animations[0](time);
    //         camera.position.y = animations[1](time);
    //         camera.position.z = animations[2](time);
    //         camera.lookAt(scene.position);
    //     }
    // }
    // if (enableInner == false) {
    //     controls.update();
    // }
    stats.update();
    renderer.render( scene, camera );
}

function StopWatch(dur, start, to){
    var currentTime = 0;
    var range = to-start;
    var lastTime =+Date.now()/1000;
    return function(time){
        time = +Date.now()/1000;
        var delayTime =time- lastTime;
        currentTime = currentTime+ delayTime;
        if (dur < currentTime) return undefined;
         
        var radtio = currentTime/dur;
        lastTime = time;
        return start + range * radtio;
    }
}

function onMouseMove(event){
    
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // innerview 일때만
    if (controls.enable == false && press ){
        var velocityX = event.offsetX - offsetX;
        var velocityY = event.offsetY - offsetY;
        
        camera.rotateOnAxis(new THREE.Vector3(0,1,0), toRadian(velocityX/5));

        offsetX = event.offsetX;
        offsetY = event.offsetY;
    }
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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var vueApp = new Vue({
    el : "#wrap",
    data: function() {
        return {
            load : false,
            bodyColor : 0x4b0300,
            statusView : "Inner View",
            statusRotate : "Stop",
            progressValue : 0,
            renderer : renderer,
            tonemappings : [
                { text: "NoToneMapping", value:THREE.NoToneMapping },
				{ text: "LinearToneMapping", value:THREE.LinearToneMapping },
				{ text: "ReinhardToneMappiong", value:THREE.ReinhardToneMapping },
				{ text: "Uncarted2 " , value : THREE.Uncharted2ToneMapping },
                { text: "Cineon", value : THREE.CineonToneMapping }
            ],
            selectmapping :undefined,
        }
    },
    computed :{
        progressText() {
            return this.progressValue.toFixed(0);
        }
        
    },
    methods : {
        
        changedTonemapping1() {
            renderer.toneMapping = this.selectmapping;
            bodyMaterial.needsUpdate = true;
            console.log("changedTonemapping" , this.tonemappings[this.selectmapping]);
            
        },
        // MATERIALS
        onProgress  ( xhr) {
            if ( xhr.lengthComputable) {
                var percentComplate = xhr.loaded / xhr.total * 100;
                this.progressValue = percentComplate;
                if (percentComplate == 100) {
                    setTimeout(function() {
                        vueApp.loadFinish();
                    }, 1000)
                }
            }
        },

        loadFinish(){
            this.load = true;
        },
        colorChange  (event) {
            bodyMaterial.color = new THREE.Color(this.bodyColor);

        },
    
        toggleRotate(){    
            controls.autoRotate = !controls.autoRotate;
            this.statusRotate =  controls.autoRotate ?   "Stop" : "Rotate";
        },
    
        toggleinner(){
            this.statusView =  toggleView() ? "Out View" : "Inner View";
        },

        toggleCamera() {
            toggleCameraThree();            
        },

        resetPosition() {
            resetPositionThree();
        }
    }
})
