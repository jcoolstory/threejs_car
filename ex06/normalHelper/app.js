var sacne , camera , renderer, labelRX, labelRY;

init();
animate();

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 10;
    camera.position.y = 10;
    camera.position.x = 10;
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    labelRX = document.getElementById("rotateX"); 
    labelRY = document.getElementById("rotateY");

    scene.add( camera );

    createModels();
}

function createModels() {

    var geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var box = new THREE.Mesh( geometry, material );

    var helper = new THREE.VertexNormalsHelper( box, 2, 0x00ff00, 1 );
    
    scene.add( box );
    scene.add( helper );
}

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
