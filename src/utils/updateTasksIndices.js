import { toArray } from "./toArray";

export const updateTasksIndices = tasks => {
  return toArray(tasks)
    .sort((a, b) => a.index - b.index)
    .reduce((acc, task, index) => {
      return Object.assign({}, acc, {
        [task.id]: {
          name: task.name,
          ...(task.description && { description: task.description }),
          index
        }
      })
    }, {})
}