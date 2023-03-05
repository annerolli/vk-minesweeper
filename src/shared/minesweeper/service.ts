import { EventEmitter } from 'events';
import { getRandomInt } from '../lib/number';
import { Field } from './field';
import { IField, IMinesweeper } from './interfaces';
import { Position, TCoord } from '../position';
import {
  EFieldEvent,
  EGameEvent,
  TFieldChangeStageEvent,
  TFieldStage,
  TGameBoard,
  TGameBombCount,
  TGameFields,
  TGameResult,
  TGameSelectedFieldsCount,
  TGameStage,
  TTimeStamp,
} from './types';

export class Minesweeper extends EventEmitter implements IMinesweeper {
  private stage: TGameStage = 'not_started';
  private result: TGameResult | null = null;
  private startTime: TTimeStamp | null = null;
  private fields: TGameFields = [];
  private bombCount: TGameBombCount = 0;
  private selectedFieldsCount: TGameSelectedFieldsCount = 0;

  private static readonly BOMB_CHANCE = 0.15625;

  constructor(private size: number) {
    super();

    this.setFields(Minesweeper.generateFields(this.size));
    this.setBombCount(Math.ceil(this.fields.length * Minesweeper.BOMB_CHANCE));
  }

  startGame(): void {
    if (this.stage === 'in_progress') {
      console.warn('Игра начата');
      return;
    }

    if (this.stage === 'finished') {
      this.resetGame();
    }

    this.fields.forEach((f) => {
      f.on(EFieldEvent.CHANGE_STAGE, this.changeFieldStageListener);
    });

    this.setStage('in_progress');
    this.startTime = Date.now();
  }

  resetGame(): void {
    this.startTime = null;

    this.fields.forEach((f) => {
      f.off(EFieldEvent.CHANGE_STAGE, this.changeFieldStageListener);
    });

    this.setStage('not_started');
    this.setFields(Minesweeper.generateFields(this.size));
    this.setResult(null);
    this.setSelectedFieldsCount(0);
  }

  move(position: Position): void {
    if (this.stage === 'finished') {
      console.warn('Нельзя сделать шаг, пока игра не начата');
      return;
    }

    if (this.stage === 'not_started') {
      this.startGame();
    }

    const fieldByMovePosition = this.getFieldByPosition(position);

    if (fieldByMovePosition === undefined) {
      console.warn(`Поле по позиции ${position} не найдено`);
      return;
    }

    /**
     * Если бомбы не инициализированны,
     * то инициализируем их и завершаем работу метода
     */
    if (!this.fields.some((field) => field.isBomb())) {
      fieldByMovePosition.setStage('open');
      this.initBombs([fieldByMovePosition]);

      return;
    }

    /**
     * Если поле по позиции является бомбой,
     * то взрываем ее, открываем оставшиеся бомбы
     * и завершаем игру с проигрышем
     */
    if (fieldByMovePosition.isBomb()) {
      this.gameOver(fieldByMovePosition);

      return;
    }

    this.openField(fieldByMovePosition);

    const isWin = this.fields.every((f) => {
      if (f.isBomb()) return true;

      return f.isOpened();
    });

    if (isWin) {
      this.setStage('finished');
      this.setResult('win');
    }
  }

  private initBombs(ignore: IField[] = []) {
    let restBombCount = this.bombCount;

    while (restBombCount > 0) {
      const randomIndex = getRandomInt(0, this.fields.length);
      const randomField = this.fields[randomIndex];

      if (
        randomField === undefined ||
        randomField.isBomb() ||
        ignore.includes(randomField)
      ) {
        continue;
      }

      randomField.markAsBomb();
      restBombCount--;
    }

    this.fields.forEach((f) => {
      if (f.isBomb()) return;

      let aroundBombCount = 0;

      f.getPosition()
        .getAroundPositions()
        .map((p) => this.getFieldByPosition(p))
        .forEach((f) => {
          if (f?.isBomb()) {
            aroundBombCount++;
          }
        });

      f.setAroundBombCount(aroundBombCount);
    });
  }

  private openField(field: IField, ignoreLog = false) {
    if (field.isOpened()) {
      if (!ignoreLog) {
        console.log(`Поле по позиции ${field.getPosition()} уже открыто`);
      }

      return;
    }

    field.setStage('open');

    if (field.getAroundBombCount() === 0) {
      field
        .getPosition()
        .getAroundPositions()
        .map((p) => this.getFieldByPosition(p))
        .forEach((f) => {
          if (f === undefined) return;
          this.openField(f, true);
        });
    }
  }

  private gameOver(field: IField): void {
    field.setStage('open');
    field.blowUp();

    this.fields.forEach((f) => {
      if (f.isBomb()) {
        f.setStage('open');
      }
    });

    this.setStage('finished');
    this.setResult('lose');
  }

  getStage(): TGameStage {
    return this.stage;
  }

  private setStage(value: TGameStage) {
    this.stage = value;
    this.emit(EGameEvent.CHANGE_STAGE, value);
  }

  getResult(): TGameResult | null {
    return this.result;
  }

  private setResult(value: TGameResult | null) {
    this.result = value;
    this.emit(EGameEvent.CHANGE_RESULT, value);
  }

  getStartTime(): TTimeStamp | null {
    return this.startTime;
  }

  private setFields(value: TGameFields) {
    this.fields = value;
    this.emit(EGameEvent.CHANGE_BOARD, this.getBoard());
  }

  getBoard(): TGameBoard {
    const result: TGameBoard = [];

    let temp: TGameFields = [];

    this.fields.forEach((field) => {
      temp.push(field);

      if (temp.length === this.size) {
        result.push(temp);

        temp = [];
      }
    });

    return result;
  }

  private getFieldByPosition(position: Position) {
    return this.fields.find((f) => f.getPosition().isEqual(position));
  }

  getBombCount(): TGameBombCount {
    return this.bombCount;
  }

  private setBombCount(value: TGameBombCount) {
    this.bombCount = value;
    this.emit(EGameEvent.CHANGE_BOMB_COUNT, value);
  }

  getSelectedFieldsCount(): TGameSelectedFieldsCount {
    return this.selectedFieldsCount;
  }

  private setSelectedFieldsCount(value: TGameSelectedFieldsCount) {
    this.selectedFieldsCount = value;
    this.emit(EGameEvent.CHANGE_SELECTED_FIELDS_COUNT, value);
  }

  private changeFieldStageListener = ({
    currentValue,
    prevValue,
  }: TFieldChangeStageEvent) => {
    const whiteValues: TFieldStage[] = ['flag', 'question'];
    const blackValues: TFieldStage[] = ['open', 'close'];

    if (blackValues.includes(prevValue) && whiteValues.includes(currentValue)) {
      this.setSelectedFieldsCount(this.selectedFieldsCount + 1);
      return;
    }

    if (whiteValues.includes(prevValue) && blackValues.includes(currentValue)) {
      this.setSelectedFieldsCount(this.selectedFieldsCount - 1);
    }
  };

  private static generateFields(size: number): TGameFields {
    let x: TCoord = 0;
    let y: TCoord = 0;

    return Array.from({ length: size * size }, () => {
      const field = new Field(x, y);

      x++;
      if (x === size) {
        x = 0;
        y++;
      }

      return field;
    });
  }
}
