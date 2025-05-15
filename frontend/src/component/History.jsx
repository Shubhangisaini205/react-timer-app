import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const History = () => {
    const { history } = useContext(TimerContext);
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Timer History</h2>
            {history.length === 0 ? (
                <p className="text-gray-600">No completed timers.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map(item => (
                        <li key={item.id} className="p-3 bg-gray-50 rounded-md shadow-sm">
                            <span className="font-medium">{item.name}</span> - Completed at {item.completionTime}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default History