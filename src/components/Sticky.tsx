import { type TDispatchStickies } from '../App';
import type { TSticky } from '../types';

interface StickyProps extends TSticky {
  dispatchStickies: TDispatchStickies;
}

export const Sticky = ({
  id,
  note,
  position,
  size,
  onTheMove,
  dispatchStickies,
}: StickyProps) => {
  return (
    <div
      id={`sticky-${id}`}
      style={{
        backgroundColor: 'beige',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: `${onTheMove ? 'grabbing' : 'grab'}`,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onMouseDown={() => {
        console.log(`grabbing ${id}`);
        dispatchStickies({
          type: 'move',
          id,
          note,
          size,
          position,
          onTheMove: true,
        });
      }}
      onPointerMove={({ clientX, clientY }) => {
        if (onTheMove) {
          console.log({ id, clientX, clientY });
          dispatchStickies({
            type: 'move',
            id,
            note,
            size,
            position: {
              x: clientX - size / 2,
              y: clientY - size / 2,
            },
            onTheMove,
          });
        }
      }}
      onMouseUp={() => {
        console.log(`released ${id}`);
        dispatchStickies({
          type: 'move',
          id,
          note,
          size,
          position,
          onTheMove: false,
        });
      }}
    >
      <p>
        id: {id} | {note}
      </p>
    </div>
  );
};
