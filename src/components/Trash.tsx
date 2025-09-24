import { type TDispatchStickies } from '../App';
import type { TSticky } from '../types';

interface TrashProps {
  stickyOnTheMove: TSticky | undefined;
  dispatchStickies: TDispatchStickies;
}

export const Trash = ({ stickyOnTheMove, dispatchStickies }: TrashProps) => {
  return (
    <div
      style={{
        backgroundColor: 'pink',
        position: 'absolute',
        height: 100,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      <p style={{ fontSize: 40 }}>🗑️</p>
    </div>
  );
};
