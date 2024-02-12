import React, { useState } from "react";

type HoverTextProps = {
    width: number;
    text: string;
    hoverText: string;
};

const HoverText: React.FC<HoverTextProps> = ({ width, text, hoverText }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`transition-all duration-300 ease-in-out ${isHovered ? `opacity-0` : `opacity-100`
                    }`}
            >
                {text}
            </div>
            <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${isHovered ? `opacity-100` : `opacity-0`
                    }`}
            >
                <div className={`bg-white w-${width} p-2 border border-gray-300 rounded`}>
                    {hoverText}
                </div>
            </div>
        </div>
    );
};

export default HoverText;
