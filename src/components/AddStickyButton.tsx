import { useMemo } from 'react';
import { type TStickies, type TDispatchStickies } from '../App';

interface AddStickyButtonProps {
  newNote: string;
  setNewNote: (n: string) => void;
  size: 200 | 300;
  stickies: TStickies;
  dispatchStickies: TDispatchStickies;
}

export const AddStickyButton = ({
  newNote,
  setNewNote,
  size,
  stickies,
  dispatchStickies,
}: AddStickyButtonProps) => {
  const newId = useMemo(() => Object.keys(stickies).length, [stickies]);
  const label = size === 200 ? 'small note' : 'BIG NOTE';

  return (
    <a
      onClick={({ clientX, clientY }) => {
        setNewNote('');
        dispatchStickies({
          type: 'add',
          id: newId,
          note: newNote,
          size,
          position: {
            x: clientX - size / 2,
            y: clientY - size / 1.5,
          },
          onTheMove: true,
        });
      }}
      style={{
        fontSize: 18,
        marginLeft: 10,
        padding: 10,
        border: 'solid black 1px',
        cursor: 'pointer',
      }}
    >
      + {label}
    </a>
  );
};
