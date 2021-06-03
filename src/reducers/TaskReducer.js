export const TaskReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LIST_SUCCESS":
      return {
        tasks: action.payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "FETCH_LIST_ERROR":
      return {
        tasks: [],
        loading: false,
        status: "failed",
        error: action.payload,
      };
    case "ADD_TASK_SUCCESS":
      return {
        loading: false,
        status: "success",
        error: "",
      };
    case "ADD_TASK_ERROR":
      return {
        loading: false,
        status: "failed",
        error: action.payload,
      };
    case "FETCH_DETAIL_SUCCESS":
      return {
        task: action.payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "FETCH_DETAIL_ERROR":
      return {
        task: {},
        loading: false,
        status: "failed",
        error: action.payload,
      };
    case "UPDATE_TASK_SUCCESS":
      return {
        task: action.payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "UPDATE_TASK_ERROR":
      return {
        task: {},
        loading: false,
        status: "failed",
        error: action.payload,
      };
    default:
      return state;
  }
};
