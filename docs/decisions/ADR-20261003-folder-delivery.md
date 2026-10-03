# ADR-20261003：以文件夹工具包交付项目启动协议

## Status

Accepted。2026-10-03 用户确认该交付方向并要求初版；具体协议内容仍可迭代。

## Context

初始化内容覆盖识别、项目记忆、任务恢复与 Git 安全。需要跨 Coding Agent 使用，且初始化后的项目不能依赖首个 Agent 的会话或工具包位置。

## Options Considered

- 单个自包含大型 Markdown：传递简单，但难以按阶段加载和维护。
- 文件夹工具包与单一入口：要求完整文件访问，可分别维护协议与模板。
- 原生 Skill：可接入特定工具，但带来安装和发现机制依赖。

## Decision

初版交付 `agent-project-bootstrap/`，以 `BOOTSTRAP.md` 为唯一 Agent 入口；包含按需协议与目标文件模板。首次显式执行后，目标项目保留自己的短 AGENTS 与记忆文件，不再依赖工具包。

## Rationale

保持一次启动的使用方式，避免一次加载所有内容，也避免用户手动协调多个 Prompt。跨工具能力由普通文件阅读与写入承载。

## Consequences

必须检查随包文件完整性、模板引用和生成后独立性。模板采用 `.md.template` 后缀。单文件版与 Skill 适配延后，不维护多套规则。

## Related Areas

`../../agent-project-bootstrap/`、`../design/delivery-options.md`、`../tasks/TASK-20261003-5de5ecfa19b3-bootstrap-prompt-design.md`。
