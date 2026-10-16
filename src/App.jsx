import { useEffect, useMemo, useRef, useState } from 'react'

const STATUSES = ['To Do', 'In Progress', 'Done']

const initialTodos = [
  { id: 1, title: 'Learn React basics', status: 'Done', starred: false },
  { id: 2, title: 'Build a todo app', status: 'In Progress', starred: true },
  { id: 3, title: 'Share it with friends', status: 'To Do', starred: false },
]

function Profile({ user, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(user)

  const save = (e) => {
    e.preventDefault()
    if (!draft.username.trim()) return
    onSave({ ...draft, username: draft.username.trim() })
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="profile">
        <div className="avatar">{user.username[0]?.toUpperCase()}</div>
        <div className="profile-info">
          <strong>{user.username}</strong>
          <span>{user.email}</span>
          <span>{user.bio}</span>
        </div>
        <button onClick={() => { setDraft(user); setEditing(true) }}>Edit profile</button>
      </div>
    )
  }

  return (
    <form className="profile profile-form" onSubmit={save}>
      <input
        placeholder="Username"
        value={draft.username}
        onChange={(e) => setDraft({ ...draft, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={draft.email}
        onChange={(e) => setDraft({ ...draft, email: e.target.value })}
      />
      <input
        placeholder="Bio"
        value={draft.bio}
        onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
      />
      <button type="submit" className="primary">Save</button>
      <button type="button" onClick={() => setEditing(false)}>Cancel</button>
    </form>
  )
}

function EditIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.66667 16.6875C1.20833 16.6875 0.815972 16.5243 0.489583 16.1979C0.163194 15.8715 0 15.4792 0 15.0208V3.35417C0 2.89583 0.163194 2.50347 0.489583 2.17708C0.815972 1.85069 1.20833 1.6875 1.66667 1.6875H7.10417C7.38194 1.6875 7.59028 1.77431 7.72917 1.94792C7.86805 2.12153 7.9375 2.3125 7.9375 2.52083C7.9375 2.72917 7.86458 2.92014 7.71875 3.09375C7.57292 3.26736 7.36111 3.35417 7.08333 3.35417H1.66667V15.0208H13.3333V9.58333C13.3333 9.30556 13.4201 9.09722 13.5937 8.95833C13.7674 8.81944 13.9583 8.75 14.1667 8.75C14.375 8.75 14.566 8.81944 14.7396 8.95833C14.9132 9.09722 15 9.30556 15 9.58333V15.0208C15 15.4792 14.8368 15.8715 14.5104 16.1979C14.184 16.5243 13.7917 16.6875 13.3333 16.6875H1.66667ZM5 10.8542V8.83333C5 8.61111 5.04167 8.39931 5.125 8.19792C5.20833 7.99653 5.32639 7.81944 5.47917 7.66667L12.6458 0.5C12.8125 0.333333 13 0.208333 13.2083 0.125C13.4167 0.0416667 13.625 0 13.8333 0C14.0556 0 14.2674 0.0416667 14.4687 0.125C14.6701 0.208333 14.8542 0.333333 15.0208 0.5L16.1875 1.6875C16.3403 1.85417 16.4583 2.03819 16.5417 2.23958C16.625 2.44097 16.6667 2.64583 16.6667 2.85417C16.6667 3.0625 16.6285 3.26736 16.5521 3.46875C16.4757 3.67014 16.3542 3.85417 16.1875 4.02083L9.02083 11.1875C8.86806 11.3403 8.69097 11.4618 8.48958 11.5521C8.28819 11.6424 8.07639 11.6875 7.85417 11.6875H5.83333C5.59722 11.6875 5.39931 11.6076 5.23958 11.4479C5.07986 11.2882 5 11.0903 5 10.8542ZM6.66667 10.0208H7.83333L12.6667 5.1875L12.0833 4.60417L11.4792 4.02083L6.66667 8.83333V10.0208Z" fill="currentColor" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.5 1.5H11.5M1.5 4H15.5M13.5 4L12.9 13.3C12.85 14.1 12.2 14.75 11.4 14.75H5.6C4.8 14.75 4.15 14.1 4.1 13.3L3.5 4M6.75 7V11.5M10.25 7V11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatusSelect({ value, onChange, placeholder = 'Select…', pill = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const key = (v) => v.replace(' ', '')

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className={`dropdown-btn ${pill ? 'pill' : ''} ${value ? `s-${key(value)}` : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value || placeholder}</span>
        <span className={`chevron ${open ? 'up' : ''}`}>▾</span>
      </button>
      {open && (
        <ul className="dropdown-menu" role="listbox">
          {STATUSES.map((st) => (
            <li
              key={st}
              role="option"
              aria-selected={st === value}
              className={`opt-${key(st)} ${st === value ? 'selected' : ''}`}
              onClick={() => { onChange(st); setOpen(false) }}
            >
              <span>{st}</span>
              {st === value && <span className="check">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function TodoItem({
  todo, selected, onSelect, onUpdate, onDelete,
  dragHandlers, dragging, dragOver,
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const saveTitle = () => {
    const t = title.trim()
    if (t) onUpdate({ title: t })
    else setTitle(todo.title)
    setEditing(false)
  }

  return (
    <li
      className={`todo ${dragging ? 'dragging' : ''} ${dragOver ? 'drag-over' : ''}`}
      draggable={!editing}
      {...dragHandlers}
    >
      <span className="grip" title="Drag to reorder">⋮⋮</span>
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        aria-label="Select todo"
      />
      <button
        className={`star ${todo.starred ? 'on' : ''}`}
        onClick={() => onUpdate({ starred: !todo.starred })}
        aria-label="Toggle favorite"
        title="Favorite"
      >
        <HeartIcon filled={todo.starred} />
      </button>

      {editing ? (
        <input
          className="title-edit"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveTitle()
            if (e.key === 'Escape') { setTitle(todo.title); setEditing(false) }
          }}
        />
      ) : (
        <span
          className={`title ${todo.status === 'Done' ? 'done' : ''}`}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <StatusSelect pill value={todo.status} onChange={(status) => onUpdate({ status })} />
      <button onClick={() => setEditing(true)} aria-label="Edit title"><EditIcon /></button>
      <button onClick={onDelete} aria-label="Delete todo"><DeleteIcon /></button>
    </li>
  )
}

export default function App() {
  const [user, setUser] = useState({
    username: 'Vysal',
    email: 'vysal@example.com',
    bio: 'Getting things done.',
  })
  const [todos, setTodos] = useState(initialTodos)
  const [newTitle, setNewTitle] = useState('')
  const [newStatus, setNewStatus] = useState(STATUSES[0])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [dragId, setDragId] = useState(null)
  const [overId, setOverId] = useState(null)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return todos.filter(
      (t) =>
        (filter === 'All' || t.status === filter) &&
        t.title.toLowerCase().includes(q),
    )
  }, [todos, filter, search])

  // Create
  const addTodo = (e) => {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) return
    setTodos((prev) => [...prev, { id: Date.now(), title, status: newStatus, starred: false }])
    setNewTitle('')
  }

  // Update
  const updateTodo = (id, patch) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))

  // Delete
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n })
  }

  // Bulk
  const toggleSelect = (id) =>
    setSelected((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  const allVisibleSelected = visible.length > 0 && visible.every((t) => selected.has(t.id))
  const toggleSelectAll = () =>
    setSelected(allVisibleSelected ? new Set() : new Set(visible.map((t) => t.id)))
  const bulkDelete = () => {
    setTodos((prev) => prev.filter((t) => !selected.has(t.id)))
    setSelected(new Set())
  }
  const bulkStatus = (status) => {
    if (!status) return
    setTodos((prev) => prev.map((t) => (selected.has(t.id) ? { ...t, status } : t)))
  }

  // Drag & drop reorder (operates on the full list, so it works while filtered)
  const drop = (targetId) => {
    if (dragId != null && dragId !== targetId) {
      setTodos((prev) => {
        const from = prev.findIndex((t) => t.id === dragId)
        const to = prev.findIndex((t) => t.id === targetId)
        const next = [...prev]
        const [moved] = next.splice(from, 1)
        next.splice(to, 0, moved)
        return next
      })
    }
    setDragId(null)
    setOverId(null)
  }

  const count = (s) => todos.filter((t) => t.status === s).length

  return (
    <div className="app">
      <header>
        <h1>📝 Todo List</h1>
        <p className="welcome">Welcome back, <strong>{user.username}</strong>!</p>
      </header>

      <Profile user={user} onSave={setUser} />

      <form className="add" onSubmit={addTodo}>
        <input
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <StatusSelect value={newStatus} onChange={setNewStatus} />
        <button type="submit" className="primary">Add</button>
      </form>

      <div className="toolbar">
        <div className="tabs">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              className={filter === s ? 'active' : ''}
              onClick={() => setFilter(s)}
            >
              {s} <span className="badge">{s === 'All' ? todos.length : count(s)}</span>
            </button>
          ))}
        </div>
        <input
          className="search"
          type="search"
          placeholder="Search todos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bulk">
        <label>
          <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} />
          Select all
        </label>
        {selected.size > 0 && (
          <>
            <span>{selected.size} selected</span>
            <StatusSelect value="" placeholder="Set status…" onChange={bulkStatus} />
            <button className="danger" onClick={bulkDelete}>Delete selected</button>
          </>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="empty">No todos found.</p>
      ) : (
        <ul className="list">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              selected={selected.has(t.id)}
              onSelect={() => toggleSelect(t.id)}
              onUpdate={(patch) => updateTodo(t.id, patch)}
              onDelete={() => deleteTodo(t.id)}
              dragging={dragId === t.id}
              dragOver={overId === t.id && dragId !== t.id}
              dragHandlers={{
                onDragStart: () => setDragId(t.id),
                onDragOver: (e) => { e.preventDefault(); setOverId(t.id) },
                onDrop: () => drop(t.id),
                onDragEnd: () => { setDragId(null); setOverId(null) },
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
