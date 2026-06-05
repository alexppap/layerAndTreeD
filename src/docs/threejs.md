# Three.js 集成

LayerAndTreeD 基于 Three.js 构建三维可视化引擎，支持模型加载、PBR 材质与实时光照。

## 初始化场景

```ts
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

## 加载模型

### glTF 模型

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('/models/factory.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

### 材质与光照

使用平行光与环境光组合以获得稳定的 PBR 表现：

```ts
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const directional = new THREE.DirectionalLight(0x00d4ff, 1);
directional.position.set(5, 10, 7);
scene.add(ambient, directional);
```

## 相机控制

```ts
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
```

## 渲染优化

- 使用 `shallowRef` 持有场景对象，避免深度响应
- 对大型模型启用 LOD 与视锥体剔除
- 通过 `requestAnimationFrame` 统一驱动渲染循环
