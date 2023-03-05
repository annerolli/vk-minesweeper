import { FC } from 'react';
import './NumberDisplay.css';

type TProps = {
  /**
   * Отображаемое число
   */
  value: number;
  /**
   * Количество разрядов, которое нужно отобразить
   */
  digitCount?: number;
};

export const NumberDisplay: FC<TProps> = ({ value, digitCount = 3 }) => {
  if (digitCount < 1) {
    digitCount = 1;
  }

  let elements = Array.from(value.toString());

  if (elements.length < digitCount) {
    const diff = digitCount - elements.length;
    const rest = Array.from({ length: diff }, () => '0');

    elements = [...rest, ...elements];
  } else if (elements.length > digitCount) {
    elements = Array.from({ length: digitCount }, () => '9');
  }

  return (
    <div className="NumberDisplay">
      {elements.map((el, index) => (
        <div
          key={index}
          className={`NumberDisplay__Element NumberDisplay__Element--${el}`}
        />
      ))}
    </div>
  );
};
