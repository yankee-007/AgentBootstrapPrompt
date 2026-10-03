# 当前项目上下文

## 项目目标

设计成熟、通用、低上下文成本的 Coding Agent Project Bootstrap Prompt。面向不同 Coding Agent、新旧软件项目、任务中断、多电脑接力和按需并行开发。

## 当前状态

- 已接收用户此前讨论的背景，并完成第一轮继续审查。
- 用户已要求初始化本项目，以继续共同讨论。
- 当前维护需求摘要、审查建议、项目工作协议及初版交付包。
- 用户已确认文件夹工具包和单一入口方式，并要求初始交付。
- 当前版本 v0.2.0 位于 `agent-project-bootstrap/`，入口为 `BOOTSTRAP.md`；支持 GitHub 远程读取和本地模式。远程执行固定完整 SHA 后按需加载同版本文件，目标项目生成后独立于工具包。
- 用户已要求实现远程交付并上传现有仓库；仓库已确认公开，无需新建或改变可见性。
- 初版可供试用，不代表所有默认策略已逐项验收或已完成跨 Agent 运行验证；单文件版与 Skill 适配暂缓。

## 项目形态

- 技术形态：Markdown 文档项目，无业务代码或应用依赖。
- 持久化：工作目录内的文档与本地 Git 历史；远端同步需另有授权。
- 文档关系见 `docs/architecture.md`。

## 已确认的约束

- 延续已有设计，不从零重建；当前已获初版生成授权，后续按用户反馈迭代，不把初版宣称为最终定稿。
- 默认 Single-Agent，Repository Memory 与 Session Working Memory 分离。
- AGENTS 保持短小，Current State、架构、ADR、任务记录职责分离。
- Bootstrap 只建立工程和上下文基础，不顺手实现业务功能，完成后停止。
- 保护已有脏工作区，Git 与 GitHub 解耦，不自动上传未知范围。

## 待解决问题

- 审核 `docs/design/review.md` 中的状态模型、恢复协议与授权边界。
- 试用初版默认配置、轻量任务路径与生成文件规模。
- 在真实新旧项目和不同 Agent 上验证行为；核验范围见 `docs/design/v0.2-validation.md`，历史初版记录见 `docs/design/v0.1-validation.md`。

## 当前任务

`docs/tasks/TASK-20261003-5de5ecfa19b3-bootstrap-prompt-design.md`

任务文件保存具体进度；本文件不重复记录每次讨论过程。提交及远端状态应查询 Git，不从本文推断。
