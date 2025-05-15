import { createContext, useEffect, useReducer } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const initialState = {
    timers: JSON.parse(localStorage.getItem("timers")) || [],
    history: JSON.parse(localStorage.getItem("history")) || [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TIMER":
        return { ...state, timers: [...state.timers, action.payload] };
      case "UPDATE_TIMER":
        return {
          ...state,
          timers: state.timers.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
        };
      case "DELETE_TIMER":
        return {
          ...state,
          timers: state.timers.filter((t) => t.id !== action.payload),
        };
      case "ADD_TO_HISTORY":
        return { ...state, history: [...state.history, action.payload] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(state.timers));
  }, [state.timers]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
  }, [state.history]);

  return (
    <TimerContext.Provider
      value={{
        timers: state.timers,
        history: state.history,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};