import React from "react";

const InputField = ({ label, register, required, name, type, options }) => {
  if (type === "select") {
    return (
      <div>
        <label className="block my-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <select
          {...register(name, { required })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          required
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block my-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <textarea
          {...register(name, { required })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={label}
          required
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block my-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={label}
        required
      />
    </div>
  );
};

export default InputField;
