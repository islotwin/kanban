import { Service } from "./Service";
import { randomColor } from 'randomcolor'

export const DashboardService = {
  create: (dashboard) => {
    return Service.post("/dashboards.json", { name: dashboard, color: randomColor() })
  },
  get: (id) => {
    return Service.get("/dashboards/" + id + ".json")
  },
  getAll: () => {
    return Service.get("/dashboards.json")
  }
}