import React, {useState} from "react"
import ToDoItem from "./ToDoItem";
import "./style.css"

// THIS IS THE PARENT COMPONENT OF 'ToDoItem'. It handles the functionalities/features 
function ToDoList(){

    const [taskList, setTaskList] = useState(["1st task","2nd task","3rd task"]); // Empty array initially
    const [newTask, setNewTask] = useState(""); // No task typed initially
    const [editStatus, setEditStatus] = useState(null); // to be used for toggling between Add/Edit
    const [buttonText, setButtonText] = useState('Add Task')
    // let buttonToggle = document.getElementsByClassName("add-button")[0]; //  AddTask button targeted
    
    function handleTypedString(event){ // Callback for input box typing
        setNewTask(event.target.value);    
    }

    function addTask(){ // Callback for Add button
        if(newTask.trim()) // Ensures the value if true after trimming all white spaces at both ends
            // ADDING OPERATION
            if(editStatus === null){
                setTaskList(taskList=>[...taskList, newTask]); //NewArray with an extra added newTask
                setNewTask(""); // Clears the searchbar after Adding a task
            }
            // EDITING OPERATION
            else if(editStatus !== null){
                const affectedList = [...taskList]; // Copy of existing task list
                affectedList[editStatus] = newTask; // Value present inside Input box
                setTaskList(affectedList); // Mutates the TaskList (Updation after Editing)
                setNewTask("");
                setButtonText("Add Task");
                setEditStatus(null);
            } 
    }       

    function deleteTask(index){ // Callback for Delete button
        const splicedTaskList = taskList.filter(task => task != taskList[index]);
        //Filter method to return all such tasks that don't match the to-be-deleted task
        setTaskList(splicedTaskList); // Update the taskList array with one task less.
    }

    function moveUp(index){ // Callback for Shuffling places with previous task 
        if(index===0)
            return;
        let duplicateList = [...taskList]; // Creating a copty instead of referencing
        let temp = duplicateList[index];
        duplicateList[index] = duplicateList[index-1];
        duplicateList[index-1] = temp; 
        setTaskList(duplicateList); 
    }

    function moveDown(index){ // Callback for Shuffling places with previous task
        if(index===taskList.length-1)
            return;
        let copyList = [...taskList]; // Creating a copty instead of referencing
        let temp = copyList[index];
        copyList[index] = copyList[index+1];
        copyList[index+1] = temp; 
        setTaskList(copyList); 
    }
    
    function editTask(event,index){ // Callback for Editing a Task     
       setNewTask(taskList[index]); 
       // newTask is bound to input element's value as value = {newTask}
       // we are updating newTask to the value in taskList[index] which is a separate array.
       setButtonText("Update Task"); 
       setEditStatus(index); // NULL value of EditStatus is updated to index position for edit
       //Refer to AddTask() above
    }
// WE WILL PASS A PROP FROM THIS PARENT COMPONENT TO CHILD COMPONENT BY WRAPPING THE STATE VARIABLES, REFERENCE TO EVENT HANDLER FUNCTIONS & THE KEYS THEMSELVES. WE WILL PASS EACH PROP TO ITS CORRESPONDING TASK MODULE BY ITERATING OVER ENTIRE TASKLIST ARRAY BY USE OF MAP.
    return(
        <>
            <div className="to-do-list"> 
                <div className="search-bar">
                    <img src="./images/task-list_icon.png" width="70" height="65" id="logo"/>
                    <input type="text" placeholder="Enter a task" value={newTask}
                    onChange={handleTypedString} className="input-box"/>
                    <button className="add-button" onClick={addTask}>{buttonText}</button>
                </div>
                <ol>
                    {taskList.map((task, index) => 
                        <ToDoItem key={index} task={task} index={index} 
                                moveUp={moveUp} moveDown={moveDown} 
                                deleteTask={deleteTask} editTask={editTask} />
                    )}
                </ol>
            </div>
        </>
    )
}

export default ToDoList