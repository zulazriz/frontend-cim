import Vue from 'vue'
import VueRouter from 'vue-router'
import { allRoutes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: allRoutes,
    mode: 'history',
})