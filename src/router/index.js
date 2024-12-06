import Vue from "vue";
import VueRouter from "vue-router";
import PostsComp from "@/views/PostsComp.vue";
import UploudComp from "@/views/UploudComp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "PostsComp",
    component: PostsComp,
  },
  {
    path: "/two",
    name: "UploudComp",
    component: UploudComp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
