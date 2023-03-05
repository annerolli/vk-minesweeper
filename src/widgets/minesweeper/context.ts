import { createContext, useContext } from 'react';
import { defaultContextValue } from './const';
import { TMinesweeperContext } from './types';

export const MinesweeperContext =
  createContext<TMinesweeperContext>(defaultContextValue);

export function useGame() {
  return useContext(MinesweeperContext).game;
}

export function useFace() {
  return useContext(MinesweeperContext).face;
}
