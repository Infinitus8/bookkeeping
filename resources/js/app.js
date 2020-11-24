require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from "vue-axios"
import axios from 'axios'



Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

import Dashboard from './Dashboard'
import Records from './Records'
import RecordForm from './RecordForm'
import Stats from './Stats'

const routes = [
    { path: '/records', component: Records },
    { path: '/records/new', component: RecordForm },
    { path: '/stats', component: Stats}
]


export const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: h => h(Dashboard),
}).$mount('#app')

export const API_BASE_URL = 'http://localhost:8000/api';
