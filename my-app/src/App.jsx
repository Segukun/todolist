import { useState } from 'react'
import img from './assets/白上フブキ-黒上フブキ.gif'
import './App.css'

function IconList({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function IconCheckCircle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconCircle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [activeTaskIndex, setActiveTaskIndex] = useState(null)
  const [editTaskIndex, setEditTaskIndex] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  const visibleTasks = tasks
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => {
      if (activeTab === 'pending') return !task.completed
      if (activeTab === 'completed') return task.completed
      return true
    })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') return

    if (editTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) => (
        index === editTaskIndex ? { ...task, text: inputValue } : task
      ))

      setTasks(updatedTasks)
      setEditTaskIndex(null)
      setInputValue('')
      return
    }

    setTasks([...tasks, { text: inputValue, completed: false }])
    setInputValue('')
  }

  const handleEdit = () => {
    setInputValue(tasks[activeTaskIndex].text)
    setEditTaskIndex(activeTaskIndex)
    setActiveTaskIndex(null)
  }

  const handleDelete = () => {
    const updatedTasks = tasks.filter((task, index) => index !== activeTaskIndex)

    setTasks(updatedTasks)
    setActiveTaskIndex(null)

    if (editTaskIndex === activeTaskIndex) {
      setInputValue('')
      setEditTaskIndex(null)
    } else if (editTaskIndex !== null && activeTaskIndex < editTaskIndex) {
      setEditTaskIndex(editTaskIndex - 1)
    }
  }

  const handleToggleTask = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) => (
      index === taskIndex ? { ...task, completed: !task.completed } : task
    ))

    setTasks(updatedTasks)
  }

  const handleCancelEdit = () => {
    setInputValue('')
    setEditTaskIndex(null)
  }

  return (
    <section>
      <div className="app-screen">
        <main className="todo-container">
          <div className="todo-header">
            <h1>僕のタスク</h1>
          </div>

          <img src={img} className="base" width="170" height="179" alt="" />

          <form className="todo-input-section" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="例: 新しい漫画を買う..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button type="submit">
              {editTaskIndex !== null ? '保存' : '追加「ついか」'}
            </button>
          </form>

          {editTaskIndex !== null && (
            <button type="button" className="todo-cancel-edit" onClick={handleCancelEdit}>
              キャンセル
            </button>
          )}

          <ul className="todo-list">
            {visibleTasks.length > 0 ? (
              visibleTasks.map(({ task, index }) => (
                <li key={index} className={`todo-item ${task.completed ? 'todo-item--completed' : ''}`}>
                  <button type="button" className="todo-item__status" aria-label={task.completed ? '未完了にする' : '完了にする'} onClick={() => handleToggleTask(index)}>
                    {task.completed ? <IconCheckCircle className="todo-item__status-icon" /> : <IconCircle className="todo-item__status-icon" />}
                  </button>
                  <span className="todo-item__text">{task.text}</span>
                  <button type="button" className="todo-item__menu" aria-label="メニュー" onClick={() => setActiveTaskIndex(index)}>
                    <span className="todo-item__menu-icon">⋮</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="todo-empty">タスクはまだありません</li>
            )}
          </ul>
        </main>

        <nav className="todo-navbar" aria-label="メイン">
          <button
            type="button"
            className={`todo-navbar__tab ${activeTab === 'all' ? 'todo-navbar__tab--active' : ''}`}
            aria-current={activeTab === 'all' ? 'page' : undefined}
            onClick={() => setActiveTab('all')}
          >
            <IconList className="todo-navbar__icon" />
            <span className="todo-navbar__label">すべて</span>
          </button>

          <button
            type="button"
            className={`todo-navbar__tab ${activeTab === 'pending' ? 'todo-navbar__tab--active' : ''}`}
            aria-current={activeTab === 'pending' ? 'page' : undefined}
            onClick={() => setActiveTab('pending')}
          >
            <IconCircle className="todo-navbar__icon" />
            <span className="todo-navbar__label">未完了</span>
          </button>

          <button
            type="button"
            className={`todo-navbar__tab ${activeTab === 'completed' ? 'todo-navbar__tab--active' : ''}`}
            aria-current={activeTab === 'completed' ? 'page' : undefined}
            onClick={() => setActiveTab('completed')}
          >
            <IconCheckCircle className="todo-navbar__icon" />
            <span className="todo-navbar__label">完了</span>
          </button>
        </nav>
      </div>

      {activeTaskIndex !== null && (
        <div
          className="action-sheet-overlay"
          role="presentation"
          onClick={() => setActiveTaskIndex(null)}
        >
          <div
            className="action-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="action-sheet-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="action-sheet__panel">
              <p id="action-sheet-title" className="action-sheet__title">
                タスクを選択
                <span>{tasks[activeTaskIndex].text}</span>
              </p>
              <div className="action-sheet__separator" />
              <button type="button" className="action-sheet__btn" onClick={handleEdit}>
                編集
              </button>
              <div className="action-sheet__separator" />
              <button type="button" className="action-sheet__btn action-sheet__btn--destructive" onClick={handleDelete}>
                削除
              </button>
            </div>

            <button type="button" className="action-sheet__btn action-sheet__btn--cancel" onClick={() => setActiveTaskIndex(null)}>
              キャンセル
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default App
