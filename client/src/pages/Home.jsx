// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategoryStore from "../utils/store";

const Home = () => {

 
    
      const [tasks, setTasks] = useState([] );
    
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
    
      const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setNewTaskText("");
        setNewTaskPriority("Medium");
      };
    
      const handleAddTask = () => {
    
        if (newTaskText.trim() === "") {
          alert("Task cannot be empty!");
          return;
        }
    
        setTasks(selectedCategory.todos);
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
    
        setTasks(selectedCategory.todos  );
    
        setEditingTaskId(null);
        setEditTaskText("");
        setEditTaskPriority("");
    
      };

      function logout() {
        window.localStorage.removeItem('token')
        window.location.href = '/login';  // Example redirection to the dashboard page
    
      }



      const { categories_data, loading, error, fetchCategories } = useCategoryStore();

      useEffect(() => {
        fetchCategories(); // Récupérer les catégories lors du montage du composant
      }, [fetchCategories]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    
    <div className="container">
      <h1>Welcome to the To-Do App</h1>
      <button onClick={logout}>Logout</button>



   


      <h1>To-Do List</h1>
      <div className="categories">
        {categories_data.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category.name}</h3>
            <button>View Tasks</button>
          </div>
        ))}
      </div>

   

      {selectedCategory && (
        <div className="tasks">
          <h2>Tasks for {selectedCategory.name}</h2>
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
          { selectedCategory.todos && selectedCategory.todos
           
          
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
                    <span>{task.title}</span>
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

export default Home;





