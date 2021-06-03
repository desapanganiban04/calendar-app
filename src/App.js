import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import TaskDetail from "./components/TaskDetail";
import TaskList from "./components/TaskList";
import TaskContextProvider from "./contexts/TaskContext";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="relative flex flex-col flex-1 h-full max-h-full">
      <TaskContextProvider>
        <Navbar />
        <div className="pt-2 px-40">
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route path="/:id" component={TaskDetail} />
          </Switch>
        </div>

        {/*  */}

        {/* <AddTask /> */}
      </TaskContextProvider>
    </div>
  );
}

export default App;
