// Overwriting some parts
SR_UniformsLib = {
	common: {
		"diffuse" : { type: "c", value: new THREE.Color( 0x0000ff ) },
		"opacity" : { type: "f", value: 1.0 },

		"map" : { type: "t", value: null },
		"offsetRepeat" : { type: "v4", value: new THREE.Vector4( 0, 0, 1, 1 ) },

		"lightMap" : { type: "t", value: null },
		"specularMap" : { type: "t", value: null },
		"alphaMap" : { type: "t", value: null },

		"envMap" : { type: "t", value: null },
        
		"flipEnvMap" : { type: "f", value: - 1 },
		"useRefract" : { type: "i", value: 0 },
		"reflectivity" : { type: "f", value: 1.0 },
		"refractionRatio" : { type: "f", value: 0.98 },
		"combine" : { type: "i", value: 0 },

		"morphTargetInfluences" : { type: "f", value: 0 },
        

            
        "ReflLayer_Glossy" : { type: "i", value: 1 },
        "ReflLayer_Coat" : { type: "i", value: 1 },
            
        // ReflectionMap
        "ReflectionMap" : { type: "t", value: null },
        "ReflectionMap_InUse" : { type: "i", value: 0 },
        
        // Glossiness
        "EnvMapGlossy" : { type: "t", value: null },
        "glossiness" : { type: "f", value: .01 },
        "glossinessMap" : { type: "t", value: null },
        "glossinessMap_InUse" : { type: "i", value: 0 },
        
        // Glossy colour
        "glossinessColor" : { type: "c", value: new THREE.Color( 1.0,1.0,1.0 ) },
        "GlossinessColorMap" : { type: "t", value: null },
        "GlossinessColorMap_InUse" : { type: "i", value: 0 },
        
        // Noise texture 
        "NoiseEnvMap" : { type: "t", value: null },

        "Falloff" : { type: "f", value: 1.0 },
        
        "Env_Power" : { type: "f", value: 5.0 },
        "Env_Multiplier" : { type: "f", value: 11.0 },

        // Controls for glossyness creation
        "GlossyCalc_Rotation" : { type: "f", value: 0.2 },
	},

	bump: {
		"bumpMap" : { type: "t", value: null },
		"bumpScale" : { type: "f", value: 1 }
	},

	normalmap: {
		"normalMap" : { type: "t", value: null },
		"normalScale" : { type: "v2", value: new THREE.Vector2( 1, 1 ) }
	},

	fog : {
		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }
	},

	lights: {
		"ambientLightColor" : { type: "fv", value: [] },

		"directionalLightDirection" : { type: "fv", value: [] },
		"directionalLightColor" : { type: "fv", value: [] },

		"hemisphereLightDirection" : { type: "fv", value: [] },
		"hemisphereLightSkyColor" : { type: "fv", value: [] },
		"hemisphereLightGroundColor" : { type: "fv", value: [] },

		"pointLightColor" : { type: "fv", value: [] },
		"pointLightPosition" : { type: "fv", value: [] },
		"pointLightDistance" : { type: "fv1", value: [] },

		"spotLightColor" : { type: "fv", value: [] },
		"spotLightPosition" : { type: "fv", value: [] },
		"spotLightDirection" : { type: "fv", value: [] },
		"spotLightDistance" : { type: "fv1", value: [] },
		"spotLightAngleCos" : { type: "fv1", value: [] },
		"spotLightExponent" : { type: "fv1", value: [] }
	},

	particle: {
		"psColor" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },
		"size" : { type: "f", value: 1.0 },
		"scale" : { type: "f", value: 1.0 },
		"map" : { type: "t", value: null },

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }
	},

	shadowmap: {
		"shadowMap": { type: "tv", value: [] },
		"shadowMapSize": { type: "v2v", value: [] },

		"shadowBias" : { type: "fv1", value: [] },
		"shadowDarkness": { type: "fv1", value: [] },

		"shadowMatrix" : { type: "m4v", value: [] }
	}

};


SR_ShaderLib = {

    'srphong': {

        uniforms: THREE.UniformsUtils.merge( [

            SR_UniformsLib[ "common" ],
            SR_UniformsLib[ "bump" ],
            SR_UniformsLib[ "normalmap" ],
            SR_UniformsLib[ "fog" ],
            SR_UniformsLib[ "lights" ],
            SR_UniformsLib[ "shadowmap" ],

            {
                "ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
                "emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
                "specular" : { type: "c", value: new THREE.Color( 0 ) },
                "shininess": { type: "f", value: 30 },
                "wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) },
            }

        ] ),

        vertexShader: [

            "#define PHONG",

            "varying vec3 vViewPosition;",
            "varying vec3 vNormal;",
            
            // SR
            "varying vec3 Normal;",
            "varying vec3 CameraNormal;",
            
            THREE.ShaderChunk[ "map_pars_vertex" ],
            THREE.ShaderChunk[ "lightmap_pars_vertex" ],
            THREE.ShaderChunk[ "envmap_pars_vertex" ],
            THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
            THREE.ShaderChunk[ "color_pars_vertex" ],
            THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
            THREE.ShaderChunk[ "skinning_pars_vertex" ],
            THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
            THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

            "void main() {",
                
                // SR
                "mat3 cameraRotationMatrix = mat3( modelViewMatrix );",
                "CameraNormal = vec3(0,0,1) * mat3(modelViewMatrix);",
                "Normal = normal;",
                
                THREE.ShaderChunk[ "map_vertex" ],
                THREE.ShaderChunk[ "lightmap_vertex" ],
                THREE.ShaderChunk[ "color_vertex" ],

                THREE.ShaderChunk[ "morphnormal_vertex" ],
                THREE.ShaderChunk[ "skinbase_vertex" ],
                THREE.ShaderChunk[ "skinnormal_vertex" ],
                THREE.ShaderChunk[ "defaultnormal_vertex" ],

            "   vNormal = normalize( transformedNormal );",

                THREE.ShaderChunk[ "morphtarget_vertex" ],
                THREE.ShaderChunk[ "skinning_vertex" ],
                THREE.ShaderChunk[ "default_vertex" ],
                THREE.ShaderChunk[ "logdepthbuf_vertex" ],

            "   vViewPosition = -mvPosition.xyz;",

                THREE.ShaderChunk[ "worldpos_vertex" ],
                THREE.ShaderChunk[ "envmap_vertex" ],
                THREE.ShaderChunk[ "lights_phong_vertex" ],
                THREE.ShaderChunk[ "shadowmap_vertex" ],

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform vec3 diffuse;",
            "uniform float opacity;",

            "uniform vec3 ambient;",
            "uniform vec3 emissive;",
            "uniform vec3 specular;",
            "uniform float shininess;",
            
            // user control falloff
            "uniform float Falloff;",
            

            "uniform sampler2D ReflectionMap;",
            "uniform int ReflectionMap_InUse;",
            
            "uniform float glossiness;",
            "uniform sampler2D glossinessMap;",
            "uniform int glossinessMap_InUse;",
            
            "uniform vec3 glossinessColor;",
            "uniform sampler2D GlossinessColorMap;",
            "uniform int GlossinessColorMap_InUse;",
            
            
            // The bool on off of the coats
            "uniform int ReflLayer_Glossy;",
            "uniform int ReflLayer_Coat;",

        
            // EnvMap controls
            "uniform samplerCube EnvMapGlossy;",
            "uniform float Env_Power;",
            "uniform float Env_Multiplier;",
            
            // Control to tweak how glossyiness is created
            "uniform float GlossyCalc_Rotation;",
            
            
            // falloff
            "varying vec3 CameraNormal;",
            "varying vec3 Normal;",
            
            // Noise 
            // "uniform sampler2D NoiseImage;",
            "uniform samplerCube NoiseEnvMap;",
            
            THREE.ShaderChunk[ "color_pars_fragment" ],
            THREE.ShaderChunk[ "map_pars_fragment" ],
            THREE.ShaderChunk[ "alphamap_pars_fragment" ],
            THREE.ShaderChunk[ "lightmap_pars_fragment" ],
            THREE.ShaderChunk[ "envmap_pars_fragment" ],
            THREE.ShaderChunk[ "fog_pars_fragment" ],
            THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
            THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
            THREE.ShaderChunk[ "bumpmap_pars_fragment" ],
            THREE.ShaderChunk[ "normalmap_pars_fragment" ],
            THREE.ShaderChunk[ "specularmap_pars_fragment" ],
            THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

            // Someones random function takes a seed as an arg
            "float rand(vec2 co){",
                "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
            "}",

            // QUARTION STUFF
            // http://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
            "vec4 quat_from_axis_angle(vec3 axis, float angle){",
            "  vec4 qr;",
            "  float half_angle = (angle * 0.5) * 3.14159 / 180.0;",
            "  qr.x = axis.x * sin(half_angle);",
            "  qr.y = axis.y * sin(half_angle);",
            "  qr.z = axis.z * sin(half_angle);",
            "  qr.w = cos(half_angle);",
            "  return qr;",
            "}",

            
            "vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle)",
            "{ ",
            "  vec4 q = quat_from_axis_angle(axis, angle);",
            "  vec3 v = position.xyz;",
            "  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);",
            "}",

                
                
            "void main() {",

                "float pi = 3.1415;",
                
                // Basic opacity
                "gl_FragColor = vec4( vec3( 1.0 ), opacity );",

                // sr
                "float sr_falloff = mix(1.0, 1.0 -( dot( CameraNormal, Normal )), Falloff ) ;",
                
                THREE.ShaderChunk[ "logdepthbuf_fragment" ],
                THREE.ShaderChunk[ "map_fragment" ],
                THREE.ShaderChunk[ "alphamap_fragment" ],
                THREE.ShaderChunk[ "alphatest_fragment" ],
                THREE.ShaderChunk[ "specularmap_fragment" ],

                THREE.ShaderChunk[ "lights_phong_fragment" ],

                THREE.ShaderChunk[ "lightmap_fragment" ],
                THREE.ShaderChunk[ "color_fragment" ],

                
                // calculates the reflection vectors/angles, to retrieve correct part of image from cubemap
                // "vec3 reflectVec;",
                "vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );",
                "vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );",
                
                // Get the base reflection vector
                "vec3 reflectVec = reflect( cameraToVertex, worldNormal );",
                
                // moved down to coat reflections
                // "vec4 reflectedColor = textureCube( envMap, reflectVec);",
                
                
                // Log to Lin conversion of envmap
                // "reflectedColor.xyz = (pow(reflectedColor.xyz, vec3(Env_Power)) * Env_Multiplier);",
                
                // Controls for glossy samples loop
                "const float GLOSS_SAMPLES = 128.0;",
                
               
                // User input is 0 matte - 1 glossy so just subtract 1 from it to reverse it
                "float glossFactor = 1.0 - glossiness;",
                "vec3 glossColorFactor = glossinessColor;",
                
                "vec4 NewGlossy;",
                
                // For a glossy object, sample the cubemap with reflectedRay with some noise applied
                "if (ReflLayer_Glossy == 1) {",
                    
                    // If a glossiness map was given use it
                    "if (glossinessMap_InUse == 1){;",
                        "vec4 texelGlossy = texture2D( glossinessMap, vUv );",
                        "glossFactor = 1.0 - texelGlossy.r;",
                    "};",
                    
                    
                    // If a glossiness COLOR map was given use that
                    "if (GlossinessColorMap_InUse == 1) {;",
                        "vec4 texelGlossyColor = texture2D( GlossinessColorMap, vUv );",
                        "glossColorFactor = texelGlossyColor.xyz;",
                    "};",
                    
                    "if (GlossinessColorMap_InUse == 0) {;",
                        "glossColorFactor = glossinessColor;",
                    "};",
                    
                    
                    ///////////////////// NEW STUFF /////////////////////////////
                    
                    "vec4 ReflectSum = vec4(0.0);",
                    "vec3 RotatedVector;",
                    // "vec3 ReflectCross;",

                    "for ( float i = 0.0; i < GLOSS_SAMPLES; i++ ) {",
                    
                        // i goes from 0.0 to 1.0
                        "float NormalisedGlossSample = (i/(GLOSS_SAMPLES));",
                        
                        // number of points in a radial array
                        "float AngleRadialCount = 4.0;",
                        
                        // Total rays divide by how many per array = number of steps (it's a count, so should start at 1 not 0)
                        "float AngleStepCount = (GLOSS_SAMPLES / AngleRadialCount) + 1.0;",
                        
                        // Get cross product of the reflection vector
                        "vec3 ReflectVecCross = cross( reflectVec, vec3(1.0 ,0.0 ,0.0) );",
                        
                        // Rotate the cross vector using the original every iteration
                        // "vec3 ReflectVecRotateAxis = rotate_vertex_position(ReflectVecCross, reflectVec, (i * (10.0 * NormalisedGlossSample)));",
                        "vec3 ReflectVecRotateAxis = rotate_vertex_position(ReflectVecCross, reflectVec, (i * 20.0 ));",
                        
                        
                        // current nth ring radiating out
                        // "float AngleRadialStep = floor(i/AngleRadialCount);",
                        
                        // + 1.0 just to avoid an angle of 0.0
                        // Mulitply by glossfactor which is the texture or colour map
                        // "float Angle = (( AngleRadialStep + 0.0) * 1.0) * glossFactor;",
                        
                        
                        // "float Influence = (1.0 - ( (AngleRadialStep - 1.0) / AngleStepCount)) + 0.2;",
                        
                        
                        
                        // Rotate the vector
                        // "RotatedVector = normalize(rotate_vertex_position(reflectVec, ReflectCross, Angle));",
                        "RotatedVector = rotate_vertex_position(reflectVec, ReflectVecRotateAxis, (i * GlossyCalc_Rotation) * glossFactor);",
                        
                        // The further the vector from the original the less it should influence
                        // "ReflectSum = ReflectSum + (textureCube( envMap, RotatedVector) * vec4(Influence) );",
                        
                        // Use glossy envmap
                        "ReflectSum = ReflectSum + (textureCube( EnvMapGlossy, RotatedVector));",
                        
                    "}",
                    
                    
                    // Average all the gloss samples
                    "ReflectSum = (ReflectSum / vec4(GLOSS_SAMPLES)) ;",
                    "ReflectSum.xyz = ((pow(ReflectSum.xyz, vec3(Env_Power)) * Env_Multiplier) );",
                    
                    // Set
                    "NewGlossy = ReflectSum;",
                "}",
                
                
                // Am I doing this twice? Not sure
                // "shadingColor.xyz = (pow(shadingColor.xyz, vec3(10.0))*50.0);",
                
                "vec3 GlossyReflections = vec3(NewGlossy);",
                
                
                
                // Add reflections to color
                // psuedo Colour = colour + ((envmap * falloff) * reflectivity * specular(map))
                // "gl_FragColor.xyz = gl_FragColor.xyz + (cubeColor.xyz * (sr_falloff + .05)* reflectivity * specularStrength);",
                // "gl_FragColor.xyz = gl_FragColor.xyz + (GlossyReflections * (sr_falloff + .05) * reflectivity + (specularStrength*.05));",
                
                
                // gl_FragColor at this point is diffuse + specular
                // Falloff to black a wee bit
                // "vec3 DiffuseAndSpec =  gl_FragColor.xyz * (1.0 - sr_falloff);",
                "vec3 DiffuseAndSpec =  gl_FragColor.xyz;",
                
                

                // Desaturate the glossy reflections
                // "float GlossyReflectionsLuma = (GlossyReflections.x + GlossyReflections.y + GlossyReflections.z) / 3.0 ;",
                // "GlossyReflections.xyz = mix(GlossyReflections.xyz, vec3(GlossyReflectionsLuma), vec3(.5));",
                
                // Tint/map the glossy reflections on user input (map or color)
                "GlossyReflections.xyz = GlossyReflections.xyz * glossColorFactor;",

                // Multiply falloff to glossy reflectoins - but not much!
                "GlossyReflections = GlossyReflections * (clamp(sr_falloff + 0.7, 0.0,1.1) );",
                
                // Boost glossy reflections the lower the value
                // "GlossyReflections = GlossyReflections * ((glossFactor +1.0)*5.0);",
                
                // Extra Boost
                // "GlossyReflections = GlossyReflections * 20.0;",
                
                
                /////////////////////////////////
                // Build coat reflections
                /////////////////////////////////

                "vec4 reflectedColor = textureCube( envMap, reflectVec);",
                
                // Log to Lin conversion of envmap
                "reflectedColor.xyz = (pow(reflectedColor.xyz, vec3(Env_Power)) * Env_Multiplier);",
                
                // Apply falloff and reflectivity
                "vec3 CoatReflections = reflectedColor.xyz * reflectivity ;",

                // Mulitply falloff
                "CoatReflections = reflectedColor.xyz * (sr_falloff ) ;",
                
                // "vec3 CoatReflections = reflectedColor.xyz ;",
                
                
                // If a map was given
                "if (ReflectionMap_InUse == 1) {",
                    
                    "vec4 texelReflectionMap = texture2D( ReflectionMap, vUv );",
                    // "ReflectionMapFactor = 1.0 - texelReflectionMap.r;",
                        
                    "CoatReflections = CoatReflections * texelReflectionMap.xyz;",
                "}",
                
                // Or use reflectivity
                "if (ReflectionMap_InUse == 0) {",
                    "CoatReflections = CoatReflections * reflectivity;",
                "}",
                
                
                
                // If opacity is being used, get the desaturated reflections (average, luminostiy) and use it as an alpha
                "float CoatReflectionLuma = (CoatReflections.x + CoatReflections.y + CoatReflections.z) / 3.0 ;",
                
                
                
                ////////////////////////////////
                // Base Colour + glossy reflections + coat layer, + Opacity
                "gl_FragColor = vec4(vec3(DiffuseAndSpec), CoatReflectionLuma + opacity);",
                
                
                
                // Add glossy reflection
                "if (ReflLayer_Glossy == 1) {",
                    "gl_FragColor.xyz +=  GlossyReflections;",
                "}",
                
                
                // Add coat reflection
                "if (ReflLayer_Coat == 1) {",
                    "gl_FragColor.xyz +=  CoatReflections;",
                "}",
                
                
                // Test
                // "gl_FragColor.xyz = GlossyReflections.xyz;",
                


                THREE.ShaderChunk[ "shadowmap_fragment" ],
                THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
                THREE.ShaderChunk[ "fog_fragment" ],

            "}"

        ].join("\n")

    },


};


// Build a SR_Shader material from the js SRShader and params given
function SRMaterial(Params) {
    
    // Diffuse, Texture_Specular, Texture_Normals, EnvMap, Specular
    var Diffuse_MapInUse = false;
    var Specular_MapInUse = false;
    var NormalMap_MapInUse = false;
    
    // Get the parts from  SRShader.js
    // Clone the uniforms then modifier them from the given params
    var uniforms = THREE.UniformsUtils.clone(SR_ShaderLib.srphong.uniforms);
    
    // require that these are given ?
    uniforms["reflectivity"].value = Params.ReflectAmount;
    
    
    uniforms["envMap"].value = Params.EnvMap;
    // Custom GlossyEnvMap
    // Glossiness, map or float
    if (Params.EnvMapGlossy) {
        // console.log(Params.EnvMapGlossy)
        uniforms["EnvMapGlossy"].value = Params.EnvMapGlossy;
    }
    
    uniforms["specular"].value = Params.Specular;
    
    
    // The shader has a base glossy reflection, and a coat layer
    uniforms["ReflLayer_Glossy"].value = Params.ReflLayer_Glossy;
    uniforms["ReflLayer_Coat"].value = Params.ReflLayer_Coat;
    
    
    if (!isNaN(Params.Env_Power)) {
        uniforms["Env_Power"].value = Params.Env_Power;
    }
    if (!isNaN(Params.Env_Multiplier)) {
        uniforms["Env_Multiplier"].value = Params.Env_Multiplier;
    }

    
    // this is fucking up other objects..
    
    // console.log(Params.GlossinessColor)
    
    // Glossiness, map or float
    if (!Params.GlossinessMap == false) {
        uniforms["glossinessMap"].value = Params.GlossinessMap;
        uniforms["glossinessMap_InUse"].value = 1;
    }else {
        uniforms["glossinessMap_InUse"].value = 0;
    }
    
    if (!Params.Glossiness == false) {
        uniforms["glossiness"].value = Params.Glossiness;
    }
    
    
    // Reflection map
    // if (!Params.ReflectionMap == false) {
    //     uniforms["ReflectionMap"].value = Params.ReflectionMap;
    //     uniforms["ReflectionMap_InUse"].value = 1;
    // }
    // else {
    //     uniforms["ReflectionMap_InUse"].value = 0;
    // }
    
    // Glossiness Colour can be a colour or a map
    if (Params.GlossinessColor instanceof THREE.Color) {
        // console.log('GlossinessColor is a color')
        
        uniforms["glossinessColor"].value = Params.GlossinessColor;
        uniforms["GlossinessColorMap_InUse"].value = 0;
    }else if (Params.GlossinessColor instanceof THREE.Texture){
        // console.log('GlossinessColor is a Texture')
        uniforms["GlossinessColorMap"].value = Params.GlossinessColor;
        uniforms["GlossinessColorMap_InUse"].value = 1;
    }else {
        
        
    }
    
    if (!Params.Shininess == false) {
        uniforms["shininess"].value = Params.Shininess;
    }
    
    
    // Check diffuse input was a texture or a color
    if (Params.Diffuse instanceof THREE.Color) {
        uniforms["diffuse"].value = Params.Diffuse;
    }else {
        uniforms["diffuse"].value = new THREE.Color(1,1,1);
        uniforms["map"].value = Params.Diffuse;
        Diffuse_MapInUse = true;
    }
    
    // check if it is a number (0 = true, false = false)
    if (!isNaN(Params.Falloff)) {
        uniforms["Falloff"].value = Params.Falloff;
    }
    
    
    // If a specular texture was provided
    if (!Params.SpecularMap == false) {
        uniforms["specularMap"].value = Params.SpecularMap;
        Specular_MapInUse = true;
    }
    

    if (!Params.Opacity == false) {
        uniforms["opacity"].value = Params.Opacity;
    }
    
    
    // If a normal texture was provided
    if (!Params.NormalMap == false) {
        uniforms["normalMap"].value = Params.NormalMap;
        uniforms["normalScale"].value = new THREE.Vector2(1,1);
        NormalMap_MapInUse = true;
    }

    // if set to zero that counts as false
    if (!isNaN(Params.Ambient)) {
            uniforms["ambient"].value =  new THREE.Color(Params.Ambient,Params.Ambient,Params.Ambient);
        
    } else {
        if (Params.Ambient instanceof THREE.Color) {
            uniforms["ambient"].value = Params.Ambient;
    
        }
    }

    
    var material = new THREE.ShaderMaterial ({
        uniforms: uniforms,
        vertexShader: SR_ShaderLib.srphong.vertexShader,
        fragmentShader: SR_ShaderLib.srphong.fragmentShader,
        lights: true,
        fog: true
    });

    // var material = new THREE.ShaderMaterial ({
    //     uniforms: THREE.ShaderLib['phong'].uniforms,
    //     vertexShader: THREE.ShaderLib['phong'].vertexShader,
    //     fragmentShader: THREE.ShaderLib['phong'].fragmentShader,
    //     lights: true,
    //     fog: true
    // });
    
    material.envMap = true;
    material.map = Diffuse_MapInUse;
    material.specularMap = Specular_MapInUse;
    material.normalMap = NormalMap_MapInUse;
    
    material.transparent = true;
    
    
    
    material.bumpMap = true;
    
    return material;
}
