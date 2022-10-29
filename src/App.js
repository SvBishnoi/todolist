import React,{useState,useRef} from 'react';
import './App.css';

function App() {

  const [todoList,setTodoList] = useState([]);
  const [currentTask,setCurrentTask] = useState("");

  const inputTask = useRef(null);


  const addTask = () => {
    setTodoList([...todoList,{task : currentTask, completed: false}]);
    inputTask.current.value = "";
    setCurrentTask("");
  }

  const deleteTask = (taskToDelete) => {
    setTodoList(todoList.filter((task) => {
      return task.task !== taskToDelete
    }))
  }

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((task) => {
      return task.task == taskToComplete 
      ? {task: taskToComplete, completed: true} 
      : {task: task.task, completed: task.completed ? true : false};
    })
    );
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
         ref={inputTask}
         type="text" 
         placeholder='type here..'
         onKeyDown={(event) => {
          if (event.keyCode == 13)
          {
          addTask();
          }
         }}
         onChange={(event) => {
          setCurrentTask(event.target.value)
         }}
         />
        <button onClick={addTask}>Add Task</button>
        <hr />
        <ul>
          {todoList.map((val,key) => {
            return (
              <div id="task">
                <li key={key}>{val.task}</li>
                <button onClick={() => completeTask(val.task)}>Completed</button>
                <button onClick={() => deleteTask(val.task)}>Delete</button>
                 {val.completed ? <h2>Task Completed</h2>: <h2>Task Not Completed</h2>}
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
