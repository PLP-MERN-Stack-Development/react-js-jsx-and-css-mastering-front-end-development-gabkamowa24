import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  function addTask() {
    const t = text.trim()
    if (!t) return
    const id = Date.now()
    setTasks([...tasks, { id, text: t, completed: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.completed
    return t.completed
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-grow border p-2 rounded"
        />
        <button onClick={addTask} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'border'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'border'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'border'}`}
        >
          Completed
        </button>
      </div>

      <ul className="space-y-2">
        {filtered.length === 0 && <li className="text-sm text-gray-500">No tasks to show</li>}
        {filtered.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
            </div>
            <div>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
