import { useEffect, useState } from 'react';
import { EGameEvent } from '../../../shared/minesweeper';
import { useGameInstance } from './useGameInstance';

export function useGameSelectedFieldsCount() {
  const game = useGameInstance();
  const [state, setState] = useState(game.getSelectedFieldsCount());

  useEffect(() => {
    game.on(EGameEvent.CHANGE_SELECTED_FIELDS_COUNT, setState);

    return () => {
      game.off(EGameEvent.CHANGE_SELECTED_FIELDS_COUNT, setState);
    };
  }, [game]);

  return state;
}
