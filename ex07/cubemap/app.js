var sacne , camera , renderer, labelRX, labelRY;
var mainModel, bodyMaterial, raycaster, cursor , interiorMaterial, shadow , theta=0 ,controls
var radius =15, theta = 0;
var  hemisphereLight, ambientLight, pointLight, directLight, rectLight;
var mouse = new THREE.Vector2(), INTERSECTED;
var rightDoor = {name:"Mesh74_032Gruppe_12_1_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var leftDoor = {name:"Mesh204_032Gruppe_12_2_032Group1_032Lamborghini_Aventador1_032Model", opened:false};
var doorModels = [rightDoor, leftDoor];

init();
animate();

function init() {
    var container = document.getElementById('container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    renderer = new THREE.WebGLRenderer({antialias:false});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 6;
    camera.position.y = 2;
    camera.position.x = -6;

    camera.rotation.x = -0.329;
    camera.rotation.y = -0.75;
    camera.rotation.z = -0.23;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = toRadian(80);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    document.addEventListener("mousemove", onMouseMove);

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
}

function createModels() {

    var path = "../../res/textures/cube/reflectIndoor/";
    var urls = [
        path + "px.jpg", path + "nx.jpg",
        path + "py.jpg", path + "ny.jpg",
        path + "pz.jpg", path + "nz.jpg"
    ];

    textureCube = new THREE.CubeTextureLoader().load( urls );
    
    //renderer.background = textureCube;
    // MATERIALS
    var onProgress = function ( xhr) {
        if ( xhr.lengthComputable) {
            var percentComplate = xhr.loaded / xhr.total * 100;
            console.log(percentComplate)
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
                    
                    if (child.material) {
                        if ( child.material.name === "Body") {
                            if (bodyMaterial == undefined)
                            {
                                bodyMaterial = child.material;
                                bodyMaterial.envMap = textureCube;
                                bodyMaterial.reflectivity = 0.3;
                                bodyMaterial.emissive = new THREE.Color(0.1,0.1,0.1);
                            }
                            child.material = bodyMaterial;
                        } else if (child.material.name == "interior"){
                            if (interiorMaterial == undefined)
                            {
                                interiorMaterial = new THREE.MeshLambertMaterial({color:0x333333});
                            }
                            child.material =interiorMaterial;
                        } else if (child.material.name == "Glass"){
                            child.material.color = new THREE.Color(0.3,0.3,0.3);
                            child.material.envMap = textureCube;
                            child.material.reflectivity = 1;
                            child.material.opacity = 0.5;
                        }
                    }
                });
                setupGui();
                mainModel = object;                
                scene.add( object );
                shadow.visible = true;
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
            }, onProgress, onError );
    } );
    
    // // create ground
    // var groundTexture =  new THREE.TextureLoader().load("../res/crocodile--skin-texture.jpg");
    // var groundGeo = new THREE.PlaneBufferGeometry( 50, 50 );
    // var groundMat = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    // // groundMat.map = groundTexture;
    // // groundMat.color.setHSL( 0.095, 0.095, 0.095 );
    // var ground = new THREE.Mesh( groundGeo, groundMat );
    // ground.rotation.x = -Math.PI/2;
    // ground.position.y = 0;
    // scene.add(ground);


    var shadowTexture =  new THREE.TextureLoader().load("../res/car_shadow.png");
    var shadowGeometry = new THREE.PlaneBufferGeometry( 7, 4 );
    var shadowMet = new THREE.MeshBasicMaterial( { color: 0xffffff , map: shadowTexture} );
    shadow = new THREE.Mesh( shadowGeometry, shadowMet );
    shadow.rotation.x = -Math.PI/2;
    shadow.position.y = 0.01;
    shadow.visible = false;
    scene.add(shadow);

    // // create dome
    // var domeMaterial = new THREE.MeshBasicMaterial( { color:0xffffff ,side: THREE.DoubleSide } );
    // var dome = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), domeMaterial );
    // scene.add( dome );

    cursor = new THREE.Mesh( new THREE.SphereBufferGeometry( 0.02, 20, 10 ), new THREE.MeshBasicMaterial({color:0xdddddd}) );
    cursor.position.set( 0, 0, 0 );
    scene.add( cursor );

}

function createLight(){
    hemisphereLight = new THREE.HemisphereLight( 0x111111, 0x666655 )     
    ambientLight = new THREE.AmbientLight( 0x333333,0.6 );
    pointLight = new THREE.PointLight( 0xeeeeee, 1);
    directLight = new THREE.DirectionalLight(0xffffff, 1);

    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = -5;
    pointLight.position.y = 5;
    pointLight.position.z = -5;
    camera.add(directLight);
    scene.add(hemisphereLight);
    // scene.add(pointLight);
    camera.add(directLight);
    scene.add( ambientLight );
    
    
    // var p = new THREE.DirectionalLightHelper( directLight);
    // // p.position.y = 0.5;
    // scene.add(p);

    
    // rectLight = new THREE.RectAreaLight( 0x333333, 0.5,20, 20 );
    // rectLight.intensity = 2;
    // rectLight.position.set( 4, 6, 0 );
    // rectLight.rotation.x = toRadian(90);
    // scene.add( rectLight );
    

    // var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
    // rectLightMesh.scale.x = rectLight.width;
    // rectLightMesh.scale.y = rectLight.height;
    // rectLight.add( rectLightMesh );

    // var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
    // rectLightMeshBack.rotation.y = Math.PI;
    // rectLightMesh.add( rectLightMeshBack );

}

// function setupGui() {
//     var h;
//     var gui = new dat.GUI();
//     h = gui.addFolder( "Light control" );
//     // var API = { ...bodyMaterial}
//     // console.log("API",API)
//     // x = {
//     //     [THREE.Color]: function(API,proprety){
//     //         // API[proprety] = API[proprety].getHexString();
//     //         return {
//     //             set [proprety](value) {
//     //                 //gui = new dat.GUI()
//     //                 console.log("set:",value);
//     //             },
//     //             get [proprety](){
//     //                 return API[proprety].getHexString();
//     //             }
//     //         }
//     //     }

//     // }
//     // keys.forEach(e=>{
//     //     // console.log(e,API[e]);
//     //     if (API[e] &&  x[API[e].constructor]){
//     //         // = x[API[e].constructor](API,e)
//     //         API = {
//     //             ...API,
//     //             ...x[API[e].constructor](API,e)
//     //         }
//     //     }
//     //     // else {
//     //     //     return e;
//     //     // }
//     // });
//     // console.log(API);
//     var API = {
//         get color(){
//             return bodyMaterial.color.getHexString();
//         },
//         set color(value){
//             console.log(new THREE.Color(parseInt("0x"+value)))
//             return bodyMaterial.color.set(0xff0000);
//         }
//     }
//     console.log(API);
//     var keys = Object.keys(API);
//     keys.forEach(e=>{
//         try {
//             //  console.log(API[e].constructor);
//             // if (API[e].constructor == THREE.Color) {
//             //     API[e] = API[e].getHexString();
//             //     // h.add(API,e);// = API[e].getHex();//
//             // }
//             console.log(e);
//             h.add(API,e).onChange(()=>{ bodyMaterial[e] = API[e]; });
//         }
//         catch(ex) { console.log(ex,e) }
//     });
//     // h.add( API, 'metalness',0.0, 1.00, 0.1).onChange(()=>{
//     //     bodyMaterial.metalness = API.metalness;
//     // })
    
// }

function setupGui(){
    var h;
    //hemisphereLight, ambientLight, pointLight, directLight, rectLight;
    var gui = new dat.GUI();
    h = gui.addFolder("Light");
    var controls = [
        {name:"hemisphere", obj:hemisphereLight},
        {name:"ambient", obj:ambientLight},
        {name:"point", obj:pointLight},
        {name:"direct", obj:directLight},
        // {name:"rect", obj:rectLight},
    ]
    controls.forEach(e=>{
        var hx=h.addFolder(e.name);
        addTree(hx,e.obj,0);
    })

    var hx = gui.addFolder("body")
    addTree(hx,bodyMaterial,0);
    // h = gui.addFolder();
    // //h.add(directLight)
    // var keys = Object.keys(directLight);
    // keys.forEach(e=>{
    //     //if (directLight[e])//
    //     try {
    //         if (typeof(directLight[e]) == "object")
    //             h.addFolder(e);
    //         h.add(directLight,e);//.onChange(()=>{ directLight[e] = API[e]; });
    //     }
    //     catch(ex) {}
    // });
}

function addTree(gui,obj, depth){
    depth++;
    if (depth > 2)
        return;
    
    var keys = Object.keys(obj);
    keys.forEach(e=>{
        //if (directLight[e])//
        try {
            if (typeof(obj[e]) == "object"){
        
                //h.addFolder(e);
                h = gui.addFolder(e);
                addTree(h,obj[e],depth);
            }else {
                gui.add(obj,e);//.onChange(()=>{ directLight[e] = API[e]; });
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


function onMouseMove(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseClick(event) {
    raycaster.setFromCamera( mouse, camera );
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
                // console.log(intersects[ 0 ].point)
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
    controls.update();
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

    renderer.render( scene, camera );
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
        return range * radtio;
    }
}
