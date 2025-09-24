import { useState } from 'react';
import { type TStickies, type TDispatchStickies } from '../App';
import { AddStickyButton } from './AddStickyButton';

interface AddStickySectionProps {
  stickies: TStickies;
  dispatchStickies: TDispatchStickies;
}

export const AddStickySection = ({
  stickies,
  dispatchStickies,
}: AddStickySectionProps) => {
  const [newNote, setNewNote] = useState('');

  return (
    <section>
      <input
        type='text'
        value={newNote}
        onChange={(e) => setNewNote(e.currentTarget.value)}
      />
      <AddStickyButton
        newNote={newNote}
        size={200}
        stickies={stickies}
        dispatchStickies={dispatchStickies}
      />
      <AddStickyButton
        newNote={newNote}
        size={300}
        stickies={stickies}
        dispatchStickies={dispatchStickies}
      />
    </section>
  );
};
