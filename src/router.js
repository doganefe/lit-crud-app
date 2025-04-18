import { Router } from "@vaadin/router";
import "./pages/home-page.js";
import "./pages/add-employee.js";
import "./pages/edit-employee.js";
import "./pages/not-found-page.js";

export const initRouter = (outlet) => {
  const router = new Router(outlet);

  router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/add", component: "add-employee" },
    { path: "/edit-employee", component: "edit-employee" },
    { path: "(.*)", component: "not-found-page" },
  ]);
};
