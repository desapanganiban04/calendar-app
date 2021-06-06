import { isEmpty, omitBy } from "lodash";
import { useState, useEffect, useReducer, useCallback } from "react";
import { toast } from "react-toastify";
import { initialState } from "./contexts/TaskContext";
import { TaskReducer } from "./reducers/TaskReducer";
import { get, post, putTask, remove } from "./service";

export const removeEmptyString = (obj) => omitBy(obj, (x) => isEmpty(`${x}`));

export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useGetList = (params) => {
  const [store, dispatch] = useReducer(TaskReducer, initialState);
  const { tasks, loading, currentPage } = store;

  useEffect(() => {
    const fetchTasks = (params) => {
      dispatch({
        type: "FETCH_LOADING",
        payload: {
          loading: true,
          data: [],
          pagination: params?.page,
        },
      });
      const response = get(params, "/tasks");
      response
        .then((res) => {
          dispatch({
            type: "FETCH_LIST_SUCCESS",
            payload: {
              data: res.data,
              pagination: params?.page,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_LIST_ERROR",
            payload: {
              loading: false,
              data: [],
              pagination: 1,
            },
          });
        });
    };
    fetchTasks(removeEmptyString(params));
  }, [params]);
  return [loading, tasks, currentPage];
};

export const useTaskDetail = (id) => {
  const [store, dispatch] = useReducer(TaskReducer, initialState);
  const { task, loading } = store;

  useEffect(() => {
    const getDetails = (id) => {
      dispatch({
        type: "FETCH_DETAIL_LOADING",
        payload: {
          loading: true,
          data: {},
        },
      });
      const response = get({}, `tasks/${id}`);
      response
        .then((res) => {
          dispatch({
            type: "FETCH_DETAIL_SUCCESS",
            payload: {
              data: res.data,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_DETAIL_ERROR",
            payload: {
              loading: false,
              data: [],
            },
          });
        });
    };
    getDetails(id);
  }, [id]);
  return [loading, task];
};

export const useAddTask = () => {
  const [, dispatch] = useReducer(TaskReducer, initialState);

  const submit = useCallback((payload, callback) => {
    const addTask = (payload) => {
      const response = post(payload);
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
          callback();
        })
        .catch((err) => {
          dispatch({ type: "ADD_TASK_ERROR", payload: err.response });
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
    addTask(payload);
  }, []);
  return [submit];
};

export const useUpdateTask = () => {
  const [, dispatch] = useReducer(TaskReducer, initialState);

  const update = useCallback((id, payload, callback) => {
    const updateTask = (payload) => {
      const response = putTask(id, payload);
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
    updateTask(payload);
  }, []);
  return [update];
};

export const useDeleteTask = () => {
  const [, dispatch] = useReducer(TaskReducer, initialState);

  const deleteData = useCallback((id, callback) => {
    const deleteTask = () => {
      const response = remove(`/tasks/${id}`);
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
    deleteTask(id);
  }, []);
  return [deleteData];
};
