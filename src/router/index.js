import { createRouter, createWebHashHistory } from 'vue-router'
import AppHome from '../pages/AppHome.vue'
import AppAbout from '../pages/AppAbout.vue'
import AppLogIn from '../pages/AppLogIn.vue'
import UserProfile from '../pages/UserProfile.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:`/`,
            component: AppHome

        },
        {
            path:`/about`,
            component: AppAbout
        },
        {
            path:`/login`,
            component: AppLogIn
        },
        {
            path:`/userprofile`,
            component: UserProfile
        }
    ]
})


export default router