# Agent 项目启动协议

Agent Project Bootstrap（仓库名：`AgentBootstrapPrompt`）维护通用 Coding Agent 项目记忆与协作体系，并通过初始化工具包为新项目和已有项目建立这套体系。交付物由协议、模板和单一执行入口组成，不再是一份 Prompt。

**当前版本：v0.3.1，推送请求默认保存整个项目当前状态，仍处于试用与验证阶段。支持 GitHub 远程入口和本地文件夹。**

## 直接使用 GitHub 入口

将下面的指令交给能够联网读取文件并修改目标项目的 Agent，替换目标路径即可，无需手动下载：

```text
请读取并执行 https://raw.githubusercontent.com/yankee-007/AgentBootstrapPrompt/main/agent-project-bootstrap/BOOTSTRAP.md ，目标项目为 <目标项目路径>。
先将 main 解析为完整 commit SHA，重新读取该提交的入口，所有协议和模板都从同一提交获取。
保留目标项目既有规范和未提交修改；完成初始化后停止，不开始业务开发。
```

入口：[BOOTSTRAP.md](agent-project-bootstrap/BOOTSTRAP.md)。详细用法与离线备用方式见 [工具包说明](agent-project-bootstrap/README.md)。读取公开工具包不授权上传目标项目；目标项目初始化后不依赖本仓库。

需要固定当前交付版本时使用 [v0.3.1 固定入口](https://raw.githubusercontent.com/yankee-007/AgentBootstrapPrompt/4842e09a78f297040055b4945696ba194b305550/agent-project-bootstrap/BOOTSTRAP.md)。`main` 用于发现当前版本，执行时固定完整 SHA；依赖继续从同一 SHA 读取。历史 [v0.3.0 固定入口](https://raw.githubusercontent.com/yankee-007/AgentBootstrapPrompt/2f8570f9208d4f239a582c1b7d6b8bc4714658bb/agent-project-bootstrap/BOOTSTRAP.md)仍只对应原历史提交。

工具包包含来源读取、项目识别、记忆生成、Git 协议和目标文件模板，无安装器或 Skill 依赖，不自动执行。

## 名称与定位

- **Agent 项目启动协议**：初始化工具包的名称，通过 `BOOTSTRAP.md` 入口、按需协议和模板帮助 Coding Agent 建立目标项目的工作基础。
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

- [协作体系文件详解：各文件内容与中断后的检查方法](协作体系文件详解.md)
- [当前项目状态](PROJECT_CONTEXT.md)
- [活动任务](docs/tasks/README.md)
- [既有需求与结论](docs/design/requirements.md)
- [待审核的设计审查](docs/design/review.md)
- [优化清单与实施状态](docs/design/optimization-backlog.md)
- [交付形式建议](docs/design/delivery-options.md)
- [文档结构](docs/architecture.md)

## 已确认的交付方式

本仓库维护体系的设计、实现与验证记录，工具包组织在 `agent-project-bootstrap/` 文件夹内。GitHub 远程入口是主要获取方式，完整文件夹/ZIP 是离线备用；两者共享同一套协议和模板。`BOOTSTRAP.md` 统一协调初始化与 Git 工作。

首个 Agent 根据目标项目实际情况生成或补充短 `AGENTS.md`、项目上下文、任务索引和按需加载的协议。后续 Agent 读取目标仓库的入口，按需恢复项目记忆；不会自动加载入口的工具需要显式指定。

自包含单文件版与特定工具的 Skill 适配暂不交付。文件夹组织决策见 [ADR](docs/decisions/ADR-20261003-folder-delivery.md)，远程规则见 [来源协议](agent-project-bootstrap/protocols/source.md)，版本差异与升级见 [CHANGELOG](agent-project-bootstrap/CHANGELOG.md)。v0.3.1 的规则调整与交付见 [任务记录](docs/tasks/TASK-20261009-9ac64778a0c9-project-state-push.md)，历史核验记录见 [v0.3](docs/design/v0.3-validation.md)、[v0.2](docs/design/v0.2-validation.md) 和 [v0.1](docs/design/v0.1-validation.md)。

## 本项目的验证与 Git

当前是 Markdown 文档项目，无应用运行、依赖安装或构建步骤。验证内容为相对链接、文件职责、需求覆盖、示例一致性、状态真实性及 Git diff 检查。

v0.2.0 已完成结构与远程取读核验；[Luna 同机受控接力实验](docs/experiments/luna-handoff-20261004.md)发现生成协议裁剪丢失任务规范。v0.3.0 定义不可裁剪语义并检查实际输出，同时补齐恢复摘要、策略优先级和部分初始化恢复。实际生成/接手检查见本版本核验记录；随机崩溃、跨电脑与不同产品自动加载仍未验证，初步完成不等于全面验收。

本地分支为 `main`，连接 [GitHub 仓库](https://github.com/yankee-007/AgentBootstrapPrompt)。2026-10-09 用户要求推送保存整个项目当前状态：收到推送请求后，包含已有修改、项目记忆、任务文件及未忽略的新文件，未完成或未验收内容也可备份，不以测试和人工验收通过为门槛。沿用已确认目标，保留必要的凭据保护和正常 Git 操作边界，具体见 [项目策略](docs/agent/policy.md) 和 [Git 协议](docs/agent/git.md)。实际交付状态查询 Git。
