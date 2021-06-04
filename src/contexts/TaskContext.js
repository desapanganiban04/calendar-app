import { createContext, useReducer } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import {
  getTasks,
  postTask,
  getTaskDetail,
  putTask,
  deleteTask,
} from "../service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

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
  const { tasks, task } = store;

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
        toast.success("Task has been added.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
        toast.success("Task has been updated.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        callback();
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_TASK_ERROR", payload: err.response });
        toast.error("Something went wrong.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const removeTask = (id, callback = () => {}) => {
    const response = deleteTask(id);
    response
      .then((res) => {
        dispatch({ type: "DELETE_TASK_SUCCESS", payload: res.data });
        toast.success("Task has been deleted.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        callback();
      })
      .catch((err) => {
        dispatch({ type: "DELETE_TASK_ERROR", payload: err.response });
        toast.error("Something went wrong.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        fetchTasks,
        addTasks,
        showTask,
        updateTask,
        removeTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
