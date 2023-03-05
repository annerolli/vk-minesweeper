import { Minesweeper, TGameStage } from '../../shared/minesweeper';
import { EFace, TMinesweeperContext } from './types';

export const BOARD_SIZE = 16;

export const defaultGameInstance = new Minesweeper(BOARD_SIZE);
export const defaultGameStage: TGameStage = 'not_started';
export const defaultFaceValue = EFace.SMILE;

export const defaultContextValue: TMinesweeperContext = {
  game: {
    instance: defaultGameInstance,
    stage: defaultGameStage,
  },
  face: {
    value: defaultFaceValue,
    setValue: () => {
      console.warn('setValue вызван вне провайдера');
    },
  },
};
