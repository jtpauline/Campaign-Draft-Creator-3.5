import React from 'react';

const FormSection = ({ title, children }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
};

export default FormSection;
