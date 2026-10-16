# Todo-List

A simple Todo List app built with React and Vite. All data lives in local component state: there is no backend or database, so todos reset when the page is refreshed.

## Features

- Create, read, edit (title and status) and delete todos
- Statuses: To Do, In Progress, Done
- Username display and an editable profile (username, email, bio)
- Multi-select with bulk delete and bulk status change
- Filter by status and search by title
- Drag and drop to reorder
- Mark todos as favorite (heart)

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

## Run locally

```bash
git clone https://github.com/vysal/Todo-List.git
cd Todo-List
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

## Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload   |
| `npm run build`   | Create a production build in `dist/`   |
| `npm run preview` | Serve the production build locally     |

## Project structure

```
src/
  main.jsx   # entry point
  App.jsx    # app, profile, todo items and status dropdown
  App.css    # styles
```

## Usage tips

- Double-click a todo title (or click the pencil) to edit it. Enter saves, Esc cancels.
- Drag a row by the ⋮⋮ grip to reorder it.
- Tick checkboxes to select todos, then use the bulk controls above the list.
