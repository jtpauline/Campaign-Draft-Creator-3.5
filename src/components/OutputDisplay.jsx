import React from 'react';

const OutputDisplay = ({ output, isVisible, onDownload }) => {
    if (!isVisible) {
        return null;
    }

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'campaign-book.txt';
        link.click();
    };

    return (
        <div id="output" className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-bold mb-4">Generated Campaign Book</h2>
            <pre className="whitespace-pre-wrap bg-white p-4 rounded-md overflow-x-auto">
                {output}
            </pre>
            <button 
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Download Campaign Book
            </button>
        </div>
    );
};

export default OutputDisplay;
