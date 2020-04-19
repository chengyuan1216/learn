import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Test from '../pages/Test.vue'
import transform3d from '../pages/transform3d.vue'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/transform3d',
            name: 'transform3d',
            component: transform3d
        }
    ]
})

export default router