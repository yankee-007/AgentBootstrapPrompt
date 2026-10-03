# 当前文档架构

本项目是文档设计仓库，没有 UI、后端、数据库或构建流水线。以下描述当前已有结构，不假设尚未实现的打包工具。

## 工作规则与项目状态

- `AGENTS.md`：本项目 Agent 的短入口和常驻约束。
- `PROJECT_CONTEXT.md`：项目当前目标、形态、约束和未决事项。
- `README.md`：面向人的项目说明和导航。
- `docs/agent/policy.md`：本仓库的有效策略，不等同于将来产品的默认策略。
- `docs/agent/workflow.md`：本仓库设计任务的跟踪、交接和验证方式。
- `docs/agent/git.md`：本仓库 Git 安全工作约定。

## 设计材料

- `docs/design/requirements.md`：从用户交接材料提炼的既有需求和结论。
- `docs/design/review.md`：第一轮继续审查的问题与建议，未审核项不视为用户决定。
- `docs/design/delivery-options.md`：单文件与模块包交付的取舍，当前为建议。

## 任务与决策

- `docs/tasks/README.md`：当前版本可见的活动任务导航。
- `docs/tasks/TASK-*.md`：每个复杂任务的可恢复状态。
- `docs/decisions/README.md`：ADR 门槛和索引；尚无正式 ADR。

## 信息流

用户讨论与澄清 → 更新需求或审查结论 → 更新当前任务 → 有长期影响时更新项目上下文或建立 ADR。

最终 Prompt 与模块包尚未生成。未来交付物的建议见 `docs/design/delivery-options.md`；当前没有自动拼装、发布或同步机制。
