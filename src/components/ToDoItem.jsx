import PropTypes from "prop-types"
import "./style.css"
// THIS IS THE CHILD COMPONENT OF 'ToDoList'. It displays the task list

function ToDoItem({task, index, moveUp, moveDown, deleteTask, editTask, markTask}){
// We have destructured the Props object to directly access the keys.
    return(
        <>
            <li key={index}>
                            <span className="span-text">{task.task}</span>
                            <button className="edit-button" onClick={()=>editTask(index)}>✏️   
                            </button>
                            <button className="delete-button" onClick={()=>deleteTask(index)}>Delete   
                            </button>
                            <button className="move-button" onClick={()=>moveUp(index)}> 🔼
                            </button>
                            <button className="move-button" onClick={()=>moveDown(index)}> 🔽 
                            </button>
                            <input className="mark-complete" type="checkbox" checked={task.status}
                            onChange={()=>markTask(index)}/> 
            </li>
        </>
    )
}

export default ToDoItem

// VALIDATION OF ALL PROP KEYS RECEIVED
ToDoItem.propTypes = {
    task: PropTypes.shape({ 
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