import React from "react";

type PaginationProps = {
    total: number;
    onChange: (newPage: number) => void;
    size: "xs" | "sm" | "md" | "lg";
    color: "gray" | "indigo" | "blue" | "red" | "green" | "teal" | "cyan" | "purple";
};

const Pagination: React.FC<PaginationProps> = ({ total, onChange, size, color }) => {
    const totalPages = Math.ceil(total);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav className="flex space-x-2" aria-label="Pagination">
            {pagesArray.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onChange(pageNumber)}
                    className={`px-3 py-1 text-sm leading-5 focus:outline-none focus:shadow-outline-blue active:bg-gray-200 ${color === "gray"
                        ? "text-gray-700 border-gray-300"
                        : `text-white bg-${color}-500 hover:bg-${color}-600 border-${color}-500`
                        } ${size === "xs"
                            ? "text-xs leading-3 px-2.5 py-1.5"
                            : size === "sm"
                                ? "text-sm leading-4 px-3 py-1.5"
                                : size === "md"
                                    ? "text-base leading-6 px-4 py-2"
                                    : "text-lg leading-6 px-5 py-2.5"
                        }`}
                >
                    {pageNumber}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;
