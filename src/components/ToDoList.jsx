import {useState} from "react"
import ToDoItem from "./ToDoItem";
import "./style.css"

// THIS IS THE PARENT COMPONENT OF 'ToDoItem'. It handles the functionalities/features 
function ToDoList(){

    const [taskList, setTaskList] = useState([{task:"1", status: false}, {task:"2", status: false}, {task:"3", status: false}, {task:"4", status: false}]); // Empty array of objects initially  - 
    // Object will  2 properties - task, status
    const [newTask, setNewTask] = useState(""); // No task typed initially
    const [editStatus, setEditStatus] = useState(null); // to be used for toggling between Add/Edit
    const [buttonText, setButtonText] = useState('Add Task'); // To update the Button Text
        
    function handleTypedString(event){ // Callback for input box typing
        setNewTask(event.target.value);    
    }

    function addTask(){ // Callback for Add button
        if(newTask.trim()) // Ensures the value if true after trimming all white spaces at both ends
            // ADDING OPERATION
            if(editStatus === null){
                setTaskList(taskList=>[...taskList, {task: newTask, status: false}]); //NewArray with an extra added newTask
                setNewTask(""); // Clears the searchbar after Adding a task
            }
            // EDITING OPERATION
            else if(editStatus !== null){
                const affectedList = [...taskList]; // Copy of existing task list
                affectedList[editStatus] = {task: newTask, status: taskList[editStatus].status}; // Value present inside Input box
                setTaskList(affectedList); // Mutates the TaskList (Updation after Editing)
                setNewTask("");
                setButtonText("Add Task");
                setEditStatus(null);
            }
            if(!newTask.trim())
                alert("Please enter a task");
    }       

    function deleteTask(index){ // Callback for Delete button
        const splicedTaskList = taskList.filter((task, i) => i !== index);
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
    
    function editTask(index){ // Callback for Editing a Task     
       setNewTask(taskList[index].task); 
       // newTask is bound to input element's value as value = {newTask}
       // we are updating newTask to the value in taskList[index] which is a separate array.
       setButtonText("Update Task"); 
       setEditStatus(index); // NULL value of EditStatus is updated to index position for edit
       //Refer to AddTask() above
    }

    function markTask(index){
        const copyOfTaskList = [...taskList];
        copyOfTaskList[index].status = !copyOfTaskList[index].status; // False--> True and Vice-versa
        setTaskList(copyOfTaskList);
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
                    {taskList.map((Task, index) => 
                        <ToDoItem key={index} Task={Task} index={index} 
                                moveUp={moveUp} moveDown={moveDown} 
                                deleteTask={deleteTask} editTask={editTask} markTask={markTask}/>
                    )}
                </ol>
            </div>
        </>
    )
}

export default ToDoList