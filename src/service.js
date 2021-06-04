import util from "./util";

export async function getTasks(params) {
  if (params.action === "filter") {
    if (params.value === "" || params.value === "All") {
      return await util.get("/tasks");
    } else {
      return await util.get(`/tasks?${params.filter}=${params.value}`);
    }
  } else {
    return await util.get("/tasks");
  }
}

export async function postTask(values) {
  return await util.post("/tasks", values, {});
}

export async function getTaskDetail(id) {
  return await util.get(`/tasks/${id}`);
}

export async function putTask(id, values) {
  return await util.put(`/tasks/${id}`, values, {});
}

export async function deleteTask(id) {
  return await util.delete(`/tasks/${id}`, {});
}