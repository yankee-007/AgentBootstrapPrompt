# 通用 Coding Agent Project Bootstrap Prompt

本项目用于设计一份可适配新项目和已有项目的通用初始化 Prompt，支持项目记忆、任务恢复、跨 Agent 接力与安全的 Git 工作流。

**当前阶段：设计讨论，尚无最终 Bootstrap Prompt。**

## 核心方向

- Repository as Persistent Memory + Session as Working Memory。
- 使用 Task Registry + Per-Task Handoff 管理复杂任务。
- 默认单 Agent；显式并行时隔离工作区。
- Git 本地版本控制与可选远端服务解耦。
- 按需加载、职责分离，避免重复和过期文档。

## 从哪里继续

- [当前项目状态](PROJECT_CONTEXT.md)
- [活动任务](docs/tasks/README.md)
- [既有需求与结论](docs/design/requirements.md)
- [待审核的设计审查](docs/design/review.md)
- [交付形式建议](docs/design/delivery-options.md)
- [文档结构](docs/architecture.md)

## 推荐的交付方式（待定稿）

本仓库分文件维护设计；对普通使用者，建议最终交付一份自包含的 `BOOTSTRAP.md`。它应包含必要规则、生成要求和精简模板，不依赖本仓库中的未随附文件。

用户将其交给第一个 Agent 后，该 Agent 在目标项目中生成短 `AGENTS.md`、项目上下文、任务索引和按需加载的协议。后续 Agent 读取目标仓库的入口，无需反复接收完整初始化 Prompt。

模块化文件包可作为后续可选交付形式。当前仓库尚未创建上述最终交付物。

## 本项目的验证与 Git

当前是 Markdown 文档项目，无应用运行、依赖安装或构建步骤。验证内容为相对链接、文件职责、需求覆盖、示例一致性、状态真实性及 Git diff 检查。

本地 Git 已初始化，分支为 `main`，并已连接用户提供的 [GitHub 仓库](https://github.com/yankee-007/AgentBootstrapPrompt)。用户已授权推送本次初始化内容。提交使用用户提供的身份，SSH 私钥保留本机，上传前核验连接和内容。具体策略见 [项目策略](docs/agent/policy.md)，实际交付状态查询 Git。
