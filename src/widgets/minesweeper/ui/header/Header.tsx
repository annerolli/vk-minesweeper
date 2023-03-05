import './Header.css';
import { FC } from 'react';
import { BombCount } from '../bomb-count';
import { SmileStatus } from '../smile-status';
import { Timer } from '../timer';

export const Header: FC = () => (
  <header className="Header">
    <BombCount />
    <SmileStatus />
    <Timer />
  </header>
);
