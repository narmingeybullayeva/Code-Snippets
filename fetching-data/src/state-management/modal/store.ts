import { create } from 'zustand';
import { Task } from '../task-list/store';

interface ModalStore {
    isActive: boolean;
    task: Task;
    openModal: (task : Task)=> void
    closeModal: () => void
}

const useModalStore = create<ModalStore>(set => ({
    isActive: false,
    task: {} as Task,
    openModal: (task) => set(() => ({isActive: true, task})),
    closeModal: () => set(() => ({isActive: false}))
}))



export default useModalStore;