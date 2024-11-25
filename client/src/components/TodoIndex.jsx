import React from "react";
import { z } from "zod";
import TodoCard from "./TodoCard"; // Assurez-vous que TodoCard est bien importé depuis son chemin correct
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../api/client";
import Swal from "sweetalert2";
const Input = ({ label, register, required,name }) => (
  <>
    <div>
      <label class="block my-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        {...register(name, { required })}
        type="text"
        id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0   block w-full p-2.5   "
        placeholder={label}
        required
      />
    </div>
  </>
);

// you can use React.forwardRef to pass the ref too

const TodoIndex = ({ selectedCategory, fetchCategories ,handleCategoryClick }) => {
  const { register, handleSubmit } = useForm();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const onSubmit = async (data) => {
    const payload = {
        ...data,
        userId: user.id, 
        categoryId: selectedCategory.id, // Utilisez l'utilisateur actuel ou un ID valide
        // Utilisez l'utilisateur actuel ou un ID valide
      };
    const response = await api.post("/todos", payload);
    await fetchCategories();

    await handleCategoryClick(selectedCategory);
   
    Swal.fire("Saved!", "", "success");
  };

  // watch input value by passing the name of it
  async function destroy (id){
    Swal.fire({
        title: "Are you sure that you want to delete this item ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            await api.delete(`/todos/${id}`);
            await fetchCategories();
            await  handleCategoryClick(selectedCategory);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  
  }
  return (
    <div className="p-4">
      <div className="tasks">
        {/* Titre de la catégorie sélectionnée */}
        <h2 className="text-xl font-semibold mb-2">
          Tasks of {selectedCategory?.name || "Unknown Category"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="title" label="Title"  register={register} required />
          <Input name="description" label="Descritpion" register={register} required />

          <Input name="completed" label="Status" register={register} required />

          <Input name="priority" label='Periority' register={register} required />

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <ul className="grid grid-cols-1 w-full overflow-hidden p-2 rounded gap-1 mb-2">
          {selectedCategory?.todos && selectedCategory.todos.length > 0 ? (
            selectedCategory.todos.map((task) => (
              <li
                key={task.id}
                className={`p-3 rounded  ${
                  task.completed
                    ? "bg-green-100 border-green-300"
                    : " border-gray-300"
                }`}
              >
                <TodoCard task={task} destroy={destroy} />
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
