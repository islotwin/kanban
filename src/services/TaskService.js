import { Service } from "./Service";
import { toArray } from "../utils/toArray";

export const TaskService = {
  create: (dashboard, list, task) => {
    return Service.post("/dashboards/" + dashboard + "/lists/" + list + "/tasks.json", task)
  },
  edit: (dashboard, list, id, task) => {
    return Service.patch("/dashboards/" + dashboard + "/lists/" + list + "/tasks/" + id + ".json", task)
  },
  get: (dashboard, list, id) => {
    return Service.get("/dashboards/" + dashboard + "/lists/" + list + "/tasks/" + id + ".json")
  },
  getAll: (dashboard, list) => {
    return Service.get("/dashboards/" + dashboard + "/lists/" + list + "/tasks.json")
      .then(toArray)
  },
  delete: (dashboard, list, id) => {
    return Service.delete("/dashboards/" + dashboard + "/lists/" + list + "/tasks/" + id + ".json")
  }
}