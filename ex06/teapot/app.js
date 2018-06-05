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
                
    var geometry = new THREE.TeapotBufferGeometry(5,12,5,5,5,5,5);
    //var material = new THREE.MeshBasicMaterial({color:materialColor});
    var material = new THREE.MeshPhongMaterial( { color: materialColor, envMap: textureCube, side: THREE.DoubleSide } );
    var teapot = new THREE.Mesh( geometry, material );

    //var helper = new THREE.VertexNormalsHelper( box, 2, 0x00ff00, 1 );
    
    scene.add( teapot );
    scene.background = textureCube;
    //scene.add( helper );
}

function createLight(){
    
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( ambientLight );
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
