import './index.css'

const TabItem = props => {
  const {tabItems, collectTaskData} = props

  const {displayText} = tabItems

  const filterTask = () => {
    collectTaskData(displayText)
  }

  const tab = (
    <li className="tab-list">
      <button className="tab-btn" type="button" onClick={filterTask}>
        {displayText}
      </button>
    </li>
  )
  return tab
}

export default TabItem
