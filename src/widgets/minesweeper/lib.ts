import { TGameResult } from '../../shared/minesweeper';
import { EFace } from './types';

export function getFaceByGameResult(result: TGameResult | null): EFace {
  switch (result) {
    case 'win':
      return EFace.WIN;
    case 'lose':
      return EFace.LOSE;
    default:
      return EFace.SMILE;
  }
}
