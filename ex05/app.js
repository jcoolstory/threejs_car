var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
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
var texture = new THREE.TextureLoader().load( '../image/dice-texture.jpg' );
var loader = new THREE.OBJLoader(manager);
loader.load('res/Porsche_911_GT2.obj', function (obj){
    obj.traverse ( function ( child ) { 
        if ( child instanceof THREE.Mesh) {
           // child.material.color= 0xffffff;
            //child.material
           // console.log(child)
            child.material.map = texture;
        }
    });

   // obj.position.y = -95;
   // scene.add( obj );
    console.log(obj)
}, onProgress, onError);

var geometry = new THREE.CubeGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

scene.add(cube)

function toRadian(degree) {
    return degree * Math.PI / 180 
}
var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.z = 10;
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
var labelRX = document.getElementById("rotateX"); 
var labelRY = document.getElementById("rotateY");
function animate(time) {
    requestAnimationFrame( animate );
    
    //labelRX.innerHTML = cube.rotation.x;
    //labelRY.innerHTML = cube.rotation.y;
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
