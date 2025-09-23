import { type TDispatchStickies } from '../App';
import type { TSticky } from '../types';

interface StickyProps {
  sticky: TSticky;
  dispatchStickies: TDispatchStickies;
}

export const Sticky = ({ sticky, dispatchStickies }: StickyProps) => {
  const { id, note, position, size, onTheMove } = sticky;

  return (
    <div
      id={`sticky-${id}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: `${onTheMove ? 'grabbing' : 'grab'}`,
        backgroundColor: 'beige',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onMouseDown={() => {
        dispatchStickies({
          ...sticky,
          type: 'move',
          onTheMove: true,
        });
      }}
      onPointerMove={({ clientX, clientY }) => {
        if (onTheMove) {
          dispatchStickies({
            ...sticky,
            type: 'move',
            position: {
              x: clientX - size / 2,
              y: clientY - size / 2,
            },
          });
        }
      }}
      onMouseUp={() => {
        dispatchStickies({
          ...sticky,
          type: 'move',
          onTheMove: false,
        });
      }}
    >
      <p>{note}</p>
    </div>
  );
};
