import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  ShaderMaterial,
  Color4,
} from "@babylonjs/core";

// 画布
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// 引擎与场景
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
scene.clearColor = new Color4(0.1, 0.1, 0.15, 1);

// 轨道相机（鼠标拖拽旋转/缩放）
const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 3, 6, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// 半球光
new HemisphericLight("light", new Vector3(0, 1, 0), scene);

// 立方体（默认材质，作对照）
const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
box.position.y = 1.2;

// ===== 自定义着色器：波浪地面 =====
const waveVertexSource = `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;
  uniform mat4 worldViewProjection;
  uniform float time;
  varying vec2 vUV;
  varying vec3 vNormal;
  void main() {
    vUV = uv;
    vNormal = normal;
    vec3 pos = position;
    // 顶点波浪位移：x/z 方向双正弦叠加，time 驱动动画
    float wave = sin(pos.x * 3.0 + time * 2.0) * 0.15
               + cos(pos.z * 3.0 - time * 1.5) * 0.15;
    pos.y += wave;
    gl_Position = worldViewProjection * vec4(pos, 1.0);
  }
`;

const waveFragmentSource = `
  precision highp float;
  varying vec2 vUV;
  varying vec3 vNormal;
  uniform float time;
  void main() {
    // 基于 UV 的三通道波纹颜色，time 驱动流动
    float r = 0.5 + 0.5 * sin(vUV.x * 20.0 + time * 2.0);
    float g = 0.5 + 0.5 * cos(vUV.y * 20.0 + time * 2.0);
    float b = 0.5 + 0.5 * sin((vUV.x + vUV.y) * 12.0 - time);
    // 蓝紫底 + 暖色高光混合，突出波纹
    vec3 color = mix(vec3(0.15, 0.25, 0.7), vec3(0.9, 0.4, 0.15), r * 0.4 + 0.2);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const waveMaterial = new ShaderMaterial(
  "waveShader",
  scene,
  { vertexSource: waveVertexSource, fragmentSource: waveFragmentSource },
  {
    attributes: ["position", "normal", "uv"],
    uniforms: ["worldViewProjection", "time"],
  }
);

// 高细分地面网格，顶点越多波浪越平滑
const ground = MeshBuilder.CreateGround("waveGround", { width: 10, height: 10, subdivisions: 128 }, scene);
ground.material = waveMaterial;
ground.position.y = -1.5;

// 渲染循环：更新 time uniform 驱动着色器动画
let time = 0;
engine.runRenderLoop(() => {
  time += 0.016;
  waveMaterial.setFloat("time", time);
  box.rotation.y += 0.01;
  scene.render();
});

// 窗口尺寸自适应
window.addEventListener("resize", () => engine.resize());
