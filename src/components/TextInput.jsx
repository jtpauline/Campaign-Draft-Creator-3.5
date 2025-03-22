import React from 'react';

const TextInput = ({ id, value, onChange, placeholder, type = "text" }) => {
  return (
    <input
      type={type}
      id={id}
      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        console.log(`TextInput ${id} changed to: ${e.target.value}`);
        onChange(e);
      }}
    />
  );
};

export default TextInput;
