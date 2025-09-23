import type { TSticky } from '../types';

interface StickyProps extends TSticky {
  dispatchStickies: React.ActionDispatch<
    [
      action: TSticky & {
        type: 'add' | 'move' | 'delete';
        id: number;
      }
    ]
  >;
}

export const Sticky = ({
  id,
  note,
  position,
  size,
  onTheMove,
  dispatchStickies,
}: StickyProps) => {
  const sizeValue = size === 'large' ? 200 : 100;

  return (
    <div
      id={`sticky-${id}`}
      style={{
        backgroundColor: 'beige',
        width: `${sizeValue}px`,
        height: `${sizeValue}px`,
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
              x: clientX - sizeValue / 2,
              y: clientY - sizeValue / 2,
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
