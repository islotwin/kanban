import axios from "axios";

export const Service = axios.create({
    baseURL: "https://kanban-4306a.firebaseio.com/"
  })

// Add a response interceptor to instance
Service.interceptors.response.use(res => {
    console.log(res)
    return res.data
  }, err => Promise.reject(err))