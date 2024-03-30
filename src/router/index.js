import { createRouter, createWebHashHistory } from 'vue-router'
import AppHome from '../components/AppHome.vue'
import AppAbout from '../components/AppAbout.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            component: AppHome

        },
        {
            path:'/about',
            component: AppAbout
        }
    ]
})


export default router