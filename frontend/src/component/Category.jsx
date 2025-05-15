import { useContext, useState } from "react";
import Timer from "./Timer";
import { TimerContext } from "../context/TimerContext";

const Category = ({ category, timers }) => {
  const { dispatch } = useContext(TimerContext);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleBulkAction = (actionType) => {
    timers.forEach((timer) => {
      if (timer.category === category) {
        if (actionType === "start" && timer.status !== "completed") {
          dispatch({
            type: "UPDATE_TIMER",
            payload: { ...timer, status: "running" },
          });
        } else if (actionType === "pause") {
          dispatch({
            type: "UPDATE_TIMER",
            payload: { ...timer, status: "paused" },
          });
        } else if (actionType === "reset") {
          dispatch({
            type: "UPDATE_TIMER",
            payload: { ...timer, status: "paused", remaining: timer.duration },
          });
        }
      }
    });
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center bg-indigo-100 p-3 rounded-lg shadow-sm">
        <h2
          className="font-semibold text-xl text-indigo-800 cursor-pointer hover:text-indigo-600 transition flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-2 transition-transform duration-300">
            {isExpanded ? "−" : "+"}
          </span>
          {category} ({timers.length})
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => handleBulkAction("start")}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Start All
          </button>
          <button
            onClick={() => handleBulkAction("pause")}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Pause All
          </button>
          <button
            onClick={() => handleBulkAction("reset")}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Reset All
          </button>
        </div>
      </div>
      <div
        className={`ml-4 overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {timers.map((timer) => (
          <Timer key={timer.id} timer={timer} />
        ))}
      </div>
    </div>
  );
};

export default Category;