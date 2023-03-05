import { useGame } from '../context';

export function useGameStage() {
  return useGame().stage;
}
