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

### 分支命名规范

- **分支名 = ticket 名**：分支名与 Issue 标题（英文 slug）相同，例如 ticket `orbit-camera-interaction` → 分支 `orbit-camera-interaction`
- **多分支后缀**：一个 ticket 需要多个分支时，从第二个起加 `-[number]`：`orbit-camera-interaction-2`、`orbit-camera-interaction-3`
- **分支 ↔ PR 一对一**：每个分支对应一个 PR，PR 合并回 `develop` 后删除该分支
- work tree 目录名 = 分支名（`git worktree add ../<分支名> -b <分支名>`）

约定：
- 版本发布时 `product` 打 tag（如 `v1.0.0`）

## 开发流程

### Ticket 管理（单人 Jira 式）

任务与进度用 GitHub Issues 管理，知识沉淀在本地 `../personal/tickets/`（repo 之外）。

**Issue 规则**

- 每个开发功能/实验 = 一个 Issue（ticket），粒度：可独立完成、可验证
- **Labels** 主题分类：

| Label | 主题 |
| --- | --- |
| `interaction` | 交互操作 |
| `shader-vfx` | 着色器与视觉效果 |
| `model-animation` | 模型加载与动画 |
| `performance` | 性能优化 |
| `infra` | 脚手架/工程配置 |
| `docs` | 文档 |

- **Milestone** 按月：`2024-08`、`2024-09` …
- **看板**（GitHub Projects）：[Graphics-dev-table](https://github.com/users/CoCoCoDeDeDe/projects/3)，列：Todo → In Progress → Done

**开发与关联**

1. 在分支名 = ticket 名的 work tree 分支上开发（多分支加 `-[number]` 后缀）
2. 开发完成后推送分支，开 **PR**（分支 ↔ PR 一对一），PR 合并回 `develop` 后删除分支
3. 提交信息写 `fixes #<编号>` 自动关联并关闭 ticket（PR 描述同样可写）
4. 每个 ticket 在本地 `tickets/<issue编号>-<slug>/` 记录知识沉淀（模板：`../personal/tickets/_template/`）

## 开发

（待初始化：`npm install` / `npm run dev`）
