import { useEffect, useRef, useState } from 'react';
import { EGameEvent, TGameBoard } from '../../../shared/minesweeper';
import { useGameInstance } from './useGameInstance';

export function useGameBoard() {
  const game = useGameInstance();
  const [state, setState] = useState(game.getBoard());
  const boardId = useRef(1);

  useEffect(() => {
    const listener = (value: TGameBoard) => {
      boardId.current++;
      setState(value);
    };

    game.on(EGameEvent.CHANGE_BOARD, listener);

    return () => {
      game.off(EGameEvent.CHANGE_BOARD, listener);
    };
  }, [game]);

  return { board: state, boardId: boardId.current };
}
