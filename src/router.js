import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/components/HomePage";
import ContentList from "@/components/ContentList";


const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/ContentListr/:conversation_id', name: 'ContentList', component: ContentList },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;