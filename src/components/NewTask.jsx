import { useState } from 'react';
import {useRef} from 'react';
import Modal from './Modal';

export default function NewTask({ onAdd }) {
  const modal = useRef();
  const [enteredTask, setEnteredTask] = useState('');

  function handleTaskChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleTaskAdd() {
    if (enteredTask.trim() === '') {
      modal.current.open();
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  }

  return <>
    <Modal ref={modal} buttonCaption="Okay">
      <h2 className='text-xl font-bold text-stone-500 mt-4 my-4'>Invalid Input</h2>
      <p className='text-stone-600 mb-4'>Oops... looks like you forgot ti enter a value.</p>
      <p className='text-stone-600 mb-4'>Make sure enter valid value</p>
    </Modal>
    <div className="flex items-center gap-4">
      <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleTaskChange}
        value={enteredTask}
      />
      <button className="text-stone-700 hover:text-stone-950" onClick={handleTaskAdd}>Add Task</button>
    </div>
  </>
};