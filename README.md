# Graphics

3D 渲染与交互技术学习项目。

## 技术栈

- **主引擎**：[Babylon.js](https://www.babylonjs.com/)（WebGL 为主）
- **构建工具**：Vite + npm
- **前沿方向**：WebGPU（打好 WebGL 基础后再探索）

## 分支设计

三环境模型，GitHub 默认分支为 `develop`：

```
side worktree 分支 ──(并行开发)──┐
                                ▼
            ┌─── develop ◄── 日常开发集成分支（默认分支）
            │
            ▼
         staging ◄── 预发布/验收
            │
            ▼
         product ◄── 生产发布（tag 打版本）
```

| 分支 | 职责 | 合并来源 |
| --- | --- | --- |
| `develop` | 日常开发集成分支（默认分支） | side worktree 分支 |
| `staging` | 预发布/验收 | develop |
| `product` | 生产发布 | staging |

约定：
- 功能开发在 `graphics-side-<n>` work tree 中进行（分支名与目录同名），完成后合并回 `develop`
- 版本发布时 `product` 打 tag（如 `v1.0.0`）

## 开发

（待初始化：`npm install` / `npm run dev`）
