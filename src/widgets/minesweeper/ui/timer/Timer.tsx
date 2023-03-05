import { FC, useEffect, useState } from 'react';
import { NumberDisplay } from '../../../../shared/ui/number-display';
import { useGameInstance, useGameStage } from '../../hooks';

export const Timer: FC = () => {
  const game = useGameInstance();
  const stage = useGameStage();
  const [state, setState] = useState(0);

  useEffect(() => {
    if (stage === 'finished') {
      return;
    }

    if (stage === 'not_started') {
      setState(0);
      return;
    }

    const startTime = game.getStartTime();

    if (startTime === null) return;

    let timer: ReturnType<typeof setInterval>;

    timer = setInterval(() => {
      const nowTime = Date.now();
      const nextState = Math.floor((nowTime - startTime) / 1000);

      setState(nextState);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [stage]);

  return <NumberDisplay value={state} />;
};
