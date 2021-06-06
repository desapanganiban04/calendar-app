import Navbar from "./components/Navbar";
import TaskDetail from "./components/TaskDetail";
import TaskList from "./components/TaskList";
import TaskContextProvider from "./contexts/TaskContext";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col flex-1">
      <TaskContextProvider>
        <Navbar />
        <div className="pt-2 px-40 lg:px-64 sm:px-16">
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route path="/:id" component={TaskDetail} />
          </Switch>
        </div>
      </TaskContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
