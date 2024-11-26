import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TodoCard from "./TodoCard";
import MyModal from "./Dialog";
import api from "../api/client";
import InputField from "./InputField";

const TodoIndex = ({ selectedCategory, todos, handleCategoryClick }) => {
  let [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const user = JSON.parse(window.localStorage.getItem("user"));
  function toggleModal() {
    setIsOpen((prev) => !prev);
  }
  const priorities = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ];

  const todoHanldeCompleted = async (id) => {
    Swal.fire({
      title: "Are you sure that you want to set this item as completed ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.post(`/todos/complete/${id}`);
        await handleCategoryClick(selectedCategory);
        Swal.fire({
          position: "top",
          icon: "success",
          toast: true,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
    
 


  }
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      userId: user.id,
      categoryId: selectedCategory.id,
    };

    let response = await api.post("/todos", payload);
    await handleCategoryClick(selectedCategory);

    Swal.fire({
      position: "top",
      icon: "success",
      toast: true,
      title: response.data.message,
      showConfirmButton: false,
      timer: 1000,
    });
    reset(); // Reset the form fields
    toggleModal();
  };

  const destroy = async (id) => {
    Swal.fire({
      title: "Are you sure that you want to delete this item?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await api.delete(`/todos/${id}`);
        await handleCategoryClick(selectedCategory);
        Swal.fire({
          position: "top",
          icon: "success",
          toast: true,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div className="p-4">
      <div className="tasks">
        <h2 className="text-xl font-semibold mb-2">
          Tasks of {selectedCategory?.name || "Unknown Category"}
        </h2>

        <MyModal
          title="Add a New Todo"
          add="Add a Todo"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2">
              <InputField
                name="title"
                label="Title"
                register={register}
                required
              />
              <InputField
              type='textarea'
                name="description"
                label="Description"
                register={register}
                required
              />
              <InputField
                type="select"
                options={priorities}
                name="priority"
                label="Priority"
                register={register}
                required
              />{" "}
            </div>
            <div className="flex justify-center items-center mt-2">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
              >
                Submit
              </button>
            </div>
          </form>
        </MyModal>

        <ul className="grid grid-cols-1 w-full overflow-hidden p-2 rounded gap-1 mb-2">
          {selectedCategory && todos && todos.length > 0 ? (
            todos.map((task) => (
              <li
                key={task.id}
                className={`p-3 rounded ${
                  task.completed
                    ? "bg-green-100 border-green-300"
                    : "border-gray-300"
                }`}
              >
                <TodoCard task={task} destroy={destroy} todoHanldeCompleted={todoHanldeCompleted} />
              </li>
            ))
          ) : (
            <p className="text-gray-500">
              No tasks available for this category.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoIndex;
