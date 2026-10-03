# Agent 项目启动协议

Agent Project Bootstrap（仓库名：`AgentBootstrapPrompt`）用于设计一份可适配新项目和已有项目的通用初始化 Prompt，为目标项目建立项目记忆与协作体系。

**当前阶段：已提供 v0.1.0 文件夹工具包初版，等待试用和继续迭代。**

## 初版交付

主要交付物为 [agent-project-bootstrap 工具包](agent-project-bootstrap/README.md)，首个 Agent 的唯一入口是 [BOOTSTRAP.md](agent-project-bootstrap/BOOTSTRAP.md)。请提供完整文件夹及目标项目位置，不只发送入口文件。

初版包含项目识别、记忆生成、Git 协议和目标文件模板，无安装器或 Skill 依赖。它不自动执行，目标项目完成初始化后也不依赖原工具包。

## 名称与定位

- **Agent 项目启动协议**：本项目的名称，通过初始化 Prompt 帮助 Coding Agent 建立目标项目的工作基础。
- **项目记忆与协作体系**：初始化后建立的机制，日常简称“项目记忆”。它涵盖项目上下文、设计决策、任务进度、中断恢复、跨 Agent 交接，以及工作规则、验证要求与 Git 协作。

“项目持久化”只表达信息保存，不能完整描述上述职责，因此统一使用“项目记忆与协作体系”来称呼这套机制。

> 执行“Agent 项目启动协议”，建立目标项目的“项目记忆与协作体系”。

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

## 已确认的交付方式

本仓库分文件维护设计，主要交付一个完整的 `agent-project-bootstrap/` 文件夹。`BOOTSTRAP.md` 统一协调随包协议与模板，用户无需分别执行初始化 Prompt 和 Git Prompt。

首个 Agent 根据目标项目实际情况生成或补充短 `AGENTS.md`、项目上下文、任务索引和按需加载的协议。后续 Agent 读取目标仓库的入口，无需反复接收完整初始化 Prompt；不会自动加载入口的工具需要显式指定。

自包含单文件版与特定工具的 Skill 适配暂不交付。完整决策见 [ADR](docs/decisions/ADR-20261003-folder-delivery.md)。验证范围见 [初版核验记录](docs/design/v0.1-validation.md)。

## 本项目的验证与 Git

当前是 Markdown 文档项目，无应用运行、依赖安装或构建步骤。验证内容为相对链接、文件职责、需求覆盖、示例一致性、状态真实性及 Git diff 检查。

本地 Git 已初始化，分支为 `main`，并已连接用户提供的 [GitHub 仓库](https://github.com/yankee-007/AgentBootstrapPrompt)。用户已授权推送本次初始化内容。提交使用用户提供的身份，SSH 私钥保留本机，上传前核验连接和内容。具体策略见 [项目策略](docs/agent/policy.md)，实际交付状态查询 Git。
