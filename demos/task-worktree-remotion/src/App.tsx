import React, {useEffect, useRef, useState} from 'react';
import {Player, type PlayerRef} from '@remotion/player';
import {WorktreeFilm} from './WorktreeFilm';
import {chapterAt, chapters, DURATION, FPS, HEIGHT, WIDTH} from './story';

const PlayIcon = ({playing}: {playing: boolean}) => <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">{playing ? <><rect x="4" y="3" width="4" height="14" rx="1"/><rect x="12" y="3" width="4" height="14" rx="1"/></> : <path d="M5 3.5v13l11-6.5-11-6.5Z"/>}</svg>;

export const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const [frame, setFrame] = useState(20);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const chapter = chapterAt(frame);

  useEffect(() => {
    const current = player.current;
    if (!current) return;
    const onFrame = (event: {detail: {frame: number}}) => setFrame(event.detail.frame);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onFullscreen = (event: {detail: {isFullscreen: boolean}}) => setFullscreen(event.detail.isFullscreen);
    const onKey = (event: KeyboardEvent) => {if (event.key === 'Escape' && current.isFullscreen()) current.exitFullscreen();};
    setFullscreen(current.isFullscreen());
    current.addEventListener('frameupdate', onFrame);
    current.addEventListener('play', onPlay);
    current.addEventListener('pause', onPause);
    current.addEventListener('ended', onPause);
    current.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('keydown', onKey);
    return () => {current.removeEventListener('frameupdate', onFrame); current.removeEventListener('play', onPlay); current.removeEventListener('pause', onPause); current.removeEventListener('ended', onPause); current.removeEventListener('fullscreenchange', onFullscreen); document.removeEventListener('keydown', onKey);};
  }, []);

  const jump = (second: number) => {player.current?.pause(); player.current?.seekTo(second * FPS + 20);};
  const toggle = () => {
    if (playing) player.current?.pause();
    else {if (frame >= DURATION - 1) player.current?.seekTo(0); player.current?.play();}
  };

  return <main className="app-shell">
    <header className="page-header"><div className="identity"><span className="identity-mark" aria-hidden="true"><svg width="23" height="24" viewBox="0 0 23 24" fill="none"><path d="M5 3v18M5 8c9 0 13 0 13 10" stroke="currentColor" strokeWidth="2"/><circle cx="5" cy="3" r="2.5" fill="currentColor"/><circle cx="5" cy="21" r="2.5" fill="currentColor"/><circle cx="18" cy="21" r="2.5" fill="currentColor"/></svg></span><span>项目记忆与协作体系</span></div><span className="format-label">64 秒 · 动画演示</span></header>
    <section className="intro"><h1>一个项目，多个任务。<br className="mobile-break"/>各自工作，统一集成。</h1><p>A 先开始，B 后来加入。看看修改留在哪里、何时进入 main。</p></section>
    <section className="film-area" aria-label="任务分支与 worktree 动画">
      <div className="player-frame"><Player ref={player} component={WorktreeFilm} initialFrame={20} durationInFrames={DURATION} fps={FPS} compositionWidth={WIDTH} compositionHeight={HEIGHT} style={{width: '100%', aspectRatio: '16/9'}} controls={fullscreen} showVolumeControls={false} clickToPlay autoPlay={false} loop={false} moveToBeginningWhenEnded={false} playbackRate={speed}/></div>
      <div className="transport"><button className="play-button" onClick={toggle}><PlayIcon playing={playing}/>{playing ? '暂停演示' : frame >= DURATION - 1 ? '重新播放' : '播放演示'}</button><label className="seek-label"><span className="sr-only">演示播放进度</span><input type="range" aria-label="演示播放进度" min={0} max={DURATION - 1} value={frame} onChange={(event) => {player.current?.pause(); player.current?.seekTo(Number(event.target.value));}} aria-valuetext={`${frame >= DURATION - 1 ? 64 : Math.floor(frame / FPS)} 秒，共 64 秒`}/></label><span className="time">{(frame >= DURATION - 1 ? 64 : Math.floor(frame / FPS)).toString().padStart(2, '0')} / 64 秒</span><label className="speed-label"><span className="sr-only">播放速度</span><select aria-label="播放速度" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={.75}>0.75 倍速</option><option value={1}>1 倍速</option><option value={1.5}>1.5 倍速</option></select></label><button className="fullscreen-button" onClick={() => player.current?.requestFullscreen()}>全屏</button></div>
    </section>
    <nav className="chapters" aria-label="演示章节">{chapters.map((item, index) => <button key={item.second} onClick={() => jump(item.second)} aria-current={chapter === index ? 'step' : undefined} className={chapter === index ? 'chapter-button selected' : 'chapter-button'}><span className="chapter-number">{String(index + 1).padStart(2, '0')}</span><span>{item.short}</span><small>{String(item.second).padStart(2, '0')} 秒</small></button>)}</nav>
    <section className="chapter-copy" aria-live="polite"><span className="copy-number">{String(chapter + 1).padStart(2, '0')}</span><div><h2>{chapters[chapter].title}</h2><p>{chapters[chapter].text}</p></div></section>
    <footer className="page-footer"><p>分支记录版本，worktree 提供独立目录；每个工作区仍只有一个写入者。</p><p>这是流程示意，不执行真实 Git 操作。squash 后需核验成果和必要历史再清理。</p></footer>
  </main>;
};
