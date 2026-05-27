

type TeamPanelProps = {
    type: string,
};  

export function TeamPanel({ type }: TeamPanelProps) {
    return (
        <div className="w-full h-full bg-[#1E1E1E] rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4   flex justify-center"> {type}</h2>

            {[1, 2, 3].map((item) => (
                <div key={item} className="w-full h-16 bg-[#2A2A2A] rounded my-3 flex items-center px-4">
                    <div className="w-10 h-10 bg-gray-500 rounded-full mr-4"></div>
                    <div className="text-white">Atendente {item}</div>
                </div>
            ))}
        </div>
    );
}