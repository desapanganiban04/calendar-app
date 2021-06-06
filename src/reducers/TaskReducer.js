export const TaskReducer = (state, { payload, type }) => {
  switch (type) {
    case "FETCH_LIST_LOADING":
      return {
        tasks: [],
        loading: payload?.loading,
        currentPage: payload?.pagination,
        pageCount: 1,
      };
    case "FETCH_LIST_SUCCESS":
      return {
        tasks: payload?.data,
        loading: false,
        currentPage: payload?.pagination,
        pageCount: payload?.totalPages,
        status: "success",
        error: "",
      };
    case "FETCH_LIST_ERROR":
      return {
        tasks: [],
        loading: false,
        status: "failed",
        error: payload,
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
        error: payload,
      };
    case "FETCH_DETAIL_LOADING":
      return {
        task: {},
        loading: payload?.loading,
        currentPage: payload?.pagination,
      };
    case "FETCH_DETAIL_SUCCESS":
      return {
        task: payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "FETCH_DETAIL_ERROR":
      return {
        task: {},
        loading: false,
        status: "failed",
        error: payload,
      };
    case "UPDATE_TASK_SUCCESS":
      return {
        task: payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "UPDATE_TASK_ERROR":
      return {
        task: {},
        loading: false,
        status: "failed",
        error: payload,
      };
    case "DELETE_TASK_SUCCESS":
      return {
        loading: false,
        status: "success",
        error: "",
      };
    case "DELETE_TASK_ERROR":
      return {
        loading: false,
        status: "failed",
        error: payload,
      };
    case "FILTER_LIST_SUCCESS":
      return {
        tasks: payload,
        loading: false,
        status: "success",
        error: "",
      };
    case "FILTER_LIST_ERROR":
      return {
        tasks: [],
        loading: false,
        status: "failed",
        error: payload,
      };
    default:
      return state;
  }
};
