import React from "react";

const CustomLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <span className="ml-2 text-indigo-500">Loading...</span>
        </div>
    );
};

export default CustomLoader;
