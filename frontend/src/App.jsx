import { useContext, useState } from "react";
import { TimerContext } from "./context/TimerContext";
import AddTimerForm from "./component/AddTimerForm";
import Category from "./component/Category";
import History from "./component/History";

const App = () => {
      const [activeTab, setActiveTab] = useState('home');
      const { timers } = useContext(TimerContext);
      const categories = [...new Set(timers.map(timer => timer.category))];

      return (
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Timer App</h1>
          <div className="flex space-x-4 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                activeTab === 'home' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-md font-medium transition ${
                activeTab === 'history' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              History
            </button>
          </div>
          {activeTab === 'home' && (
            <div>
              <AddTimerForm />
              {categories.length === 0 ? (
                <p className="text-gray-600 text-center" >No timers added yet.</p>
              ) : (
                categories.map(category => (
                  <Category
                    key={category}
                    category={category}
                    timers={timers.filter(timer => timer.category === category)}
                  />
                ))
              )}
            </div>
          )}
          {activeTab === 'history' && <History />}
        </div>
      );
    };

export default App