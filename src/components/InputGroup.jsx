import React from 'react';

const InputGroup = ({ label, id, children }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="mt-1">
                {children}
            </div>
        </div>
    );
};

export default InputGroup;
