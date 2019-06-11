import { Service } from "./Service";
import { toArray } from "../utils/toArray";

export const ListService = {
  create: (dashboard, list) => {
    return Service.post("/dashboards/" + dashboard + "/lists.json", { name: list })
      .then(({ name }) => name)
  },
  edit: (dashboard, id, list) => {
    return Service.patch("/dashboards/" + dashboard + "/lists/" + id + ".json", { name: list })
  },
  get: (dashboard, id) => {
    return Service.get("/dashboards/" + dashboard + "/lists/" + id + ".json")
      .then(({ name, tasks }) => ({ name, tasks: toArray(tasks) }))
  },
  getAll: (dashboard) => {
    return Service.get("/dashboards/" + dashboard + "/lists.json")
      .then(toArray)
  },
  delete: (dashboard, id) => {
    return Service.delete("/dashboards/" + dashboard + "/lists/" + id + ".json")
  }
}