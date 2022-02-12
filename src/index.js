import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RommEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let mixer

const clock = new THREE.Clock()
const container = document.getElementById('container');

const stats = new Stats();
container.appendChild(stats.dom)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild( renderer.domElement );

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd)
// scene.environment = pmremGenerator.fromScene(new RommEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100);
camera.position.set(5,2,8);

// const controls = new OrbitControls(camera, renderer.domElement);
// constrols.target.set(0, 0.5, 0);
// controls.update();
// controls.enablePan = false;
// controls.enableDamping = true;

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath()

const loader = new GLTFLoader();
loader.load('./asset/XYZ_threeJS_AMPMan.gltf', function(gltf){
    console.log(gltf)
    const model = gltf.scene;
    model.position.set(5,1,0);
    model.scale.set(0.01, 0.01, 0.01)
    scene.add(model)
    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();
}, undefined, function(error){
    console.error(error)
})

function animate(){
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    mixer.update(delta);
    // controls.update();
    stats.update()
    renderer.render(scene, camera)
}


