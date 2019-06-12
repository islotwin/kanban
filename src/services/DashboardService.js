import { Service } from "./Service";
import { randomColor } from 'randomcolor'

export const DashboardService = {
  create: (dashboard) => {
    return Service.post("/dashboards.json", { name: dashboard, color: randomColor() })
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
  },
  delete: (id) => {
    return Service.delete("/dashboards/" + id + ".json")
  }
}