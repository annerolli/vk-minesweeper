import { useGame } from '../context';

export function useGameInstance() {
  return useGame().instance;
}
