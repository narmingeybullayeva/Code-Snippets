import { useEffect, useState } from 'react'
import useModalStore from '../state-management/modal/store'
import useTaskStore from '../state-management/task-list/store'
import axios from 'axios'


const Modal = () => {

  const closeModal = useModalStore((store) => store.closeModal)
  const task = useModalStore((store) => store.task)
  const updateTask = useTaskStore((store) => store.updateTask)
  const [taskTitle,setTaskTitle] = useState(task.title)
  const [taskStatus,setTaskStatus] = useState(task.isCompleted)
  const [taskDate,setTaskDate] = useState(new Date(task.date))
  const [error, setError] = useState()


  const handleUpdate = () => {
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      isCompleted: taskStatus,
      date: taskDate
    }

    updateTask(task.id,updatedTask)

    axios.patch(`http://localhost:3000/tasksx/${task.id}`, updatedTask)
    .then(() => closeModal())
    .catch((error) => {
      setError(error.message)
      updateTask(task.id, task)
    })

  }



  return (
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>


  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Update Modal</h3>
              {error && <p className='text-red-800'>Error meydana çıxdı</p>}
              <div className="mt-2 d-flex">
                <p className="text-sm font-bold text-gray-500">Title: </p>
                <input type="text" className='ms-3 border-1' onChange={(e)=> setTaskTitle(e.target.value)}  value={taskTitle}/>
              </div>   
              <div className="mt-2 flex gap-2 items-center">
                <p className="text-sm font-bold text-gray-500">Task Status: </p>
                <input type="checkbox" onChange={(e) => setTaskStatus(e.target.checked)} checked={taskStatus}/>
              </div>     
              <div className="mt-2 flex gap-2 items-center">
                <p className="text-sm font-bold text-gray-500">Created Date: </p>
                <input type="date" onChange={(e) => setTaskDate(new Date(e.target.value))} value={taskDate.toISOString().slice(0, 10)}/>
              </div>      
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={handleUpdate} className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-500 hover:bg-blue-600 sm:ml-3 sm:w-auto">Update Task</button>
          <button onClick={()=> closeModal()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 shadow-sm ring-1 ring-inset ring-red-300  sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Modal