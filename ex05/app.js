var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var controls = new THREE.OrbitControls( camera, renderer.domElement );

camera.position.z = 10;

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total) {
    console.log( item, loaded, total);
}

var onProgress = function ( xhr) {
    if ( xhr.lengthComputable) {
        var percentComplate = xhr.loaded / xhr.total * 100;
        console.log(percentComplate)
    }
};

var onError = function (xhr ) {
};

var texture = new THREE.TextureLoader(manager).load( 'res/skin00/0000.BMP' );
var loader = new THREE.OBJLoader(manager);
var materialColor = new THREE.Color(1,1,1);
var texturedMaterial =new THREE.MeshPhongMaterial( { color: materialColor, flatShading:false, side: THREE.DoubleSide } )
//var texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor,wireframe: true , map: texture, side: THREE.DoubleSide } );
//var texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor,wireframe: true } );
texturedMaterial.shininess = 40;
texturedMaterial.specular = new THREE.Color(1,1,1);
texturedMaterial.map = texture;

loader.load('res/Porsche_911_GT2.obj', function (obj){
    obj.traverse ( function ( child ) { 
        if ( child instanceof THREE.Mesh) {
            
            child.material = texturedMaterial;
        }
    });

    obj.position.y = 0;
    obj.rotateX(1);
    scene.add( obj );
}, onProgress, onError);

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( ambientLight );



scene.add( camera );
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var labelRX = document.getElementById("rotateX"); 
var labelRY = document.getElementById("rotateY");

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function animate(time) {
    requestAnimationFrame( animate );
    
    labelRX.innerHTML = camera.rotation.x.toFixed(3);
    labelRY.innerHTML = camera.rotation.y.toFixed(3);
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
animate();
