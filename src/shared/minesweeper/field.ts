import { EventEmitter } from 'events';
import { IField } from './interfaces';
import { Position, TCoord } from '../position';
import { EFieldEvent, TFieldAroundBombCount, TFieldStage } from './types';

export class Field extends EventEmitter implements IField {
  private stage: TFieldStage = 'close';
  private _isBomb: boolean = false;
  private _isBlownUp: boolean = false;
  private readonly position: Position;
  private aroundBombCount: TFieldAroundBombCount = 0;

  constructor(x: TCoord, y: TCoord) {
    super();

    this.position = new Position(x, y);
  }

  getStage(): TFieldStage {
    return this.stage;
  }

  setStage(value: TFieldStage): void {
    const prevValue = this.stage;
    const currentValue = value;

    this.stage = value;

    this.emit(EFieldEvent.CHANGE_STAGE, {
      prevValue,
      currentValue,
    });
  }

  isOpened(): boolean {
    return this.stage === 'open';
  }

  isBomb(): boolean {
    return this._isBomb;
  }

  isBlownUp(): boolean {
    if (!this.isBomb()) {
      console.warn('Поле не является бомбой');
      return false;
    }

    return this._isBlownUp;
  }

  blowUp() {
    if (!this.isBomb()) {
      console.warn('Поле не является бомбой');
      return;
    }

    this._isBlownUp = true;
  }

  markAsBomb(): void {
    this._isBomb = true;
  }

  getPosition(): Position {
    return this.position;
  }

  getAroundBombCount(): TFieldAroundBombCount {
    return this.aroundBombCount;
  }

  setAroundBombCount(value: TFieldAroundBombCount): void {
    this.aroundBombCount = value;
  }
}
