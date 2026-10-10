# StudentManagement 项目记忆与 Bootstrap v0.4.0 差异报告

核对日期：2026-10-10（Asia/Shanghai）。本报告记录一次只读分析的固定快照，后续文件与 Git 状态可能变化。

适用范围：目标项目的项目记忆文档与相关 Git 历史；不评估业务实现，不执行初始化或升级。本文的解释和建议不是目标项目的新执行规则，也不表示用户已接受策略变更。

## 1. 分析结论

StudentManagement 的项目记忆已实际升级到 Bootstrap v0.4.0，来源与本次核对的最新本地工具包内容一致。差异集中在三项既有策略、一个旧推送流程，以及项目自身的业务约束和后续适配；未发现新版最低语义大面积缺失。

三项策略虽然只占 9 项配置中的 3 项，却影响独立任务是否使用 worktree、成果如何进入主线、何时允许自动推送，不能因数量少而认为影响小。协议版本更新与切换新版默认工作方式是两个不同结果。

Agent 的升级记录明确保留旧策略，这符合工具包的既有规则优先条款。若用户期望升级同时切换为新版默认行为，现有结果尚未达到这一层预期；仅凭项目中的任务摘要，无法确认用户原始指令是否明确要求替换这些策略。

## 2. 核对对象与版本证据

| 对象 | 本次固定状态 | 核对结果 |
| --- | --- | --- |
| 工具包维护仓库 AgentBootstrapPrompt | `44f4a1b35bc0edee6f92eaa0e0bf3bfff7bac062`，main | 工具包版本 v0.4.0；磁盘工具包文件与该提交一致 |
| StudentManagement | `d2025f737e8978df5fd5c0657b96f02eac56e098`，main | 核对时工作区干净；全程只读 |
| 目标项目记录的工具包来源 | `80ab20527d75158eaf0b414b38d4784708302e4a` | `docs/agent/policy.md` 第 3–5 行明确记录 v0.4.0、完整 SHA 和升级日期 |
| 目标项目的升级提交 | `0a01fd8e968996d95fa81fd229a1da97eafb19d9`，2026-10-10 16:29:11 +08:00 | 提交信息为项目记忆升级至 Bootstrap 0.4.0；是目标项目当前 HEAD 的祖先 |
| 工具包内容比较 | 上述来源提交与维护仓库核对基线 | `agent-project-bootstrap/` 的 Git tree 均为 `f6aa5b5c672fc2109db4b1cffbd3fdc033e41016`，17 个文件完全一致 |

来源提交与维护仓库 HEAD 的 SHA 不同，是因为后续有交付记录和辅助演示提交；工具包目录内容相同，不能据此判断使用了旧工具包。

升级提交实际修改 8 个既有文档、删除根目录 `HANDOFF.md`、新增升级 Task，共 10 个文件，165 行增加、38 行删除。这是实际文档更新，不只是修改版本号。本文不把代码行数当作升级质量或规则覆盖率。

本次未查询 StudentManagement 远端，因此不判断其当前本地 HEAD 是否已上传 GitHub。报告中的目标项目路径均相对于该项目仓库，须取得对应提交后核对，不依赖初始化 Agent 的私有会话。

## 3. 九项有效策略对照

对照来源为 [v0.4.0 策略模板](../../agent-project-bootstrap/templates/docs/agent/policy.md.template) 与目标项目 `docs/agent/policy.md` 的有效策略表。

| 配置 | v0.4.0 默认值 | StudentManagement 生效值 | 结果 |
| --- | --- | --- | --- |
| GIT_POLICY | detect-and-init | detect-and-init | 相同 |
| REMOTE_POLICY | ask-once | ask-once | 相同 |
| TASK_TRACKING_POLICY | adaptive | adaptive | 相同 |
| PARALLEL_DEVELOPMENT_POLICY | task-worktree | single-writer | 保留既有值 |
| AUTO_COMMIT_POLICY | verified-owned-units | verified-owned-units | 相同 |
| RECOVERY_COMMIT_POLICY | on-handoff | on-handoff | 相同 |
| AUTO_PUSH_POLICY | on-request | authorized-milestones | 保留既有值 |
| HUMAN_VERIFICATION_POLICY | criteria-based | criteria-based | 相同 |
| INTEGRATION_POLICY | squash-on-completion | follow-existing | 保留既有值 |

### 3.1 任务隔离

新版默认在每个独立修改任务开始写入前建立任务分支与 worktree，即使只有一个 Session；集成分支只接收成果。目标项目采用单写入者串行、按需隔离，并在当前入口中明确普通串行任务在 main 上继续。

目标项目已写入 task-worktree 的条件式规则，但只有明确启用该策略后才成为默认执行义务。存在这些段落不等于当前已经启用任务隔离。

### 3.2 集成方式

新版默认满足集成条件后串行 squash 到已确认主线，任务内部可以保留多个过程提交。目标项目采用 follow-existing，不自动切换为 squash；其历史上已有按授权正常快进集成的事实。

这会影响主线提交形态、任务交付条件及内部历史保存方式。目标项目仍保留串行集成、检查、依赖、清理和 squash 历史边界的规则。

### 3.3 自动推送

新版默认 on-request：收到推送请求时保存整个项目当前可纳入 Git 的状态。目标项目保留 authorized-milestones：在适用授权范围内，已验证里程碑可自动推送。

目标项目已经补入明确请求下的完整项目快照规则，包含已有修改和未完成内容，不以测试或人工验收为备份门槛。因此不能把保留 authorized-milestones 理解为仍对每次明确备份请求施加质量验收条件；主要区别是没有新推送请求时自动推送的触发方式。实际上传仍需适用的目标与分支授权。

## 4. 为什么升级后仍保留旧策略

[记忆生成协议](../../agent-project-bootstrap/protocols/memory.md) 第 37–39 行规定用户与项目既有明确配置优先，缺少约定时才使用模板默认值；第 70 行规定重跑不得重置已有策略。[升级说明](../../agent-project-bootstrap/CHANGELOG.md) 第 49 行也明确已有 single-writer/follow-existing 保留，除非用户明确要求调整。

目标项目 `docs/agent/policy.md` 第 27 行直接声明保留 single-writer、follow-existing、authorized-milestones；升级任务 `docs/tasks/TASK-20261010-042af07e7e69-memory-upgrade.md` 第 31 行再次记录相同处理。Git 中升级前已存在这三项值，说明它们是被延续的项目配置。

据此可以确认升级采用了“补齐新版协议、保留旧生效值”的方式。不能进一步把 Agent 编写的需求摘要当作用户明确批准全部保留项的证据；本次未读取原始私有对话。若用户原意包含策略迁移，问题在于升级范围的理解与呈现未覆盖这一预期。

## 5. 其他差异及适配

| 项目 | 观察事实 | 解释与边界 |
| --- | --- | --- |
| 推送前 fetch | 目标项目 `docs/agent/git.md` 第 53 行仍要求先 fetch；升级前已是相同写法 | [最新 Git 模板](../../agent-project-bootstrap/templates/docs/agent/git.md.template) 第 53 行允许正常 push，出现变化、拒绝或分叉迹象时再按需 fetch。此流程未完全对齐，升级记录未说明单独保留它的理由；不据此推断整套协议升级失败 |
| main 直接开发 | 提交 `57cca8f9033278c76e008eddf736b94dbc81c549` 于 16:56:24 将普通串行任务在 main 上继续写入入口和策略 | 发生在 16:29 的升级之后。相关 Task 记录依据为用户要求合并到 main、以后以 main 为基准；“从 main 建任务”与“直接在 main 修改”仍是不同工作方式，本文不据摘要证明用户逐项确认了后一种解释 |
| 启动时查 ADR 索引 | 目标项目 AGENTS 第 7 行要求新 Session 同时查 ADR 索引 | 属于项目入口适配；索引导航仍只要求阅读相关 ADR，不等于默认加载全部决策历史 |
| 业务、工程和授权记录 | 目标项目保留 Python/QML、数据安全、业务约束、历史 Task/ADR 和远端操作范围 | 这些属于目标项目内容，不能按通用模板逐字替换，也不能把维护仓库的私有策略复制为目标项目配置 |

本报告对照的是工具包的目标项目模板与生成协议。维护仓库自己的 AGENTS、policy 和 PROJECT_CONTEXT 只约束本仓库，与目标项目的文件内容不同并不构成升级缺陷。

## 6. 新版最低语义覆盖核对

以 [记忆生成协议的最低语义表](../../agent-project-bootstrap/protocols/memory.md) 为准，静态核对目标项目实际文件及关键条件；不沿用升级任务自报通过作为唯一证据。

| 最低语义类别 | 目标项目可定位位置 | 本次观察 |
| --- | --- | --- |
| 入口与职责 | AGENTS；policy 的文档路径映射 | 可定位，按需读取，根交接兼容入口已删除 |
| 策略条件 | policy 的有效策略、冲突表；workflow/Git 开头 | 跟踪及提交/远端禁用条件存在 |
| 任务身份与状态 | workflow 的标识、状态与最小记录 | ID、六种状态、时区、单列阻碍存在 |
| 任务最小记录 | workflow 的最小记录表 | 需求、基线、修改边界、工作区、依赖、快照、验证及恢复字段存在 |
| 工作区保护 | AGENTS；workflow 接力；Git 基线与修改归属 | 单写入者、用户内容保护、混合归属与明确快照请求的区别存在 |
| 任务隔离与集成 | policy；workflow 接力；Git 工作区、串行集成和清理 | 已写入，但按既有策略条件式启用 task-worktree/squash |
| 多工作区备份 | policy 的备份段落；Git 按请求快照 | 协调写入者、授权 refs、未完成任务不提前合入主线存在 |
| Git 与敏感边界 | Git 的提交、快照、Secret、Push | 快照无质量门槛、身份/hook/凭据保护及失败边界存在；fetch 流程差异见第 5 节 |
| 恢复与落盘 | workflow 的 Session 开始、checkpoint | 恢复摘要、阶段保存、关闭能力限制存在 |
| 验证与事实 | workflow 验证；PROJECT_CONTEXT 第 11 节 | 证据范围/版本/环境、旧证据失效及未知边界存在 |
| 交付与授权 | policy 的操作范围；Git Push；workflow 接力 | 文档、本地快照、远端可取得及授权范围分别说明 |
| 生命周期与维护 | workflow 收尾；任务索引；ADR 索引 | done 条件、先 Task 后索引、删活动行并保留文件、按需维护存在 |

这支持“没有观察到新版规则大面积缺失”的结论，不代表全部措辞逐字一致、每项规则执行可靠、业务通过回归，或所有目标项目历史任务都符合当前字段规范。

## 7. 待确认需求与后续建议

以下仅为分析建议，未执行、未采纳为新规则：

1. 若希望目标项目同时采用新版默认工作方式，明确将三项配置迁移为 task-worktree、squash-on-completion、on-request，并同步入口、workflow 和 Git 协议；实际迁移前仍须保存旧工作并核对写入者与基线。
2. 将“以 main 为开发基准”与“在 main 上直接修改”分开说明，避免后续 Agent 把主线基准误读为写入位置。
3. 若无需保留固定 fetch 前置流程，按最新模板调整为遇到变化或拒绝时按需 fetch；若有项目特定理由则记录理由。
4. 后续升级报告分别列出协议版本、已补齐语义、保留的策略及行为影响，不仅报告“已升级最新版”。

不需要为完成上述判断重建项目记忆、重写全部历史 Task/ADR 或新增后台升级机制。

## 8. 检查范围与交付边界

已读取两仓库入口、项目策略、目标项目的任务/工作/Git 协议和 ADR 索引，按需读取工具包相关协议与模板、升级任务和后续 main 约定任务；通过 Git 核对版本、升级祖先关系、三项旧配置、后续修改及工具包 tree 一致性。

未修改 StudentManagement 的文件、分支、暂存区或远端；未启动应用、读取学员数据库、连接真实平台、企微或运行目标业务测试；未读取私有对话全文。本报告是静态差异分析，不是目标项目的补缺实施或全面验收。

本报告保存于 AgentBootstrapPrompt 维护仓库，并按本轮请求随该仓库 main 交付。目标项目始终保持只读。文档保存、本地提交、串行集成与 GitHub 同步分别核对，交付进度见 [本轮任务](../tasks/TASK-20261010-306a3f0e9592-student-memory-diff-report.md)，实际最新提交和远端结果以 Git 查询为准。
