import './index.css'

const TaskItem = props => {
  const {taskList} = props
  const {taskName, optionName} = taskList
  const task = (
    <li className="task-list">
      <p className="task-name">{taskName}</p>
      <p className="task-genre">{optionName}</p>
    </li>
  )
  return task
}

export default TaskItem
