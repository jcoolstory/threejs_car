var width = window.innerWidth;
var height = window.innerHeight;


var renderer;
var scene;
var camera;
var controls;
var cube;
var sphere;
var torus;
var material;

var count =0;
var cubeCamera_1;
var cubeCamera_2;

var lon = 0, lat = 0;
var phi = 0, theta = 0;

init();
animate();

function toRadian(degree) {
    return degree * Math.PI / 180 
}

//quaternion(쿼터니언)
//euler(오일러) gimbal lock(짐벌락) 기본이 짐벌락 http://hoodymong.tistory.com/3
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000);
    camera.position.z = 100;
    
    console.log(camera);

    var loader = new THREE.TextureLoader();
    var texture = loader.load('./texture.jpg');
    texture.mapping = THREE.UVMapping;

    renderer = new THREE.WebGLRenderer();
    renderer.antialias = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    cubeCamera_1 = new THREE.CubeCamera(1, 1000, 256);
    cubeCamera_1.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add(cubeCamera_1);

    cubeCamera_2 = new THREE.CubeCamera(1, 1000, 256);
    cubeCamera_2.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    scene.add(cubeCamera_2);

    document.body.appendChild(renderer.domElement);

    //quaternion
    const quaternion = new THREE.Quaternion();
    const axisNormalised = new THREE.Vector3(0, 1, 0).normalize();
    const angle = Math.PI / 4;
    quaternion.setFromAxisAngle(axisNormalised, angle);

    const beforeVector = new THREE.Vector3(1, 0, 0);

    const afterVector = beforeVector.clone();
    afterVector.applyQuaternion(quaternion);

    var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(500, 32, 16), new THREE.MeshBasicMaterial({map:texture}));
    mesh.quaternion.copy(quaternion);//quaternion
    mesh.geometry.scale(-1, 1, 1);
    scene.add(mesh);

    material = new THREE.MeshBasicMaterial();
    material.envMap = cubeCamera_2.renderTarget.texture;

    sphere = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(20, 3), material);
    scene.add(sphere);

    cube = new THREE.Mesh(new THREE.BoxBufferGeometry(20, 20, 20), material);
    scene.add(cube);

    torus = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(10, 5, 100, 25), material);
    scene.add(torus);

    //quaternion
    const beforeArrow = new THREE.ArrowHelper(
        beforeVector.clone().normalize(),
        origin,
        beforeVector.length(),
        0xffff00,
    );
    scene.add(beforeArrow);

    const afterArrow = new THREE.ArrowHelper(
        afterVector.clone().normalize(),
        origin,
        afterVector.length() * 2,
        0xffffff,
    );
    scene.add(afterArrow);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'wheel', onDocumentMouseWheel, false );
    // window.addEventListener( 'resize', onWindowResized, false );
}



function onWindowResized( event ) {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
function onDocumentMouseDown( event ) {
    event.preventDefault();
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
}
function onDocumentMouseMove( event ) {
    lon = ( event.clientX - onPointerDownPointerX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
}
function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
}
function onDocumentMouseWheel( event ) {
    var fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.Math.clamp( fov, 10, 75 );
    camera.updateProjectionMatrix();
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    var time = Date.now();
    lon += .15;
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );
    cube.position.x = Math.cos( time * 0.001 ) * 30;
    cube.position.y = Math.sin( time * 0.001 ) * 30;
    cube.position.z = Math.sin( time * 0.001 ) * 30;
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.03;
    torus.position.x = Math.cos( time * 0.001 + 10 ) * 30;
    torus.position.y = Math.sin( time * 0.001 + 10 ) * 30;
    torus.position.z = Math.sin( time * 0.001 + 10 ) * 30;
    torus.rotation.x += 0.02;
    torus.rotation.y += 0.03;

    sphere.visible = false;
    // pingpong
    if ( count % 2 === 0 ) {
        material.envMap = cubeCamera_1.renderTarget.texture;
        cubeCamera_2.update( renderer, scene );
    } else {
        material.envMap = cubeCamera_2.renderTarget.texture;
        cubeCamera_1.update( renderer, scene );
    }
    count ++;
    sphere.visible = true;

    renderer.render(scene, camera);
}