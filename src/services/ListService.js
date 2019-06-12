import { Service } from "./Service";

export const ListService = {
  create: (dashboard, list) => {
    return Service.post("/dashboards/" + dashboard + "/lists.json", { name: list })
      .then(({ name }) => name)
  },
  editName: (dashboard, id, list) => {
    return Service.patch("/dashboards/" + dashboard + "/lists/" + id + ".json", { name: list })
  },
  editTasks: (dashboard, id, tasks) => {
    return Service.patch("/dashboards/" + dashboard + "/lists/" + id + ".json", { tasks })
  },
  get: (dashboard, id) => {
    return Service.get("/dashboards/" + dashboard + "/lists/" + id + ".json")
  },
  getAll: (dashboard) => {
    return Service.get("/dashboards/" + dashboard + "/lists.json")
  },
  delete: (dashboard, id) => {
    return Service.delete("/dashboards/" + dashboard + "/lists/" + id + ".json")
  }
}