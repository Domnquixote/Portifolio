// import './style.css'
import * as THREE from './modules/three/build/three'
import  OrbitControls  from './modules/three/examples/jsm/controls/OrbitControls.js'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import  GLTFLoader  from './modules/three/examples/jsm/loaders/GLTFLoader.js'
import Stats from './modules/three/examples/jsm/libs/stats.module.js'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight( 0xffffff , 0.4)
light.position.set(1.5, 1.0, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x404040 )
scene.add(ambientLight)



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0.4, 0.4, 0.4)

const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(new THREE.Color("#101010"),1);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.1, 0)

let loader = new GLTFLoader();

loader.load('/3d/source/Pato_Programador.glb',function(gltf){
  scene.add(gltf.scene);
})

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function star(){
    
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const geometry = new THREE.SphereGeometry(0.1, 12, 12);
    const geometry2 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({color: "#" + randomColor ,emissive: "#" + randomColor})
    const star = new THREE.Mesh(geometry, material);
    const star2 = new THREE.Mesh(geometry2, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z);
    star2.position.set(x,y,z);
    scene.add(star, star2)
}



Array(400).fill().forEach(star)

function render() {
    renderer.render(scene, camera)
}

animate()


// import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
