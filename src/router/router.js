import { Router } from "@vaadin/router";

const outlet = document.querySelector("#outlet");
export const router = new Router(outlet);

router.setRoutes([
  { path: "/", component: "user-login" },
  { path: "/dashboard", component: "my-dashboard" },
  { path: "/add", component: "add-crypto" },
  { path: "/userprofile/:user", component: "user-profile" },
  { path: "/", component: "user-logout" },
  { path: "/registration", component: "user-registration" },
]);
