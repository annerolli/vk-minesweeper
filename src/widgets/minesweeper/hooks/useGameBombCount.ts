import { useEffect, useState } from 'react';
import { EGameEvent } from '../../../shared/minesweeper';
import { useGameInstance } from './useGameInstance';

export function useGameBombCount() {
  const game = useGameInstance();
  const [state, setState] = useState(game.getBombCount());

  useEffect(() => {
    game.on(EGameEvent.CHANGE_BOMB_COUNT, setState);

    return () => {
      game.off(EGameEvent.CHANGE_BOMB_COUNT, setState);
    };
  }, [game]);

  return state;
}
