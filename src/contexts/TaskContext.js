import { createContext, useReducer } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import { getTasks, postTask, getTaskDetail, putTask } from "../service";

export const initialState = {
  tasks: [],
  task: {},
  loading: false,
  status: "",
  error: "",
};

export const TaskContext = createContext({ ...initialState });

const TaskContextProvider = (props) => {
  const [store, dispatch] = useReducer(TaskReducer, initialState);
  const { tasks, task, loading, status, error } = store;

  const fetchTasks = () => {
    const response = getTasks();
    response
      .then((res) => {
        dispatch({ type: "FETCH_LIST_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_LIST_ERROR", payload: err.response });
      });
  };

  const addTasks = (payload) => {
    const response = postTask(payload);
    response
      .then((res) => {
        dispatch({ type: "ADD_TASK_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "ADD_TASK_ERROR", payload: err.response });
      });
  };

  const showTask = (id) => {
    const response = getTaskDetail(id);
    response
      .then((res) => {
        dispatch({ type: "FETCH_DETAIL_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_DETAIL_ERROR", payload: err.response });
      });
  };

  const updateTask = (id, values, callback = () => {}) => {
    const response = putTask(id, values);
    response
      .then((res) => {
        dispatch({ type: "UPDATE_TASK_SUCCESS", payload: res.data });
        callback();
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_TASK_ERROR", payload: err.response });
      });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, task, fetchTasks, addTasks, showTask, updateTask }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
