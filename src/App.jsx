import { useState } from 'react';
import './index.css';

const App = () => {

  const [categories] = useState([
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Shopping" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete project report", completed: false, category: "Work", priority: "High" },
    { id: 2, text: "Buy groceries", completed: true, category: "Shopping", priority: "Medium" },
    { id: 3, text: "Call mom", completed: false, category: "Personal", priority: "Low" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium"); // Default priority
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("");

  const handleCompleteTask = (taskId) => {

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

  };

  const handleDeleteTask = (taskId) => {

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setNewTaskText("");
    setNewTaskPriority("Medium");
  };

  const handleAddTask = () => {

    if (newTaskText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    setTasks((prevTasks) => [...prevTasks,
      {
        id: prevTasks.length + 1,
        text: newTaskText,
        completed: false,
        category: selectedCategory,
        priority: newTaskPriority,
      },
    ]);
    setNewTaskText("");
    setNewTaskPriority("Medium");
  };

  const handleEditTask = (taskId, currentText, currentPriority) => {

    setEditingTaskId(taskId);
    setEditTaskText(currentText);
    setEditTaskPriority(currentPriority);

  };

  const handleSaveTask = () => {

    if (editTaskText.trim() === "") {
      alert("Task text cannot be empty!");
      return;
    }

    setTasks(( prevTasks ) => prevTasks.map(( task ) => task.id === editingTaskId
          ? { ...task, text: editTaskText, priority: editTaskPriority }
          : task
      )
    );

    setEditingTaskId(null);
    setEditTaskText("");
    setEditTaskPriority("");

  };

  return (

    <div className="container">
      <h1>To-Do List</h1>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <h3>{category.name}</h3>
            <button>View Tasks</button>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="tasks">
          <h2>Tasks for {selectedCategory}</h2>
          <div className="add-task">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
          {tasks
            .filter((task) => task.category === selectedCategory)
            .sort((a, b) => {
              const priorityOrder = { High: 1, Medium: 2, Low: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map((task) => (
              <div
                key={task.id}
                className={`${tasks.completed} ? completed : `}
              >
                {editingTaskId === tasks.id ? (
                  <div className="edit-task">
                    <input
                      type="text"
                      value={editTaskText}
                      onChange={(e) => setEditTaskText(e.target.value)}
                    />
                    <select
                      value={editTaskPriority}
                      onChange={(e) => setEditTaskPriority(e.target.value)}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button onClick={handleSaveTask}>Save</button>
                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <span className="priority">[{task.priority} Priority]</span>
                    <div className="task-actions">
                      <button
                        className="complete"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        className="edit"
                        onClick={() =>
                          handleEditTask(task.id, task.text, task.priority)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;