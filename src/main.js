import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import components for routes
import Hero from './components/Hero.vue'

// Define routes
const routes = [
  { path: '/', name: 'Home', component: Hero },
  { path: '/shop', name: 'Shop', component: Hero }, // Placeholder - you can create actual components later
  { path: '/about', name: 'About', component: Hero }, // Placeholder
  { path: '/contact', name: 'Contact', component: Hero } // Placeholder
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')
