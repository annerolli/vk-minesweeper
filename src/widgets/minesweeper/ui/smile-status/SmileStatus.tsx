import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useFace } from '../../context';
import { useGameInstance, useGameResult, useGameStage } from '../../hooks';
import { getFaceByGameResult } from '../../lib';
import './SmileStatus.css';

export const SmileStatus: FC = () => {
  const game = useGameInstance();

  const stage = useGameStage();
  const isNotStarted = stage === 'not_started';

  const result = useGameResult();

  const { value, setValue } = useFace();

  useEffect(() => {
    setValue(getFaceByGameResult(result));
  }, [result]);

  const handleClick = () => {
    game.resetGame();
  };

  return (
    <button
      className={clsx(`SmileStatus SmileStatus--${value}`)}
      onClick={handleClick}
      disabled={isNotStarted}
    >
      Сбросить игру
    </button>
  );
};
