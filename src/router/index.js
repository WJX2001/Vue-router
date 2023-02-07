import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import DefaultTab from '@/components/navbar/DefaultTab.vue'
import DataTab from '@/components/navbar/DataTab.vue'
Vue.use(VueRouter)

const routesArr = [
  {
    path: '/',
    
    component: HomeView
  },
  {
    path: '/main/:userId',
    name: 'main',
    // 路由懒加载
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MainView,
    props: true,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'default',
        component: DefaultTab,
      },

      // 数据管理页面
      {
        path: 'data',
        component: DataTab,
      },

      {
        path: '',
        redirect: 'default'
      }
    ]
  }
]

const router = new VueRouter({
  routes: routesArr
})

// 如果isAuthenticated这个变量放在router.beforeEach回调函数的外面，会导致报错
// 如果放在外面，在路由初始化的时候isAuthenticated是没有值的，所以第一次点登录会失败
// const isAuthenticated = sessionStorage.getItem('token')

router.beforeEach((to,from,next) => {
  // next再所有逻辑分支中只能且必须调用依次
  // ...next()
  const isAuthenticated = sessionStorage.getItem('token')
  if (to.fullPath !== '/' && !isAuthenticated) { next('/') }
  else next()
})



export default router
