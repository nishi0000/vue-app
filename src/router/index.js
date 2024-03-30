import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '../pages/AppHome.vue'
import AppAbout from '../pages/AppAbout.vue'
import AppLogIn from '../pages/AppLogIn.vue'
import UserProfile from '../pages/UserProfile.vue'

const baseUrl = process.env.VUE_APP_URL


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:`${baseUrl}/`,
            component: AppHome

        },
        {
            path:`${baseUrl}/about`,
            component: AppAbout
        },
        {
            path:`${baseUrl}/login`,
            component: AppLogIn
        },
        {
            path:`${baseUrl}/userprofile`,
            component: UserProfile
        }
    ]
})


export default router