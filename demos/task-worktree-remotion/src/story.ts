export const FPS = 30;
export const WIDTH = 1600;
export const HEIGHT = 900;
export const DURATION = 64 * FPS;

export const chapters = [
  {second: 0, title: '一个项目，三个工作空间', short: '先看全貌', text: 'main 保存已集成成果；A、B 分别修改自己的项目副本。', note: '这里展示成果的流向，时间与进度均为示意。'},
  {second: 6, title: 'A 开始：先建立自己的工作区', short: 'A 先开始', text: 'A 从 main 的 v0 出发，在任务分支里改进接力规则。', note: '即使现在只有 A，也先隔离。补充要求继续沿用任务 A。'},
  {second: 15, title: 'B 后来加入：从已集成版本开始', short: 'B 后加入', text: 'B 同样从 main 的 v0 出发。A 尚未完成，修改留在 A 的副本里。', note: '本例 A、B 独立；如果 B 依赖 A，需先明确可用版本和顺序。'},
  {second: 24, title: '同时改同名文件，成果各自保留', short: '并行修改', text: '两个 Session 都修改 workflow.md，但操作的是不同工作目录。', note: '每个实际工作区仍只有一个写入者；共享资源另行协调。'},
  {second: 34, title: 'B 先完成：串行集成到 main', short: 'B 先集成', text: '集成者汇总 B 的过程提交，检查最终内容，再形成一个成果提交。', note: 'squash 汇总任务成果。A 未完成，不阻止独立的 B 集成。'},
  {second: 44, title: 'A 后完成：结合最新 main 集成', short: 'A 再集成', text: 'main 已包含 B。集成者协调 A 与最新主线的差异，检查后接收 A。', note: '同段冲突要按双方需求处理；没有文本冲突也需要验证。'},
  {second: 54, title: '成果留下，完成的工作区可以清理', short: '收尾清理', text: '核验保存、依赖和必要历史后，清理本任务工作区与分支。', note: '新任务再建分支；对话结束不自动合并，未完成任务继续保留。'},
] as const;

export const colors = {
  paper: '#F4F7FB', ink: '#142D46', muted: '#53677C', line: '#D1DCE7',
  main: '#285D9D', a: '#A85A13', b: '#087968', purple: '#6651A1',
  white: '#FFFFFF', aSoft: '#FFF3E6', bSoft: '#E5F5EE', mainSoft: '#EAF1FC',
};

export const chapterAt = (frame: number) => {
  let index = 0;
  chapters.forEach((chapter, i) => {if (frame >= chapter.second * FPS) index = i;});
  return index;
};
