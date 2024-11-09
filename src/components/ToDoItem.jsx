import PropTypes from "prop-types"
import "./style.css"
// THIS IS THE CHILD COMPONENT OF 'ToDoList'. It displays the task list

function ToDoItem({task, index, moveUp, moveDown, deleteTask, editTask}){
// We have destructured the Props object to directly access the keys.
    return(
        <>
            <li key={index}>
                            <span className="span-text">{task}</span>
                            <button className="edit-button" onClick={(e)=>editTask(e,index)}>✏️   
                            </button>
                            <button className="delete-button" onClick={()=>deleteTask(index)}>Delete   
                            </button>
                            <button className="move-button" onClick={()=>moveUp(index)}> 🔼
                            </button>
                            <button className="move-button" onClick={()=>moveDown(index)}> 🔽 
                            </button>
            </li>
        </>
    )
}

export default ToDoItem

// VALIDATION OF ALL PROP KEYS RECEIVED
ToDoItem.propTypes = {
    task: PropTypes.string,
    index: PropTypes.number,
    moveUp: PropTypes.func,
    moveDown: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func,
}