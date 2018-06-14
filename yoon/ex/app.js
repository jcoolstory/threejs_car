var container, 
    renderer, 
    scene, 
    camera, 
    mesh, 
    CursorX,
    start = Date.now();

function PostProcess() {

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ) );

    
    var GlowEffect = new THREE.ShaderPass( THREE.TestShader );
    GlowEffect.uniforms[ 'Intensity' ].value = 0.01;
    GlowEffect.uniforms[ 'Spread' ].value = 10.0;
    // GlowEffect.renderToScreen = true;
    composer.addPass( GlowEffect );
}

// GO
window.addEventListener( 'load', function() {

    // grab the container from the DOM
    container = document.getElementById( "container" );
    
    // create a scene
    scene = new THREE.Scene();

    // Add fog
    // scene.fog = new THREE.Fog( "#000000" , 0, 800)

    Aspect = 1.778;
    ViewportWidth = 1280;
    
    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera( 
        25.0, 
        Aspect, 
        1, 
        10000 );
        
        
    Camera_Parent = new THREE.Object3D();
    Camera_Parent.add( camera );
    scene.add( Camera_Parent );

    // Set before orbit
    // SET HEIGHT to 0 then to prefered height later!
    var InitCamX = 180;
    var InitCamY = 20;
    var InitCamZ = 250;
    camera.position.set(InitCamX ,0, InitCamZ);

    
    // Init before Orbitcontrols, set orbit as the same
    var CameraTarget = new THREE.Vector3(0,20,0);
    camera.lookAt(CameraTarget);
    

    
    // Controls
    
    OrbitControls = new THREE.OrbitControls( camera );
    OrbitControls.target = CameraTarget;
    
    camera.position.set(InitCamX,InitCamY,InitCamZ);
    
    // Stop from going inside the geometry
    OrbitControls.minDistance = 150;
    OrbitControls.maxDistance = 800;
    
    OrbitControls.rotateSpeed = 0.3;
    OrbitControls.minPolarAngle = 0; // radians
    OrbitControls.maxPolarAngle = 1.65;
    
    if (FreeCam == 0) {

        // Disable zoom and pan
        OrbitControls.noZoom = true;
        OrbitControls.noPan = true;
    }
    
    
    // Build cube map (animate later)
    var path = "./CubeMap_Seq/CubeMap_";

    var CubeMapFrame = "_0001";
    var format = '.jpg';
    var urls = [
                path + 'R' + CubeMapFrame + format,
                path + 'L' + CubeMapFrame + format,
                path + 'U' + CubeMapFrame + format,
                path + 'D' + CubeMapFrame + format,
                path + 'B' + CubeMapFrame + format,
                path + 'F' + CubeMapFrame + format
                ];
                

    reflectionCube = THREE.ImageUtils.loadTextureCube( urls );

    
    // Build cube map (animate later)
    var path = "./CubeMap_Seq/CubeMap_";

    var CubeMapFrame = "_0001";
    var format = '_Low.jpg';
    var urls = [
                path + 'R' + CubeMapFrame + format,
                path + 'L' + CubeMapFrame + format,
                path + 'U' + CubeMapFrame + format,
                path + 'D' + CubeMapFrame + format,
                path + 'B' + CubeMapFrame + format,
                path + 'F' + CubeMapFrame + format
                ];
                

    ReflectionCubeLow = THREE.ImageUtils.loadTextureCube( urls );
    
    
    // DB5 Textures
    
    var DB5MapPath = "./textures/";
    
    T_DB5_Diffuse = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Body_Diffuse.jpg" );
    T_DB5_Glossiness = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Body_Glossiness.jpg" );
    T_DB5_Reflection = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Body_Reflection.jpg" );
    
    T_DB5_Interior_Diffuse = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Interior_Diffuse.jpg" );
    T_DB5_Tyre_Diffuse = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Tyre_Diffuse.jpg" );
    T_DB5_Rim_Diffuse = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Rim_Diffuse.jpg" );
    
    T_DB5_Chrome_Diffuse = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Chrome_Diffuse.jpg" );
    T_DB5_Chrome_Reflection = THREE.ImageUtils.loadTexture(DB5MapPath + "DB5_Chrome_Reflection.jpg" );
    
    

    
    if (HighQuality == "1") {
        IfGlossyEnabled = true;
    }
    else {
        IfGlossyEnabled = false;
    }
    
    console.log("HighQuality: " + HighQuality);
    
    MT_Chrome = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            
                            Diffuse : T_DB5_Chrome_Diffuse,
                            EnvMap : ReflectionCubeLow,
                            
                            Specular : new THREE.Color(1,1,1),
                            
                            ReflectAmount : 2,
                            Glossiness: .1,
                            // GlossinessColor : new THREE.Color(.9,.5,.9),
                            ReflectionMap: T_DB5_Chrome_Reflection,
                            
                            Ambient: .1,
                            Falloff: .2,
                            Opacity: 1,
                            });
                            
    MT_Rim = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            
                            Diffuse : T_DB5_Rim_Diffuse,
                            EnvMap : ReflectionCubeLow,
                            
                            Specular : new THREE.Color(1,1,1),
                            
                            ReflectAmount : 2,
                            Glossiness: .1,
                            GlossinessColor : new THREE.Color(.9,.5,.9),
                            Ambient: .00,
                            Falloff: .5,
                            Opacity: 1,
                            });
                            
    MT_Glass = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            
                            Diffuse : new THREE.Color(.1,.1,.1),
                            EnvMap : reflectionCube,

                            ReflectAmount : .9,
                            Ambient: .0,
                            Falloff: .9,
                            Opacity: .01,
                            
                            });
                            
                            
    MT_GlassRed = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            
                            Diffuse : new THREE.Color(.9,.1,.1),
                            EnvMap : reflectionCube,
                            
                            Specular : new THREE.Color(1,1,1),
                            
                            ReflectAmount : 1,

                            Ambient:  new THREE.Color(.15,.02,.02),
                            Falloff: .9,
                            Opacity: 1,
                            });
                            
                            
    MT_Windows = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            
                            Diffuse : new THREE.Color(.1,.1,.1),
                            EnvMap : reflectionCube,
                            
                            Specular : new THREE.Color(1,1,1),
                            
                            ReflectAmount : .8,
                            Glossiness: .1,
                            GlossinessColor : new THREE.Color(.9,.5,.9),
                            Ambient: .0,
                            Falloff: .9,
                            Opacity: .8,
                            });
                            
    MT_Steel = SRMaterial({ 
                            ReflLayer_Glossy: IfGlossyEnabled,
                            ReflLayer_Coat: true,
                            Diffuse : new THREE.Color(.2,.2,.2),
                            EnvMap : reflectionCube,
                            Specular : new THREE.Color(1,1,1),
                            ReflectAmount : 1,
                            Glossiness: .2,
                            GlossinessColor : new THREE.Color(1,1,1),
                            Ambient: .0,
                            Falloff: 1,
                            Opacity: 1,
                            });
                            
    MT_Matt = SRMaterial({ 
                            ReflLayer_Glossy: IfGlossyEnabled,
                            ReflLayer_Coat: false,
                            Diffuse : new THREE.Color(.2,.2,.2),
                            EnvMap : reflectionCube,
                            Specular : new THREE.Color(1,1,1),
                            ReflectAmount : 1,
                            Glossiness: .2,
                            GlossinessColor : new THREE.Color(1,1,1),
                            Ambient: .0,
                            Falloff: 1,
                            Opacity: 1,
                            });
                            
    MT_Interior = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: false,
                            Diffuse : T_DB5_Interior_Diffuse,
                            EnvMap : reflectionCube,
                            Specular : new THREE.Color(1,1,1),
                            ReflectAmount : 1,
                            Glossiness: .2,
                            GlossinessColor : new THREE.Color(1,1,1),
                            Ambient: .5,
                            Falloff: 1,
                            Opacity: 1,
                            });
    
    // Make a SR material
                
    if (HighQuality == "1") {
        MT_BodyAmbient = .9
        MT_TyresAmb = .5
    }
    else{
        MT_BodyAmbient = 1
        MT_TyresAmb = .3
    }
    
    MT_Body = SRMaterial({ 
                            ReflLayer_Glossy: IfGlossyEnabled,
                            ReflLayer_Coat: true,
                            Diffuse :  T_DB5_Diffuse,
                            // Diffuse : new THREE.Color(.0,.0,.0),
                            EnvMap : reflectionCube,
                            EnvMapGlossy : ReflectionCubeLow,
                            
                            Specular : new THREE.Color(0,0,0),
                            
                            ReflectAmount : .9,
                            // Map for reflection/spec
                            ReflectionMap: T_DB5_Reflection,
                            
                            Glossiness: .01,
                            // replaces glossiness
                            GlossinessMap: T_DB5_Glossiness,
                            
                            
                            // glossy color (VRay esq)
                            // GlossinessColor : T_P911_GlossyColor,
                            GlossinessColor : new THREE.Color(1.0, 1.0, 1.0),

                            Ambient: MT_BodyAmbient,
                            Falloff: .9,
                            Opacity: 1,
    });

    
        
    MT_BlackGlossy = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: true,
                            Diffuse : new THREE.Color(0,0,0),
                            EnvMap : reflectionCube,
                            
                            Specular : new THREE.Color(0,0,0),
                            
                            ReflectAmount : .5,
                            Glossiness: .8,
                            GlossinessColor : new THREE.Color(1,1,1),
                            Ambient: 0,
                            Falloff: 1.,
                            Opacity: 1,
    });
                            
                            
    MT_Tyre = SRMaterial({ 
                            ReflLayer_Glossy: false,
                            ReflLayer_Coat: false,
                            Diffuse : T_DB5_Tyre_Diffuse,
                            EnvMap : reflectionCube,
                            EnvMapGlossy : ReflectionCubeLow,
                            Specular : new THREE.Color(0,0,0),
                            
                            ReflectAmount : .5,
                            Glossiness: .2,
                            GlossinessColor : new THREE.Color(.2,.2,.2),
                            GlossinessMap: T_DB5_Tyre_Diffuse,
                            Ambient: .4,
                            Falloff: .5,
                            Opacity: 1,
                            
    });

    

    T_SetBaked = THREE.ImageUtils.loadTexture("./textures/SetFloor.jpg" );
    T_SetBaked.minFilter = THREE.LinearFilter;


    MT_Set = new THREE.MeshPhongMaterial({ 
                                            color: 0xdddddd,
                                            ambient: new THREE.Color(1,1,1) ,
                                            shininess: 0,
                                            map: T_SetBaked,
                                            // lightMap: T_FloorShadow,
    }) ;
    
                                            
    // To animate the obj, give it a null as a parent
    x_Null = new THREE.Object3D();
    x_Null.position.set(0, 0 , 0)

    // Add objects to the scene via its parent
    scene.add( x_Null );
    
    
    var OBJLoadManager = new THREE.LoadingManager();
    OBJLoadManager.onLoad = function () {
        
        $( "div#LoadingBG" ).delay( 800 ).fadeOut(400);
    }
    
    
    OBJLoadManager.onProgress = function ( item, loaded, total ) {
        var Percent = loaded/total *100;
        console.log(  Percent + "%");
        
        $("div#LoadingProgress").width( Percent + "%" );

        
    }
    
    // One big obj loader which is linked to the load manager
    var OBJLoader = new THREE.OBJLoader(OBJLoadManager);
    
    function SubDivideMesh(Mesh , Iterations) {
    
        // Clone the original
        SmoothClone = Mesh.clone();
        
        var SubDModifier = new THREE.SubdivisionModifier( Iterations );
    
        // Clean mesh
        SmoothClone.geometry.mergeVertices();
        SmoothClone.geometry.computeFaceNormals();
        SmoothClone.geometry.computeVertexNormals();
        
        // SubDModifier.supportUVs = false;
        
        SubDModifier.modify( SmoothClone.geometry );
        
        return SmoothClone;
    }
    
    
    
    function OBJParams(object, Material, Parent, Subdivs) {
    
        // Need to traverse the 'meshes' in the object
        object.traverse(function (child) {
            if ( child instanceof THREE.Mesh ) {
                child.castShadow = false;
                child.receiveShadow = false;
                child.material = Material;
            }
        } );
        
        
        // Subdivide
        if (Subdivs > 0 ){
            // Obj's mesh object is the first child of the object
            // Subdivs = 0;
            SubdividedClone = SubDivideMesh(object.children[0], Subdivs)
            Parent.add( SubdividedClone );
        }
        else {
            Parent.add( object );
        }
        
    }
    
    
    
    OBJLoader.load('./obj/SetFloor.obj' ,  function ( object ) {
        OBJParams(object, MT_Set, scene)
    })
    
    
    // Spheres or OBJs
    var SphereTest = false;
    
    
    // LOAD OBJS
    OBJPath = './obj/';
    if (SphereTest != true) {
        
        
        OBJLoader.load( OBJPath + 'DB5_Body.obj' ,  function ( object ) {
            OBJParams(object, MT_Body, scene)
        })

        OBJLoader.load( OBJPath + 'DB5_Chrome.obj' ,  function ( object ) {
            OBJParams(object, MT_Chrome, scene, 0)
        })

            
        OBJLoader.load( OBJPath + 'DB5_Headlight_Inside.obj' ,  function ( object ) {
            OBJParams(object, MT_Chrome, scene, 0)
        })
            
            
            
        OBJLoader.load( OBJPath + 'DB5_Interior.obj' ,  function ( object ) {
            OBJParams(object, MT_Interior, scene)
        })
            


        OBJLoader.load( OBJPath + 'DB5_RearLights.obj' ,  function ( object ) {
            OBJParams(object, MT_GlassRed, scene, 0)
        })

                
        OBJLoader.load( OBJPath + 'DB5_Undertray.obj' ,  function ( object ) {
            OBJParams(object, MT_BlackGlossy, scene)
        })
                
            
        OBJLoader.load( OBJPath + 'DB5_Headlight_Glass.obj' ,  function ( object ) {
            OBJParams(object, MT_Glass, scene)
        })
            
            
            
        OBJLoader.load( OBJPath + 'DB5_Windows.obj' ,  function ( object ) {
            OBJParams(object, MT_Windows, scene)
        })
            

    }
    // Wheels
    
    // Every frame, make an array of the cube map images
    WheelPositions = [new THREE.Vector3(28.5,12.36,61.46),new THREE.Vector3(28.5,12.36,-26.75),new THREE.Vector3(-28.5,12.36,-26.75),new THREE.Vector3(-28.5,12.36,61.46)]


    var x_Wheel_FL = new THREE.Object3D();
    var x_Wheel_FR = new THREE.Object3D();
    var x_Wheel_RL = new THREE.Object3D();
    var x_Wheel_RR = new THREE.Object3D();

    scene.add( x_Wheel_FL );
    scene.add( x_Wheel_FR );
    scene.add( x_Wheel_RL );
    scene.add( x_Wheel_RR );
    
    //타이어
    OBJLoader.load( OBJPath + 'DB5_Rim.obj' ,  function ( object ) {
        OBJParams(object, MT_Rim, x_Wheel_FL)
    })
    OBJLoader.load( OBJPath + 'DB5_Tyre.obj' ,  function ( object ) {
        OBJParams(object, MT_Tyre, x_Wheel_FL)
    })
            
    OBJLoader.load( OBJPath + 'DB5_Rim.obj' ,  function ( object ) {
        OBJParams(object, MT_Rim, x_Wheel_FR)
    })
    OBJLoader.load( OBJPath + 'DB5_Tyre.obj' ,  function ( object ) {
        OBJParams(object, MT_Tyre, x_Wheel_FR)
    })
            
    OBJLoader.load( OBJPath + 'DB5_Rim.obj' ,  function ( object ) {
        OBJParams(object, MT_Rim, x_Wheel_RL)
    })
    OBJLoader.load( OBJPath + 'DB5_Tyre.obj' ,  function ( object ) {
        OBJParams(object, MT_Tyre, x_Wheel_RL)
    })

    OBJLoader.load( OBJPath + 'DB5_Rim.obj' ,  function ( object ) {
        OBJParams(object, MT_Rim, x_Wheel_RR)
    })
    OBJLoader.load( OBJPath + 'DB5_Tyre.obj' ,  function ( object ) {
        OBJParams(object, MT_Tyre, x_Wheel_RR)
    })
        
        
    x_Wheel_FL.position.set(28.5,12.36,61.46);
    x_Wheel_FR.position.set(28.5,12.36,-26.75);
    
    x_Wheel_RL.position.set(-28.5,12.36,-26.75);
    x_Wheel_RL.rotation.set(0,3.141,0);
    x_Wheel_RR.position.set(-28.5,12.36,61.46);
    x_Wheel_RR.rotation.set(0,3.141,0);
    
    
    var Ambient = 1;
    var Light_Amb = new THREE.AmbientLight( new THREE.Color(Ambient,Ambient,Ambient) );
    scene.add( Light_Amb );
    
        
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha: false, precision:"highp" });
    
    ViewportWidth = window.innerWidth;
    ViewportHeight = window.innerHeight;
    
    camera.aspect = ViewportWidth / ViewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( ViewportWidth, ViewportHeight );
    

    window.addEventListener( 'resize', onWindowResize, false );
    
    container.appendChild( renderer.domElement );
    
    
    // Get cursor position
    $( "#container" ).mousemove( function( event ) {
        var ParentOffset = $(this).offset(); 

        CursorX = event.clientX - ParentOffset.left;
        CursorY = event.clientY - ParentOffset.top;
    });
    
    // Render!!
    render()
    
} );

function onWindowResize() {

    ViewportWidth = window.innerWidth;
    ViewportHeight = window.innerHeight;
    
    camera.aspect = ViewportWidth / ViewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( ViewportWidth, ViewportHeight );

}

    


function render() {
    

    renderer.render( scene, camera );
    Time = requestAnimationFrame( render );
    
    // Enable to enable rift
    // effect.render( scene, camera );
    
    
    if (RotateCam == 1){
        Camera_Parent.rotation.y = (Time*.003);
    }


}