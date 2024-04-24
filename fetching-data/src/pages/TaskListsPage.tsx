import axios from "axios"
import { useEffect, useState } from "react"
import Modal from '../components/Modal';
import useModalStore from '../state-management/modal/store';
import useTaskStore, { Task } from '../state-management/task-list/store';



const TaskListsPage = () => {
  // const [tasks, setTask] = useState<Task[]>([])
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const {isActive, openModal} = useModalStore()
  const tasks = useTaskStore((store) => store.tasks)
  const setTask = useTaskStore((store) => store.setTask)
  const setTasks = useTaskStore((store) => store.setTasks)
  const updateTask = useTaskStore((store) => store.updateTask)
  const deleteTask = useTaskStore((store) => store.deleteTask)
  const completeTask = useTaskStore((store) => store.completeTask)

  
  
  useEffect(() => {

    setLoading(true)

    axios
      .get<Task[]>("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data)
        setLoading(false)
      })
  }, [])

  // Update task Pessimistik

  // async function updateTaskPessimistik  (taskId: string) {
  //   // const oldTasks = tasks
  //   setLoading(true)
  //   const task = tasks.find(task => task.id == taskId)
    
  //   await axios.put(`http://localhost:3000/tasks/${taskId}`, {
  //     ...task , isCompleted: !task?.isCompleted
  //   })   
  //   .then(() => {
  //     setTask(tasks.map(task => {
  //       return task.id == taskId ? {...task, isCompleted: !task.isCompleted}: task}
  //     ))
  //   }) 
  //   .catch(error => {
  //     // setTask(oldTasks)
  //     setError(error.message)
  //   })  
  //   .finally(() => setLoading(false))
  // }


  // Update task Optimistik

  // async function updateTaskOptimistik  (taskId: string) {
  //   const oldTasks = tasks

  //   updateTask()

  //   const task = tasks.find(task => task.id == taskId)
    
  //   await axios.put(`http://localhost:3000/tasks/${taskId}`, {
  //     ...task , isCompleted: !task?.isCompleted
  //   })
  //   .catch(error => {
  //     setTask(oldTasks)
  //     setError(error.message)
  //   })  
  //   .finally(() => setLoading(false))
  // }

  // Delete Task

  function handleDelete(taskId: string) {
    const oldTasks = tasks
    deleteTask(taskId)

    axios.delete(`http://localhost:3000/tasks/${taskId}`)
      .catch(error=>{
        setTasks(oldTasks)
        setError(error.message)
      })
  }

  // Add Task

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newTask:Task = {
      id : Date.now().toString(),
      title: taskTitle,
      date: new Date(),
      isCompleted: false
    }

    setTask(newTask)

    axios.post('http://localhost:3000/tasks', newTask)

    setTaskTitle('')
  }

  // Chek is completed or not

  function handleChecked(id: string,status : boolean) {
    const oldState = tasks
    completeTask(id,status)

    axios.patch(`http://localhost:3000/tasks/${id}`, {isCompleted: status})
    .catch(error => {
      setError('Checkbox error: ' + error.message)
      setTasks(oldState)
    })


  }


  return (
    <div className="container mt-4">
      <form action="" onSubmit={(e) => addTask(e)} className="form-group d-flex gap-3 ">
      <input type="text" className='border' onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} />
      <button className="btn btn-primary">Add Task</button>
      </form>
      
      <ul className="list-group mt-5">
{/* Lodaing */}

    {loading && <p>Loading...</p>}

{/* Error message: */}
      {error && <p className='text-danger'>{error}</p>}


        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center px-4 py-2 border-b border-gray-200 ${task.isCompleted && 'bg-light'}`}>
            <label htmlFor={`taskCheck_${task.id}`}>
              <div className='flex gap-2 items-center'>
                <input id={`taskCheck_${task.id}`} type="checkbox"  disabled={loading} onChange={(e) => handleChecked(task.id,e.target.checked)} checked={task.isCompleted} />
                <span className={`flex-grow-1  ${task.isCompleted && 'text-decoration-line-through '}`}>{task.title}</span>
              
              </div>
            </label>
            <div className='flex gap-4'>
              <span className='text-primary '>{new Date(task.date).toLocaleDateString()}</span>
              <button onClick={()=> openModal(task)} className="btn btn-outline-info">Update</button>
              <button onClick={() => handleDelete(task.id)} className="btn btn-outline-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isActive && <Modal/> }
    </div>


  )
}

export default TaskListsPage
