# 任务分支与 worktree 动画演示

React + TypeScript + Remotion 制作的 64 秒中文演示，展示 A 先开始、B 后加入、B 先集成、A 再集成与收尾清理。默认暂停，可播放、拖动进度、调整速度或按章节跳转；同时支持导出 MP4。

## 本地运行

```powershell
cd demos/task-worktree-remotion
npm ci
npm run dev
```

打开本机 `http://127.0.0.1:4173`。网页播放器与视频导出复用同一个动画组件，动画由帧数确定，没有外部图片、音频或字体下载依赖。

## 检查与导出

```powershell
npm run check
npm run build
npm run render
```

导出文件为 `out/task-worktree-demo.mp4`，1600 × 900、30 fps、64 秒，无音轨，画面包含解释文字。需要使用 Remotion Studio 编辑时运行 `npm run studio`。

首次渲染可能需要下载 Remotion 的浏览器运行环境。依赖、构建结果与渲染文件不纳入 Git；源码、锁文件和说明可随项目取得。本演示独立于 Bootstrap 工具包，不会安装到目标项目。

## 演示边界

这是概念流程动画，不执行真实 Git 操作，也不是多 Agent 并发可靠性的验证证据。main 历史表示 squash 后的成果提交；任务内部提交、长期历史引用及未保存内容在清理前需另行核验。两个任务在本例中独立，依赖与冲突仍按实际项目处理。

## 实现参考

- [Remotion Player](https://www.remotion.dev/docs/player/player)
- [Remotion 帧驱动动画](https://www.remotion.dev/docs/animating-properties)
- [Remotion 视频导出](https://www.remotion.dev/docs/cli/render)
