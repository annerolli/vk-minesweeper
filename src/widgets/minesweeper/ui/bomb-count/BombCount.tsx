import { FC } from 'react';
import { NumberDisplay } from '../../../../shared/ui/number-display';
import { useGameBombCount, useGameSelectedFieldsCount } from '../../hooks';

export const BombCount: FC = () => {
  const bombCount = useGameBombCount();
  const selectedFieldsCount = useGameSelectedFieldsCount();

  const count = Math.max(bombCount - selectedFieldsCount, 0);

  return <NumberDisplay value={count} />;
};
