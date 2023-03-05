import { Listener } from 'events';
import { Position } from '../position';
import {
  EFieldEvent,
  EGameEvent,
  TFieldAroundBombCount,
  TFieldChangeStageEvent,
  TFieldStage,
  TGameBoard,
  TGameBombCount,
  TGameResult,
  TGameSelectedFieldsCount,
  TGameStage,
  TTimeStamp,
} from './types';

export interface IMinesweeper {
  /**
   * Запускает игру
   */
  startGame(): void;

  /**
   * Сбрасывает игру
   */
  resetGame(): void;

  /**
   * Делает ход по позиции
   */
  move(position: Position): void;

  /**
   * Возвращает текущее состояние игры
   */
  getStage(): TGameStage;

  /**
   * Возвращает результат игры.
   * Если игра активна, то вернет `null`
   */
  getResult(): TGameResult | null;

  /**
   * Возвращает timestamp начала игры
   */
  getStartTime(): TTimeStamp | null;

  /**
   * Возвращает доску игры
   */
  getBoard(): TGameBoard;

  /**
   * Возвращает количество бомб на доске
   */
  getBombCount(): TGameBombCount;

  /**
   * Возращает количество выделенных полей
   */
  getSelectedFieldsCount(): TGameSelectedFieldsCount;

  on(
    event: EGameEvent.CHANGE_STAGE,
    listener: (value: TGameStage) => void
  ): void;

  on(
    event: EGameEvent.CHANGE_BOMB_COUNT,
    listener: (value: TGameBombCount) => void
  ): void;

  on(
    event: EGameEvent.CHANGE_RESULT,
    listener: (value: TGameResult | null) => void
  ): void;

  on(
    event: EGameEvent.CHANGE_BOARD,
    listener: (value: TGameBoard) => void
  ): void;

  on(
    event: EGameEvent.CHANGE_SELECTED_FIELDS_COUNT,
    listener: (value: TGameSelectedFieldsCount) => void
  ): void;

  off(event: EGameEvent, listener: Listener): void;
}

export interface IField {
  /**
   * Возвращает текущее состояние поля
   */
  getStage(): TFieldStage;

  /**
   * Устанавливает новое состояние поля
   */
  setStage(value: TFieldStage): void;

  /**
   * Является ли поле открытым
   */
  isOpened(): boolean;

  /**
   * Является ли поле бомбой
   */
  isBomb(): boolean;

  /**
   * Взорвана ли бомба
   */
  isBlownUp(): boolean;

  /**
   * Взрывает бомбу
   */
  blowUp(): void;

  /**
   * Помечает поле как бомба
   */
  markAsBomb(): void;

  /**
   * Возвращает позицию поля
   */
  getPosition(): Position;

  /**
   * Возвращает количество бомб вокруг поля
   */
  getAroundBombCount(): TFieldAroundBombCount;

  /**
   * Устанавливает количество бомб вокруг поля
   */
  setAroundBombCount(value: TFieldAroundBombCount): void;

  on(
    event: EFieldEvent.CHANGE_STAGE,
    listener: (e: TFieldChangeStageEvent) => void
  ): void;

  off(event: EFieldEvent, listener: Listener): void;
}
