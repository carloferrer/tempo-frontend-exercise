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
