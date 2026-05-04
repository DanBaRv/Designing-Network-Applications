import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const renderModel = (modelData, canvas) => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 1, 3);

  scene.add(new THREE.AmbientLight(0xffffff, 2));
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);

  const loader = new GLTFLoader();

  const onLoad = (gltf) => {
    const obj = gltf.scene;
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    obj.position.x -= center.x;
    obj.position.y -= box.min.y;
    obj.position.z -= center.z;
    const maxDim = Math.max(size.x, size.y, size.z);
    obj.scale.setScalar(0.9 / maxDim);
    scene.add(obj);

    const animate = () => {
      requestAnimationFrame(animate);
      obj.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  };

  if (typeof modelData === "string") {
    loader.load(modelData, onLoad);
  } else {
    loader.parse(modelData, "", onLoad);
  }
};
