# 当前文档架构

本项目是文档设计与交付仓库，没有 UI、后端、数据库或构建流水线。以下描述当前结构。

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
- `docs/design/delivery-options.md`：已确认的文件夹交付方式及使用边界。
- `docs/design/v0.1-validation.md`：初版结构验证与场景审查的范围和局限。

## 独立交付包

- `agent-project-bootstrap/README.md`：给人的使用说明。
- `agent-project-bootstrap/BOOTSTRAP.md`：首个 Agent 的唯一执行入口。
- `agent-project-bootstrap/protocols/`：初始化期间按需读取的发现、记忆和 Git 协议。
- `agent-project-bootstrap/templates/`：生成到目标项目的长期记忆模板，使用 `.md.template` 后缀避免自动发现。
- `artifacts/`：本地生成的 ZIP 交付副本，不进入 Git；以工具包源文件为准。

## 任务与决策

- `docs/tasks/README.md`：当前版本可见的活动任务导航。
- `docs/tasks/TASK-*.md`：每个复杂任务的可恢复状态。
- `docs/decisions/README.md`：ADR 门槛和索引，当前包含文件夹交付决策。

## 信息流

用户讨论与澄清 → 更新需求或审查结论 → 更新当前任务 → 有长期影响时更新项目上下文或建立 ADR。

v0.1.0 工具包按文件夹交付，目标项目生成后不依赖本仓库。当前没有自动拼装、发布、Skill 安装或后台同步机制。
