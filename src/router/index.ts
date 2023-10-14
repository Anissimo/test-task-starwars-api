import { createRouter, createWebHistory /*RouteRecordRaw*/ } from "vue-router";
import MyTable from "../views/MyTable.vue";
import Films from "../views/Films.vue";
import People from "../views/People.vue";
import Planets from "../views/Planets.vue";
import Species from "../views/Species.vue";
import Starships from "../views/Starships.vue";
import Vehicles from "../views/Vehicles.vue";

const routes = [
  { path: "/", component: MyTable },
  { path: "/films", component: Films },
  { path: "/people", component: People },
  { path: "/planets", component: Planets },
  { path: "/species", component: Species },
  { path: "/starships", component: Starships },
  { path: "/vehicles", component: Vehicles },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
