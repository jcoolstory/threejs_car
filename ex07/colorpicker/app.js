var sacne , camera , renderer, labelRX, labelRY;
var mainModel, bodyMaterial
var radius = 5, theta = 0;
init();
animate();

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 3;
    camera.position.y = 2;
    camera.position.x = 3;
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = toRadian(80);
    labelRX = document.getElementById("rotateX"); 
    labelRY = document.getElementById("rotateY");

    scene.add( camera );

    createModels();
    createLight();
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
            console.log(percentComplate)
        }
    };

    var onError = function (xhr ) {
    };    
    var x = new THREE.MeshPhongMaterial();
    
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
                                bodyMaterial =  new THREE.MeshStandardMaterial( { color: child.material.color, roughness: 0, metalness: 0 } );
                                bodyMaterial.copy(child.material);
                           }
                        child.material =bodyMaterial;
                       }
                    }
                });

                mainModel = object;                
                scene.add( object );
                var box = new THREE.BoxHelper( object, 0xffff00 );
                box.geometry.computeBoundingBox();
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
    
    // create ground
    var groundTexture =  new THREE.TextureLoader().load("../res/crocodile--skin-texture.jpg");
    var groundGeo = new THREE.PlaneBufferGeometry( 50, 50 );
    var groundMat = new THREE.MeshBasicMaterial( { color: 0x111111 } );
    groundMat.map = groundTexture;
    // groundMat.color.setHSL( 0.095, 0.095, 0.095 );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);

    // create dome
    var domeMaterial = new THREE.MeshBasicMaterial( { color:0x333333 ,side: THREE.DoubleSide } );
    var dome = new THREE.Mesh( new THREE.SphereBufferGeometry( 20, 20, 10 ), domeMaterial );
    scene.add( dome );

}

function createLight(){
    
    var ambientLight = new THREE.AmbientLight( 0xffffff,0.5 );
    var pointLight = new THREE.PointLight( 0xffffff, 0.3);
    var directLight = new THREE.DirectionalLight(0xfffffff,1);
    directLight.position.x = 5;
    directLight.position.y = 10;
    directLight.position.z = 7.5;
    
    pointLight.position.x = 5;
    pointLight.position.y = 5;
    pointLight.position.z = 5;
    scene.add(directLight);
    // scene.add( pointLight ) ;
    scene.add( ambientLight );
    
    for (let i= 0 ; i < 8 ; i++)
    {
        let rectLight = new THREE.RectAreaLight( 0xffffff, 1,0.5, 40 );
        rectLight.intensity = 4;
        rectLight.position.set( 20-i*4, 3, 0 );
        rectLight.rotation.x = toRadian(90);
        scene.add( rectLight );
    }

    // var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
    // rectLightMesh.scale.x = rectLight.width;
    // rectLightMesh.scale.y = rectLight.height;
    // rectLight.add( rectLightMesh );

    // var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
    // rectLightMeshBack.rotation.y = Math.PI;
    // rectLightMesh.add( rectLightMeshBack );

}
function colorChange  (event) {
    console.log("colorChange",event.value,new THREE.Color(event.value));
    bodyMaterial.color = new THREE.Color(event.value);
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}
function animate(time) {
    requestAnimationFrame( animate );
    
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
        return range * radtio;
    }
}
