import { TCoord } from './types';

export class Position {
  constructor(readonly x: TCoord, readonly y: TCoord) {}

  /**
   * Сравнивает текущую позицию с переданной
   */
  isEqual(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }

  /**
   * Возвращает массив позиций вокруг текущей позиции
   */
  getAroundPositions(): Position[] {
    /**
     * -1;-1 0;-1 1;-1
     * -1;0 0;0 1;0
     * -1;1 0;1 1;1
     */

    const radius = 1;
    const aroundPositions = [
      new Position(this.x - radius, this.y - radius), // -1;-1
      new Position(this.x, this.y - radius), // 0; -1
      new Position(this.x + radius, this.y - radius), // 1;-1
      new Position(this.x - radius, this.y), // -1;0
      // this // 0;0
      new Position(this.x + radius, this.y), // 1;0
      new Position(this.x + radius, this.y + radius), // 1;1
      new Position(this.x, this.y + radius), // 0;1
      new Position(this.x - radius, this.y + radius), // -1;1
    ];

    return aroundPositions;
  }

  /**
   * Строковое представление позиции
   */
  toString() {
    return `${this.x}; ${this.y}`;
  }
}
