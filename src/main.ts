import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
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

// 立方体网格
const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);

// 渲染循环
engine.runRenderLoop(() => {
  box.rotation.y += 0.01;
  scene.render();
});

// 窗口尺寸自适应
window.addEventListener("resize", () => engine.resize());
