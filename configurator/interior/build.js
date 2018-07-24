/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var scene, camera, renderer;
var controls;
var textureCubeBlur;
var mouse = new THREE.Vector2(),
    INTERSECTED;

init();
animate();

function init() {
    var container = document.getElementById('container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -0.1;
    camera.position.y = 0;
    camera.position.x = 0;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.add(camera);

    createModels();
}

function createModels() {

    var path = "../../res/textures/cube/interior/";
    var urls = [path + "px.jpg", path + "nx.jpg", path + "py.jpg", path + "ny.jpg", path + "pz.jpg", path + "nz.jpg"];

    var textureCube = new THREE.CubeTextureLoader().load(urls);
    scene.background = textureCube;
}

function toRadian(degree) {
    return degree * Math.PI / 180;
}

function animate(time) {

    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
}

function StopWatch(dur, start, to) {
    var startTime = +Date.now();
    var currentTime = 0;
    var range = to - start;
    var lastTime = +Date.now() / 1000;
    return function (time) {
        time = +Date.now() / 1000;
        var delayTime = time - lastTime;
        currentTime = currentTime + delayTime;
        if (dur < currentTime) return undefined;

        var radtio = currentTime / dur;
        lastTime = time;
        return range * radtio;
    };
}

/***/ })

/******/ });