var container;
var camera;
var scene;
var renderer;
var width, height;
var manager;
var objLoader, mtlLoader, txtureLoader;
var stats;
var filePath = "./res";

var carMaterial;
var doorleft, doorright;
var ignoreList = ["part 003"];
var tier = ["part 028", "part 025" , "part 026", "part 027"];
var tierMesh = [];
var txtureCube;

var pressedKeys = {"moveForward": false, "moveBackward": false, "moveLeft": false, "moveRight": false};
var clock;
var carFrame = new THREE.Object3D(),
    frontLeftWheel = new THREE.Object3D(),
    frontRightWheel = new THREE.Object3D();

var modelScale  = 1,
    wheelDiameter = 1;


var tempNum = 2,
    MAX_SPEED = 2200, 
    MAX_REVERSE_SPEED = - 1500, 
    MAX_WHEEL_ROTATION = 0.6, 
    FRONT_ACCELERATION = 1250, 
    BACK_ACCELERATION = 1500, 
    WHEEL_ANGULAR_ACCELERATION = 1.5, 
    FRONT_DECCELERATION = 750, 
    WHEEL_ANGULAR_DECCELERATION = 1.0, 
    STEERING_RADIUS_RATIO = 0.0023, 
    MAX_TILT_SIDES = 0.05,
    MAX_TILT_FRONTBACK = 0.015;

var speed = 0,
    acceleration = 0,
    wheelOrientation = 0,
    carOrientation = 0;

var frontLeftWheelMesh = null,
    frontRightWheelMesh = null,
    backLeftWheelMesh = null,
    backRightWheelMesh = null;

var bodyGeometry = null,
    wheelGeometry = null,
    bodyMaterials = null,
    wheelMaterials = null;

init(function(){
    clock = new THREE.Clock();
    document.addEventListener("keydown", keyPressGroup, false);
    document.addEventListener("keyup", keyPressGroup, false);
    fnModelRenderer();
    animate();
});

function init(callback){
    width = window.innerWidth;
    height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(18, width/height, 1, 100000);
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = 5;
    
    camera.rotation.x = -0.1;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    
    scene.add(camera);

    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = false;
    scene.background = new THREE.Color(0xffffff);

    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    var gridHelper = new THREE.GridHelper(500000, 50000);
    gridHelper.material.transparent = false;
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    manager = new THREE.LoadingManager();
    objLoader = new THREE.OBJLoader(manager);
    mtlLoader = new THREE.MTLLoader(manager);
    txtureLoader = new THREE.TextureLoader(manager);

    stats = new Stats();
    document.body.appendChild( stats.dom );

    callback();
}

function fnModelRenderer(){
    createBg();
    createLight();
    createCar();
}

function createBg(){
    var subpath = filePath + "/skybox2/"
    var urls = [
        subpath + "px.jpg", subpath + "nx.jpg",
        subpath + "py.jpg", subpath + "ny.jpg",
        subpath + "pz.jpg", subpath + "nz.jpg"
    ];
    txtureCube = new THREE.CubeTextureLoader(manager).load(urls);
    scene.background = txtureCube;
}
function createCar(){
    var texture = txtureLoader.setPath(filePath).load("/skin00/0000.BMP");

    var materialColor = new THREE.Color(1,1,1);
    var texturedMaterial =new THREE.MeshPhongMaterial( { color: materialColor,envMap: txtureCube, flatShading:false , side: THREE.FrontSide} );
    var tierMaterial =  new THREE.MeshPhongMaterial( { color: new THREE.Color(0.1,0.1,0.1), flatShading:false, side: THREE.FrontSide } );
    var glassMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color(0.4,0.4,0.5), flatShading:false, side: THREE.FrontSide } );
    glassMaterial.shininess = 80;
    glassMaterial.specular = new THREE.Color(1,1,1);
    glassMaterial.opacity = 0.2;
    glassMaterial.transparent = true;
    texturedMaterial.shininess = 40;
    texturedMaterial.specular = new THREE.Color(1,1,1);
    texturedMaterial.map = texture;

    carMaterial = objLoader
    .setPath(filePath)
    .load("/Porsche_911_GT2.obj", function(obj){
        obj.traverse(function(child){
            if (child instanceof THREE.Mesh) {
                if (tier.includes(child.name) )
                {
                    child.material = tierMaterial;

                    if(child.name == "part 028"){
                        backLeftWheelMesh = new THREE.Mesh(child.geometry, child.material);
                        backLeftWheelMesh.position.set(0,0,0);
                    }else if(child.name == "part 027"){
                        frontLeftWheelMesh = new THREE.Mesh(child.geometry, child.material);
                    }else if(child.name == "part 026"){
                        frontRightWheelMesh = new THREE.Mesh(child.geometry, child.material);
                    }else if(child.name == "part 025"){
                        backRightWheelMesh = new THREE.Mesh(child.geometry, child.material);
                    }
                }
                else
                {
                    child.material = texturedMaterial;
                    carFrame.add(new THREE.Mesh(child.geometry, child.material));
                }
                if (ignoreList.includes(child.name))
                {
                    child.material = glassMaterial;
                }
            }
        });
        carMaterial = carFrame;
        scene.add(carMaterial);



        frontLeftWheel.add(frontLeftWheelMesh);
        scene.add(frontLeftWheel);
        
        frontRightWheel.add(frontRightWheelMesh);
        scene.add(frontRightWheel);

        scene.add(backLeftWheelMesh);
        
        scene.add(backRightWheelMesh);
    });
}

function createLight(){
    
    var hemisphereLight = new THREE.HemisphereLight( 0x111111, 0xffffff )     
    var ambientLight = new THREE.AmbientLight( 0xffffff,0.6 );
    var pointLight = new THREE.PointLight( 0xeeeeee, 1);
    var directLight = new THREE.DirectionalLight(0xffffff, 0.8);

    directLight.position.x = 5;
    directLight.position.y = 5;
    directLight.position.z = 5;
    
    pointLight.position.x = 0;
    pointLight.position.y = 15;
    pointLight.position.z = 0;
    // camera.add(directLight);
    scene.add(hemisphereLight);
    //scene.add(pointLight);
    
    scene.add( ambientLight );
}

function keyPressGroup(evnt){
    if(!carMaterial)
        return;

    switch(evnt.code){
        case 'KeyW':
            pressedKeys.moveForward = (evnt.type == "keydown");
            break;
        case 'KeyS':
            pressedKeys.moveBackward = (evnt.type == "keydown");
            break;
        case 'KeyA':
            pressedKeys.moveLeft = (evnt.type == "keydown");
            break;
        case 'KeyD':
            pressedKeys.moveRight = (evnt.type == "keydown");
            break;
    }

}
function updateCarModel(delta){
    if(!carMaterial)
        return;
    if(pressedKeys.moveForward){
        speed = THREE.Math.clamp(speed - delta * FRONT_ACCELERATION, MAX_REVERSE_SPEED, MAX_SPEED );
        acceleration = THREE.Math.clamp(acceleration - delta, - 1, 1 );
    }
    if (pressedKeys.moveBackward) {
        speed = THREE.Math.clamp(speed + delta * BACK_ACCELERATION, MAX_REVERSE_SPEED, MAX_SPEED );
        acceleration = THREE.Math.clamp(acceleration + delta, - 1, 1 );
    }
    if(pressedKeys.moveLeft){
        wheelOrientation = THREE.Math.clamp(wheelOrientation - delta * WHEEL_ANGULAR_ACCELERATION, - MAX_WHEEL_ROTATION, MAX_WHEEL_ROTATION );
    }
    if(pressedKeys.moveRight){
        wheelOrientation = THREE.Math.clamp(wheelOrientation + delta * WHEEL_ANGULAR_ACCELERATION, - MAX_WHEEL_ROTATION, MAX_WHEEL_ROTATION );
    }

    if( !(pressedKeys.moveForward || pressedKeys.moveBackward) ){
        if(speed > 0){
            var k = exponentialEaseOut( speed / MAX_SPEED );
            speed = THREE.Math.clamp( speed - k * delta * FRONT_DECCELERATION, 0, MAX_SPEED );
            acceleration = THREE.Math.clamp( acceleration - k * delta, 0, 1 );
        }else {
            var k = exponentialEaseOut( speed / MAX_REVERSE_SPEED );
            speed = THREE.Math.clamp( speed + k * delta * BACK_ACCELERATION, MAX_REVERSE_SPEED, 0 );
            acceleration = THREE.Math.clamp( acceleration + k * delta, - 1, 0 );
        }
    }

    if ( ! ( pressedKeys.moveLeft || pressedKeys.moveRight ) ) {
        if (wheelOrientation > 0 ) {
            wheelOrientation = THREE.Math.clamp( wheelOrientation - delta * WHEEL_ANGULAR_DECCELERATION, 0, MAX_WHEEL_ROTATION );
        } else {
            wheelOrientation = THREE.Math.clamp( wheelOrientation + delta * WHEEL_ANGULAR_DECCELERATION, - MAX_WHEEL_ROTATION, 0 );
        }

    }

    var forwardDelta = speed * delta;
    carOrientation += ( forwardDelta * STEERING_RADIUS_RATIO) * wheelOrientation;
    
    carMaterial.position.x += Math.sin( carOrientation ) * forwardDelta;
    carMaterial.position.z += Math.cos( carOrientation ) * forwardDelta;

    carMaterial.rotation.y = carOrientation;

    // camera.position.x += Math.sin( carOrientation ) * forwardDelta;
    // camera.position.z += Math.cos( carOrientation ) * forwardDelta;
    // camera.rotation.y = wheelOrientation;

    var angularSpeedRatio = 1 / ( modelScale * ( this.wheelDiameter / 2 ) );
    var wheelDelta = forwardDelta * angularSpeedRatio;
    
    // frontLeftWheelMesh.rotation.x += wheelDelta;
    // frontRightWheelMesh.rotation.x += wheelDelta;
    // backLeftWheelMesh.rotation.x += wheelDelta;
    // backRightWheelMesh.rotation.x += wheelDelta;
    
    // frontLeftWheel.rotation.y = wheelOrientation;
    // frontRightWheel.rotation.y = wheelOrientation;    
}

function exponentialEaseOut( k ) {
    return k === 1 ? 1 : - Math.pow( 2, - 10 * k ) + 1;
}

function update(){
    var delta = clock.getDelta();
        updateCarModel(delta);
        stats.update();
}

function animate(){
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}