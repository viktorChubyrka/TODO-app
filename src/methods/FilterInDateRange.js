export default function Filter(tasks, state) {
  let tasks_search = tasks.filter((el) => {
    if (el.title.includes(state.search_input)) {
      return el;
    }
  });
  return tasks_search
    .filter((el) => {
      if (!state.filters.end_date.from) {
        return el;
      }
      if (el.end_date >= state.filters.end_date.from) {
        return el;
      }
    })
    .filter((el) => {
      if (!state.filters.end_date.to) {
        return el;
      }
      if (el.end_date <= state.filters.end_date.to) {
        return el;
      }
    });
}
