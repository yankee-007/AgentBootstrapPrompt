# 当前文档架构

本项目维护已初步完成的项目记忆与协作体系及初始化工具包，主体是 Markdown 协议、模板与验证记录。另有独立的 React + TypeScript / Remotion 辅助演示，没有业务后端、数据库或部署流水线。以下描述当前结构。

## 工作规则与项目状态

- `AGENTS.md`：本项目 Agent 的短入口和常驻约束。
- `PROJECT_CONTEXT.md`：项目当前目标、形态、约束和未决事项。
- `README.md`：面向人的项目说明和导航。
- `协作体系文件详解.md`：面向使用者的文件职责、完整结构和中断后的检查方法；解释性说明，不新增执行规则。
- `docs/agent/policy.md`：本仓库的有效策略，不等同于目标项目的默认策略。
- `docs/agent/workflow.md`：本仓库设计、验证与迭代任务的跟踪和交接方式。
- `docs/agent/git.md`：本仓库 Git 安全工作约定。

## 设计材料

- `docs/design/requirements.md`：从用户交接材料提炼的既有需求和结论。
- `docs/design/review.md`：第一轮继续审查的问题与建议，未审核项不视为用户决定。
- `docs/design/optimization-backlog.md`：多角度优化分析、状态、验证缺口和下一轮接手清单；不构成执行指令。
- `docs/design/delivery-options.md`：历史交付形式讨论；当前按用户要求仅通过 GitHub 入口交付。
- `docs/design/v0.1-validation.md`：初版结构验证与场景审查的范围和局限。
- `docs/design/v0.2-validation.md`：远程交付版本的结构验证及在线取读验证方法。
- `docs/design/v0.3-validation.md`：v0.3.0 最低语义、策略、生成与恢复验证的实际结果及边界。
- `docs/design/student-management-memory-diff-20261010.md`：StudentManagement 与 v0.4.0 的只读差异分析，区分来源一致、既有策略保留和旧流程差异；建议不构成目标项目执行规则。
- `docs/experiments/luna-handoff-20261004.md`：Luna 本地受控中断接力的实际结果、限制和待审核建议。

## 独立交付包

- `agent-project-bootstrap/README.md`：给人的使用说明。
- `agent-project-bootstrap/CHANGELOG.md`：版本变更、固定来源与明确升级方式。
- `agent-project-bootstrap/BOOTSTRAP.md`：首个 Agent 的唯一执行入口。
- `agent-project-bootstrap/protocols/`：初始化期间按需读取的来源、发现、记忆和 Git 协议。
- `agent-project-bootstrap/templates/`：生成到目标项目的长期记忆模板，使用 `.md.template` 后缀避免自动发现。

## 辅助演示

- `demos/task-worktree-remotion/`：独立 React + TypeScript / Remotion 项目，网页播放器和 MP4 导出复用同一个帧驱动动画组件。展示任务 A 先开始、任务 B 后加入、不同工作区修改同名文件、串行 squash 和清理。
- 依赖、构建结果和视频产物按忽略规则保留本地；源码、锁文件及运行说明纳入 Git。演示不执行真实 Git 操作，不作为真实并发验证，也不进入 Bootstrap 生成结果。

## 任务与决策

- `docs/tasks/README.md`：当前版本可见的活动任务导航。
- `docs/tasks/TASK-*.md`：每个复杂任务的可恢复状态。
- `docs/decisions/README.md`：ADR 门槛和索引，保留文件夹组织的历史决策；当前交付方式以有效项目策略为准。

## 信息流

用户讨论与澄清 → 更新需求或审查结论 → 按授权修改工具包并验证 → 更新当前任务 → 有长期影响时更新项目上下文或建立 ADR。仅更新本项目记忆时，不重新初始化本仓库或改动目标模板。

v0.4.0 仅通过 GitHub 固定提交取读交付，保留最低语义检查及合并职责映射；后续独立修改任务默认分支/worktree，集成分支仅接收成果、串行 squash，并区分任务备份与集成。目标项目生成后不依赖本仓库。当前没有离线 ZIP、自动拼装、Skill 安装、执行层锁或后台合并/同步机制。
