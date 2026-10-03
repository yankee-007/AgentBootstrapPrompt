# 当前文档架构

本项目维护已初步完成的项目记忆与协作体系及初始化工具包，是 Markdown 协议、模板与验证记录仓库，没有 UI、后端、数据库或构建流水线。以下描述当前结构。

## 工作规则与项目状态

- `AGENTS.md`：本项目 Agent 的短入口和常驻约束。
- `PROJECT_CONTEXT.md`：项目当前目标、形态、约束和未决事项。
- `README.md`：面向人的项目说明和导航。
- `docs/agent/policy.md`：本仓库的有效策略，不等同于目标项目的默认策略。
- `docs/agent/workflow.md`：本仓库设计、验证与迭代任务的跟踪和交接方式。
- `docs/agent/git.md`：本仓库 Git 安全工作约定。

## 设计材料

- `docs/design/requirements.md`：从用户交接材料提炼的既有需求和结论。
- `docs/design/review.md`：第一轮继续审查的问题与建议，未审核项不视为用户决定。
- `docs/design/delivery-options.md`：已确认的文件夹交付方式及使用边界。
- `docs/design/v0.1-validation.md`：初版结构验证与场景审查的范围和局限。
- `docs/design/v0.2-validation.md`：远程交付版本的结构验证及在线取读验证方法。
- `docs/experiments/luna-handoff-20261004.md`：Luna 本地受控中断接力的实际结果、限制和待审核建议。

## 独立交付包

- `agent-project-bootstrap/README.md`：给人的使用说明。
- `agent-project-bootstrap/BOOTSTRAP.md`：首个 Agent 的唯一执行入口。
- `agent-project-bootstrap/protocols/`：初始化期间按需读取的来源、发现、记忆和 Git 协议。
- `agent-project-bootstrap/templates/`：生成到目标项目的长期记忆模板，使用 `.md.template` 后缀避免自动发现。
- `artifacts/`：本地生成的 ZIP 交付副本，不进入 Git；以工具包源文件为准。

## 任务与决策

- `docs/tasks/README.md`：当前版本可见的活动任务导航。
- `docs/tasks/TASK-*.md`：每个复杂任务的可恢复状态。
- `docs/decisions/README.md`：ADR 门槛和索引，当前包含文件夹交付决策。

## 信息流

用户讨论与澄清 → 更新需求或审查结论 → 按授权修改工具包并验证 → 更新当前任务 → 有长期影响时更新项目上下文或建立 ADR。仅更新本项目记忆时，不重新初始化本仓库或改动目标模板。

v0.2.0 以 GitHub 固定提交取读为主要获取方式，完整文件夹/ZIP 作为离线备用，目标项目生成后不依赖本仓库。当前没有自动拼装、Skill 安装或后台同步机制。
