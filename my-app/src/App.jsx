import { useState } from 'react'
import img from './assets/白上フブキ-黒上フブキ.gif'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState([])
  const [activateTaskIndex, setActivateTaskIndex] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim() === '') return

    setTasks([...tasks, inputValue])
    setInputValue('')
  }

  return (
    <section>
      <div className="todo-container">
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

          <button type="submit">追加「ついか」</button>
        </form>

        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className="todo-item">
              <span className="todo-item__text">{task}</span>
              <button type="button" className="todo-item__menu" aria-label="メニュー" onClick={() => setActivateTaskIndex(index)}>
                <span className="todo-item__menu-icon">⋮</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default App
