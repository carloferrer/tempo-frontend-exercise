import { useState, useMemo } from 'react';

interface StickyProps {
  size: 'small' | 'large';
}

export const Sticky = ({ size }: StickyProps) => {
  const [note, setNote] = useState<string>('Type your note here!');

  return (
    <div className={`sticky ${size}`}>
      <textarea
        className='note'
        value={note}
        onChange={(e) => setNote(e.currentTarget.value)}
      />
    </div>
  );
};
