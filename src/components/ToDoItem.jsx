import PropTypes from "prop-types"
import "./style.css"
// THIS IS THE CHILD COMPONENT OF 'ToDoList'. It displays the task list

function ToDoItem({Task, index, moveUp, moveDown, deleteTask, editTask, markTask}){
// We have destructured the Props object to directly access the keys.
    return(
        <>
            <li key={index} className={Task.status?'status-completed':''}>
                            <span className={`span-text ${Task.status?'completed':''}`}>{Task.task}</span>
                            <button className="edit-button" onClick={()=>editTask(index)}>✏️   
                            </button>
                            <button className="delete-button" onClick={()=>deleteTask(index)}>Delete   
                            </button>
                            <button className="move-button" onClick={()=>moveUp(index)}> 🔼
                            </button>
                            <button className="move-button" onClick={()=>moveDown(index)}> 🔽 
                            </button>
                            <input className="mark-complete" type="checkbox" checked={Task.status}
                            onChange={()=>markTask(index)} title="Mark as complete"/> 
            </li>
        </>
    )
}

export default ToDoItem

// VALIDATION OF ALL PROP KEYS RECEIVED
ToDoItem.propTypes = {
    Task: PropTypes.shape({ 
        task: PropTypes.string,
        status: PropTypes.bool,
        }),
    index: PropTypes.number,
    moveUp: PropTypes.func,
    moveDown: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func,
    markTask: PropTypes.func,
}