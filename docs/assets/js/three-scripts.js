import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector('#terminal');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 35;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 9, 15);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();
  controls.rotateSpeed = 0.4;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;

  // stop autorotate after the first interaction
  controls.addEventListener('start', function(){
    controls.autoRotate = false;
  });

  // restart autorotate after the last interaction & an idle time has passed
  controls.addEventListener('end', function(){
    controls.autoRotate = true;
  });

  const scene = new THREE.Scene();

  //renderer.setClearColor( 0xffffff, 0);
  //scene.background = null;
  //scene.background = new THREE.Color('white');

  scene.background = new THREE.Color('#290000');
  var lightHolder = new THREE.Group();

  {
    const color_pink = 0xfc70cb; //252 112 204 / #fc70cb
    const intensity = 2;
    const light_pink = new THREE.SpotLight(color_pink, intensity);
    //const light_pink = new THREE.DirectionalLight(color_pink, intensity);
    light_pink.position.set(500, 200, 200); // x y z . x=LR, y=UD,  //Light source

    //light_pink.target.position.set( -500, 0, 600 ); //Light target
    light_pink.target.updateMatrixWorld(); //Update light to add target

    //scene.add(light_pink);
    lightHolder.add(light_pink); //Add to a group so it can be fixed.
    scene.add(lightHolder);

    /*const helper = new THREE.DirectionalLightHelper( light_pink, 200 ); //Make sure you can see the whole rectangle
    scene.add( helper );*/

    /*const helper = new THREE.SpotLightHelper( light_pink, 50 ); //Make sure you can see the whole rectangle
    scene.add( helper );*/

  }

/*

AmbientLight
AmbientLightProbe
DirectionalLight
HemisphereLight
HemisphereLightProbe
Light
LightProbe
PointLight
RectAreaLight
SpotLight

*/

  {
    const color_blue = 0x1CA7FB; //0x39c2f8; //252 112 204 / #fc70cb // 28 167 251
    const intensity = 2;
    const light_blue = new THREE.SpotLight(color_blue, intensity);
    //const light_blue = new THREE.DirectionalLight(color_blue, intensity);
    light_blue.position.set(-500, 0, 400); // x y z . x=LR, y=UD,  //Light source

    //light_blue.target.position.set( 500, 0, 600 ); //Light target
    light_blue.target.updateMatrixWorld(); //Update light to add target

    //scene.add(light_blue.target);
    lightHolder.add(light_blue); //Add to a group so it can be fixed.
    scene.add(lightHolder);

    /*const helper = new THREE.SpotLightHelper( light_blue, 200 ); //Make sure you can see the whole rectangle
    scene.add( helper );*/

  }


  {
    //Fog Effect
    const color = 0xFFFFFF;
    const density = 0.0095;
    //scene.fog = new THREE.FogExp2(color, density);
  }

  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(200.5, -20.75, -2.5)) // x y z
        //.multiply(new THREE.Vector3(-6.5, -1.75, 1)) // x y z
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {
    const gltfLoader = new GLTFLoader();
    //gltfLoader.load('./computer_terminal/scene.gltf', (gltf) => {
    //gltfLoader.load('./terminal/scene.gltf', (gltf) => {
    gltfLoader.load('../assets/3d/ibm_3277_terminal/scene.gltf', (gltf) => {
    //gltfLoader.load('./ibm_3278_terminal/scene.gltf', (gltf) => {

      const root = gltf.scene;
      scene.add(root);

      //The X axis is red. The Y axis is green. The Z axis is blue.
      /*const axesHelper = new THREE.AxesHelper( 50000 );
      scene.add( axesHelper );*/

      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      //frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
      frameArea(boxSize * 1, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);

      controls.update();
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    // if (needResize) {
    //   renderer.setSize(width, height, false);
    // }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //camera.updateProjectionMatrix();
    }

    //renderer.physicallyCorrectLights = true

    renderer.render(scene, camera);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    lightHolder.quaternion.copy(camera.quaternion); //This keep the light position static. https://jsfiddle.net/prisoner849/xnh9pyd0/

    controls.update();

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
