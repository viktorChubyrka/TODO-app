import Vue from "vue";
import VueRouter from "vue-router";
import Tasks from "../views/Tasks.vue";
import TodoList from "../components/TodoList.vue"
import Archive from "../components/Archive.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks,
    children: [
      {
        path: "active",
        name: "active",
        component: TodoList,
      },
      {
        path: "complited",
        name: "complited",
        component: Archive,
      }
    ]
  },
  {
    path: "*",
    redirect: '/tasks/active'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
