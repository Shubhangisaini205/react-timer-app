import { useContext, useState } from "react";
import { TimerContext } from "../context/TimerContext";

const AddTimerForm = () => {
    const { dispatch } = useContext(TimerContext);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [hasHalfwayAlert, setHasHalfwayAlert] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (name && duration && category) {
            dispatch({
                type: 'ADD_TIMER',
                payload: {
                    id: Date.now(),
                    name,
                    duration: parseInt(duration),
                    remaining: parseInt(duration),
                    category,
                    status: 'paused',
                    hasHalfwayAlert,
                },
            });
            setName('');
            setDuration('');
            setCategory('');
            setHasHalfwayAlert(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Duration (seconds)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="flex items-center">
                    <label className="flex items-center text-gray-700 font-medium">
                        <input
                            type="checkbox"
                            checked={hasHalfwayAlert}
                            onChange={e => setHasHalfwayAlert(e.target.checked)}
                            className="mr-2 h-4 w-4"
                        />
                        Halfway Alert
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
                Add Timer
            </button>
        </form>
    );
};
export default AddTimerForm