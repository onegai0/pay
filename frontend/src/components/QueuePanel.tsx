import { useState } from "react";

type QueuePanelProps = {
    type: string,
};  

export function QueuePanel({ type }: QueuePanelProps) {

const [num] = useState(() => Math.floor(Math.random() * 10));    return (
        <div className="w-full h-full bg-[#1E1E1E] flex flex-col gap-2 justify-center  rounded-lg p-4">
            
            <h2 className="text-xl font-bold mb-4   flex justify-center"> {type}</h2>

            <div className=" flex justify-center text-white items-center text-4xl font-bold text-button">
                            {num} 
            </div>
        </div>
    );
}