import { useEffect, useState } from 'react';
import { EGameEvent } from '../../../shared/minesweeper';
import { useGameInstance } from './useGameInstance';

export function useGameResult() {
  const game = useGameInstance();
  const [result, setResult] = useState(game.getResult());

  useEffect(() => {
    game.on(EGameEvent.CHANGE_RESULT, setResult);

    return () => {
      game.off(EGameEvent.CHANGE_RESULT, setResult);
    };
  }, [game]);

  return result;
}
