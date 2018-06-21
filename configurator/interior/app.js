var scene , camera , renderer;
var controls;
var textureCubeBlur ;
var mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

function init() {
    var container = document.getElementById('container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    renderer = new THREE.WebGLRenderer({antialias:false});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = -0.1;
    camera.position.y = 0;
    camera.position.x = 0;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    scene.add( camera );

    createModels();    
}

function createModels() {

    var path = "../../res/textures/cube/interior/";
    var urls = [
        path + "px.jpg", path + "nx.jpg",
        path + "py.jpg", path + "ny.jpg",
        path + "pz.jpg", path + "nz.jpg"
    ];

    var textureCube = new THREE.CubeTextureLoader().load( urls );
    scene.background = textureCube;
}

function toRadian(degree) {
    return degree * Math.PI / 180 
}

function animate(time) {

    requestAnimationFrame( animate );
    controls.update();

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
