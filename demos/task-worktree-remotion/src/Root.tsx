import React from 'react';
import {Composition} from 'remotion';
import {WorktreeFilm} from './WorktreeFilm';
import {DURATION, FPS, HEIGHT, WIDTH} from './story';

export const RemotionRoot: React.FC = () => <Composition id="TaskWorktree" component={WorktreeFilm} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT}/>;
