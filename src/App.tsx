import { useMemo, useReducer } from 'react';
import type { TSticky } from './types';
import { Sticky } from './components/Sticky';
import { AddStickySection } from './components/AddStickySection';
import { Trash } from './components/Trash';

export type TStickies = Record<number, TSticky>;

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

  const stickyOnTheMove = useMemo(
    () => Object.values(stickies).find(({ onTheMove }) => onTheMove),
    [stickies]
  );

  const renderedStickies = Object.entries(stickies).map(([id, sticky]) => (
    <Sticky key={id} sticky={sticky} dispatchStickies={dispatchStickies} />
  ));

  return (
    <div style={{ paddingTop: '20px' }}>
      <AddStickySection
        stickies={stickies}
        dispatchStickies={dispatchStickies}
      />
      <>{renderedStickies}</>
      <Trash
        stickyOnTheMove={stickyOnTheMove}
        dispatchStickies={dispatchStickies}
      />
    </div>
  );
}

export default App;
