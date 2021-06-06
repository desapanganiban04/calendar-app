import { createContext, useReducer } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import "react-toastify/dist/ReactToastify.css";

export const initialState = {
  tasks: [],
  task: {},
  loading: false,
  status: "",
  error: "",
  currentPage: 1,
  limitPerPage: 5,
  pageCount: 1,
};

export const TaskContext = createContext({ ...initialState });

const TaskContextProvider = (props) => {
  const [store] = useReducer(TaskReducer, initialState);
  const { tasks, task } = store;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
