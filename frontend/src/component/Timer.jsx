import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../context/TimerContext";

const Timer = ({ timer }) => {
  const { dispatch } = useContext(TimerContext);
  const [remaining, setRemaining] = useState(timer.remaining);
  const [alertShown, setAlertShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false); 

  useEffect(() => {
    setRemaining(timer.remaining);
    if (timer.remaining === timer.duration) {
      setAlertShown(false);
      setHasCompleted(false);
      setIsAlertActive(false);
    }
  }, [timer.remaining, timer.duration]);

  useEffect(() => {
    let interval;
    if (timer.status === "running" && !hasCompleted && !isAlertActive) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setHasCompleted(true);
            dispatch({
              type: "UPDATE_TIMER",
              payload: { ...timer, status: "completed", remaining: 0 },
            });
            setShowModal(true);
            return 0;
          }
          if (
            timer.hasHalfwayAlert &&
            prev <= Math.floor(timer.duration / 2) &&
            !alertShown
          ) {
            setIsAlertActive(true); 
            alert(`Halfway alert for ${timer.name}!`);
            setAlertShown(true);
            setIsAlertActive(false); 
          }
          const newRemaining = prev - 1;
          dispatch({
            type: "UPDATE_TIMER",
            payload: { ...timer, remaining: newRemaining },
          });
          return newRemaining;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.status, timer.id, timer.duration, timer.name, timer.hasHalfwayAlert, dispatch, alertShown, hasCompleted, isAlertActive]);

  useEffect(() => {
    if (hasCompleted && timer.status === "completed") {
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: {
          id: Date.now(),
          name: timer.name,
          completionTime: new Date().toLocaleString(),
        },
      });
    }
  }, [hasCompleted, timer.status, timer.name, dispatch]);

  const handleStart = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: { ...timer, status: "running" },
    });
  };

  const handlePause = () => {
    dispatch({
      type: "UPDATE_TIMER",
      payload: { ...timer, status: "paused" },
    });
  };

  const handleReset = () => {
    setRemaining(timer.duration);
    setAlertShown(false);
    setHasCompleted(false);
    setIsAlertActive(false);
    dispatch({
      type: "UPDATE_TIMER",
      payload: { ...timer, status: "paused", remaining: timer.duration },
    });
  };

  const progress = Math.max(0, Math.min(100, (remaining / timer.duration) * 100));

  const statusColor =
    timer.status === "running"
      ? "text-green-600"
      : timer.status === "paused"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md mb-2 flex justify-between items-center transition-all hover:shadow-lg">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{timer.name}</h3>
          <p className="text-gray-600">Time Left: {remaining}s</p>
          <p className={`text-gray-600 font-medium ${statusColor}`}>
            Status: {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleStart}
            disabled={timer.status === "running" || timer.status === "completed"}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 transition"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            disabled={timer.status !== "running"}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-400 transition"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Timer Completed!</h2>
            <p className="text-gray-600 mb-4">Congratulations! "{timer.name}" has finished.</p>
            <button
              onClick={() => {
                dispatch({ type: "DELETE_TIMER", payload: timer.id });
                setShowModal(false);
                setHasCompleted(false);
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;