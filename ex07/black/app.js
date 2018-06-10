var sacne , camera , renderer, labelRX, labelRY;

init();
animate();

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    camera.position.y = 5;
    camera.position.x = 5;
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

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
    var materialColor = new THREE.Color(1,1,1);                
    //var material = new THREE.MeshPhongMaterial( { color: materialColor, envMap: textureCube, side: THREE.DoubleSide } );
    
    
    var onProgress = function ( xhr) {
        if ( xhr.lengthComputable) {
            var percentComplate = xhr.loaded / xhr.total * 100;
            console.log(percentComplate)
        }
    };

    var onError = function (xhr ) {
    };    
    var x = new THREE.MeshPhongMaterial();
    // x.envMap
    new THREE.MTLLoader()   
    .setPath( '../res/Aventador/' )
    .load( 'Avent.mtl', function ( materials ) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials( materials )
            .setPath( '../res/Aventador/' )
            .load( 'Avent.obj', function ( object ) {
                //object.position.y = - 95;
                object.traverse ( function ( child ) { 
                    
                    // console.log(child.material);
                    // if (child.material)
                    // {
                    //     child.material.shininess =400;
                    //     //child.material.shininess = 40;
                    //     child.material.specular = new THREE.Color(0.3,0.3,0.3);
                    //     child.material.envMap = textureCube;
                    // }
                });
                // object.scale.x = 0.01;
                // object.scale.y = 0.01;
                // object.scale.z = 0.01;
                console.log(object)
                scene.add( object );
                var box = new THREE.BoxHelper( object, 0xffff00 );
                box.geometry.computeBoundingBox();
                
                console.log(box);
            }, onProgress, onError );
    } );
                    
    // scene.background = textureCube;
    // var helper = new THREE.GridHelper( 500, 50 );
    // helper.material.transparent = false;
    // scene.add(helper);
    var groundGeo = new THREE.PlaneBufferGeometry( 50, 50 );
    var groundMat = new THREE.MeshBasicMaterial( { color: 0x111111 } );
    // groundMat.color.setHSL( 0.095, 0.095, 0.095 );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = 0;
    scene.add(ground);
}

function createLight(){
    
    var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    var pointLight = new THREE.PointLight( 0xffffff, 0.3);
    var directLight = new THREE.DirectionalLight(0xfffffff,1);
    directLight.position.x = 5;
    directLight.position.y = 10;
    directLight.position.z = 7.5;
    
    pointLight.position.x = 5;
    pointLight.position.y = 5;
    pointLight.position.z = 5;
    scene.add(directLight);
    scene.add( pointLight );
    scene.add( ambientLight );
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function animate(time) {
    requestAnimationFrame( animate );
    
    // labelRX.innerHTML = camera.rotation.x.toFixed(3);
    // labelRY.innerHTML = camera.rotation.y.toFixed(3);
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
