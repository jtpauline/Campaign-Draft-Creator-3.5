import React from 'react';

const TextArea = ({ id, value, onChange, placeholder, rows = 3 }) => {
  return (
    <textarea
      id={id}
      rows={rows}
      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        console.log(`TextArea ${id} changed to: ${e.target.value}`);
        onChange(e);
      }}
    />
  );
};

export default TextArea;
