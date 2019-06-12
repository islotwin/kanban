import { Service } from "./Service";
import { toArray } from "../utils/toArray";

export const DashboardService = {
  create: (dashboard) => {
    return Service.post("/dashboards.json", { name: dashboard })
  },
  edit: (id, dashboard) => {
    return Service.patch("/dashboards/" + id + ".json", { name: dashboard })
  },
  get: (id) => {
    return Service.get("/dashboards/" + id + ".json")
      // .then(({ name, lists }) => ({ name, lists: toArray(lists).map(({ name, id }) => ({ name, id }))}))
  },
  getAll: () => {
    return Service.get("/dashboards.json")
      .then(toArray)
      .then(d => d.map(({ name, id }) => ({ name, id })))
  },
  delete: (id) => {
    return Service.delete("/dashboards/" + id + ".json")
  }
}