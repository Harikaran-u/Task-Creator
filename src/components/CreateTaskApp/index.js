import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

import TabItem from '../TabItem'
import TaskItem from '../TaskItem'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreateTaskApp extends Component {
  state = {
    selectedOption: tagsList[0].displayText,
    userInput: '',
    taskList: [],
    activeTab: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {selectedOption, userInput} = this.state
    const newTask = {
      optionName: selectedOption,
      taskName: userInput,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      userInput: '',
      selectedOption: tagsList[0].displayText,
      activeTab: '',
    }))
  }

  onChangeSelectedOption = event => {
    this.setState({selectedOption: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  collectTaskData = displayText => {
    const {activeTab} = this.state
    if (activeTab === displayText) {
      this.setState(() => ({
        activeTab: '',
      }))
    } else {
      this.setState({activeTab: displayText})
    }
  }

  render() {
    const {selectedOption, userInput, taskList, activeTab} = this.state
    const filteredData = taskList.filter(
      eachTask => eachTask.optionName.toLowerCase() === activeTab.toLowerCase(),
    )
    // console.log(activeTab)
    // console.log(filteredData)

    const updatedTask = activeTab === '' ? taskList : filteredData

    const app = (
      <div className="task-app-main-container">
        <div className="create-task-container">
          <h1 className="app-title">Create a task!</h1>
          <form className="task-form" onSubmit={this.onSubmitForm}>
            <label className="task-label" htmlFor="task">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              className="input-el"
              type="text"
              id="task"
              onChange={this.onChangeUserInput}
              value={userInput}
            />
            <label className="task-label" htmlFor="tags">
              Tags
            </label>
            <select
              className="input-el"
              id="tags"
              onChange={this.onChangeSelectedOption}
              value={selectedOption}
            >
              {tagsList.map(eachOption => (
                <option
                  className="option-style"
                  key={eachOption.optionId}
                  value={eachOption.optionId}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-container">
          <h1 className="tags-title">Tags</h1>
          <ul className="active-items-container">
            {tagsList.map(eachTab => (
              <TabItem
                key={eachTab.optionId}
                tabItems={eachTab}
                collectTaskData={this.collectTaskData}
              />
            ))}
          </ul>
          <h1 className="tags-title">Tasks</h1>
          {taskList.length === 0 ? (
            <p className="no-tasks">No Tasks Added Yet</p>
          ) : (
            <ul className="task-list-container">
              {updatedTask.map(eachTask => (
                <TaskItem key={eachTask.id} taskList={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
    return app
  }
}

export default CreateTaskApp
