# 第一轮继续审查摘要

状态：第一轮历史审查材料。2026-10-05 用户已授权按优化清单实施；以下原建议不等于全部场景已验收，当前落实及保留项见优化清单。本仓库运行规则由 `../../AGENTS.md` 与 `../agent/` 定义。

后续多角度分析及实验问题已集中整理到 [优化分析与接手清单](optimization-backlog.md)，本文件保留第一轮审查范围。当前落实与验证状态优先查新清单及其证据。

## P0：保存、授权与并发边界

| 问题 | 风险与场景 | 建议 |
| --- | --- | --- |
| Task 文档不等于代码快照 | 另一台电脑读到进度但取不到未提交实现 | 分开描述文档保存、本地代码保存和远端可取得性 |
| 按文件暂存仍可能混入已有修改 | 用户 staged 内容或同文件修改被一起提交 | 核对 baseline 与完整 staged 快照，无法分离则暂停自动提交 |
| Remote 存在不等于上传授权 | 旧 remote 或 push 触发部署 | 授权限定实际目标、分支、内容和已知下游动作 |
| Secret Check 只看当前 diff 不够 | 历史提交中的秘密随首次 push 上传 | 检查 staged 内容及此次新暴露的历史，记录范围与局限 |
| Owner 和 Markdown 锁不提供互斥 | 旧 Agent 恢复后与新 Agent 同时写入 | 默认单写入者，显式并行用隔离工作区；真实锁需执行层支持 |
| 收尾无法保证一定执行 | 额度或进程突然中断 | 重要阶段保存，接手时用实际差异恢复；不承诺零损失 |

## P1：协议一致性

| 问题 | 风险与场景 | 建议 |
| --- | --- | --- |
| 一个 Done 混合多个状态 | 通过测试但未验收或未推送 | 分离工作、验证、人工验收、提交、推送及集成事实 |
| 分支内 Registry 被当作全局表 | 并行分支互相不可见、索引冲突 | Task 为记录来源，Registry 为当前版本导航；全局调度另需共享机制 |
| 自增 ID 冲突 | 多电脑独立创建相同编号 | 外部 ID 或日期加随机标识；接力保留 ID |
| Worktree 不隔离所有资源 | 数据库、端口或共享配置相互影响 | 识别共享资源，按需隔离，无法隔离则串行 |
| 缺少集成后的验证 | 各分支通过但合并后行为冲突 | 一个集成执行者，沿用项目工作流，验证合并结果 |
| Bootstrap 不幂等或越界 | 覆盖现有规范、误建嵌套 Git | 识别根与范围，复用等价文档，最小补缺 |
| UI 验收过于粗略 | 所有 UI 都卡人工或误用截图证明时序 | 按具体验收标准选证据，主观或不可访问环境保留人工验收 |
| 可读不等于自动加载 | 新 Agent 未读取规范，或把任务文字当授权 | 通用入口加薄适配，不复制规则，不扩大工具权限 |

## P2：维护成本

| 问题 | 风险与场景 | 建议 |
| --- | --- | --- |
| Task 变聊天流水账 | 恢复成本持续增加 | 保留最新快照、重要依据和下一步，删减重复描述 |
| 完成任务处理不明 | 活动索引膨胀或历史丢失 | 文件进 Git，完成后冻结并移出活动索引，默认不搬迁 |
| 配置项相互冲突 | Handoff 与 Task 策略分离后不一致 | 合并重复开关，只配置真实取舍 |

## 建议的进一步结构

- 保留原有 AGENTS、PROJECT_CONTEXT、architecture、ADR、tasks。
- 按需补充 `docs/agent/policy.md`、`workflow.md`、`git.md`，已有等价内容时复用。
- 文件只是上次核验的快照；检出分支的当前状态不等于生产状态。
- Git 可直接查询的事实不反复复制，避免记录最新提交或推送结果产生无限收尾提交。
- 普通小任务走轻量路径，复杂任务才维护完整恢复信息。

## 待讨论配置

GIT_POLICY、REMOTE_POLICY、TASK_TRACKING_POLICY、PARALLEL_DEVELOPMENT_POLICY、AUTO_COMMIT_POLICY、RECOVERY_COMMIT_POLICY、AUTO_PUSH_POLICY、HUMAN_VERIFICATION_POLICY、INTEGRATION_POLICY。

这仍是候选集合，应继续精简。Handoff 复用任务记录，不另设重复策略。所有默认值需在最终设计中确认。

## 体系与工具包验证场景

空项目、既有治理项目、monorepo 子目录、已有 staged/unstaged 修改、突然中断、跨电脑、并行 ID 创建、共享资源、远端分叉、无法 fetch、首次上传历史含敏感内容、UI 待验收、重复 Bootstrap、无 Git 或无执行权限。

这些是第一轮提出的设计审查场景清单，不表示全部已经执行通过。当前版本的实际核验范围见 [v0.2 核验记录](v0.2-validation.md) 和 [受控接力实验](../experiments/luna-handoff-20261004.md)。

## 已核对的官方依据

- [Git worktree](https://git-scm.com/docs/git-worktree)：共享资源及 worktree lock 的边界。
- [Git push](https://git-scm.com/docs/git-push)：推送目标、refspec 和远端配置。
- [Git ignore](https://git-scm.com/docs/gitignore)：忽略规则不取消已跟踪内容。
- [OpenAI AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)：Codex 指令发现与加载边界。

上述文档在本轮会话中查询；涉及未来工具版本时按需重新核对。
