import './Field.css';
import { FC, MouseEvent, useEffect, useState } from 'react';
import {
  EFieldEvent,
  IField,
  TFieldChangeStageEvent,
  TFieldStage,
} from '../../../../shared/minesweeper';
import clsx from 'clsx';
import { useGameInstance, useGameStage } from '../../hooks';

type TProps = {
  value: IField;
};

export const Field: FC<TProps> = ({ value }) => {
  const game = useGameInstance();
  const gameStage = useGameStage();
  const [stage, setStage] = useState<TFieldStage>(value.getStage());
  const position = value.getPosition();

  useEffect(() => {
    const listener = (e: TFieldChangeStageEvent) => {
      setStage(e.currentValue);
    };

    value.on(EFieldEvent.CHANGE_STAGE, listener);

    return () => {
      value.off(EFieldEvent.CHANGE_STAGE, listener);
    };
  }, [value]);

  const handleClick = () => {
    game.move(position);
  };

  const hanldeContextMenu = (e: MouseEvent) => {
    if (gameStage !== 'in_progress' || stage === 'open') return;

    e.preventDefault();

    if (stage === 'close') {
      value.setStage('flag');
      return;
    }

    if (stage === 'flag') {
      value.setStage('question');
      return;
    }

    value.setStage('close');
  };

  const isOpened = value.isOpened();
  const isBomb = value.isBomb();
  const isOpenedBomb = isOpened && isBomb;
  const isBlownUpBomb = isOpenedBomb && value.isBlownUp();
  const isNotBlownUpBomb = isOpenedBomb && !value.isBlownUp();
  const aroundBombCount = value.getAroundBombCount();
  const isDisabled = isOpened || gameStage === 'finished';

  return (
    <button
      className={clsx(
        `Field Field--${stage}`,
        isOpened && !isBomb && `Fields--abc-${aroundBombCount}`,
        isNotBlownUpBomb && 'Field--bomb',
        isBlownUpBomb && 'Field--blown-up-bomb'
      )}
      onClick={handleClick}
      onContextMenu={hanldeContextMenu}
      disabled={isDisabled}
    >
      {visualStage(stage)}
    </button>
  );
};

function visualStage(stage: TFieldStage) {
  switch (stage) {
    case 'close':
      return 'C';
    case 'flag':
      return 'F';
    case 'question':
      return '?';
    case 'open':
      return 'O';
  }
}
