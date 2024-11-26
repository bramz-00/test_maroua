import React from 'react'

const TodoCard = ({task,destroy,handleEditTask,todoHanldeCompleted}) => {
  return (
    <div>

    <li class="bg-white rounded-xl border  hover:scale-95 transition-all duration-150 cursor-default  transform border-gray-100">
        <div class="px-4 py-5 sm:px-6">
            <div class="flex flex-col  ">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">{task.description}</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500">Status: <span class="">{task.completed ? 'Completed':'Not Yet'}</span></p>

                <p class="text-sm font-medium text-gray-500">Priority : <span class="">{task.priority}</span></p>
               
                <div className="task-actions">
                      <button
                        className="complete"
                        onClick={() => todoHanldeCompleted(task.id)}
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        className="edit"
                        onClick={() =>
                          handleEditTask(task.id, task.title, task.priority)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => destroy(task.id)}
                      >
                        Delete
                      </button>
                    </div>
            </div>
        </div>
    </li>
 

</div>
  )
}

export default TodoCard