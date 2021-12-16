import { routes, asyncRoute } from "@/router/router";
import router from "./index";
import store from "@/store";

export function getAsyncRoute() {
  const state: any = store.state;
  const Router: Array<any> = asyncRoute;
  const Route: any = router;
  const rouls: any = state.layout.rouls;
  let fitRouter: any = Router.filter(item => {
    return rouls.includes(item.name);
  });
  let arr: any = fitRouter;
  const red: any = [
    {
      path: "/404",
      name: "404",
      ismenu: false,
      component: () => import("@/views/404/404.vue"),
      meta: {
        icon: "",
        keepAlive: true,
        title: "404"
      }
    },
    {
      path: "*",
      ismenu: false,
      redirect: "404",
      meta: {
        icon: ""
      }
    }
  ];
  arr = arr.concat(red);
  let rts = Route["options"];
  rts.routes = rts.routes.concat(arr);
  router.addRoutes(arr);
  let parmas: any = {
    Routers: rts.routes
  };
  store.dispatch("UPDATE_LAYOUY_STATE", parmas);
}
