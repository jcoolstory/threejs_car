var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var texture = new THREE.TextureLoader().load( '../image/dice-texture.jpg' );
var material = new THREE.MeshBasicMaterial( { map: texture } );
var geometry = new THREE.CubeGeometry( 1, 1, 1 );
geometry.uvsNeedUpdate = true;
const cellwidth = 1/2;
const cellheight = 1/3;
let face = [[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]
face.forEach((el, i)=>
{
    var j = i * 2;
    geometry.faceVertexUvs[0][j][0]=new THREE.Vector2(el[0] * cellwidth + 0,  el[1] * cellheight + cellheight);
    geometry.faceVertexUvs[0][j][1] =new THREE.Vector2(el[0] * cellwidth + 0, el[1] * cellheight + 0);
    geometry.faceVertexUvs[0][j][2] = new THREE.Vector2(el[0] * cellwidth + cellwidth, el[1] * cellheight +cellheight);

    geometry.faceVertexUvs[0][j+1][0]=new THREE.Vector2(el[0] * cellwidth + 0,  el[1] * cellheight + 0);
    geometry.faceVertexUvs[0][j+1][1] =new THREE.Vector2(el[0] * cellwidth + cellwidth,  el[1] * cellheight + 0);
    geometry.faceVertexUvs[0][j+1][2] = new THREE.Vector2(el[0] * cellwidth + cellwidth,  el[1] * cellheight + cellheight);
});


function toRadian(degree) {
    return degree * Math.PI / 180 
}
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.z = 5;
cube.rotation.x = toRadian(90);
var labelRX = document.getElementById("rotateX"); 
var labelRY = document.getElementById("rotateY");
var tickX = StopWatch(2,0, toRadian(90));
var tickY =  StopWatch(2,0, toRadian(360));
function animate(time) {
    requestAnimationFrame( animate );
    
    if (tickX) {
        let tickXValue = tickX(time);
        if (tickXValue === undefined) {tickX = undefined;}
        else cube.rotation.x = tickXValue;
    }
    
    if (tickY) {
        let tickYValue = tickY(time);
        if (tickYValue === undefined) {tickY =undefined; }
        else cube.rotation.y =tickYValue;;
    }
    
    labelRX.innerHTML = cube.rotation.x;
    labelRY.innerHTML = cube.rotation.y;
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