import { useMemo, useReducer, useState } from 'react';
import type { TSticky } from './types';
import { Sticky } from './components/Sticky';

type StickiesType = Record<number, TSticky>;

const Trash = ({ stickyOnTheMove, dispatchStickies }) => {
  return (
    <div
      style={{
        backgroundColor: 'tomato',
        position: 'absolute',
        height: 100,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onMouseOver={() => {
        if (stickyOnTheMove) {
          dispatchStickies({
            ...stickyOnTheMove,
            type: 'delete',
          });
        }
      }}
    >
      <p>shadow realm</p>
    </div>
  );
};

type StickiesReducerType = (
  stickies: StickiesType,
  action: StickyType & {
    type: 'add' | 'move' | 'delete';
    id: number;
  }
) => StickiesType;

const stickiesReducer: StickiesReducerType = (stickies, action) => {
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
    <Sticky
      key={id}
      id={sticky.id}
      note={sticky.note}
      size={sticky.size}
      dispatchStickies={dispatchStickies}
      position={sticky.position}
      onTheMove={sticky.onTheMove}
    />
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
            size: 'small',
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
            size: 'large',
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
