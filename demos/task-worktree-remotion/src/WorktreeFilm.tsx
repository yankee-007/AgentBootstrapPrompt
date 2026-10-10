import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {chapterAt, chapters, colors as c, DURATION, FPS} from './story';

const font = '"Microsoft YaHei", "PingFang SC", sans-serif';
const mono = '"Cascadia Code", Consolas, monospace';
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const progress = (frame: number, start: number, seconds = 1) => interpolate(frame, [start * FPS, (start + seconds) * FPS], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});

const Folder = ({color}: {color: string}) => <svg width="38" height="32" viewBox="0 0 38 32" fill="none" aria-hidden="true"><path d="M3 9V5a2 2 0 0 1 2-2h10l4 5h14a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" fill={color} opacity=".12"/><path d="M3 9V5a2 2 0 0 1 2-2h10l4 5h14a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke={color} strokeWidth="2"/><path d="M3 10h31" stroke={color} strokeWidth="2"/></svg>;

const Check = ({color}: {color: string}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8"/><path d="m7 12 3 3 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

type WorkspaceProps = {
  x: number; label: string; branch: string; directory: string; color: string;
  soft: string; badge: string; visible: boolean; cleaned: boolean; rows: {text: string; change?: boolean}[];
  status: string; percent?: number; opacity: number;
};

const Workspace: React.FC<WorkspaceProps> = ({x, label, branch, directory, color, soft, badge, visible, cleaned, rows, status, percent, opacity}) => (
  <div style={{position: 'absolute', left: x, top: 234, width: 456, height: 440, opacity, background: c.white, border: `1px solid ${c.line}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 26px rgba(33, 69, 104, .04)'}}>
    <div style={{height: 64, background: soft, padding: '15px 24px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${c.line}`}}>
      <Folder color={color}/><span style={{fontSize: 25, fontWeight: 700}}>{label}</span>
      <span style={{marginLeft: 'auto', fontSize: 17, fontWeight: 600, color}}>{badge}</span>
    </div>
    <div style={{padding: '14px 24px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 9, color, fontFamily: mono, fontSize: 18}}><span style={{width: 9, height: 9, borderRadius: 9, background: color}}/>{branch}</div>
      <div style={{fontSize: 15, color: c.muted, marginTop: 6, fontFamily: mono}}>{directory}</div>
      {!visible ? <div style={{height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.muted, fontSize: 21}}>任务尚未开始</div> : cleaned ? <div style={{height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color, fontSize: 23}}><Check color={color}/>工作区已清理，成果在 main</div> : <div style={{marginTop: 12, border: `1px solid ${c.line}`, borderRadius: 8, overflow: 'hidden', height: 144}}>
        <div style={{fontFamily: mono, fontSize: 15, padding: '9px 13px', background: '#F8FAFD', color: c.muted, borderBottom: `1px solid ${c.line}`}}>docs/agent/workflow.md</div>
        <div style={{padding: '7px 9px'}}>{rows.map((row, i) => <div key={row.text} style={{display: 'flex', fontSize: 17, lineHeight: '28px', background: row.change ? soft : 'transparent', padding: '0 5px', borderRadius: 3}}><span style={{fontFamily: mono, width: 26, color: c.muted, fontSize: 13}}>{i + 1}</span><span style={{color: row.change ? color : c.ink, fontWeight: row.change ? 600 : 400}}>{row.text}</span></div>)}</div>
      </div>}
      <div style={{marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 17, color: c.muted}}><span>{status}</span>{percent !== undefined && visible && !cleaned && <span style={{color, fontFamily: mono}}>{percent}%</span>}</div>
      {percent !== undefined && visible && !cleaned && <div style={{height: 4, background: soft, marginTop: 8, borderRadius: 2}}><div style={{height: '100%', width: `${percent}%`, background: color, borderRadius: 2}}/></div>}
    </div>
  </div>
);

const Transfer = ({frame, start, x, color, label}: {frame: number; start: number; x: number; color: string; label: string}) => {
  const p = progress(frame, start, 3);
  const opacity = interpolate(p, [0, .12, .83, 1], [0, 1, 1, 0], clamp);
  return <div style={{position: 'absolute', left: x + (300 - x) * p, top: 605 - Math.sin(p * Math.PI) * 155, opacity, background: color, padding: '13px 20px', borderRadius: 9, color: 'white', fontSize: 21, fontWeight: 600, boxShadow: '0 8px 26px rgba(20,45,70,.18)'}}>{label}</div>;
};

export const WorktreeFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame / FPS;
  const chapterIndex = chapterAt(frame);
  const chapter = chapters[chapterIndex];
  const headingEnter = progress(frame, chapter.second, .45);
  const aVisible = second >= 6;
  const bVisible = second >= 15;
  const bIntegrated = second >= 39;
  const aIntegrated = second >= 52;
  const cleaned = second >= 58;
  const aPercent = Math.round(interpolate(frame, [6 * FPS, 44 * FPS], [0, 100], clamp));
  const bPercent = Math.round(interpolate(frame, [15 * FPS, 33 * FPS], [0, 100], clamp));
  const base = '任务记录保留需求、进度与验证。';
  const old = '接力时核对旧写入者。';
  const aRule = '接力时先读 Task，再核对 Git。';
  const bRule = '独立任务使用分支与 worktree。';
  const mainRows = [{text: base}, {text: aIntegrated ? aRule : old, change: aIntegrated}, ...(bIntegrated ? [{text: bRule, change: true}] : [])];
  const aRows = [{text: base}, {text: second >= 10 ? aRule : old, change: second >= 10}, ...(second >= 47 ? [{text: bRule}] : [])];
  const bRows = [{text: base}, {text: old}, ...(second >= 19 ? [{text: bRule, change: true}] : [])];
  const lineB = progress(frame, 39, 1);
  const lineA = progress(frame, 52, 1);

  return <AbsoluteFill className="worktree-film" style={{background: c.paper, color: c.ink, fontFamily: font}}>
    <style>{'.worktree-film, .worktree-film * { box-sizing: border-box; }'}</style>
    <div style={{position: 'absolute', left: 64, right: 64, top: 37, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: c.muted, fontSize: 18}}>
      <span>项目记忆与协作体系 · 工作区演示</span><span style={{fontFamily: mono}}>0{chapterIndex + 1} / 07</span>
    </div>
    <div key={chapterIndex} style={{position: 'absolute', left: 64, top: 94, right: 64, opacity: headingEnter, transform: `translateY(${(1 - headingEnter) * 8}px)`}}>
      <div style={{fontSize: 43, lineHeight: 1.35, fontWeight: 700, letterSpacing: -.8}}>{chapter.title}</div>
      <div style={{fontSize: 23, color: c.muted, marginTop: 16, lineHeight: 1.5}}>{chapter.text}</div>
    </div>

    <Workspace x={64} label="主项目" branch="main" directory="project /" color={c.main} soft={c.mainSoft} badge={aIntegrated ? 'v2 · 含 A + B' : bIntegrated ? 'v1 · 含 B' : 'v0 · 已集成版本'} visible cleaned={false} rows={mainRows} status={second >= 35 && second < 39 ? '集成 B：汇总成果，检查内容' : second >= 48 && second < 52 ? '集成 A：协调差异，检查内容' : '保存已集成成果，不承担开发'} opacity={1}/>
    <Workspace x={572} label="任务 A" branch="task/a-handoff" directory="project-A /" color={c.a} soft={c.aSoft} badge={!aVisible ? '等待开始' : aIntegrated ? '已集成' : second >= 44 ? '待集成' : 'Session A'} visible={aVisible} cleaned={cleaned} rows={aRows} status={cleaned ? '已确认保存与依赖，可清理' : aIntegrated ? '成果已进入 main' : second >= 47 ? '已协调最新 main 的 B 成果' : second >= 44 ? '完成修改，核对最新 main' : '改进接力规则 · 进度示意'} percent={aPercent} opacity={aVisible ? .4 + .6 * progress(frame, 6, .7) : .45}/>
    <Workspace x={1080} label="任务 B" branch="task/b-parallel" directory="project-B /" color={c.b} soft={c.bSoft} badge={!bVisible ? '稍后加入' : bIntegrated ? '已集成' : second >= 33 ? '待集成' : 'Session B'} visible={bVisible} cleaned={cleaned} rows={bRows} status={cleaned ? '已确认保存与依赖，可清理' : bIntegrated ? '成果已进入 main，A 可继续' : second >= 33 ? '完成修改，交给集成者' : '补充并行规则 · 进度示意'} percent={bPercent} opacity={bVisible ? .4 + .6 * progress(frame, 15, .7) : .45}/>

    {second >= 35 && second <= 39 && <Transfer frame={frame} start={35} x={1140} color={c.b} label="B：多个过程提交 → 一个成果"/>}
    {second >= 48 && second <= 52 && <Transfer frame={frame} start={48} x={670} color={c.a} label="A：协调差异 → 一个成果"/>}

    <div style={{position: 'absolute', left: 64, top: 695, color: c.muted, fontSize: 18}}>main 的成果历史</div>
    <div style={{position: 'absolute', left: 64, top: 727, fontSize: 19, color: c.main, fontWeight: 600}}>squash 后保持主线清楚</div>
    <svg style={{position: 'absolute', left: 330, top: 683}} width="1205" height="120" viewBox="0 0 1205 120">
      <path d="M55 51H1150" stroke={c.line} strokeWidth="3" strokeDasharray="6 7"/>
      <path d={`M55 51H${55 + 405 * lineB}`} stroke={c.main} strokeWidth="4"/>
      {bIntegrated && <path d={`M460 51H${460 + 400 * lineA}`} stroke={c.main} strokeWidth="4"/>}
      <circle cx="55" cy="51" r="12" fill={c.white} stroke={c.main} strokeWidth="4"/>
      <text x="55" y="97" textAnchor="middle" fill={c.muted} fontFamily={font} fontSize="18">v0 起点</text>
      <g opacity={bIntegrated ? lineB : .22}><circle cx="460" cy="51" r="13" fill={c.b}/><text x="460" y="97" textAnchor="middle" fill={c.b} fontFamily={font} fontSize="18">B 的成果提交</text></g>
      <g opacity={aIntegrated ? lineA : .22}><circle cx="860" cy="51" r="13" fill={c.a}/><text x="860" y="97" textAnchor="middle" fill={c.a} fontFamily={font} fontSize="18">A 的成果提交</text></g>
    </svg>
    <div style={{position: 'absolute', left: 64, top: 816, right: 64, minHeight: 57, background: c.ink, color: c.white, borderRadius: 10, padding: '16px 23px', fontSize: 22, lineHeight: 1.3}}>{chapter.note}</div>
    <div style={{position: 'absolute', bottom: 0, left: 0, height: 5, width: `${frame / (DURATION - 1) * 100}%`, background: c.main}}/>
  </AbsoluteFill>;
};
