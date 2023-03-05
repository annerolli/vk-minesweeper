import { FC, useEffect, useState } from 'react';
import {
  defaultContextValue,
  defaultFaceValue,
  defaultGameInstance,
  defaultGameStage,
} from '../../const';
import { MinesweeperContext } from '../../context';
import { Header } from '../header';
import { TMinesweeperContext } from '../../types';
import './Root.css';
import { Board } from '../board';
import { EGameEvent } from '../../../../shared/minesweeper';

export const Root: FC = () => {
  const [instance] = useState(defaultGameInstance);
  const [stage, setStage] = useState(defaultGameStage);
  const [face, setFace] = useState(defaultFaceValue);

  useEffect(() => {
    instance.on(EGameEvent.CHANGE_STAGE, setStage);

    return () => {
      instance.off(EGameEvent.CHANGE_STAGE, setStage);
    };
  }, [instance]);

  const context: TMinesweeperContext = {
    game: {
      instance,
      stage,
    },
    face: {
      value: face,
      setValue: setFace,
    },
  };

  return (
    <MinesweeperContext.Provider value={context}>
      <div className="Minesweeper">
        <Header />
        <Board />
      </div>
    </MinesweeperContext.Provider>
  );
};
