import { IField } from './interfaces';

/**
 * Состояние игры
 */
export type TGameStage = 'not_started' | 'in_progress' | 'finished';

/**
 * Результат игры
 */
export type TGameResult = 'win' | 'lose';

/**
 * Поля игры
 */
export type TGameFields = IField[];

/**
 * Поля игры в виде матрицы
 */
export type TGameBoard = TGameFields[];

/**
 * Число бомб на доске
 */
export type TGameBombCount = number;

/**
 * Количество выделенных полей. Выделенным полем считается поле с флагом или с вопросом.
 */
export type TGameSelectedFieldsCount = number;

/**
 * События игры
 */
export const enum EGameEvent {
  CHANGE_STAGE = 'changeStage',
  CHANGE_BOMB_COUNT = 'changeBombCount',
  CHANGE_RESULT = 'changeResult',
  CHANGE_BOARD = 'changeBoard',
  CHANGE_SELECTED_FIELDS_COUNT = 'changeSelectedFieldsCount',
}

/**
 * Время в милисекундах
 */
export type TTimeStamp = number;

/**
 * Состояние поля
 */
export type TFieldStage = 'open' | 'close' | 'flag' | 'question';

/**
 * Количество бомб вокруг поля
 */
export type TFieldAroundBombCount = number;

/**
 * Событие изменения состояния поля
 */
export type TFieldChangeStageEvent = {
  currentValue: TFieldStage;
  prevValue: TFieldStage;
};

/**
 * События поля
 */
export const enum EFieldEvent {
  CHANGE_STAGE = 'changeStage',
}
