// controller
var scene, camera , renderer, offsetX ,offsetY, manager, mainCarmodel,
    animations = [],roadblock , collisionWarning = false, followCamera = false;
    accel = 0 , rotationVelo = 0 ;
    pointSehpare = undefined;
    mouse = new THREE.Vector2();
    
    

// materials
var bodyMaterial, interiorMaterial, glassMaterial, shadow , controls,envCubemap ,envCubemapBlur

// flags
var enableInner = false , press = false , loading = true ;

init();
animate();

function resetCamera(){
    camera.position.z = -200;
    camera.position.y = 200;
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
    
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 2000 );
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
}

function onKeyPress(evt) {
    // console.log("onKeyPress : " ,evt.key, ":", evt.keyCode)
    if (evt.key === 'w')
    {
        if (collisionWarning == false)
            accel += 0.1;
    }
    else if (evt.key === "s")
        accel -= 0.1;
    else if (evt.key === "a") 
        rotationVelo += 0.005;
    else if (evt.key === "d")
        rotationVelo -= 0.005;

}

function onKeyDown(evt) {
    // console.log("onKeyDown : " ,evt.key , ":", evt.keyCode)
}

function onKeyUp(evt) {
    // console.log("onKeyUp : " ,evt.key, ":", evt.keyCode)
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
    
    roadblock.position.z = -1000;
    scene.add( roadblock );

    var geometrySe = new THREE.SphereBufferGeometry(1,10,10);
    var materialSe = new THREE.MeshBasicMaterial({color:0xff0000});

    pointSehpare = new THREE.Mesh(geometrySe, materialSe);
    scene.add(pointSehpare);
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
    .setPath( '../res/i30/' )
    .load( 'i30-1.mtl', function ( materials ) {
        
        materials.preload();
        console.log(materials);
        carTraverse(materials.materials);
        new THREE.OBJLoader(manager)
            .setMaterials( materials )
            .setPath( '../res/i30/' )            
            .load( 'i30-1.obj', function ( object ) {
                // object.traverse(carTraverse);
                mainCarmodel = object;
                scene.add( object );
                shadow.visible = true;
            }, vueApp.onProgress, onError );
    } );
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
    var domTexture =   new THREE.TextureLoader().load("../../res/textures/ground/pattern.png");
    domTexture.wrapS = THREE.RepeatWrapping;
    domTexture.wrapT = THREE.RepeatWrapping;
    domTexture.repeat.set( 4, 4 );
    var domeMaterial = new THREE.MeshBasicMaterial( { color:0xffffff , side: THREE.BackSide } );
    domeMaterial.envMap = textureCubeBlur;
    domeMaterial.reflectivity = 1;

    var dome = new THREE.Mesh( new THREE.CylinderBufferGeometry( 150, 150, 20,32 ), domeMaterial );
    // dome.position.y = 10;
    // scene.add( dome );

    ///
    /// showroomt을 white color 변경시 필요없음
    /// 
    // // create ground    
    var groundTexture =  new THREE.TextureLoader().load("../../res/textures/ground/b_liftue.png");
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 40, 40 );
    var groundGeo = new THREE.PlaneGeometry( 4000, 4000,1,1 );
    var groundMat = new THREE.MeshLambertMaterial({ color:0xeeeeee, shininess:0, map: groundTexture});

    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);
    // scene.fog = new THREE.Fog( 0xaaaaaa, 50, 100 );

    var helper = new THREE.GridHelper( 5000, 50 );
    helper.material.transparent = false;
    scene.add(helper);
}


function createLight(){
    
    var hemisphereLight = new THREE.HemisphereLight( 0x111111, 0xffffff )     
    var ambientLight = new THREE.AmbientLight( 0xffffff,0.6 );
    var pointLight = new THREE.PointLight( 0xeeeeee, 1);
    var directLight = new THREE.DirectionalLight(0xffffff, 0.8);

    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = 0;
    pointLight.position.y = 15;
    pointLight.position.z = 0;
    // camera.add(directLight);
    scene.add(hemisphereLight);
    //scene.add(pointLight);
    
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

function update(time){
    if (mainCarmodel) {
        let current = -( Math.abs(accel) > 0.01 ? accel : 0);
        //mainCarmodel.position.z += current;
        if (rotationVelo > 0.05)
            rotationVelo = 0.05;
        if ( Math.abs(current) > 0.0)
            mainCarmodel.rotation.y += rotationVelo;
        let x = Math.sin(mainCarmodel.rotation.y) * current;
        let z = Math.cos(mainCarmodel.rotation.y) * current;

        mainCarmodel.position.x += x;
        mainCarmodel.position.z += z;
        
        // console.log(toDegree(mainCarmodel.rotation.y));
        if (accel > 0.001)
            accel -= 0.001;

        if ( Math.abs(rotationVelo) > 0.001)
            rotationVelo *= 0.95;
        else
            rotationVelo = 0;
        // controls.update();

        x = Math.sin(mainCarmodel.rotation.y) * 55;
        z = Math.cos(mainCarmodel.rotation.y) * 55;

        if (followCamera) {
            camera.position.x = mainCarmodel.position.x  +x;
            camera.position.y = mainCarmodel.position.y  +15;
            camera.position.z = mainCarmodel.position.z  + z;
        }
        camera.lookAt(mainCarmodel.position);

        
       
        
        let p =  new Point(roadblock.position.x, roadblock.position.z);
            let r = 10;
            let p2 = new Point(mainCarmodel.position.x, mainCarmodel.position.z);
            let p3 = new Point(0,0);
            p3.x = mainCarmodel.position.x - Math.sin(mainCarmodel.rotation.y) * 150;
            p3.y = mainCarmodel.position.z -Math.cos(mainCarmodel.rotation.y) * 150;
    
            pointSehpare.position.x =  p3.x;
            pointSehpare.position.z =  p3.y;

        let distance = getDistance(mainCarmodel, roadblock);
        if (distance < 150) {
            
            let result = circlelineintersection(p,r,p2,p3)
            if (result.length > 0)
                collisionWarning = true
            else 
                collisionWarning = false;
            // if (collisionWarning)
         //       console.log(result);
        }
            
        else
            collisionWarning = false;
        
        if (collisionWarning && accel > 0.0)
            accel *=0.96;

        if (accel > 4)
            accel = 4;

 
        
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
    update(time);

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
console.log(renderer);

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
