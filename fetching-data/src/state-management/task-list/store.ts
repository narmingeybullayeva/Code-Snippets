import { create } from 'zustand';

export interface Task {
    id: string;
    title: string
    isCompleted: boolean
    date: Date
}

interface TaskStore {
    tasks: Task[];
    setTask: (task: Task) => void;
    updateTask: (id:string, updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    setTasks: (tasks: Task[]) => void;
    completeTask: (id: string, status: boolean) => void;
}

const useTaskStore = create<TaskStore>(set => ({
    tasks: [],
    setTask: (task) => set((state)=> ({tasks:[...state.tasks, task]})),
    updateTask: (id,updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === id ? updatedTask : task)
    })),
    deleteTask: (id) => set((state) => ({tasks: state.tasks.filter((task)=> task.id !== id)})),
    setTasks: (tasks) => set({tasks:tasks }),
    completeTask: (id, status) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === id ? { ...task, isCompleted: status } : task)
    }))
}))

export default useTaskStore