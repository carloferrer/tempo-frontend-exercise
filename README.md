# Tempo Software - Frontend Exercise

https://github.com/user-attachments/assets/25bacce8-ca9c-458c-8bbc-5a3faef35387

Run the following to get started:

```
$ git clone git@github.com:carloferrer/tempo-frontend-exercise.git
$ cd tempo-frontend-exercise
$ npm i
$ npm run dev
```

## Features

3 of 4 proposed features were implemented.

### Create a new note of the specified size at the specified position

To create a new note:

1. Type the new note's text at the input field at the top
1. Click either **"+ small note"** or **"+ BIG NOTE"** buttons
1. At this point, the new note will follow your cursor; position the new note with your cursor, and click to place the note

### Move a note by dragging

To move a note, click and drag!

### Remove a note by dragging it over a predefined "trash" zone

The trash zone is indicated by a pink section at the bottom of the screen. Drag notes to this area to delete them.

## Architecture

### Build

The project is built on Vite with React and TypeScript + SWC.

```
$ npm create vite@latest
```

In my experience spinning up hobby projects and experiments, this has proven to grant very fast local server startup and HMR.

### Directory Structure

- Any abstracted React components live at `src/components/`; this simplifies the composition of more complex TSX arrangements
- Type definitions are kept in the same file as the components their based on; otherwise, shared types with no clear source of truth live at `src/types.ts`

### Code Structure

- `useReducer` is leveraged to neatly manage the sticky note data, keeping the state's update logic contained
- Styles were defined directly against TSX to minimize developer overhead

## Other Notes

Per the assessment instructions, I allowed myself ~6hrs to build this project, including:

- Design
- Technical research
- Testing/troubleshooting

As such, compromises were made to meet the project's requirements within the limited timeframe.
