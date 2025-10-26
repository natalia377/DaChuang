import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/login',
      component: () => import('../components/Login.vue'),
    },
    {
      path: '/',
      redirect: '/coursesection',
      component: () => import('../components/Home.vue'),
      children: [
        {
          path: '/prac',
          component: () => import('../components/Practice.vue'),
        },
        {
          path: '/pracindex',
          component: () => import('../components/PracticeIndex.vue'),
        },
        {
          path: '/teachindex',
          component: () => import('../components/teaching/TeachingIndex.vue'),
        },
        {
          path: '/exp',
          component: () => import('../components/Experiment.vue'),
        },
        {
          path: '/teach',
          component: () => import('../components/teaching/Teaching.vue'),
        },
        {
          path: '/filetest',
          component: () => import('../components/FileTest.vue'),
        },
        {
          path: '/coursesection',
          component: () => import('../components/teaching/CourseSection.vue'),
        },
        // ✅ 修改：支持动态参数
        {
          path: '/course/:id',
          name: 'Course',
          component: () => import('../components/teaching/Course.vue'),
        },
        {
          path: '/profile',
          component: () => import('../components/teaching/Profile.vue'),
        }
      ]
    }
  ]
})

export default router;