import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Count from "../pages/count/count.vue";
import TarotResult from "";

// 定义路由类型
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Count",
    component: Count,
  },
  {
    path: "/result",
    name: "TarotResult",
    component: TarotResult,
    // 动态 props，用于将路由参数传递给组件
    props: (route) => ({
      pastCard: route.params.pastCard ? JSON.parse(route.params.pastCard as string) : null,
      presentCard: route.params.presentCard ? JSON.parse(route.params.presentCard as string) : null,
      futureCard: route.params.futureCard ? JSON.parse(route.params.futureCard as string) : null,
    }),
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes,
});

// 可选：添加全局导航守卫（例如权限控制）
router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`);
  next();
});

export default router;