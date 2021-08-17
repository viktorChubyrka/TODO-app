export default function Filter(tasks, state) {
  let filtered_tasks = [];
  for (let i = 0; i < tasks.length; i++) {
    let value = null;
    if (state.filters.end_date.from) {
      if (tasks[i].end_date >= state.filters.end_date.from) {
        value = tasks[i];
      }
    }
    if (state.filters.end_date.to) {
      if (tasks[i].end_date <= state.filters.end_date.to) {
        value = tasks[i];
      } else {
        value = null;
      }
    }
    if (value) {
      filtered_tasks.push(value);
    } else if (!state.filters.end_date.from && !state.filters.end_date.to) {
      filtered_tasks.push(tasks[i]);
    }
  }
  return filtered_tasks;
}
