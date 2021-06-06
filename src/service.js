import util from "./util";

export async function get(params, url) {
  return await util.get(url, {
    params,
  });
}

export async function post(values) {
  return await util.post("/tasks", values, {});
}

export async function getDetails(id) {
  return await util.get(`/tasks/${id}`);
}

export async function putTask(id, values) {
  return await util.put(`/tasks/${id}`, values, {});
}

export async function remove(url) {
  return await util.delete(url, {});
}
