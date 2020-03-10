import Vue from 'vue'
import App from './App.vue'
import meta from 'vue-meta'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(meta)
export function createApp(){
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store}
}
