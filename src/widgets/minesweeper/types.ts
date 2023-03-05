import { IMinesweeper, TGameStage } from '../../shared/minesweeper';

export type TMinesweeperContext = {
  game: TGame;
  face: TFace;
};

type TGame = {
  instance: IMinesweeper;
  stage: TGameStage;
};

type TFace = {
  value: EFace;
  setValue: (value: EFace) => void;
};

export const enum EFace {
  LOSE = 'lose',
  WIN = 'win',
  SMILE = 'smile',
  OH = 'oh',
}
