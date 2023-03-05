import './Board.css';
import { FC } from 'react';
import { Field } from '../field';
import { useGameBoard } from '../../hooks';
import { useFace } from '../../context';
import { EFace } from '../../types';

export const Board: FC = () => {
  const { boardId, board } = useGameBoard();
  const { setValue } = useFace();

  const setOhFace = () => {
    setValue(EFace.OH);
  };

  const setSmileFace = () => {
    setValue(EFace.SMILE);
  };

  return (
    <div
      className="Board"
      onMouseDown={setOhFace}
      onMouseUp={setSmileFace}
      onMouseLeave={setSmileFace}
    >
      {board.map((row, index) => (
        <div key={`${boardId}&${index}`} className="Board__row">
          {row.map((field) => (
            <Field
              key={`${boardId}:${field.getPosition().toString()}`}
              value={field}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
