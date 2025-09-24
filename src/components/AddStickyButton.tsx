import { useMemo } from 'react';
import { type TStickies, type TDispatchStickies } from '../App';

interface AddStickyButtonProps {
  newNote: string;
  size: 200 | 300;
  stickies: TStickies;
  dispatchStickies: TDispatchStickies;
}

export const AddStickyButton = ({
  newNote,
  size,
  stickies,
  dispatchStickies,
}: AddStickyButtonProps) => {
  const mouseAtCenterShift = useMemo(() => size / 2, [size]);
  const newId = useMemo(() => Object.keys(stickies).length, [stickies]);

  return (
    <a
      onClick={({ clientX, clientY }) => {
        dispatchStickies({
          type: 'add',
          id: newId,
          note: newNote,
          size,
          position: {
            x: clientX - mouseAtCenterShift,
            y: clientY - mouseAtCenterShift,
          },
          onTheMove: true,
        });
      }}
      style={{ marginLeft: 10, padding: 10, border: 'solid black 1px' }}
    >
      + Size-{size} Sticky
    </a>
  );
};
