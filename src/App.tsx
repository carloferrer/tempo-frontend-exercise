import { useMemo, useReducer, useState } from 'react';
import type { TSticky } from './types';
import { Sticky } from './components/Sticky';
import { Trash } from './components/Trash';

type TStickies = Record<number, TSticky>;

type TStickiesReducer = (
  stickies: TStickies,
  action: TSticky & {
    type: 'add' | 'move' | 'delete';
  }
) => TStickies;

export type TDispatchStickies = React.ActionDispatch<
  [
    action: TSticky & {
      type: 'add' | 'move' | 'delete';
    }
  ]
>;

const stickiesReducer: TStickiesReducer = (stickies, action) => {
  const { type, id, note, size, position, onTheMove } = action;
  if (!note) return stickies;
  switch (type) {
    case 'add':
    case 'move':
      return { ...stickies, [id]: { id, note, size, position, onTheMove } };
    case 'delete':
      delete stickies[id];
      return { ...stickies };
    default:
      return stickies;
  }
};

function App() {
  const [stickies, dispatchStickies] = useReducer(stickiesReducer, {});
  const [newNote, setNewNote] = useState('');

  const stickyOnTheMove = useMemo(
    () => Object.values(stickies).find(({ onTheMove }) => onTheMove),
    [stickies]
  );

  const renderedStickies = Object.entries(stickies).map(([id, sticky]) => (
    <Sticky key={id} sticky={sticky} dispatchStickies={dispatchStickies} />
  ));

  return (
    <div>
      <input
        type='text'
        value={newNote}
        onChange={(e) => setNewNote(e.currentTarget.value)}
      />
      <a
        onClick={({ clientX, clientY }) => {
          dispatchStickies({
            type: 'add',
            id: Object.keys(stickies).length,
            note: newNote,
            size: 150,
            position: {
              x: clientX - 150 / 2,
              y: clientY - 150 / 2,
            },
            onTheMove: true,
          });
        }}
        style={{ margin: 10 }}
      >
        add small sticky
      </a>
      <a
        onClick={({ clientX, clientY }) => {
          dispatchStickies({
            type: 'add',
            id: Object.keys(stickies).length,
            note: newNote,
            size: 300,
            position: {
              x: clientX - 300 / 2,
              y: clientY - 300 / 2,
            },
            onTheMove: true,
          });
        }}
        style={{ margin: 10 }}
      >
        add large sticky
      </a>
      <>{renderedStickies}</>
      <Trash
        stickyOnTheMove={stickyOnTheMove}
        dispatchStickies={dispatchStickies}
      />
    </div>
  );
}

export default App;
