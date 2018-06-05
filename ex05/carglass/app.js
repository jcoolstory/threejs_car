var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
var doorleft = undefined,
    doorright = undefined;
var ignoreList = ["part 003"]
var tier = ["part 028", "part 025" , "part 026", "part 027"]
var tierMesh = [];
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
var path = "../../res/textures/cube/skybox2/";
var urls = [
    path + "px.jpg", path + "nx.jpg",
    path + "py.jpg", path + "ny.jpg",
    path + "pz.jpg", path + "nz.jpg"
];

textureCube = new THREE.CubeTextureLoader().load( urls );
var texture = new THREE.TextureLoader(manager).load( '../res/skin00/0000.BMP' );
var loader = new THREE.OBJLoader(manager);
var materialColor = new THREE.Color(1,1,1);
var texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor,envMap: textureCube, flatShading:false , side: THREE.FrontSide} )
var tierMaterial =  new THREE.MeshPhongMaterial( { color: new THREE.Color(0.1,0.1,0.1), flatShading:false, side: THREE.FrontSide } )
var glassMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color(0.4,0.4,0.5), flatShading:false, side: THREE.FrontSide } )

glassMaterial.shininess = 80;
glassMaterial.specular = new THREE.Color(1,1,1);
glassMaterial.opacity = 0.2;
glassMaterial.transparent = true;
texturedMaterial.shininess = 40;
texturedMaterial.specular = new THREE.Color(1,1,1);
texturedMaterial.map = texture;

loader.load('../res/Porsche_911_GT2.obj', function (obj){
    obj.traverse ( function ( child ) { 
        if ( child instanceof THREE.Mesh) {
            
            child.material = texturedMaterial;
            if (child.name == "part 012")
                doorleft = child;
            if (child.name == "part 033")
                doorright = child;
            if (tier.includes(child.name) )
            {
                child.material = tierMaterial;
                tierMesh.push(child);
            }
            if (ignoreList.includes(child.name))
            {
                child.material = glassMaterial;
            }
        }
    });
    scene.add( obj );
}, onProgress, onError);

var helper = new THREE.GridHelper( 1000, 100 );
helper.position.y = - 0;
helper.material.opacity = 0.25;
helper.material.transparent = false;
scene.add(helper);

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
var light = new THREE.AmbientLight( 0x404040 ); // soft white light

camera.add( pointLight );
scene.add( ambientLight );
scene.add( camera );
scene.add( light );
scene.background = textureCube;
var labelRX = document.getElementById("rotateX"); 
var labelRY = document.getElementById("rotateY");
function toRadian(degree) {
    return degree * Math.PI / 180 
}

function animate(time) {
    requestAnimationFrame( animate );
    tierMesh.forEach(f=>{
        //f.rotation += toRadian(1);
        
    })
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
animate();